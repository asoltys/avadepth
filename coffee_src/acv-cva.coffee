images = []
flowrate = 0

preload = (img) ->
  $('<img/>')[0].src = "http://184.106.250.111#{img}"

$(->
  $('#date').change(->
    $.getJSON("/api/depths?date=#{$('#date').val()}", (data) ->
      $('#selected_discharge').empty()
      $.each(data.Flowrates, ->
        $('#selected_discharge').append("<option value='#{this}'>#{this}</option>")
      )
      $('#predicted_discharge').text(data.Predicted)
      $('#actual_discharge').text(data.Actual)

      if (data.Actual)
        $("#actual_radio").attr('disabled', false)
        $("#predicted_radio").attr('disabled', true)
        $('#actual_radio').prop('checked', true)
      else
        $("#actual_radio").attr('disabled', true)
        $("#predicted_radio").attr('disabled', false)
        $("#predicted_radio").prop('checked', true)

      $('input[name=discharge]:checked').change()
      $('#static-date').text($('#alt-date').val())
    )

    $('#static-date').text($('#alt-date').val())
  ).change()

  $('#selected_discharge').change(->
    $('#discharge_radio').prop('checked', true).change()
  )

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
    $("#from").change()
    $('#static-interval').text($(this).val())
  )
  
  $('select#from').change(->
    interval = parseFloat($("#interval").val())
    options = ""
    $('select#to').html('')
    for i in [parseFloat($(this).val()) + interval...24] by interval
      hour = Math.floor(i)
      hour = "0" + hour if hour < 10
      minute = i%1*60
      minute = "00" if minute == 0
      options += "<option value=\"#{i}\">#{hour}:#{minute}</option>"
    $('select#to').html(options)
    if $('#type').val() == "0"
      $('select#to').prop('disabled','disabled')
    $('#static-start').text($(this).val())
  )
  
  $('select#to').change(->
    $('#static-end').text($(this).val())
  )
  
  $('input[name="velocity_legend"]').change(->
    $('#static-legend').text($(this).next().text())
  )

  $('#type').change(->
    if $(this).val() != '0'
      $('#to').prop('disabled','')
    else
      $('#to').prop('disabled','disabled')
  )

  $("#submit").click(update)
  $('#replay').click(play)
)

update = ->
  $(this).prop('disabled','disabled')
  $('#loading').show()
  $('#animated, #animated_legend, #replay, #nodata').hide()

  hour = Math.floor(parseFloat($('#from').val()))
  minute = (parseFloat($('#from').val()) - hour) * 60
  base_minute = minute
  interval = parseFloat($("#interval").val())
  $('#frames_retrieved').html('0')
  $('#number_of_frames').html(($('#to').val()-$('#from').val())/interval+1)

  if $('#type').val() != '0'
    end_hour = Math.floor(parseFloat($('#to').val()))
    end_minute = (parseFloat($('#to').val()) - end_hour) * 60
    $('#frame_count').show()
  else
    end_hour = hour
    end_minute = minute
    $('#frame_count').hide()

  total = (end_hour - hour) * 4 + (end_minute - minute) / 15

  images = []
  do getImage = ->
    $.getJSON("/api/animated?date=#{$('#date').val()}&" +
        "legendScale=#{$('input[name=legend_scale]:checked').val()}&" +
        "zone=#{$('#zone').val()}&" +
        "flowRate=#{flowrate}&" +
        "flowType=0&" +
        "hour=#{hour}&" +
        "minute=#{minute}", (data) ->
      result = data.toString()
      images.push(result) unless result == '/images/'
      preload(images[images.length-1])
      $('#frames_retrieved').html(images.length)
    ).then(->
      if hour < end_hour || (hour == end_hour && minute <= end_minute)
        getImage()
        minute += interval*60
        if minute >= 60
          minute = base_minute
          #hour = Math.floor(parseFloat($("#interval"))*60)
          if interval <= 1
            hour += 1
          else
            hour += interval
      else
        play()
        $('#submit').prop('disabled','')
    )

play = ->
  $('#loading').hide()
  $('#animated').attr("src", "/images/nodata.jpg")
  $('#animated_legend').hide()
  $('#animated_legend').attr("src", "/images/vectorscale#{$('input[name=legend_scale]:checked').val()}.gif")
  $('#replay').prop('disabled','disabled')

  if images.length > 0
    $('#replay').show()
    i = 1
    handle = setInterval(->
      $('#animated').attr("src", "http://184.106.250.111#{images[i]}")
      $('#animated').on("load", ->
        $('#animated').show()
        $('#animated_legend').show()
      )
      i++
      if i >= images.length
        clearInterval(handle)
        $('#replay').prop('disabled','')
    , 1000)
  else
    $('#nodata').show()

  if $('#type').val() == '0'
    $('#replay').hide()
