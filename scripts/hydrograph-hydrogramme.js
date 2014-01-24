(function() {
  var dataset, date_inc, monthNames, options, update;

  monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  dataset = [];

  date_inc = 0;

  update = function() {
    var actual, date, maximum, minimum, month, period, predicted, year;
    minimum = [];
    maximum = [];
    actual = [];
    predicted = [];
    date = moment($('#date').val());
    year = date.year();
    month = date.month();
    if (month === 11) {
      month = -1;
      year += 1;
    }
    period = $('#period').val();
    return $.getJSON(("/api/hydrograph?year=" + year + "&") + ("month=" + (month + 2) + "&") + ("period=" + period + "&") + "actual=false&" + "predicted=true", function(results) {
      $.each(results, function(i, v) {
        year = v.year;
        month = v.month - 1;
        $.each(v.minMax, function(i, v) {
          minimum.push([moment(v.day + 1, "MMM").year(year).month(month).date(v.day + 1)._d, v.minValue]);
          return maximum.push([moment(v.day + 1, "MMM").year(year).month(month).date(v.day + 1)._d, v.maxValue]);
        });
        if ($("#actual").prop("checked")) {
          $.each(v.actual, function(i, v) {
            var day, discharge;
            day = moment(v.date).day(1)._a[2];
            discharge = [moment(v.date).year(year).month(month).date(day)._d, v.value];
            if (discharge[1] !== 0) return actual.push(discharge);
          });
        }
        if ($("#predicted").prop("checked")) {
          return $.each(v.predicted, function(i, v) {
            var day, discharge;
            day = moment(v.date).day(1)._a[2];
            discharge = [moment(v.date).year(year).month(month).date(day)._d, v.value];
            if (discharge[1] !== 0) return predicted.push(discharge);
          });
        }
      });
      dataset = [
        {
          data: maximum,
          label: "Maximum"
        }, {
          data: actual,
          label: "Actual"
        }, {
          data: minimum,
          label: "Minimum"
        }, {
          data: predicted,
          label: "Predicted"
        }
      ];
      return $.plot($("#flot-placeholder1"), dataset, options);
    });
  };

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
    var now;
    $("#print_hydrograph").click(function() {
      return window.print();
    });
    now = new Date();
    $('#date').val("" + (now.getFullYear()) + "-01-01");
    $('#submit').click(update);
    $('#date').change(function() {
      return $('#static-date').text($('#date').val());
    });
    $('select#period').change(function() {
      return $('#static-period').text($(this).val());
    });
    $('#date').change();
    $(document).ajaxStart(function() {
      $('#loading').show();
      return $('#flot-placeholder1').html('');
    });
    $(document).ajaxSuccess(function() {
      return $('#loading').hide();
    });
    return update();
  });

}).call(this);
