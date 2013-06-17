
  $(function() {
    $('#date').change(function() {
      return $('#static-date').text($('#alt-date').val());
    });
    $('select#period').change(function() {
      return $('#static-period').text($(this).val());
    });
    return $('#date').change();
  });
