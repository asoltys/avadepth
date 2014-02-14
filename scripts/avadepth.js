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

$(function() {
  $('.datepicker').datepicker({dateFormat: 'yy-mm-dd', altFormat: 'MM d, yy', altField: '#alt-date'});
  $('#date').datepicker("setDate", new Date());
});
