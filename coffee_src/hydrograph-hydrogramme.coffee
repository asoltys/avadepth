monthNames = [
  "Jan", "Feb", "Mar", "Apr"
  "May", "Jun", "Jul", "Aug"
  "Sep", "Oct", "Nov", "Dec"
]

dataset  = []
date_inc = 0

update = ->
  minimum    = []
  maximum    = []
  actual     = []
  predicted  = []

  date   = moment($('#date').val())
  year   = date.year()
  month  = date.month()
#Hack because api uses december as month one
  if month == 11
    month = -1
    year += 1
  period = $('#period').val()

  $.getJSON("/api/hydrograph?year=#{year}&" +
      "month=#{month + 2}&" +
      "period=#{period}&" +
      "actual=false&" +
      "predicted=true",
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
            discharge = [moment(v.date).year(year).month(month).date(day)._d, v.value]
            actual.push(discharge) unless discharge[1] == 0
          )

        if $("#predicted").prop("checked")
          $.each(v.predicted, (i,v) ->
            day = moment(v.date).day(1)._a[2]
            discharge = [moment(v.date).year(year).month(month).date(day)._d, v.value]
            predicted.push(discharge) unless discharge[1] == 0
          )
      )

      dataset = [
        {data: maximum, label: "Maximum"}
        {data: actual,  label: "Actual"}
        {data: minimum, label: "Minimum"}
        {data: predicted,  label: "Predicted"}
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

  $(document).ajaxStart(->
    $('#loading').show()
    $('#flot-placeholder1').html('')
  )

  $(document).ajaxSuccess(->
    $('#loading').hide()
  )


  update()
)
