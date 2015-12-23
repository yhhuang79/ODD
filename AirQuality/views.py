from django.shortcuts import render
from django.shortcuts import render_to_response
from django.http import HttpResponse
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
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

@api_view(['GET'])
def hello_status(request):
  if request.method == 'GET':
    connection = r.connect(host='dev.plash.tw', port=28015)
    oddstatus = list(r.db("hackathon_DB").table("Air_Q_show_infor").run(connection))
    return HttpResponse(json.dumps(oddstatus),content_type="application/json")
