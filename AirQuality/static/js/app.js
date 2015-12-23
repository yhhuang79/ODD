$(document).ready(function(){
    $.get("/ODD/status/", function(data){
        alert(JSON.stringify(data));
        var tableContent = [];
        $.each(data, function(i, d) {
            var content = "<tr>\
                        <th>" + i + "</th>\
                        <th>" + d.task_name + "</th>\
                        <th>" + d.current_status + "</th>\
                        <th>" + d.download_frequency + "</th>\
                        <th></th>\
                        <th>" + d.total_size + "</th>\
                        <th>" + d.eachtime + "</th>\
                        <th>" + Date() + "</th>\
                        <th>" + d.start_time + "</th>\
                        <th>" + d.finish_time + "</th>\
                        <th>" + d.download_duration + "</th>\
                    </tr>";
            tableContent.push(content);
        });
        $('#odd-table-content').html(tableContent.join());
    });
});
