var async = require('async');
var jsonfile = require('jsonfile');

var ODD_structure = require('./Setting_ODD_warning_and_listener_full.json');

var mapping_array={};
var mapping_array_file = "./mapping_array.json"; //result file name

var classification=
{
    "RethinkDB":
    {
        "dynamic table":[],
        "static table":[]
    }
};
var classification_file = "./dynamic_and_static_tables_classifying.json"; //result file name


var closed_time =  100; // sec
var duration    = 7200;  //sec

var clock=0;
setInterval(function(){console.log(++clock+' sec');},1000);
//var socket = io.connect("http://localhost:3001");


async.waterfall(
    [
        function(callback_waterfall)
        {
            async.forEachOfLimit(ODD_structure["RethinkDB"],1,
                function(single_obj,key,callback_forEach_in)
                {
                    mapping_array[single_obj["throw_channel_name2"]]=key;
                    callback_forEach_in(null);
                },
                function(err)
                {
                    jsonfile.writeFile(mapping_array_file, mapping_array,{spaces: " "},
                        function(err)
                        {
                            if(err) console.log(err);
                            console.log("finish"+mapping_array_file);
                            callback_waterfall(null);
                        }
                    );
                }
            );

        },
        function(callback_waterfall)
        {

            //var socket = io.connect("http://localhost:3001");

            function update_listener(receive_channel_name2)
            {
                var io = require('socket.io-client');
                var socket = io.connect('http://localhost:3001', {reconnect: true});
                var new_date_or_not = true;

                ODD_structure["RethinkDB"][mapping_array[receive_channel_name2]]["update_timing_record"]=[];

                socket.on(receive_channel_name2, function (new_data)
                {
                    if(new_date_or_not)
                    {
                        new_date_or_not = false;
                        setTimeout(function(){ new_date_or_not=true; },closed_time*1000);

                        console.log("got data from "+receive_channel_name2);
                        ODD_structure["RethinkDB"][mapping_array[receive_channel_name2]]["update_timing_record"].unshift( ((new Date()).getTime()/1000).toFixed(0) );

                    }

                });
            };

            for(var receive_channel_name2 in mapping_array)
            {
                update_listener(receive_channel_name2);
            }

            // update_listener("/inspect/hackathon_DB/Parse_Log");
            // update_listener("/inspect/test/real_time_test");



            setTimeout(
                function()
                {
                    callback_waterfall(null);
                },duration*1000)

        },
        function(callback_waterfall)
        {
            async.forEachOfLimit(ODD_structure["RethinkDB"],1,
                function(single_obj,key,callback_forEach)
                {
                    if(single_obj["update_timing_record"].length!=0)
                    {
                        var sum=0;
                        for(var i=0;i<single_obj["update_timing_record"].length-1;i++)
                        {
                            sum+=single_obj["update_timing_record"][i]-single_obj["update_timing_record"][i+1];
                        }
                        single_obj["period"] = (sum/(single_obj["update_timing_record"].length-1)).toFixed(0);

                        classification["RethinkDB"]["dynamic table"].push(single_obj);
                        callback_forEach(null);
                    }
                    else
                    {
                        delete single_obj["update_timing_record"];
                        delete single_obj["period"];

                        classification["RethinkDB"]["static table"].push(single_obj);
                        callback_forEach(null);
                    }
                },
                function(err)
                {
                    callback_waterfall(null);
                }
            );

        }
    ],
    function (err)
    {
        //console.log(mapping_array);

        jsonfile.writeFile(classification_file, classification ,{spaces: " "},
            function(err)
            {
                if(err) console.log(err);
                console.log("finish!"+classification_file);
                process.exit();
            });

    }
);



// socket.on(location.pathname,function(new_data)
// {
//     console.log('showing on html');
//     console.log(new_data);
//     console.log(new_data['app_js']['thrower']['new_val'].Task_Name);
//     counter++;
// });



// async.forEachOf(first_time_record_point["RethinkDB"],
//     function (single_obj, key, callback)
//     {
//         if()
//
//
//     },
//     function (err) {
//     if (err) console.error(err.message);
//     // configs is now a map of JSON data
// });



// for(var i=0;i<data_size;i++)
// {
//     if(first_time_record_point["RethinkDB"][i]["documents"]!=second_time_record_point["RethinkDB"][i]["documents"])
//     {
//         var frequency = (second_time_record_point["RethinkDB"][i]["documents"]-
//                             first_time_record_point["RethinkDB"][i]["documents"])/time_difference_sec;
//
//         second_time_record_point["RethinkDB"][i]["period"]=1/frequency;
//         classification["RethinkDB"]["dynamic table"].push(second_time_record_point["RethinkDB"][i]);
//
//     }
//     else
//     {
//         classification["RethinkDB"]["static table"].push(second_time_record_point["RethinkDB"][i]);
//     }
//
// }

//
// jsonfile.writeFile(filename, classification, {spaces: " "},
//     function(err)
//     {
//         if(err) console.log(err);
//         console.log("finish!");
//         process.exit();
//     }
// );