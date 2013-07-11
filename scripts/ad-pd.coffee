$(->
  table = null
  flowrate = 0

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
    $.getJSON("/api/depths?date=#{$('#date').val()}", (data) ->
      $('#selected_discharge').empty()
      $.each(data.Flowrates, ->
        $('#selected_discharge').append("<option value='#{this}'>#{this}</option>")
      )
      $('#predicted_discharge').text(data.Predicted)
      $('#actual_discharge').text(data.Actual)
      if (data.Actual)
        $("#actual").attr('disabled', false)
        $("#predicted").attr('disabled', true)
        if ($('#predicted').is(':checked'))
          $('input[name=discharge]')[1].checked = true;
      else
        $("#actual").attr('disabled', true)
        $("#predicted").attr('disabled', false)
        if ($('#actual').is(':checked'))
          $('input[name=discharge]')[0].checked = true;
      $('input[name=discharge]:checked').trigger('change')
      $('#static-date').text($('#alt-date').val())
    )
  ).change()

  $('input[name=discharge]').change(->
    flowrate = switch $(this).val()
      when 'Actual' then $('#actual_discharge').text()
      when 'Predicted' then $('#predicted_discharge').text()
      when 'Defined' then $('#defined_discharge').val()
      when 'Selected' then $('#selected_discharge').val()
    $('#flowRate').val(flowrate)
    $('#static-discharge').text(flowrate)
    $('#static-discharge-eval').text($(this).val())

    flowtype = switch $(this).val()
      when 'Actual' then 0
      when 'Predicted' then 1
      when 'Defined' then 2
      when 'Selected' then 3
    $('#flowType').val(flowtype)
  )
  
  $('#date, #width, #chainage, input[name=discharge], input[name=condition], input[name=channel]').change(->
    $.getJSON("/api/Flow/Get?date=#{$('#date').val()}", (data) ->
      $.getJSON("/api/depths/calculate?date=#{$('#date').val()}&chainage=#{$('#chainage').val()}&flowRate=#{$('#flowRate').val()}&flowType=#{$('input[name=channel]:checked').val()}&width=#{$('#width').val()}&sounding=#{$('input[name=condition]:checked').val()}", 
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
          $('#depths td:nth-child(3)').css('text-align', 'center')

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
