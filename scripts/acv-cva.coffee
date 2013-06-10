$(->
  $('#date').change(->
    if (moment().diff($('#date').val()) > 0)
      $("#actual").attr('disabled', false)
    else
      $("#actual").attr('disabled', true)
      
    $('#static-date').text($('#alt-date').val())
  )
  
  $('input[name="discharge"]').change(->
    switch $(this).val()
      when 'Actual' then 0
      when 'Predicted' then 0
      when 'Defined' then $('#static-discharge').text($('#defined_discharge').val())
      when 'Selected' then $('#static-discharge').text($('#selected_discharge').val())
      
    $('#static-discharge-eval').text($(this).val())
  )
  
  $('#defined_discharge').change(->
    if ($('input[name="discharge"].checked').val() == "Defined")
      $('#static-discharge').text($('#defined_discharge').val())
  )
  
  $('#selected_discharge').change(->
    if ($('input[name="discharge"].checked').val() == "Selected")
      $('#static-discharge').text($('#selected_discharge').val())
  )
  
  $('select#zone').change(->
    $('#static-zone').text($(this).val())
  )

  $('select#interval').change(->
    $('#static-interval').text($(this).val())
  )
  
  $('select#from').change(->
    $('#static-start').text($(this).val())
  )  
  
  $('select#to').change(->
    $('#static-end').text($(this).val())
  )  
  
  $('input[name="velocity_legend"]').change(->
    $('#static-legend').text($(this).next().text())
  )
  
  $('#date').change()
)
