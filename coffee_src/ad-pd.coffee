table = null
flowrate = 0

$(->
  if(querystring('date').length != 0)
    $("#date").val(querystring('date'))
    $("#chainage").val(querystring('chainage'))
    $("#flowtype").val(querystring('flowType'))
    $("#sounding").val(querystring('sounding'))
    $("#width").val(querystring('width'))
    $("#period").val(querystring('period'))
    $("#flowRate").val(querystring('flowRate'))
    $("#flowType").val(querystring('flowType'))
    check = switch querystring('flowType')[0]
      when 'Predicted' then 0
      when 'Actual' then 1
      when 'Defined'
        $("#defined_discharge").val($('#flowRate').val())
        3
      when 'Selected' then 2
    $("input[name=discharge]")[check].checked = true
    if(querystring("lane")[0] == "0")
      $("#inner_channel").prop("checked","checked")
    else
      $("#outter_channel").prop("checked","checked")
    initialize()

    $("#report_body").show()

  $("#print_daily_depths").click(->
    window.print()
  )

  $(".yaxislabel").css("color","black")

  $('body').on("change","#date", ->
    avadepth.util.getFlow({
      date:$(this).val(),
      selected:$("#selected_discharge"),
      predicted:$("#predicted_discharge"),
      actual:$("#actual_discharge")
    })
  )

  $("#date").change()

  $('#selected_discharge').change(->
    $('#selected_radio').prop('checked', true).change()
  )
  
  $("#submit").click(->
    if !$('input[name=discharge]').is(":checked")
      $("#error_message").show()
      $("#error_message").html("Place select one of the options for the field \"River Discharge @ Hope\"")
      $("#report_body").hide()
    else
      $('.spinner').show()
      $("#error_message").hide()
      $("#report_body").show()
      update()
  )

)

process_report = (flag)->
  $("#date-display").text(moment($("#date").val()).format("MMMM D, YYYY"))
  channel = $('input[name="channel"]:checked').val()

  flow = avadepth.util.getSelectedFlow()
  $("#flowRate").val(flow.flowRate) if flag
  if flow.flowType != "0"
    $('#flowType').val(flow.flowType)
  else
    $('#flowType').val("UserDefined")
  $.getJSON("/api/depths/calculate?date=#{$('#date').val()}&" +
      "chainage=#{$('#chainage').val()}&" +
      "flowRate=#{$('#flowRate').val()}&" +
      "flowType=#{$('#flowType').val()}&" +
      "width=#{$('#width').val()}&" +
      "sounding=#{$('input[name=condition]:checked').val()}", (data) ->
    table ||= $('#depths').dataTable(
      bPaginate: false
      bInfo: false
      bAutoWidth: false
      bFilter: false)
    table.fnClearTable()

    $('#depths tbody tr').remove()
    points = new Array()
    $.each(data.items[channel].items, ->
      if $('html').attr('lang') == "en"
        detailLink = "<a href='advr-drvp-eng.html?date=#{$('#date').val()}&"
      else
        detailLink = "<a href='advr-drvp-fra.html?date=#{$('#date').val()}&"
      table.fnAddData([
        detailLink +
        "chainage=#{$('#chainage').val()}&" +
        "flowRate=#{$('#flowRate').val()}&" +
        "flowType=#{$('#flowType').val()}&" +
        "sounding=#{$('input[name=condition]:checked').val()}&" +
        "width=#{$('#width').val()}&" +
        "lane=#{channel}&" +
        "period=#{this.period}'>#{this.period}</a>"
        this.chainage
        this.depth
        this.location])
      points.push([this.period, this.depth])
    )

    createGraph(points)
    $('#static-width').text($('#width').val())
    $('#static-chainage').text($('#chainage').val())
    $('#static-type').text($('input[name="condition"]:checked').next().text())
    limit_text = switch
      when channel == '0'
        if $("#lang").val() == "eng"
          "Inner Channel Limit"
        else
          "Limite intérieure"
      when channel == '1'
        if $("#lang").val() == "eng"
          'Outer Channel Limit'
        else
          "Limite extérieure"
      else ''
    $('#static-limit').text(limit_text)
    $('#static-discharge').text($('#flowRate').val())
    $('#static-discharge-eval').text(translate_flow())
    $('.spinner').hide()
  )

initialize = ->
  process_report(0)

update = ->
  process_report(1)

createGraph = (p) ->
  d1 =
    color: "red"
    lines: {lineWidth: 3}
    data: p

  leadingZero = (num, axis) ->
    s = "0" + num
    s.substr(s.length-4)

  if $("#lang").val() == "eng"
    xLabel = "Pacific Standard Time (hrs)"
    yLabel = "Available Depth (m)"
  else
    xLabel = "Heure Normale du Pacifique (hrs)"
    yLabel = "Profondeurs disponibles (m)"
		
  $.plot("#depth_chart", [ d1 ],
    xaxes:[
      color: 'black'
      tickColor: '#aaa'
      axisLabel: xLabel
      tickSize: 200
      tickFormatter: leadingZero],
    yaxes: [
      color: 'black'
      tickColor: '#aaa'
      position: 'left'
      axisLabel: yLabel]
  )

