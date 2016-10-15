gotoPWL = ->
  if($('html').attr('lang') == "fr")
     prev_page = "pwl-nep-fra.html"
  else
     prev_page = "pwl-nep-eng.html"

  document.location = prev_page+"?date=#{$('#date').val()}&" +
      "km=#{$("#km").text()}&" +
      "intervalMin=#{$('#interval').val()}&" +
      "flowRate=#{$('#flowRate').val()}&" +
      "flowType=#{$('#flowType').val()}&" +
      "waterway=#{$('#waterway').val()}&" +
      "displayType=0"

$(->
  $("#date").val(querystring('date'))
  $("#waterway").val(querystring('waterway'))
  $("#interval").val(querystring('intervalMin'))
  $("#flowRate").val(querystring('flowRate'))
  $("#flowType").val(querystring('flowType'))
  $("#km").text(querystring('km'))

  $("#pwl").click( gotoPWL)
  
  index = querystring('km')
  index = switch $("#waterway").val()
    when '0' then index/2
    when '1' then index/2
    when '2' then (index-40)/4
  $.getJSON("/api/waterlevel?date=#{$('#date').val()}&" +
      "intervalMin=#{$('#interval').val()}&" +
      "flowRate=#{$('#flowRate').val()}&" +
      "flowType=#{$('#flowType').val()}&" +
      "waterway=#{$('#waterway').val()}&" +
      "displayType=0", (data) ->
    points = new Array()
    $.each(data.times, ->
      if (this.predictTime != '24:00')
        date = new Date("January 1, 2000 #{this.predictTime}")
      else
        date = new Date("January 2, 2000 00:00")
      points.push([date.getTime(), this.waterLevels[index]])
    )
    $.plot("#placeholder",
        [ points ],
        xaxes: [
          color: 'black'
          tickColor: '#ddd'
          mode: 'time'
          tickSize: [ 4, "hour" ]
          timezone: "browser"
          axisLabel: 'Pacific Standard Time (PST)' ],
        yaxes: [
          color: 'black'
          tickColor: '#ddd'
          position: 'left'
          axisLabel: 'Water Level (metres) relative to LWD' ]
    )
  )
)
