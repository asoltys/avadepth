(function() {
  var GetData, dataset, date_inc, monthNames, now, now2, options, totalPoints;

  monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  dataset = [];

  totalPoints = 60;

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
    grid: {
      color: 'black',
      backgroundColor: 'white'
    },
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
    colors: ['red', 'blue'],
    xaxis: {
      mode: "time",
      color: 'white',
      tickColor: 'white',
      tickSize: [1, "day"],
      minTickSize: [2, "month"],
      tickFormatter: function(v, axis) {
        var date;
        date = new Date(v);
        if (date.getDate() % 7 === 0) {
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
      tickSize: 8,
      tickFormatter: function(v, axis) {
        if (v % 1500 === 0) {
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
    $('#date, #period').change(function() {
      var data, data2, date, month, period, year;
      data = [];
      data2 = [];
      date = moment($(this).val());
      year = date.year();
      month = date.month();
      period = $('#period').val();
      return $.getJSON("/api/hydrograph?year=" + year + "&month=" + month + "&period=" + period + "&actual=false&predicted=false", function(results) {
        $.each(results, function(i, v) {
          year = v.year;
          month = v.month;
          return $.each(v.minMax, function(i, v) {
            data.push([moment(v.day, "MMM").year(year).month(month).date(v.day)._d, v.minValue]);
            return data2.push([moment(v.day, "MMM").year(year).month(month).date(v.day)._d, v.maxValue]);
          });
        });
        dataset = [
          {
            data: data2
          }, {
            data: data
          }
        ];
        return $.plot($("#flot-placeholder1"), dataset, options);
      });
    });
    $('#date').change(function() {
      return $('#static-date').text($('#alt-date').val());
    });
    $('select#period').change(function() {
      return $('#static-period').text($(this).val());
    });
    return $('#date').change();
  });

}).call(this);
