var ODD_structure = require('./Setting_ODD_warning_and_listener_full_2.json');
ODD_structure = ODD_structure["RethinkDB"];
var async = require('async');
var series_data_array = [];
var drilldown_series_array = [];

var jsonfile = require('jsonfile');
var filename = '../public/javascripts/statistics_data.json';


series_data_array.push
(
    {
        name: ODD_structure[0]["database"],
        y: ODD_structure[0]["storage"]/1000000,
        drilldown: ODD_structure[0]["database"]  // match ID below
    }
);

drilldown_series_array.push
(
    {
        name: ODD_structure[0]["database"],
        id: ODD_structure[0]["database"],
        data: [ [ODD_structure[0]["table"],ODD_structure[0]["storage"]/1000000] ]
    }
);

var pointer = 0 ;
for(var i=1; i <ODD_structure.length;i++)
{
    if(ODD_structure[i]["database"]==ODD_structure[i-1]["database"])
    {
        series_data_array[pointer]["y"]+=ODD_structure[i]["storage"]/1000000;
        drilldown_series_array[pointer]["data"].push([ ODD_structure[i]["table"],ODD_structure[i]["storage"]/1000000 ])
    }
    else
    {
        pointer++;
        series_data_array.push
        (
            {
                name: ODD_structure[i]["database"],
                y: ODD_structure[i]["storage"]/1000000,
                drilldown: ODD_structure[i]["database"]  // match ID below
            }
        );

        drilldown_series_array.push
        (
            {
                name: ODD_structure[i]["database"],
                id: ODD_structure[i]["database"],
                data: [ [ODD_structure[i]["table"],ODD_structure[i]["storage"]/1000000] ]
            }
        );
    }
}


// console.log(series_data_array);
// console.log(JSON.stringify(drilldown_series_array,null,'\n'));

jsonfile.writeFile(filename, {"series_data_array":series_data_array,"drilldown_series_array":drilldown_series_array}, {spaces: " "},
    function(err)
    {
        if(err) console.log(err);
        console.log("finish!");
        process.exit();
    });