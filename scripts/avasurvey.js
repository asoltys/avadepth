
var map;
var locationExtents={
	'BR':{'Lat':0,'Lon':0,'Scale':10},
	'CR':{},
	'FRMA':{},
	'FRSA':{'Lat':{'min':6287000,'max':6317590},'Lon':{'min':-13730400,'max':-13669354}},
	'FRNA':{'Lat':{'min':6298416.79,'max':6321411.56},'Lon':{'min':-13730449.31,'max':-13676994.89}},
	'FRUR':{},
	'PR':{},
	'SQ':{},
	'VFPA':{},
	'FPORT':{}
  };

//Added by WS
avaSurvey={
	initMap:function() {
		var options = {
				controls:[new oscar.Control.PanZoomBar,  new OpenLayers.Control.MousePosition, new OpenLayers.Control.ScaleLine],
				projection: new OpenLayers.Projection("EPSG:3857"),
				displayProjection: new OpenLayers.Projection("EPSG:4326"),
				units:"m"
			};
		avaSurvey.map = new oscar.Map('avadepth_map',options);
		var encstyle=new OpenLayers.Style({fillColor: '#dd0000',fillOpacity:0.0,strokeColor:'#dd0000',strokeWidth:1.0});
		var encselect=new OpenLayers.Style({fillColor: '#00ffff',strokeColor: '#00ffff'});
		avaSurvey.ENCStyle=new OpenLayers.StyleMap({'default': encstyle, 'select': encselect});
		avaSurvey.SelStyle={fillColor: '#0000cc', strokeColour: '#0000cc'};

		var osmLayer = new OpenLayers.Layer.OSM({wrapDateLine:true,isBaseLayer:true});
		avaSurvey.tiles = new OpenLayers.Layer.Vector("KML", {
			strategies: [new OpenLayers.Strategy.Fixed()],
			projection: avaSurvey.map.displayProjection,
			styleMap: avaSurvey.ENCStyle,
			maxScale: 1,
			minScale: 25000,
			protocol: new OpenLayers.Protocol.HTTP({
				url: "tiles.kml",
				format: new OpenLayers.Format.KML({
					extractStyles: false,
					extractAttributes: true,
					maxDepth: 2
				})
			})
		});
		avaSurvey.map.addLayers([osmLayer,avaSurvey.tiles]);
		avaSurvey.HLFeat = new OpenLayers.Control.SelectFeature(avaSurvey.tiles, {
			hover: true,
			highlightOnly: true,
			renderIntent: "temporary"
		});
		avaSurvey.map.addControl(avaSurvey.HLFeat);
		avaSurvey.HLFeat.activate();
		avaSurvey.tiles.events.on({'featureselected': avaSurvey.tileSelect});
		avaSurvey.map.setCenter(new OpenLayers.LonLat(-13705000,6305000),10);
		avaSurvey.setExtents("FRSA");
	},
	setExtents: function(waterway){
		obj=locationExtents[waterway];
		avaSurvey.map.zoomToExtent(new OpenLayers.Bounds(obj.Lon.min,obj.Lat.min,obj.Lon.max,obj.Lat.max));
	},
	tileSelect: function(tile){
		feat=tile.feature.data;
		tileName=tile.feature.attributes.name;
		parent.sdbbds_functions.getSurveyDrawingsFromTiles({"tile":tileName});
		//document.getElementById('objInfo').innerHTML=feat.description;
	},
	tileZoom: function(tile){
		avaSurvey.setExtents(tile.feature.attributes.name);
	}
}