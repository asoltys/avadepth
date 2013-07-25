flowrate = 0
$(->
  $('#date').change(->
    $.getJSON("/api/depths?date=#{$('#date').val()}", (data) ->
      $('#selected_discharge').empty()
      $.each(data.Flowrates, ->
        $('#selected_discharge').append("<option value='#{this}'>#{this}</option>")
      )
      $('#predicted_discharge').text(data.Predicted)
      $('#actual_discharge').text(data.Actual)

      if (data.Actual)
        $("#actual_radio").attr('disabled', false)
        $("#predicted_radio").attr('disabled', true)
        $('#actual_radio').prop('checked', true)
      else
        $("#actual_radio").attr('disabled', true)
        $("#predicted_radio").attr('disabled', false)
        $("#predicted_radio").prop('checked', true)

      $('input[name=discharge]:checked').change()
      $('#static-date').text($('#alt-date').val())
    )

    $('#static-date').text($('#alt-date').val())
  ).change()

  $('#selected_discharge').change(->
    $('#discharge_radio').prop('checked', true).change()
  )

  $('input[name=discharge]').change(->
    flowrate = switch $(this).val()
      when 'Actual' then $('#actual_discharge').text()
      when 'Predicted' then $('#predicted_discharge').text()
      when 'Defined' then $('#defined_discharge').val()
      when 'Selected' then $('#selected_discharge').val()
    $('#flowRate').val(flowrate)
    $('#static-discharge').text(flowrate)
    $('#static-discharge-eval').text($(this).val())

    flowtype = switch $(this).val()
      when 'Actual' then 0
      when 'Predicted' then 1
      when 'Defined' then 2
      when 'Selected' then 3
    $('#flowType').val(flowtype)

    update()
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

  $('#from, #zone').change(update)
)

update = ->
  hr = Math.floor(parseFloat($('#from').val()))
  minute = (parseFloat($('#from').val()) - hr) * 60
  $.getJSON("/api/animated?date=#{$('#date').val()}&legendScale=0&zone=#{$('#zone').val()}&flowRate=#{flowrate}&flowType=0&hour=#{hr}&minute=#{minute}", (data) ->
    $('#animated').html("<img src='http://184.106.250.111#{data}' />")
    $('tr', '#location tbody').remove()
  )
