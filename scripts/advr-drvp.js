(function() {
  var flowrate, gotoDepthsReport, querystring, table;

  table = null;

  flowrate = 0;

  gotoDepthsReport = function() {
    return document.location = ("ad-pd-eng.html?date=" + ($('#date').val()) + "&") + ("chainage=" + ($('#chainage').val()) + "&") + ("flowRate=" + ($('#flowRate').val()) + "&") + ("flowType=" + ($('#flowType').val()) + "&") + ("sounding=" + ($('#sounding').val()) + "&") + ("width=" + ($('#width').val()) + "&") + ("lane=" + ($('#lane').val()) + "&") + ("period=" + ($('#period').val()));
  };

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

  $(function() {
    $("#print_daily_depths").click(function() {
      return window.print();
    });
    $(".depths").click(gotoDepthsReport);
    $("#date").val(querystring('date'));
    $("#chainage").val(querystring('chainage'));
    $("#flowRate").val(querystring('flowRate'));
    $("#flowType").val(querystring('flowType'));
    $("#sounding").val(querystring('sounding'));
    $("#width").val(querystring('width'));
    $("#lane").val(querystring('lane'));
    $("#period").val(querystring('period'));
    return $.getJSON(("/api/depths/verify?date=" + ($('#date').val()) + "&") + ("chainage=" + ($('#chainage').val()) + "&") + ("flowRate=" + ($('#flowRate').val()) + "&") + "flowType=1&" + ("sounding=" + ($('#sounding').val()) + "&") + ("width=" + ($('#width').val()) + "&") + "lane=1&" + "period=3", function(data) {
      var points;
      table || (table = $('#verify').dataTable({
        bPaginate: false,
        bInfo: false,
        bFilter: false,
        bAutoWidth: false,
        aaSorting: []
      }));
      table.fnClearTable();
      $('#verify tbody tr').remove();
      points = new Array();
      return $.each(data.items, function() {
        return table.fnAddData([this.location, this.designGrade, this.sounding, this.width, this.percent, this.tidalAid, this.depth.toFixed(2)]);
      });
    });
  });

}).call(this);
