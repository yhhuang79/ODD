var async = require('async');
var r = require('rethinkdb');
var jsonfile = require('jsonfile');

var rethinkdbHost = "140.109.18.136";
var connection1=null;

var clock = new Date();
var DB_structure={"RethinkDB": [],"Record_Time":clock.getTime()};
var filename = "./Setting_ODD_warning_and_listener_full_2.json";

var GET = require("../module_js/GET_in_DB");

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

                    if(single_db_name=="rethinkdb")
                    {
                        callback_forEach(null);
                    }
                    else
                    {
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
                                            async.parallelLimit(
                                                {
                                                    documents_and_storage: function(callback_parallelLimit)
                                                    {
                                                        GET.storage_and_documents(single_db_name,single_table_name,
                                                            function(result)
                                                            {
                                                                callback_parallelLimit(null,result);
                                                            });
                                                    }
                                                },1,
                                                function(err, results)
                                                {
                                                    if (err) throw err;
                                                    DB_structure["RethinkDB"].push(
                                                        {
                                                            "database":single_db_name,
                                                            "table":single_table_name,
                                                            "throw_channel_name1":single_table_name,
                                                            "period":null,
                                                            "receive_channel_name":single_table_name,
                                                            "throw_channel_name2":"/inspect/"+single_db_name+"/"+single_table_name,
                                                            "documents":results["documents_and_storage"]["documents"],
                                                            "storage":results["documents_and_storage"]["storage"]
                                                        }
                                                    );
                                                    callback_forEach_in(null);
                                                    // results is now equals to: {one: 1, two: 2}
                                                }
                                            );

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
                                callback_forEach(null);
                            }
                        );
                    }

                },
                function(err)
                {
                    if(err) console.log(err);
                    callback_waterfall(null);
                });
        },
        function (callback_waterfall)
        {
            jsonfile.writeFile(filename, DB_structure, {spaces: " "},
                function(err)
                {
                    if(err) console.log(err);
                    console.log("finish!");
                    process.exit();
                    callback_waterfall(null);
                });

        }
    ]
); //async.waterfall


