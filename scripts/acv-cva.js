(function() {
  var flowrate, update;

  flowrate = 0;

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
    $('#type').change(function() {
      if ($(this).val() === 1) {
        return $('#to').display();
      } else {
        return $('#to').hide();
      }
    });
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
      $('#flowType').val(flowtype);
      return update();
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
    $('select#zone').change(function() {
      return $('#static-zone').text($(this).val());
    });
    $('select#interval').change(function() {
      return $('#static-interval').text($(this).val());
    });
    $('select#from').change(function() {
      return $('#static-start').text($(this).val());
    });
    $('select#to').change(function() {
      return $('#static-end').text($(this).val());
    });
    $('input[name="velocity_legend"]').change(function() {
      return $('#static-legend').text($(this).next().text());
    });
    return $('#from, #to, #zone').change(update);
  });

  update = function() {
    var end_hour, end_minute, handle, hour, minute;
    hour = Math.floor(parseFloat($('#from').val()));
    minute = (parseFloat($('#from').val()) - hour) * 60;
    end_hour = Math.floor(parseFloat($('#to').val()));
    end_minute = (parseFloat($('#to').val()) - end_hour) * 60;
    return handle = setInterval(function() {
      $.getJSON("/api/animated?date=" + ($('#date').val()) + "&legendScale=1&zone=" + ($('#zone').val()) + "&flowRate=" + flowrate + "&flowType=0&hour=" + hour + "&minute=" + minute, function(data) {
        if (data.toString() === '/images/') {
          return $('#animated').attr("src", "/images/nodata.jpg");
        } else {
          return $('#animated').attr("src", "http://184.106.250.111" + data);
        }
      });
      if (hour >= end_hour && minute >= end_minute) clearInterval(handle);
      minute += 15;
      if (minute === 60) {
        minute = 0;
        return hour += 1;
      }
    }, 1000);
  };

}).call(this);
