/**
 * Created by ting-jui on 8/29/16.
 */
var database_value          = null;
var table_value             = null;
var device_or_not_value     = null;
var device_value            = null;
var start_time              = null;
var end_time                = null;


var deivce_or_not_html = "<h4>Select Device or not</h4>" + "<select class='selectpicker' id='device_or_not' title=' '>" +
    "<option value='true'>YES</option>" +
    "<option value='false'>NO</option>" +
    "</select>" +
    "<!--<input type='button' value='submit' class='btn btn-info btn-lg' id='deivce_or_not_button' onclick='deivce_or_not_function()'>-->";


$( "#DB_and_table" ).change(function()
    {
        function DB_and_table_function()
        {
            //        var val = document.getElementById("DB_and_table").value;
            //        console.log(val);
            $("#deivce_or_not").html("");
            $("#select_time").html("");
            setTimeout(function(){
                $("#deivce_or_not").html(deivce_or_not_html).show() ;
                $(".selectpicker").selectpicker();
            },200);
        };

        database_value           = $(':selected', document.getElementById("DB_and_table")).parent().attr('label');
        table_value              = document.getElementById("DB_and_table").value;
        device_or_not_value=device_value=start_time=end_time=null;


        $("#deivce_or_not").html("").show();
        $("#select_device").html("").show();
        $("#select_time").html("").show();
        $("#output").html("").show();

        setTimeout(function(){
            $("#deivce_or_not").html(deivce_or_not_html).show() ;
            $(".selectpicker").selectpicker();
        },200);

    }
);

$(document.body).delegate('#device_or_not', 'change', function()
    {
        function deivce_or_not_function()
        {
            database_value = $(':selected', document.getElementById("DB_and_table")).parent().attr('label');
            console.log("DB:",database_value);

            table_value = document.getElementById("DB_and_table").value;
            console.log("table:",table_value);

            device_or_not_value = document.getElementById("device_or_not").value;  // true or false
            console.log("device or not value:",device_or_not_value);
            device_or_not_value=false; // pass device list stage
            if(device_or_not_value)
            {
                $.ajax
                (
                    {
                        url: "/device_list",
                        type: "POST",
                        data:
                        {
                            'database': database_value,
                            'table': table_value,
                        },
                        success: function (data, textStatus, jqXHR)
                        {
                            var device_list_html = "<h4>Select Device</h4>" + "<select class='selectpicker' id='device_or_not'>" +
                                "<option value='true'>YES</option>" +
                                "<option value='false'>NO</option>" +
                                "</select>" +
                                "<input type='button' value='submit' class='btn btn-info btn-lg' id='DB_and_table_button' onclick='deivce_or_not_function()'>";

                            $("#select_device").html(device_list_html);
                            $(".selectpicker").selectpicker();
                        }
                    }
                );
            }
            else
            {
                $("#select_time").html("<h4>Loading...</h4>");
                $.ajax
                (
                    {
                        url: "/inspect/time_points",
                        type: "POST",
                        data:
                        {
                            'database': database_value,
                            'table': table_value,
                        },
                        success: function (data, textStatus, jqXHR)
                        {
                            //console.log(data);

                            var select_time_html =
                                "<h4>Set Time Interval</h4>" +
                                "<h5>Choose the interval between &nbsp <br>"+data['min_time']+"&nbsp and &nbsp"+data['max_time']+"</h5>"+
                                "<div class='input-group'>"+
                                "<input type='text' class='form-control' placeholder='start time' aria-describedby='basic-addon2' id='start_time'>"+
                                "<input type='text' class='form-control' placeholder='end time' aria-describedby='basic-addon2' id='end_time'>"+
                                "</div>"+
                                "<input type='button' value='submit' class='btn btn-info btn-lg' id='select_time_button' onclick='output()'>";

                            $("#select_time").html(select_time_html);

                        }
                    }
                );
            }

            //        $("#select_time").html(device_list_html);
            //        $(".selectpicker").selectpicker();
        };

        device_or_not_value     = document.getElementById("device_or_not").value;  // true or false
        device_value=start_time=end_time=null;

        $("#select_device").html("").show();
        $("#select_time").html("").show();
        $("#output").html("").show();

        //device_or_not_value=false; // pass device list stage
        if( document.getElementById("device_or_not").value === 'true' )
        {
            $("#select_device").html("<h4>Loading...</h4>");
            $.ajax
            (
                {
                    url: "/inspect/device_list",
                    type: "POST",
                    data:
                    {
                        'database': $(':selected', document.getElementById("DB_and_table")).parent().attr('label'),
                        'table': document.getElementById("DB_and_table").value,
                    },
                    success: function (data, textStatus, jqXHR)
                    {
                        //console.log(data);
                        var device_list_html="";

                        for(var i in data)
                        {
                            device_list_html = device_list_html + "<option value=\'"+data[i]+"\'>"+data[i]+"</option>" ;
                        }

                        var device_list_html = "<h4>Select Device</h4>" +
                            "<select class='selectpicker' id='device_list' title=' '>" +
                            device_list_html+
                            "</select>" ;

                        $("#select_device").html(device_list_html);
                        $(".selectpicker").selectpicker();
                    }
                }
            );
        }
        else
        {
            //console.log("false");
            $("#select_time").html("<h4>Loading...</h4>");
            $.ajax
            (
                {
                    url: "/inspect/time_points",
                    type: "POST",
                    data:
                    {
                        'database': $(':selected', document.getElementById("DB_and_table")).parent().attr('label'),
                        'table': document.getElementById("DB_and_table").value,
                    },
                    success: function (data, textStatus, jqXHR)
                    {
                        //console.log(data);

                        var select_time_html =
                            "<h4>Set Time Interval</h4>" +
                            "<h5>Choose the interval between &nbsp <br>"+data['min_time']+"&nbsp and &nbsp"+data['max_time']+"</h5>"+
                            "<div class='input-group'>"+
                            "<input type='text' class='form-control' placeholder='start time' aria-describedby='basic-addon2' id='start_time'>"+
                            "<input type='text' class='form-control' placeholder='end time' aria-describedby='basic-addon2' id='end_time'>"+
                            "</div>"+
                            "<input type='button' value='submit' class='btn btn-info btn-lg' id='select_time_button' onclick='output()'>";

                        $("#select_time").html(select_time_html);

                    }
                }
            );
        }

        //        $("#select_time").html(device_list_html);
        //        $(".selectpicker").selectpicker();
    }
);

