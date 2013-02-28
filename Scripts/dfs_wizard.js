/// <reference path="VeJavaScriptIntellisenseHelper.js" />
/// <reference path="jquery.virtualearth-vsdoc.js" />

<!--

var map;
var drw;
var currentPt = null;

$(document).ready(function() {

    hideMapDefines();
    //$('#mapmessage').hide();
    $('#defineOnPre').hide();

    pageInit();

    //
    map = $("#myMap").veMap({
            latlong: new VELatLong(47, -120), // A VELatLong Class object that represents the center of the map. Optional.
            zoom: 9,                        // The zoom level to display. Valid values range from 1 through 19. Optional. Default is 4.
            style: VEMapStyle.Road,       // A VEMapStyle Enumeration value specifying the map style. Optional. Default is VEMapStyle.Road.
            fixed: false,                   // A Boolean value that specifies whether the map view is displayed as a fixed map that the user cannot change. Optional. Default is false.
            mode: VEMapMode.Mode2D,         // A VEMapMode Enumeration value that specifies whether to load the map in 2D or 3D mode. Optional. Default is VEMapMode.Mode2D.
            showSwitch: true,               // A Boolean value that specifies whether to show the map mode switch on the dashboard control. Optional. Default is true (the switch is displayed).
            tileBuffer: 0,                  // How much tile buffer to use when loading map. Default is 0 (do not load an extra boundary of tiles). This parameter is ignored in 3D mode.
            mapOptions: (function() {        // A VEMapOptions Class that specifies other map options to set.
                var opt = new VEMapOptions();
                opt.LoadBaseTiles = true;
                return opt;
            })()
        });
        
    var x = parseInt(($('#tabs-3').width() - 20) / 2);
    //map.Resize(600,200);
    map.createVELayer('scratchLayer');
    
    drw = new Tetrad.Drawing(null,map.veMapGet());
    
    // create new geoprocessor task
    task = new  ESRI.ArcGIS.VE.Geoprocessor();
    task.Url = "http://sampleserver1.arcgisonline.com/ArcGIS/rest/services/Network/ESRI_DriveTime_US/GPServer/CreateDriveTimePolygons";

    //AddMyControl();

    //map.veMapAttachEvent("onmousemove", VEMap_MouseMoveDelegate); // Attach the "onmousemove" event to the VEMap_MouseMoveDelegate method defined below.
//    map.veMapAttachEvent("onclick", VEMap_MouseClickDelegate); // Attach the "onmousemove" event to the VEMap_MouseMoveDelegate method defined below.
    
    $.ajaxSetup({ cache: false });
    
    alert("/Test/StudyAreas/" + i);
    $.getJSON("/Test/StudyAreas/" + i, null, function(data) {
        $("#savedarea").addItems(data, 'AreaName', 'StudyAreaID');
    });

    $('#subs').change(function() {
        $.getJSON("/Test/Categories/" + this.value, null, function(data) {
            $("#categories").addItems(data, 'CategoryName', 'TemplateID');
        });
    });

    $('#addarea').click(function() {
        map.Clear();
        var pt = new VELatLong(45.01188, -111.06687);
        map.AddShape(new VEShape(VEShapeType.Pushpin, pt));
        map.SetCenterAndZoom(pt, 10);
        $('#defareas')[0].add(new Option($('#predef').val(), "xx"));
    });
    $('#removearea').click(function() {
        $('#defareas :selected').remove();
    });
    
    $('#CircleTool').click(function() {
        map.veMapAttachEvent("onclick", VEMap_MouseClickDelegate);
//        drw.Draw('point',this,CircleHandler);
    });
    $('#DriveTimeTool').click(function() {
        drw.Draw('point',this,DTHandler);
    });
    $('#PolygonTool').click(function() {
        drw.Draw('polygon',this,PolygonHandler);
    });
    $('#addarea').click(function() {
        map.Clear();
        var pt = new VELatLong(45.01188, -111.06687);
        map.AddShape(new VEShape(VEShapeType.Pushpin, pt));
        map.SetCenterAndZoom(pt, 10);
        $('#defareas')[0].add(new Option($('#predef').val(), "xx"));
    });
    $('#removearea').click(function() {
        $('#defareas :selected').remove();
    });
    
    $('#CircleTool').click(function() {
        map.veMapAttachEvent("onclick", VEMap_MouseClickDelegate);
//        drw.Draw('point',this,CircleHandler);
    });
    $('#DriveTimeTool').click(function() {
        drw.Draw('point',this,DTHandler);
    });
    $('#PolygonTool').click(function() {
        drw.Draw('polygon',this,PolygonHandler);
    });

    $('#findButton').click(function() { findLoc(); });
     
    // hide/unhide the map define settings
    $('#studyMap').click(function() { hideMapDefines(); });
    $('#studyAddress').click(function() {
        hideMapDefines();
        $('#mapDefineAddress').show();
    });
    $('#studyCoord').click(function() {
        hideMapDefines();
        $('#mapDefineCoord').show();
    });

    $('#keylist').blur(function() { 
        var map =$('#myMap').veMapGet();

        var layer = VEToolkit.Map.GetShapeLayerByTitle($('#myMap').veMapGet(),"scratchLayer");
        layer.DeleteAllShapes();

        var radii = $('#keylist').val().split(",");

        for(i = 0; i < radii.length; i++){
	        var r = parseFloat(radii[i]);
            var points = VEToolkit.Drawing.DrawCircle(currentPt, r, VEToolkit.Math.EarthRadius.Miles); /// <-- 500 Miles
            var s = new VEShape(VEShapeType.Polyline, points);
            s.SetLineWidth(2);
            s.SetLineColor(new VEColor(0,150,100,1.0));
            s.SetFillColor(new VEColor(0,100,150,0.5));

            layer.AddShape(s);
        }

        
        


//            tempCircle = new VEShape(VEShapeType.Polygon, drw.GetCircle());
  //          tempCircle.HideIcon();
    //        $('#myMap').veMapGet().AddShape(tempCircle);

    } );

    $('#inputLat').blur(function() { $('#txtWhere').val(''); } );
    $('[name=type]').click(function() {
        var abc = $('[name=type]:checked').val() == 5;
        $('#savedarea').attr('disabled', (abc ? '' : 'disabled'));

        if ($('[name=type]:checked').val() == 4) {
            $('#defineOnPre').show();
            $('#defineOnMap').hide();
        }
        else {
            $('#defineOnPre').hide();
            $('#defineOnMap').show();
        }


        $('#tabs').tabs(($('[name=type]:checked').val() == 5) ? 'disable' : 'enable', 3);
    });


    $('#tabs').bind('tabsshow', function(event, ui) {
        if (ui.panel.id == "tabs-3") {
            $('#myMap').veMapGet().Resize(ui.panel.clientWidth-100,ui.panel.clientHeight-100);
        }
    });

    $("#predef").autocomplete("/Test/Lookup", {
        dataType: 'json',
        minChars: 3,
        width: 300,
        autoFill: true,
        matchContains: true,
        highlightItem: false,
        parse: function(data) {
            var rows = new Array();
            for (var i = 0; i < data.length; i++) {
                rows[i] = { data: data[i], value: data[i].CoverageName, result: data[i].CoverageName };
            }
            return rows;
        },
        formatItem: function(row, i, n) { return row.CoverageName + ' (' + row.CoverageCode + ')'; }
    });

  // Get Subscriptions
    $.getJSON("/Test/Organization", null, function(data) {
        $("#organization").html(data);
    });

    $.getJSON("/Test/Subscriptions/1", null, function(data) {
        $("#subs").addItems(data, 'SubscriptionName', 'SubscriptionID');
    });

    $('#predef').hint('hint');
    var $tabs = $('#tabs').tabs({});
    
//    $('#SearchPanel').dialog();


$(".ui-tabs-panel").each(function(i) {

    var totalSize = $(".ui-tabs-panel").size() - 1;

    if (i != totalSize) {
        next = i + 2;
        $(this).append("<a href='#' class='next-tab mover' rel='" + next + "'><img src=/content/images/next-bottom.png></a>");
    }

    if (i != 0) {
        prev = i;
        $(this).append("<a href='#' class='prev-tab mover' rel='" + prev + "'><img src=/content/images/back-bottom.png></a>");
    }

});

$('.next-tab, .prev-tab').click(function() {
    $tabs.tabs('select', $(this).attr("rel"));
    return false;
});


       function AddMyControl()
         {
            var map = $('#myMap').veMapGet();
            var search = document.getElementById("SearchPanel");
            map.AddControl(search);
            //search.style.left = map.GetLeft();
            //search.style.top = "-200px";
            //addShim(search);
         }
});

         function addShim(el)
         {
            var shim = document.createElement("iframe");
            shim.id = "myShim";
            shim.frameBorder = "0";
            shim.style.position = "absolute";
            shim.style.zIndex = "1";
            shim.style.top  = el.offsetTop;
            shim.style.left = el.offsetLeft;
            shim.width  = el.offsetWidth;
            shim.height = el.offsetHeight;
            el.shimElement = shim;
            el.parentNode.insertBefore(shim, el);
         }


