// used by tree_configuration.js
var async = require('async');
var r = require('rethinkdb');
var rethinkdbHost = "140.109.18.136";
var connection1=null;


function isObject(item) {
    if( (typeof item === "object") && (item !== null) )
    {
        //console.log("is object");
        return true;
    }
    else
    {
        //console.log("not object");
        return false;
    }
}
function offer_attribute(obj){
    var attr_list = Object.keys(obj);
    return attr_list;
}
function make_whole_tree_config(obj){
    if(isObject(obj))
    {
        var attr_list=offer_attribute(obj);
        var result=[];
        for(var index in attr_list)
        {
            result.push(
                {
                    "name":attr_list[index],
                    "children":make_whole_tree_config( obj[attr_list[index]] )
                }
            );
            //console.log(JSON.stringify(result,null,'\t'));
        }
        return result;
    }
    else
    {
        return [];
    }
}


module.exports =
{
    table_attr_list:function(database_name,table_name,callback)
    {
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
                    r.db(database_name).table(table_name).limit(1).run(connection1, function(err, cursor)
                    {
                        //console.log("connect!");
                        if (err) throw err;
                        cursor.toArray(function(err, cursor_array) {
                            //console.log(cursor_array);
                            if (err) throw err;
                            //console.log(result[0]);
                            callback_waterfall(null,cursor_array[0]);
                        });
                    });
                },
                function(one_data_structure,callback_waterfall)
                {
                    // console.log("----------------------------");
                    // console.log(JSON.stringify(one_data_structure,null,'\t'));
                    // console.log("----------------------------");
                    //console.log("one_data_structure:",one_data_structure);
                    var table_config= make_whole_tree_config(one_data_structure);


                    // var attr_list = offer_attribute(one_data_structure);
                    // console.log("attr_list:",attr_list);
                    // console.log("having property?",!isEmpty(one_data_structure));

                    //var test=make_whole_tree_config(one_data_structure);
                    //console.log("test:",test);


                    callback_waterfall(null,table_config);
                }

            ],
            function(err,table_config)
            {
                //console.log("table_config_from module:",JSON.stringify(table_config,null,'\t'));
                callback(table_config);
            }
        ); //async.waterfall
    }



}