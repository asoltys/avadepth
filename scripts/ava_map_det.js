// Load def JS File
var loadJS=function(scriptName,callback) {
  jQuery.getScript('scripts/'+scriptName+'.js', callback);
};

// avaMapDetJS map object
// Loads and provides interactive capabilities to Avadepth embedded maps.
avaMapDetJS={
  // Initializes the map interface. Loads layers and map components.
  initMap:function() {
	if(window.location.href.indexOf("fra") > -1) {
	//If url contains 'fra'	use 
		loadJS('incl_ava_defs-fra',function(){});
	} else {
	//If url does not contain 'fra' use
		loadJS('incl_ava_defs-eng',function(){});
	}
    avaMapDetJS.curLayer="";
    avaMapDetJS.curControls=[];

    // Map Options and constructor
    var opNav = new OpenLayers.Control.Navigation({'zoomWheelEnabled':false});
	  var options = {
      maxExtent: new OpenLayers.Bounds(-13625920,6283000,-13941007,6458623),//-125,49,-121,50),
		  controls:[new oscar.Control.PanZoomBar,  opNav],
			projection: new OpenLayers.Projection("EPSG:3857"),
			displayProjection: new OpenLayers.Projection("EPSG:4326"),
			units:"m",
      maxZoomLevel:20,
      minZoomLevel:5
		};

    // allow testing of specific renderers via "?renderer=Canvas", etc
    avaMapDetJS.renderer = OpenLayers.Util.getParameters(window.location.href).renderer;
    avaMapDetJS.renderer = (avaMapDetJS.renderer) ? [avaMapDetJS.renderer] : OpenLayers.Layer.Vector.prototype.renderers;

	  avaMapDetJS.map = new oscar.Map('ava_map_ref',options);
    avaMapDetJS.map.getControlsByClass("OpenLayers.Control.SelectFeature")[0].handlers.feature.stopDown=false;
    //avaMapDetJS.map = new oscar.Map();
    // Google Maps layer
    // Loads Google Satellite map, or Google Street map for <IE9
    var gmap;
    if ( document.addEventListener ){
      gmap = new OpenLayers.Layer.Google("Google Satellite", {type: google.maps.MapTypeId.SATELLITE});
    } else {
      gmap = new OpenLayers.Layer.Google("Google", {});
      //gmap = new OpenLayers.Layer.OSM("Street Map", {});
    }

    var navControl = avaMapDetJS.map.getControlsByClass('OpenLayers.Control.Navigation');
    for (var i = 0; i < navControl.length; i++){
      navControl[i].disableZoomWheel();
    }

    // WMS Avadepth Bathymetry Layer
    var wmsLayer = new OpenLayers.Layer.WMS(
      "Bathymetry",
      "http://www2.pac.dfo-mpo.gc.ca/spatialfusionserver/services/ows/wms/avadepth",
      {layers: "Avadepth_surfaces",transparent:true,isBaseLayer:false,format:'image/png'},
	    {alpha:true}
    );

    // Add layers
   	//avaMapDetJS.map.addLayers([gmap,wmsLayer]);
   	avaMapDetJS.map.addLayers([gmap]);
    //avaMapDetJS.map.zoomToExtent(new OpenLayers.Bounds(-13625920,6283000,-13941007,6458623));
    //avaMapDetJS.map.setCenter(new OpenLayers.LonLat(-13682000,6306500),5);
  },

  /*** General Functions ***/
  renderMap: function(){
    avaMapDetJS.map.render('ava_map_det',avaMapDetJS.mapOptions);
  },

  setPageActivity: function(pageName){
    avaMapDetJS.currentPage=pageName;
    loadJS(pageName+'_func',avaMapDetJS.getPageActivity);
  },

  getPageActivity: function(){
    if(!(avaMapDetJS.curLayer==="")){
      avaMapDetJS.map.removeLayer(avaMapDetJS.curLayer);
      avaMapDetJS.curLayer = "";
    }
    window['avaMapDetJS'][avaMapDetJS.currentPage+'_func'].init();
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
  }

  /*** Functions for each page type ***/
};
