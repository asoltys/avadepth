(function() {
  var dataset, date_inc, monthNames, options, update;

  monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  dataset = [];

  date_inc = 0;

  update = function() {
    var actual, maximum, minimum, month, period_end, predicted, year;
    minimum = [];
    maximum = [];
    actual = [];
    predicted = [];
    year = parseInt($("#year").val());
    month = 12;
    if ($("#month").val() !== 1) month = $("#month").val() - 1;
    if ($("#month").val() === "1") year += 1;
    period_end = moment([year, month, 1]).add('months', $("#period option:selected").html().split(" ")[0]).subtract('month', 1);
    $('#static-month').text($('#month option:selected').html());
    $('#static-year').text($('#year').val());
    $("#static-period").text(period_end.format("MMMM YYYY"));
    return $.getJSON(("/api/hydrograph?year=" + year + "&") + ("month=" + ($('#month').val()) + "&") + ("period=" + ($('#period').val()) + "&") + "actual=false&" + "predicted=true", function(results) {
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
          label: "Max Range"
        }, {
          data: actual,
          label: "Actual"
        }, {
          data: minimum,
          label: "Min Range"
        }, {
          data: predicted,
          label: "Predicted"
        }
      ];
      return $.plot($("#hydrograph_chart"), dataset, options);
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
    },
    legend: {
      container: "#legend_container",
      noColumns: 0,
      labelBoxBorderColor: "none"
    }
  };

  $(function() {
    var current_year, s, year, _ref;
    $("#print_hydrograph").click(function() {
      return window.print();
    });
    current_year = new Date().getFullYear();
    s = "<option selected=\"selected\">" + current_year + "</option>";
    for (year = _ref = current_year - 1; year >= 1994; year += -1) {
      s += "<option>" + year + "</option>";
    }
    $("#year").html(s);
    $('#submit').click(update);
    $(document).ajaxStart(function() {
      $('#loading').show();
      return $('#hydrograph_chart').html('');
    });
    $(document).ajaxSuccess(function() {
      return $('#loading').hide();
    });
    return update();
  });

}).call(this);
