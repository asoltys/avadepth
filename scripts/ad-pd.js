(function() {
  var createGraph, flowrate, table, update;

  table = null;

  flowrate = 0;

  $(function() {
    $("#print_daily_depths").click(function() {
      return window.print();
    });
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
      console.log($(this).val());
      return avadepth.util.getFlow({
        date: $(this).val(),
        selected: $("#selected_discharge"),
        predicted: $("#predicted_discharge"),
        actual: $("#actual_discharge")
      });
    }).change();
    $('#selected_discharge').change(function() {
      return $('#selected_radio').prop('checked', true).change();
    });
    $('input[name=discharge]').change(function() {
      var flow;
      flow = avadepth.util.getSelectedFlow();
      $('#flowRate').val(flow.flowRate);
      console.log($('#flowRate').val());
      $('#static-discharge').text(flow.flowRate);
      $('#static-discharge-eval').text($(this).val());
      return $('#flowType').val(flow.flowType);
    });
    $("form#daily_depth").on("change", "input, select", update);
    return update();
  });

  update = function() {
    return $.getJSON(("/api/depths/calculate?date=" + ($('#date').val()) + "&") + ("chainage=" + ($('#chainage').val()) + "&") + ("flowRate=" + ($('#flowRate').val()) + "&") + ("flowType=" + ($('#flowType').val()) + "&") + ("width=" + ($('#width').val()) + "&") + ("sounding=" + ($('input[name=condition]:checked').val())), function(data) {
      var points;
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
        table.fnAddData(["<a href='advr-drvp-eng.html?lane=xxx&amp;period=" + this.period + "'>" + this.period + "</a>", this.chainage, this.depth, this.location]);
        return points.push([this.period, this.depth]);
      });
      return createGraph(points);
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
