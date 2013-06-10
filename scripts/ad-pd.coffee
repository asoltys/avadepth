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

  leadingZero = (num, axis) ->
    s = "0" + num
    s.substr(s.length-2)

  $.plot("#placeholder", [ d1 ], 
    xaxes: [color: 'black', tickColor: '#aaa', axisLabel: 'Pacific Standard Time (hrs)', tickSize: 2, tickFormatter: leadingZero],
    yaxes: [{ color: 'black', tickColor: '#aaa', position: 'left', axisLabel: 'Available Depth (m)' }]
  )

  $(".yaxislabel").css("color","black")

  $('input[name=discharge]').change(->
    flowrate = switch $(this).val()
      when 'Actual' then 0
      when 'Predicted' then $('#predicted_discharge').text() and $('#static-discharge').text($('#predicted_discharge').val())
      when 'Defined' then $('#defined_discharge').val() and $('#static-discharge').text($('#defined_discharge').val())
      when 'Selected' then $('#selected_discharge').val() and $('#static-discharge').text($('#selected_discharge').val())

    $('#flowRate').val(flowrate)
    $('#static-discharge-eval').text($(this).val())
  )
  
  $('#defined_discharge').change(->
    if ($('input[name="discharge"].checked').val() == "Defined")
      $('#static-discharge').text($('#defined_discharge').val())
  )
  
  $('#selected_discharge').change(->
    if ($('input[name="discharge"].checked').val() == "Selected")
      $('#static-discharge').text($('#selected_discharge').val())
  )
  
  $('input[name="condition"]').change(->
    $('#static-type').text($(this).next().text())
  )
  
  $('input[name="channel"]').change(->
    $('#static-limit').text($(this).next().text())
  )
  
  $('select#width').change(->
    $('#static-width').text($(this).val())
  )
  
  $('select#chainage').change(->
    $('#static-chainage').text($(this).val())
  )
  
  $('#date').change(->
    $.getJSON("/api/Flow/Get?date=#{$('#date').val()}", (data) ->
      $('#predicted_discharge').text(data)
      $('#static-discharge').text(data)
      $.getJSON("/api/depths/calculate?date=#{$('#date').val()}&chainage=#{$('#chainage').val()}&flowRate=#{$('#flowRate').val()}&flowType=0&width=#{$('#width').val()}&sounding=#{$('#sounding').val()}", 
        (data) ->
          $('#depths tbody tr').remove()
          $.each(data.items[0].items, ->
            $('#depths').append("<tr><td>#{this.period}</td><td>#{this.chainage}</td><td>#{this.depth}</td><td>#{this.location}</td>")
          )
          $('.zebra-striped tr:even').addClass('stripe')
      )
    )

    if (moment().diff($('#date').val()) > 0)
      $("#actual").attr('disabled', false)
    else
      $("#actual").attr('disabled', true)
      
    $('#static-date').text($('#alt-date').val())
    
  )
  $('#date').change()
)
