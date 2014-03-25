(function() {
  var dataset, date_inc, monthNames, options, update;

  monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  dataset = [];

  date_inc = 0;

  update = function() {
    var actual, maximum, minimum, month, period, period_end, predicted, year;
    minimum = [];
    maximum = [];
    actual = [];
    predicted = [];
    year = parseInt($("#year").val());
    month = 12;
    if ($("#month").val() !== 1) month = $("#month").val() - 1;
    if ($("#month").val() === "1") year += 1;
    period = $("#period option:selected").html().split(" ")[0] - 1;
    period_end = moment([year, month, 1]).add('months', period);
    $('#static-month').text($('#month option:selected').html());
    $('#static-year').text($('#year').val());
    $("#static-period").text(period_end.format("MMMM YYYY"));
    return $.getJSON(("/api/hydrograph?year=" + year + "&") + ("month=" + ($('#month').val()) + "&") + ("period=" + ($('#period').val()) + "&") + "actual=false&" + "predicted=true", function(results) {
      $.each(results, function(i, v) {
        year = v.year;
        month = v.month - 1;
        $.each(v.minMax, function(i, v) {
          var date, day;
          day = v.day + 1;
          date = [year, month, day];
          minimum.push([moment(date), v.minValue]);
          return maximum.push([moment(date), v.maxValue]);
        });
        if ($("#actual").prop("checked")) {
          $.each(v.actual, function(i, v) {
            var discharge;
            discharge = [moment(v.date), v.value];
            if (discharge[1] !== 0) return actual.push(discharge);
          });
        }
        if ($("#predicted").prop("checked")) {
          return $.each(v.predicted, function(i, v) {
            var discharge;
            discharge = [moment(v.date), v.value];
            if (discharge[1] !== 0) return predicted.push(discharge);
          });
        }
      });
      dataset = [
        {
          data: maximum,
          label: "Max Range"
        }, {
          data: minimum,
          label: "Min Range"
        }, {
          data: actual,
          label: "Actual"
        }, {
          data: predicted,
          label: "Predicted"
        }
      ];
      if ($('html').attr('lang') === 'fr') {
        dataset = [
          {
            data: maximum,
            label: "Portée maximale"
          }, {
            data: minimum,
            label: "Portée minimale"
          }, {
            data: actual,
            label: "Données réelles"
          }, {
            data: predicted,
            label: "Prévu"
          }
        ];
      }
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
      axisLabel: "Hope Discharge (m\u00B3s)",
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
    var current_year, s, year;
    $("#print_hydrograph").click(function() {
      return window.print();
    });
    current_year = moment().year();
    s = "";
    for (year = current_year; year >= 1994; year += -1) {
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
