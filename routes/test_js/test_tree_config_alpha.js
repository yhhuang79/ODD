// var express = require('express');
// var router = express.Router();
// var tree_configuration = require("./tree_configuration.json")
//
// var express = require('express');
// var router = express.Router();

var async = require('async');
var r = require('rethinkdb');
var rethinkdbHost = "140.109.18.136";
var connection1=null;

// var table_attr_list_module= require("../../module_js/table_attr_list_module");
//
// table_attr_list_module.table_attr_list('AQI_inference','pm25_one_week',
//     function(result)
//     {
//         console.log("results: ",JSON.stringify(result,null,'\t'));
//         //console.log("finish")
//     }
// );


async.waterfall
(
    [
        function(callback_waterfall)
        {
            r.connect( {host: rethinkdbHost, port: 28015}, function(err, conn) {

                if (err) throw err;
                callback_waterfall(null, conn );
                //connection = conn;
            });
        },
        function(conn, callback_waterfall)
        {
            console.log("connected!!!");
            connection1=conn;

            async.parallelLimit(
                {
                    "max_and_min_time": function(callback_parallel)
                    {
                        r.db("test").table("weather").max('time')('time').run(connection1, function(err, max_time) {
                            if (err)
                            {
                                console.log("error 11111");
                                callback_parallel(null,null);
                            }
                            else
                            {
                                var max_time_value = max_time;
                                r.db("test").table("weather").min('time')('time').run(connection1,
                                    function(err, min_time)
                                    {
                                        var min_time_value = min_time;

                                        callback_parallel(null,
                                            {
                                                "max_time":max_time_value,
                                                "min_time":min_time_value
                                            });
                                    });

                                //console.log(cursor);
                                // cursor.toArray(function(err, result) {
                                //     if (err)
                                //     {
                                //         callback_parallel(null);
                                //     }
                                //     else
                                //     {
                                //         //console.log("result:",result);
                                //         callback_parallel(null, result);
                                //     }
                                //
                                // });

                            }

                        });
                    }
                },1,
                function(err, results)
                {
                    if(err)
                    {
                        callback_waterfall(null, null);
                    }
                    else
                    {
                        //console.log(results);
                        if(results["max_and_min_time"]==null)
                        {
                            callback_waterfall(null, "wrong query");
                        }
                        else
                        {
                            callback_waterfall(null, results["max_and_min_time"]);
                        }
                    }
                }
            );
        },
        function(data, callback_waterfall)
        {
            console.log
            (
                JSON.stringify(data, null, '\t' )
            );

            callback_waterfall(null);
            process.exit();
        }
    ]
); //async.waterfall



// var xxx=[1,2,3];
// console.log(xxx.length);
