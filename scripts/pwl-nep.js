
  $(function() {
    $('#date').change(function() {
      return $.getJSON("/api/depths?date=" + ($('#date').val()), function(data) {
        $('#predicted_discharge').text(data.Predicted);
        $('#actual_discharge').text(data.Actual);
        $('#selected_discharge option').remove();
        $.each(data.Flowrates, function() {
          return $('#selected_discharge').append("<option>" + (this.toString()) + "</option>");
        });
        return $('#discharge').change();
      });
    });
    $('#date, #interval, #chainage, input[name=waterway], input[name=discharge]').change(function() {
      var waterway;
      waterway = $('input:radio[name=waterway]:checked').val();
      $.getJSON("/api/waterlevel?date=" + ($('#date').val()) + "&intervalMin=" + ($('#interval').val()) + "&flowRate=2000&flowType=0&waterway=" + waterway + "&displayType=0", function(data) {
        $('#water-levels thead tr:last th').remove();
        $('#water-levels tbody tr').remove();
        $('#location').text(data.title);
        $.each(data.locations, function() {
          return $('#water-levels thead tr:last').append("<th><a href='pwlk-nepk-eng.html?waterway=" + waterway + "&km=" + this + "'>" + this + "</a></th>");
        });
        return $.each(data.times, function() {
          var row;
          row = $("<tr><td><a href='pwlt-ptnd-eng.html?waterway=" + waterway + "&time=" + this.predictTime + "'>" + this.predictTime + "</a></td></tr>");
          $.each(this.waterLevels, function() {
            return row.append("<td>" + (parseInt(this).toFixed(1)) + "</td>");
          });
          return $('#water-levels tbody').append(row);
        });
      });
      if (moment().diff($('#date').val()) > 0) {
        $("#actual").attr('disabled', false);
      } else {
        $("#actual").attr('disabled', true);
      }
      return $('#static-date').text($('#alt-date').val());
    });
    $('input[name="discharge"]').change(function() {
      var discharge;
      discharge = (function() {
        switch ($(this).val()) {
          case 'actual':
            return $('#actual_discharge').text();
          case 'predicted':
            return $('#predicted_discharge').text();
          case 'defined':
            return $('#selected_discharge').val();
          case 'selected':
            return $('#defined_discharge').val();
        }
      }).call(this);
      $('#static-discharge-eval').text(discharge);
      return $('#flowRate').val(discharge);
    });
    $('input[name="discharge"]').change(function() {
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
    $('input[name="fraser_river"]').change(function() {
      return $('#static-arm').text($(this).val());
    });
    $('input[name="channel"]').change(function() {
      return $('#static-limit').text($(this).next().text());
    });
    $('select#interval').change(function() {
      return $('#static-interval').text($(this).val());
    });
    $('select#chainage').change(function() {
      return $('#static-chainage').text($(this).val());
    });
    return $('#date').change();
  });
