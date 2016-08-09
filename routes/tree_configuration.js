var express = require('express');
var router = express.Router();
var tree_configuration = require("./tree_configuration.json")

var async = require('async');
var r = require('rethinkdb');

var table_attr_list_module= require("../module_js/table_attr_list_module");

var rethinkdbHost = "140.109.18.136";
var connection1=null;


var db_config={
                "name":"PLASH rethinkdb",
                "children":[]
              };

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

            r.dbList().run(connection1, function(err, cursor)
            {
                if (err) throw err;

            callback_waterfall(null,cursor);
            });
        },
        function(dbList, callback_waterfall)
        {
            async.forEachOfLimit(dbList,1,
                function(single_db_name,key,callback_forEach)
                {
                    var temp={"name":single_db_name,
                              "children":[]};

                    async.waterfall(
                    [
                        function(callback_waterfall_in)
                        {
                            r.db(single_db_name).tableList().run(connection1, function(err, cursor)
                            {
                                if (err) throw err;
                                callback_waterfall_in(null,cursor);
                            });

                        },
                        function(tableList, callback_waterfall_in)
                        {
                            async.forEachOfLimit(tableList,1,
                            function(single_table_name,key2,callback_forEach_in)
                            {
                                //console.log(single_db_name,single_table_name);


                                table_attr_list_module.table_attr_list(single_db_name,single_table_name,
                                    function(tree_config)
                                    {
                                        temp["children"].push(
                                            {
                                                "name":single_table_name,
                                                //"url":"/test_template",
                                                "children":tree_config,
                                                //"test":[]
                                            }
                                        );

                                        //console.log("tree_config:",tree_config[0]);
                                        setTimeout(function(){callback_forEach_in();},0);
                                    });



                            },
                            function(err)
                            {
                                if(err) console.log(err);
                                callback_waterfall_in(null);
                            }
                            );
                        }
                    ],
                    function (err)
                    {
                        if(err) console.log(err);
                        db_config["children"].push(temp);
                        callback_forEach(null);
                    }
                    );
                },
                function(err)
                {
                    if(err) console.log(err);

                   //console.log("results:  !!! ",JSON.stringify(db_config,null,'\t'));

                    router.get('/', function(req, res, next) {
                        //console.log(JSON.stringify(tree_configuration));
                        //res.send(JSON.stringify(tree_configuration));
                        res.send(JSON.stringify(db_config,null,' '));
                    });

                    callback_waterfall(null);
                });
        }

    ]
); //async.waterfall




module.exports = router;

