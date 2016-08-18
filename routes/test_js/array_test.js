var GET = require("../../module_js/GET_storage_and_documents_in_RethinkDB");

GET.GET_storage_and_documents("merivan_database","prediction",
    function(storage,documents)
    {
        console.log("storage:",storage,"documents:",documents)
    })




// var async = require('async');
// var r = require('rethinkdb');
// var rethinkdbHost = "140.109.18.136";
// var connection1=null;
//
//
// async.waterfall
// (
//     [
//         function(callback_waterfall)
//         {
//             r.connect( {host: rethinkdbHost, port: 28015}, function(err, conn) {
//
//                 if (err) throw err;
//                 callback_waterfall(null, conn );
//                 //connection = conn;
//             });
//         },
//         function(conn, callback_waterfall)
//         {
//             connection1=conn;
//
//             async.parallelLimit(
//                 {
//                     storage: function(callback_parallelLimit)
//                     {
//                         r.db('rethinkdb').table('stats').
//                         filter(
//                             function(row){return row('id')(0).eq('table_server').and(row('table').eq('real_time_TP_grid_data'))}
//                         )
//                         ('storage_engine')('disk')('space_usage')('data_bytes').sum().run(connection1,
//                             function(err, cursor) {
//                                 if (err)
//                                 {
//                                     callback_parallelLimit(err);
//                                 }
//                                 else
//                                 {
//                                     //console.log(cursor);
//                                     callback_parallelLimit(null, cursor);
//                                 }
//                             });
//
//                     },
//                     documents: function(callback_parallelLimit)
//                     {
//                         r.db('rethinkdb').table('stats').count().run(connection1,
//                             function(err, cursor) {
//                                 if (err)
//                                 {
//                                     callback_parallelLimit(err);
//                                 }
//                                 else
//                                 {
//                                     // console.log(cursor);
//                                     callback_parallelLimit(null, cursor);
//                                 }
//                             });
//                     }
//                 },1,
//                 function(err, results)
//                 {
//
//                     console.log(results);
//                     process.exit();
//                     // results is now equals to: {one: 1, two: 2}
//                 });
//
//
//
//
//
//
//         }
//
//     ]
// ); //async.waterfall
//
//
//






