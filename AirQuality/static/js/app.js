$(document).ready(function(){
    $.get("/ODD/status/", function(data){
        //alert(JSON.stringify(data));
        var dd = new Date();
        var tableContent = [];
        var taskContent = [];
        $.each(data, function(i, t) {
          var dd = new Date();
          tableContent = [];
          taskContent = "<span><em>Task Name : </em></span><b>" + t['TaskName'] + "</b><br>\
  		      <span><em>Task Download Frequency (Seconds) : </em></span><b>" + t['TaskDownloadFrequency'] + "</b><br>\
  		      <span><em>Task Total Size : </em></span><b>" + t['TaskTotalSize'] + "</b><br>\
  		      <span><em>Task Start Time : </em></span><b>" + t['TaskStartTime'] + "</b><br>\
  		      <span><em>Task Finish Time : </em></span><b>Downloading...</b><br>\
  		      <span><em>Current Time : <em></span><b>" + dd.getFullYear()+"/"+(parseInt(dd.getMonth())+1) +"/"+dd.getDate()+" "+dd.getHours()+":"+dd.getMinutes()+":"+dd.getSeconds() + "</b><br>\
  		      <span><em>Task URL : </em></span><b>" + t['TaskURL'] + "</b><br>";

          $.each(t['status'], function(i, d) {
              var content = "<tr>\
                          <th>" + i + "</th>\
                          <th>" + d['HTML_Status_Code'] + "</th>\
                          <th>" + d['Record_Size_(Bytes)'] + "</th>\
                          <th>" + d['Record_Start_Time'] + "</th>\
                          <th>" + d['Record_Finish_Time'] + "</th>\
                          <th>" + d['Record_Download_Duration_(Seconds)'] + "</th>\
                      </tr>";
              tableContent.push(content);
          });
        });
	      $('#odd-task-content').html(taskContent);
        $('#odd-table-content').html(tableContent.join());
    });
});
