(function() {
  var gotoPWL;

  gotoPWL = function() {
    return document.location = ("pwl-nep-eng.html?date=" + ($('#date').val()) + "&") + ("km=" + ($("#km").text()) + "&") + ("intervalMin=" + ($('#intervalMin').val()) + "&") + ("flowRate=" + ($('#flowRate').val()) + "&") + ("flowType=" + ($('#flowType').val()) + "&") + ("waterway=" + ($('#waterway').val()) + "&") + "displayType=0";
  };

  $(function() {
    var step;
    $("#date").val(querystring('date'));
    $("#waterway").val(querystring('waterway'));
    $("#flowRate").val(querystring('flowRate'));
    $("#flowType").val(querystring('flowType'));
    $("#intervalMin").val(querystring('intervalMin'));
    $("#time").text(querystring('time'));
    $("#pwl").click(gotoPWL);
    step = (function() {
      switch ($("#waterway").val()) {
        case '0':
          return 2;
        case '1':
          return 2;
        case '2':
          return 4;
      }
    })();
    return $.getJSON(("/api/waterlevel?date=" + ($('#date').val()) + "&") + ("intervalMin=" + (querystring('intervalMin')) + "&") + ("flowRate=" + ($('#flowRate').val()) + "&") + ("flowType=" + ($('#flowType').val()) + "&") + ("waterway=" + ($('#waterway').val()) + "&") + "displayType=0", function(data) {
      var points;
      points = new Array();
      $.each(data.times, function() {
        var start;
        if (this.predictTime === querystring('time')[0]) {
          start = 0;
          if (step === 4) start = 40;
          return $.each(this.waterLevels, function(i) {
            return points.push([i * step + start, this]);
          });
        }
      });
      console.log(points);
      return $.plot("#placeholder", [points], {
        xaxes: [
          {
            color: 'black',
            tickColor: '#ddd',
            tickSize: step,
            axisLabel: 'Location (km)'
          }
        ],
        yaxes: [
          {
            color: 'black',
            tickColor: '#ddd',
            position: 'left',
            axisLabel: 'Water Level (metres) relative to LWD'
          }
        ]
      });
    });
  });

}).call(this);
