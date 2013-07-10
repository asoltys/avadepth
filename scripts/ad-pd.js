
  $(function() {
    var createGraph;
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
    $('input[name=discharge]').change(function() {
      var flowrate;
      flowrate = (function() {
        switch ($(this).val()) {
          case 'Actual':
            return 0;
          case 'Predicted':
            return $('#predicted_discharge').text() && $('#static-discharge').text($('#predicted_discharge').val());
          case 'Defined':
            return $('#defined_discharge').val() && $('#static-discharge').text($('#defined_discharge').val());
          case 'Selected':
            return $('#selected_discharge').val() && $('#static-discharge').text($('#selected_discharge').val());
        }
      }).call(this);
      $('#flowRate').val(flowrate);
      return $('#static-discharge-eval').text($(this).val());
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
    $('#date, #width, #chainage').change(function() {
      $.getJSON("/api/Flow/Get?date=" + ($('#date').val()), function(data) {
        $('#predicted_discharge').text(data);
        $('#static-discharge').text(data);
        return $.getJSON("/api/depths/calculate?date=" + ($('#date').val()) + "&chainage=" + ($('#chainage').val()) + "&flowRate=" + ($('#flowRate').val()) + "&flowType=0&width=" + ($('#width').val()) + "&sounding=" + ($('#sounding').val()), function(data) {
          var points;
          $('#depths tbody tr').remove();
          points = new Array();
          $.each(data.items[0].items, function() {
            $('#depths').append("<tr><td><a href='advr-drvp-eng.html?lane=xxx&amp;period=" + this.period + "'>" + this.period + "</a></td><td class='center'>" + this.chainage + "</td><td class='center'>" + this.depth + "</td><td>" + this.location + "</td></tr>");
            return points.push([this.period, this.depth]);
          });
          createGraph(points);
          return $('#depths').dataTable({
            bPaginate: false,
            bInfo: false,
            bFilter: false
          });
        });
      });
      if (moment().diff($('#date').val()) > 0) {
        $("#actual").attr('disabled', false);
      } else {
        $("#actual").attr('disabled', true);
      }
      return $('#static-date').text($('#alt-date').val());
    });
    return $('#date').change();
  });
