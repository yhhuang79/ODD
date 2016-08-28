var GET = require("../module_js/GET_in_DB");

var express = require('express');
var router = express.Router();

var async = require('async');
var r = require('rethinkdb');
var rethinkdbHost = "140.109.18.136";
var connection1=null;

var jsonfile = require('jsonfile');

function offer_attribute(obj){
    var attr_list = Object.keys(obj);
    return attr_list;
}

var time_name_list=
{
    "Heat_Wave":
    {
        "WBGT":"epochtime",
        "LASS_API":"epochtime"
    },
    "data_2015":
    {
        "weather":"read_time"
    },
    "hackathon_DB":
    {
        "Air_Q":"PublishTime"
    },
    "real_time_TP_grid_data":
    {
        "air_labeld":"epochtime",
        "labled":"epoch",
        "unlabled":"epoch"
    },
    "test":
    {
        "air":"epochtime",
        "tw_weather":"epochtime",
        "weather":"time"
    },
};


//   /inspect
router.get('/', function(req, res , next){

    res.render("one_for_all_test_root",
        {
            title:"Data Query"
        }
    )
});

//   /inspect
router.post('/', function(req, res , next){

    var query_array=req["body"]["query_string"].split("/");
    var file_name = req["body"]["query_string"].replace(/\//g,'_');
    var DB_name = query_array[0];
    var table_name = query_array[1];

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
                        "query": function(callback_parallel)
                        {
                            if(DB_name==null || table_name==null)
                            {
                                callback_parallel(null,null);
                            }
                            else
                            {
                                r.db(DB_name).table(table_name).limit(1).run(connection1, function(err, cursor) {
                                    if (err)
                                    {
                                        //console.log("error 11111");
                                        callback_parallel(null,null);
                                    }
                                    else
                                    {
                                        cursor.toArray(function(err, result) {
                                            if (err)
                                            {
                                                callback_parallel(null);
                                            }
                                            else
                                            {
                                                //console.log("result:",result);
                                                callback_parallel(null, result);
                                            }

                                        });
                                    }

                                });
                            }

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
                            if(results["query"]==null)
                            {
                                callback_waterfall(null, "wrong query");
                            }
                            else
                            {
                                callback_waterfall(null, results["query"]);
                            }
                        }
                    }
                );
            },
            function(data, callback_waterfall)
            {
                console.log(data);
                router.get('/'+file_name+'.json',function(req,res){
                    res.set({"Content-Disposition":"attachment; filename=\""+file_name+".json\""});
                    res.send(JSON.stringify(data,null," "));
                });

                res.send(data);
                callback_waterfall(null);

            }
        ]
    ); //async.waterfall
});



