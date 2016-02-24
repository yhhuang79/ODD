
// Attibution: SODA API requests based on this example: https://github.com/chriswhong/soda-leaflet

L.TimeDimension.Layer.SODAHeatMap = L.TimeDimension.Layer.extend({

    initialize: function(options) {
        var heatmapCfg = {
            radius: 15,
            maxOpacity: .8,
            scaleRadius: false,
            useLocalExtrema: false,
            latField: 'lat',
            lngField: 'lng',
            valueField: 'count'
        };
        heatmapCfg = $.extend({}, heatmapCfg, options.heatmatOptions || {});
        var layer = new HeatmapOverlay(heatmapCfg);
        L.TimeDimension.Layer.prototype.initialize.call(this, layer, options);
        this._currentLoadedTime = 0;
        this._currentTimeData = {
            max: this.options.heatmapMax || 10,
            data: []
        };
        this._baseURL = this.options.baseURL || null;
        this._period = this.options.period || "P1M";
    },

    onAdd: function(map) {
        L.TimeDimension.Layer.prototype.onAdd.call(this, map);
        map.addLayer(this._baseLayer);
        if (this._timeDimension) {
            this._getDataForTime(this._timeDimension.getCurrentTime());
        }
    },

    _onNewTimeLoading: function(ev) {
        this._getDataForTime(ev.time);
        return;
    },

    isReady: function(time) {
        return (this._currentLoadedTime == time);
    },

    _update: function() {
        this._baseLayer.setData(this._currentTimeData);
        return true;
    },

    _getDataForTime: function(time) {
        if (!this._baseURL || !this._map) {
            return;
        }
        var url = this._constructQuery(time);
        $.getJSON(url, (function(data) {
            delete this._currentTimeData.data;
            this._currentTimeData.data = [];
            for (var i = 0; i < data.length; i++) {
                var marker = data[i];
                //console.log(JSON.stringify(marker));
                if (marker.gps_lat) {
                    var gps_lat = marker.gps_lat;
                    var gps_lon = marker.gps_lon;
				            tmp = gps_lat - Math.floor(gps_lat);
				            tmp = tmp / 60 * 100 * 100;
				            tmp2 = tmp - Math.floor(tmp);
				            tmp2 = tmp2 * 100;
				            gps_lat = Math.floor(gps_lat) + Math.floor(tmp) * 0.01 + tmp2 * 0.0001;

				            tmp = gps_lon - Math.floor(gps_lon);
				            tmp = tmp / 60 * 100 * 100;
				            tmp2 = tmp - Math.floor(tmp);
				            tmp2 = tmp2 * 100;
				            gps_lon = Math.floor(gps_lon) + Math.floor(tmp) * 0.01 + tmp2 * 0.0001;

                    this._currentTimeData.data.push({
                        lat: parseFloat(gps_lat),
                        lng: parseFloat(gps_lon),
                        count: 1
                    });
                }
            }
            this._currentLoadedTime = time;
            if (this._timeDimension && time == this._timeDimension.getCurrentTime() && !this._timeDimension.isLoading()) {
                this._update();
            }
            this.fire('timeload', {
                time: time
            });
        }).bind(this));
    },

    _constructQuery: function(time) {
        var bbox = this._map.getBounds();
        var sodaQueryBox = [bbox._northEast.lat, bbox._southWest.lng, bbox._southWest.lat, bbox._northEast.lng];

        var startDate = new Date(time);
        var endDate = new Date(startDate.getTime());
        L.TimeDimension.Util.addTimeDuration(endDate, this._period, false);

        var where = "&$where=created_date > '" +
            startDate.format('yyyy-mm-dd') +
            "' AND created_date < '" +
            endDate.format('yyyy-mm-dd') +
            "' AND within_box(location," +
            sodaQueryBox +
            ")&$order=created_date desc";

        var url = this._baseURL; //+ where;
        return url;
    }

});

L.timeDimension.layer.sodaHeatMap = function(options) {
    return new L.TimeDimension.Layer.SODAHeatMap(options);
};



var currentTime = new Date();
currentTime.setUTCDate(1, 0, 0, 0, 0);
console.log(currentTime.valueOf());
var nowTime = new Date();
var map = L.map('map', {
    zoom: 8,
    fullscreenControl: true,
    timeDimension: true,
    timeDimensionOptions: {
        timeInterval: currentTime.toISOString() + "/" + nowTime.toISOString(),
        period: "PT5S",
        currentTime: currentTime
    },
    center: [23.973875, 120.982024],
});

//var layer = new L.StamenTileLayer("Watercolor");
//map.addLayer(layer);
var mapquestOSM = L.tileLayer("http://{s}.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png", {
        maxZoom: 16,
        subdomains: ["otile1", "otile2", "otile3", "otile4"],
        attribution: 'Tiles courtesy of <a href="http://www.mapquest.com/" target="_blank">MapQuest</a> <img src="http://developer.mapquest.com/content/osm/mq_logo.png">. Map data (c) <a href="http://www.openstreetmap.org/" target="_blank">OpenStreetMap</a> contributors, CC-BY-SA.'
      });
map.addLayer(mapquestOSM);

var testSODALayer = L.timeDimension.layer.sodaHeatMap({
    //baseURL: 'https://data.cityofnewyork.us/resource/erm2-nwe9.json?$select=location,closed_date,complaint_type,street_name,created_date,status,unique_key,agency_name,due_date,descriptor,location_type,agency,incident_address&complaint_type=Noise - Commercial',
    baseURL: '/ODD/lass-status',
});
testSODALayer.addTo(map);
map.attributionControl.addAttribution('<a href="https://nycopendata.socrata.com/Social-Services/311-Service-Requests-from-2010-to-Present/erm2-nwe9">NYC OpenData</a>');

L.Control.TimeDimensionCustom = L.Control.TimeDimension.extend({
    _getDisplayDateFormat: function(date){
        return date.format("mmmm yyyy");
    }
});
var timeDimensionControl = new L.Control.TimeDimensionCustom({
    playerOptions: {
        buffer: 1,
        minBufferReady: -1
    }
});
map.addControl(this.timeDimensionControl);
