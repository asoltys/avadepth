// Load def JS File
var hd=document.getElementsByTagName('head')[0];
var scr=document.createElement('script');
scr.type='text/javascript';
scr.src='scripts/incl_ava_defs.js';
hd.appendChild(scr);

// avaMapDetJS map object
// Loads and provides interactive capabilities to Avadepth embedded maps.
avaMapDetJS={
  // Initializes the map interface. Loads layers and map components.
  initMap:function() {
    avaMapDetJS.curLayer="";
    avaMapDetJS.curControls=[];

    // Map Options and constructor
	  avaMapDetJS.mapOptions = {
      maxExtent: new OpenLayers.Bounds(-13625920,6283000,-13941007,6458623),//-125,49,-121,50),
		  controls:[new oscar.Control.PanZoomBar,  new OpenLayers.Control.MousePosition, new OpenLayers.Control.ScaleLine],
			projection: new OpenLayers.Projection("EPSG:3857"),
			displayProjection: new OpenLayers.Projection("EPSG:4326"),
			units:"m",
      maxZoomLevel:20,
      minZoomLevel:5
		};
		//avaMapDetJS.map = new oscar.Map('ava_map_det',options);
    avaMapDetJS.map = new oscar.Map();
    // Google Maps layer
    // Loads Google Satellite map, or Google Street map for <IE9
    var gmap;
    if ( document.addEventListener ){
      gmap = new OpenLayers.Layer.Google("Google Satellite", {type: google.maps.MapTypeId.SATELLITE});
    } else {
      gmap = new OpenLayers.Layer.Google("Google", {});
      //gmap = new OpenLayers.Layer.OSM("Street Map", {});
    }

    // WMS Avadepth Bathymetry Layer
    var wmsLayer = new OpenLayers.Layer.WMS(
      "Bathymetry",
      "http://www2.pac.dfo-mpo.gc.ca/spatialfusionserver/services/ows/wms/avadepth",
      {layers: "Avadepth_surfaces",transparent:true,isBaseLayer:false,format:'image/png'},
	    {alpha:true}
    );

    // Add layers
   	avaMapDetJS.map.addLayers([gmap,wmsLayer]);
   	//avaMapDetJS.map.addLayers([gmap]);
    //avaMapDetJS.map.zoomToExtent(new OpenLayers.Bounds(-13625920,6283000,-13941007,6458623));
    //avaMapDetJS.map.setCenter(new OpenLayers.LonLat(-13682000,6306500),5);
  },

  renderMap: function(){
    avaMapDetJS.map.render('ava_map_det',avaMapDetJS.mapOptions);
  },

  /*** General Functions ***/
  setPageActivity: function(pageName){
    window['avaMapDetJS'][pageName+'_func'].init();
  },

  setMapLayer: function(newLayer){
    if(!avaMapDetJS.curLayer==""){
      avaMapDetJS.map.removeLayer(avaMapDetJS.curLayer);
    }
    avaMapDetJS.curLayer=newLayer;
    // Add layer
   	avaMapDetJS.map.addLayer(avaMapDetJS.curLayer);
  },

  setMapControls: function(newControls){
    if(!avaMapDetJS.curControls.length==0){
      for(var c in avaMapDetJS.curControls){
        avaMapDetJS.map.removeControl(avaMapDetJS.curControls[c]);
      }
    }
    avaMapDetJS.curControls=newControls;
    avaMapDetJS.map.addControls(avaMapDetJS.curControls);
  },

  /*** Functions for each page type ***/
  acv_func: {init: function(){}},
  ccc_func:{init: function(){}},
  dd_func: {init: function(){}},
  frh_func:{init: function(){}},
  tw_func: {init: function(){}},
  pwl_func: {
    init: function(){
      avaMapDetJS.pwl_func.curRiver="";

      // KML Feature Styles and KML Layer
      avaMapDetJS.pwl_func.kml = new OpenLayers.Layer.Vector("KML", {
        strategies: [new OpenLayers.Strategy.Fixed()],
        projection: avaMapDetJS.map.displayProjection,
        styleMap: new OpenLayers.StyleMap({
          'default': new OpenLayers.Style(
            {fillColor: "${getColor}", fillOpacity: "${getOpacity}", strokeColor: "${getColor}", pointRadius: 2.5,
              label: "${KM}", fontColor:"${getColor}", fontSize:15, fontWeight:"bold", labelYOffset:15}, {
              context: {
                getColor: function (feat) {
                  if (avaMapDetJS.pwl_func.checkMarker(feat) == true)
                    return '#dd0000';
                  else
                    return '#aaaaaa';
                },
                getOpacity: function (feat) {
                  if (avaMapDetJS.pwl_func.checkMarker(feat) == true)
                    return 0.2;
                  else
                    return 0.1;
                }
              }
            }
          ),
          'select': new OpenLayers.Style({fillColor: '#00ffff', strokeColor: '#00ffff',labelOutlineOpacity:0,fontColor:"#00ffff"})
        }),
        protocol: new OpenLayers.Protocol.HTTP({
          url: "pwl_markers.kml?",
          format: new OpenLayers.Format.KML({
            extractStyles: false,
            extractAttributes: true,
            maxDepth: 2
          })
        })
      });
      avaMapDetJS.setMapLayer(avaMapDetJS.pwl_func.kml);

      // Map Interaction parameters
      avaMapDetJS.pwl_func.HLFeat = new OpenLayers.Control.SelectFeature(avaMapDetJS.pwl_func.kml, {
        hover: true,
        highlightOnly: true,
        renderIntent: "temporary"
      });
      avaMapDetJS.map.addControl(avaMapDetJS.pwl_func.HLFeat);
      avaMapDetJS.pwl_func.HLFeat.activate();
      avaMapDetJS.pwl_func.kml.events.on({'featureselected': avaMapDetJS.pwl_func.selectMarker});

      // Sets extents of map
      avaMapDetJS.pwl_func.setExtents("South Arm");
    },

    // checkTileRefresh: checks if the tile's attributes match the currently selected values
    checkMarker: function(feat){
      return feat.attributes.waterway == avaMapDetJS.pwl_func.curRiver;
    },

    lookupRiver: function(riverName){
      for(var r in incl_ava_defs.locDefs){
        var rivObj=incl_ava_defs.locDefs[r];
        try{
          if(rivObj.pwl.key==riverName){return r}
        } catch(err){}
      }
    },

    refreshMarkers: function(riverName){
      avaMapDetJS.pwl_func.curRiver=avaMapDetJS.pwl_func.lookupRiver(riverName);
      avaMapDetJS.pwl_func.kml.redraw();
    },

    selectMarker: function(feat){
      avaMapDetJS.map.zoomToExtent(feat.feature.geometry.getBounds(), closest=true);
      avaMapDetJS.map.zoomToScale(100000);
    },

    setMarkerExtent: function(mrkKM,mrkRiver){
      avaMapDetJS.pwl_func.HLFeat.unselectAll();
      for(var f= 0;f<avaMapDetJS.pwl_func.kml.features.length;f++){
        if(avaMapDetJS.pwl_func.lookupRiver(mrkRiver)==avaMapDetJS.pwl_func.kml.features[f].attributes.waterway && avaMapDetJS.pwl_func.kml.features[f].attributes.KM==mrkKM){
          avaMapDetJS.pwl_func.HLFeat.select(avaMapDetJS.pwl_func.kml.features[f]);
          break;
        }
      }
    },

    // setExtents: Using the name of provided Waterways selector, draw extents from 'locationExtents' dict.
    setExtents: function(river) {
      if (!river) {
        return;
      }
      avaMapDetJS.pwl_func.refreshMarkers(river);
      var obj = incl_ava_defs.locDefs[avaMapDetJS.pwl_func.curRiver].Coords;
      try {
        avaMapDetJS.map.zoomToExtent(new OpenLayers.Bounds(obj.Lon.min, obj.Lat.min, obj.Lon.max, obj.Lat.max));
      } catch(err){}
    }
  },

  sdb_func: {
    // init function for loading custom tile file and other events
    init: function() {
      // Setting up place-holder variables
      avaMapDetJS.sdb_func.curWaterway="";
      avaMapDetJS.sdb_func.curLocation="";

      // KML Feature Styles and KML Layer
      avaMapDetJS.sdb_func.kml = new OpenLayers.Layer.Vector("KML", {
        strategies: [new OpenLayers.Strategy.Fixed()],
        projection: avaMapDetJS.map.displayProjection,
        styleMap: new OpenLayers.StyleMap({
          'default': new OpenLayers.Style(
            {fillColor: "${getColor}", fillOpacity: "${getOpacity}", strokeColor: "${getColor}", strokeWidth: 2.0}, {
              context: {
                getColor: function (feat) {
                  if (avaMapDetJS.sdb_func.checkTileRefresh(feat) == true)
                    return '#dd0000';
                  else
                    return '#aaaaaa';
                },
                getOpacity: function (feat) {
                  if (avaMapDetJS.sdb_func.checkTileRefresh(feat) == true)
                    return 0.2;
                  else
                    return 0.1;
                }
              }
            }
          ),
          'select': new OpenLayers.Style({fillColor: '#00ffff', strokeColor: '#00ffff',
            label: '${name}', fontSize:15, fontWeight:"bold", fontColor: "black",
            labelOutlineColor:"#00ffff", labelOutlineWidth: 2
          }),
          'hover': new OpenLayers.Style({fillColor: '${getColor}', strokeColor: '${getColor}',
              label: '${name}', fontSize:15, fontWeight:"bold", fontColor: "black",
              labelOutlineColor:"${getColor}", labelOutlineWidth: 2, fillOpacity:1
            },{
              context:{
                getColor: function (feat) {
                  if (avaMapDetJS.sdb_func.checkTileRefresh(feat) == true)
                    return '#dd0000';
                  else
                    return '#aaaaaa';
                }
              }
            }
          )
        }),
        protocol: new OpenLayers.Protocol.HTTP({
          url: "sdb_tiles.kml?",
          format: new OpenLayers.Format.KML({
            extractStyles: false,
            extractAttributes: true,
            maxDepth: 2
          })
        })
      });
      avaMapDetJS.setMapLayer(avaMapDetJS.sdb_func.kml);

      // Map Interaction parameters
      avaMapDetJS.sdb_func.HLFeat = new OpenLayers.Control.SelectFeature(avaMapDetJS.sdb_func.kml, {
        hover: true,
        highlightOnly: true,
        renderIntent: "hover"
      });
      avaMapDetJS.setMapControls([avaMapDetJS.sdb_func.HLFeat]);
      avaMapDetJS.sdb_func.HLFeat.activate();
      avaMapDetJS.sdb_func.kml.events.on({'featureselected': avaMapDetJS.sdb_func.tileSelect});

      // Sets extents of map
      avaMapDetJS.sdb_func.setExtents("FRSA");
    },

    /*** Page-specific functions ***/
    // setExtents: Using the name of provided Waterways selector, draw extents from 'locationExtents' dict.
    setExtents: function(waterway) {
      if (!waterway) {
        return;
      }
      var obj = incl_ava_defs.locDefs[waterway].Coords;
      try {
        avaMapDetJS.map.zoomToExtent(new OpenLayers.Bounds(obj.Lon.min, obj.Lat.min, obj.Lon.max, obj.Lat.max));
      } catch(err){}
      avaMapDetJS.sdb_func.refreshTiles(waterway,"");
    },

    // tileSelect: callBack function for tile selection from the map interface
    tileSelect: function(tile){
      var tileName=tile.feature.data.name;
      if(tileName.indexOf('/')>=0) {parent.window.open("http://www2.pac.dfo-mpo.gc.ca"+tileName,'_blank');}
      else {parent.avaIFaceJS.sdb_func.getSurveyDrawingsFromTiles({"tile": tileName,"name":tile.feature.data.location});}
    },

    // refreshTiles: function to refresh the draw of the tile layer using the new selected form settings
    refreshTiles: function(ww,lo){
      if (!ww){ return }
      avaMapDetJS.sdb_func.curWaterway=ww;
      avaMapDetJS.sdb_func.curLocation=lo;
      avaMapDetJS.sdb_func.kml.redraw();
    },

    // checkTileRefresh: checks if the tile's attributes match the currently selected values
    checkTileRefresh: function(feat){
      var temp;
      if(avaMapDetJS.sdb_func.curLocation.length > 0 && avaMapDetJS.sdb_func.curLocation != "Channel"){
        temp = feat.data.location==avaMapDetJS.sdb_func.curLocation;
      } else {
        temp = true;
      }
      return temp && (feat.data.waterway == avaMapDetJS.sdb_func.curWaterway)
    }
  }
};
