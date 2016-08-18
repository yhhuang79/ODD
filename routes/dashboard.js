var express = require('express');
var router = express.Router();
var setting_file = require('../public/javascripts/dynamic_and_static_tables_classifying.json');
var GET_storage_and_documents_in_RethinkDB = require("../module_js/GET_storage_and_documents_in_RethinkDB");

var async = require('async');

/* GET home page. */
router.get('/', function(req, res, next) {
    var updating_table_channel_name_array=[];
    async.waterfall(
        [
            function(waterfall_callback)
            {
                async.forEachOfLimit(setting_file["RethinkDB"]["dynamic table"], 1 ,
                    function (single_obj, key, forEachOfLimit_callback)
                    {
                        var container_id = single_obj["throw_channel_name2"].replace(/\//g,'_');
                        var name_array = single_obj["throw_channel_name2"].split("/");  // 0:null 1:inspect 2:database 3:table
                        var database_name = name_array[2];
                        var table_name = name_array[3];

                        async.parallelLimit(
                             {
                                storage_and_documents: function(callback_parallelLimit)
                                {
                                    GET_storage_and_documents_in_RethinkDB.
                                    GET_storage_and_documents(database_name,table_name,
                                        function(storage_and_documents)
                                        {
                                            console.log(storage_and_documents["storage"]);
                                            callback_parallelLimit(null,storage_and_documents);
                                        });
                                }
                             },1,
                             function(err, results)
                             {
                                 //console.log(results["storage_and_documents"]);

                                 updating_table_channel_name_array.push(
                                     {
                                         "container_id":  container_id,
                                         "database_name": database_name,
                                         "table_name":    table_name,
                                         "storage":results["storage_and_documents"]["storage"],
                                         "documents":results["storage_and_documents"]["documents"]
                                     }

                                 );

                                 forEachOfLimit_callback(null);
                                    // results is now equals to: {one: 1, two: 2}
                             }
                         );



                    },
                    function (err)
                    {
                        if(err) console.log(err);
                        waterfall_callback(null);
                    }
                );
            },
            function(waterfall_callback)
            {
                waterfall_callback(null);
            },
            function(waterfall_callback)
            {
                res.render('dashboard',
                    {
                      title: 'Surveillance of Active Tables in RethinkDB',
                      updating_table_channel_name_array:updating_table_channel_name_array
                    }
                );
                waterfall_callback(null);
            }
        ]
    );


});

module.exports = router;
