
  $(function() {
    $('#date, #interval, #chainage, input[name=waterway]').change(function() {
      var waterway;
      waterway = $('input:radio[name=waterway]:checked').val();
      $.getJSON("/api/waterlevel?date=" + ($('#date').val()) + "&intervalMin=" + ($('#interval').val()) + "&flowRate=" + ($('#selected_discharge').val()) + "&flowType=0&waterway=" + waterway + "&displayType=0", function(data) {
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
      switch ($(this).val()) {
        case 'Actual':
          0;
          break;
        case 'Predicted':
          0;
          break;
        case 'Defined':
          $('#static-discharge').text($('#defined_discharge').val());
          break;
        case 'Selected':
          $('#static-discharge').text($('#selected_discharge').val());
      }
      return $('#static-discharge-eval').text($(this).val());
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
