(function() {
  var GetData, data, data2, dataset, date_inc, monthNames, now, now2, options, totalPoints, updateInterval;

  data = [];

  data2 = [];

  monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  dataset = [];

  totalPoints = 60;

  updateInterval = 500;

  now = new Date();

  now2 = new Date();

  date_inc = 0;

  GetData = function() {
    var temp, y, _results;
    data.shift();
    while (data.length < totalPoints) {
      y = Math.random() * 1000 + 1250;
      temp = [new Date(now), y];
      now.setDate(now.getDate() + 1);
      data.push(temp);
    }
    data2.shift();
    _results = [];
    while (data2.length < totalPoints) {
      y = Math.random() * 800 + 500;
      temp = [new Date(now2), y];
      now2.setDate(now2.getDate() + 1);
      _results.push(data2.push(temp));
    }
    return _results;
  };

  options = {
    series: {
      lines: {
        show: true,
        lineWidth: 1.2,
        fill: true
      },
      stack: true,
      points: {
        show: false
      }
    },
    xaxis: {
      mode: "time",
      tickSize: [1, "day"],
      minTickSize: [2, "month"],
      tickFormatter: function(v, axis) {
        var date;
        date = new Date(v);
        if (date.getDate() % 10 === 0) {
          return monthNames[date.getMonth()] + " " + date.getDate();
        } else {
          return "";
        }
      },
      axisLabel: "Date",
      axisLabelUseCanvas: true,
      axisLabelFontSizePixels: 12,
      axisLabelFontFamily: 'Verdana, Arial',
      axisLabelPadding: 10
    },
    yaxis: {
      min: 0,
      max: 3170,
      tickSize: 5,
      tickFormatter: function(v, axis) {
        if (v % 500 === 0) {
          return v;
        } else {
          return "";
        }
      },
      axisLabel: "Hope Discharge (m3s)",
      axisLabelUseCanvas: true,
      axisLabelFontSizePixels: 12,
      axisLabelFontFamily: 'Verdana, Arial',
      axisLabelPadding: 6
    }
  };

  $(function() {
    var update;
    GetData();
    dataset = [
      {
        data: data2
      }, {
        data: data
      }
    ];
    $.plot($("#flot-placeholder1"), dataset, options);
    update = function() {
      GetData();
      $.plot($("#flot-placeholder1"), dataset, options);
      return setTimeout(update, updateInterval);
    };
    update();
    $('#date').change(function() {
      return $('#static-date').text($('#alt-date').val());
    });
    $('select#period').change(function() {
      return $('#static-period').text($(this).val());
    });
    return $('#date').change();
  });

}).call(this);
