(function() {
  var adjustHeight, locations;

  locations = {
    'BR': {
      'Main': ['Marina', 'Channel'],
      'Secondary': [],
      'Other': []
    },
    'CR': {
      'Main': ['Channel'],
      'Secondary': [],
      'Other': []
    },
    'FRMA': {
      'Main': ['Channel km35to61', 'Channel km60to85', 'Annieville Channel', 'Queens Reach', 'Douglas Island', 'Bishops Reach', 'Derby Reach', 'Russel Reach', 'Langley Bar', 'Plumper Reach', 'Matsqui Island', 'Gravel Reach'],
      'Secondary': ['Sapperton Channel', 'Essondale Channel', 'Douglas Island North', 'Parsons Channel', 'Bedford Channel', 'Enterprise Channel']
    },
    'FRSA': {
      'Main': ['Channel', 'Sand Heads', 'Sand Heads Reach', 'Steveston Bend', 'Steveston Cut', 'Woodward Reach', 'Gravesend Reach', 'City Reach', 'Annieville Channel', 'Shoal Point - New  West'],
      'Secondary': ['Ladner_SeaReach', 'Cannery Channel', 'Sea Reach', 'Canoe Pass', 'Ladner Reach', 'Ladner Harbour', 'Deas Slough', 'Burr Landing Channel', 'Gundersen Slough', 'Annacis Channel', 'Roberts Bank'],
      'Other': []
    },
    'FRNA': {
      'Main': ['Channel', 'Point Grey', 'Iona', 'Musqueam', 'Sea Island', 'Marpole Basin', 'Mitchell Island', 'Mac-Blo', 'Byrne Road', 'Big Bend - Queens', 'Poplar Island', 'Morey Channel', 'Swishwash Island South'],
      'Secondary': ['Cowards Cove', 'Point Grey Scow Moorage', 'MacDonald Slough', 'Deering Channel', 'Mitchell Island North', 'Tree Island'],
      'Other': []
    },
    'FRUR': {
      'Main': ['Big Eddy', 'Cattermole', 'Chilliwack Rock', 'Carey Point', 'CPR Tunnels', 'Cheam View'],
      'Secondary': [],
      'Other': []
    },
    'PR': {
      'Main': ['Channel', 'Chatham Reach', 'Fox Reach', 'Grant Channel'],
      'Secondary': [],
      'Other': []
    },
    'SQ': {
      'Main': ['Mamquam Blind Channel'],
      'Secondary': [],
      'Other': []
    },
    'VFPA': {
      'Main': [],
      'Secondary': [],
      'Other': []
    },
    'FPORT': {
      'Main': [],
      'Secondary': [],
      'Other': []
    }
  };

  $('#waterway, #channel').change(function() {
    $('#location option').remove();
    $('#location').append('<option></option>');
    return $.each(locations[$('#waterway').val()][$('#channel').val()], function() {
      return $('#location').append("<option>" + this + "</option>");
    });
  });

  adjustHeight = function(map) {
    if (map === 'north-arm-map' || map === 'south-arm-map') {
      $('#map').css("min-height", "380px");
      return $('.tabs-panel').height("400px");
    } else if (map === 'pitt-river-map') {
      $('#map').css("min-height", "400px");
      return $('.tabs-panel').height("420px");
    } else {
      $('#map').height("520px");
      return $('.tabs-panel').height("540px");
    }
  };

  $(function() {
    $('#waterway').change(function() {
      $('#heading-waterway').text($(this).find('option:selected').text());
      $('#tile').text('');
      $('.map-group').hide();
      $('.map-group>div').hide();
      $('#' + $(this).val() + '-map').show();
      $('#' + $(this).val() + '-map').find('.map0').show();
      return adjustHeight($(this).val() + '-map');
    });
    $('.back').click(function() {
      $(this).closest('.map-group').find('.map0').show();
      $(this).closest('div').hide();
      $('#tile').text('');
      return adjustHeight($(this).closest('.map-group').attr('id'));
    });
    $('.map0 area').click(function() {
      $(this).closest('div').hide();
      $(this).closest('.map-group').find('.map' + $(this).attr('title')).show();
      $('#tile').text('- Tile 00' + $(this).attr('title'));
      $('#map').css("min-height", "600px");
      return $('.tabs-panel').height("620px");
    });
    $('#waterway, #channel, #location, #type').change(function() {
      return $.getJSON(("/api/surveys/getsurveys?river=" + ($('#waterway').val()) + "&") + "drawingType=&" + "recent=&" + ("channel=" + ($('#channel').val()) + "&") + ("location=" + ($('#location').val()) + "&") + ("channelType=" + ($('#type').val())), function(data) {
        $('#surveys tbody').html('');
        return $.each(data, function() {
          return $('#surveys').append("<tr>" + ("<td>" + this.date + "</td>") + ("<td><a href='../Data/dwf/" + this.fileNumber + "'>" + this.fileNumber + "</a></td>") + ("<td>" + this.location + "</td>") + ("<td>" + this.drawType + "</td>") + ("<td>" + this.kmStart + "</td>") + ("<td>" + this.kmEnd + "</td>") + "</tr>");
        });
      }).done(function() {
        $('#surveys tr:nth-child(odd)').addClass('odd');
        return $('#surveys tr:nth-child(even)').addClass('even');
      });
    });
    $('#waterway').change();
    return $('#heading-waterway').parent().css('margin-top', '0');
  });

}).call(this);
