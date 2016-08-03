/**
 * Created by ting-jui on 7/21/16.
 */
var express = require('express');
var router = express.Router();

var async = require('async');
var r = require('rethinkdb');
var rethinkdbHost = "140.109.18.136";
var connection1=null;

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
                    "air quality": function(callback_parallel)
                    {
                        r.db('hackathon_DB').table('Parse_Log').filter({"Task_Name": "air quailty"}).orderBy(r.desc("start_epoch")).limit(5).run(connection1, function(err, cursor) {
                            if (err) throw err;
                            cursor.toArray(function(err, result) {
                                if (err) throw err;
                                //console.log(result[0]);
                                callback_parallel(null, result);
                            });
                        });
                    },

                    "vd_traffic": function(callback_parallel)
                    {
                        r.db('hackathon_DB').table('Parse_Log').filter({"Task_Name": "vd_traffic"}).orderBy(r.desc("start_epoch")).limit(5).run(connection1, function(err, cursor) {
                            if (err) throw err;
                            cursor.toArray(function(err, result) {
                                if (err) throw err;
                                //console.log(result[0]);
                                callback_parallel(null, result);
                            });
                        });
                    }
                },1,
                function(err, results)
                {
                    callback_waterfall(null, results["air quality"], results["vd_traffic"]);
                }
            );

        },
        function(air_quality_data, vd_traffic_data , callback_waterfall)
        {
           // console.log(db_data);
            router.get('/', function(req, res, next) {
                res.render('ODD_test', {
                    air_quality_data: air_quality_data,
                    vd_traffic_data: vd_traffic_data   });
                callback_waterfall(null);
            });
        }
    ]
); //async.waterfall




//real time update
var r = require('rethinkdb');
var connection_socket = null;
r.connect( {host: rethinkdbHost, port: 28015}, function(err, conn) {
    if (err) throw err;
    connection_socket = conn;
    //laborLiveListener = laborLive.rethinkDbListener(r,connection);

    var io = require('socket.io-client');
    var socket = io.connect('http://localhost:3001', {reconnect: true});

    r.db('hackathon_DB').table('Parse_Log').changes().run(connection_socket, function(err, cursor) {

        // test warning system
        var w=0;
        warning_machine=setInterval(function(){console.log("no data input test: "+w++)},10000);

        cursor.each(function (err,item) {

                clearTimeout(warning_machine);
                w=0;
                warning_machine=setInterval(function(){console.log("no data input test: "+w++)},10000);


                //console.log(item);
                console.log("from ODD_test.js to app.js!");
                socket.emit('ODD_test_js', { ODD_test_js: item });

                // console.log(item.new_val.dataset.Time);
            }
        );

    });

});






module.exports = router;
