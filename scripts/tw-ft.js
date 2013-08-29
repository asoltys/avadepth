(function() {
  var table, update;

  table = null;

  $(function() {
    if ($('#max_depth_radio').prop('checked')) {
      $('#window').val($('#maximum_depth').val());
      $('#static-window').text("" + ($('#maximum_depth').val()) + " hrs");
    } else {
      $('#window').val($('#minimum_window').val());
      $('#static-window').text("" + ($('#minimum_window').val()) + " hrs");
    }
    $('#period').change(function() {
      var period;
      period = (function() {
        switch ($('#period').val()) {
          case '0':
            return 'd';
          case '1':
            return 'w';
          case '2':
            return 'M';
        }
      })();
      $('#static-date-from').text(moment($('#date').val()).format("MMMM DD, YYYY"));
      return $('#static-date-to').text(moment($('#date').val()).add(period, 1).format("MMMM DD, YYYY"));
    });
    $(document).ajaxStart(function() {
      $('#loading').show();
      return $('#report_body').hide();
    });
    $(document).ajaxSuccess(function() {
      $('#loading').hide();
      return $('#report_body').show();
    });
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
        return $('input[name=discharge]:checked').change();
      });
      return $('#period').change();
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
    $('#compliance').change(function() {
      $('#cmp_box').val(0);
      if ($('#compliance').is(':checked')) {
        return $('input[name="cmp_box"]').attr('disabled', false);
      } else {
        $('input[name="cmp_box"]').attr('disabled', true);
        return $('input[name=cmp_box]').change(function() {
          return $('#cmp_box').val();
        });
      }
    });
    $('#defined_discharge').change(function() {
      if ($('input[name="discharge"].checked').val() === "Defined") {
        return $('#static-discharge').text($('#defined_discharge').val());
      }
    });
    $('#selected_discharge').change(function() {
      if ($('input[name="discharge"].checked').val() === "Selected") {
        return $('#static-discharge').text($('#selected_discharge').val());
      }
    });
    $('input[name="channel"]').change(function() {
      return $('#static-channel').text($(this).next().text());
    });
    $('input[name="sounding"]').change(function() {
      return $('#static-sounding').text($(this).next().text());
    });
    $('select#width').change(function() {
      return $('#static-width').text($(this).val());
    });
    $('select#chainage').change(function() {
      return $('#static-chainage').text($(this).val());
    });
    $('#window').change(function() {
      return $('#static-window').text("" + ($(this).val()) + " hrs");
    });
    $('#maximum_depth').change(function() {
      $('#max_depth_radio').prop('checked', 'checked');
      $('#window').val($(this).val());
      return $('#window').change();
    });
    $('#minimum_window').change(function() {
      $('#min_win_radio').prop('checked', 'checked');
      $('#window').val($(this).val());
      return $('#window').change();
    });
    $('input[name="window_radio"]').change(function() {
      if ($(this).val() === 'Maximum Depth') {
        $('#window').val($('#maximum_depth').val());
      } else {
        $('#window').val($('#minimum_window').val());
      }
      return $('#window').change();
    });
    return $('#date, ' + 'input[name=discharge], ' + '#defined_discharge,' + '#selected_discharge,' + '#chainage,' + 'input[name="sounding"],' + 'input[name="channel"], ' + '#width,' + '#period,' + '#window,' + '#compliance,' + '#cmp_box').change(update);
  });

  update = function(data) {
    return $.getJSON(("api/transit?date=" + ($('#date').val()) + "&") + ("lane=" + ($('input[name=channel]:checked').val()) + "&") + ("window=" + ($('#window').val()) + "&") + ("cmp=" + ($('#cmp_box').val()) + "&") + ("flowType=" + ($('#flowType').val()) + "&") + ("periodType=" + ($('#period').val()) + "&") + ("chainage=" + ($('#chainage').val()) + "&") + ("flowRate=" + ($('#flowRate').val()) + "&") + ("width=" + ($('#width').val()) + "&") + ("sounding=" + ($('input[name=sounding]:checked').val())), function(data2) {
      var item, _i, _len, _ref, _results;
      $('#num_days').text(data2.statistics.numberOfDays);
      $('#min_depth').text(data2.statistics.minimumDepth);
      $('#max_depth').text(data2.statistics.maximumDepth);
      $('#avg_depth').text(data2.statistics.totalWindow);
      table || (table = $('#transit-window').dataTable({
        bPaginate: false,
        bInfo: false,
        bFilter: false
      }));
      table.fnClearTable();
      _ref = data2.items;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        table.fnAddData([item.startTime, item.windowStart, item.endTime, item.windowEnd, item.depth]);
        table.fnAdjustColumnSizing();
        _results.push($('#transit-window tbody td').css('text-align', 'center'));
      }
      return _results;
    });
  };

}).call(this);
