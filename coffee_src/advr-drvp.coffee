table = null
flowrate = 0

gotoDepthsReport = ->
  if($('html').attr('lang') == "fr")
     prev_page = "ad-pd-fra.html"
  else
     prev_page = "ad-pd-eng.html"

  document.location = prev_page+"?date=#{$('#date').val()}&" +
      "chainage=#{$('#chainage').val()}&" +
      "flowRate=#{$('#flowRate').val()}&" +
      "flowType=#{$('#flowType').val()}&" +
      "sounding=#{$('#sounding').val()}&" +
      "width=#{$('#width').val()}&" +
      "lane=#{$('#lane').val()}&" +
      "period=#{$('#period').val()}"

$(->
  $("#print_daily_depths").click(->
    window.print()
  )

  $(".depths").click( gotoDepthsReport)

  $("#date").val(querystring('date'))
  $("#chainage").val(querystring('chainage'))
  $("#flowRate").val(querystring('flowRate'))
  $("#flowType").val(querystring('flowType'))
  $("#sounding").val(querystring('sounding'))
  $("#width").val(querystring('width'))
  $("#lane").val(querystring('lane'))
  $("#period").val(querystring('period'))
  $("#period").val(parseInt($("#period").val().substring(0,2))/2+1)

  $("#date-display").text(moment($("#date").val()).format("MMMM D, YYYY"))
  $("#static-discharge").text($("#flowRate").val())

  $("#static-discharge-eval").text($("#flowType").val())

  if $('html').attr('lang') == 'fr'
	  flowType_txt = switch $("#flowType").val()
      when 'Predicted' then "prévu"
      when 'Actual' then "réel"
      when 'UserDefined' then "défini par l'utilisateur"
      when 'Selected' then "choisi"	
    $("#static-discharge-eval").text(flowType_txt)

  $("#static-time").text(querystring('period'))
  $(".static-chainage").text($("#chainage").val())
  $("#static-width").text($("#width").val())
  limit_text = switch
    when $("#lane").val() == '0' 
      if $("html").attr("lang") == "en"	then 'Inner Channel Limit'
      else 'Limite intérieure'
    when $("#lane").val() == '1'
      if $("html").attr("lang") == "en"	then 'Outer Channel Limit'
      else 'Limite extérieure'		
    else ''
  $('#static-limit').text(limit_text)

  $.getJSON("/api/depths/verify?date=#{$('#date').val()}&" +
      "chainage=#{$('#chainage').val()}&" +
      "flowRate=#{$('#flowRate').val()}&" +
      "flowType=1&" +
      "sounding=#{$('#sounding').val()}&" +
      "width=#{$('#width').val()}&" +
      "lane=#{parseInt($("#lane").val()) + 1}&" +
      "period=#{$('#period').val()}", (data) ->
    table ||= $('#verify').dataTable(
        bPaginate: false
        bInfo: false
        bFilter: false
        bAutoWidth: false
        aaSorting: [])
    table.fnClearTable()

    $('#verify tbody tr').remove()
    points = new Array()
    least_depth = 10000
    $.each(data.items, ->
      fixed_depth = this.depth.toFixed(1)
      if this.depth <= least_depth
        least_depth = parseFloat(fixed_depth)
        $('#verify td').find('.low_depth').removeClass('low_depth')
        depth = "<span class=\"low_depth\">#{fixed_depth}</span>"
      else
        depth = fixed_depth
      table.fnAddData([
        this.location
        this.designGrade
        this.sounding
        this.width
        this.percent
        this.tidalAid
        depth])
    )
    $('#verify td').find('.low_depth').closest('tr').addClass('least-depth')
  )
)
