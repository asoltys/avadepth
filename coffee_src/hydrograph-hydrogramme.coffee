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

#Hack because Alfred's API uses december as month one
  year = parseInt($("#year").val())
  month = 12
  month = $("#month").val()-1 unless $("#month").val() == 1
  if $("#month").val() == "1"
    year += 1

  period_end = moment([year, month, 1]).add('months',$("#period option:selected").html().split(" ")[0]).subtract('month',1)
  $('#static-month').text($('#month option:selected').html())
  $('#static-year').text($('#year').val())
  $("#static-period").text(period_end.format("MMMM YYYY"))
  $.getJSON("/api/hydrograph?year=#{year}&" +
      "month=#{$('#month').val()}&" +
      "period=#{$('#period').val()}&" +
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
        {data: maximum, label: "Max Range"}
        {data: actual,  label: "Actual"}
        {data: minimum, label: "Min Range"}
        {data: predicted,  label: "Predicted"}
      ]

      $.plot($("#hydrograph_chart"), dataset, options)
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
  legend:
    container: "#legend_container"
    noColumns: 0
    labelBoxBorderColor: "none"

$(->
  $("#print_hydrograph").click(->
    window.print()
  )

  current_year = new Date().getFullYear()
  s = "<option selected=\"selected\">#{current_year}</option>"
  for year in [current_year-1..1994] by -1
    s += "<option>#{year}</option>"
  $("#year").html(s)

  $('#submit').click(update)

  $(document).ajaxStart(->
    $('#loading').show()
    $('#hydrograph_chart').html('')
  )

  $(document).ajaxSuccess(->
    $('#loading').hide()
  )

  update()
)
