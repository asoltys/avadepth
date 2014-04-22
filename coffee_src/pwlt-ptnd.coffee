gotoPWL = ->
  if($('html').attr('lang') == "fr")
     prev_page = "pwl-nep-fra.html"
  else
     prev_page = "pwl-nep-eng.html"

  document.location = prev_page + "?date=#{$('#date').val()}&" +
      "km=#{$("#km").text()}&" +
      "intervalMin=#{$('#intervalMin').val()}&" +
      "flowRate=#{$('#flowRate').val()}&" +
      "flowType=#{$('#flowType').val()}&" +
      "waterway=#{$('#waterway').val()}&" +
      "displayType=0"

$(->
  $("#date").val(querystring('date'))
  $("#waterway").val(querystring('waterway'))
  $("#flowRate").val(querystring('flowRate'))
  $("#flowType").val(querystring('flowType'))
  $("#intervalMin").val(querystring('intervalMin'))
  $("#time").text(querystring('time'))
  
  $("#pwl").click( gotoPWL)

  step = switch $("#waterway").val()
    when '0' then 2
    when '1' then 2
    when '2' then 4
  $.getJSON("/api/waterlevel?date=#{$('#date').val()}&" +
      "intervalMin=#{querystring('intervalMin')}&" +
      "flowRate=#{$('#flowRate').val()}&" +
      "flowType=#{$('#flowType').val()}&" +
      "waterway=#{$('#waterway').val()}&" +
      "displayType=0", (data) ->
    points = new Array()
    $.each(data.times, ->
      if (this.predictTime == querystring('time')[0])
        start = 0
        if (step == 4)
          start = 40
        $.each(this.waterLevels, (i) ->
          points.push([i*step+start, this])
        )
    )
    $.plot("#placeholder",
        [ points ],
        xaxes: [
          color: 'black'
          tickColor: '#ddd'
          tickSize: step
          axisLabel: 'Location (km)' ],
        yaxes: [
          color: 'black'
          tickColor: '#ddd'
          position: 'left'
          axisLabel: 'Water Level (metres) relative to LWD' ]
    )
  )
)
