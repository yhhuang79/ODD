// var GET = require("../../module_js/GET_in_DB");
//
// GET.storage_and_documents("merivan_database","prediction",
//     function(storage,documents)
//     {
//         console.log("storage:",storage,"documents:",documents)
//     })
// var moment = require('moment');

// var test = moment().format('lll');
// var test2 = moment().add(3, 'hours').format('lll');


// var test = moment();
// var test2 = test.format('MMMM Do YYYY, h:mm:ss a');
// var test3 = test.add(15, 'seconds').format('MMMM Do YYYY, h:mm:ss a');
//
// var day = moment.unix(1472440502).format('YYYY-MM-DD hh:mm:ss');
// console.log(day);
//
// var back = moment('2016-08-29 11:15:02').unix();
// console.log(back);

// var test = [{"1":1},{"1":2},{"1":3}];
//
// var test = [1,2,3] ;
// for(var i in test)
// {
//     console.log(i);
//     //console.log(test[i]);
// }

// if(("true" === "false"))
// {
//     console.log(1);
// }
// else
// {
//     console.log(2);
// }
// console.log(test2,'\n',test3);

//
// var a=b=c=1;
//
// console.log(a,b,c)

// console.log(JSON.stringify({"test":1111},null,"\t"));

// var desired = "AA A  A AAA$#$#$%   %&#$".replace(/[^\w]/gi, 'B');
// console.log(desired);

//
// function  test(ABC,callback){
//   console.log(ABC);
//     callback("123","456");
// };
//
// test("ABC",function(string1,string2){console.log(string2)});




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

//----------------------------------------------------------------
// var SlackBot = require('slackbots');
//
// // create a bot
// var bot = new SlackBot({
//     token: 'xoxb-74267961879-gTkTCFvd9ymja4BdID2Vt0hU', // Add a bot https://my.slack.com/services/new/bot and put the token
//     name: 'ODD BOT'
// });
//
// bot.on('start', function() {
//     // more information about additional params https://api.slack.com/methods/chat.postMessage
//     var params = {
//         icon_emoji: ':scream_cat:'
//     };
//
//     console.log(bot.getUser('tinjuiho'));

console.log(1=="1");

    // define channel, where bot exist. You can adjust it there https://my.slack.com/services
    // bot.postMessageToChannel('plash-general', 'test test 1 2 3', params);

    // define existing username instead of 'user_name'
    // bot.postMessageToUser('tinjuiho', 'test test 1 2 3', params);
    //
    // bot.postMessageToUser('tinjuiho', 'hi', params,
    //     function(data)
    //     {
    //         console.log(data);
    //     });
// })


// console.log(bot.getChannels());
// bot.on('message', function(data) {
//
//     var params = {
//         icon_emoji: ':scream_cat:'
//     };
//     // all ingoing events https://api.slack.com/rtm
//     if(data.text=='ODD status')
//     {
//         bot.postMessageToUser('tinjuiho', 'all tables are normal!', params);
//     }
//     else if(data.text=='123')
//     {
//         bot.postMessageToUser('tonykuo', '456', params);
//     }
//
// });
//

