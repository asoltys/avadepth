/**
 * Created by wsiddall on 26/08/2014.
 */

  // Fraser River Hydrograph Object
if(!(typeof avaIFaceJS === 'undefined')) {

/*** Interface functions ***/
  var curDate = new Date();
  avaIFaceJS.frh_func= {
    init: function(){
      $('#date').datepicker({
        changeMonth: true,
        changeYear: true,
        minDate: new Date(1994,1,1)
      }).datepicker('setDate', new Date(curDate.getFullYear(),0,1));
      $('#submit').click(avaIFaceJS.frh_func.update);
      avaIFaceJS.frh_func.update();
    },

    update: function(){
      var options = {
        grid: {
          backgroundColor: {
            colors: ["#fff", "#e4f4f4"]
          }
        },
        series: {
          lines: {
            show: true,
            lineWidth: 1.2
          },
          points: {
            show: false
          }
        },
        colors: ['red', 'blue', '#000', '#777'],
        xaxis: {
          mode: "time",
          color: 'white',
          tickColor: 'white',
          axisLabelUseCanvas: true,
          axisLabelFontSizePixels: 15,
          axisLabelFontFamily: 'Verdana, Arial',
          axisLabelPadding: 10
        },
        yaxis: {
          axisLabel: "Hope Discharge (m\u00B3/s)",
          axisLabelUseCanvas: true,
          axisLabelFontSizePixels: 15,
          axisLabelFontFamily: 'Verdana, Arial',
          axisLabelPadding: 6
        },
        legend: {
          container: "#legend_container",
          noColumns: 0,
          labelBoxBorderColor: "none"
        }
      };
      avaIFaceJS.reportWindow.loadReport();
      var dataset, actual, maximum, minimum, month, period, period_end, predicted, year, curDate;
      minimum=[];
      maximum=[];
      actual=[];
      predicted=[];
      curDate=$('#date').datepicker('getDate');
      month=curDate.getMonth();
      year=curDate.getFullYear();

      //mattys hax
      month += 2;
      if (month ===13) month = 1;
      if (month ===1) year += 1;
      period=$('#period option:selected').html().split(" ")[0];
      period_end=moment([year,month,1]).add('months',period-2);
      avaIFaceJS.reportWindow.title1="Fraser River Hydrograph at Hope - 08MF005";
      avaIFaceJS.reportWindow.title2="From "+moment(curDate).format("MMMM YYYY")+" to "+period_end.format("MMMM YYYY");
      avaIFaceJS.reportWindow.setTitle();
      $('#spinner').show();
      $('#loading').show();
      $('#hydrograph_chart').html('');

      //TODO: Replace with following line for production
      $.getJSON(getAPI(("/api/hydrograph?year=" + year + "&") + ("month=" + (month) + "&") + ("period=" + ($('#period').val()) + "&") + "actual=false&" + "predicted=true","api/depths/hydrograph.json"), function(results) {
      //$.getJSON(("/api/hydrograph?year=" + year + "&") + ("month=" + (month) + "&") + ("period=" + ($('#period').val()) + "&") + "actual=false&" + "predicted=true", function(results) {
      //$.getJSON("api/depths/hydrograph.json", function(results) {
        $.each(results, function(i,v){
          year= v.year;
          month= v.month-1;
          $.each(v.minMax, function(i, v){
            var selDate, day;
            day= v.day+1;
            selDate = [year,month,day];
            minimum.push([moment(selDate), v.minValue]);
            return maximum.push([moment(selDate), v.maxValue]);
          });
          if ($("#actual").prop("checked")) {
            $.each(v.actual, function(i, v) {
              var discharge;
              discharge = [moment(v.date), v.value];
              if (discharge[1] !== 0) {
                return actual.push(discharge);
              }
            });
          }
          if ($("#predicted").prop("checked")) {
            return $.each(v.predicted, function(i, v) {
              var discharge;
              discharge = [moment(v.date), v.value];
              if (discharge[1] !== 0) {
                return predicted.push(discharge);
              }
            });
          }
        });
        dataset = [
          {
            data: maximum,
            label: "Max Range"
          }, {
            data: minimum,
            label: "Min Range"
          }, {
            data: actual,
            label: "Actual"
          }, {
            data: predicted,
            label: "Predicted"
          }
        ];
        if ($('html').attr('lang') === 'fr') {
          dataset = [
            {
              data: maximum,
              label: "Portée maximale"
            }, {
              data: minimum,
              label: "Portée minimale"
            }, {
              data: actual,
              label: "Données réelles"
            }, {
              data: predicted,
              label: "Prévu"
            }
          ];
        }
        avaIFaceJS.reportWindow.show();
        var h = $.plot($('#hydrograph_chart'), dataset, options);
        avaIFaceJS.reportWindow.show();
        h.getData()[2].lines.lineWidth=2.5;
        h.getData()[3].lines.lineWidth=2.5;
        h.draw();
        $('#loading').hide();
      });
    }
  }
} else if(!(typeof avaMapJS === 'undefined')) {

  /*** Map Interaction functions ***/

  avaMapJS.frh_func={init: function(){}}
} else if (!(typeof avaMapDetJS === 'undefined')) {
  avaMapDetJS.frh_func = {init: function () {}};
}
