
// Current Channel Conditions Objects
if(!(typeof avaIFaceJS === 'undefined')) {

/*** Interface functions ***/
  avaIFaceJS.ccc_func = {
    detailIsInnerChannel:true,
    init: function () {
		if(window.location.href.indexOf("fra") > -1) {
			//If url contains 'fra'	use 
			avaIFaceJS.reportWindow.title1 = "Conditions actuelles du chenal – bras sud du fleuve Fraser";
		} else {
		//If url does not contain 'fra' use
			avaIFaceJS.reportWindow.title1 = "Fraser River Navigation Channel Condition Report";
		}
      var date, month, weekday, table;
      date = new Date();
	  if(window.location.href.indexOf("fra") > -1) {
		//If url contains 'fra'	use 
		weekday = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];
		month = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
		avaIFaceJS.reportWindow.title2 = weekday[date.getDay()] + " " + (date.getDate()) + " " + month[date.getMonth()] + " " + (date.getFullYear());
		} else {
		//If url does not contain 'fra' use
		weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		avaIFaceJS.reportWindow.title2 = "For " + weekday[date.getDay()] + ", " + month[date.getMonth()] + " " + (date.getDate()) + ", " + (date.getFullYear());

		}
      //$('#static-date').text("For " + weekday[date.getDay()] + ", " + month[date.getMonth()] + " " + (date.getDate()) + ", " + (date.getFullYear()));
      //TODO: Replace next line for production
      return $.getJSON(getAPI(("/api/Soundings?id=" + (date.getFullYear()) + "-") + ("" + (date.getMonth() + 1) + "-") + ("" + (date.getDate())), "api/depths/soundings.json"), function(data) {
      //return $.getJSON(("/api/Soundings?id=" + (date.getFullYear()) + "-") + ("" + (date.getMonth() + 1) + "-") + ("" + (date.getDate())), function(data) {
      //return $.getJSON("api/depths/soundings.json", function (data) {
        table || (table = $('#soundings').dataTable({
          bPaginate: false,
          bInfo: false,
          bSort: false,
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
        $('#soundings').css('width', '800px');
        avaIFaceJS.reportWindow.setTitle();
        avaIFaceJS.reportWindow.show();
      });

    },
    showDetail: function () {
      avaIFaceJS.detailWindow.loadLayout();
      //var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
      avaIFaceJS.ccc_func.chainage = this.id;
      $('input[id="inner_select"]').attr('checked','checked');
      avaIFaceJS.detailWindow.show();
      $('#heading').text("Kilometre " + (avaIFaceJS.ccc_func.chainage - 1) + " to " + (avaIFaceJS.ccc_func.chainage));
      $('input[name=channel_select]').change(avaIFaceJS.ccc_func.setChannel).change();
    },
    setChannel:function(){
      if(!($(this).is(':checked'))){return;}
      avaIFaceJS.ccc_func.detailIsInnerChannel=($(this).val()==="1");
      $('#segment').text($(this).next().text());
      $('#surveys tbody').html('');
      //TODO: Replace following line for production
      return $.getJSON(("/api/History?date=" + (moment().format("YYYY-M-D").toString()) + "&") + ("lane=" + (avaIFaceJS.ccc_func.detailIsInnerChannel ? "1" : "2")) + "&" + ("chainage=" + avaIFaceJS.ccc_func.chainage), function(data) {
      //return $.getJSON(("api/depths/History.json"), function (data) {
        $.each(data, function (index) {
          var row, surveydate, ishigh="", ishighast="";
          surveydate = moment(this.date).format("D-MMM-YYYY").toString();
          if(this.grade>this.sounding){
            ishigh=" class=\"red\"";
            ishighast="*";
          }
          row = "<tr>" + ("<td>" + surveydate + "</td>") + ("<td><a href=\"http://www2.pac.dfo-mpo.gc.ca/Data/dwf/" + this.Plan + ".dwf\" target=\"_blank\">" + this.Plan + "</a></td>") + ("<td"+ishigh+">" + (this.grade.toFixed(1)) + "</td><td"+ishigh+">" + (this.sounding.toFixed(1)) + ishighast + "</td>") + ("<td"+ishigh+">" + this.width + "</td><td"+ishigh+">" + this.widthperc + "</td>") + "</tr>";
          return $("#surveys tbody").append(row);
        });
      });
    }
  };
} else if(!(typeof avaMapJS === 'undefined')) {

  /*** Map Interaction functions ***/
  avaMapJS.ccc_func = {init: function () {}};
} else if (!(typeof avaMapDetJS === 'undefined')) {
  avaMapDetJS.ccc_func = {init: function () {}};
}
