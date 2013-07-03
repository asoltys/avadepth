data = []
data2 = []
monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
dataset = []
totalPoints = 60
updateInterval = 500
now = new Date()
now2 = new Date()
date_inc = 0

GetData = () ->
  data.shift()

  while (data.length < totalPoints)
    y = Math.random() * 1000 + 1250
    temp = [new Date(now), y]
    now.setDate(now.getDate()+1)

    data.push(temp)

  data2.shift()

  while (data2.length < totalPoints)
    y = Math.random() * 800 + 500
    temp = [new Date(now2), y]
    now2.setDate(now2.getDate()+1)

    data2.push(temp)

options =
  series:
    lines:
      show: true
      lineWidth: 1.2
      fill: true
    stack: true
    points:
      show:false
  xaxis:
    mode: "time",
    tickSize: [1, "day"]
    minTickSize: [2, "month"]
    tickFormatter: (v, axis) ->
      date = new Date(v)

      if (date.getDate() % 10 == 0)
        monthNames[date.getMonth()] + " " + date.getDate()
      else
        ""
    axisLabel: "Date"
    axisLabelUseCanvas: true
    axisLabelFontSizePixels: 12
    axisLabelFontFamily: 'Verdana, Arial'
    axisLabelPadding: 10
  yaxis:
    min: 0
    max: 3170
    tickSize: 5
    tickFormatter: (v, axis) ->
        if v % 500 == 0 then v else ""
    axisLabel: "Hope Discharge (m3s)"
    axisLabelUseCanvas: true
    axisLabelFontSizePixels: 12
    axisLabelFontFamily: 'Verdana, Arial'
    axisLabelPadding: 6

$(->
  GetData()

  dataset = [
    {data: data2}
    {data: data}
  ]

  $.plot($("#flot-placeholder1"), dataset, options)

  update = () ->
    GetData()

    $.plot($("#flot-placeholder1"), dataset, options)
    setTimeout(update, updateInterval)

  update()


  $('#date').change(->
    $('#static-date').text($('#alt-date').val())
  )

  $('select#period').change(->
    $('#static-period').text($(this).val())
  )

  $('#date').change()
)
