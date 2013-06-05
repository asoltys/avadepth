$(->
  $('#date').change(->
    if (moment().diff($('#date').val()) > 0)
      $("#actual").attr('disabled', false)
    else
      $("#actual").attr('disabled', true)
  )
)
