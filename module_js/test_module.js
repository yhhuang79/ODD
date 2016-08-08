// var table_attr_list_module=require("./table_attr_list_module");
// table_attr_list_module.table_attr_list('AQI_inference','pm25_one_week');


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
function isEmpty(map) {
    for(var key in map) {
        if (map.hasOwnProperty(key)) {
            return false;
        }
    }
    return true;
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
        return {
            "name":obj,
            "children":[]
                };
    }
}


var trial=
{
    "geometry": {
        "coordinates": [
            121.60499999999999 ,
            25.055
        ] ,
        "type":  "Point"
    } ,
    "id":  "00002273-6e45-413d-b6bc-d6a0a48a39c6" ,
    "properties": {
        "col": 29 ,
        "pm2.5": 63 ,
        "row": 16 ,
        "time": "Sat Jan 17 2015 12:00:00 GMT+08:00"
} ,
"type":  "Feature"
}
//
// //console.log(JSON.stringify(trial,null,'\t'));
//
// //isObject(trial["geometry"]["type"]);
//
var result=make_whole_tree_config(trial);
console.log(JSON.stringify(result,null,'\t'));
// console.log(JSON.stringify(result,null,"\t"));
// //console.log(isEmpty("1"));
// //console.log(offer_attribute("1"));
