//module experiment
var r = require('rethinkdb');
var rethinkdbHost = "140.109.18.136";


module.exports =
{
    real_time_change_listener:function(connection_socket,database_name,table_name,channel_name)
    {
        var io = require('socket.io-client');
        var socket = io.connect('http://localhost:3001', {reconnect: true});
        r.db(database_name).table(table_name).changes().run(connection_socket, function(err, cursor) {

            // test warning system
            var w=0;
            warning_machine=setInterval(function(){console.log("no data input test: "+ w++ )},1000);

            cursor.each(function (err,item) {

                    clearTimeout(warning_machine);
                    w=0;
                    warning_machine=setInterval(function(){console.log("no data input test: "+w++)},1000);
                    //console.log(item);

                    console.log('From database:',database_name,'and table:',table_name,'----------------------------------------------------');
                    console.log("1.emit changed data to app.js by channel:",channel_name);
                    socket.emit(channel_name, { thrower: item });

                    // console.log(item.new_val.dataset.Time);
                }
            );//cursor.each(function
        });//run(connection_socket,
    },//real_time_table_update_thrower:function()


    app_js_middle_receiver_and_thrower:function(socket,receive_channel_name,throw_channel_name)
    {
        console.log('client connect from module');
        // laborLive.WSConstruct(socket);
        socket.on(receive_channel_name, function (new_data) {
            // we tell the client to execute 'new message'
            console.log('2.received data in app.js by channel:',receive_channel_name);
            console.log('3.emit data in app.js to html by channel:',throw_channel_name);
            console.log('-----------------------------------------------------------------------------------------------------');
            //console.log('from '+receive_channel_name+' in app.js to html')
            //console.log(new_data);
            socket.broadcast.emit(throw_channel_name, {
                app_js: new_data
            });
        });
    },//real_time_table_update_thrower:function()



}





