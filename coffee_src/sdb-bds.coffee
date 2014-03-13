
locations =
  'BR':
    'Main': ['Marina', 'Channel']
    'Secondary': []
    'Other': []

  'CR':
    'Main': ['Channel']
    'Secondary': []
    'Other': []

  'FRMA':
    'Main': [
      'Channel km35to61',
      'Channel km60to85',
      'Annieville Channel',
      'Queens Reach',
      'Douglas Island',
      'Bishops Reach',
      'Derby Reach',
      'Russel Reach',
      'Langley Bar',
      'Plumper Reach',
      'Matsqui Island',
      'Gravel Reach'
    ]

    'Secondary': [
      'Sapperton Channel',
      'Essondale Channel',
      'Douglas Island North',
      'Parsons Channel',
      'Bedford Channel',
      'Enterprise Channel'
    ]


  'FRSA':
      'Main': [
        'Channel',
        'Sand Heads Entrance',
        'Sand Heads Reach',
        'Steveston Bend',
        'Steveston Cut',
        'Woodward Reach',
        'Gravesend Reach',
        'City Reach',
        'Annieville Channel',
        'Shoal Point - New  West'
      ]
      'Secondary': [
        'Ladner_SeaReach',
        'Cannery Channel',
        'Sea Reach',
        'Canoe Pass',
        'Ladner Reach',
        'Ladner Harbour',
        'Deas Slough',
        'Burr Landing Channel',
        'Gundersen Slough',
        'Annacis Channel',
        'Roberts Bank'
      ]
      'Other': []

  'FRNA':
      'Main': [
        'Channel',
        'Point Grey',
        'Iona',
        'Musqueam',
        'Sea Island',
        'Marpole Basin',
        'Mitchell Island',
        'Mac-Blo',
        'Byrne Road',
        'Big Bend - Queens',
        'Poplar Island',
        'Morey Channel',
        'Swishwash Island South'
      ]
      'Secondary': [
        'Cowards Cove',
        'Point Grey Scow Moorage',
        'MacDonald Slough',
        'Deering Channel',
        'Mitchell Island North',
        'Tree Island'
      ]
      'Other': []

  'FRUR':
      'Main': [
        'Big Eddy',
        'Cattermole',
        'Chilliwack Rock',
        'Carey Point',
        'CPR Tunnels',
        'Cheam View'
      ]
      'Secondary': []
      'Other': []

  'PR':
      'Main': [
        'Channel',
        'Chatham Reach',
        'Fox Reach',
        'Grant Channel'
      ]
      'Secondary': []
      'Other': []

  'SQ':
      'Main': ['Mamquam Blind Channel']
      'Secondary': []
      'Other': []

  'VFPA':
      'Main': []
      'Secondary': []
      'Other': []

  'FPORT':
      'Main': []
      'Secondary': []
      'Other': []

$('#waterway, #channel').change(->
  $('#location option').remove()
  $('#location').append('<option></option>')
  $.each(locations[$('#waterway').val()][$('#channel').val()], ->
    $('#location').append("<option>#{this}</option>")
  )
)

adjustHeight = (map) ->
  if (map == 'north-arm-map' || map == 'south-arm-map')
    $('#map').css("min-height", "380px")
    $('.tabs-panel').height("400px")
  else if (map == 'pitt-river-map')
    $('#map').css("min-height", "400px")
    $('.tabs-panel').height("420px")
  else
    $('#map').height("520px")
    $('.tabs-panel').height("540px")

