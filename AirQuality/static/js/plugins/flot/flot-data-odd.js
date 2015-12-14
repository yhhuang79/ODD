// float data, data source for ODD


// Flot Chart Dynamic Chart
// angus:  Moving Line Chart
$(function() {

    var container = $("#flot-moving-line-chart");

    // Determine how many data points to keep based on the placeholder's initial size;
    // this gives us a nice high-res plot while avoiding more than one point per pixel.

    var maximum = container.outerWidth() / 2 || 300;

    //

    var data = [];

    function getRandomData() {

        if (data.length) {
            data = data.slice(1);
        }

        while (data.length < maximum) {
            var previous = data.length ? data[data.length - 1] : 50;
            var y = previous + Math.random() * 10 - 5;
            data.push(y < 0 ? 0 : y > 100 ? 100 : y);
        }
        // document.write(data)
        // zip the generated y values with the x values

        var res = [];
        for (var i = 0; i < data.length; ++i) {
            res.push([i, data[i]])
        }

        return res;
    }

    //

    series = [{
        data: getRandomData(),
        lines: {
            fill: true
        }
    }];

    //

    var plot = $.plot(container, series, {
        grid: {
            borderWidth: 1,
            minBorderMargin: 20,
            labelMargin: 10,
            backgroundColor: {
                colors: ["#fff", "#e4f4f4"]
            },
            margin: {
                top: 8,
                bottom: 20,
                left: 20
            },
            markings: function(axes) {
                var markings = [];
                var xaxis = axes.xaxis;
                for (var x = Math.floor(xaxis.min); x < xaxis.max; x += xaxis.tickSize * 2) {
                    markings.push({
                        xaxis: {
                            from: x,
                            to: x + xaxis.tickSize
                        },
                        color: "rgba(232, 232, 255, 0.2)"
                    });
                }
                return markings;
            }
        },
        xaxis: {
            tickFormatter: function() {
                return "";
            }
        },
        yaxis: {
            min: 0,
            max: 110
        },
        legend: {
            show: true
        }
    });

    // Update the random dataset at 25FPS for a smoothly-animating chart

    setInterval(function updateRandom() {
        series[0].data = getRandomData();
        plot.setData(series);
        plot.draw();
    }, 40);

});

// Flot Chart Bar Graph
// angus: Bar Graph with Tooltips

$(function() {
    // var barOptions = {
    //     series: {
    //         bars: {
    //             show: true,
    //             // barWidth: 43200000
    //             barWidth: 20000
    //
    //         }
    //     },
    //     xaxis: {
    //         mode: "time",
    //         timeformat: "%m/%d/%h",
    //         // minTickSize: [1, "minute"]
    //         minTickSize: [1,"second"]
    //     },
    //     grid: {
    //         hoverable: true
    //     },
    //     legend: {
    //         show: false
    //     },
    //     tooltip: true,
    //     tooltipOpts: {
    //         content: "x: %x, y: %y"
    //     }
    // };


    var barData = {
        label: "bar",
         data : [] // i want the realtime data
        // data: [
        //    [1447747200, 1],
        //    [1447750800, 1],
        //    [1447754400, 0.5],
        //    [1447758000, 1],tw
        //    [1447761600, 1],
        //    [1447765200, 1],
        //    [1447768800, 0.5],
        //    [1447772400, 1],
        //    [1447776000, 1],
        //    [1447779600, 1],
        //    [1447783200, 0.5],
        //    [1447786800, 1],
        //    [1447790400, 1]
        // ]
    };


    setInterval(function(){
      $.get( "http://127.0.0.1:8000/ODD/error_data", function(realtimedata ) {
        //alert(realtimedata);
        barData.data=JSON.parse(realtimedata);
        console.log(JSON.stringify(barData));
         $.plot($("#flot-bar-chart"), [barData], barOptions);
      });
    }, 1000);


    var barOptions = {
        series: {
            bars: {
                show: true,
                // barWidth: 43200000
                barWidth: 30000

            }
        },
        xaxis: {
            mode: "time",
            timeformat: "%h",  //%m/%d/%h
            // minTickSize: [1, "minute"]
            minTickSize: [1,"second"]
        },
        grid: {
            hoverable: true
        },
        legend: {
            show: false
        },
        tooltip: true,
        tooltipOpts: {
            content: "x: %x, y: %y"
        }
    };


});
