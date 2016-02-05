from django.shortcuts import render
from django.shortcuts import render_to_response
from django.http import HttpResponse
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from datetime import datetime
import json
import rethinkdb as r

# Create your views here.

#from django.http import HttpResponse
# def hello_ODD(request):
#    return HttpResponse("Hello ODD !")


# angus: my test pages
def hello_oddairquality(request):
  return render_to_response('odd-airquality.html')
def hello_oddtransport(request):
  return render_to_response('odd-transport.html')
def hello_testcharts(request):
  return render_to_response('test-charts.html')
def hello_oddtest(request):
  return render_to_response('odd-test.html')

def hello_errordata(request):
  return render_to_response('error_data')
def hello_realtime(request):
  return render_to_response('test_realtime.py')

# angus: all pages in menu
def hello_ODD(request):
  return render_to_response('index.html')
def hello_charts(request):
  return render_to_response('charts.html')
def hello_tables(request):
  return render_to_response('tables.html')
def hello_forms(request):
  return render_to_response('forms.html')
def hello_bootstrapelements(request):
  return render_to_response('bootstrap-elements.html')
def hello_bootstrapgrid(request):
  return render_to_response('bootstrap-grid.html')
def hello_blankpage(request):
  return render_to_response('blank-page.html')
def hello_indexrtl(request):
  return render_to_response('index-rtl.html')
def lass_map(request):
  return render_to_response('lassmap.html')

@api_view(['GET'])
def hello_status(request):
  if request.method == 'GET':
    connection = r.connect(host='dev.plash.tw', port=28015)
    oddtasks = list(r.db("hackathon_DB").table("Parse_Log").pluck("Task_Name").distinct().run(connection))
    oddstatus = []
    for task in oddtasks:
        oneTask = {}
        oneTask['TaskTotalSize'] = r.db("hackathon_DB").table("Parse_Log").filter({"Task_Name": task['Task_Name']}).sum("Record_Size_(Bytes)").run(connection)
        startTime = r.db("hackathon_DB").table("Parse_Log").pluck("Record_Start_Time").order_by(r.asc("Record_Start_Time")).limit(1).run(connection)
        oneTask['TaskStartTime'] = startTime[0]['Record_Start_Time']
        #print startTime[0]['Record_Start_Time']
        finishTime = r.db("hackathon_DB").table("Parse_Log").pluck("Task_Name","Task_URL","Task_Download_Frequency_(Seconds)","Record_Finish_Time").order_by(r.desc("Record_Finish_Time")).limit(1).run(connection)
        print finishTime
        oneTask['TaskFinishTime'] = finishTime[0]['Record_Finish_Time']
        oneTask['TaskURL'] = finishTime[0]['Task_URL']
        oneTask['TaskName'] = finishTime[0]['Task_Name']
        oneTask['TaskDownloadFrequency'] = finishTime[0]['Task_Download_Frequency_(Seconds)']
        startTime = r.db("hackathon_DB").table("Parse_Log").pluck("Record__Time").order_by(r.asc("start_epoch")).limit(1)
        oneTask['status'] = list(r.db("hackathon_DB").table("Parse_Log").filter({"Task_Name": task['Task_Name']}).order_by(r.desc("start_epoch")).run(connection))
        oddstatus.append(oneTask)
    #for status in oddstatus:
    ## r.db("hackathon_DB").table("Parse_Log").getAll("air quailty",{index: "Task_Name"}).orderBy(r.desc("start_epoch"))
    #    start_time = status['start_time']
    #    start_time = start_time[18:len(start_time)-1]
    #    stime = start_time.split(",")
    #    status['start_time']=stime[0].strip()+"/"+ stime[1].strip()+"/"+stime[2].strip()+" "+stime[3].strip()+":"+stime[4].strip()+":"+stime[5].strip()
    #    finish_time = status['finish_time']
    #    finish_time = finish_time[18:len(finish_time)-1]
    #    ftime = finish_time.split(",")
    #    status['finish_time']=ftime[0].strip()+"/"+ ftime[1].strip()+"/"+ftime[2].strip()+" "+ftime[3].strip()+":"+ftime[4].strip()+":"+ftime[5].strip()

    return HttpResponse(json.dumps(oddstatus),content_type="application/json")
