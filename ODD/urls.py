"""ODD URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
# from django.contrib.staticfiles.urls import staticfiles_urlpatterns # angus'

from django.conf.urls import include, url
from django.contrib import admin
# import view functions from trips app
from AirQuality.views import hello_ODD,hello_charts,hello_tables,hello_forms,hello_bootstrapelements,hello_bootstrapgrid,hello_blankpage,hello_indexrtl
from AirQuality.views import hello_oddairquality,hello_oddtransport,hello_testcharts, hello_oddtest
from AirQuality.views import hello_errordata
from AirQuality.views import hello_realtime
from AirQuality.views import hello_status

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),

    url(r'^ODD/$', hello_ODD),
    url(r'^ODD/index.html$', hello_ODD),
    url(r'^ODD/charts.html$', hello_charts),
    url(r'^ODD/tables.html$', hello_tables),
    url(r'^ODD/forms.html$', hello_forms),
    url(r'^ODD/bootstrap-elements.html$', hello_bootstrapelements),
    url(r'^ODD/bootstrap-grid.html$', hello_bootstrapgrid),
    url(r'^ODD/blank-page.html$', hello_blankpage),
    url(r'^ODD/index-rtl.html$', hello_indexrtl),

    url(r'^ODD/test_realtime.py$', hello_realtime),
    url(r'^ODD/error_data$', hello_errordata),

    url(r'^ODD/odd-airquality.html$', hello_oddairquality),
    url(r'^ODD/odd-transport.html$', hello_oddtransport),
    url(r'^ODD/test-charts.html$', hello_testcharts),
    url(r'^ODD/odd-test.html$', hello_oddtest),
    url(r'^ODD/airquality$', hello_oddairquality),
    url(r'^ODD/status/$', hello_status)
]

# urlpatterns += staticfiles_urlpatterns() # angus'
