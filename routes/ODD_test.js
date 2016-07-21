/**
 * Created by ting-jui on 7/21/16.
 */
var express = require('express');
var router = express.Router();

var async = require('async');
var r = require('rethinkdb');
var rethinkdbHost = "140.109.18.136";
var connection = null;

async.waterfall
(
    [
        function(callback)
        {
            r.connect( {host: rethinkdbHost, port: 28015}, function(err, conn) {

                if (err) throw err;
                callback(null, conn );
                //connection = conn;
            });
        },
        function(conn, callback)
        {
            connection=conn;
            r.db('hackathon_DB').table('Parse_Log').orderBy(r.desc("start_epoch")).limit(4).run(connection, function(err, cursor) {
                if (err) throw err;
                cursor.toArray(function(err, result) {
                    if (err) throw err;
                    //console.log(result[0]);
                    callback(null, result);
                });
            });

        },
        function(db_data, callback)
        {
            console.log(db_data);
            router.get('/', function(req, res, next) {
                res.render('ODD_test', { data: db_data});
            });
            // arg1 now equals 'three'
            //callback(null, 'done');
        }
    ]
);





module.exports = router;
