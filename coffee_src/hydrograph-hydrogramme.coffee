monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
dataset = []
now = new Date()
now2 = new Date()
date_inc = 0

update = ->
  minimum = []
  maximum = []
  actual = []

  date = moment($('#date').val())
  year = date.year()
  month = date.month()
  period = $('#period').val()

  $.getJSON("/api/hydrograph?year=#{year}&" +
      "month=#{month + 2}&" +
      "period=#{period}&" +
      "actual=false&" +
      "predicted=false",
    (results) ->
      $.each(results, (i,v) ->
        year = v.year
        month = v.month - 1

        $.each(v.minMax, (i,v) ->
          minimum.push([moment(v.day + 1, "MMM").year(year).month(month).date(v.day + 1)._d, v.minValue])
          maximum.push([moment(v.day + 1, "MMM").year(year).month(month).date(v.day + 1)._d, v.maxValue])
        )
        if $("#actual").prop("checked")
          $.each(v.actual, (i,v) ->
            day = moment(v.date).day(1)._a[2]
            actual.push([moment(v.date).year(year).month(month).date(day)._d, v.value])
          )
      )

      dataset = [
        {data: maximum, label: "Maximum"}
        {data: actual, label: "Actual"}
        {data: minimum, label: "Minimum"}
      ]

      $.plot($("#flot-placeholder1"), dataset, options)
  )

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
  $("#print_hydrograph").click(->
    window.print()
  )

  now = new Date()
  $('#date').val("#{now.getFullYear()}-01-01")

  $('#submit').click(update)

  $('#date').change(->
    $('#static-date').text($('#date').val())
  )

  $('select#period').change(->
    $('#static-period').text($(this).val())
  )

  $('#date').change()

  update()
)