$(document.body).delegate('#select_device', 'change', function()
    {
        device_value             = document.getElementById("device_list").value;
        start_time=end_time=null;
        $("#select_time").html("").show();
        $("#output").html("").show();

        $("#select_time").html("<h4>Loading...</h4>");
        $.ajax
        (
            {
                url: "/inspect/time_points",
                type: "POST",
                data:
                {
                    'database': $(':selected', document.getElementById("DB_and_table")).parent().attr('label'),
                    'table': document.getElementById("DB_and_table").value,
                },
                success: function (data, textStatus, jqXHR)
                {
                    //console.log(data);

                    var select_time_html =
                        "<h4>Set Time Interval</h4>" +
                        "<h5>Choose the interval between &nbsp <br>"+data['min_time']+"&nbsp and &nbsp"+data['max_time']+"</h5>"+
                        "<div class='input-group'>"+
                        "<input type='text' class='form-control' placeholder='start time' aria-describedby='basic-addon2' id='start_time'>"+
                        "<input type='text' class='form-control' placeholder='end time' aria-describedby='basic-addon2' id='end_time'>"+
                        "</div>"+
                        "<input type='button' value='submit' class='btn btn-info btn-lg' id='select_time_button' onclick='output()'>";

                    $("#select_time").html(select_time_html);

                }
            }
        );
    }
);


function output()
{
    start_time               = document.getElementById("start_time").value;
    end_time                 = document.getElementById("end_time").value;

    console.log("DB:",database_value);
    console.log("table:",table_value);
    console.log("device or not value:",device_or_not_value);
    console.log("device:",device_value);
    console.log("start_time:",start_time);
    console.log("end_time:",end_time);


    var html_link = "<p>Loading...</p>";
    $("#output").html(html_link).show();

    $.ajax
    (
        {
            url: "/inspect/query",
            type: "POST",
            data:
            {
                'database': database_value,
                'table': table_value,
                'device_or_not':device_or_not_value,
                'device':device_value,
                'start_time':start_time,
                'end_time':end_time
            },
            success: function (results, textStatus, jqXHR)
            {
                if(results["data"]!="wrong query" && results["data"][0]!=undefined)
                {
                    var html_link = "<a href='/inspect/" + results["file_name"] + ".json'>Download</a>";
                    $("#output").html(html_link).show();
                }
                else
                {
                    console.log("wrong");
                    var html_link = "<p>Wrong query!<br> Didn't find any data!</p>";
                    $("#output").html(html_link).show();
                }

            }
        }
    );

}




$("#data_query_form").submit
(
    function (event) {
        $.ajax(
            {
                url: "/inspect",
                type: "POST",
                data: {'query_string': $("#query_text").val()},
                success: function (data, textStatus, jqXHR) {
//                        console.log(textStatus);
//                        console.log(jqXHR);
                    $("#go").html("<p>Output: <br>" + JSON.stringify(data, null, "<br>") + "</p>").show();
                    var file_name = ($("#query_text").val()).replace(/\//g, '_');
                    //console.log(file_name);
                    var html_link = "<a href='/inspect/" + file_name + ".json'>Download</a>";
                    $("#jsonlink").html(html_link).show();
                }
            }
        );
        event.preventDefault();
    }
);