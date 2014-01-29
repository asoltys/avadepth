(function() {
  var flowrate, images, play, preload, update;

  images = [];

  flowrate = 0;

  preload = function(img) {
    return $('<img/>')[0].src = "http://184.106.250.111" + img;
  };

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
      return $('#flowType').val(flowtype);
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
      var hour, i, interval, interval_start, minute, options, start;
      interval = parseFloat($(this).val());
      options = "";
      start = $('#from').val();
      interval_start = parseFloat(start);
      while (interval_start >= 0) {
        interval_start -= interval;
      }
      interval_start += interval;
      $('select#from').html('');
      for (i = interval_start; interval_start <= 24 ? i < 24 : i > 24; i += interval) {
        hour = Math.floor(i);
        if (hour < 10) hour = "0" + hour;
        minute = i % 1 * 60;
        if (minute === 0) minute = "00";
        options += "<option value=\"" + i + "\">" + hour + ":" + minute + "</option>";
      }
      $('select#from').html(options);
      $('#from').val(start);
      $("#from").change();
      return $('#static-interval').text($(this).val());
    });
    $('select#from').change(function() {
      var hour, i, interval, minute, options, _ref;
      interval = parseFloat($("#interval").val());
      options = "";
      $('select#to').html('');
      for (i = _ref = parseFloat($(this).val()) + interval; _ref <= 24 ? i < 24 : i > 24; i += interval) {
        hour = Math.floor(i);
        if (hour < 10) hour = "0" + hour;
        minute = i % 1 * 60;
        if (minute === 0) minute = "00";
        options += "<option value=\"" + i + "\">" + hour + ":" + minute + "</option>";
      }
      $('select#to').html(options);
      if ($('#type').val() === "0") $('select#to').prop('disabled', 'disabled');
      return $('#static-start').text($(this).val());
    });
    $('select#to').change(function() {
      return $('#static-end').text($(this).val());
    });
    $('input[name="velocity_legend"]').change(function() {
      return $('#static-legend').text($(this).next().text());
    });
    $('#type').change(function() {
      if ($(this).val() !== '0') {
        return $('#to').prop('disabled', '');
      } else {
        return $('#to').prop('disabled', 'disabled');
      }
    });
    $("#submit").click(update);
    return $('#replay').click(play);
  });

  update = function() {
    var base_minute, end_hour, end_minute, getImage, hour, interval, minute, total;
    $(this).prop('disabled', 'disabled');
    $('#loading').show();
    $('#animated, #animated_legend, #replay, #nodata').hide();
    hour = Math.floor(parseFloat($('#from').val()));
    minute = (parseFloat($('#from').val()) - hour) * 60;
    base_minute = minute;
    interval = parseFloat($("#interval").val());
    $('#frames_retrieved').html('0');
    $('#number_of_frames').html(($('#to').val() - $('#from').val()) / interval + 1);
    if ($('#type').val() !== '0') {
      end_hour = Math.floor(parseFloat($('#to').val()));
      end_minute = (parseFloat($('#to').val()) - end_hour) * 60;
      $('#frame_count').show();
    } else {
      end_hour = hour;
      end_minute = minute;
      $('#frame_count').hide();
    }
    total = (end_hour - hour) * 4 + (end_minute - minute) / 15;
    images = [];
    return (getImage = function() {
      return $.getJSON(("/api/animated?date=" + ($('#date').val()) + "&") + ("legendScale=" + ($('input[name=legend_scale]:checked').val()) + "&") + ("zone=" + ($('#zone').val()) + "&") + ("flowRate=" + flowrate + "&") + "flowType=0&" + ("hour=" + hour + "&") + ("minute=" + minute), function(data) {
        var result;
        result = data.toString();
        if (result !== '/images/') images.push(result);
        preload(images[images.length - 1]);
        return $('#frames_retrieved').html(images.length);
      }).then(function() {
        if (hour < end_hour || (hour === end_hour && minute <= end_minute)) {
          getImage();
          minute += interval * 60;
          if (minute >= 60) {
            minute = minute - 60;
            if (interval <= 1) {
              return hour += 1;
            } else {
              return hour += interval;
            }
          }
        } else {
          play();
          return $('#submit').prop('disabled', '');
        }
      });
    })();
  };

  play = function() {
    var handle, i;
    $('#loading').hide();
    $('#animated').attr("src", "/images/nodata.jpg");
    $('#animated_legend').hide();
    $('#animated_legend').attr("src", "/images/vectorscale" + ($('input[name=legend_scale]:checked').val()) + ".gif");
    $('#replay').prop('disabled', 'disabled');
    if (images.length > 0) {
      $('#replay').show();
      i = 1;
      handle = setInterval(function() {
        $('#animated').attr("src", "http://184.106.250.111" + images[i]);
        $('#animated').on("load", function() {
          $('#animated').show();
          return $('#animated_legend').show();
        });
        i++;
        if (i >= images.length) {
          clearInterval(handle);
          return $('#replay').prop('disabled', '');
        }
      }, 1000);
    } else {
      $('#nodata').show();
    }
    if ($('#type').val() === '0') return $('#replay').hide();
  };

}).call(this);
