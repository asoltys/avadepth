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
        'Sand Heads',
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
  $('#surveys').dataTable(bPaginate: false, bInfo: false, bFilter: false)

  $('#waterway').change( ->
    $('#heading-waterway').text($(this).find('option:selected').text())
    $('#tile').text('')
    $('.map-group').hide()
    $('.map-group>div').hide()
    $('#'+$(this).val()+'-map').show()
    $('#'+$(this).val()+'-map').find('.map0').show()
    adjustHeight($(this).val()+'-map')
  )
  $('.back').click( ->
    $(this).closest('.map-group').find('.map0').show()
    $(this).closest('div').hide()
    $('#tile').text('')
    adjustHeight($(this).closest('.map-group').attr('id'))
  )
  $('.map0 area').click( ->
    $(this).closest('div').hide()
    $(this).closest('.map-group').find('.map'+$(this).attr('title')).show()
    $('#tile').text('- Tile 00'+$(this).attr('title'))
    $('#map').css("min-height", "600px")
    $('.tabs-panel').height("620px")
  )
  
  $('#waterway').change()
  $('#heading-waterway').parent().css('margin-top', '0')
)
