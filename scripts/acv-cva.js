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
    return $('#from, #zone').change(update);
  });

  update = function() {
    var hr, minute;
    hr = Math.floor(parseFloat($('#from').val()));
    minute = (parseFloat($('#from').val()) - hr) * 60;
    return $.getJSON("/api/animated?date=" + ($('#date').val()) + "&legendScale=0&zone=" + ($('#zone').val()) + "&flowRate=" + flowrate + "&flowType=0&hour=" + hr + "&minute=" + minute, function(data) {
      $('#animated').html("<img src='http://184.106.250.111" + data + "' />");
      return $('tr', '#location tbody').remove();
    });
  };

}).call(this);
