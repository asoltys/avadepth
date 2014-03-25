(function() {
  var gotoPWL;

  gotoPWL = function() {
    return document.location = ("pwl-nep-eng.html?date=" + ($('#date').val()) + "&") + ("km=" + ($("#km").text()) + "&") + ("intervalMin=" + ($('#interval').val()) + "&") + ("flowRate=" + ($('#flowRate').val()) + "&") + ("flowType=" + ($('#flowType').val()) + "&") + ("waterway=" + ($('#waterway').val()) + "&") + "displayType=0";
  };

  $(function() {
    var index;
    $("#date").val(querystring('date'));
    $("#waterway").val(querystring('waterway'));
    $("#interval").val(querystring('intervalMin'));
    $("#flowRate").val(querystring('flowRate'));
    $("#flowType").val(querystring('flowType'));
    $("#km").text(querystring('km'));
    $("#pwl").click(gotoPWL);
    index = querystring('km');
    index = (function() {
      switch ($("#waterway").val()) {
        case '0':
          return index / 2;
        case '1':
          return index / 2;
        case '2':
          return (index - 40) / 4;
      }
    })();
    return $.getJSON(("/api/waterlevel?date=" + ($('#date').val()) + "&") + ("intervalMin=" + ($('#interval').val()) + "&") + ("flowRate=" + ($('#flowRate').val()) + "&") + ("flowType=" + ($('#flowType').val()) + "&") + ("waterway=" + ($('#waterway').val()) + "&") + "displayType=0", function(data) {
      var points;
      points = new Array();
      $.each(data.times, function() {
        var date;
        if (this.predictTime !== '24:00') {
          date = new Date("January 1, 2000 " + this.predictTime);
        } else {
          date = new Date("January 2, 2000 00:00");
        }
        return points.push([date.getTime(), this.waterLevels[index]]);
      });
      return $.plot("#placeholder", [points], {
        xaxes: [
          {
            color: 'black',
            tickColor: '#ddd',
            mode: 'time',
            tickSize: [4, "hour"],
            timezone: "browser",
            axisLabel: 'Pacific Standard Time (PST)'
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
