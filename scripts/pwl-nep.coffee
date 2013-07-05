$(->
  $('#date').change(->
    $.getJSON("/api/depths?date=#{$('#date').val()}", (data) ->
      $('#predicted_discharge').text(data.Predicted)
      $('#actual_discharge').text(data.Actual)

      $('#selected_discharge option').remove()
      $.each(data.Flowrates, ->
        $('#selected_discharge').append("<option>#{this.toString()}</option>")
      )

      $('#discharge').change()
    )
  )
      

  $('#date, #interval, #chainage, input[name=waterway], input[name=discharge]').change(->
    waterway = $('input:radio[name=waterway]:checked').val()
    $.getJSON("/api/waterlevel?date=#{$('#date').val()}&intervalMin=#{$('#interval').val()}&flowRate=2000&flowType=0&waterway=#{waterway}&displayType=0", (data) ->
      $('#water-levels thead tr:last th').remove()
      $('#water-levels tbody tr').remove()
      $('#location').text(data.title)

      $.each(data.locations, ->
        $('#water-levels thead tr:last').append("<th><a href='pwlk-nepk-eng.html?waterway=#{waterway}&km=#{this}'>#{this}</a></th>")
      )

      $.each(data.times, ->
        row = $("<tr><td><a href='pwlt-ptnd-eng.html?waterway=#{waterway}&time=#{this.predictTime}'>#{this.predictTime}</a></td></tr>")
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
    discharge = switch $(this).val()
      when 'actual' then $('#actual_discharge').text()
      when 'predicted' then $('#predicted_discharge').text()
      when 'defined' then $('#selected_discharge').val()
      when 'selected' then $('#defined_discharge').val()
      
    $('#static-discharge-eval').text(discharge)
    $('#flowRate').val(discharge)
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
