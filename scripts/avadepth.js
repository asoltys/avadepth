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
  if ($("#lang").val() == "fra") {
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
  } else {
    flow = $("#flowType").val()

  }

  return flow;
}
$(function() {
  $('.datepicker').datepicker({dateFormat: 'yy-mm-dd', altFormat: 'MM d, yy', altField: '#alt-date'});
  $('#date').datepicker("setDate", new Date());
});
