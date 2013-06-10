$(->
  $('#date').change(->
    $('#static-date').text($('#alt-date').val())
  )

  $('select#period').change(->
    $('#static-period').text($(this).val())
  )

  $('#date').change()
)
