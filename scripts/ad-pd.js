
  $(function() {
    var d1, leadingZero, points;
    points = [[0, 10.6], [2, 11.1], [4, 11.85], [6, 12.2], [8, 11.3], [10, 10.0], [12, 9.4], [14, 9.4], [16, 10.5], [18, 11.75], [20, 12.1], [22, 11.6]];
    d1 = {
      color: "red",
      lines: {
        lineWidth: 3
      },
      data: points
    };
    leadingZero = function(num, axis) {
      var s;
      s = "0" + num;
      return s.substr(s.length - 2);
    };
    $.plot("#placeholder", [d1], {
      xaxes: [
        {
          color: 'black',
          tickColor: '#aaa',
          axisLabel: 'Pacific Standard Time (hrs)',
          tickSize: 2,
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
    $(".yaxislabel").css("color", "black");
    $('input[name=discharge]').change(function() {
      var flowrate;
      flowrate = (function() {
        switch ($(this).val()) {
          case 'actual':
            return 0;
          case 'predicted':
            return $('#predicted_discharge').text();
          case 'defined':
            return $('#defined_discharge').val();
          case 'selected':
            return $('#selected_discharge').val();
        }
      }).call(this);
      return $('#flowRate').val(flowrate);
    });
    $('#date').change(function() {
      $.getJSON("/api/Flow/Get?date=" + ($('#date').val()), function(data) {
        $('#predicted_discharge').text(data);
        return $.getJSON("/api/depths/calculate?date=" + ($('#date').val()) + "&chainage=" + ($('#chainage').val()) + "&flowRate=" + ($('#flowRate').val()) + "&flowType=0&width=" + ($('#width').val()) + "&sounding=" + ($('#sounding').val()), function(data) {
          $('#depths tbody tr').remove();
          $.each(data.items[0].items, function() {
            return $('#depths').append("<tr><td>" + this.period + "</td><td>" + this.chainage + "</td><td>" + this.depth + "</td><td>" + this.location + "</td>");
          });
          return $('.zebra-striped tr:even').addClass('stripe');
        });
      });
      if (moment().diff($('#date').val()) > 0) {
        return $("#actual").attr('disabled', false);
      } else {
        return $("#actual").attr('disabled', true);
      }
    });
    return $('#date').change();
  });
