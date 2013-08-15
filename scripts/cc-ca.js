(function() {
  var table;

  table = null;

  $(function() {
    var date, month, weekday;
    date = new Date();
    weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    $('#static-date').text("For " + weekday[date.getDay()] + ",      " + month[date.getMonth()] + "      " + (date.getDate()) + ",      " + (date.getFullYear()));
    return $.getJSON(("/api/Soundings?id=" + (date.getFullYear()) + "-") + ("" + (date.getMonth() + 1) + "-") + ("" + (date.getDate())), function(data) {
      table || (table = $('#soundings').dataTable({
        bPaginate: false,
        bInfo: false,
        bFilter: false,
        aoColumnDefs: [
          {
            sClass: "1",
            "aTargets": [2, 3, 4, 5]
          }, {
            sClass: "2",
            "aTargets": [6, 7, 8, 9]
          }
        ],
        aaSorting: []
      }));
      table.fnClearTable();
      $.each(data, function(index) {
        table.fnAddData(["<a href=\"soundings-sondages-eng.html?lane=1&chainage=" + (index + 1) + "\">" + this.Chainage + "</a>", this.SoundingDate, this.Dredge, this.Sounding, this.Width, this.WidthPerc, this.Dredge2, this.Sounding2, this.Width2, this.WidthPerc2]);
        if (this.IsHigh) {
          $('#soundings tr:last').find('.1').addClass('red');
          $('#soundings tr:last td:eq(3)').append('*');
        }
        if (this.IsHigh2) {
          $('#soundings tr:last').find('.2').addClass('red');
          return $('#soundings tr:last td:eq(7)').append('*');
        }
      });
      return table.fnAdjustColumnSizing();
    });
  });

}).call(this);
