// morris data, data source for ODD


$(function() {

    // Area Chart
    Morris.Area({
        element: 'morris-area-chart',
        data: [{
            period: '2015-12-01',
            currentstate: 100
        }, {
            period: '2015-12-02',
            currentstate: 20
        }, {
            period: '2015-12-03',
            currentstate: 100
        }, {
            period: '2015-12-04',
            currentstate: 100
        }, {
            period: '2015-12-05',
            currentstate: 100
        }, {
            period: '2015-12-06',
            currentstate: 100
        }, {
            period: '2015-12-07',
            currentstate: 20
        }, {
            period: '2015-12-08',
            currentstate: 100
        }, {
            period: '2015-12-09',
            currentstate: 100
        }, {
            period: '2015-12-10',
            currentstate: 100
        }],
        xkey: 'period',
        ykeys: ['currentstate'],
        labels: ['Current State'],
        pointSize: 5,
        hideHover: 'auto',
        resize: true
    });

});
