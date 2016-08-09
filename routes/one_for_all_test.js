var express = require('express');
var router = express.Router();

var async = require('async');
var r = require('rethinkdb');
var rethinkdbHost = "140.109.18.136";
var connection1=null;

function offer_attribute(obj){
    var attr_list = Object.keys(obj);
    return attr_list;
}

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
                connection1=conn;

                async.parallelLimit(
                    {
                        "request": function(callback_parallel)
                        {
                            r.db(database_name).table(table_name).limit(5).run(connection1, function(err, cursor) {
                                if (err)
                                {
                                    callback_parallel(null,null);
                                }
                                else
                                {
                                    cursor.toArray(function(err, result) {
                                        if (err)
                                        {
                                            callback_parallel(null,null);
                                        }
                                        else
                                        {
                                            //console.log(result);
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
                            //callback_waterfall(err);
                            callback_waterfall(null, null ,null);

                        }
                        else
                        {
                            //console.log(results);
                            if(results["request"]==null)
                            {
                                callback_waterfall(null, null ,null);
                            }
                            else
                            {
                                var header = offer_attribute(results["request"][0]);
                                //console.log(header);
                                callback_waterfall(null, header ,results["request"]);
                            }

                        }

                    }
                );

            },
            function(header,data, callback_waterfall)
            {
                console.log(header);
                console.log(data);

                if(header==null)
                {
                    res.render('one_for_all_test',
                        {
                            database_name:database_name,
                            table_name:table_name,
                            header:["not exist"],
                            data: []
                        });

                    callback_waterfall(null);
                }
                else
                {
                    res.render('one_for_all_test',
                        {
                            database_name:database_name,
                            table_name:table_name,
                            header:header,
                            data: data
                        });

                    callback_waterfall(null);
                }


            }
        ]
    ); //async.waterfall



});




module.exports = router;
