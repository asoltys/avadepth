(function() {
  var gotoPWL;

  gotoPWL = function() {
    return document.location = ("pwl-nep-eng.html?date=" + ($('#date').val()) + "&") + ("km=" + ($("#km").text()) + "&") + ("intervalMin=" + ($('#intervalMin').val()) + "&") + ("flowRate=" + ($('#flowRate').val()) + "&") + ("flowType=" + ($('#flowType').val()) + "&") + ("waterway=" + ($('#waterway').val()) + "&") + ("displayType=" + ($('input[name=report]:checked').val()));
  };

  $(function() {
    var check;
    $("#date").val(querystring('date'));
    $("#waterway").val(querystring('waterway'));
    $("input[name=fraser_river]")[$("#waterway").val()].checked = true;
    $("#flowRate").val(querystring('flowRate'));
    $("#flowType").val(querystring('flowType'));
    $("#intervalMin").val(querystring('intervalMin'));
    check = (function() {
      switch (querystring('flowType')[0]) {
        case '0':
          return 0;
        case '1':
          return 1;
        case '2':
          $("#defined_discharge").val($('#flowRate').val());
          return 3;
        case '3':
          return 2;
      }
    })();
    $("input[name=discharge]")[check].checked = true;
    $("input[name=report]")[querystring('displayType')].checked = true;
    $("#time").text(querystring('time'));
    $("#pwl").click(gotoPWL);
    $('#date').change(function() {
      return $.getJSON("/api/depths?date=" + ($('#date').val()), function(data) {
        $('#selected_discharge').empty();
        $.each(data.Flowrates, function() {
          return $('#selected_discharge').append("<option value='" + this + "'>" + this + "</option>");
        });
        $('#predicted_discharge').text(data.Predicted);
        $('#actual_discharge').text(data.Actual);
        if (data.Actual) {
          $("#actual").attr('disabled', false);
          $("#predicted").attr('disabled', true);
          if ($('#predicted').is(':checked')) {
            $('input[name=discharge]')[1].checked = true;
          }
        } else {
          $("#actual").attr('disabled', true);
          $("#predicted").attr('disabled', false);
          if ($('#actual').is(':checked')) {
            $('input[name=discharge]')[0].checked = true;
          }
        }
        $('input[name=discharge]:checked').trigger('change');
        return $('#static-date').text($('#alt-date').val());
      });
    }).change();
    $('input[name=discharge]').change(function() {
      var flowrate, flowtype;
      flowrate = (function() {
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
      $('#static-discharge').text(flowrate);
      $('#static-discharge-eval').text($(this).val());
      flowtype = (function() {
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
    $('input[name=fraser_river]').change(function() {
      var waterway;
      waterway = (function() {
        switch ($(this).val()) {
          case 'South Arm':
            return 0;
          case 'North Arm':
            return 1;
          case 'Main Arm':
            return 2;
        }
      }).call(this);
      $('#waterway').val(waterway);
      $('#static-arm').text($(this).val());
      return $('#river-section').text($(this).val());
    });
    $('input[name=fraser_river]:checked').change();
    $('#defined_discharge').change(function() {
      if ($('input[name=discharge]:checked').val() === "Defined") {
        $('#flowRate').val($(this).val());
        return $('#static-discharge').text($('#defined_discharge').val());
      }
    });
    $('#selected_discharge').change(function() {
      if ($('input[name=discharge]:checked').val() === "Selected") {
        $('#flowRate').val($(this).val());
        return $('#static-discharge').text($('#selected_discharge').val());
      }
    });
    return $('#date, input[name=discharge], input[name=fraser_river], input[name=report], #defined_discharge, #selected_discharge, #interval').change(function() {
      var step;
      step = (function() {
        switch ($("#waterway").val()) {
          case '0':
            return 2;
          case '1':
            return 2;
          case '2':
            return 4;
        }
      })();
      return $.getJSON("/api/waterlevel?date=" + ($('#date').val()) + "&intervalMin=" + (querystring('intervalMin')) + "&flowRate=" + ($('#flowRate').val()) + "&flowType=" + ($('#flowType').val()) + "&waterway=" + ($('#waterway').val()) + "&displayType=" + ($('input[name=report]:checked').val()), function(data) {
        var points;
        points = new Array();
        $.each(data.times, function() {
          var start;
          if (this.predictTime === querystring('time')[0]) {
            start = 0;
            if (step === 4) start = 40;
            return $.each(this.waterLevels, function(i) {
              return points.push([i * step + start, this]);
            });
          }
        });
        return $.plot("#placeholder", [points], {
          xaxes: [
            {
              color: 'black',
              tickColor: '#ddd',
              tickSize: step,
              axisLabel: 'Location (km)'
            }
          ],
          yaxes: [
            {
              color: 'black',
              tickColor: '#ddd',
              position: 'left',
              axisLabel: 'Water Level (metres) relative to LWD'
            }
          ]
        });
      });
    });
  });

}).call(this);
