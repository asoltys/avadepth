$(->
  $('#date').change(->
    if (moment().diff($('#date').val()) > 0)
      $("#actual").attr('disabled', false)
    else
      $("#actual").attr('disabled', true)
      
    $('#static-date').text($('#alt-date').val())
  )

  $('#compliance').change(->
    $('#cmp_box').val(0)
    if ($('#compliance').is(':checked'))
      $('input[name="cmp_box"]').attr('disabled', false)
    else
      $('input[name="cmp_box"]').attr('disabled', true)
      $('input[name=cmp_box]').change(->
        $('#cmp_box').val()
      )
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
  )

  $('input[name=discharge]').change(->
    flowtype = switch $(this).val()
      when 'Actual' then 0
      when 'Predicted' then 1
      when 'Defined' then 2
      when 'Selected' then 3
    $('#flowType').val(flowtype)
  )
  
  $('#defined_discharge').change(->
    if ($('input[name="discharge"].checked').val() == "Defined")
      $('#static-discharge').text($('#defined_discharge').val())
  )
  
  $('#selected_discharge').change(->
    if ($('input[name="discharge"].checked').val() == "Selected")
      $('#static-discharge').text($('#selected_discharge').val())
  )
  
  $('input[name="channel"]').change(->
    $('#static-channel').text($(this).next().text())
  )

  $('input[name="sounding"]').change(->
    $('#static-sounding').text($(this).next().text())
  )
  
  $('select#width').change(->
    $('#static-width').text($(this).val())
  )
  
  $('select#chainage').change(->
    $('#static-chainage').text($(this).val())
  )
  
  $.getJSON("api/depths?date=#{$('#date').val()}", display)

  $('#date, input[name=discharge], #defined_discharge, #selected_discharge, #chainage, input[name="sounding"], input[name="channel"], #width, #period, #window, #compliance, #cmp_box').change(->
    $.getJSON("api/depths?date=#{$('#date').val()}", display)
  )
)

display = (data) ->
  $('#selected_discharge option').remove()
  for flow in data.Flowrates
    $('#selected_discharge').append("<option value=#{flow}>#{flow}</option>")
  $('#predicted_discharge').text(data.Predicted)
  $('#actual_discharge').text(data.Actual)
  $('#static-discharge').text(data)
  
  $.getJSON("api/transit?date=#{$('#date').val()}&lane=#{$('input[name=channel]:checked').val()}&window=#{$('#window').val()}&cmp=#{$('#cmp_box').val()}&flowType=#{$('#flowType').val()}&periodType=#{$('#period').val()}&chainage=#{$('#chainage').val()}&flowRate=#{$('#flowRate').val()}&width=#{$('#width').val()}&sounding=#{$('input[name=sounding]:checked').val()}", (data2) ->
    $('#transit-window tbody tr').remove()
    $('#num_days').text(data2.statistics.numberOfDays)
    $('#min_depth').text(data2.statistics.minimumDepth)
    $('#max_depth').text(data2.statistics.maximumDepth)
    $('#avg_depth').text(data2.statistics.totalWindow)
    for item in data2.items
      $('#transit-window tbody').append("<tr><td>#{item.startTime}</td><td>#{item.windowStart}</td><td>#{item.endTime}</td><td>#{item.windowEnd}</td><td>#{item.depth}</td></tr>")
    $('#transit-window').dataTable()
  )


