table = null
gotoKMGraph = ->
  document.location = "pwlk-nepk-eng.html?date=#{$('#date').val()}&" +
      "km=#{$(this).text()}&" +
      "intervalMin=#{$('#interval').val()}&" +
      "flowRate=#{$('#flowRate').val()}&" +
      "flowType=#{$('#flowType').val()}&" +
      "waterway=#{$('#waterway').val()}&" +
      "displayType=#{$('input[name=report]:checked').val()}"

gotoTimeGraph = ->
  document.location = "pwlt-ptnd-eng.html?date=#{$('#date').val()}&" +
      "time=#{$(this).text()}&" +
      "intervalMin=#{$('#interval').val()}&" +
      "flowRate=#{$('#flowRate').val()}&" +
      "flowType=#{$('#flowType').val()}&" +
      "waterway=#{$('#waterway').val()}&" +
      "displayType=#{$('input[name=report]:checked').val()}"
  
querystring = (key) ->
  re = new RegExp('(?:\\?|&)'+key+'=(.*?)(?=&|$)','gi')
  r = []
  m = []
  while ((m=re.exec(document.location.search)) != null)
    r.push(m[1])
  return r

$(->
  $("#print_predicted_water_levels").click(->
    window.print()
  )

  if(querystring('date').length != 0)
    $("#date").val(querystring('date'))
    $("#waterway").val(querystring('waterway'))
    $("#interval").val(querystring('intervalMin'))
    $("input[name=fraser_river]")[$("#waterway").val()].checked = true
    $("#flowRate").val(querystring('flowRate'))
    $("#flowType").val(querystring('flowType'))
    check = switch querystring('flowType')[0]
      when '0' then 0
      when '1' then 1
      when '2'
        $("#defined_discharge").val($('#flowRate').val())
        3
      when '3' then 2
    $("input[name=discharge]")[check].checked = true
    $("input[name=report]")[querystring('displayType')].checked = true

    $("#km").text(querystring('km'))
    update()

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
      when 'Actual'    then $('#actual_discharge').text()
      when 'Predicted' then $('#predicted_discharge').text()
      when 'Defined'   then $('#defined_discharge').val()
      when 'Selected'  then $('#selected_discharge').val()
    $('#flowRate').val(flowrate)
    $('#static-discharge').text(flowrate)
    $('#static-discharge-eval').text($(this).val())

    flowtype = switch $(this).val()
      when 'Actual'    then 0
      when 'Predicted' then 1
      when 'Defined'   then 2
      when 'Selected'  then 3
    $('#flowType').val(flowtype)
  )

  $('#defined_discharge').change(->
    if ($('input[name=discharge]:checked').val() == "Defined")
      $('#flowRate').val($(this).val())
      $('#static-discharge').text($('#defined_discharge').val())
  )
  
  $('#selected_discharge').change(->
    if ($('input[name=discharge]:checked').val() == "Selected")
      $('#flowRate').val($(this).val())
      $('#static-discharge').text($('#selected_discharge').val())
  )
  
  $('input[name=channel]').change(->
    $('#static-limit').text($(this).next().text())
  )

  $('select#interval').change(->
    $('#static-interval').text($(this).val())
  )
  
  $('select#chainage').change(->
    $('#static-chainage').text($(this).val())
  )
  
  $("#submit").click(update)
)

update = ->
  report_type = $('input[name=report]:checked').val()
  waterway = switch $('input[name=fraser_river]:checked').val()
    when 'South Arm'
      $('#river-section').parent().attr('colspan', 21)
      0
    when 'North Arm'
      $('#river-section').parent().attr('colspan', 16)
      1
    when 'Main Arm'
      $('#river-section').parent().attr('colspan', 14)
      2

  $('#static-arm').text($('input[name=fraser_river]:checked').val())
  $('#waterway').val(waterway)
  $('#river-section').text($('input[name=fraser_river]:checked').val())
  $('#water-levels tbody').empty()
  $('#headerkm').empty()
  step = 2
  kmStart = switch $('#waterway').val()
    when '2'
      step = 4
      40
    else 0
  for i in [kmStart..$('#river-section').parent().attr('colspan')*step-step+kmStart] by step
    if report_type == "0"
      headerRow = $("<th><a href=\"javascript:void(0)\">#{i}</a></th>")
    else
      headerRow = $("<th>#{i}</th>")
    $('#headerkm').append(headerRow)
    if report_type == "0"
      headerRow.click(gotoKMGraph)
  $.getJSON("/api/waterlevel?date=#{$('#date').val()}&" +
      "intervalMin=#{$('#interval').val()}&" +
      "flowRate=#{$('#flowRate').val()}&" +
      "flowType=#{$('#flowType').val()}&" +
      "waterway=#{$('#waterway').val()}&" +
      "displayType=#{$('input[name=report]:checked').val()}", (data) ->
    $('#river-section').text(data.title)
    table ||= $('#water-levels').dataTable(
        bPaginate: false
        bInfo: false
        bFilter: false
        bAutoWidth: false
        aoColumns: [{"bSortable": false}, null])
    table.fnClearTable()
    count = 0
    $.each(data.times, ->
      if report_type == "0"
        row = $("<tr><td class='align-center'><a href=\"javascript:void(0)\">#{this.predictTime}</a></td></tr>")
      else
        row = $("<tr><td class='align-center'>#{this.predictTime}</td></tr>")
      if (count % 2)
        row.addClass("even")
      else
        row.addClass("odd")
      count++

      #Maybe I should create one large string and append once the each loop is finished
      #rather than calling append a bunch of times with is a heavy process
      $.each(this.waterLevels, ->
        row.append("<td>#{parseFloat(this).toFixed(1).replace('-',String.fromCharCode(8209))}</td>")
      )
      $('#water-levels tbody').append(row)
      if report_type == "0"
        $(row).find('a').click(gotoTimeGraph)
      $('.dataTables_empty').parent().html('')
    )
  )
