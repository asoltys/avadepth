querystring = (key) ->
  re = new RegExp('(?:\\?|&)'+key+'=(.*?)(?=&|$)','gi')
  r = []
  m = []
  while ((m=re.exec(document.location.search)) != null) 
    r.push(m[1])
  return r

$(->
  $("#date").val(querystring('date'))
  $("#waterway").val(querystring('waterway'))
  $("#interval").val(querystring('intervalMin'))
  $("input[name=fraser_river]")[$("#waterway").val()].checked = true
  $("#flowRate").val(querystring('flowRate'))
  $("#flowType").val(querystring('flowType'))
  check = switch querystring('flowType')[0]
    when '0' then 0
    when '1' then 1
    when '2' 
      $("#defined_discharge").val($('#flowRate').val())
      3
    when '3' then 2
  $("input[name=discharge]")[check].checked = true
  $("input[name=report]")[querystring('displayType')].checked = true
  
  $("#km").text(querystring('km'))
  
  $('#date').change(->
    $.getJSON("/api/depths?date=#{$('#date').val()}", (data) ->
      $('#selected_discharge').empty()
      $.each(data.Flowrates, ->
        $('#selected_discharge').append("<option value='#{this}'>#{this}</option>")
      )
      $('#predicted_discharge').text(data.Predicted)
      $('#actual_discharge').text(data.Actual)
      if (data.Actual)
        $("#actual").attr('disabled', false)
        $("#predicted").attr('disabled', true)
        if ($('#predicted').is(':checked'))
          $('input[name=discharge]')[1].checked = true;
      else
        $("#actual").attr('disabled', true)
        $("#predicted").attr('disabled', false)
        if ($('#actual').is(':checked'))
          $('input[name=discharge]')[0].checked = true;
      $('input[name=discharge]:checked').trigger('change')
      $('#static-date').text($('#alt-date').val())
    )
  ).change()
  
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
      when 'South Arm' then 0
      when 'North Arm' then 1
      when 'Main Arm' then 2
    $('#waterway').val(waterway)
    $('#static-arm').text($(this).val())
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
  
  $('#date, input[name=discharge], input[name=fraser_river], input[name=report], #defined_discharge, #selected_discharge, #interval').change( ->
    index = querystring('km')
    index = switch $("#waterway").val()
      when '0' then index/2
      when '1' then index/2
      when '2' then (index-40)/4
    $.getJSON("/api/waterlevel?date=#{$('#date').val()}&intervalMin=#{$('#interval').val()}&flowRate=#{$('#flowRate').val()}&flowType=#{$('#flowType').val()}&waterway=#{$('#waterway').val()}&displayType=#{$('input[name=report]:checked').val()}", (data) ->
      points = new Array()
      $.each(data.times, ->
        if (this.predictTime != '24:00')
          date = new Date("January 1, 2000 #{this.predictTime}")
        else
          date = new Date("January 2, 2000 00:00")
        points.push([date.getTime(), this.waterLevels[index]])
      )
      $.plot("#placeholder", [ points ],
        xaxes: [ color: 'black', tickColor: '#ddd', mode: 'time', tickSize: [ 4, "hour" ], timezone: "browser", axisLabel: 'Pacific Standard Time (date)' ],
        yaxes: [ color: 'black', tickColor: '#ddd', position: 'left', axisLabel: 'Hope Discharge (m3s)' ]
      )
    )
  )
)
