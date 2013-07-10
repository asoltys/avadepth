$(->
  table = null

  createGraph = (p) -> (
    d1 = 
      color: "red"
      lines: {lineWidth: 3}
      data: p

    leadingZero = (num, axis) ->
      s = "0" + num
      s.substr(s.length-4)

    $.plot("#placeholder", [ d1 ], 
      xaxes: [color: 'black', tickColor: '#aaa', axisLabel: 'Pacific Standard Time (hrs)', tickSize: 200, tickFormatter: leadingZero],
      yaxes: [{ color: 'black', tickColor: '#aaa', position: 'left', axisLabel: 'Available Depth (m)' }]
    )
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
  
  $('#date, #width, #chainage').change(->
    $.getJSON("/api/Flow/Get?date=#{$('#date').val()}", (data) ->
      $('#predicted_discharge').text(data)
      $('#static-discharge').text(data)
      $.getJSON("/api/depths/calculate?date=#{$('#date').val()}&chainage=#{$('#chainage').val()}&flowRate=#{$('#flowRate').val()}&flowType=0&width=#{$('#width').val()}&sounding=#{$('#sounding').val()}", 
        (data) ->
          table ||= $('#depths').dataTable(bPaginate: false, bInfo: false, bFilter: false)
          table.fnClearTable()

          $('#depths tbody tr').remove()
          points = new Array()
          $.each(data.items[0].items, ->
            table.fnAddData([
              "<a href='advr-drvp-eng.html?lane=xxx&amp;period=#{this.period}'>#{this.period}</a>", 
              this.chainage, 
              this.depth, 
              this.location])
            points.push([this.period, this.depth])
          )

          table.fnAdjustColumnSizing()
          createGraph(points)

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
