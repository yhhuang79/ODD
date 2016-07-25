function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++)
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam)
        {
            return sParameterName[1];
        }
    }
}

$(document).ready(function() {

    var doughnutData = [
        {
            value: 30,
            color:"#F7464A"
        },
        {
            value : 50,
            color : "#46BFBD"
        },
        {
            value : 100,
            color : "#FDB45C"
        },
        {
            value : 40,
            color : "#949FB1"
        },
        {
            value : 120,
            color : "#4D5360"
        }

    ];
    var lineChartData = {
        labels : ["","","","","","",""],
        datasets : [
            {
                fillColor : "rgba(220,220,220,0.5)",
                strokeColor : "rgba(220,220,220,1)",
                pointColor : "rgba(220,220,220,1)",
                pointStrokeColor : "#fff",
                data : [65,59,90,81,56,55,40]
            },
            {
                fillColor : "rgba(151,187,205,0.5)",
                strokeColor : "rgba(151,187,205,1)",
                pointColor : "rgba(151,187,205,1)",
                pointStrokeColor : "#fff",
                data : [28,48,40,19,96,27,100]
            }
        ]

    };
    var pieData = [
        {
            value: 30,
            color:"#F38630"
        },
        {
            value : 50,
            color : "#E0E4CC"
        },
        {
            value : 100,
            color : "#69D2E7"
        }

    ];
    var barChartData = {
        labels : ["January","February","March","April","May","June","July"],
        datasets : [
            {
                fillColor : "rgba(220,220,220,0.5)",
                strokeColor : "rgba(220,220,220,1)",
                data : [65,59,90,81,56,55,40]
            },
            {
                fillColor : "rgba(151,187,205,0.5)",
                strokeColor : "rgba(151,187,205,1)",
                data : [28,48,40,19,96,27,100]
            }
        ]

    };
    var chartData = [
        {
            value : Math.random(),
            color: "#D97041"
        },
        {
            value : Math.random(),
            color: "#C7604C"
        },
        {
            value : Math.random(),
            color: "#21323D"
        },
        {
            value : Math.random(),
            color: "#9D9B7F"
        },
        {
            value : Math.random(),
            color: "#7D4F6D"
        },
        {
            value : Math.random(),
            color: "#584A5E"
        }
    ];
    var radarChartData = {
        labels : ["","","","","","",""],
        datasets : [
            {
                fillColor : "rgba(220,220,220,0.5)",
                strokeColor : "rgba(220,220,220,1)",
                pointColor : "rgba(220,220,220,1)",
                pointStrokeColor : "#fff",
                data : [65,59,90,81,56,55,40]
            },
            {
                fillColor : "rgba(151,187,205,0.5)",
                strokeColor : "rgba(151,187,205,1)",
                pointColor : "rgba(151,187,205,1)",
                pointStrokeColor : "#fff",
                data : [28,48,40,19,96,27,100]
            }
        ]

    };

    var site = GetURLParameter('site');
    var url = baseURL + "/api/weeklyStat/" + site;
    $("#chart_title").html("觀測站：" + decodeURIComponent(site));
    $.getJSON(url, function(data) {
      WeeklyAirData = {
          labels : ["Monday","Tuesday","Wednesday","Thuesday","Friday","Saturday","Sunday"],
          datasets : [
              {
                  label: "SO2",
                  fillColor : "rgba(220,220,220,0.5)",
                  strokeColor : "rgba(220,220,220,1)",
                  highlightFill: "rgba(220,220,220,0.75)",
                  highlightStroke: "rgba(220,220,220,1)",
                  data : [data.Monday.SO2, data.Tuesday.SO2, data.Wednesday.SO2,
                      data.Thuesday.SO2, data.Friday.SO2, data.Saturday.SO2, data.Sunday.SO2]
              },
              {
                  label: "CO",
                  fillColor : "rgba(151,187,205,0.5)",
                  strokeColor : "rgba(151,187,205,1)",
                  highlightFill: "rgba(220,220,220,0.75)",
                  highlightStroke: "rgba(220,220,220,1)",
                  data : [data.Monday.CO, data.Tuesday.CO, data.Wednesday.CO,
                      data.Thuesday.CO, data.Friday.CO, data.Saturday.CO, data.Sunday.CO]
              },
              {
                  label: "NO2",
                  fillColor : "rgba(255,170,170,0.7)",
                  strokeColor : "rgba(255,170,170,0.8)",
                  highlightFill: "rgba(220,220,220,0.75)",
                  highlightStroke: "rgba(220,220,220,1)",
                  data : [data.Monday.NO2, data.Tuesday.NO2, data.Wednesday.NO2,
                      data.Thuesday.NO2, data.Friday.NO2, data.Saturday.NO2, data.Sunday.NO2]
              },
              {
                  label: "O3",
                  fillColor : "rgba(255,255,170,0.5)",
                  strokeColor : "rgba(255,255,0,1)",
                  highlightFill: "rgba(220,220,220,0.75)",
                  highlightStroke: "rgba(220,220,220,1)",
                  data : [data.Monday.O3, data.Tuesday.O3, data.Wednesday.O3,
                      data.Thuesday.O3, data.Friday.O3, data.Saturday.O3, data.Sunday.O3]
              }

          ]
      };
      WeeklyPMData = {
          labels : ["Monday","Tuesday","Wednesday","Thuesday","Friday","Saturday","Sunday"],
          datasets : [
              {
                  label: "PM10",
                  fillColor : "rgba(220,220,220,0.5)",
                  strokeColor : "rgba(220,220,220,1)",
                  data : [data.Monday.PM10, data.Tuesday.PM10, data.Wednesday.PM10,
                      data.Thuesday.PM10, data.Friday.PM10, data.Saturday.PM10, data.Sunday.PM10]
              },
              {
                  label: "PM2.5",
                  fillColor : "rgba(151,187,205,0.5)",
                  strokeColor : "rgba(151,187,205,1)",
                  data : [data.Monday.PM25, data.Tuesday.PM25, data.Wednesday.PM25,
                      data.Thuesday.PM25, data.Friday.PM25, data.Saturday.PM25, data.Sunday.PM25]
              }
          ]
      };
      WeeklyPSIData = {
          labels : ["Monday","Tuesday","Wednesday","Thuesday","Friday","Saturday","Sunday"],
          datasets : [
              {
                  label: "PSI",
                  fillColor : "rgba(151,187,205,0.5)",
                  strokeColor : "rgba(151,187,205,1)",
                  data : [data.Monday.PSI, data.Tuesday.PSI, data.Wednesday.PSI,
                      data.Thuesday.PSI, data.Friday.PSI, data.Saturday.PSI, data.Sunday.PSI]
              }
          ]
      };

      var chartOpt1 = { multiTooltipTemplate: "<%if (datasetLabel){%><%=datasetLabel%> : <%}%><%= value %> ppb" };
      var chartOpt2 = { multiTooltipTemplate: "<%if (datasetLabel){%><%=datasetLabel%> : <%}%><%= value %> μg/m3" };
      var chartOpt3 = { multiTooltipTemplate: "<%if (datasetLabel){%><%=datasetLabel%> : <%}%><%= value %>" };
      console.log(JSON.stringify(barChartData));
      new Chart(document.getElementById("line").getContext("2d")).Bar(WeeklyAirData,chartOpt1); //.Line(lineChartData);
      new Chart(document.getElementById("bar").getContext("2d")).Bar(WeeklyPMData,chartOpt2);
      new Chart(document.getElementById("pie").getContext("2d")).Bar(WeeklyPSIData,chartOpt3); //.Pie(pieData);
    });

    console.log(JSON.stringify(barChartData));

    var url = baseURL + "/api/seriesAQI/" + site;
    $.getJSON(url, function(data) {
      var lineChartData = {
          //labels : ["","","","","","","","","","","","","","","","","","","","","","","",""],
          labels : data.PublishTime.reverse(),
          datasets : [
              {
                  label : "SO2",
                  fillColor : "rgba(220,220,220,0.1)",
                  strokeColor : "rgba(127,127,0,1)",
                  pointColor : "rgba(127,127,0,1)",
                  pointStrokeColor : "#fff",
                  data : data.SO2.reverse()
              },
              {
                  label : "O3",
                  fillColor : "rgba(151,187,205,0.1)",
                  strokeColor : "rgba(151,187,205,1)",
                  pointColor : "rgba(151,187,205,1)",
                  pointStrokeColor : "#fff",
                  data : data.O3.reverse()
              },
              {
                  label : "NO2",
                  fillColor : "rgba(220,220,220,0.1)",
                  strokeColor : "rgba(0,191,95,1)",
                  pointColor : "rgba(0,191,95,1)",
                  pointStrokeColor : "#fff",
                  data : data.NO2.reverse()
              },
              {
                  label : "CO",
                  fillColor : "rgba(151,187,205,0.1)",
                  strokeColor : "rgba(127,0,0,1)",
                  pointColor : "rgba(127,0,0,1)",
                  pointStrokeColor : "#fff",
                  data : data.CO.reverse()
              }

          ]
      };
      var lineChartData2 = {
          //labels : ["","","","","","","","","","","","","","","","","","","","","","","",""],
          labels : data.PublishTime.reverse(),
          datasets : [
              {
                  label : "PM10",
                  fillColor : "rgba(220,220,220,0.1)",
                  strokeColor : "rgba(127,127,0,1)",
                  pointColor : "rgba(127,127,0,1)",
                  pointStrokeColor : "#fff",
                  data : data.PM10.reverse()
              },
              {
                  label : "PM2.5",
                  fillColor : "rgba(151,187,205,0.1)",
                  strokeColor : "rgba(151,187,205,1)",
                  pointColor : "rgba(151,187,205,1)",
                  pointStrokeColor : "#fff",
                  data : data.PM25.reverse()
              }
          ]
      };
      var lineChartData3 = {
          //labels : ["","","","","","","","","","","","","","","","","","","","","","","",""],
          labels : data.PublishTime.reverse(),
          datasets : [
              {
                  label : "PSI",
                  fillColor : "rgba(220,220,220,0.1)",
                  strokeColor : "rgba(127,127,0,1)",
                  pointColor : "rgba(127,127,0,1)",
                  pointStrokeColor : "#fff",
                  data : data.PSI.reverse()
              },
          ]
      };
      var chartOpt1 = { datasetFill: false, multiTooltipTemplate: "<%if (datasetLabel){%><%=datasetLabel%> : <%}%><%= value %> ppb" };
      var chartOpt2 = { datasetFill: false, multiTooltipTemplate: "<%if (datasetLabel){%><%=datasetLabel%> : <%}%><%= value %> μg/m3" };
      var chartOpt3 = { datasetFill: false, multiTooltipTemplate: "<%if (datasetLabel){%><%=datasetLabel%> : <%}%><%= value %>" };
      new Chart(document.getElementById("radar").getContext("2d")).Line(lineChartData, chartOpt1); //.Radar(radarChartData);
      new Chart(document.getElementById("polarArea").getContext("2d")).Line(lineChartData2, chartOpt2); //.Radar(radarChartData);
      new Chart(document.getElementById("doughnut").getContext("2d")).Line(lineChartData3, chartOpt3); //.Radar(radarChartData);
    });

    //new Chart(document.getElementById("doughnut").getContext("2d")).Bar(barChartData); //.Doughnut(doughnutData);
    //new Chart(document.getElementById("line").getContext("2d")).Bar(barChartData); //.Line(lineChartData);
    //new Chart(document.getElementById("radar").getContext("2d")).Bar(barChartData); //.Radar(radarChartData);
    //new Chart(document.getElementById("polarArea").getContext("2d")).Bar(barChartData); //.PolarArea(chartData);
    //new Chart(document.getElementById("bar").getContext("2d")).Bar(barChartData);
    //new Chart(document.getElementById("pie").getContext("2d")).Bar(barChartData); //.Pie(pieData);


});
