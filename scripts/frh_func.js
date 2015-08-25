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

      avaIFaceJS.frh_func.update(); // for initial load
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
      var dataset, actual, maximum, minimum, predicted, curDate, period, month, month_end, year, year_end;
      actual=[];
      maximum=[];
      minimum=[];
      predicted=[];

      curDate=$('#date').datepicker('getDate');
      period=parseInt($('#period option:selected').html().split(" ")[0]); // data period in months
	  
      month=curDate.getMonth();
      month_end = (month + period) % 12;
	  
	  year=curDate.getFullYear();
	  if ((period == 12) || ((month + period) > 11)){
		year_end = year + 1;
	  } else {
		year_end = year;
	  }
	  
	  month = (month == 11)? 1 : (month + 2); // increment value to align with database request

	  avaIFaceJS.reportWindow.loadReport();
	  
	  // set date language
	  if(window.location.href.indexOf("fra") > -1) {
		moment.locale('fr');
	  }  else {
		moment.locale('en');
      }

      avaIFaceJS.reportWindow.addTitle("Fraser River Hydrograph at Hope - 08MF005","From "+moment(curDate).format("MMMM YYYY")+" to "+ moment([year_end,month_end,1]).format("MMMM YYYY"));
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
		pBarToggle();
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
