// var setting_file = require('dynamic_and_static_tables_classifying.json');
// var async = require('async');

var counter = [];

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
    $('#' + container_name).highcharts('StockChart', {
        chart: {
            events: {
                load: function () {

                    // set up the updating of the chart each second
                    var series = this.series[0];
                    counter[container_name] = 0;
                    setInterval(function () {
                        var x = (new Date()).getTime(), // current time
                            y = counter[container_name];
                        series.addPoint([x, y], true, true);
                        counter[container_name] = 0;
                    }, 1000);
                }
            }
        },

        rangeSelector: {
            buttons: [{
                count: 1,
                type: 'minute',
                text: '1M'
            }, {
                count: 5,
                type: 'minute',
                text: '5M'
            }, {
                type: 'all',
                text: 'All'
            }],
            inputEnabled: false,
            selected: 0
        },

        title: {
            text: "DB: "+database_name+"<br>Table: "+table_name
        },

        exporting: {
            enabled: false
        },

        series: [{
            name: 'Data',
            data: (function () {
                // generate an array of random data
                var data = [], time = (new Date()).getTime(), i;

                for (i = -999; i <= 0; i += 1) {
                    data.push([
                        time + i * 1000,
                        0
                    ]);
                }
                return data;
            }())
        }]
    });
}


var real_time_receiver = function (channel_name) {
    // var counter=0;
    var socket = io.connect("http://localhost:3001");
    socket.on(channel_name, function (new_data) {
        counter[channel_name.replace(/\//g, '_')]++;
    });
};






