var map;
var locationExtents={
	'BR':{'Lat':{'min':6450273,'max':6458623},'Lon':{'min':-13948221,'max':-13941007}},
	'CR':{'Lat':{'min':6386978,'max':6394557},'Lon':{'min':-13918640,'max':-13904727}},
	'FRMA':{'Lat':{'min':6290650,'max':6315727},'Lon':{'min':-13685417,'max':-13610377}},
	'FRSA':{'Lat':{'min':6287000,'max':6317590},'Lon':{'min':-13730400,'max':-13669354}},
	'FRNA':{'Lat':{'min':6302401,'max':6318147},'Lon':{'min':-13724567,'max':-13679776}},
	'FRUR':{'Lat':{'min':6293247,'max':6349886},'Lon':{'min':-13625920,'max':-13510906}},
	'PR':{'Lat':{'min':6312424,'max':6352933},'Lon':{'min':-13669210,'max':-13633754}},
	'SQ':{'Lat':{'min':6389408,'max':6397810},'Lon':{'min':-13712876,'max':-13706003}},
	'VFPA':{'Lat':{'min':6317745,'max':6330830},'Lon':{'min':-13729411,'max':-13691381}},
	'FPORT':{'Lat':{'min':6305047,'max':6308238},'Lon':{'min':-13684111,'max':-13680844}}
  };

//Added by WS
avaSurvey={
	initMap:function() {
		var options = {
				controls:[new oscar.Control.PanZoomBar,  new OpenLayers.Control.MousePosition, new OpenLayers.Control.ScaleLine],
				projection: new OpenLayers.Projection("EPSG:3857"),
				displayProjection: new OpenLayers.Projection("EPSG:4326"),
				units:"m"
				//size: new OpenLayers.Size(640,370)
			};
		avaSurvey.map = new oscar.Map('avadepth_map',options);
		var encstyle=new OpenLayers.Style({fillColor: '#dd0000',fillOpacity:0.2,strokeColor:'#dd0000',strokeWidth:2.0,title:'${name}'});
		var encselect=new OpenLayers.Style({fillColor: '#00ffff',strokeColor: '#00ffff'});
		avaSurvey.ENCStyle=new OpenLayers.StyleMap({'default': encstyle, 'select': encselect});
		//avaSurvey.SelStyle={fillColor: '#0000cc', strokeColour: '#0000cc'};

		//var osmLayer = new OpenLayers.Layer.OSM("OpenStreetMap", {wrapDateLine:true,isBaseLayer:true});
        var gmap = new OpenLayers.Layer.Google("Google Satellite", {type: google.maps.MapTypeId.SATELLITE, visibility: false});
        var wmsLayer = new OpenLayers.Layer.WMS(
            "Bathymetry",
            "http://www2.pac.dfo-mpo.gc.ca/spatialfusionserver/services/ows/wms/avadepth",
            {layers: "Avadepth_surfaces",transparent:true,isBaseLayer:false},
	        {alpha:true}
        );
		avaSurvey.tiles = new OpenLayers.Layer.Vector("KML", {
			strategies: [new OpenLayers.Strategy.Fixed()],
			projection: avaSurvey.map.displayProjection,
			styleMap: avaSurvey.ENCStyle,
			protocol: new OpenLayers.Protocol.HTTP({
				url: "tiles.kml?",
				format: new OpenLayers.Format.KML({
					extractStyles: false,
					extractAttributes: true,
					maxDepth: 2
				})
			})
		});
		avaSurvey.map.addLayers([gmap,wmsLayer,avaSurvey.tiles]);
		avaSurvey.HLFeat = new OpenLayers.Control.SelectFeature(avaSurvey.tiles, {
			hover: true,
			highlightOnly: true,
			renderIntent: "temporary"
		});
		avaSurvey.map.addControl(avaSurvey.HLFeat);
		avaSurvey.HLFeat.activate();
		avaSurvey.tiles.events.on({'featureselected': avaSurvey.tileSelect});
		avaSurvey.setExtents("FRSA");
	},
	setExtents: function(waterway) {
        if (!waterway) {
            return;
        }
        var obj = locationExtents[waterway];
        try {
           avaSurvey.map.zoomToExtent(new OpenLayers.Bounds(obj.Lon.min, obj.Lat.min, obj.Lon.max, obj.Lat.max));
        } catch(err){}
	},
	tileSelect: function(tile){
		var feat=tile.feature.data;
		var tileName=feat.name;
        if(tileName.indexOf('/')>=0)
            {parent.window.open("http://www2.pac.dfo-mpo.gc.ca"+tileName,'_blank');}
		parent.sdbbds_functions.getSurveyDrawingsFromTiles({"tile":tileName});
		//document.getElementById('objInfo').innerHTML=feat.description;
	},
    setBGColor: function(color){
        document.body.style.backgroundColor=color;
    }
};
