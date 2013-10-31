(function() {
  var dataset, date_inc, monthNames, now, now2, options, totalPoints;

  monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  dataset = [];

  totalPoints = 60;

  now = new Date();

  now2 = new Date();

  date_inc = 0;

  options = {
    grid: {
      backgroundColor: {
        colors: ["#fff", "#e4f4f4"]
      }
    },
    series: {
      lines: {
        show: true,
        lineWidth: 1.2
      },
      points: {
        show: false
      }
    },
    colors: ['red', 'blue'],
    xaxis: {
      mode: "time",
      color: 'white',
      tickColor: 'white',
      axisLabel: "Date",
      axisLabelUseCanvas: true,
      axisLabelFontSizePixels: 12,
      axisLabelFontFamily: 'Verdana, Arial',
      axisLabelPadding: 10
    },
    yaxis: {
      axisLabel: "Hope Discharge (m3s)",
      axisLabelUseCanvas: true,
      axisLabelFontSizePixels: 12,
      axisLabelFontFamily: 'Verdana, Arial',
      axisLabelPadding: 6
    }
  };

  $(function() {
    $("#print_hydrograph").click(function() {
      return window.print();
    });
    now = new Date();
    $('#date').val("" + (now.getFullYear()) + "-01-01");
    $('#date, #period').change(function() {
      var data, data2, data3, date, month, period, year;
      data = [];
      data2 = [];
      data3 = [];
      date = moment($('#date').val());
      year = date.year();
      month = date.month();
      period = $('#period').val();
      return $.getJSON(("/api/hydrograph?year=" + year + "&") + ("month=" + (month + 2) + "&") + ("period=" + period + "&") + "actual=false&" + "predicted=false", function(results) {
        $.each(results, function(i, v) {
          year = v.year;
          month = v.month - 1;
          return $.each(v.minMax, function(i, v) {
            data.push([moment(v.day + 1, "MMM").year(year).month(month).date(v.day + 1)._d, v.minValue]);
            return data2.push([moment(v.day + 1, "MMM").year(year).month(month).date(v.day + 1)._d, v.maxValue]);
          });
        });
        dataset = [
          {
            data: data2
          }, {
            data: data
          }, {
            data: data3
          }
        ];
        return $.plot($("#flot-placeholder1"), dataset, options);
      });
    });
    $('#date').change(function() {
      return $('#static-date').text($('#date').val());
    });
    $('select#period').change(function() {
      return $('#static-period').text($(this).val());
    });
    return $('#date').change();
  });

}).call(this);
