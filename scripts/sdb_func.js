/**
 * Created by wsiddall on 26/08/2014.
 */


/*** Interface functions ***/
if(!(typeof avaIFaceJS === 'undefined')) {

  avaIFaceJS.sdb_func= {
    /*** Local variables ***/
    heading_waterway: "Fraser - South Arm",
    tile: "",

    init: function () {
      // Fill Form Parameters

      // Load and fill location drop down
      $('#channel').change(avaIFaceJS.sdb_func.fillLocation);
	  
	  $('#sdb_waterway').change(avaIFaceJS.sdb_func.fillChannel);

      // Colour Tiles when location field changes
      $('#location').change(function () {
        avaIFaceJS.sdb_func.tile = $(this).val();
		avaIFaceJS.sdb_func.loc_title = " at "+avaIFaceJS.sdb_func.tile;
        return avaIFaceJS.mapJS.sdb_func.refreshTiles($('#channel').val(), $(this).val()); //originally $('#sdb_waterway').val()
      });

      // Colour and resize map extents when waterway field changes
      $('#sdb_waterway').change(function () {
        avaIFaceJS.sdb_func.heading_waterway = $(this).find('option:selected').text();
        avaIFaceJS.sdb_func.tile = "";
        if(window.location.href.indexOf("fra") > -1) {
//If url contains 'fra'	use 
		avaIFaceJS.reportWindow.addTitle("Enquêtes Résultats de la recherche", avaIFaceJS.sdb_func.heading_waterway + " " + avaIFaceJS.sdb_func.loc_title);
		} else {
		//If url does not contain 'fra' use
		avaIFaceJS.reportWindow.addTitle("Surveys Search Results", avaIFaceJS.sdb_func.heading_waterway + " " + avaIFaceJS.sdb_func.loc_title);
		}
        avaIFaceJS.mapJS.sdb_func.setExtents($(this).val());
        return $('#map').css("min-height", "400px");
      });
	  
	  $('#channel').change(function () {
        avaIFaceJS.sdb_func.heading_waterway = $(this).find('option:selected').text();
        avaIFaceJS.sdb_func.tile = "";
        if(window.location.href.indexOf("fra") > -1) {
		//If url contains 'fra'	use 
		avaIFaceJS.reportWindow.addTitle("Enquêtes Résultats de la recherche", avaIFaceJS.sdb_func.heading_waterway + " " + avaIFaceJS.sdb_func.loc_title);
		} else {
		//If url does not contain 'fra' use
		avaIFaceJS.reportWindow.addTitle("Surveys Search Results", avaIFaceJS.sdb_func.heading_waterway + " " + avaIFaceJS.sdb_func.loc_title);
		}
        avaIFaceJS.mapJS.sdb_func.setChannelExtents( $('#sdb_waterway').val() , $(this).val() ); // Broken?
        return $('#map').css("min-height", "400px");
      });

      // Submit form
      $("#submit").click(function () {
        var ww = $('#channel').val();
        return avaIFaceJS.sdb_func.getSurveyDrawings({
          river: ww,
          drawingType: $('#type').val(),
          channel: ww,
          location: avaIFaceJS.sdb_func.tile,
          channelType: ""
        });
      });
	  
      // Print page to printer
      $("#print").click(function () {
        return window.print();
      });
      var mapElem = $('#embed_map');
      mapElem.load(function () {
        $('#sdb_waterway').change();
      });
	  
	  return avaIFaceJS.sdb_func.fillChannel();
    },

    fillLocation: function () {
      $('#location option').remove();
      $('#location').append('<option></option>');
      return $.each(incl_ava_defs.locDefs[$('#sdb_waterway').val()]['Sections'][$('#channel').val()]['Names'], function () {
        return $('#location').append("<option>" + this + "</option>");
      });
    },
	
	fillChannel: function () {
	  $('#location option').remove();
      $('#channel option').remove();
      $('#channel').append('<option></option>');
      return $.each(incl_ava_defs.locDefs[$('#sdb_waterway').val()]['Sections'], function () {
        return $('#channel').append("<option value='" + this.Form.Key + "'>" + this.Form.Title + "</option>");
      });
    },

    getSurveyDrawings: (function (jsonStuff) {
      var drawingRows;
      $('.spinner').show();
      drawingRows = "";
      //TODO: Replace following line for Production
      return $.getJSON(getAPI(("api/surveys/getsurveys?river=" + jsonStuff.river + "&") + ("drawingType=" + jsonStuff.drawingType + "&") + "recent=&" + ("channel=" + jsonStuff.channel + "&") + ("location=" + jsonStuff.location + "&") + ("channelType=" + jsonStuff.channelType),"includes/test.json"), function (data) {
      //return $.getJSON(("api/surveys/getsurveys?river=" + jsonStuff.river + "&") + ("drawingType=" + jsonStuff.drawingType + "&") + "recent=&" + ("channel=" + jsonStuff.channel + "&") + ("location=" + jsonStuff.location + "&") + ("channelType=" + jsonStuff.channelType), function(data) {
      //return $.getJSON(("includes/test.json"), function (data) {
        if(window.location.href.indexOf("fra") > -1) {
		//If url contains 'fra'	use 
		avaIFaceJS.reportWindow.addTitle("Enquêtes Résultats de la recherche", avaIFaceJS.sdb_func.heading_waterway + " " + avaIFaceJS.sdb_func.tile);
		} else {
		//If url does not contain 'fra' use
		avaIFaceJS.reportWindow.addTitle("Surveys Search Results", avaIFaceJS.sdb_func.heading_waterway + " " + avaIFaceJS.sdb_func.tile);
		}
        $('#report_tbl tbody').html('');
        $.each(data, function () {
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
            return drawingRows += "<tr>" + ("<td>" + (this.date.split("T")[0]) + "</td>") + ("<td><a href='http://www2.pac.dfo-mpo.gc.ca/Data/dwf/" + this.fileNumber + ".dwf' target='_blank'>" + this.fileNumber + "</a></td>") + ("<td>" + this.location + "</td>") + ("<td>" + this.drawType + "</td>") + ("<td>" + this.kmStart + "</td>") + ("<td>" + this.kmEnd + "</td>") + "</tr>";
          }
        });
        avaIFaceJS.setMapOpen(avaIFaceJS.MapState.Close);
        avaIFaceJS.reportWindow.show();
        return $('#report_tbl').append(drawingRows);
      }).done(function () {
        $('.spinner').hide();
        $('#report_tbl tr:nth-child(odd)').addClass('odd');
        return $('#report_tbl tr:nth-child(even)').addClass('even');
      });
    }),

    getSurveyDrawingsFromTiles: (function (jsonStuff) {
      var drawingRows;
      $('.spinner').show();
      drawingRows = "";
      //TODO: Replace following line for previous in production
      return $.getJSON(getAPI("api/get_tile.asp?tile=" + jsonStuff.tile, "api/get_tile/" + jsonStuff.tile + ".json"), function (data) {
      //return $.getJSON("api/get_tile.asp?tile=" + jsonStuff.tile, function(data) {
      //return $.getJSON("api/get_tile/" + jsonStuff.tile + ".json", function (data) {
        if(window.location.href.indexOf("fra") > -1) {
		//If url contains 'fra'	use 
		avaIFaceJS.reportWindow.addTitle("Enquêtes Résultats de la recherche", avaIFaceJS.sdb_func.heading_waterway + " at " + jsonStuff.name);
		} else {
		//If url does not contain 'fra' use
		avaIFaceJS.reportWindow.addTitle("Surveys Search Results", avaIFaceJS.sdb_func.heading_waterway + " at " + jsonStuff.name);
}
        $('#report_tbl tbody').html('');
        $.each(data.drawings, function () {
		if(this.Filename != 'datafile') {
			return drawingRows += "<tr>" + ("<td>" + (moment(this.yyyy_mm_dd, "DD/MM/YYYY").format("YYYY-MM-DD")) + "</td>") + ("<td><a href='http://www2.pac.dfo-mpo.gc.ca/Data/dwf/" + this.Filename + ".dwf' target='_blank'>" + this.Filename + "</a></td>") + ("<td>" + this.Location + "</td>") + ("<td>" + this.Type + "</td>") + ("<td>" + this.KMstart + "</td>") + ("<td>" + this.KMend + "</td>") + "</tr>";
        }});
        return $('#report_tbl').append(drawingRows);
      }).done(function () {
        $('.spinner').hide();
        $('#report_tbl tr:nth-child(odd)').addClass('odd');
        avaIFaceJS.reportWindow.show();
        return $('#report_tbl tr:nth-child(even)').addClass('even');
      });
    })

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
        parent.avaIFaceJS.sdb_func.getSurveyDrawingsFromTiles({"tile": tileName, "name": tile.feature.data.location});
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
