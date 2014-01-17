table = null
flowrate = 0

gotoDepthsReport = ->
  document.location = "ad-pd-eng.html?date=#{$('#date').val()}&" +
      "chainage=#{$('#chainage').val()}&" +
      "flowRate=#{$('#flowRate').val()}&" +
      "flowType=#{$('#flowType').val()}&" +
      "sounding=#{$('#sounding').val()}&" +
      "width=#{$('#width').val()}&" +
      "lane=#{$('#lane').val()}&" +
      "period=#{$('#period').val()}"

querystring = (key) ->
  re = new RegExp('(?:\\?|&)'+key+'=(.*?)(?=&|$)','gi')
  r = []
  m = []
  while ((m=re.exec(document.location.search)) != null)
    r.push(m[1])
  return r

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
  #$("input[name=fraser_river]")[$("#waterway").val()].checked = true

  $.getJSON("/api/depths/verify?date=#{$('#date').val()}&" +
      "chainage=#{$('#chainage').val()}&" +
      "flowRate=#{$('#flowRate').val()}&" +
      "flowType=1&" +
      "sounding=#{$('#sounding').val()}&" +
      "width=#{$('#width').val()}&" +
      "lane=1&" +
      "period=3", (data) ->
    table ||= $('#verify').dataTable(
        bPaginate: false
        bInfo: false
        bFilter: false
        bAutoWidth: false
        aaSorting: [])
    table.fnClearTable()

    $('#verify tbody tr').remove()
    points = new Array()
    $.each(data.items, ->
      table.fnAddData([
        this.location
        this.designGrade
        this.sounding
        this.width
        this.percent
        this.tidalAid
        this.depth.toFixed(2)])
    )
  )
)
