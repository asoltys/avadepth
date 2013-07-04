$(->
  $('#date').change(->

    $.getJSON("/api/waterlevel?date=#{$('#date').val()}&intervalMin=60&flowRate=5417&flowType=0&waterway=0&displayType=0", (data) ->
      $('#water-levels tbody tr').remove()
      $.each(data.times, ->
        row = $("<tr><td><a href='pwlt-ptnd-eng.html?time=#{this.predictTime}'>#{this.predictTime}</a></td></tr>")
        $.each(this.waterLevels, ->
          row.append("<td>#{parseInt(this).toFixed(1)}</td>")
        )
        $('#water-levels tbody').append(row)
      )
    )

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
  
  $('input[name="discharge"]').change(->
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
  
  $('input[name="fraser_river"]').change(->
    $('#static-arm').text($(this).val())
  )
  
  $('input[name="channel"]').change(->
    $('#static-limit').text($(this).next().text())
  )

  $('select#interval').change(->
    $('#static-interval').text($(this).val())
  )
  
  $('select#chainage').change(->
    $('#static-chainage').text($(this).val())
  )
  
  $('#date').change()
)
