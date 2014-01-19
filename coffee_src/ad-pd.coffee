table = null
flowrate = 0

querystring = (key) ->
  re = new RegExp('(?:\\?|&)'+key+'=(.*?)(?=&|$)','gi')
  r = []
  m = []
  while ((m=re.exec(document.location.search)) != null)
    r.push(m[1])
  return r

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
    update()

  $("#print_daily_depths").click(->
    window.print()
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
  
  $('body').on("change","#date", ->
    avadepth.util.getFlow({
      date:$(this).val(),
      selected:$("#selected_discharge"),
      predicted:$("#predicted_discharge"),
      actual:$("#actual_discharge")
    })
    $('input[name=discharge]').prop("checked",false)
  )

  $('#selected_discharge').change(->
    $('#selected_radio').prop('checked', true).change()
  )

  $('input[name=discharge]').change(->
  )
  
  #$("form#daily_depth").on("change","input, select",update)
  $("#submit").click(->
    if !$('input[name=discharge]').is(":checked")
      $("#error_message").show()
      $("#error_message").html("Place select one of the options for the field \"River Discharge @ Hope\"")
      $("#report_body").hide()
    else
      $("#error_message").hide()
      $("#report_body").show()
      update()
  )

  #update()
)

update = ->
  flow = avadepth.util.getSelectedFlow()
  $('#flowRate').val(flow.flowRate)
  if flow.flowType != 0
    $('#flowType').val(flow.flowType)
  else
    $('#flowType').val("Defined")
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
    $.each(data.items[0].items, ->
      table.fnAddData([
        "<a href='advr-drvp-eng.html?date=#{$('#date').val()}&" +
        "chainage=#{$('#chainage').val()}&" +
        "flowRate=#{$('#flowRate').val()}&" +
        "flowType=#{$('#flowType').val()}&" +
        "sounding=#{$('input[name=condition]:checked').val()}&" +
        "width=#{$('#width').val()}&" +
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
    $('#static-limit').text($('input[name="channel"]:checked').next().text())
    $('#static-discharge').text($('#flowRate').val())
    $('#static-discharge-eval').text($('#flowType').val())
  )

createGraph = (p) ->
  d1 =
    color: "red"
    lines: {lineWidth: 3}
    data: p

  leadingZero = (num, axis) ->
    s = "0" + num
    s.substr(s.length-4)

  $.plot("#placeholder", [ d1 ],
    xaxes:[
      color: 'black'
      tickColor: '#aaa'
      axisLabel: 'Pacific Standard Time (hrs)'
      tickSize: 200
      tickFormatter: leadingZero],
    yaxes: [
      color: 'black'
      tickColor: '#aaa'
      position: 'left'
      axisLabel: 'Available Depth (m)']
  )
