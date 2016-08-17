var express = require('express');
var router = express.Router();
var tree_configuration = require("./tree_configuration.json")

var express = require('express');
var router = express.Router();

var async = require('async');
var r = require('rethinkdb');
var rethinkdbHost = "140.109.18.136";
var connection1=null;

var table_attr_list_module= require("../../module_js/table_attr_list_module");

table_attr_list_module.table_attr_list('AQI_inference','pm25_one_week',
    function(result)
    {
        console.log("results: ",JSON.stringify(result,null,'\t'));
        //console.log("finish")
    }
);




// var xxx=[1,2,3];
// console.log(xxx.length);
