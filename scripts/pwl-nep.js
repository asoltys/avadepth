(function() {
  var gotoKMGraph, gotoTimeGraph;

  gotoKMGraph = function() {
    return document.location = "pwlk-nepk-eng.html?date=" + ($('#date').val()) + "&km=" + ($(this).text()) + "&intervalMin=" + ($('#interval').val()) + "&flowRate=" + ($('#flowRate').val()) + "&flowType=" + ($('#flowType').val()) + "&waterway=" + ($('#waterway').val()) + "&displayType=" + ($('input[name=report]:checked').val());
  };

  gotoTimeGraph = function() {
    return document.location = "pwlt-ptnd-eng.html?date=" + ($('#date').val()) + "&time=" + ($(this).text()) + "&intervalMin=" + ($('#interval').val()) + "&flowRate=" + ($('#flowRate').val()) + "&flowType=" + ($('#flowType').val()) + "&waterway=" + ($('#waterway').val()) + "&displayType=" + ($('input[name=report]:checked').val());
  };

  $(function() {
    $('#date').change(function() {
      $.getJSON("/api/depths?date=" + ($('#date').val()), function(data) {
        $('#selected_discharge').empty();
        $.each(data.Flowrates, function() {
          return $('#selected_discharge').append("<option value='" + this + "'>" + this + "</option>");
        });
        $('#predicted_discharge').text(data.Predicted);
        $('#actual_discharge').text(data.Actual);
        if (data.Actual) {
          $("#actual_radio").attr('disabled', false);
          $("#predicted_radio").attr('disabled', true);
          $('#actual_radio').prop('checked', true);
        } else {
          $("#actual_radio").attr('disabled', true);
          $("#predicted_radio").attr('disabled', false);
          $("#predicted_radio").prop('checked', true);
        }
        $('input[name=discharge]:checked').change();
        return $('#static-date').text($('#alt-date').val());
      });
      return $('#static-date').text($('#alt-date').val());
    }).change();
    $('#selected_discharge').change(function() {
      return $('#discharge_radio').prop('checked', true).change();
    });
    $('input[name=discharge]').change(function() {
      var flowrate, flowtype;
      flowrate = (function() {
        switch ($(this).val()) {
          case 'Actual':
            return $('#actual_discharge').text();
          case 'Predicted':
            return $('#predicted_discharge').text();
          case 'Defined':
            return $('#defined_discharge').val();
          case 'Selected':
            return $('#selected_discharge').val();
        }
      }).call(this);
      $('#flowRate').val(flowrate);
      $('#static-discharge').text(flowrate);
      $('#static-discharge-eval').text($(this).val());
      flowtype = (function() {
        switch ($(this).val()) {
          case 'Actual':
            return 0;
          case 'Predicted':
            return 1;
          case 'Defined':
            return 2;
          case 'Selected':
            return 3;
        }
      }).call(this);
      return $('#flowType').val(flowtype);
    });
    $('input[name=fraser_river]').change(function() {
      var waterway;
      waterway = (function() {
        switch ($(this).val()) {
          case 'South Arm':
            $('#river-section').parent().attr('colspan', 21);
            return 0;
          case 'North Arm':
            $('#river-section').parent().attr('colspan', 16);
            return 1;
          case 'Main Arm':
            $('#river-section').parent().attr('colspan', 14);
            return 2;
        }
      }).call(this);
      $('#waterway').val(waterway);
      return $('#river-section').text($(this).val());
    });
    $('input[name=fraser_river]:checked').change();
    $('#defined_discharge').change(function() {
      if ($('input[name=discharge]:checked').val() === "Defined") {
        $('#flowRate').val($(this).val());
        return $('#static-discharge').text($('#defined_discharge').val());
      }
    });
    $('#selected_discharge').change(function() {
      if ($('input[name=discharge]:checked').val() === "Selected") {
        $('#flowRate').val($(this).val());
        return $('#static-discharge').text($('#selected_discharge').val());
      }
    });
    $('input[name=fraser_river]').change(function() {
      return $('#static-arm').text($(this).val());
    });
    $('input[name=channel]').change(function() {
      return $('#static-limit').text($(this).next().text());
    });
    $('select#interval').change(function() {
      return $('#static-interval').text($(this).val());
    });
    $('select#chainage').change(function() {
      return $('#static-chainage').text($(this).val());
    });
    return $('#date, input[name=discharge], input[name=fraser_river], input[name=report], #defined_discharge, #selected_discharge, #interval').change(function() {
      var headerRow, i, kmStart, step, _ref;
      $('#water-levels tbody').empty();
      $('#headerkm').empty();
      step = 2;
      kmStart = (function() {
        switch ($('#waterway').val()) {
          case '2':
            step = 4;
            return 40;
          default:
            return 0;
        }
      })();
      for (i = kmStart, _ref = $('#river-section').parent().attr('colspan') * step - step + kmStart; kmStart <= _ref ? i <= _ref : i >= _ref; i += step) {
        headerRow = $("<th><a href=\"javascript:void(0)\">" + i + "</a></th>");
        $('#headerkm').append(headerRow);
        headerRow.click(gotoKMGraph);
      }
      return $.getJSON("/api/waterlevel?date=" + ($('#date').val()) + "&intervalMin=" + ($('#interval').val()) + "&flowRate=" + ($('#flowRate').val()) + "&flowType=" + ($('#flowType').val()) + "&waterway=" + ($('#waterway').val()) + "&displayType=" + ($('input[name=report]:checked').val()), function(data) {
        $('#location').text(data.title);
        return $.each(data.times, function() {
          var row;
          row = $("<tr><td><a href=\"javascript:void(0)\">" + this.predictTime + "</a></td></tr>");
          $.each(this.waterLevels, function() {
            return row.append("<td>" + (parseFloat(this).toFixed(1)) + "</td>");
          });
          $('#water-levels tbody').append(row);
          return $(row).find('a').click(gotoTimeGraph);
        });
      });
    });
  });

}).call(this);
