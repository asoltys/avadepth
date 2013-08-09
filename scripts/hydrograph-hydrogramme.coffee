monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
dataset = []
totalPoints = 60
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
  grid:
    backgroundColor:
      colors: ["#fff", "#e4f4f4"]
  series:
    lines:
      show: true
      lineWidth: 1.2
    points:
      show:false
  colors: ['red', 'blue']
  xaxis:
    mode: "time",
    color: 'white'
    tickColor: 'white'
    axisLabel: "Date"
    axisLabelUseCanvas: true
    axisLabelFontSizePixels: 12
    axisLabelFontFamily: 'Verdana, Arial'
    axisLabelPadding: 10
  yaxis:
    axisLabel: "Hope Discharge (m3s)"
    axisLabelUseCanvas: true
    axisLabelFontSizePixels: 12
    axisLabelFontFamily: 'Verdana, Arial'
    axisLabelPadding: 6

$(->
  $('#date, #period').change(->
    data = []
    data2 = []
    data3 = []

    date = moment($(this).val())
    year = date.year()
    month = date.month()
    period = $('#period').val()

    $.getJSON("/api/hydrograph?year=#{year}&" +
        "month=#{month}&" +
        "period=#{period}&actual=false&" +
        "predicted=false",
      (results) ->
        # GetData()

        $.each(results, (i,v) ->
          year = v.year
          month = v.month

          $.each(v.minMax, (i,v) ->
            data.push([moment(v.day, "MMM").year(year).month(month).date(v.day)._d, v.minValue])
            data2.push([moment(v.day, "MMM").year(year).month(month).date(v.day)._d, v.maxValue])
          )
        )

        dataset = [
          {data: data2}
          {data: data}
          {data: data3}
        ]

        $.plot($("#flot-placeholder1"), dataset, options)
    )
  )


  $('#date').change(->
    $('#static-date').text($('#alt-date').val())
  )

  $('select#period').change(->
    $('#static-period').text($(this).val())
  )

  $('#date').change()
)
