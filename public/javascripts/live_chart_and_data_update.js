
var counter = [];
var period_mapping_array = {};   // index: throw_channel_name2
var update_period = 10000;
var status_table={};             // index :data["RethinkDB"]["dynamic table"][single_obj_index]["throw_channel_name2"].replace(/\//g, '_')+"_list";

var warning_machine_array = {};

var my_green = "#A9F5A9";
var my_red = "#F5A9A9";

var live_chart = function (container_name) {
    var name_array = container_name.split("/");  // 0:null 1:inspect 2:database 3:table
    var database_name = name_array[2];
    var table_name = name_array[3];

    container_name = container_name.replace(/\//g, '_');


    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });

    // Create the chart
    $('#' + container_name).highcharts('StockChart',
        {
            chart:
            {
                events:
                {
                    load: function () {

                        // set up the updating of the chart each second
                        var series = this.series[0];
                        counter[container_name] = 0;
                        setInterval(function () {
                            var x = (new Date()).getTime(), // current time
                                y = counter[container_name];
                            series.addPoint([x, y], true, true);

                            counter[container_name] = 0;
                        }, update_period);
                    }
                },
                zoomType: 'x'
            },
            plotOptions:
            {
                line:
                {
                    dataLabels:
                    {
                        enabled: false
                    },
                    enableMouseTracking: true
                }
            },
            rangeSelector:
            {
                buttons:
                [
                    {
                        count: 1, type: 'minute', text: '1M'
                    },
                    {
                        count: 5, type: 'minute', text: '5M'
                    },
                    {
                        count: 30, type: 'minute', text: '30M'
                    },
                    {
                        count: 60, type: 'minute', text: '60M'
                    },
                    {
                        type: 'all', text: 'All'
                    }
                ],
                inputEnabled: false,
                selected: 2
            },
            title:
            {
                //text: "DB: "+database_name+"<br>Table: "+table_name
                text: ""
            },
            exporting:
            {
                enabled: false
            },
            series:
            [
                    {
                        name: 'Data',
                        data:
                                (
                                    function ()
                                    {
                                        // generate an array of random data
                                        var data = [], time = (new Date()).getTime(), i;
                                        for (i = -6*3600/update_period*1000; i <= 0; i += 1)
                                        { // 6-> hr
                                            data.push([
                                                time + i * update_period,
                                                0
                                            ]);
                                        }
                                        return data;
                                    }()
                                ),
                        marker :
                        {
                            enabled : true,
                            radius : 3
                        }
                    }
                ]
        }
    );
};
var real_time_receiver = function (channel_name) {
    // var counter=0;
    var socket = io.connect("http://140.109.18.136:3006");
    socket.on(channel_name, function (new_data) {

        //console.log(new_data);

        counter[channel_name.replace(/\//g, '_')]++;

        var element_id_of_table_detail = channel_name.replace(/\//g, '_')+"_list";

        var Last_update_time_value = moment().format('MM DD YYYY, h:mm:ss a');
        var Next_update_time_value = moment().add(period_mapping_array[channel_name], 'seconds').format('MM DD YYYY, h:mm:ss a');
        var New_documents_number_value =  counter[channel_name.replace(/\//g, '_')];
        var Documents_value = new_data["app_js"]["table_status"]["documents"];
        var Size_value = new_data["app_js"]["table_status"]["storage"];

        status_table[  element_id_of_table_detail   ]["Last_update_time"]           = Last_update_time_value;
        status_table[  element_id_of_table_detail   ]["Next_update_time"]           = Next_update_time_value;
        status_table[  element_id_of_table_detail   ]["New_documents_number"]       = New_documents_number_value;
        status_table[  element_id_of_table_detail   ]["Documents"]                  = Documents_value;
        status_table[  element_id_of_table_detail   ]["Size"]                       = Size_value;

        // $('#'+element_id_of_table_detail+' #Documents').html("Documents: "+Documents );
        // $('#'+element_id_of_table_detail+' #Size').html("Size: "+Size/1000000+" MB" );
        // $('#'+element_id_of_table_detail+' #Last_update_time').html("Last update time: "+ moment().format('MMMM Do YYYY, h:mm:ss a'));
        // $('#'+element_id_of_table_detail+' #Next_update_time').html("Next update time: "+ moment().add(period_mapping_array[channel_name], 'seconds').format('MMMM Do YYYY, h:mm:ss a'));

        var timer_name = channel_name.replace(/\//g, '_')+"_timer";
        clear_warning_machine(warning_machine_array[timer_name]);
        var name_array = channel_name.split("/");  // 0:null 1:inspect 2:database 3:table
        var database_name = name_array[2];
        var table_name = name_array[3];
        var period  = status_table[  element_id_of_table_detail   ]["Period"];
        var element_id_of_color = channel_name.replace(/\//g, '_')+"_color";
        warning_machine_array[timer_name]=warning_machine(period,database_name,table_name,element_id_of_color);

    });
};
function warning_machine(period,database_name,table_name,element_id_of_color) {
    document.getElementById(element_id_of_color).style.backgroundColor = my_green;

    var w=1;
    return setInterval(
        function()
        {
            console.log("no data input test for "+ (w++*(period)) +" sec from database: "+database_name,"table: "+table_name);
            //email_system_module.Email_sender(database_name, table_name, (w++*(period/1000)) );
            document.getElementById(element_id_of_color).style.backgroundColor = my_red;
        }
        ,period*1000);
};
function clear_warning_machine(timer) {
    clearTimeout(timer);
};
var update_function = function(element_id_of_table_detail){

    setInterval(function()
    {
        var Last_update_time_value          = status_table[  element_id_of_table_detail   ]["Last_update_time"];
        var Next_update_time_value          = status_table[  element_id_of_table_detail   ]["Next_update_time"];
        var New_documents_number_value      = status_table[  element_id_of_table_detail   ]["New_documents_number"];
        var Documents_value                 = status_table[  element_id_of_table_detail   ]["Documents"];
        var Size_value                      = status_table[  element_id_of_table_detail   ]["Size"];

        //console.log(status_table);
        if(Last_update_time_value != null)
        {
            $('#'+element_id_of_table_detail+' #Last_update_time').     html("Last update time: "+ Last_update_time_value);
            $('#'+element_id_of_table_detail+' #Next_update_time').     html("Next update time: "+ Next_update_time_value);
            $('#'+element_id_of_table_detail+' #New_documents_number'). html("Last increase documents: "+ New_documents_number_value);
            $('#'+element_id_of_table_detail+' #Documents').            html("Documents: "+ Documents_value);
            $('#'+element_id_of_table_detail+' #Size').                 html("Size: "+Size_value/1000000+" MB" );
        }

    },update_period);

}


// $.getJSON( "./javascripts/dynamic_and_static_tables_classifying.json",
$.getJSON( "./javascripts/dynamic_and_static_tables_classifying_test.json",
    function( data )
    {
        for(var single_obj_index in data["RethinkDB"]["dynamic table"])
        {
            live_chart(data["RethinkDB"]["dynamic table"][single_obj_index]["throw_channel_name2"]);
            real_time_receiver(data["RethinkDB"]["dynamic table"][single_obj_index]["throw_channel_name2"]);


            period_mapping_array[data["RethinkDB"]["dynamic table"][single_obj_index]["throw_channel_name2"]]
                =data["RethinkDB"]["dynamic table"][single_obj_index]["period"];


            var element_id_of_table_detail = data["RethinkDB"]["dynamic table"][single_obj_index]["throw_channel_name2"].replace(/\//g, '_')+"_list";

            status_table[  element_id_of_table_detail   ]={};
            status_table[  element_id_of_table_detail   ]["Last_update_time"]           = null;
            status_table[  element_id_of_table_detail   ]["Next_update_time"]           = null;
            status_table[  element_id_of_table_detail   ]["New_documents_number"]       = null;
            status_table[  element_id_of_table_detail   ]["Period"]                     = data["RethinkDB"]["dynamic table"][single_obj_index]["period"];
            status_table[  element_id_of_table_detail   ]["Documents"]                  = null;
            status_table[  element_id_of_table_detail   ]["Size"]                       = null;

            update_function(element_id_of_table_detail);

            var database_name =data["RethinkDB"]["dynamic table"][single_obj_index]["database"];
            var table_name =data["RethinkDB"]["dynamic table"][single_obj_index]["table"];
            var period =data["RethinkDB"]["dynamic table"][single_obj_index]["period"];
            var timer_name = data["RethinkDB"]["dynamic table"][single_obj_index]["throw_channel_name2"].replace(/\//g, '_')+"_timer";
            var element_id_of_color = data["RethinkDB"]["dynamic table"][single_obj_index]["throw_channel_name2"].replace(/\//g, '_')+"_color";
            warning_machine_array[timer_name]=warning_machine(period,database_name,table_name,element_id_of_color);



            //document.getElementById(element_id_of_color).style.backgroundColor = my_green;


        }
    }
);

