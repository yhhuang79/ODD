var express = require('express');
var router = express.Router();
var setting_file = require('../public/javascripts/dynamic_and_static_tables_classifying.json');

var updating_table_channel_name_array=[];

var async = require('async');

/* GET home page. */
router.get('/', function(req, res, next) {

    async.waterfall(
        [
            function(waterfall_callback)
            {
                async.forEachOfLimit(setting_file["RethinkDB"]["dynamic table"], 1 ,
                    function (single_obj, key, forEachOfLimit_callback)
                    {
                        updating_table_channel_name_array.push(
                            single_obj["throw_channel_name2"].replace(/\//g,'_')
                        );

                        forEachOfLimit_callback(null);
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
                res.render('dashboard_updating',
                    {
                      title: 'dash board test set',
                      updating_table_channel_name_array:updating_table_channel_name_array
                    }
                );
                waterfall_callback(null);
            }
        ]
    );


});

module.exports = router;
