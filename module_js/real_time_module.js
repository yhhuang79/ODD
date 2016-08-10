//module experiment
var r = require('rethinkdb');
var rethinkdbHost = "140.109.18.136";
var warning_machine=null;

module.exports =
{
    real_time_change_listener:function(connection_socket, database_name, table_name, throw_channel_name, warning_period)
    {
        var io = require('socket.io-client');
        var socket = io.connect('http://localhost:3001', {reconnect: true});
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
                        console.log("no data input test for "+ (w++*(period/1000)) +" sec from database: "+database_name,"table: "+table_name);
                    }
                    ,period);
            }

            if(period!=null)
            {
                warning_machine(period,database_name,table_name);
            }


            cursor.each(function (err,item)
                {
                    console.log('\nFrom database:',database_name,'and table:',table_name,'----------------------------------------------------');
                    console.log("1.emit changed data to app.js by channel:",throw_channel_name);
                    socket.emit(throw_channel_name, { thrower: item });


                    //clearTimeout(timer);
                    //warning_machine(period,database_name,table_name);

                    if(period!=null)
                    {
                        clearTimeout(timer);
                        warning_machine(period,database_name,table_name);
                    }

                    // clearTimeout(warning_machine);
                    // w=1;
                    // warning_machine=setInterval(function(){console.log("no data input test for "+ (w++*(period/1000)) +" sec from database: "+database_name+"table: "+table_name)},period);


                    // console.log(item.new_val.dataset.Time);
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





