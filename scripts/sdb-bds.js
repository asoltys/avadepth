(function() {
  var adjustHeight, getSurveyDrawings, locations;

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
    $("#print_survey_drawings").click(function() {
      return window.print();
    });
    $("div.span-8").on("click", ".surveyDrawingTile area", function(event) {
      var riverSection;
      riverSection = tile_query_info[event.currentTarget.title];
      return getSurveyDrawings({
        river: riverSection.river,
        drawingType: riverSection.drawingType,
        channel: riverSection.channel,
        location: riverSection.location,
        channelType: riverSection.channelType,
        kmStart: riverSection.kmStart,
        kmEnd: riverSection.kmEnd
      });
    });
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
    $('form#daily_depth').on("click", "button", function() {
      return getSurveyDrawings({
        river: $('#waterway').val(),
        drawingType: $('#type').val(),
        channel: $('#waterway').val(),
        location: $('#location').val(),
        channelType: $('#channel').val()
      });
    });
    $('#waterway').change();
    return $('#heading-waterway').parent().css('margin-top', '0');
  });

  getSurveyDrawings = (function(jsonStuff) {
    var drawingRows;
    $('.spinner').css('display', 'block');
    drawingRows = "";
    return $.getJSON(("/api/surveys/getsurveys?river=" + jsonStuff.river + "&") + ("drawingType=" + jsonStuff.drawingType + "&") + "recent=&" + ("channel=" + jsonStuff.channel + "&") + ("location=" + jsonStuff.location + "&") + ("channelType=" + jsonStuff.channelType), function(data) {
      $('#surveys tbody').html('');
      $.each(data, function() {
        var addRow;
        addRow = false;
        if (jsonStuff.kmStart && jsonStuff.kmEnd) {
          if (jsonStuff.kmStart === this.kmStart && jsonStuff.kmEnd === this.kmEnd) {
            addRow = true;
          }
        } else {
          addRow = true;
        }
        if (addRow) {
          return drawingRows += "<tr>" + ("<td>" + (this.date.split("T")[0]) + "</td>") + ("<td><a href='../Data/dwf/" + this.fileNumber + "'>" + this.fileNumber + "</a></td>") + ("<td>" + this.location + "</td>") + ("<td>" + this.drawType + "</td>") + ("<td>" + this.kmStart + "</td>") + ("<td>" + this.kmEnd + "</td>") + "</tr>";
        }
      });
      return $('#surveys').append(drawingRows);
    }).done(function() {
      $('.spinner').css('display', 'none');
      $('#surveys tr:nth-child(odd)').addClass('odd');
      return $('#surveys tr:nth-child(even)').addClass('even');
    });
  });

}).call(this);
