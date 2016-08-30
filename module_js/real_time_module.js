//module experiment
var async = require('async');
var r = require('rethinkdb');
var rethinkdbHost = "140.109.18.136";
var warning_machine=null;
var email_system_module = require("./email_system_module");
var GET = require("./GET_in_DB")


module.exports =
{
    real_time_change_listener:function(connection_socket, database_name, table_name, throw_channel_name, warning_period)
    {
        var io = require('socket.io-client');
        var socket = io.connect('http://localhost:3006', {reconnect: true});
        r.db(database_name).table(table_name).changes().run(connection_socket, function(err, cursor) {

            // test warning system

            var period=warning_period;

            // var w=1;
            // warning_machine=setInterval(function(){console.log("no data input test for "+ (w++*(period/1000)) +" sec from database: "+database_name+"table: "+table_name)},period);

            var timer=null;
            function warning_machine(period,database_name,table_name)
            {
                var w=1;
                timer=setInterval(
                    function()
                    {
                        console.log("no data input test for "+ (w++*(period)) +" sec from database: "+database_name,"table: "+table_name);
                        //email_system_module.Email_sender(database_name, table_name, (w++*(period/1000)) );
                    }
                    ,period*1000);
            }

            if(period!=null)
            {
                warning_machine(period,database_name,table_name);
            }


            cursor.each(function (err,item)
                {
                    console.log('\nFrom database:',database_name,'and table:',table_name,'----------------------------------------------------');
                    console.log("1.emit changed data to app.js by channel:",throw_channel_name);

                    async.parallelLimit(
                        {
                            update_storage_and_documents: function(callback_parallelLimit)
                            {
                                GET.storage_and_documents(database_name,table_name,
                                    function(storage_and_documents)
                                    {
                                        callback_parallelLimit(null, storage_and_documents);
                                    });
                            }
                        },1,
                        function(err, results)
                        {
                            if(err) console.log(err);

                            socket.emit(throw_channel_name,
                                {
                                    thrower: item,  // the latest data
                                    table_status:
                                    {
                                        "documents":results["update_storage_and_documents"]["documents"],
                                        "storage":results["update_storage_and_documents"]["storage"],
                                    }
                                });
                            // results is now equals to: {one: 1, two: 2}
                        }
                    );


                    if(period!=null)
                    {
                        clearTimeout(timer);
                        warning_machine(period,database_name,table_name);
                    }

                }
            );//cursor.each(function
        });//run(connection_socket,
    },//real_time_table_update_thrower:function()


    app_js_middle_receiver_and_thrower:function(socket,receive_channel_name,throw_channel_name)
    {
        console.log('real time module connected!');
        // laborLive.WSConstruct(socket);
        socket.on(receive_channel_name, function (new_data) {
            // we tell the client to execute 'new message'
            console.log('2.received data in app.js by channel:',receive_channel_name);
            console.log('3.emit data in app.js to html by channel:',throw_channel_name);
            console.log('-----------------------------------------------------------------------------------------------------\n');
            //console.log('from '+receive_channel_name+' in app.js to html')
            //console.log(new_data);
            socket.broadcast.emit(throw_channel_name, {
                app_js: new_data
            });
        });
    },//real_time_table_update_thrower:function()



}





