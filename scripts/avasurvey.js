var map;
// Waterways map extents (in EPSG:3857)
var surveyDrawingExtents={
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

// avaSurvey map object
// Loads and provides interactive capabilities to Avadepth embedded maps.
avaSurvey={
    // Initializes the map interface. Loads layers and map components.
	initMap:function() {

        // Map Options and constructor
		var options = {
				controls:[new oscar.Control.PanZoomBar,  new OpenLayers.Control.MousePosition, new OpenLayers.Control.ScaleLine],
				projection: new OpenLayers.Projection("EPSG:3857"),
				displayProjection: new OpenLayers.Projection("EPSG:4326"),
				units:"m"
			};
		avaSurvey.map = new oscar.Map('avadepth_map',options);
        avaSurvey.curWaterway="";
        avaSurvey.curLocation="";

        // KML Feature Styles and KML Layer
        avaSurvey.tiles = new OpenLayers.Layer.Vector("KML", {
            strategies: [new OpenLayers.Strategy.Fixed()],
            projection: avaSurvey.map.displayProjection,
            styleMap: new OpenLayers.StyleMap({
                'default': new OpenLayers.Style(
                    {fillColor: "${getColor}",fillOpacity:"${getOpacity}",strokeColor:"${getColor}",strokeWidth:2.0,title:'${Name}'},
                    {context:{
                        getColor: function (feat) {
                          if (avaSurvey.checkTileRefresh(feat) == true)
                            return '#dd0000';
                          else
                            return '#aaaaaa';
                        },
                        getOpacity: function (feat) {
                          if (avaSurvey.checkTileRefresh(feat) == true)
                            return 0.2;
                          else
                            return 0.1;
                        }
                      }
                    }
                ),
                'select': new OpenLayers.Style({fillColor: '#00ffff',strokeColor: '#00ffff',title:'${Name}'})
            }),
            protocol: new OpenLayers.Protocol.HTTP({
                url: "tiles.kml?",
                format: new OpenLayers.Format.KML({
                    extractStyles: false,
                    extractAttributes: true,
                    maxDepth: 2
                })
            })
        });

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
		avaSurvey.map.addLayers([gmap,wmsLayer,avaSurvey.tiles]);

        // Map Interaction parameters
		avaSurvey.HLFeat = new OpenLayers.Control.SelectFeature(avaSurvey.tiles, {
			hover: true,
			highlightOnly: true,
			renderIntent: "temporary"
		});
		avaSurvey.map.addControl(avaSurvey.HLFeat);
		avaSurvey.HLFeat.activate();
		avaSurvey.tiles.events.on({'featureselected': avaSurvey.tileSelect});

        // Sets extents of map
		avaSurvey.setExtents("FRSA");
	},

    // setExtents: Using the name of provided Waterways selector, draw extents from 'locationExtents' dict.
	setExtents: function(waterway) {
        if (!waterway) {
            return;
        }
        var obj = surveyDrawingExtents[waterway];
        try {
           avaSurvey.map.zoomToExtent(new OpenLayers.Bounds(obj.Lon.min, obj.Lat.min, obj.Lon.max, obj.Lat.max));
        } catch(err){}
        avaSurvey.refreshTiles(waterway,"");
	},

    // tileSelect: callBack function for tile selection from the map interface
	tileSelect: function(tile){
		var tileName=tile.feature.data.name;
        if(tileName.indexOf('/')>=0) {parent.window.open("http://www2.pac.dfo-mpo.gc.ca"+tileName,'_blank');}
        else {parent.sdbbds_functions.getSurveyDrawingsFromTiles({"tile": tileName});}
	},

    // refreshTiles: function to refresh the draw of the tile layer using the new selected form settings
    refreshTiles: function(ww,lo){
        if (!ww){ return }
        avaSurvey.curWaterway=ww;
        avaSurvey.curLocation=lo;
        avaSurvey.tiles.redraw();
    },

    // checkTileRefresh: checks if the tile's attributes match the currently selected values
    checkTileRefresh: function(feat){
        var temp;
        if(avaSurvey.curLocation != "" || avaSurvey.curLocation != "Channel"){
          temp = feat.attributes.location.value==avaSurvey.curLocation;
        } else {
          temp = true;
        }

        return temp && (feat.attributes.waterway.value == avaSurvey.curWaterway)
    }
};
