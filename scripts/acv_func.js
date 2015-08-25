// Animated Currents and Velocities Objects
if(!(typeof avaIFaceJS === 'undefined')) {

/*** Interface functions ***/
  avaIFaceJS.acv_func = {
    images:[],
    selected_zone:1,
	
    init: function() {
	 $('#replay').hide();
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
        $('#selected_radio').prop('checked', true).change();
      });

      // Check "User Defined" radio on "User Defined" input is focused on
      $('#defined_discharge').on("click", function() {
        $('#defined_radio').prop('checked', true).change();
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

      $('#defined_discharge').click(function(){
        $('#defined_radio').prop('checked', true).change();
      });

      $('#zone').change(function() {
        avaIFaceJS.acv_func.selected_zone = $('#zone').val();
        avaIFaceJS.mapJS.acv_func.zoneSelect(avaIFaceJS.acv_func.selected_zone);
      });

      $('#interval, #from').change(avaIFaceJS.acv_func.time_chg_evnt_hndlr);
      $("#submit").click(function(){
		  // user has left user-defined m^3/s value blank
		  if(avadepth.util.getSelectedFlow().flowRate === "" && avadepth.util.getSelectedFlow().flowType === 'UserDefined') {
			$('#defined_discharge').focus();
			return;
		  } else {
			$('#loading').show();
			$('.spinner').show();
			$('#animated, #animated_legend, #replay, #nodata').hide();
			return avaIFaceJS.acv_func.update(); 
		  }
	  });
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
      if(moment(start,"HH:mm").add(interval,"hours").isAfter(moment("24:00","HH:mm"))) start = "00:00";

      for (var i = moment(start,"HH:mm").add(interval,"hours");
          i.isBefore(moment("24:01","HH:mm"));
          i.add(interval,"hours")) {
        options += "<option value=\"" + i.format("HH:mm") + "\">" + i.format("HH:mm")+ "</option>";
      }
      $('select#to').html('').html(options.replace(/00:00/g,"24:00"));

    },
    update: function(){
      var flow, getImage, interval;
	  flow = avadepth.util.getSelectedFlow();
	  $("#flowRate").val(flow.flowRate);
	  $('#flowType').val(flow.flowType);
	  
      $(this).prop('disabled', true);

      start_time = moment($('#from').val(),"HH:mm");
      end_time = moment($('#to').val(),"HH:mm");
      interval = moment.duration(parseFloat($("#interval").val()),"hours");

      $('#frames_retrieved').html('0');
      $('#number_of_frames').html((end_time.diff(start_time,"minutes")) / interval.asMinutes() + 1);
      if ($('input[name=type]:checked').val() !== '0') {
        $('#frame_count').show();
      } else {
        end_time = start_time.clone();
        $('#frame_count').hide();
      }

      avaIFaceJS.acv_func.images = [];
      avaIFaceJS.setMapOpen(avaIFaceJS.MapState.Close);
   
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
            return $('#submit').prop('disabled', false);
          }
        });
      })();
    },
    setTitle:function(){
	if(window.location.href.indexOf("fra") > -1) {
	  moment.locale('fr-ca');
	}  else {
	  moment.locale('en');
        }
      // Set Report Title Info
	  if ($('#animated_rd').is(':checked')) { // animated series
		avaIFaceJS.reportWindow.addTitle(
		"Fraser River - South Arm",
		"Zone " + (avaIFaceJS.acv_func.selected_zone)
			+ " at " + $('select#interval').find(':selected').text() + " intervals",
		"Hope Discharge " + ($('#flowRate').val()) + " m\u00B3/s ("
			+ translate_flow() + ") - "
			+ moment($('#date').val()).format("MMM D, YYYY")
			+ " from " + ($('select#from').find(':selected').text())
			+ " to " + ($('select#to').find(':selected').text()),
		"Velocity legend: "+ $('input[name="legend_scale"]:checked').next().text()
		);
	  } else { // static image
		avaIFaceJS.reportWindow.addTitle(
		"Fraser River - South Arm",
		"Zone " + (avaIFaceJS.acv_func.selected_zone),
		"Hope Discharge " + ($('#flowRate').val()) + " m\u00B3/s ("
			+ translate_flow() + ") - "
			+ moment($('#date').val()).format("MMM D, YYYY")
			+ " from " + ($('select#from').find(':selected').text())
			+ " to " + ($('select#to').find(':selected').text()),
		"Velocity legend: "+ $('input[name="legend_scale"]:checked').next().text()
		);
	  }
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
	  $('#replay').prop("disabled", true);
      avaIFaceJS.reportWindow.show();
	
      if (avaIFaceJS.acv_func.images.length > 0) {
        $('#replay').show();
        i = 1;
        handle = setInterval(function() {
          $('#animated').on("load", function() {
            $('#animated').show();
            return $('#animated_legend').show();
          }).attr("src", avaIFaceJS.acv_func.images[i]);
          i++;
          if (i >= avaIFaceJS.acv_func.images.length) {
            clearInterval(handle);
            return $('#replay').prop("disabled", false);
          }
        }, 1000);
      } else {
        $('#nodata').show();
      }
      if ($('input[name=type]:checked').val() === '0') {
        $('#replay').hide();
      }
    },
    setZone:function(zone){ // update param bar zone when changed on map
         avaIFaceJS.acv_func.selected_zone = zone; // set zone var with most recently selected zone
	  $("#zone").val(zone);
    }
  }
} else if(!(typeof avaMapJS === 'undefined')) {

  /*** Map Interaction functions ***/
  avaMapJS.acv_func = {
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