$(->
  $("#print_survey_drawings").click(->
    window.print()
  )

  $("div.span-8").on("click",".surveyDrawingTile area, area.surveyDrawingTile",(event)->
    getSurveyDrawingsFromTiles({tile:event.currentTarget.title})
  )

  $('#waterway').change( ->
    $('#heading-waterway').text($(this).find('option:selected').text())
    $('#tile').text('')
    $('.map-group').hide()
    $('.map-group>div').hide()
    $('#'+$(this).val()+'-map').show()
    $('#'+$(this).val()+'-map').find('.map0').show()
    #Map that has absolute url#
    $('#'+$(this).val()+'-map').find('.mapAbsolute').show()
    adjustHeight($(this).val()+'-map')
  )
  $('.back').click( ->
    $(this).closest('.map-group').find('.map0').show()
    $(this).closest('div').hide()
    $('#tile').text('')
    adjustHeight($(this).closest('.map-group').attr('id'))
  )
  $('.map0 area').click( ->
    if $(this).closest('div.map0').hasClass("no_zoom") ||
        $(this).hasClass("no_zoom")
      return
    else
      $(this).closest('div').hide()
      $(this).closest('.map-group').find('.map'+$(this).attr('title')).show()
      #$('#tile').text('- Tile 00'+$(this).attr('title'))
      $('#map').css("min-height", "600px")
      $('.tabs-panel').height("620px")
  )
  $('.mapAbsolute area').click( ->
    window.open($(this).attr('title'), '_blank')
  )
  $('form#daily_depth').on("click","button", ->
    getSurveyDrawings({
      river:$('#waterway').val()
      drawingType:$('#type').val()
      channel:$('#waterway').val()
      location:$('#location').val()
      channelType:$('#channel').val()})
  )
  $('#waterway').change()
  $('#heading-waterway').parent().css('margin-top', '0')
)

getSurveyDrawings = ((jsonStuff) ->
  $('.spinner').show()
  drawingRows = ""
  $.getJSON("/api/surveys/getsurveys?river=#{jsonStuff.river}&" +
      "drawingType=#{jsonStuff.drawingType}&" +
      "recent=&" +
      "channel=#{jsonStuff.channel}&" +
      "location=#{jsonStuff.location}&" +
      "channelType=#{jsonStuff.channelType}", (data) ->
    $('#surveys tbody').html('')
    $.each(data, ->
      addRow = false
      if jsonStuff.kmStart and jsonStuff.kmEnd
        if parseFloat(jsonStuff.kmStart) <= parseFloat(this.kmStart) and parseFloat(jsonStuff.kmEnd) >= parseFloat(this.kmEnd)
          addRow = true
      else
        addRow = true
      if addRow
        drawingRows += "<tr>" +
            "<td>#{this.date.split("T")[0]}</td>" +
            "<td><a href='/Data/dwf/#{this.fileNumber}.dwf'>#{this.fileNumber}</a></td>" +
            "<td>#{this.location}</td>" +
            "<td>#{this.drawType}</td>" +
            "<td>#{this.kmStart}</td>" +
            "<td>#{this.kmEnd}</td>" +
            "</tr>"
    )
    $('#surveys').append(drawingRows)
  ).done( ->
    $('.spinner').hide()
    $('#report_body').show()
    $('#surveys tr:nth-child(odd)').addClass('odd')
    $('#surveys tr:nth-child(even)').addClass('even')
  )
)

getSurveyDrawingsFromTiles = ((jsonStuff) ->
  $('.spinner').show()
  drawingRows = ""
  $.getJSON("/api/get_tile.asp?tile=#{jsonStuff.tile}", (data) ->
    $('#surveys tbody').html('')
    $.each(data.drawings, ->
      drawingRows += "<tr>" +
          "<td>#{moment(this.yyyy_mm_dd,"DD/MM/YYYY").format("YYYY-MM-DD")}</td>" +
          "<td><a href='/Data/dwf/#{this.Svy_Filename}.dwf' target='_blank'>#{this.Svy_Filename}</a></td>" +
          "<td>#{this.Location}</td>" +
          "<td>#{this.Type}</td>" +
          "<td>#{this.KMstart}</td>" +
          "<td>#{this.KMend}</td>" +
          "</tr>"
    )
    $('#surveys').append(drawingRows)
  ).done( ->
    $('.spinner').hide()
    $('#report_body').show()
    $('#surveys tr:nth-child(odd)').addClass('odd')
    $('#surveys tr:nth-child(even)').addClass('even')
  )
)
