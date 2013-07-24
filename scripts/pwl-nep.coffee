gotoKMGraph = ->
  document.location = "pwlk-nepk-eng.html?date=#{$('#date').val()}&km=#{$(this).text()}&intervalMin=#{$('#interval').val()}&flowRate=#{$('#flowRate').val()}&flowType=#{$('#flowType').val()}&waterway=#{$('#waterway').val()}&displayType=#{$('input[name=report]:checked').val()}"

gotoTimeGraph = ->
  document.location = "pwlt-ptnd-eng.html?date=#{$('#date').val()}&time=#{$(this).text()}&intervalMin=#{$('#interval').val()}&flowRate=#{$('#flowRate').val()}&flowType=#{$('#flowType').val()}&waterway=#{$('#waterway').val()}&displayType=#{$('input[name=report]:checked').val()}"
  
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
  )
  
  $('input[name=fraser_river]').change(->
    waterway = switch $(this).val()
      when 'South Arm'
        $('#river-section').parent().attr('colspan', 21)
        0
      when 'North Arm'
        $('#river-section').parent().attr('colspan', 16)
        1
      when 'Main Arm'
        $('#river-section').parent().attr('colspan', 14)
        2
    $('#waterway').val(waterway)
    $('#river-section').text($(this).val())
  )
  $('input[name=fraser_river]:checked').change()
  
  $('#defined_discharge').change(->
    if ($('input[name=discharge]:checked').val() == "Defined")
      $('#flowRate').val($(this).val())
      $('#static-discharge').text($('#defined_discharge').val())
  )
  
  $('#selected_discharge').change(->
    if ($('input[name=discharge]:checked').val() == "Selected")
      $('#flowRate').val($(this).val())
      $('#static-discharge').text($('#selected_discharge').val())
  )
  
  $('input[name=fraser_river]').change(->
    $('#static-arm').text($(this).val())
  )
  
  $('input[name=channel]').change(->
    $('#static-limit').text($(this).next().text())
  )

  $('select#interval').change(->
    $('#static-interval').text($(this).val())
  )
  
  $('select#chainage').change(->
    $('#static-chainage').text($(this).val())
  )
  
  $('#date, input[name=discharge], input[name=fraser_river], input[name=report], #defined_discharge, #selected_discharge, #interval').change( ->
    $('#water-levels tbody').empty()
    $('#headerkm').empty()
    $('#location').text(data.title)
    step = 2
    kmStart = switch $('#waterway').val()
      when '2'
        step = 4
        40
      else 0
    for i in [kmStart..$('#river-section').parent().attr('colspan')*step-step+kmStart] by step
      headerRow = $("<th><a href=\"javascript:void(0)\">#{i}</a></th>")
      $('#headerkm').append(headerRow)
      headerRow.click(gotoKMGraph)
    $.getJSON("/api/waterlevel?date=#{$('#date').val()}&intervalMin=#{$('#interval').val()}&flowRate=#{$('#flowRate').val()}&flowType=#{$('#flowType').val()}&waterway=#{$('#waterway').val()}&displayType=#{$('input[name=report]:checked').val()}", (data) ->
      $.each(data.times, ->
        row = $("<tr><td><a href=\"javascript:void(0)\">#{this.predictTime}</a></td></tr>")
        $.each(this.waterLevels, ->
          row.append("<td>#{parseFloat(this).toFixed(1)}</td>")
        )
        $('#water-levels tbody').append(row)
        $(row).find('a').click(gotoTimeGraph)
      )
    )
  )
)