function hideMapDefines() {
    $("#mapDefineAddress").hide();
    $("#mapDefineCoord").hide();
}

function findLoc() {
    try {
        var map = $("#myMap").veMapGet();
        if ($('#txtWhere').val() != '') {
            
            map.Find(null, $("#txtWhere").val(), null, null, null, null, null, null, true, null, callback);
        }
        else {
            map.SetCenter(new VELatLong($('#inputLat').val(),$('#inputLon').val()));
        }
    }
    catch (e) {
        alert(e.message);
    }
}

function callback(a, b, c, d, e) {
    if (c != null && c.length > 1) {
        var results = "More than one location was retruned. Please select the location you were looking for:<br>";
        for (x = 0; x < c.length; x++) {
            results += "<a href='javascript:map.Find(null, \"" + c[x].Name + "\");'>" + c[x].Name + "</a><br>";
        }
        $('resultDiv').html = results;
    }
}
   
    // This is the "delegate" that will be called directly by the "onmousemove" event.
    function VEMap_MouseMoveDelegate(e) {
        // Call the Event handler method, and pass it both the jQuery object and VEMapEvent object.
        VEMap_MouseMoveHandler($("#myMap"), e);
    };

    // This is the "delegate" that will be called directly by the "onmousemove" event.
    function VEMap_MouseClickDelegate(e) {
        // Call the Event handler method, and pass it both the jQuery object and VEMapEvent object.
        VEMap_MouseClickHandler($("#myMap"), e);
    };

    // This is the Event Handler method for the "onmousemove" event.
    function VEMap_MouseMoveHandler(jquery, e) {
        // Get a reference to the VEMap object
        var map = jquery.veMapGet();

        // Get the Lat/Long location of the Mouse
        var mouseLatLong = map.PixelToLatLong(new VEPixel(e.mapX, e.mapY));

        // Display the Current Location (Lat/Long) of the Mouse next to the VEMap
        $("#lblCurrentLocation").html("Lat: " + mouseLatLong.Latitude + "<br/>Long: " + mouseLatLong.Longitude);
    }
    
        // This is the Event Handler method for the "onmousemove" event.
    function VEMap_MouseClickHandler(jquery, e) {
        // Get a reference to the VEMap object
        var map = jquery.veMapGet();

        // Get the Lat/Long location of the Mouse
        var mouseLatLong = map.PixelToLatLong(new VEPixel(e.mapX, e.mapY));
        currentPt = mouseLatLong;
        map.AddShape(new VEShape(VEShapeType.Pushpin, mouseLatLong));
        
        var map =$('#myMap').veMapGet();
        $('#mapmessage').dialog( {
            modal: true, autoOpen: true, hide: 'slide',
            buttons: { 
                "Add Area": function() { 
                $.post("/DFS/CreateCircle", { id: 1, latitude: mouseLatLong.Latitude, longitude: mouseLatLong.Longitude, name: $('#areaName').val(), radiusList: $('#keyList').val(), shared: false }, function(data) { alert("Successfully Added."); }); }, 
                "Cancel": function() {$(this).hide(); } }
        });
        
        $('#myMap').veMapDetachEvent("onclick", VEMap_MouseClickDelegate);     
    }
   
   function AddCircle() {
    
   }
   
   function DTHandler() {
        alert ('Drive Time Handler');
        var map = $('#myMap').veMapGet();
       map.DeleteAllShapes();
            // define a new gp feature record set layer
            var ctr = map.GetCenter();
            var geom = {x: ctr.Longitude,y: ctr.Latitude};
            var feature = {geometry : geom};
            var infeatures = { features: [feature] };
            var drivetimes = "1 2 3";
            // create a new array and add the input parameters
            var parameters = new Array();
            parameters.push(new ESRI.ArcGIS.VE.ParameterValue("Input_Location","GPFeatureRecordSetLayer", infeatures));
            parameters.push(new ESRI.ArcGIS.VE.ParameterValue("Drive_Times", "GPString", drivetimes));
            // send the request, passing the array of parameters and the response function
            task.Execute(parameters, showResults);

        
   }
   
      // function to process response
        function showResults(data) {
        var map = $('#myMap').veMapGet();

            // check for error. . . if none, add returned shapes to map
            var err = data.Error;
            if (err!=null) 
                alert(err.message);
            else {
                // create new ve shapelayer
                var layer = new VEShapeLayer(); 
                var results = data.Results;
                if (results.length > 0) {
                    // loop through returned shapes, set colors, and add to shapelayer
                    for (var d=0;d<results.length;d++) {
                        var features =results[d].Value.Features;
                        for (var f=0;f<features.length;f++) {
                            var shapes = features[f].Shapes;
                            if(f == 0) {
                                  color = new VEColor(255,153,153,0.5);
                            } else if(f== 1) {
                                  color = new VEColor(255,255,153,0.5);
                            } else if(f== 2) {
                                  color = new VEColor(153,153,255,0.5);
                            }
                            var lineColor = new VEColor(0,0,0,0.5);
                            for (var ss=0;ss<shapes.length;ss++) {
                                var shape = shapes[ss];
                                shape.SetLineColor(lineColor);
                                shape.SetFillColor(color);
                                shape.SetLineWidth(2);
                                shape.HideIcon();
                                shape.Show();
                                layer.AddShape(shape);
                            }
                        }
                    }
                }
                // add shapelayer to map
                map.AddShapeLayer(layer);
                layer.Show();
            }

        }

   
   function PolygonHandler() {
        alert ('PolygonHandler');
   }     
-->