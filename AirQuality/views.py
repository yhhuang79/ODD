from django.shortcuts import render
from django.shortcuts import render_to_response
from django.http import HttpResponse
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
import datetime
import time
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
    return HttpResponse(json.dumps(oddstatus),content_type="application/json")

@api_view(['GET'])
def lass_status(request):
  if request.method == 'GET':
    connection = r.connect(host='dev.plash.tw', port=28015)
    d = datetime.datetime.utcnow()
    epoch = datetime.datetime(1970,1,1)
    now = (d - epoch).total_seconds() - 8*60*60
    past = now - 1*60
    print now, past
    lassstatus = list(r.db("Heat_Wave").table("LASS").has_fields("timestamp").filter((r.row["timestamp"] < now) & (r.row["timestamp"] > past)).order_by(r.desc("timestamp")).run(connection))
    #print lassstatus
    return HttpResponse(json.dumps(lassstatus),content_type="application/json")
