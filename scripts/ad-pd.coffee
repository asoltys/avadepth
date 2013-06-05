$(->
  points = [
    [0, 10.6]
    [2, 11.1]
    [4, 11.85]
    [6, 12.2]
    [8, 11.3]
    [10, 10.0]
    [12, 9.4]
    [14, 9.4]
    [16, 10.5]
    [18, 11.75]
    [20, 12.1]
    [22, 11.6]
  ]

  d1 = 
    color: "red"
    lines: {lineWidth: 3}
    data: points

  $.plot("#placeholder", [ d1 ], 
    xaxes: [{ axisLabel: 'Pacific Standard Time (hrs)' }],
    yaxes: [{ position: 'left', axisLabel: 'Available Depth (m)' }]
  )

  $(".yaxislabel").css("color","black")

  $('input[name=discharge]').change(->
    flowrate = switch $(this).val()
      when 'actual' then 0
      when 'predicted' then $('#predicted_discharge').text()
      when 'defined' then $('#defined_discharge').val()
      when 'selected' then $('#selected_discharge').val()

    $('#flowRate').val(flowrate)
  )

  $('#date').datepicker('option', 'dateFormat', 'yy-mm-dd')
  $('#date').val(moment().format('YYYY-MM-DD'))
  $('#date').change(->
    $.getJSON("/api/Flow/Get?date=#{$('#date').val()}", (data) ->
      $('#predicted_discharge').text(data)
      $.getJSON("/api/depths/calculate?date=#{$('#date').val()}&chainage=#{$('#chainage').val()}&flowRate=#{$('#flowRate').val()}&flowType=0&width=#{$('#width').val()}&sounding=#{$('#sounding').val()}", 
        (data) ->
          $('#depths tbody tr').remove()
          $.each(data.items[0].items, ->
            $('#depths').append("<tr><td>#{this.period}</td><td>#{this.chainage}</td><td>#{this.depth}</td><td>#{this.location}</td>")
          )
      )
    )

    selectedDate = $('#date').datepicker("getDate")
    selectedDate.setHours(23)
    today = new Date()
    today.setHours(0)
    if (selectedDate < today)
      $("#actual").attr('disabled', false)
      $("#predicted").attr('disabled', true)
    else
      $("#actual").attr('disabled', true)
      $("#predicted").attr('disabled', false)
  )
  $('#date').change()

  $('.zebra-striped tr:even').addClass('stripe')
)
