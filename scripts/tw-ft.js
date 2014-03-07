(function() {
  var table, update;

  table = null;

  $(function() {
    $("#print_transit_window").click(function() {
      return window.print();
    });
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
      $('.spinner').css('display', 'block');
      $('#ajax_message').html('');
      $('#ajax_message').show();
      return $('#report_body').hide();
    });
    $(document).ajaxSuccess(function() {
      $('.spinner').css('display', 'none');
      $('#ajax_message').hide();
      return $('#report_body').show();
    });
    $(document).ajaxError(function() {
      $('.spinner').css('display', 'none');
      $('#ajax_message').html('An error occured while retrieving your results');
      $('#ajax_message').show();
      return $('#report_body').hide();
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
      var flowRate_txt, flowrate, flowtype;
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
      if ($('html').attr('lang') === 'fr') {
        flowRate_txt = (function() {
          switch ($(this).val()) {
            case 'Predicted':
              return "prévu";
            case 'Actual':
              return "réel";
            case 'Defined':
              return "défini par l'utilisateur";
            case 'Selected':
              return "choisi";
          }
        }).call(this);
        $("#static-discharge-eval").text(flowRate_txt);
      }
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
      return $('#static-window').text("Transit Window: " + ($(this).val()) + " hrs");
    });
    $('#minimum_window').change(function() {
      $('#max_depth_radio').prop('checked', 'checked');
      $('#window').val($(this).val());
      $('#cmp').val(0);
      return $('#static-window').text("Transit Window: " + ($('#window').val()) + " hrs");
    });
    $('#depth').change(function() {
      $('#min_win_radio').prop('checked', 'checked');
      $('#cmp').val($(this).val());
      return $('input[name="window_radio"]').change();
    });
    $('input[name="window_radio"]').change(function() {
      if ($(this).val() === 'Maximum Depth') {
        $('#cmp').val(0);
        return $('#static-window').text("Transit Window: " + ($('#window').val()) + " hrs");
      } else {
        $('#cmp').val($('#depth').val());
        return $('#static-window').text("Available Transit Window for " + ($('#cmp').val()) + "m depth & " + ($('#minimum_window').val()) + " hr window");
      }
    });
    /*
      $('#date, ' +
          'input[name=discharge], ' +
          '#defined_discharge,'  +
          '#selected_discharge,' +
          '#chainage,' +
          'input[name="sounding"],' +
          'input[name="channel"], ' +
          '#width,'  +
          '#period,' +
          '#window,' +
          '#compliance,'+
          '#cmp_box').change(update)
    */
    return $("#submit").click(update);
  });

  update = function(data) {
    $('#transit-window').show();
    return $.getJSON(("api/transit?date=" + ($('#date').val()) + "&") + ("lane=" + ($('input[name=channel]:checked').val()) + "&") + ("window=" + ($('#window').val()) + "&") + ("cmp=" + ($('#cmp').val()) + "&") + ("flowType=" + ($('#flowType').val()) + "&") + ("periodType=" + ($('#period').val()) + "&") + ("chainage=" + ($('#chainage').val()) + "&") + ("flowRate=" + ($('#flowRate').val()) + "&") + ("width=" + ($('#width').val()) + "&") + ("sounding=" + ($('input[name=sounding]:checked').val())), function(data2) {
      var item, limit_text, _i, _len, _ref;
      $('#num_days').text(data2.statistics.numberOfDays);
      $('#min_depth').text(data2.statistics.minimumDepth.toFixed(2));
      $('#max_depth').text(data2.statistics.maximumDepth.toFixed(2));
      $('#avg_depth').text(data2.statistics.totalWindow.toFixed(2));
      table || (table = $('#transit-window').dataTable({
        bPaginate: false,
        bInfo: false,
        bFilter: false,
        aaSorting: []
      }));
      table.fnClearTable();
      _ref = data2.items;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        table.fnAddData([item.startTime, item.windowStart, item.endTime, item.windowEnd, item.depth]);
        table.fnAdjustColumnSizing();
        $('#transit-window tbody td').css('text-align', 'center');
      }
      limit_text = (function() {
        switch (false) {
          case $('input[name="channel"]:checked').val() !== '2':
            if ($('html').attr('lang') === 'en') {
              return 'Outer Channel Limit';
            } else {
              return 'Limite extérieure';
            }
            break;
          case $('input[name="channel"]:checked').val() !== '1':
            if ($('html').attr('lang') === 'en') {
              return 'Inner Channel Limit';
            } else {
              return 'Limite intérieure';
            }
            break;
          default:
            return '';
        }
      })();
      return $('#static-channel').text(limit_text);
    });
  };

}).call(this);
