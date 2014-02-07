(function() {
  var createGraph, flowrate, querystring, table, update;

  table = null;

  flowrate = 0;

  querystring = function(key) {
    var m, r, re;
    re = new RegExp('(?:\\?|&)' + key + '=(.*?)(?=&|$)', 'gi');
    r = [];
    m = [];
    while ((m = re.exec(document.location.search)) !== null) {
      r.push(m[1]);
    }
    return r;
  };

  $(function() {
    var check;
    if (querystring('date').length !== 0) {
      $("#date").val(querystring('date'));
      $("#chainage").val(querystring('chainage'));
      $("#flowtype").val(querystring('flowType'));
      $("#sounding").val(querystring('sounding'));
      $("#width").val(querystring('width'));
      $("#period").val(querystring('period'));
      $("#flowRate").val(querystring('flowRate'));
      $("#flowType").val(querystring('flowType'));
      check = (function() {
        switch (querystring('flowType')[0]) {
          case 'Predicted':
            return 0;
          case 'Actual':
            return 1;
          case 'Defined':
            $("#defined_discharge").val($('#flowRate').val());
            return 3;
          case 'Selected':
            return 2;
        }
      })();
      $("input[name=discharge]")[check].checked = true;
      update();
    }
    $("#print_daily_depths").click(function() {
      return window.print();
    });
    $(".yaxislabel").css("color", "black");
    $('body').on("change", "#date", function() {
      return avadepth.util.getFlow({
        date: $(this).val(),
        selected: $("#selected_discharge"),
        predicted: $("#predicted_discharge"),
        actual: $("#actual_discharge")
      });
    });
    $("#date").change();
    $('#selected_discharge').change(function() {
      return $('#selected_radio').prop('checked', true).change();
    });
    $('input[name=discharge]').change(function() {});
    return $("#submit").click(function() {
      if (!$('input[name=discharge]').is(":checked")) {
        $("#error_message").show();
        $("#error_message").html("Place select one of the options for the field \"River Discharge @ Hope\"");
        return $("#report_body").hide();
      } else {
        $("#error_message").hide();
        $("#report_body").show();
        return update();
      }
    });
  });

  update = function() {
    var date_val_arr, date_val_month, flow;
    date_val_arr = $('#date').val().split("-");
    date_val_month = (function() {
      switch (false) {
        case date_val_arr[1] !== '01':
          return 'January';
        case date_val_arr[1] !== '02':
          return 'February';
        case date_val_arr[1] !== '03':
          return 'March';
        case date_val_arr[1] !== '04':
          return 'April';
        case date_val_arr[1] !== '05':
          return 'May';
        case date_val_arr[1] !== '06':
          return 'June';
        case date_val_arr[1] !== '07':
          return 'July';
        case date_val_arr[1] !== '08':
          return 'August';
        case date_val_arr[1] !== '09':
          return 'September';
        case date_val_arr[1] !== '10':
          return 'October';
        case date_val_arr[1] !== '11':
          return 'November';
        case date_val_arr[1] !== '12':
          return 'December';
      }
    })();
    $('#date-display').text(date_val_month + " " + date_val_arr[0]);
    flow = avadepth.util.getSelectedFlow();
    $('#flowRate').val(flow.flowRate);
    if (flow.flowType !== "0") {
      $('#flowType').val(flow.flowType);
    } else {
      $('#flowType').val("UserDefined");
    }
    return $.getJSON(("/api/depths/calculate?date=" + ($('#date').val()) + "&") + ("chainage=" + ($('#chainage').val()) + "&") + ("flowRate=" + ($('#flowRate').val()) + "&") + ("flowType=" + ($('#flowType').val()) + "&") + ("width=" + ($('#width').val()) + "&") + ("sounding=" + ($('input[name=condition]:checked').val())), function(data) {
      var limit_text, points;
      table || (table = $('#depths').dataTable({
        bPaginate: false,
        bInfo: false,
        bAutoWidth: false,
        bFilter: false
      }));
      table.fnClearTable();
      $('#depths tbody tr').remove();
      points = new Array();
      $.each(data.items[0].items, function() {
        table.fnAddData([("<a href='advr-drvp-eng.html?date=" + ($('#date').val()) + "&") + ("chainage=" + ($('#chainage').val()) + "&") + ("flowRate=" + ($('#flowRate').val()) + "&") + ("flowType=" + ($('#flowType').val()) + "&") + ("sounding=" + ($('input[name=condition]:checked').val()) + "&") + ("width=" + ($('#width').val()) + "&") + ("period=" + this.period + "'>" + this.period + "</a>"), this.chainage, this.depth, this.location]);
        return points.push([this.period, this.depth]);
      });
      createGraph(points);
      $('#static-width').text($('#width').val());
      $('#static-chainage').text($('#chainage').val());
      $('#static-type').text($('input[name="condition"]:checked').next().text());
      limit_text = (function() {
        switch (false) {
          case $('input[name="channel"]:checked').val() !== '0':
            return 'Inner Channel Limit';
          case $('input[name="channel"]:checked').val() !== '1':
            return 'Outer Channel Limit';
          default:
            return '';
        }
      })();
      $('#static-limit').text(limit_text);
      $('#static-discharge').text($('#flowRate').val());
      return $('#static-discharge-eval').text($('#flowType').val());
    });
  };

  createGraph = function(p) {
    var d1, leadingZero;
    d1 = {
      color: "red",
      lines: {
        lineWidth: 3
      },
      data: p
    };
    leadingZero = function(num, axis) {
      var s;
      s = "0" + num;
      return s.substr(s.length - 4);
    };
    return $.plot("#placeholder", [d1], {
      xaxes: [
        {
          color: 'black',
          tickColor: '#aaa',
          axisLabel: 'Pacific Standard Time (hrs)',
          tickSize: 200,
          tickFormatter: leadingZero
        }
      ],
      yaxes: [
        {
          color: 'black',
          tickColor: '#aaa',
          position: 'left',
          axisLabel: 'Available Depth (m)'
        }
      ]
    });
  };

}).call(this);
