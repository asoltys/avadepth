(function() {
  var gotoKMGraph, gotoTimeGraph, table, update;

  table = null;

  gotoKMGraph = function() {
    return document.location = ("pwlk-nepk-" + ($("#lang").val()) + ".html?date=" + ($('#date').val()) + "&") + ("km=" + ($(this).text()) + "&") + ("intervalMin=" + ($('#interval').val()) + "&") + ("flowRate=" + ($('#flowRate').val()) + "&") + ("flowType=" + ($('#flowType').val()) + "&") + ("waterway=" + ($('#waterway').val()) + "&") + ("displayType=" + ($('input[name=report]:checked').val()));
  };

  gotoTimeGraph = function() {
    return document.location = ("pwlt-ptnd-" + ($("#lang").val()) + ".html?date=" + ($('#date').val()) + "&") + ("time=" + ($(this).text()) + "&") + ("intervalMin=" + ($('#interval').val()) + "&") + ("flowRate=" + ($('#flowRate').val()) + "&") + ("flowType=" + ($('#flowType').val()) + "&") + ("waterway=" + ($('#waterway').val()) + "&") + ("displayType=" + ($('input[name=report]:checked').val()));
  };

  $(function() {
    var check, river_section;
    $("#print_predicted_water_levels").click(function() {
      return window.print();
    });
    if (querystring('date').length !== 0) {
      $("#date").val(querystring('date'));
      $("#waterway").val(querystring('waterway'));
      $("#interval").val(querystring('intervalMin'));
      river_section = (function() {
        switch ($("#waterway").val()) {
          case "0":
            return "South Arm";
          case "1":
            return "North Arm";
          case "2":
            return "Main Arm";
        }
      })();
      $("#fraser_river").val(river_section);
      $("#flowRate").val(querystring('flowRate'));
      $("#flowType").val(querystring('flowType'));
      check = (function() {
        switch (querystring('flowType')[0]) {
          case '0':
            return 0;
          case '1':
            return 1;
          case '2':
            $("#defined_discharge").val($('#flowRate').val());
            return 3;
          case '3':
            return 2;
        }
      })();
      $("input[name=discharge]")[check].checked = true;
      $("input[name=report]")[querystring('displayType')].checked = true;
      $("#km").text(querystring('km'));
      update();
    }
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
    $('input[name=channel]').change(function() {
      return $('#static-limit').text($(this).next().text());
    });
    $("select#fraser_river").change(function() {
      var img_src;
      img_src = (function() {
        switch ($(this).val()) {
          case "South Arm":
            return "pwl_southarm.png";
          case "North Arm":
            return "pwl_northarm.png";
          case "Main Arm":
            return "pwl_mainarm.png";
        }
      }).call(this);
      return $("#fraser_river_map").attr("src", "images/" + img_src);
    });
    $('select#interval').change(function() {
      return $('#static-interval').text($(this).val());
    });
    $('select#chainage').change(function() {
      return $('#static-chainage').text($(this).val());
    });
    return $("#submit").click(update);
  });

  update = function() {
    var headerRow, i, kmStart, report_type, step, waterway, _ref;
    $('.spinner').css('display', 'block');
    report_type = $('input[name=report]:checked').val();
    waterway = (function() {
      switch ($('#fraser_river').val()) {
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
    })();
    switch ($('#daily_depth input[name=report]:radio:checked').val()) {
      case "0":
        $('#river_discharge_report').text('Predicted Water Levels');
        $('#note-at-bottom').text('Water level is referenced to Chart Datum which is relative to Local Low Water. Click on a time or location to display a graph.');
        break;
      case "1":
        $('#river_discharge_report').text('Predicted Velocities');
        $('#note-at-bottom').text('Velocities are in metres per second. Negative values indicate a flow in an upstream direction as a result of tides.');
        break;
      default:
        $('#river_discharge_report').text('');
    }
    $('#static-arm').text($('#fraser_river').val());
    $('#waterway').val(waterway);
    $('#river-section').text($('#fraser_river').val());
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
      if (report_type === "0") {
        headerRow = $("<th><a href=\"javascript:void(0)\">" + i + "</a></th>");
      } else {
        headerRow = $("<th>" + i + "</th>");
      }
      $('#headerkm').append(headerRow);
      if (report_type === "0") headerRow.click(gotoKMGraph);
    }
    return $.getJSON(("/api/waterlevel?date=" + ($('#date').val()) + "&") + ("intervalMin=" + ($('#interval').val()) + "&") + ("flowRate=" + ($('#flowRate').val()) + "&") + ("flowType=" + ($('#flowType').val()) + "&") + ("waterway=" + ($('#waterway').val()) + "&") + ("displayType=" + ($('input[name=report]:checked').val())), function(data) {
      var count;
      $('#river-section').text(data.title);
      table || (table = $('#water-levels').dataTable({
        bPaginate: false,
        bInfo: false,
        bFilter: false,
        bAutoWidth: false,
        aoColumns: [
          {
            "bSortable": false
          }, null
        ]
      }));
      table.fnClearTable();
      count = 0;
      $.each(data.times, function() {
        var row;
        if (report_type === "0") {
          row = $("<tr><td class='align-center'><a href=\"javascript:void(0)\">" + this.predictTime + "</a></td></tr>");
        } else {
          row = $("<tr><td class='align-center'>" + this.predictTime + "</td></tr>");
        }
        if (count % 2) {
          row.addClass("even");
        } else {
          row.addClass("odd");
        }
        count++;
        $.each(this.waterLevels, function() {
          return row.append("<td>" + (parseFloat(this).toFixed(1).replace('-', String.fromCharCode(8209))) + "</td>");
        });
        $('#water-levels tbody').append(row);
        if (report_type === "0") $(row).find('a').click(gotoTimeGraph);
        return $('.dataTables_empty').parent().html('');
      });
      return $('.spinner').css('display', 'none');
    });
  };

}).call(this);
