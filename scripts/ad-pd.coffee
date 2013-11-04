table = null
flowrate = 0

$(->
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
    console.log($(this).val())
    avadepth.util.getFlow({
      date:$(this).val(),
      selected:$("#selected_discharge"),
      predicted:$("#predicted_discharge"),
      actual:$("#actual_discharge")
    })
  ).change()

  $('#selected_discharge').change(->
    $('#selected_radio').prop('checked', true).change()
  )

  $('input[name=discharge]').change(->
    flow = avadepth.util.getSelectedFlow()
    $('#flowRate').val(flow.flowRate)
    console.log($('#flowRate').val())
    $('#static-discharge').text(flow.flowRate)
    $('#static-discharge-eval').text($(this).val())
    $('#flowType').val(flow.flowType)
  )
  
  $("form#daily_depth").on("change","input, select",update)

  update()
)

update = ->
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
        "<a href='advr-drvp-eng.html?lane=xxx&amp;period=#{this.period}'>#{this.period}</a>"
        this.chainage
        this.depth
        this.location])
      points.push([this.period, this.depth])
    )

    createGraph(points)
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

