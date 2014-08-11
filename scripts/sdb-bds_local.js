var sdbbds_functions = {

  locations: {
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
      'Main': ['Channel', 'Sand Heads Entrance', 'Sand Heads Reach', 'Steveston Bend', 'Steveston Cut', 'Woodward Reach', 'Gravesend Reach', 'City Reach', 'Annieville Channel', 'Shoal Point - New  West'],
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
    'PMV': {
      'Main': [],
      'Secondary': [],
      'Other': []
    },
    'FPORT': {
      'Main': [],
      'Secondary': [],
      'Other': []
    }
  },

  init: function() {
    $('#waterway, #channel').change(function() {
		$('#location option').remove();
		$('#location').append('<option></option>');
		return $.each(sdbbds_functions.locations[$('#waterway').val()][$('#channel').val()], function() {
		  return $('#location').append("<option>" + this + "</option>");
		});
	  });
    $('#location').change(function() {
       var mp=$('#embed_map')[0].contentWindow;
       return mp.avaMapJS.refreshTiles($('#waterway').val(),$(this).val());
    });
    $("#print_survey_drawings").click(function() {
      return window.print();
    });
    $('#waterway').change(function() {
      $('#heading-waterway').text($(this).find('option:selected').text());
      $('#tile').text('');
      //WS
      var mp=$('#embed_map')[0].contentWindow;
      if(!mp.avaMapJS.map){ return; }
	  try {
          mp.avaMapJS.setExtents($(this).val());
	  } catch(err){}
      return $('#map').css("min-height", "400px");
    });
	
    $('form#daily_depth').on("click", "button", function() {
        var ww=$('#waterway').val();
        return sdbbds_functions.getSurveyDrawings({
            river: ww,
            drawingType: $('#type').val(),
            channel: ww,
            location: $('#location').val(),
            channelType: $('#channel').val()
      });
    });
	$('#embed_map').load(function(){
		$('#waterway').change();
	});
    return $('#heading-waterway').parent().css('margin-top', '0');
  },

  getSurveyDrawings: (function(jsonStuff) {
    var drawingRows;
    $('.spinner').show();
    drawingRows = "";
    return $.getJSON(("includes/test.json"), function(data) {
      $('#surveys tbody').html('');
      $.each(data, function() {
        var addRow;
        addRow = false;
        if (jsonStuff.kmStart && jsonStuff.kmEnd) {
          if (parseFloat(jsonStuff.kmStart) <= parseFloat(this.kmStart) && parseFloat(jsonStuff.kmEnd) >= parseFloat(this.kmEnd)) {
            addRow = true;
          }
        } else {
          addRow = true;
        }
        if (addRow) {
          return drawingRows += "<tr>" + ("<td>" + (this.date.split("T")[0]) + "</td>") + ("<td><a href='/Data/dwf/" + this.fileNumber + ".dwf'>" + this.fileNumber + "</a></td>") + ("<td>" + this.location + "</td>") + ("<td>" + this.drawType + "</td>") + ("<td>" + this.kmStart + "</td>") + ("<td>" + this.kmEnd + "</td>") + "</tr>";
        }
      });
      return $('#surveys').append(drawingRows);
    }).done(function() {
      $('.spinner').hide();
      $('#report_body').show();
      $('#surveys tr:nth-child(odd)').addClass('odd');
      return $('#surveys tr:nth-child(even)').addClass('even');
    });
  }),

  getSurveyDrawingsFromTiles: (function(jsonStuff) {
    var drawingRows;
    $('.spinner').show();
    drawingRows = "";
    return $.getJSON("api/get_tile/" + jsonStuff.tile + ".json", function(data) {
    //return $.getJSON("api/get_tile.asp?tile=" + jsonStuff.tile, function(data) {
      $('#surveys tbody').html('');
      $.each(data.drawings, function() {
        return drawingRows += "<tr>" + ("<td>" + (moment(this.yyyy_mm_dd, "DD/MM/YYYY").format("YYYY-MM-DD")) + "</td>") + ("<td><a href='/Data/dwf/" + this.Svy_Filename + ".dwf' target='_blank'>" + this.Svy_Filename + "</a></td>") + ("<td>" + this.Location + "</td>") + ("<td>" + this.Type + "</td>") + ("<td>" + this.KMstart + "</td>") + ("<td>" + this.KMend + "</td>") + "</tr>";
      });
      return $('#surveys').append(drawingRows);
    }).done(function() {
      $('.spinner').hide();
      $('#report_body').show();
      $('#surveys tr:nth-child(odd)').addClass('odd');
      return $('#surveys tr:nth-child(even)').addClass('even');
    });
  })

};
sdbbds_functions.init();