//  /device
router.post('/device_list', function(req, res , next){

    var database=req["body"]["database"];
    var table = req["body"]["table"];

    var device_name_list=
    {
        "Heat_Wave":
        {
            "WBGT":"SiteName",
            "LASS_API":"device_id"
        },
        "data_2015":
        {
            "weather":"sitename"
        },
        "hackathon_DB":
        {
            "Air_Q":"SiteName"
        },
        "real_time_TP_grid_data":
        {
            "air_labeld":"",
            "labled":"",
            "unlabled":""
        },
        "":
        {

        },
    }
    //console.log(query_array);
    //console.log("req",req);
    //console.log("POST!!!");
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
                        "device_list": function(callback_parallel)
                        {
                            if(DB_name==null || table_name==null)
                            {
                                callback_parallel(null,null);
                            }
                            else
                            {
                                r.db(database).table(table).limit(1).run(connection1, function(err, cursor) {
                                    if (err)
                                    {
                                        //console.log("error 11111");
                                        callback_parallel(null,null);
                                    }
                                    else
                                    {
                                        cursor.toArray(function(err, result) {
                                            if (err)
                                            {
                                                callback_parallel(null);
                                            }
                                            else
                                            {
                                                //console.log("result:",result);
                                                callback_parallel(null, result);
                                            }

                                        });
                                    }

                                });
                            }

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
                            if(results["query"]==null)
                            {
                                callback_waterfall(null, "wrong query");
                            }
                            else
                            {
                                callback_waterfall(null, results["query"]);
                            }
                        }
                    }
                );
            },
            function(data, callback_waterfall)
            {
                console.log(data);
                router.get('/'+file_name+'.json',function(req,res){
                    res.set({"Content-Disposition":"attachment; filename=\""+file_name+".json\""});
                    res.send(JSON.stringify(data,null," "));
                });

                res.send(data);
                callback_waterfall(null);

            }
        ]
    ); //async.waterfall
});
// / two time points
router.post('/time_points', function(req, res , next){

    var database=req["body"]["database"];
    var table = req["body"]["table"];
    var time_index = time_name_list[database][table];
    console.log(database,table,time_index);

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
                            r.db(database).table(table).max(time_index)(time_index).run(connection1, function(err, max_time) {
                                if (err)
                                {
                                    console.log("error 1 step");
                                    callback_parallel(null,null);
                                }
                                else
                                {
                                    var max_time_value = max_time;
                                    r.db(database).table(table).min(time_index)(time_index).run(connection1,
                                        function(err, min_time)
                                        {
                                            var min_time_value = min_time;
                                            callback_parallel(null,
                                                {
                                                    "max_time":max_time_value,
                                                    "min_time":min_time_value
                                                });
                                        }
                                    );
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
                res.send(data);
                callback_waterfall(null);
            }
        ]
    ); //async.waterfall
});
// / query
router.post('/query', function(req, res , next){

    var database=req["body"]["database"];
    var table = req["body"]["table"];
    var time_index = time_name_list[database][table];
    var start_time = req["body"]["start_time"];
    var end_time = req["body"]["end_time"];

    if(time_index=="epochtime" || time_index=="epoch" || time_index=="time")
    {
        start_time = parseInt(start_time);
        end_time   = parseInt(end_time);
    }

    var file_name = database+"_"+table+"_"+time_index+"_"+start_time+"_"+end_time;
    file_name = file_name.replace(/[^\w]/gi, '_');
    //console.log(file_name);

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
                        "query_all_device": function(callback_parallel)
                        {

                            r.db(database).table(table).filter( r.row(time_index).ge(start_time).
                            and(r.row(time_index).le(end_time)) ).run(connection1, function(err, result)
                            {
                                if (err)
                                {
                                    console.log("error 1 step");
                                    callback_parallel(null,null);
                                }
                                else
                                {
                                    result.toArray(function(err, result) {
                                        if (err)
                                        {
                                            callback_parallel(null);
                                        }
                                        else
                                        {
                                            //console.log("result:",result);
                                            callback_parallel(null, result);
                                        }

                                    });

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
                            if(results["query_all_device"]==null)
                            {
                                callback_waterfall(null, "wrong query");
                            }
                            else
                            {
                                callback_waterfall(null, results["query_all_device"]);
                            }
                        }
                    }
                );
            },
            function(data, callback_waterfall)
            {
                console.log(file_name);
                router.get('/'+file_name+'.json',function(req,res){
                    res.set({"Content-Disposition":"attachment; filename=\""+file_name+".json\""});
                    res.send(JSON.stringify(data,null," "));
                });


                //console.log(data);

                res.send
                (
                    {
                        "file_name":file_name,
                        "data":data
                    }
                );
                callback_waterfall(null);
            }
        ]
    ); //async.waterfall
});



//   /inspect/database/table
router.get('/:database/:table', function(req, res, next) {

    var database_name = req.params.database;
    var table_name = req.params.table;

    console.log("database_name:",database_name,"table_name:",table_name);

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
                        "request": function(callback_parallel)
                        {
                            r.db(database_name).table(table_name).limit(25).run(connection1, function(err, cursor) {
                                if (err)
                                {
                                    //console.log("error 11111");
                                    callback_parallel(null,null);
                                }
                                else
                                {
                                    cursor.toArray(function(err, result) {
                                        if (err)
                                        {

                                            callback_parallel(null);
                                        }
                                        else
                                        {
                                            //console.log("result:",result);
                                            callback_parallel(null, result);
                                        }

                                    });
                                }

                            });
                        },
                        "storage_and_documents":function(callback_parallel)
                        {
                            GET.storage_and_documents(database_name,table_name,
                                function(storage_and_documents)
                                {
                                    console.log("storage_and_documents",storage_and_documents);
                                    callback_parallel(null,storage_and_documents);
                                }
                            )
                        }

                    },1,
                    function(err, results)
                    {
                        if(err)
                        {
                            //callback_waterfall(err);
                            callback_waterfall(null, null ,null,null);

                        }
                        else
                        {
                            console.log(results);
                            if(results["request"]==null)
                            {
                                callback_waterfall(null, null ,null,null);
                            }
                            else
                            {
                                var header = offer_attribute(results["request"][0]);
                                console.log("header:",header);
                                //console.log(header);
                                callback_waterfall(null, header ,results["request"],results["storage_and_documents"]);
                            }

                        }

                    }
                );

            },
            function(header,data,storage_and_documents, callback_waterfall)
            {
                //console.log(header);
                //console.log(data);

                if(header==null)
                {
                    // res.render('one_for_all_test',
                    //     {
                    //         database_name:database_name,
                    //         table_name:table_name,
                    //         header:["not exist"],
                    //         data: []
                    //     });

                    res.status(404).send('Sorry!! Database:'+database_name+' or table:'+table_name+' is not found!!!');
                    callback_waterfall(null);
                }
                else
                {
                    res.render('one_for_all_test',
                        {
                            database_name:database_name,
                            table_name:table_name,
                            header:header,
                            data: data,
                            storage:storage_and_documents["storage"],
                            documents:storage_and_documents["documents"]
                        });

                    callback_waterfall(null);
                }


            }
        ]
    ); //async.waterfall



});

module.exports = router;
