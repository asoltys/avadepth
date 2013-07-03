$(->

  s = ''
  s += '<option value=' + i + '>' + i + '</option>' for i in [6..36]
  $('#chainage').append(s)

  $('#date').change(->
    $.getJSON('/api/depths?date=' + $(this).val(), (data) ->
      $('#flows option').remove()
      s = ''
      $.each(data.Flowrates, (idx, itm) ->
        s += '<option value=' + itm + '>' + itm + '</option>'
      )

      $('#flows').append(s)
      $('#flowPred').text(data.Predicted)
      $('#flowAct').text(data.Actual)
    )

    $('#static-date').text($('#alt-date').val())
  )
  
  $('input[name="discharge"]').change(->
    switch $(this).val()
      when 'Actual' then 0
      when 'Predicted' then 0
      when 'Defined' then $('#static-discharge').text($('#defined_discharge').val())
      when 'Selected' then $('#static-discharge').text($('#selected_discharge').val())
      
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
  
  $('select#zone').change(->
    $('#static-zone').text($(this).val())
  )

  $('select#interval').change(->
    $('#static-interval').text($(this).val())
  )
  
  $('select#from').change(->
    $('#static-start').text($(this).val())
  )
  
  $('select#to').change(->
    $('#static-end').text($(this).val())
  )
  
  $('input[name="velocity_legend"]').change(->
    $('#static-legend').text($(this).next().text())
  )

  $('#display').click(->
    switch $("input:radio[name=discharge]:checked").val()
      when '0' then flow = $('#flowPred').text()
      when '1' then flow = $('#flowAct').text()
      when '2' then
      when '3' then flow = $('#flows').val()

    hr = Math.floor(parseFloat($('#ddFrom').val()))
    minute = (parseFloat($('#ddFrom').val()) - hr) * 60
    $.getJSON('/api/animated?date=' + $('#date').val() +
    '&legendScale=0' +
    '&zone=' + $('#ddZone').val() +
    '&flowRate=' + flow + '&flowType=0' +
    '&hour=' + hr +
    '&minute=' + minute, (data) ->
      $('#animated').html(data)
      $('tr', '#location tbody').remove()
    )
  )
  
  $('#date').change()
)
