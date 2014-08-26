/**
 * Created by wsiddall on 26/08/2014.
 */


if(!(typeof avaIFaceJS === 'undefined')) {

/*** Interface functions ***/
  avaIFaceJS.pwl_func= {

    // local variables
    table: null,
    report_title1: "",
    report_title2: "",
    static_arm: "South Arm",
    static_date: "",
    static_interval: "1 hour",
    static_discharge: "",
    static_discharge_eval: "Prediected",
    cur_waterway: null,

    init: function () {
      // Colour Markers when river changes
      $('#fraser_river').change(function () {
        avaIFaceJS.mapJS.pwl_func.setExtents($(this).val());
      });

      /*** Set Event Triggers ***/

        // Changing date value in Parameters window
      $('#pwl_date').on('change', function () {
        //TODO: Replace for Production
        //$.getJSON("/api/depths?date="+($('#pwl_date').val()), function(data){
        $.getJSON("api/depths/date.json", function (data) {
          $('#selected_discharge').empty();
          $.each(data.Flowrates, function () {
            return $('#selected_discharge').append("<option value='" + this + "'>" + this + "</option>");
          });
          $('#predicted_discharge').text(data.Predicted);
          $('#actual_discharge').text(data.Actual);
          if (data.Actual) {
            $('#actual_radio').attr('disabled', false).prop('checked', true);
            $("#predicted_radio").attr('disabled', true);
          } else {
            $("#actual_radio").attr('disabled', true);
            $("#predicted_radio").attr('disabled', false).prop('checked', true);
          }
          $('input[name=discharge]:checked').change();
          avaIFaceJS.pwl_func.static_date = $('pwl_date').val();
          //TODO: Delete -> return $('#static-date').text($('#pwl_date').val());
          return avaIFaceJS.pwl_func.updateReportTitle();
        });
      }).datepicker().datepicker('setDate', new Date()).change();

      $('#selected_discharge').change(function () {
        $('#discharge_radio').prop('checked', true).change();
        if ($('input[name=discharge]:checked').val() === "Defined") {
          $('#flowRate').val($(this).val());
          avaIFaceJS.pwl_func.static_discharge = $('#defined_discharge').val();
          //TODO: Delete -> return $('#static-discharge').text($('#defined_discharge').val());
        }
      });
      $('input[name=discharge]').change(function () {
        var flowRate_txt, flowrate, flowtype;
        flowrate = (function () {
          switch ($(this).val()) {
            case 'Actual':
              return $('#actual_discharge').text();
            case 'Predicted':
              return $('#predicted_discharge').text();
            case 'Defined':
              return $('#defined_discharge').val();
            case 'Selected':
              return $('#selected_discharge').val();
          }
        }).call(this);
        $('#flowRate').val(flowrate);
        avaIFaceJS.pwl_func.static_discharge = flowrate;
        avaIFaceJS.pwl_func.static_discharge_eval = $(this).val();
        /*TODO: Delete ->
         $('#static-discharge').text(flowrate);
         $('#static-discharge-eval').text($(this).val());
         */
        if ($('html').attr('lang') === 'fr') {
          flowRate_txt = (function () {
            switch ($(this).val()) {
              case 'Predicted':
                return "prévu";
              case 'Actual':
                return "réel";
              case 'Defined':
                return "défini par l'utilisateur";
              case 'Selected':
                return "choisi";
            }
          }).call(this);
          avaIFaceJS.pwl_func.static_discharge_eval = flowRate_txt;
        }
        flowtype = (function () {
          switch ($(this).val()) {
            case 'Actual':
              return 0;
            case 'Predicted':
              return 1;
            case 'Defined':
              return 2;
            case 'Selected':
              return 3;
          }
        }).call(this);
        return $('#flowType').val(flowtype);
      });
      $('#defined_discharge').change(function () {
      });
      $('input[name=channel]').change(function () {
        return $('#static-limit').text($(this).next().text());
      });

      $('select#interval').change(function () {
        avaIFaceJS.pwl_func.static_interval = $(this).val() + " minutes";
        return avaIFaceJS.pwl_func.updateReportTitle();
      });

      /* WS: Does this event ever get triggered?
       $('select#chainage').change(function() {
       return $('#static-chainage').text($(this).val());
       });
       */

      $('#ref_map_link').click(function () {
        avaIFaceJS.mapJS.map.updateSize();
      });
      $("#submit").click(avaIFaceJS.pwl_func.update);
    },

    //
    update: function () {
      var headerRow, i, kmStart, report_type, step, waterway, _i, _ref;
      $('.spinner').show();
      report_type = $('input[name=report]:checked').val();
      waterway = (function () {
        switch ($('#fraser_river').val()) {
          case 'South Arm':
            $('#river-section').parent().attr('colspan', 21);
            return 0;
          case 'North Arm':
            $('#river-section').parent().attr('colspan', 16);
            return 1;
          case 'Main Arm':
            $('#river-section').parent().attr('colspan', 14);
            return 2;
        }
      })();
      avaIFaceJS.detailWindow.mapColorKey = $('#fraser_river').val();
      switch ($('#frm_map_parameters input[name=report]:radio:checked').val()) {
        case "0":
          if ($('html').attr('lang') === 'en') {
            avaIFaceJS.pwl_func.report_title1 = 'Predicted Water Levels';
            $('#note-at-bottom').text('Water level is referenced to Chart Datum which is relative to Local Low Water. Click on a time or location to display a graph.');
          } else {
            avaIFaceJS.pwl_func.report_title1 = "Niveaux d'eau prévus";
            $('#note-at-bottom').text("Le niveau d'eau est reporté dans le zéro des cartes, qui est relatif au niveau d'eau bas local. Cliquez sur une heure ou un emplacement pour afficher un graphique.");
          }
          break;
        case "1":
          if ($('html').attr('lang') === 'en') {
            avaIFaceJS.pwl_func.report_title1 = "Predicted Velocities";
            $('#note-at-bottom').text('Velocities are in metres per second. Negative values indicate a flow in an upstream direction as a result of tides.');
          } else {
            avaIFaceJS.pwl_func.report_title1 = "Débit prévu";
            $('#note-at-bottom').text('Velocities are in metres per second. Negative values indicate a flow in an upstream direction as a result of tides.');
          }
          break;
        default:
          avaIFaceJS.pwl_func.report_title1 = "";
      }
      avaIFaceJS.pwl_func.report_title2 = $('#fraser_river').val();
      if ($('html').attr('lang') === 'fr') {
        avaIFaceJS.pwl_func.report_title2 = (function () {
          switch ($('#fraser_river').val()) {
            case 'South Arm':
              return "Bras sud";
            case 'North Arm':
              return "Bras nord";
            case 'Main Arm':
              return "Bras principal";
          }
        })();
      }
      $('#pwl_waterway').val(waterway);
      $('#river-section').text($('#fraser_river').val());
      $('#water-levels tbody').empty();
      $('#headerkm').empty();
      step = 2;
      kmStart = (function () {
        switch ($('#pwl_waterway').val()) {
          case '2':
            step = 4;
            return 40;
          default:
            return 0;
        }
      })();
      for (i = _i = kmStart, _ref = $('#river-section').parent().attr('colspan') * step - step + kmStart; step > 0 ? _i <= _ref : _i >= _ref; i = _i += step) {
        if (report_type === "0") {
          headerRow = $("<th><a href=\"javascript:void(0)\">" + i + "</a></th>");
          headerRow.click(avaIFaceJS.pwl_func.gotoKMGraph);
        } else {
          headerRow = $("<th>" + i + "</th>");
        }
        $('#headerkm').append(headerRow);
      }
      //TODO: Replace next line for production
      //return $.getJSON(("/api/waterlevel?date=" + ($('#pwl_date').val()) + "&") + ("intervalMin=" + ($('#interval').val()) + "&") + ("flowRate=" + ($('#flowRate').val()) + "&") + ("flowType=" + ($('#flowType').val()) + "&") + ("waterway=" + ($('#pwl_waterway').val()) + "&") + ("displayType=" + ($('input[name=report]:checked').val())), function(data) {
      return $.getJSON(("api/depths/pwl_waterdepths.json"), function (data) {
        var count;
        $('#river-section').text(data.title);
        avaIFaceJS.pwl_func.table || (avaIFaceJS.pwl_func.table = $('#water-levels').dataTable({
          bPaginate: false,
          bInfo: false,
          bFilter: false,
          bAutoWidth: false,
          aoColumns: [
            {
              "bSortable": false
            },
            null
          ]
        }));
        avaIFaceJS.pwl_func.table.fnClearTable();
        count = 0;
        $.each(data.times, function () {
          var row;
          if (report_type === "0") {
            row = $("<tr><td class='align-center'><a href=\"javascript:void(0)\">" + this.predictTime + "</a></td></tr>");
            $(row).find('a').click(avaIFaceJS.pwl_func.gotoTimeGraph);
          } else {
            row = $("<tr><td class='align-center'>" + this.predictTime + "</td></tr>");
          }
          if (count % 2) {
            row.addClass("even");
          } else {
            row.addClass("odd");
          }
          count++;
          $.each(this.waterLevels, function () {
            return row.append("<td>" + (parseFloat(this).toFixed(1).replace('-', String.fromCharCode(8209))) + "</td>");
          });
          $('#water-levels tbody').append(row);
          return $('.dataTables_empty').parent().html('');
        });
        avaIFaceJS.pwl_func.updateReportTitle();
        avaIFaceJS.reportWindow.show();
        avaIFaceJS.setMapOpen(avaIFaceJS.MapState.Close);
        return $('.spinner').hide();
      }).success(function () {
      });
    },

    // Updates Report Title Info
    updateReportTitle: function () {
      return avaIFaceJS.reportWindow.addTitle(avaIFaceJS.pwl_func.report_title1, "Fraser River - " + avaIFaceJS.pwl_func.report_title2,
          "For " + avaIFaceJS.pwl_func.static_date + " at " + avaIFaceJS.pwl_func.static_interval + " intervals",
          "Hope Discharge " + avaIFaceJS.pwl_func.static_discharge + "m\u00B3/s (" + avaIFaceJS.pwl_func.static_discharge_eval + ")"
      );
    },

    gotoGraph: function (typCode, typValue, useMap) {
      avaIFaceJS.detailWindow.loadLayout();
      avaIFaceJS.detailWindow.show();
      $('#det_river-section').text($('#river-section').text());
      $('#det_km_time').text(typValue);
      $('#det_static-date').text(avaIFaceJS.pwl_func.static_date);
      $('#det_static-interval').text(avaIFaceJS.pwl_func.static_interval);
      $('#det_static-arm').text(avaIFaceJS.pwl_func.static_arm);
      $('#det_static-discharge').text(avaIFaceJS.pwl_func.static_discharge);
      $('#det_static-discharge-eval').text(avaIFaceJS.pwl_func.static_discharge_eval);
      var step = (function () {
        var t;
        switch ($("#pwl_waterway").val()) {
          case '0':
            t = [(typValue / 2), 2];
            break;
          case '1':
            t = [(typValue / 2), 2];
            break;
          case '2':
            t = [((typValue - 40) / 4), 4];
            break;
        }
        return t[typCode];
      })();
      if (typCode == 0) {
        $('#det_km_time-suff').text('km');

        //TODO: Replace following line for production
        //return $.getJSON(("/api/waterlevel?date=" + ($('#date').val()) + "&") + ("intervalMin=" + ($('#interval').val()) + "&") + ("flowRate=" + ($('#flowRate').val()) + "&") + ("flowType=" + ($('#flowType').val()) + "&") + ("waterway=" + ($('#waterway').val()) + "&") + "displayType=0", function(data) {
        $.getJSON("api/depths/waterlevel_kmplot.json", function (data) {
          var points = [];
          $.each(data.times, function () {
            var date;
            if (this.predictTime !== '24:00') {
              date = new Date("January 1, 2000 " + this.predictTime);
            } else {
              date = new Date("January 2, 2000 00:00");
            }
            return points.push([date.getTime(), this.waterLevels[step]]);
          });
          return $.plot("#det_placeholder", [points], {
            xaxis: {
              color: 'black',
              tickColor: '#ddd',
              mode: 'time',
              tickSize: [4, "hour"],
              timezone: "browser",
              axisLabel: 'Pacific Standard Time (PST)'
            },
            yaxis: {
              color: 'black',
              tickColor: '#ddd',
              position: 'left',
              axisLabel: 'Water Level (metres) relative to LWD'
            }
          });
        });
      } else {
        $('#det_km_time-suff').text('');

        //TODO: Replace following line for production
        //return $.getJSON(("/api/waterlevel?date=" + ($('#date').val()) + "&") + ("intervalMin=" + (querystring('intervalMin')) + "&") + ("flowRate=" + ($('#flowRate').val()) + "&") + ("flowType=" + ($('#flowType').val()) + "&") + ("waterway=" + ($('#waterway').val()) + "&") + "displayType=0", function(data) {
        $.getJSON("api/depths/waterlevel_timeplot.json", function (data) {
          var points = [];
          $.each(data.times, function () {
            var start;
            if (this.predictTime === typValue) {
              start = 0;
              if (step === 4) {
                start = 40;
              }
              return $.each(this.waterLevels, function (i) {
                return points.push([i * step + start, this]);
              });
            }
          });
          return $.plot("#det_placeholder", [points], {
            xaxis: {
              color: 'black',
              tickColor: '#ddd',
              tickSize: step,
              axisLabel: 'Location (km)'
            },
            yaxis: {
              color: 'black',
              tickColor: '#ddd',
              position: 'left',
              axisLabel: 'Water Level (metres) relative to LWD'
            }
          });
        });
      }
      avaIFaceJS.detailWindow.useMap=useMap;
      return avaIFaceJS.detailWindow.show();
    },
    gotoTimeGraph: function () {
      return avaIFaceJS.pwl_func.gotoGraph(1, $(this).text(),false);
    },
    gotoKMGraph: function () {
      avaIFaceJS.detailWindow.mapJS.pwl_func.setMarkerExtent($(this).text(), avaIFaceJS.detailWindow.mapColorKey);
      return avaIFaceJS.pwl_func.gotoGraph(0, $(this).text(),true);
    }
  }
} else if(!(typeof avaMapJS === 'undefined')) {

  /*** Map Interaction functions ***/

  avaMapJS.pwl_func= {
    init: function(){
      avaMapJS.pwl_func.curRiver="";

      // KML Feature Styles and KML Layer
      avaMapJS.style.callback_function=avaMapJS.pwl_func.checkMarker;
      avaMapJS.pwl_func.kml = new OpenLayers.Layer.Vector("KML", {
        strategies: [new OpenLayers.Strategy.Fixed()],
        projection: avaMapJS.map.displayProjection,
        styleMap: avaMapJS.style.point_with_label("${KM}"),
        protocol: new OpenLayers.Protocol.HTTP({
          url: "pwl_markers.kml?",
          format: new OpenLayers.Format.KML({
            extractStyles: false,
            extractAttributes: true,
            maxDepth: 2
          })
        })
      });
      avaMapJS.setMapLayer(avaMapJS.pwl_func.kml);

      // Map Interaction parameters
      avaMapJS.pwl_func.HLFeat = new OpenLayers.Control.SelectFeature(avaMapJS.pwl_func.kml, {
        hover: true,
        highlightOnly: true,
        renderIntent: "temporary"
      });
      avaMapJS.map.addControl(avaMapJS.pwl_func.HLFeat);
      avaMapJS.pwl_func.HLFeat.activate();
      avaMapJS.pwl_func.kml.events.on({'featureselected': avaMapJS.pwl_func.selectMarker});

      // Sets extents of map
      avaMapJS.pwl_func.setExtents("South Arm");
    },

    // checkTileRefresh: checks if the tile's attributes match the currently selected values
    checkMarker: function(feat){
      return feat.attributes.waterway == avaMapJS.pwl_func.curRiver;
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
      avaMapJS.pwl_func.curRiver=avaMapJS.pwl_func.lookupRiver(riverName);
      avaMapJS.pwl_func.kml.redraw();
    },

    selectMarker: function(feat){
      avaMapJS.map.zoomToExtent(feat.feature.geometry.getBounds(), closest=true);
      avaMapJS.map.zoomToScale(100000);
    },

    setMarkerExtent: function(mrkKM,mrkRiver){
      avaMapJS.pwl_func.HLFeat.unselectAll();
      for(var f= 0;f<avaMapJS.pwl_func.kml.features.length;f++){
        if(avaMapJS.pwl_func.lookupRiver(mrkRiver)==avaMapJS.pwl_func.kml.features[f].attributes.waterway && avaMapJS.pwl_func.kml.features[f].attributes.KM==mrkKM){
          avaMapJS.pwl_func.HLFeat.select(avaMapJS.pwl_func.kml.features[f]);
          break;
        }
      }
    },

    // setExtents: Using the name of provided Waterways selector, draw extents from 'locationExtents' dict.
    setExtents: function(river) {
      if (!river) {
        return;
      }
      avaMapJS.pwl_func.refreshMarkers(river);
      var obj = incl_ava_defs.locDefs[avaMapJS.pwl_func.curRiver].Coords;
      try {
        avaMapJS.map.zoomToExtent(new OpenLayers.Bounds(obj.Lon.min, obj.Lat.min, obj.Lon.max, obj.Lat.max));
      } catch(err){}
    }
  }
}