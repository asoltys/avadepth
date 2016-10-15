var querystring = function(key) {
  var m, r, re;
  re = new RegExp('(?:\\?|&)' + key + '=(.*?)(?=&|$)', 'gi');
  r = [];
  m = [];
  while ((m = re.exec(document.location.search)) !== null) {
    r.push(m[1]);
  }
  return r;
};

var translate_flow = function() {
  var flow = "";
  if (window.location.href.indexOf("fra") > -1) {
    switch($("#flowType").val()) {
      case "Predicted":
        flow = "Prévu";
        break;
      case "Actual":
        flow = "Réel";
        break;
      case "Selected":
        flow = "Choisi";
        break;
      case "UserDefined":
        flow = "Défini par l'utilisateur";
        break;
      default:
        flow = "N/A"
        break;
    }
  } else if ($("#flowType").val() === "UserDefined"){
    flow = "User-defined";
  } else {
    flow = $("#flowType").val()
  }

  return flow;
}
$(function() {
  $('.datepicker').datepicker({dateFormat: 'yy-mm-dd', altFormat: 'MM d, yy', altField: '#alt-date'});
  $('#date').datepicker("setDate", new Date());
});

//highlight current link and tab in local nav
$( document ).on( "wb-ready.wb-tabs", ".wb-tabs", function( event ) {
    var arr = document.getElementsByClassName("wb-tabs").item(0).getElementsByTagName("a");
    for (var i = 0, len = arr.length; i < len; ++i) {
        if (arr[i].href == window.location.href) {
            var targetTab = $(arr[i]).parent().closest('details').attr('id').slice(-1);
            var currentTab = $('details.in[role="tabpanel"]').attr('id').slice(-1);
            var shift = Number(targetTab) - Number(currentTab);
            if (shift != 0) {
              $(".wb-tabs").trigger({
                type: "wb-shift.wb-tabs",
                shiftto: shift
              });
            }
            $(arr[i]).contents().unwrap().wrap("<strong></strong>");
            break;
        }
    }
});