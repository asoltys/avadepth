
// Current Channel Conditions Objects
if(!(typeof avaIFaceJS === 'undefined')) {

/*** Interface functions ***/
  avaIFaceJS.ccc_func = {
    detailIsInnerChannel:true,
    init: function () {
      avaIFaceJS.reportWindow.title1 = "Fraser River Navigation Channel Condition Report";
      var date, month, weekday, table;
      $('#soundings').css('width', '800px');
      date = new Date();
      weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
      avaIFaceJS.reportWindow.title2 = "For " + weekday[date.getDay()] + ", " + month[date.getMonth()] + " " + (date.getDate()) + ", " + (date.getFullYear());
      //$('#static-date').text("For " + weekday[date.getDay()] + ", " + month[date.getMonth()] + " " + (date.getDate()) + ", " + (date.getFullYear()));
      //TODO: Replace next line for production
      //return $.getJSON(("/api/Soundings?id=" + (date.getFullYear()) + "-") + ("" + (date.getMonth() + 1) + "-") + ("" + (date.getDate())), function(data) {
      return $.getJSON("api/depths/soundings.json", function (data) {
        table || (table = $('#soundings').dataTable({
          bPaginate: false,
          bInfo: false,
          bFilter: false,
          aoColumnDefs: [
            {
              sClass: "1",
              "aTargets": [2, 3, 4, 5]
            },
            {
              sClass: "2",
              "aTargets": [6, 7, 8, 9]
            }
          ],
          aaSorting: [],
          aoColumns: [
            {
              "bSortable": false
            },
            null
          ]
        }));
        table.fnClearTable();
        $.each(data, function (index) {
          //table.fnAddData(["<a href=\"soundings-sondages-eng.html?lane=1&chainage=" + (index + 1) + "\">" + this.Chainage + "</a>", this.SoundingDate, this.Dredge, this.Sounding, this.Width, this.WidthPerc, this.Dredge2, this.Sounding2, this.Width2, this.WidthPerc2]);
          table.fnAddData(["<a href='javascript:void(0)' id='" + (index + 1) + "'>" + this.Chainage + "</a>", this.SoundingDate, this.Dredge, this.Sounding, this.Width, this.WidthPerc, this.Dredge2, this.Sounding2, this.Width2, this.WidthPerc2]);
          if (this.IsHigh) {
            $('#soundings tr:last').find('.1').addClass('red');
            $('#soundings tr:last td:eq(3)').append('*');
          }
          if (this.IsHigh2) {
            $('#soundings tr:last').find('.2').addClass('red');
            return $('#soundings tr:last td:eq(7)').append('*');
          }
        });
        table.fnAdjustColumnSizing();
        $('#soundings').css('table-layout', 'fixed');
        $('.first-row th:nth-child(1)').css('width', '123px');
        $('.first-row th:nth-child(2)').css('width', '218px');
        return $('.first-row th:nth-child(3)').css('width', '218px');
      }).success(function () {
        $('#soundings tbody tr a').click(avaIFaceJS.ccc_func.showDetail);
        avaIFaceJS.reportWindow.setTitle();
        avaIFaceJS.reportWindow.show();
      });

    },
    showDetail: function () {
      avaIFaceJS.detailWindow.loadLayout();
      $('#surveys tbody').html('');
      //var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      var chainage = this.id;
      $('#heading').text("Kilometre " + (chainage - 1) + " to " + (chainage));
      //TODO: Replace following line for production
      //return $.getJSON(("/api/History?date=" + (moment().format("YYYY-M-D").toString()) + "&") + ("lane=" + (avaIFaceJS.ccc_func.detailIsInnerChannel ? "1" : "0")) + "&" + ("chainage=" + chainage), function(data) {
      return $.getJSON(("api/depths/History.json"), function (data) {
        $.each(data, function (index) {
          var row, surveydate;
          if (index % 2 === 1) {
            surveydate = moment(this.date).format("D-MMM-YYYY").toString();
          } else {
            surveydate = moment(this.update).format("D-MMM-YYYY").toString();
          }
          row = "<tr>" + ("<td>" + surveydate + "</td>") + ("<td><a href=\"http://www2.pac.dfo-mpo.gc.ca/Data/dwf/" + this.Plan + ".dwf\" target=\"_blank\">" + this.Plan + "</a></td>") + ("<td>" + (this.grade.toFixed(1)) + "</td><td>" + (this.sounding.toFixed(1)) + "</td>") + ("<td>" + this.width + "</td><td>" + this.widthperc + "</td>") + "</tr>";
          return $("#surveys tbody").append(row);
        });
        avaIFaceJS.detailWindow.show();
        $('input[name=channel_select]').click(avaIFaceJS.ccc_func.setChannel);
      });
    },
    setChannel:function(){
      avaIFaceJS.ccc_func.detailIsInnerChannel=($(this).val()==="1");
      console.log(avaIFaceJS.ccc_func.detailIsInnerChannel);
    }
  };
} else if(!(typeof avaMapJS === 'undefined')) {

  /*** Map Interaction functions ***/
  avaMapJS.ccc_func = {init: function () {}};
}