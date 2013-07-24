
  $(function() {
    var createGraph, flowrate, table;
    table = null;
    flowrate = 0;
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
    $(".yaxislabel").css("color", "black");
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
    $('input[name="condition"]').change(function() {
      return $('#static-type').text($(this).next().text());
    });
    $('input[name="channel"]').change(function() {
      return $('#static-limit').text($(this).next().text());
    });
    $('select#width').change(function() {
      return $('#static-width').text($(this).val());
    });
    $('select#chainage').change(function() {
      return $('#static-chainage').text($(this).val());
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
          $("#actual").attr('disabled', false);
          $("#predicted").attr('disabled', true);
          if ($('#predicted').is(':checked')) {
            $('input[name=discharge]')[1].checked = true;
          }
        } else {
          $("#actual").attr('disabled', true);
          $("#predicted").attr('disabled', false);
          if ($('#actual').is(':checked')) {
            $('input[name=discharge]')[0].checked = true;
          }
        }
        $('input[name=discharge]:checked').trigger('change');
        return $('#static-date').text($('#alt-date').val());
      });
      if (moment().diff($('#date').val()) > 0) {
        $("#actual").attr('disabled', false);
        return $("#actual").attr('checked', 'checked');
      } else {
        return $("#actual").attr('disabled', true);
      }
    }).change();
    $('input[name=discharge]').change(function() {
      var flowtype;
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
    return $('#date, #width, #chainage, input[name=discharge], input[name=condition], input[name=channel]').change(function() {
      $.getJSON("/api/Flow/Get?date=" + ($('#date').val()), function(data) {
        return $.getJSON("/api/depths/calculate?date=" + ($('#date').val()) + "&chainage=" + ($('#chainage').val()) + "&flowRate=" + ($('#flowRate').val()) + "&flowType=" + ($('input[name=channel]:checked').val()) + "&width=" + ($('#width').val()) + "&sounding=" + ($('input[name=condition]:checked').val()), function(data) {
          var points;
          table || (table = $('#depths').dataTable({
            bPaginate: false,
            bInfo: false,
            bFilter: false
          }));
          table.fnClearTable();
          $('#depths tbody tr').remove();
          points = new Array();
          $.each(data.items[0].items, function() {
            table.fnAddData(["<a href='advr-drvp-eng.html?lane=xxx&amp;period=" + this.period + "'>" + this.period + "</a>", this.chainage, this.depth, this.location]);
            return points.push([this.period, this.depth]);
          });
          table.fnAdjustColumnSizing();
          $('#depths td:nth-child(3)').css('text-align', 'center');
          return createGraph(points);
        });
      });
      return $('#static-date').text($('#alt-date').val());
    });
  });
