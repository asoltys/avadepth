
  $(function() {
    return $('#date').change(function() {
      if (moment().diff($('#date').val()) > 0) {
        return $("#actual").attr('disabled', false);
      } else {
        return $("#actual").attr('disabled', true);
      }
    });
  });
