$(document).ready(function(){
    $.get("/ODD/status/", function(data){
        alert(JSON.stringify(data));
        var tableContent = [];
        $.each(data, function(i, d) {
            var dd = new Date();
            var content = "<tr>\
                        <th>" + i + "</th>\
                        <th>" + d.task_name + "</th>\
                        <th>" + d.current_status + "</th>\
                        <th>" + d.download_frequency + "</th>\
                        <th></th>\
                        <th>" + d.total_size + "</th>\
                        <th>" + d.eachtime + "</th>\
                        <th>" + dd.getFullYear()+"/"+dd.getMonth()+1+"/"+dd.getDate()+" "+dd.getHours()+":"+dd.getMinutes()+":"+dd.getSeconds() + "</th>\
                        <th>" + d.start_time.toString() + "</th>\
                        <th>" + d.finish_time + "</th>\
                        <th>" + d.download_duration + "</th>\
                    </tr>";
            tableContent.push(content);
        });
        $('#odd-table-content').html(tableContent.join());
    });
});
