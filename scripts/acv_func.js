
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
      $('select#interval').change(avaIFaceJS.acv_func.time_chg_evnt_hndlr);
      $('select#from').change(avaIFaceJS.acv_func.time_chg_evnt_hndlr);

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

      $('#defined_discharge').click(function(){
        $('#defined_radio').prop('checked', true).change();
      })

      $("#submit").click(avaIFaceJS.acv_func.update);
      $('#replay').click(avaIFaceJS.acv_func.play);

    },
    time_chg_evnt_hndlr: function(){
      var interval, start, options;
      interval = parseFloat($("#interval").val());
      options = "";
      start=$('#from').val();

      for (var i = moment("00:00","HH:mm");
          i.isBefore(moment("24:01","HH:mm").subtract(interval,"hours"));
          i.add(0.25,"hours")) {
        options += "<option value=\"" + i.format("HH:mm") + "\">" + i.format("HH:mm")+ "</option>";
      }

      $('select#from').html('').html(options);
      $('#from').val(start);

      options = '';
      for (var i = moment(start,"HH:mm").add(interval,"hours");
          i.isBefore(moment("24:01","HH:mm"));
          i.add(interval,"hours")) {
        options += "<option value=\"" + i.format("HH:mm") + "\">" + i.format("HH:mm")+ "</option>";
      }
      $('select#to').html('').html(options.replace(/00:00/g,"24:00"));

    },
    update: function(){
      var flow, getImage, interval;
      $(this).prop('disabled', 'disabled');
      $('#loading').show();
      $('.spinner').show();
      $('#animated, #animated_legend, #replay, #nodata').hide();

      start_time = moment($('#from').val(),"HH:mm");
      end_time = moment($('#to').val(),"HH:mm");
      interval = moment.duration(parseFloat($("#interval").val()),"hours");

      $('#frames_retrieved').html('0');
      $('#number_of_frames').html((end_time.diff(start_time,"minutes")) / interval.asMinutes() + 1);
      if ($('input[name=type]:checked').val() !== '0') {
        $('#frame_count').show();
      } else {
        $('#frame_count').hide();
      }

      avaIFaceJS.acv_func.images = [];
      avaIFaceJS.setMapOpen(avaIFaceJS.MapState.Close);

      flow = avadepth.util.getSelectedFlow();
      $("#flowRate").val(flow.flowRate);
      avaIFaceJS.acv_func.discharge = flow.flowRate;

      if (flow.flowType !== "0") {
        $('#flowType').val(flow.flowType);
      } else {
        $('#flowType').val("UserDefined");
      }

      avaIFaceJS.acv_func.discharge_eval = $('#flowType').val();
      avaIFaceJS.acv_func.setTitle();

      return (getImage = function() {
        //TODO: Replace following line for production
        return $.getJSON(getAPI(("/api/animated?date=" + ($('#date').val()) + "&")
            + ("legendScale=" + ($('input[name=legend_scale]:checked').val()) + "&")
            + ("zone=" + (avaIFaceJS.acv_func.selected_zone) + "&")
            + ("flowRate=" + ($('#flowRate').val()) + "&")
            + ("flowType=" + ($('#flowType').val()) + "&")
            + ("hour=" + start_time.hour() + "&")
            + ("minute=" + start_time.minute()),"api/depths/animated.json"), function(data) {
          var result;
          result = data.toString();
          if (result !== '/images/') {
            avaIFaceJS.acv_func.images.push(result);
          }
          avaIFaceJS.acv_func.preload(avaIFaceJS.acv_func.images[avaIFaceJS.acv_func.images.length - 1]);
          return $('#frames_retrieved').html(avaIFaceJS.acv_func.images.length);
        }).then(function() {
          if (!start_time.isAfter(end_time)){
            getImage();
            start_time.add(interval);
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
	  pBarToggle();
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
          }).attr("src",  "http://205.193.152.175/" + avaIFaceJS.acv_func.images[i]);
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
