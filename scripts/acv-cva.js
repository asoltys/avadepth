
  $(function() {
    $('#date').change(function() {
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
    return $('#date').change();
  });
