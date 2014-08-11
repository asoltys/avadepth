//TODO: remove sdb-bds.js, pwl-nep.js, pwlk-nepk.js, pwlt-ptnd.js

// Load def JS File
var hd=document.getElementsByTagName('head')[0];
var scr=document.createElement('script');
scr.type='text/javascript';
scr.src='scripts/incl_ava_defs.js';
hd.appendChild(scr);

// Create avaIFace
var avaIFaceJS;
avaIFaceJS = {

  // Internal Object for handling the detail window
  detailWindow: {
    useMap: false,
    mapColorKey: null,
    detailContent: null,
    map: null,

    addContent: function (content) {
      avaIFaceJS.detailWindow.detailContent = avaIFaceJS.getElements(content);
    },
    show: function () {
      var repDet = $('#report_detail');
      $('#rep_detail_info').html('').append(avaIFaceJS.detailWindow.detailContent[0][0]).show();
      if (avaIFaceJS.detailWindow.useMap) {
        $('#rep_detail_map').show().css('width',repDet.width());
        $('#report_map').css('width',repDet.width());
        avaIFaceJS.detailWindow.mapJS.renderMap();
      }
      repDet.show().css('left', ($('#wb-core-in').width() - repDet.width()) / 2);
      $('#report_det_cover').show().css('height', (repDet.height() + repDet.offset().top + 50 < $(document).height() ? $(document).height() : repDet.height() + repDet.offset().top + 50));

    },
    hide: function () {
      if (avaIFaceJS.detailWindow.useMap) {
        $('#rep_detail_map').hide();
        avaIFaceJS.detailWindow.useMap = false;
      }
      $('#report_det_cover').hide();
      $('#report_detail').hide();
    }
  },

  // Internal Object for handling the report window
  reportWindow: {
    isInit: false,
    title1: "",
    title2: "",
    subTitle1: "",
    subTitle2: "",
    repBodyElem: $('#report_body'),
    repWrapper: $('#report_panels'),
    repContent: "",
    init: function () {
      avaIFaceJS.reportWindow.isInit = true;
      avaIFaceJS.reportWindow.hide();
      avaIFaceJS.reportWindow.clear();
    },
    showReport: function () {
      if (!avaIFaceJS.reportWindow.isInit) {
        avaIFaceJS.reportWindow.init()
      }

      avaIFaceJS.reportWindow.repWrapper.trigger('resize').show();
      avaIFaceJS.reportWindow.repBodyElem.trigger('resize').show();
    },
    loadReport: function () {

      //Title Template
      var repResultsTemp = [
        {tag: 'div', attr: {id: 'reportTitleDiv'}, child: [
          {tag: 'h2', attr: {id: 'reportTitle1', className: ['print_hide'], style: 'margin:3px 0 0 0'}},
          {tag: 'h2', attr: {id: 'reportTitle2', style: 'margin:3px 0 0 0'}},
          {tag: 'p', attr: {id: 'reportSubTitle'}, child: [
            {tag: 'span', attr: {id: 'reportSubT1'}},
            {tag: 'br'},
            {tag: 'span', attr: {id: 'reportSubT2'}}
          ]}
        ]}
      ];
      repResultsTemp.push(avaIFaceJS.reportWindow.repContent[0]);
      repResultsTemp = [
        {'tag': 'div', 'child': repResultsTemp}
      ];
      avaIFaceJS.reportWindow.repBodyElem.html(avaIFaceJS.getElements(repResultsTemp));

      avaIFaceJS.reportWindow.setTitle();
    },
    addTitle: function (reportTitle, reportLocation, subT1, subT2) {
      if (!avaIFaceJS.reportWindow.isInit) {
        avaIFaceJS.reportWindow.init()
      }
      if (reportTitle != undefined) {
        avaIFaceJS.reportWindow.title1 = reportTitle;
      }
      if (reportLocation != undefined) {
        avaIFaceJS.reportWindow.title2 = reportLocation;
      }
      if (subT1 != undefined) {
        avaIFaceJS.reportWindow.subTitle1 = subT1;
      }
      if (subT2 != undefined) {
        avaIFaceJS.reportWindow.subTitle2 = subT2;
      }

      avaIFaceJS.reportWindow.setTitle();
    },
    setTitle: function () {
      $('#reportTitle1').text(avaIFaceJS.reportWindow.title1);
      $('#reportTitle2').text(avaIFaceJS.reportWindow.title2);
      $('#reportSubT1').text(avaIFaceJS.reportWindow.subTitle1);
      $('#reportSubT2').text(avaIFaceJS.reportWindow.subTitle2);
    },
    addContent: function (content) {
      if (!avaIFaceJS.reportWindow.isInit) {
        avaIFaceJS.reportWindow.init()
      }
      avaIFaceJS.reportWindow.repContent = content;
    },
    hide: function () {
      avaIFaceJS.reportWindow.repBodyElem.hide();
      avaIFaceJS.reportWindow.repWrapper.hide();
    },
    clear: function () {
      avaIFaceJS.reportWindow.repBodyElem.innerHTML = "";
    }
  },

  init: function () {
    console.clear();
    $('#map_param_wrap').hide();
    avaIFaceJS.mapJS = null;
    avaIFaceJS.detailWindow.map = null;

    /*** Event Triggers ***/
      // Close Details Window
    $('#report_detail').on('click', function () {
      avaIFaceJS.detailWindow.hide();
    });
  },

  /*** General Functions ***/
  // Change page for new report
  loadPage: function (page_name) {
    // Load Embedded Map
    if (!avaIFaceJS.mapJS) {
      avaIFaceJS.mapJS = $('#embed_map')[0].contentWindow.avaMapJS;
      avaIFaceJS.detailWindow.mapJS = $('#report_map')[0].contentWindow.avaMapDetJS;
    }
    avaIFaceJS.mapJS.map.updateSize();
    // Retrieve Page Definition
    var pg_entry = incl_ava_defs.avaPages[page_name];

    // Set Title
    document.getElementById('ava_map_ttl').innerText = pg_entry.title_e;

    // Page Form Parameters
    var pgParam = $.extend([], pg_entry.formParam);
    pgParam.push({tag: 'button', attr: {id: 'submit', type: 'button', className: 'button button-accent', name: 'submit'}, 'child': ['Apply']});
    pgParam.push({tag: 'button', attr: {id: 'print', className: 'button button-accent'}, child: ['Print']});
    pgParam.push({tag: 'img', attr: {className: 'spinner', src: 'images/spinner.gif'}});
    var frmWrap = $('#map_parameters')[0];
    frmWrap.innerHTML = "";
    var v = avaIFaceJS.getElements([
      {'tag': 'form', attr: {id: 'frm_map_parameters'}, child: pgParam}
    ]);
    frmWrap.appendChild(v[0][0]);

    avaIFaceJS.detailWindow.addContent(pg_entry.reportDetail);

    avaIFaceJS.reportWindow.addContent(pg_entry.reportBody);
    avaIFaceJS.reportWindow.loadReport();

    // Load Page Interface
    avaIFaceJS.mapJS.setPageActivity(page_name);
    avaIFaceJS.detailWindow.mapJS.setPageActivity(page_name);
    window['avaIFaceJS'][page_name + "_func"].init();

    // Open Parameters Tab
    $('#map_param_wrap').show();
    $('#map').trigger('resize');
    if ($('#slideoutWrapper')[0].innerText == "Parameters") {
      $('#toggleLink')[0].click();
    }
    avaIFaceJS.setMapOpen(pg_entry.mapInitState);
    avaIFaceJS.reportWindow.hide();
  },

  // Open/Close Map when needed
  MapState: {Close: 0, Open: 1},
  setMapOpen: function (state) {
    var mapElem = $('#ref_map_det');
    if (state == avaIFaceJS.MapState.Close) {
      mapElem.removeAttr('open');
    } else {
      mapElem.attr('open', 'open');
    }
  },

  // Parse incoming object to DOM for Form, Report, and Detail layouts
  getElements: function (arr) {
    var res = [];
    if ($.isArray(arr)) {
      for (var a = 0; a < arr.length; a++) {
        if ($.type(arr[a]) === 'object') {
          var t = $('<' + arr[a]['tag'] + '></' + arr[a]['tag'] + '>');
          if ('attr' in arr[a]) {
            if ('className' in arr[a].attr) {
              t.addClass(arr[a].attr.className);
              delete arr[a].attr.className;
            }
            t.attr(arr[a].attr)
          }
          if ('ref' in arr[a]) {
            var tagUsed = arr[a]['ref']['tag'];
            var oArr = arr[a]['ref']['values'];
            if (typeof oArr == 'function') {
              oArr = oArr()
            }
            var r = [];
            for (var k in oArr) {
              var v = {tag: tagUsed, attr: {}, child: [oArr[k].value]};
              if ('key' in oArr[k]) {
                v.attr.value = oArr[k].key
              }
              if ('select' in oArr[k]) {
                v.attr.selected = "selected"
              }
              r.push(v);
            }
            arr[a].child = r;
          }
          if ('child' in arr[a]) {
            t.append(avaIFaceJS.getElements(arr[a]['child']));
          }
          res.push(t);
        } else {
          res.push(arr[a]);
        }
      }
    }
    return res;
  },

  /*** Page-specific Functions ***/

  dd_func: {
    flowrate: 0,
    tableReport: null,
    tableDetail: null,
    limit_text: "",

    init: function () {
      avaIFaceJS.reportWindow.title1 = "Available Depth Report";
      avaIFaceJS.reportWindow.title2 = "";
      $(".yaxislabel").css("color", "black");
      $('#date').change(function () {
        return avaIFaceJS.dd_func.getFlow({
          date: $(this).val(),
          selected: $("#selected_discharge"),
          predicted: $("#predicted_discharge"),
          actual: $("#actual_discharge")
        });
      }).datepicker().datepicker('setDate', new Date()).change();
      $('#selected_discharge').change(function () {
        return $('#selected_radio').prop('checked', true).change();
      });
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
    getFlow: function (options, callback) {
      var thisCallback = callback;

      //TODO: Replace below line for production
      //$.getJSON('/api/depths?date=' + options.date, function (data) {
      $.getJSON('api/depths/depths.json', function (data) {

        selectList = $(options.selected);

        var s = '';
        $.each(data.Flowrates, function (idx, itm) {
          s += '<option value=' + itm + '>' + itm + '</option>';
        });

        $('option', selectList).remove();
        selectList.append(s);

        $(options.predicted).text(data.Predicted);
        $(options.actual).text(data.Actual);

        if (data.Actual) {
          $("#predicted_radio").attr('disabled', true);
          $('#actual_radio').attr('disabled', false).prop('checked', true);
        } else {
          $("#actual_radio").attr('disabled', true);
          $("#predicted_radio").attr('disabled', false).prop('checked', true);
        }

        if (thisCallback) {
          callback(data);
        }
        return data.Predicted;
      });
    },
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
    showDetail: function (date) {
      avaIFaceJS.detailWindow.show();

      $('#static-time').text(date);
      $('#date-display').text(moment($('#date').val()).format("MMMM D, YYYY"));
      $('#static-limit').text(avaIFaceJS.dd_func.limit_text);
      $('#static-type').text($('input[name="condition"]:checked').next().text());
      $('#static-chainage').text($('#chainage').val());
      $('#static-width').text($('#width').val());
      $('#static-discharge').text($('#flowRate').val());
      $('#static-discharge-eval').text($('#flowType').val());

      //TODO: Replace line for production:
      //$.getJSON(("/api/depths/verify?date=" + ($('#date').val()) + "&") + ("chainage=" + ($('#chainage').val()) + "&") + ("flowRate=" + ($('#flowRate').val()) + "&") + "flowType=1&" + ("sounding=" + ($('#sounding').val()) + "&") + ("width=" + ($('#width').val()) + "&") + ("lane=" + (parseInt($("#lane").val()) + 1) + "&") + ("period=" + ($('#period').val())), function(data) {
      $.getJSON("api/depths/verify.json", function (data) {
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
    process_report: function (flag) {
      var channel, flow;

      //$("#date-display").text(moment($("#date").val()).format("MMMM D, YYYY"));

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
      //return $.getJSON(("/api/depths/calculate?date=" + ($('#date').val()) + "&") + ("chainage=" + ($('#chainage').val()) + "&") + ("flowRate=" + ($('#flowRate').val()) + "&") + ("flowType=" + ($('#flowType').val()) + "&") + ("width=" + ($('#width').val()) + "&") + ("sounding=" + ($('input[name=condition]:checked').val())), function(data) {
      return $.getJSON("api/depths/calculate.json", function (data) {
        var points = [], table = $('#depths'), rows = "";
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

        $('#depths tbody tr td:first-child a').click(function () {
          avaIFaceJS.dd_func.showDetail(this.innerText);
        });
        //$('#static-width').text($('#width').val());
        //$('#static-chainage').text($('#chainage').val());
        //$('#static-type').text($('input[name="condition"]:checked').next().text());
        avaIFaceJS.dd_func.limit_text = (function () {
          switch (false) {
            case channel !== '0':
              if ($("#lang").val() === "eng") {
                return "Inner Channel Limit";
              } else {
                return "Limite intérieure";
              }
              break;
            case channel !== '1':
              if ($("#lang").val() === "eng") {
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
        //$('#static-limit').text(limit_text);
        //$('#static-discharge').text($('#flowRate').val());
        //$('#static-discharge-eval').text(translate_flow());
        avaIFaceJS.reportWindow.setTitle();
        avaIFaceJS.reportWindow.showReport();
        avaIFaceJS.dd_func.createGraph(points);
        return $('.spinner').hide();
      });
    },
    update: function () {
      return avaIFaceJS.dd_func.process_report(1);
    },

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
      if ($("#lang").val() === "eng") {
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
  },

  pwl_func: {

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
      return $("#submit").click(avaIFaceJS.pwl_func.update);
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
        avaIFaceJS.reportWindow.showReport();
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
  },
  sdb_func: {
    /*** Local variables ***/
    heading_waterway: "Fraser - South Arm",
    tile: "",

    init: function () {
      // Fill Form Parameters

      // Load and fill location drop down
      $('#sdb_waterway, #channel').change(avaIFaceJS.sdb_func.fillLocation);

      // Colour Tiles when location field changes
      $('#location').change(function () {
        avaIFaceJS.sdb_func.tile = " at " + $(this).val();
        return avaIFaceJS.mapJS.sdb_func.refreshTiles($('#sdb_waterway').val(), $(this).val());
      });

      // Colour and resize map extents when waterway field changes
      $('#sdb_waterway').change(function () {
        avaIFaceJS.sdb_func.heading_waterway = $(this).find('option:selected').text();
        avaIFaceJS.sdb_func.tile = "";
        avaIFaceJS.reportWindow.addTitle("Surveys Search Results", avaIFaceJS.sdb_func.heading_waterway + " " + avaIFaceJS.sdb_func.tile);
        avaIFaceJS.mapJS.sdb_func.setExtents($(this).val());
        return $('#map').css("min-height", "400px");
      });

      // Submit form
      $("#submit").click(function () {
        var ww = $('#sdb_waterway').val();
        return avaIFaceJS.sdb_func.getSurveyDrawings({
          river: ww,
          drawingType: $('#type').val(),
          channel: ww,
          location: avaIFaceJS.sdb_func.tile,
          channelType: $('#channel').val()
        });
      });
      // Print page to printer
      $("#print").click(function () {
        return window.print();
      });
      var mapElem = $('#embed_map');
      mapElem.load(function () {
        $('#sdb_waterway').change();
      });
      return avaIFaceJS.sdb_func.fillLocation();
      //TODO: Delete -> return $('#heading-waterway').parent().css('margin-top', '0');
    },

    fillLocation: function () {
      $('#location option').remove();
      $('#location').append('<option></option>');
      return $.each(incl_ava_defs.locDefs[$('#sdb_waterway').val()]['Names'][$('#channel').val()], function () {
        return $('#location').append("<option>" + this + "</option>");
      });
    },

    getSurveyDrawings: (function (jsonStuff) {
      var drawingRows;
      $('.spinner').show();
      drawingRows = "";
      //TODO: Replace following line for Production
      //return $.getJSON(("api/surveys/getsurveys?river=" + jsonStuff.river + "&") + ("drawingType=" + jsonStuff.drawingType + "&") + "recent=&" + ("channel=" + jsonStuff.channel + "&") + ("location=" + jsonStuff.location + "&") + ("channelType=" + jsonStuff.channelType), function(data) {
      return $.getJSON(("includes/test.json"), function (data) {
        avaIFaceJS.reportWindow.addTitle("Surveys Search Results", avaIFaceJS.sdb_func.heading_waterway + " " + avaIFaceJS.sdb_func.tile);
        $('#report_tbl tbody').html('');
        $.each(data, function () {
          var addRow;
          addRow = false;
          if (jsonStuff.kmStart && jsonStuff.kmEnd) {
            if (parseFloat(jsonStuff.kmStart) <= parseFloat(this.kmStart) && parseFloat(jsonStuff.kmEnd) >= parseFloat(this.kmEnd)) {
              addRow = true;
            }
          } else {
            addRow = true;
          }
          if (addRow) {
            return drawingRows += "<tr>" + ("<td>" + (this.date.split("T")[0]) + "</td>") + ("<td><a href='/Data/dwf/" + this.fileNumber + ".dwf'>" + this.fileNumber + "</a></td>") + ("<td>" + this.location + "</td>") + ("<td>" + this.drawType + "</td>") + ("<td>" + this.kmStart + "</td>") + ("<td>" + this.kmEnd + "</td>") + "</tr>";
          }
        });
        avaIFaceJS.setMapOpen(avaIFaceJS.MapState.Close);
        avaIFaceJS.reportWindow.showReport();
        return $('#report_tbl').append(drawingRows);
      }).done(function () {
        $('.spinner').hide();
        $('#report_tbl tr:nth-child(odd)').addClass('odd');
        return $('#report_tbl tr:nth-child(even)').addClass('even');
      });
    }),

    getSurveyDrawingsFromTiles: (function (jsonStuff) {
      var drawingRows;
      $('.spinner').show();
      drawingRows = "";
      return $.getJSON("api/get_tile/" + jsonStuff.tile + ".json", function (data) {
        //TODO: Replace following line for previous in production
        //return $.getJSON("api/get_tile.asp?tile=" + jsonStuff.tile, function(data) {
        avaIFaceJS.reportWindow.addTitle("Surveys Search Results", avaIFaceJS.sdb_func.heading_waterway + " at " + jsonStuff.name);
        $('#report_tbl tbody').html('');
        $.each(data.drawings, function () {
          return drawingRows += "<tr>" + ("<td>" + (moment(this.yyyy_mm_dd, "DD/MM/YYYY").format("YYYY-MM-DD")) + "</td>") + ("<td><a href='/Data/dwf/" + this.Svy_Filename + ".dwf' target='_blank'>" + this.Svy_Filename + "</a></td>") + ("<td>" + this.Location + "</td>") + ("<td>" + this.Type + "</td>") + ("<td>" + this.KMstart + "</td>") + ("<td>" + this.KMend + "</td>") + "</tr>";
        });
        return $('#report_tbl').append(drawingRows);
      }).done(function () {
        $('.spinner').hide();
        $('#report_tbl tr:nth-child(odd)').addClass('odd');
        avaIFaceJS.reportWindow.showReport();
        return $('#report_tbl tr:nth-child(even)').addClass('even');
      });
    })

  }
};
avaIFaceJS.init();
