table = null
gotoKMGraph = ->
  document.location = "pwlk-nepk-#{$("#lang").val()}.html?date=#{$('#date').val()}&" +
      "km=#{$(this).text()}&" +
      "intervalMin=#{$('#interval').val()}&" +
      "flowRate=#{$('#flowRate').val()}&" +
      "flowType=#{$('#flowType').val()}&" +
      "waterway=#{$('#waterway').val()}&" +
      "displayType=#{$('input[name=report]:checked').val()}"

gotoTimeGraph = ->
  document.location = "pwlt-ptnd-#{$("#lang").val()}.html?date=#{$('#date').val()}&" +
      "time=#{$(this).text()}&" +
      "intervalMin=#{$('#interval').val()}&" +
      "flowRate=#{$('#flowRate').val()}&" +
      "flowType=#{$('#flowType').val()}&" +
      "waterway=#{$('#waterway').val()}&" +
      "displayType=#{$('input[name=report]:checked').val()}"
  
$(->
  $("#print_predicted_water_levels").click(->
    window.print()
  )

  $("#report_body").hide()

  if(querystring('date').length != 0)
    $("#date").val(querystring('date'))
    $("#waterway").val(querystring('waterway'))
    $("#interval").val(querystring('intervalMin'))
    river_section = switch $("#waterway").val()
      when "0" then "South Arm"
      when "1" then "North Arm"
      when "2" then "Main Arm"
    $("#fraser_river").val(river_section)
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

    if $('html').attr('lang') == 'fr'
	    flowRate_txt = switch $(this).val()
        when 'Predicted' then "prévu"
        when 'Actual' then "réel"
        when 'Defined' then "défini par l'utilisateur"
        when 'Selected' then "choisi"	
      $("#static-discharge-eval").text(flowRate_txt)
		
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
  
  $("select#fraser_river").change(->
    img_src = switch $(this).val()
      when "South Arm" then "pwl_southarm.png"
      when "North Arm" then "pwl_northarm.png"
      when "Main Arm"  then "pwl_mainarm.png"
    $("#fraser_river_map").attr("src","images/#{img_src}")
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
  $('.spinner').show()
  $("#report_body").hide()
  report_type = $('input[name=report]:checked').val()
  waterway = switch $('#fraser_river').val()
    when 'South Arm'
      $('#river-section').parent().attr('colspan', 21)
      0
    when 'North Arm'
      $('#river-section').parent().attr('colspan', 16)
      1
    when 'Main Arm'
      $('#river-section').parent().attr('colspan', 14)
      2

  switch $('#daily_depth input[name=report]:radio:checked').val()
    when "0"
      if $('html').attr('lang') == 'en'
        $('#river_discharge_report').text('Predicted Water Levels')
        $('#note-at-bottom').text('Water level is referenced to Chart Datum which is relative to Local Low Water. Click on a time or location to display a graph.')
      else
        $('#river_discharge_report').text("Niveaux d'eau prévus")
        $('#note-at-bottom').text("Le niveau d'eau est reporté dans le zéro des cartes, qui est relatif au niveau d'eau bas local. Cliquez sur une heure ou un emplacement pour afficher un graphique.")
    when "1"
      if $('html').attr('lang') == 'en'
        $('#river_discharge_report').text('Predicted Velocities')
        $('#note-at-bottom').text('Velocities are in metres per second. Negative values indicate a flow in an upstream direction as a result of tides.')
      else
        $('#river_discharge_report').text('Débit prévu')
        $('#note-at-bottom').text('Velocities are in metres per second. Negative values indicate a flow in an upstream direction as a result of tides.')
    else
      $('#river_discharge_report').text('')
			
		
  $('#static-arm').text($('#fraser_river').val())
	
  if $('html').attr('lang') == 'fr'
	  fraser_river_arm_txt = switch $('#fraser_river').val()
      when 'South Arm' then "Bras sud"
      when 'North Arm' then "Bras nord"
      when 'Main Arm' then "Bras principal"
    $('#static-arm').text(fraser_river_arm_txt)
	
	
  $('#waterway').val(waterway)
  $('#river-section').text($('#fraser_river').val())
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
    $('.spinner').hide()
  ).success(->
    $("#report_body").show()
  )
