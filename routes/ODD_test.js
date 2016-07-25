/**
 * Created by ting-jui on 7/21/16.
 */
var express = require('express');
var router = express.Router();

var async = require('async');
var r = require('rethinkdb');
var rethinkdbHost = "140.109.18.136";


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
            r.db('hackathon_DB').table('Parse_Log').orderBy(r.desc("start_epoch")).limit(6).run(connection, function(err, cursor) {
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
           // console.log(db_data);
            router.get('/', function(req, res, next) {
                res.render('ODD_test', { data: db_data});
            });
            // arg1 now equals 'three'
            //callback(null, 'done');
        }
    ]
); //async.waterfall


var r = require('rethinkdb');
var connection = null;
r.connect( {host: rethinkdbHost, port: 28015}, function(err, conn) {
    if (err) throw err;
    connection = conn;
    //laborLiveListener = laborLive.rethinkDbListener(r,connection);

    var io = require('socket.io-client');
    var socket = io.connect('http://localhost:3001', {reconnect: true});

    r.db('hackathon_DB').table('Parse_Log').changes().run(connection, function(err, cursor) {

        cursor.each(function (err,item) {

                console.log(item);

                console.log("send!");
                socket.emit('ODD_test_js', { ODD_test_js: item });

                // console.log(item.new_val.dataset.Time);
            }
        );

    });

});







module.exports = router;
