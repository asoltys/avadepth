(function() {
  var flowrate, images, play, update;

  images = [];

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
    $('#from, #to, #zone, #interval, #type').change(update);
    return $('#replay').click(play);
  });

  update = function() {
    var end_hour, end_minute, getImage, hour, minute, total;
    $('#loading').show();
    $('#animated, #replay, #nodata').hide();
    hour = Math.floor(parseFloat($('#from').val()));
    minute = (parseFloat($('#from').val()) - hour) * 60;
    if ($('#type').val() !== '0') {
      end_hour = Math.floor(parseFloat($('#to').val()));
      end_minute = (parseFloat($('#to').val()) - end_hour) * 60;
      $('#to').prop('disabled', '');
    } else {
      end_hour = hour;
      end_minute = minute;
      $('#to').prop('disabled', 'disabled');
    }
    total = (end_hour - hour) * 4 + (end_minute - minute) / 15;
    images = [];
    return (getImage = function() {
      return $.getJSON(("/api/animated?date=" + ($('#date').val()) + "&") + ("legendScale=" + ($('#interval').val()) + "&") + ("zone=" + ($('#zone').val()) + "&") + ("flowRate=" + flowrate + "&") + "flowType=0&" + ("hour=" + hour + "&") + ("minute=" + minute), function(data) {
        var result;
        result = data.toString();
        if (result !== '/images/') return images.push(result);
      }).then(function() {
        if (hour < end_hour || (hour === end_hour && minute <= end_minute)) {
          getImage();
          minute += 15;
          if (minute === 60) {
            minute = 0;
            return hour += 1;
          }
        } else {
          return play();
        }
      });
    })();
  };

  play = function() {
    var handle, i;
    $('#loading').hide();
    $('#animated').show();
    if (images.length > 0) {
      $('#replay').show();
      i = 0;
      handle = setInterval(function() {
        $('#animated').attr("src", "http://184.106.250.111" + images[i]);
        i++;
        if (i >= images.length) return clearInterval(handle);
      }, 1000);
    } else {
      $('#nodata').show();
    }
    if ($('#type').val() === '0') return $('#replay').hide();
  };

}).call(this);
