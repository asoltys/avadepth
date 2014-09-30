/**
 * Created by wsiddall on 26/08/2014.
 */

  // Daily Depths Object
if(!(typeof avaIFaceJS === 'undefined')) {

/*** Interface functions ***/
  avaIFaceJS.dd_func= {
    flowrate: 0,
    tableReport: null,
    tableDetail: null,
    limit_text: "",

    init: function () {
      // Set Report Title Header
      avaIFaceJS.reportWindow.title1 = "Available Depth Report";
      avaIFaceJS.reportWindow.title2 = "";

      // Style Elements
      $(".yaxislabel").css("color", "black");

      /** Event Handlers **/
      // Retrieve content on Date change
      $('#date').change(function () {
        return avaIFaceJS.dd_func.getFlow({
          date: $(this).val(),
          selected: $("#selected_discharge"),
          predicted: $("#predicted_discharge"),
          actual: $("#actual_discharge")
        });
      }).datepicker().datepicker('setDate', new Date()).change();

      // Check "Selected" radio on "Selected" value combo selection
      $('#selected_discharge').change(function () {
        return $('#selected_radio').prop('checked', true).change();
      });

      // Retrieve content on form submission
      return $("#submit").click(function () {
        if (!$('input[name=discharge]').is(":checked")) {
          $("#error_message").show();
          $("#error_message").html("Place select one of the options for the field \"River Discharge @ Hope\"");
          return $("#report_body").hide();
        } else {
          $('.spinner').show();
          $("#error_message").hide();
          $("#report_body").show();
          return avaIFaceJS.dd_func.update();
        }
      });
    },

    // Retrieve current values for Parameters
    getFlow: function (options, callback) {
      var thisCallback = callback;

      //TODO: Replace below line for production
      $.getJSON('/api/depths?date=' + options.date, function (data) {
      //$.getJSON('api/depths/depths.json', function (data) {
        selectList = $(options.selected);

        // Add values to Selected Value list
        var s = '';
        $.each(data.Flowrates, function (idx, itm) {
          s += '<option value=' + itm + '>' + itm + '</option>';
        });
        $('option', selectList).remove();
        selectList.append(s);

        // Update values for "Predicted" and "Actual" values
        $(options.predicted).text(data.Predicted);
        $(options.actual).text(data.Actual);
        if (data.Actual) {
          $("#predicted_radio").attr('disabled', true);
          $('#actual_radio').attr('disabled', false).prop('checked', true);
        } else {
          $("#actual_radio").attr('disabled', true);
          $("#predicted_radio").attr('disabled', false).prop('checked', true);
        }

        // Run callback if needed
        if (thisCallback) {
          callback(data);
        }
        return data.Predicted;
      });
    },

    // validate type of report to generate
    getSelectedFlow: function () {
      var flow = { flowRate: 0, flowType: $("input:radio[name=discharge]:checked").val() };

      var getFlowRate = {
        Predicted: function () {
          return $('#predicted_discharge').text();
        },
        Actual: function () {
          return $('#actual_discharge').text();
        },
        Defined: function () {
          return $('#defined_discharge').val();
        },
        Selected: function () {
          return $('#selected_discharge').val();
        }
      };

      flow.flowRate = getFlowRate[flow.flowType]();
      if (flow.flowType == "Defined") {
        flow.flowType = "0"
      }
      return flow;
    },

    // Update values and apply to Detail Window
    showDetail: function (period) {
      avaIFaceJS.detailWindow.loadLayout();
      avaIFaceJS.detailWindow.show();

      $('#static-time').text(period);
      $('#date-display').text(moment($('#date').val()).format("MMMM D, YYYY"));
      $('#static-limit').text(avaIFaceJS.dd_func.limit_text);
      $('#static-type').text($('input[name="condition"]:checked').next().text());
      $('#static-chainage').text($('#chainage').val());
      $('#static-width').text($('#width').val());
      $('#static-discharge').text($('#flowRate').val());
      $('#static-discharge-eval').text($('#flowType').val());

      //TODO: Replace line for production:
      $.getJSON(("/api/depths/verify?date=" + ($('#date').val()) + "&") +
	    ("chainage=" + ($('#chainage').val()) + "&") +
	    ("flowRate=" + ($('#flowRate').val()) + "&") +
	    ("flowType=1&") +
	    ("sounding=" + $('input[name="condition"]:checked').val() + "&") +
	    ("width=" + ($('#width').val()) + "&") +
	    ("lane=" + (parseInt($('input[name="channel"]:checked').val()) + 1)  + "&") +
	    ("period=" + (parseInt(period.substring(0,2))/2 + 1)), function(data) {
      //$.getJSON("api/depths/verify.json", function (data) {
        var least_depth;
        avaIFaceJS.dd_func.tableDetail || (avaIFaceJS.dd_func.tableDetail = $('#verify').dataTable({
          bPaginate: false,
          bInfo: false,
          bFilter: false,
          bAutoWidth: false,
          aaSorting: []
        }));
        avaIFaceJS.dd_func.tableDetail.fnClearTable();
        $('#verify tbody tr').remove();
        least_depth = 10000;
        $.each(data.items, function () {
          var depth, fixed_depth;
          fixed_depth = this.depth.toFixed(1);
          if (this.depth <= least_depth) {
            least_depth = parseFloat(fixed_depth);
            $('#verify td').find('.low_depth').removeClass('low_depth');
            depth = "<span class=\"low_depth\">" + fixed_depth + "</span>";
          } else {
            depth = fixed_depth;
          }
          return avaIFaceJS.dd_func.tableDetail.fnAddData([this.location, this.designGrade, this.sounding, this.width, this.percent, this.tidalAid, depth]);
        });
        avaIFaceJS.detailWindow.show();
        return $('#verify td').find('.low_depth').closest('tr').addClass('least-depth');
      });

    },

    // Process Report content and update Report Window
    process_report: function (flag) {
      var channel, flow;

      channel = $('input[name="channel"]:checked').val();
      flow = avaIFaceJS.dd_func.getSelectedFlow();
      if (flag) {
        $("#flowRate").val(flow.flowRate);
      }
      if (flow.flowType !== "0") {
        $('#flowType').val(flow.flowType);
      } else {
        $('#flowType').val("UserDefined");
      }
      //TODO: Replace bottom line for production
      return $.getJSON(("/api/depths/calculate?date=" + ($('#date').val()) + "&") + ("chainage=" + ($('#chainage').val()) + "&") + ("flowRate=" + ($('#flowRate').val()) + "&") + ("flowType=" + ($('#flowType').val()) + "&") + ("width=" + ($('#width').val()) + "&") + ("sounding=" + ($('input[name=condition]:checked').val())), function(data) {
      //return $.getJSON("api/depths/calculate.json", function (data) {
        var points = [];
        avaIFaceJS.dd_func.tableReport || (avaIFaceJS.dd_func.tableReport = $('#depths').dataTable({
          bPaginate: false,
          bInfo: false,
          bAutoWidth: false,
          bFilter: false
        }));
        avaIFaceJS.dd_func.tableReport.fnClearTable();
        $('#depths tbody tr').remove();
        $.each(data.items[channel].items, function () {
          avaIFaceJS.dd_func.tableReport.fnAddData(['<a href="javascript:void(0)">' + this.period + "</a>", this.chainage, this.depth, this.location]);
          return points.push([this.period, this.depth]);
        });

        avaIFaceJS.dd_func.tableReport.fnDraw();
        $('#depths tbody tr td:first-child a').click(function () {
          avaIFaceJS.dd_func.showDetail(this.innerText);
        });
        avaIFaceJS.dd_func.limit_text = (function () {
          switch (false) {
            case channel !== '0':
              if (page_lang === "eng") {
                return "Inner Channel Limit";
              } else {
                return "Limite intérieure";
              }
              break;
            case channel !== '1':
              if (page_lang === "eng") {
                return 'Outer Channel Limit';
              } else {
                return "Limite extérieure";
              }
              break;
            default:
              return '';
          }
        })();

        avaIFaceJS.reportWindow.title2 = "Fraser River - " + avaIFaceJS.dd_func.limit_text + " for " + moment($('#date').val()).format("MMMM D, YYYY");
        avaIFaceJS.reportWindow.subTitle1 = $('input[name="condition"]:checked').next().text() + " for KM 1-" + $('#chainage').val() + " at " + $('#width').val() + "% Available Width";
        avaIFaceJS.reportWindow.subTitle2 = "Hope Discharge " + $('#flowRate').val() + "m\u00B3/s (" + translate_flow() + ")";
        avaIFaceJS.reportWindow.setTitle();
        avaIFaceJS.reportWindow.show();
        avaIFaceJS.dd_func.createGraph(points);
        return $('.spinner').hide();
      });
    },

    // Callback function for form submission
    update: function () {
      return avaIFaceJS.dd_func.process_report(1);
    },

    // Create line graph using provided points from JSON query
    createGraph: function (p) {
      var d1, leadingZero, xLabel, yLabel;
      d1 = {
        color: "red",
        lines: {
          lineWidth: 3
        },
        data: p
      };
      leadingZero = function (num, axis) {
        var s;
        s = "0" + num;
        return s.substr(s.length - 4);
      };
      if (page_lang === "eng") {
        xLabel = "Pacific Standard Time (hrs)";
        yLabel = "Available Depth (m)";
      } else {
        xLabel = "Heure Normale du Pacifique (hrs)";
        yLabel = "Profondeurs disponibles (m)";
      }
      return $.plot("#depth_chart", [d1], {
        xaxis: {
          color: 'black',
          tickColor: '#aaa',
          axisLabel: xLabel,
          tickSize: 200,
          tickFormatter: leadingZero
        },
        yaxis: {
          color: 'black',
          tickColor: '#aaa',
          position: 'left',
          axisLabel: yLabel
        }
      })
    }
  }
} else if(!(typeof avaMapJS === 'undefined')) {

  /*** Map Interaction functions ***/

  avaMapJS.dd_func={init: function(){}}
}
