var real_time_module = require("./real_time_module");
var rethinkdbHost = "140.109.18.136";
var r = require('rethinkdb');
var connection_socket = null;




module.exports =
{
    initiate_listener:function()
    {
        r.connect( {host: rethinkdbHost, port: 28015}, function(err, conn) {
            if (err) throw err;
            connection_socket = conn;
            real_time_module.real_time_change_listener(connection_socket,'hackathon_DB','Parse_Log','ODD_test_js');
            real_time_module.real_time_change_listener(connection_socket,'test','real_time_test','test_channel');
        });
    },
    initiate_middle_receiver_and_thrower:function(io)
    {
        //var io = require('socket.io')();
        io.sockets.on('connection', function (socket) {
            console.log("real time listener and thrower connected!");
            real_time_module.app_js_middle_receiver_and_thrower(socket,'ODD_test_js','update_DB_data');
            real_time_module.app_js_middle_receiver_and_thrower(socket,'test_channel','update_test_data');
            //callback(io);
        });
    }

}