var real_time_module = require("./real_time_module");
var rethinkdbHost = "140.109.18.136";
var r = require('rethinkdb');
var connection_socket = null;

// var setting_ODD= require("../creating_setting_file/Setting_ODD_warning_and_listener_full.json");
// var setting_ODD= require("../creating_setting_file/Setting_ODD_warning_and_listener_test.json");
// var ODD_size=setting_ODD["RethinkDB"].length;
// var setting_array=setting_ODD["RethinkDB"];


// var setting_ODD= require("../public/javascripts/dynamic_and_static_tables_classifying.json");
var setting_ODD= require("../public/javascripts/dynamic_and_static_tables_classifying_test.json");
var ODD_size=setting_ODD["RethinkDB"]["dynamic table"].length;
var setting_array=setting_ODD["RethinkDB"]["dynamic table"];


module.exports =
{
    initiate_listener:function()
    {
        r.connect( {host: rethinkdbHost, port: 28015}, function(err, conn) {
            if (err) throw err;
            connection_socket = conn;

            // real_time_module.real_time_change_listener(connection_socket,'hackathon_DB','Parse_Log','ODD_test_js',null);
            // real_time_module.real_time_change_listener(connection_socket,'test','real_time_test','test_channel',1000);

            for(var i=0;i<ODD_size;i++)
            {
                real_time_module.real_time_change_listener(connection_socket,
                                                        setting_array[i]["database"],
                                                        setting_array[i]["table"],
                                                        setting_array[i]["throw_channel_name1"],
                                                        setting_array[i]["period"]);
            }
        });
    },
    initiate_middle_receiver_and_thrower:function(io)
    {
        //var io = require('socket.io')();
        io.sockets.on('connection', function (socket) {
            console.log("real time listener and thrower connected!");
            // real_time_module.app_js_middle_receiver_and_thrower(socket,'ODD_test_js','/inspect/hackathon_DB/Parse_Log');
            // real_time_module.app_js_middle_receiver_and_thrower(socket,'test_channel','/inspect/test/real_time_test');

            for(var i=0;i<ODD_size;i++)
            {
                real_time_module.app_js_middle_receiver_and_thrower(socket,
                    setting_array[i]["receive_channel_name"],
                    setting_array[i]["throw_channel_name2"]);
            }

        });
    }

}