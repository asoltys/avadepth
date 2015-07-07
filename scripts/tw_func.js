/**
 * Created by wsiddall on 26/08/2014.
 */


if(!(typeof avaIFaceJS === 'undefined')) {

/*** Interface functions ***/
  avaIFaceJS.tw_func={
    table: null,

    init: function(){
      $('#date').change(function () {
        avadepth.util.getFlow({
          date: $(this).val(),
          selected: $("#selected_discharge"),
//          predicted: $("#predicted_discharge"),
          actual: $("#actual_discharge")
        });
      }).datepicker().datepicker('setDate', new Date()).change();
      $('#selected_radio').prop('checked', true);

      $('#period').change(function(){
        var period = (function(){
          switch ($('#period').val()) {
            case '0':
              return 'd';
            case '1':
              return 'w';
            case '2':
              return 'M';
          }
        })();
      });
      $('#selected_discharge').change(function() {
        return $('#discharge_radio').prop('checked', true).change();
      });
      $('#compliance').change(function() {
        $('#cmp_box').val(0);
        if ($('#compliance').is(':checked')) {
          return $('input[name="cmp_box"]').attr('disabled', false);
        } else {
          $('input[name="cmp_box"]').attr('disabled', true);
          return $('input[name=cmp_box]').change(function() {
            return $('#cmp_box').val();
          });
        }
      });
      $('#minimum_window').change(function() {
        $('#max_depth_radio').prop('checked', 'checked');
        $('#window').val($(this).val());
        $('#cmp').val(0);
        return $('#static-window').text("" + ($('#window').val()));
      });
      $('#depth').change(function() {
        $('#min_win_radio').prop('checked', 'checked');
        $('#cmp').val($(this).val());
        return $('input[name="window_radio"]').change();
      });
      $('#submit').click(avaIFaceJS.tw_func.update);
    },

    update: function(data){
      var tableStruct={
        maxDepth:[
          {tag:'tr',child:[
            {tag:'td',attr:{width:"40%"},child:["Number of Days with Selected Window:"]},
            {tag:'td',child:[{tag:'span',attr:{id:'num_days'}}]},
            {tag:'td',child:["Maximum Depth (m):"]},
            {tag:'td',child:[{tag:'span',attr:{id:'max_depth'}}]}
          ]},
          {tag:'tr',child:[
            {tag:'td',attr:{width:"40%"},child:["Average Depth of Selected Window:"]},
            {tag:'td',child:[{tag:'span',attr:{id:'avg_depth'}}]},
            {tag:'td',child:["Minimum Depth (m):"]},
            {tag:'td',child:[{tag:'span',attr:{id:'min_depth'},child:["-"]}]}
          ]}
        ],
        availWindow:[
          {tag:'tr',child:[
            {tag:'td',attr:{width:"45%"},child:["Total hours meeting standard:"]},
            {tag:'td',child:[{tag:'span',attr:{id:'total_hr'}}]},
            {tag:'td',child:["Average hours per day meeting standard:"]},
            {tag:'td',child:[{tag:'span',attr:{id:'avg_hr'}}]}
          ]},
          {tag:'tr',child:[
            {tag:'td',attr:{width:"40%"},child:["Number of days meeting standard:"]},
            {tag:'td',child:[{tag:'span',attr:{id:'num_days_meeting_standard'}}]},
	    {tag:'td',child:[""]},
            {tag:'td',child:[""]}
          ]}
        ]
      };
      var dt=$('#date').val();
      var period = function(){
        switch ($('#period').val()){
          case "0":
            return 1;
          case "1":
            return 7;
          case "2":
            var cd = $('#date').datepicker('getDate');
            return new Date(cd.getFullYear(),cd.getMonth(),0).getDate();
        }

      }();
      avaIFaceJS.reportWindow.title2="From "+moment(dt).format("MMMM DD, YYYY")+" to "+moment(dt).add(period, 'days').format("MMMM DD, YYYY");

      if($('input[name="window_radio"]:checked').val()=='Maximum Depth') {
        $('#header_table').html('').append(avaIFaceJS.getElements(tableStruct.maxDepth));
        $('#cmp').val(0);
        if(window.location.href.indexOf("fra") > -1) {
          //If url contains 'fra'	use 
          avaIFaceJS.reportWindow.title1='Profondeur maximum pour la fenêtre de '+$('#window').val()+' heures';
          $('#transit-window-last-col').text('Maximum Depth (m)');
        } else {
          //If url does not contain 'fra' use
          avaIFaceJS.reportWindow.title1='Maximum Depth for '+$('#window').val()+'hr. Transit Window';
          $('#transit-window-last-col').text('Maximum Depth (m)');
        }
      } else {
        $('#header_table').html('').append(avaIFaceJS.getElements(tableStruct.availWindow));
        $('#cmp').val($('#depth').val());
        if(window.location.href.indexOf("fra") > -1) {
          //If url contains 'fra'	use 
          avaIFaceJS.reportWindow.title1='Available Transit Window for '+$('#cmp').val()+'m depth';
          $('#transit-window-last-col').text('Heures (h)');
        } else {
          //If url does not contain 'fra' use
          avaIFaceJS.reportWindow.title1='Available Transit Window for '+$('#cmp').val()+'m depth';
          $('#transit-window-last-col').text('Hours (h)');
          }
        }

      var flow;
      flow = avadepth.util.getSelectedFlow();
      $("#flowRate").val(flow.flowRate);
      if (flow.flowType !== "0") {
        $('#flowType').val(flow.flowType);
      } else {
        $('#flowType').val("UserDefined");
      }
      $('#static-discharge').text(flow.flowRate);
      $('#static-discharge-eval').text($('input[name=discharge]:checked').val());
      if ($('html').attr('lang') === 'fr') {
        flowRate_txt = (function() {
          switch ($(this).val()) {
//            case 'Predicted':
//              return "prévu";
            case 'Actual':
              return "réel";
            case 'Defined':
              return "défini par l'utilisateur";
            case 'Selected':
              return "choisi";
          }
        }).call(this);
        $("#static-discharge-eval").text(flowRate_txt);
      }
      $('.spinner').show();
      $('#static-sounding').text($('input[name="sounding"]:checked').next().text());
      $('#static-width').text($('select#width').val());
      $('#static-chainage').text($('select#chainage').val());
      $('#static-window').text($('#window').val());

      //TODO: Change to following line for production
      return $.getJSON(getAPI(("api/transit?date=" + ($('#date').val()) + "&") + ("lane=" + ($('input[name=channel]:checked').val()) + "&") + ("window=" + ($('#window').val()) + "&") + ("cmp=" + ($('#cmp').val()) + "&") + ("flowType=" + ($('#flowType').val()) + "&") + ("periodType=" + ($('#period').val()) + "&") + ("chainage=" + ($('#chainage').val()) + "&") + ("flowRate=" + ($('#flowRate').val()) + "&") + ("width=" + ($('#width').val()) + "&") + ("sounding=" + ($('input[name=sounding]:checked').val())),"api/depths/transit.json"), function(data2) {
        var item, limit_text, num_days_meeting_standard, total_hr, _i, _len, _ref;
        $('#num_days').text(data2.statistics.numberOfDays);
        $('#min_depth').text(data2.statistics.minimumDepth.toFixed(2));
        $('#max_depth').text(data2.statistics.maximumDepth.toFixed(2));
        $('#avg_depth').text(data2.statistics.totalWindow.toFixed(2));
        avaIFaceJS.tw_func.table || (avaIFaceJS.tw_func.table = $('#transit-window').dataTable({
          bPaginate: false,
          bInfo: false,
          bFilter: false,
          aaSorting: []
        }));
        avaIFaceJS.tw_func.table.fnClearTable();
        _ref = data2.items;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          item = _ref[_i];
          avaIFaceJS.tw_func.table.fnAddData([item.startTime, item.windowStart, item.endTime, item.windowEnd, item.depth]);
        }
        $('#transit-window tbody td').css('text-align', 'center');
        avaIFaceJS.tw_func.table.fnAdjustColumnSizing();
        avaIFaceJS.tw_func.table.fnDraw();
        limit_text = (function() {
          switch (false) {
            case $('input[name="channel"]:checked').val() !== '2':
              if ($('html').attr('lang') === 'en') {
                return 'Outer Channel Limit';
              } else {
                return 'Limite extérieure';
              }
              break;
            case $('input[name="channel"]:checked').val() !== '1':
              if(window.location.href.indexOf("eng") > -1) {
                return 'Inner Channel Limit';
              } else {
                return 'Limite intérieure';
              }
              break;
            default:
              return '';
          }
        })();
        $('#static-channel').text(limit_text);
        total_hr = 0;
        num_days_meeting_standard = $('#transit-window tbody tr').length;
        $('#transit-window tbody tr td:last-child').each(function() {
          var my_val;
          my_val = $(this).text();
          return total_hr += parseFloat(my_val);
        });
        $('#total_hr').text(total_hr);
        $('#avg_hr').text(Math.round(total_hr / num_days_meeting_standard * 100) / 100);
        return $('#num_days_meeting_standard').text(num_days_meeting_standard);
      }).success(function() {
        $('.spinner').hide();
        avaIFaceJS.reportWindow.setTitle();
        return avaIFaceJS.reportWindow.show();
      }).error(function() {
        $('.spinner').hide();
        avaIFaceJS.reportWindow.showError('An error occured while retrieving your results');
      });
    }
  }
} else if(!(typeof avaMapJS === 'undefined')) {

  /*** Map Interaction functions ***/

  avaMapJS.tw_func={init: function(){}}
} else if (!(typeof avaMapDetJS === 'undefined')) {
  avaMapDetJS.tw_func = {init: function () {}};
}

//# sourceURL=tw_func.js
