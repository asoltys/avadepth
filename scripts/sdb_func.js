/**
 * Created by wsiddall on 26/08/2014.
 */


/*** Interface functions ***/
if(!(typeof avaIFaceJS === 'undefined')) {

  avaIFaceJS.sdb_func= {
    init: function () {
	  avaIFaceJS.sdb_func.fillChannel(); // populate dropdowns on load
	
	  /** Event Handlers **/
	  // Load and fill channel drop down
	  $('#sdb_waterway').change(avaIFaceJS.sdb_func.fillChannel);
	  
      // Load and fill location drop down
      $('#channel').change(avaIFaceJS.sdb_func.fillLocation);
	  
	  // Colour and resize map extents when waterway field changes
      $('#sdb_waterway').change(function () {
        avaIFaceJS.mapJS.sdb_func.setExtents($(this).val());
        return $('#map').css("min-height", "400px");
      });

	  // Colour and resize map when channel field changes
	  $('#channel').change(function () {
        avaIFaceJS.mapJS.sdb_func.setChannelExtents( $('#sdb_waterway').val() , $(this).val() ); // Broken?
        return $('#map').css("min-height", "400px");
      });
	  
      // Colour Tiles when location field changes
      $('#location').change(function () {
        return avaIFaceJS.mapJS.sdb_func.refreshTiles($('#channel').val(), $(this).val()); //originally $('#sdb_waterway').val()
      });

      // Submit form
      $("#submit").click(function () {
        $('.spinner').show();
		return avaIFaceJS.sdb_func.update();
      });
    },

    // Load and fill channel drop down
	fillChannel: function () {
	  $('#location option').remove();
      $('#channel option').remove();
      $('#channel').append('<option></option>');
      return $.each(incl_ava_defs.locDefs[$('#sdb_waterway').val()]['Sections'], function () {
        return $('#channel').append("<option value='" + this.Form.Key + "'>" + this.Form.Title + "</option>");
      });
    },
	
	// Load and fill location drop down
    fillLocation: function () {
      $('#location option').remove();
      $('#location').append('<option></option>');
      return $.each(incl_ava_defs.locDefs[$('#sdb_waterway').val()]['Sections'][$('#channel').val()]['Names'], function () {
        return $('#location').append("<option>" + this + "</option>");
      });
    },

	// process report content and update window
	update: function() {
		var header, wat, chann, location;
		
		// set report title
		if (window.location.href.indexOf("fra") > -1) { //If url contains 'fra' use
		  header = "Enquêtes Résultats de la recherche";
		} else {
		  header = "Surveys Search Results";
		}
		
		wat = $('#sdb_waterway').find('option:selected').text();
		chann = $('#channel').find('option:selected').text();
		location = $('#location').find('option:selected').text();

		if (location != "") { location = "At " + location; }
		
		avaIFaceJS.reportWindow.addTitle(header, wat, chann + " " + location);
	

		// generate report data
		//TODO: Replace following line for Production
		return $.getJSON(getAPI(("api/surveys/getsurveys?river=" + $('#channel').val() + "&") // unique to waterway and channel combination
		  + ("drawingType=" + $('#type').val() + "&")
		  + "recent=&"
		  + ("channel=" + $('#channel').val() + "&")
		  + ("location=" + $('#location').val() + "&")
		  + ("channelType=" + ""),"includes/test.json"), function (data) {
			avaIFaceJS.sdb_func.tableReport || (avaIFaceJS.sdb_func.tableReport = $('#report_tbl').DataTable({
			  bPaginate: false,
			  bInfo: false,
			  bSort: false,
			  bFilter: false
			}));
			avaIFaceJS.sdb_func.tableReport.clear();
			$('#report_tbl tbody tr').remove();
			$.each(data, function () {
			  avaIFaceJS.sdb_func.tableReport.row.add(
				  [this.date.split("T")[0],
				  "<a href='http://www2.pac.dfo-mpo.gc.ca/Data/dwf/" + this.fileNumber + ".dwf?' target='_blank'>" + this.fileNumber + "</a>",
				  this.location,
				  this.drawType,
				  this.kmStart,
				  this.kmEnd]);
			});
			avaIFaceJS.sdb_func.tableReport.draw();
			
			
			avaIFaceJS.setMapOpen(avaIFaceJS.MapState.Close);
			avaIFaceJS.reportWindow.show();
		}).done(function () {
		$('.spinner').hide();
		pBarToggle();
		});
    },

	// update parameter bar from map selected channel
    updateParameters: (function(jsonData){
      var data = jsonData.data
      switch(data.waterway){
        case "FRMA":
        case "FRMA_SC":
        case "FRNA":
        case "FRNA_SC":
        case "FRPR":
        case "FRSA":
        case "FRSA_SC":
        case "FRUR":
          $('#sdb_waterway').val("FR");
          break;
        case "PMV":
        case "PMV-FSD":
          $('#sdb_waterway').val("VH");
          break;
        default :
          $('#sdb_waterway').val("CWC");
      }
      avaIFaceJS.sdb_func.fillChannel();
      $('#channel').val(data.waterway);
      avaIFaceJS.sdb_func.fillLocation();
      $('#location').val(data.location).change();
    }),
  };
} else if(!(typeof avaMapJS === 'undefined')) {
  /*** Map Interaction functions ***/
  avaMapJS.sdb_func = {
    // init function for loading custom tile file and other events
    init: function () {
      // Setting up place-holder variables
      avaMapJS.sdb_func.curWaterway = "";
      avaMapJS.sdb_func.curLocation = "";

      // KML Feature Styles and KML Layer
      mapStyle.callback_function=avaMapJS.sdb_func.checkTileRefresh;
      avaMapJS.sdb_func.kml = new OpenLayers.Layer.Vector("KML", {
        strategies: [new OpenLayers.Strategy.Fixed()],
        projection: avaMapJS.map.displayProjection,
        renderers: avaMapJS.renderer,
        styleMap: mapStyle.area_with_label("${location}"),
		protocol: new OpenLayers.Protocol.HTTP({
          url: "sdb_tiles.kml?",
          format: new OpenLayers.Format.KML({
            extractStyles: false,
            extractAttributes: true,
            maxDepth: 2
          })
        })
      });
      avaMapJS.setMapLayer(avaMapJS.sdb_func.kml);

      // Map Interaction parameters
      avaMapJS.sdb_func.HLFeat = new OpenLayers.Control.SelectFeature(avaMapJS.sdb_func.kml, {
        hover: false,
        toggle: false,
        clickout: true,
        multiple: false,
        //renderIntent: "select",
        toggleKey:"ctrlKey",
        multipleKey:"shiftKey"
      });
      avaMapJS.setMapControls([avaMapJS.sdb_func.HLFeat]);
      avaMapJS.sdb_func.HLFeat.activate();
      avaMapJS.sdb_func.HLFeat.handlers.feature.stopDown = false;
      avaMapJS.sdb_func.kml.events.on({
        'featureselected': avaMapJS.sdb_func.tileSelect,
        'featureunselected': avaMapJS.sdb_func.tileUnselect
      });

      // Sets extents of map
      avaMapJS.sdb_func.setExtents("FR");
    },

    /*** Page-specific functions ***/
    // setExtents: Using the name of provided Waterways selector, draw extents from 'locationExtents' dict.
    setExtents: function (waterway) {
      if (!waterway) {
        return;
      }
      var obj = incl_ava_defs.locDefs[waterway].Coords;
      try {
        avaMapJS.map.zoomToExtent(new OpenLayers.Bounds(obj.Lon.min, obj.Lat.min, obj.Lon.max, obj.Lat.max));
      } catch (err) {
      }
      avaMapJS.sdb_func.refreshTiles(waterway, "");
    },
	
	// page specific
	setChannelExtents: function (waterway, channel) {
      if (!channel || !waterway) {
        return;
      }  
      var obj = incl_ava_defs.locDefs[waterway]['Sections'][channel].Coords;
      try {
        avaMapJS.map.zoomToExtent(new OpenLayers.Bounds(obj.Lon.min, obj.Lat.min, obj.Lon.max, obj.Lat.max));
      } catch (err) {
      }
      avaMapJS.sdb_func.refreshTiles(channel, "");
    },
	
    tileUnselect: function(tile){
      if(tile.feature.data.location==avaMapJS.sdb_func.curLocation) {
        avaMapJS.sdb_func.curLocation = "";
        avaMapJS.sdb_func.curWaterway = "";
      }
    },

    // tileSelect: callBack function for tile selection from the map interface
    tileSelect: function (tile) {
      var tileName = tile.feature.data.name;
      if (tileName.indexOf('/') >= 0) {
        parent.window.open("http://www2.pac.dfo-mpo.gc.ca" + tileName, '_blank');
      }
      else {
        parent.avaIFaceJS.sdb_func.updateParameters({"data": tile.feature.data});
        parent.avaIFaceJS.sdb_func.update(); // refresh page from updated parameters
      }
    },

    // refreshTiles: function to refresh the draw of the tile layer using the new selected form settings
    refreshTiles: function (ww, lo) {
      if (!ww) {
        return
      }
      avaMapJS.sdb_func.curWaterway = ww;
      avaMapJS.sdb_func.curLocation = lo;
      avaMapJS.sdb_func.kml.redraw();
    },

    // checkTileRefresh: checks if the tile's attributes match the currently selected values
    checkTileRefresh: function (feat) {
      var temp;
	  if(window.location.href.indexOf("fra") > -1) {
		//If url contains 'fra'	use 
		if (avaMapJS.sdb_func.curLocation.length > 0 && avaMapJS.sdb_func.curLocation != " - Aperçu du chenal") {
			temp = feat.data.location == avaMapJS.sdb_func.curLocation;
			} else {
			temp = true;
			}
		} else {
		//If url does not contain 'fra' use
		if (avaMapJS.sdb_func.curLocation.length > 0 && avaMapJS.sdb_func.curLocation != "Channel Overview") {
			temp = feat.data.location == avaMapJS.sdb_func.curLocation;
			} else {
			temp = true;
			}
	  }
      return temp && (feat.data.waterway == avaMapJS.sdb_func.curWaterway)
    }
  };
} else if (!(typeof avaMapDetJS === 'undefined')) {
  avaMapDetJS.sdb_func = {init: function () {}};
};

//# sourceURL=sdb_func.js
