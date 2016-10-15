// Load def JS File
var loadJS=function(scriptName,callback) {
  jQuery.getScript('scripts/'+scriptName+'.js', callback);
};

// avaMapJS map object
// Loads and provides interactive capabilities to Avadepth embedded maps.
avaMapJS={

      // Initializes the map interface. Loads layers and map components.
  initMap:function() {
	if(window.location.href.indexOf("fra") > -1) {
	//If url contains 'fra'	use 
		loadJS('incl_ava_defs-fra',function(){});
	} else {
	//If url does not contain 'fra' use
		loadJS('incl_ava_defs-eng',function(){});
	}
    avaMapJS.curLayer="";
    avaMapJS.curControls=[];

    // Map Options and constructor
    var opNav = new OpenLayers.Control.Navigation({'zoomWheelEnabled':false});
	  var options = {
      maxExtent: new OpenLayers.Bounds(-13625920,6283000,-13941007,6458623),//-125,49,-121,50),
		  controls:[new oscar.Control.PanZoomBar,  new OpenLayers.Control.MousePosition, new OpenLayers.Control.ScaleLine, opNav],
			projection: new OpenLayers.Projection("EPSG:3857"),
			displayProjection: new OpenLayers.Projection("EPSG:4326"),
			units:"m",
      maxZoomLevel:20,
      minZoomLevel:5
		};

    // allow testing of specific renderers via "?renderer=Canvas", etc
    avaMapJS.renderer = OpenLayers.Util.getParameters(window.location.href).renderer;
    avaMapJS.renderer = (avaMapJS.renderer) ? [avaMapJS.renderer] : OpenLayers.Layer.Vector.prototype.renderers;

		avaMapJS.map = new oscar.Map('ava_map_ref',options);
    avaMapJS.map.getControlsByClass("OpenLayers.Control.SelectFeature")[0].handlers.feature.stopDown=false;
    // Google Maps layer
    // Loads Google Satellite map, or Google Street map for <IE9
    var gmap;
    if ( document.addEventListener ){
      gmap = new OpenLayers.Layer.Google("Google Satellite", {type: google.maps.MapTypeId.SATELLITE});
    } else {
      gmap = new OpenLayers.Layer.Google("Google", {});
      //gmap = new OpenLayers.Layer.OSM("Street Map", {});
    }

    var navControl = avaMapJS.map.getControlsByClass('OpenLayers.Control.Navigation');
    for (var i = 0; i < navControl.length; i++){
      navControl[i].disableZoomWheel();
    }

    // WMS Avadepth Bathymetry Layer
    var wmsLayer = new OpenLayers.Layer.WMS(
      "Bathymetry",
      "http://www2.pac.dfo-mpo.gc.ca/spatialfusionserver/services/ows/wms/avadepth",
      {layers: "Avadepth_surfaces",transparent:true,isBaseLayer:false,format:'image/png'},
      //"http://localhost:8080/spatialfusionserver/services/ows/wms/bdb",
      //{layers: "sample_depth",transparent:true,isBaseLayer:false,format:'image/png'},
	    {alpha:true}
    );

    // Add layers
   	//avaMapJS.map.addLayers([gmap,wmsLayer]);
   	avaMapJS.map.addLayers([gmap]);
    //avaMapJS.map.zoomToExtent(new OpenLayers.Bounds(-13625920,6283000,-13941007,6458623));
    if(!avaMapJS.map.size) {
      window.location.reload(true);
    }
    avaMapJS.map.setCenter(new OpenLayers.LonLat(-13682000,6306500),5);

    // Notify parent page map is active
    parent.avaIFaceJS.init();
  },

  /*** General Functions ***/
  setPageActivity: function(pageName){
    avaMapJS.currentPage=pageName;
    loadJS(pageName+'_func',avaMapJS.getPageActivity);
  },

  getPageActivity: function(){
    if(!(avaMapJS.curLayer==="")){
      avaMapJS.map.removeLayer(avaMapJS.curLayer);
      avaMapJS.curLayer = "";
    }
    avaMapJS.setExtents("FR");
    window['avaMapJS'][avaMapJS.currentPage+'_func'].init();
  },

  setMapLayer: function(newLayer){
    avaMapJS.curLayer=newLayer;
    // Add layer
   	avaMapJS.map.addLayer(avaMapJS.curLayer);
  },

  setMapControls: function(newControls){
    if(!(avaMapJS.curControls.length==0)){
      for(var c in avaMapJS.curControls){
        avaMapJS.map.removeControl(avaMapJS.curControls[c]);
      }
    }
    avaMapJS.curControls=newControls;
    for(var c in newControls){
      avaMapJS.map.addControl(newControls[c]);
      //newControls[c].activate();
    }
    //avaMapJS.map.addControls(avaMapJS.curControls);
  },

  setExtents: function(name){
    if(!name){
      return
    }
    var obj=incl_ava_defs.locDefs[name].Coords;
    try{
      avaMapJS.map.zoomToExtent(new OpenLayers.Bounds(obj.Lon.min, obj.Lat.min, obj.Lon.max, obj.Lat.max));
    } catch (ex){}
  },
  proxySelect: function(evt){
    console.log(evt);
  }
  /*** Functions for each page type ***/

};
