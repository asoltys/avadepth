(function() {
  var gotoPWL, querystring;

  querystring = function(key) {
    var m, r, re;
    re = new RegExp('(?:\\?|&)' + key + '=(.*?)(?=&|$)', 'gi');
    r = [];
    m = [];
    while ((m = re.exec(document.location.search)) !== null) {
      r.push(m[1]);
    }
    return r;
  };

  gotoPWL = function() {
    return document.location = ("pwl-nep-eng.html?date=" + ($('#date').val()) + "&") + ("km=" + ($("#km").text()) + "&") + ("intervalMin=" + ($('#interval').val()) + "&") + ("flowRate=" + ($('#flowRate').val()) + "&") + ("flowType=" + ($('#flowType').val()) + "&") + ("waterway=" + ($('#waterway').val()) + "&") + ("displayType=" + ($('input[name=report]:checked').val()));
  };

  $(function() {
    var check;
    $("#date").val(querystring('date'));
    $("#waterway").val(querystring('waterway'));
    $("#interval").val(querystring('intervalMin'));
    $("input[name=fraser_river]")[$("#waterway").val()].checked = true;
    $("#flowRate").val(querystring('flowRate'));
    $("#flowType").val(querystring('flowType'));
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
    $("#km").text(querystring('km'));
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
      var index;
      index = querystring('km');
      index = (function() {
        switch ($("#waterway").val()) {
          case '0':
            return index / 2;
          case '1':
            return index / 2;
          case '2':
            return (index - 40) / 4;
        }
      })();
      return $.getJSON("/api/waterlevel?date=" + ($('#date').val()) + "&intervalMin=" + ($('#interval').val()) + "&flowRate=" + ($('#flowRate').val()) + "&flowType=" + ($('#flowType').val()) + "&waterway=" + ($('#waterway').val()) + "&displayType=" + ($('input[name=report]:checked').val()), function(data) {
        var points;
        points = new Array();
        $.each(data.times, function() {
          var date;
          if (this.predictTime !== '24:00') {
            date = new Date("January 1, 2000 " + this.predictTime);
          } else {
            date = new Date("January 2, 2000 00:00");
          }
          return points.push([date.getTime(), this.waterLevels[index]]);
        });
        return $.plot("#placeholder", [points], {
          xaxes: [
            {
              color: 'black',
              tickColor: '#ddd',
              mode: 'time',
              tickSize: [4, "hour"],
              timezone: "browser",
              axisLabel: 'Pacific Standard Time (date)'
            }
          ],
          yaxes: [
            {
              color: 'black',
              tickColor: '#ddd',
              position: 'left',
              axisLabel: 'Hope Discharge (m3s)'
            }
          ]
        });
      });
    });
  });

}).call(this);
