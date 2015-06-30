
// Animated Currents and Velocities Objects
if(!(typeof avaIFaceJS === 'undefined')) {

/*** Interface functions ***/
  avaIFaceJS.acv_func = {
    images:[],
    flowtype:0,
    discharge:"",
    discharge_eval:"Predicted",
    selected_zone:1,
    init: function() {
      $('#static_rd').attr('checked','checked');
      $('#interval').prev().hide();
      $('#interval').hide();
      $('#from').prev().text('Time Period:');
      $('#date').change(function(){
        avadepth.util.getFlow({
          date: $(this).val(),
          selected: $("#selected_discharge"),
          actual: $("#actual_discharge")
        });
      }).datepicker().datepicker("setDate",new Date()).change();

      $('#selected_discharge').change(function() {
        $('#discharge_radio').prop('checked', true).change();
        if ($('input[name="discharge"].checked').val() === "Selected") {
          avaIFaceJS.acv_func.discharge=$('#selected_discharge').val();
        }
      });

      $('input[name=discharge]').change(function() {
        avaIFaceJS.acv_func.discharge = (function() {
          switch ($(this).val()) {
            case 'Actual':
              return $('#actual_discharge').text();
//            case 'Predicted':
//              return $('#predicted_discharge').text();
            case 'Defined':
              return $('#defined_discharge').val();
            case 'Selected':
              return $('#selected_discharge').val();
          }
        }).call(this);
        //$('#static-discharge').text(avaIFaceJS.acv_func.flowrate);
        avaIFaceJS.acv_func.discharge_eval=$(this).val();
        //$('#static-discharge-eval').text($(this).val());
        avaIFaceJS.acv_func.flowtype = (function() {
          switch ($(this).val()) {
            case 'Actual':
              return 0;
//            case 'Predicted':
//              return 1;
            case 'Defined':
              return 2;
            case 'Selected':
              return 3;
          }
        }).call(this);
      });
      $('#defined_discharge').change(function() {
        if ($('input[name="discharge"].checked').val() === "Defined") {
          avaIFaceJS.acv_func.discharge=$(this).val();
          //return $('#static-discharge').text($('#defined_discharge').val());
        }
      });
      $('select#interval').change(function() {
        var hour, i, interval, start, interval_start, minute, options, _i;
        interval = parseFloat($(this).val());
        options = "";
        start=$('#from').val();
        interval_start = parseFloat(start);
        while (interval_start >= 0) {
          interval_start -= interval;
        }
        interval_start += interval;
        for (i = _i = interval_start; interval > 0 ? _i < 24 : _i > 24; i = _i += interval) {
          hour = Math.floor(i);
          if (hour < 10) {
            hour = "0" + hour;
          }
          minute = i % 1 * 60;
          if (minute === 0) {
            minute = "00";
          }
          options += "<option value=\"" + i + "\">" + hour + ":" + minute + "</option>";
        }
        $('select#from').html('').html(options);
        $('#from').val(start).change();
      });
      $('select#from').change(function() {
        var hour, i, interval, minute, options, _i, _ref;
        interval = parseFloat($("#interval").val());
        options = "";
        for (i = _i = _ref = parseFloat($(this).val()) + interval; interval > 0 ? _i < 24 : _i > 24; i = _i += interval) {
          hour = Math.floor(i);
          if (hour < 10) {
            hour = "0" + hour;
          }
          minute = i % 1 * 60;
          if (minute === 0) {
            minute = "00";
          }
          options += "<option value=\"" + i + "\">" + hour + ":" + minute + "</option>";
        }
        $('select#to').html('').html(options);
        if ($('input[name=type]:checked').val() === "0") {
          $('#to_params').hide();
        }
      });
      $('input[name=type]').change(function() {
        if ($('input[name=type]:checked').val() !== '0') {
          $('#interval').prev().show();
          $('#interval').show();
          $('#from').prev().text('From:');
          return $('#to_params').show();
        } else {
          $('#interval').prev().hide();
          $('#interval').hide();
          $('#from').prev().text('Time Period:');
          return $('#to_params').hide();
        }
      });
      $("#submit").click(avaIFaceJS.acv_func.update);
      $('#replay').click(avaIFaceJS.acv_func.play);

    },
    update: function(){
      var flow, end_hour, end_minute, getImage, hour, interval, minute;
      avaIFaceJS.acv_func.setTitle();
      $(this).prop('disabled', 'disabled');
      $('#loading').show();
      $('.spinner').show();
      $('#animated, #animated_legend, #replay, #nodata').hide();
      startVal=$('#from').val();
      endVal=$('#to').val();
      hour = Math.floor(parseFloat(startVal));
      minute = (parseFloat(startVal) - hour) * 60;
      interval = parseFloat($("#interval").val());
      $('#frames_retrieved').html('0');
      $('#number_of_frames').html((endVal - startVal) / interval + 1);
      if ($('input[name=type]:checked').val() !== '0') {
        end_hour = Math.floor(parseFloat(endVal));
        end_minute = (parseFloat(endVal) - end_hour) * 60;
        $('#frame_count').show();
      } else {
        end_hour = hour;
        end_minute = minute;
        $('#frame_count').hide();
      }
      //total = (end_hour - hour) * 4 + (end_minute - minute) / 15;
      avaIFaceJS.acv_func.images = [];
      avaIFaceJS.setMapOpen(avaIFaceJS.MapState.Close);

      flow = avadepth.util.getSelectedFlow();
      $("#flowRate").val(flow.flowRate);

      if (flow.flowType !== "0") {
        $('#flowType').val(flow.flowType);
      } else {
        $('#flowType').val("UserDefined");
      }

      return (getImage = function() {
        //TODO: Replace following line for production
        return $.getJSON(getAPI(("/api/animated?date=" + ($('#date').val()) + "&")
            + ("legendScale=" + ($('input[name=legend_scale]:checked').val()) + "&")
            + ("zone=" + (avaIFaceJS.acv_func.selected_zone) + "&")
            + ("flowRate=" + ($('#flowRate').val()) + "&")
            + ("flowType=" + ($('#flowType').val()) + "&")
            + ("hour=" + hour + "&")
            + ("minute=" + minute),"api/depths/animated.json"), function(data) {
          var result;
          result = data.toString();
          if (result !== '/images/') {
            avaIFaceJS.acv_func.images.push(result);
          }
          avaIFaceJS.acv_func.preload(avaIFaceJS.acv_func.images[avaIFaceJS.acv_func.images.length - 1]);
          return $('#frames_retrieved').html(avaIFaceJS.acv_func.images.length);
        }).then(function() {
          if (hour < end_hour || (hour === end_hour && minute <= end_minute)) {
            getImage();
            minute += interval * 60;
            if (minute >= 60) {
              minute = minute - 60;
              if (interval <= 1) {
                return hour += 1;
              } else {
                return hour += interval;
              }
            }
          } else {
            avaIFaceJS.acv_func.play();
            return $('#submit').prop('disabled', '');
          }
        });
      })();
    },
    setTitle:function(){
      // Set Report Title Info
      avaIFaceJS.reportWindow.addTitle(
        "Fraser River - South Arm",
        "Zone " + (avaIFaceJS.acv_func.selected_zone) + " at " + $('select#interval').find(':selected').text() + " intervals",
        "Hope Discharge " + (avaIFaceJS.acv_func.discharge) + "m\u00B3/s (" + (avaIFaceJS.acv_func.discharge_eval) + ") - " + moment($('#date').val()).format("MMM D, YYYY") + " from " + ($('select#from').find(':selected').text()) + " to " + ($('select#to').find(':selected').text()),
        "Velocity legend: "+ $('input[name="legend_scale"]:checked').next().text()
      );
      /*
      $('#static-date').text(moment($('#date').val()).format("YYYY-MM-DD"));
      $('#static-start').text($('select#from').val());
      $('#static-end').text($('select#to').val());
      $('#static-zone').text($('select#zone').val());
      $('#static-interval').text($('select#interval').val());
      $('#static-discharge').text(avaIFaceJS.acv_func.discharge);
      $('#static-discharge-eval').text(avaIFaceJS.acv_func.discharge_eval);
      */
      //$('#static-legend').text($('input[name="legend_scale"]:checked').next().text());
    },
    preload:function(img){
      return ($('<img/>')[0].src=img);
    },
    play: function(){
      var handle, i;
      avaIFaceJS.reportWindow.loadReport();
      $('.spinner').hide();
      $('#loading').hide();
      $('#animated').attr("src", "images/nodata.jpg");
      $('#animated_legend').hide().attr("src", "images/vectorscale" + ($('input[name=legend_scale]:checked').val()) + ".gif");
      $('#replay').prop('disabled', 'disabled');
      avaIFaceJS.reportWindow.show();

      if (avaIFaceJS.acv_func.images.length > 0) {
        $('#replay').show();
        i = 1;
        handle = setInterval(function() {
          $('#animated').on("load", function() {
            $('#animated').show();
            return $('#animated_legend').show();
          }).attr("src",  avaIFaceJS.acv_func.images[i]);
          i++;
          if (i >= avaIFaceJS.acv_func.images.length) {
            clearInterval(handle);
            return $('#replay').prop('disabled', '');
          }
        }, 1000);
      } else {
        $('#nodata').show();
      }
      if ($('input[name=type]:checked').val() === '0') {
        $('#replay').hide();
      }
    },
    setZone:function(zone){
      avaIFaceJS.acv_func.selected_zone=zone;
	  $("#zone").val(zone);
    }
  }
} else if(!(typeof avaMapJS === 'undefined')) {

  /*** Map Interaction functions ***/
  avaMapJS.acv_func = {
    currentZone:1,
    init: function () {
      mapStyle.callback_function=function(feat){return true};
      avaMapJS.acv_func.kml=new OpenLayers.Layer.Vector("KML", {
        strategies: [new OpenLayers.Strategy.Fixed()],
        projection: avaMapJS.map.displayProjection,
        styleMap: mapStyle.area_with_label("${Zone}"),
        protocol: new OpenLayers.Protocol.HTTP({
          url: "acv_zones.kml?",
          format: new OpenLayers.Format.KML({
            extractStyles: false,
            extractAttributes: true,
            maxDepth: 2
          })
        })
      });
      avaMapJS.setMapLayer(avaMapJS.acv_func.kml);

      // Map Interaction parameters
      // hover
      avaMapJS.acv_func.HLFeat = new OpenLayers.Control.SelectFeature(avaMapJS.acv_func.kml, {
        hover:false,
        highlightOnly:true,
        renderIntent:'select'
      });
      avaMapJS.setMapControls([avaMapJS.acv_func.HLFeat]);
      //avaMapJS.acv_func.HLFeat.activate();
      //avaMapJS.acv_func.SLFeat.activate();
      avaMapJS.acv_func.kml.events.on({'loadend':avaMapJS.acv_func.layerLoad,'featureselected':avaMapJS.acv_func.newZoneSelect});

      // Set Map Extents
      avaMapJS.setExtents("VH");
    },
    newZoneSelect: function(feat){
      parent.avaIFaceJS.acv_func.setZone(parseInt(feat.feature.data.Zone));
    },
    layerLoad: function(){
      avaMapJS.acv_func.zoneSelect(1);
    },
    zoneSelect: function(zone){
      avaMapJS.acv_func.HLFeat.unselectAll();
      for (var f = 0; f < avaMapJS.acv_func.kml.features.length; f++) {
        var ft=avaMapJS.acv_func.kml.features[f];
        if ((zone) == ft.data.Zone) {
          avaMapJS.acv_func.HLFeat.select(ft);
          avaMapJS.acv_func.kml.redraw();
          break;
        }
      }
    }
  };
} else if (!(typeof avaMapDetJS === 'undefined')){
  avaMapDetJS.acv_func = {init: function(){}}
};

//# sourceURL=acv_func.js
