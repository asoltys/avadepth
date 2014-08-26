// Load def JS File
var loadJS=function(scriptName,callback) {
  jQuery.getScript('scripts/'+scriptName+'.js', callback);
};
loadJS('incl_ava_defs',function(){});

// avaMapJS map object
// Loads and provides interactive capabilities to Avadepth embedded maps.
avaMapJS={

  // Default Styles and map constants
  style: {
    col1: '#dd0000',
    col2: '#aaaaaa',
    sel1: '#00ffff',
    black: '#000000',
    white: '#ffffff',
    op1: 0.2,
    op2: 0.1,
    op_sel: 0.5,
    callback_function:undefined,
    cl:function (feat, c1, c2) {return (avaMapJS.style.callback_function(feat) ? c1 : c2)},
    context:{
      getColor: function (feat) {
        return avaMapJS.style.cl(feat, avaMapJS.style.col1, avaMapJS.style.col2)
      },
      getOpacity: function (feat) {
        return avaMapJS.style.cl(feat, avaMapJS.style.op1, avaMapJS.style.op2)
      }
    },
    pt_hover_lbl: function(lbl) {
      return {fillColor: "${getColor}", fillOpacity: "${getOpacity}", pointRadius: 4,
        label: lbl, fontSize: 15, fontWeight: "bold", labelYOffset: 15,
        strokeColor: "${getColor}", labelOutlineOpacity: 0, fontColor: avaMapJS.style.col1}
    },
    pt_select_lbl: function(lbl){
      return {fillColor: avaMapJS.style.sel1,fillOpacity: avaMapJS.style.op_sel,pointRadius: 4,
          label: lbl, fontSize: 15, fontWeight: "bold", labelYOffset: 15,
          strokeColor: avaMapJS.style.sel1, labelOutlineOpacity: 0, fontColor: avaMapJS.style.sel1}
    },
    pt_default_lbl: function(lbl){
      return {fillColor: "${getColor}", fillOpacity: "${getOpacity}", strokeColor: "${getColor}", pointRadius: 2.5,
            label:lbl, fontColor: "${getColor}", fontSize: 15, fontWeight: "bold", labelYOffset: 15}
    },
    area_default: function(){
      return {fillColor: "${getColor}", fillOpacity: "${getOpacity}", strokeColor: "${getColor}", strokeWidth: 2.0}
    },
    area_select:function(){
      return {fillColor: avaMapJS.style.sel1, strokeColor: avaMapJS.style.sel1}
    },
    area_hover:function(){
      return {fillColor: '${getColor}', strokeColor: '${getColor}', fillOpacity: avaMapJS.style.op_sel}
    },
    area_default_lbl: function(lbl){
      return {fillColor: "${getColor}", fillOpacity: "${getOpacity}", strokeColor: "${getColor}", strokeWidth: 2.0,
          label:lbl, fontColor: avaMapJS.style.black, fontSize: 15, fontWeight: "bold", labelYOffset: 15}
    },
    area_select_lbl: function(lbl){
      return {fillColor: avaMapJS.style.sel1, strokeColor: avaMapJS.style.sel1,
          label: lbl, fontSize: 15, fontWeight: "bold", fontColor: "black",
          labelOutlineColor: avaMapJS.style.sel1, labelOutlineWidth: 2
        }
    },
    area_hover_lbl: function(lbl){
      return {fillColor: '${getColor}', strokeColor: '${getColor}',
            label: lbl, fontSize: 15, fontWeight: "bold", fontColor: "black",
            labelOutlineColor: "${getColor}", labelOutlineWidth: 2, fillOpacity: avaMapJS.style.op_sel
          }
    },
    point_with_label: function (label_value) {
      return new OpenLayers.StyleMap({
        'default': new OpenLayers.Style(avaMapJS.style.pt_default_lbl(label_value),{context:avaMapJS.style.context}),
        'temporary': new OpenLayers.Style(avaMapJS.style.pt_hover_lbl(label_value),{context:avaMapJS.style.context}),
        'select': new OpenLayers.Style(avaMapJS.style.pt_select_lbl(label_value))
      })
    },
    area_no_label: function () {
      return new OpenLayers.StyleMap({
        'default': new OpenLayers.Style(avaMapJS.style.area_default(),{context:avaMapJS.style.context}),
        'select': new OpenLayers.Style(avaMapJS.style.area_select()),
        'temporary': new OpenLayers.Style(avaMapJS.style.area_hover(),{context:avaMapJS.style.context})
      })
    },
    area_with_label: function (lbl) {
      return new OpenLayers.StyleMap({
        'default':new OpenLayers.Style(avaMapJS.style.area_default(),{context:avaMapJS.style.context}),
        'select': new OpenLayers.Style(avaMapJS.style.area_select_lbl(lbl)),
        'temporary': new OpenLayers.Style(avaMapJS.style.area_hover_lbl(lbl),{context:avaMapJS.style.context})
      })
    }
  },
      // Initializes the map interface. Loads layers and map components.
  initMap:function() {
    avaMapJS.curLayer="";
    avaMapJS.curControls=[];

    // Map Options and constructor
	  var options = {
      maxExtent: new OpenLayers.Bounds(-13625920,6283000,-13941007,6458623),//-125,49,-121,50),
		  controls:[new oscar.Control.PanZoomBar,  new OpenLayers.Control.MousePosition, new OpenLayers.Control.ScaleLine],
			projection: new OpenLayers.Projection("EPSG:3857"),
			displayProjection: new OpenLayers.Projection("EPSG:4326"),
			units:"m",
      maxZoomLevel:20,
      minZoomLevel:5
		};
		avaMapJS.map = new oscar.Map('ava_map_ref',options);
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
   	avaMapJS.map.addLayers([gmap,wmsLayer]);
   	//avaMapJS.map.addLayers([gmap]);
    //avaMapJS.map.zoomToExtent(new OpenLayers.Bounds(-13625920,6283000,-13941007,6458623));
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
    window['avaMapJS'][avaMapJS.currentPage+'_func'].init();
  },

  setMapLayer: function(newLayer){
    if(!avaMapJS.curLayer==""){
      avaMapJS.map.removeLayer(avaMapJS.curLayer);
    }
    avaMapJS.curLayer=newLayer;
    // Add layer
   	avaMapJS.map.addLayer(avaMapJS.curLayer);
  },

  setMapControls: function(newControls){
    if(!avaMapJS.curControls.length==0){
      for(var c in avaMapJS.curControls){
        avaMapJS.map.removeControl(avaMapJS.curControls[c]);
      }
    }
    avaMapJS.curControls=newControls;
    for(var c in newControls){
      avaMapJS.map.addControl(newControls[c]);
      newControls[c].activate();
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
  }
  /*** Functions for each page type ***/

};
