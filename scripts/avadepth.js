$(function() {
  $('.datepicker').datepicker({dateFormat: 'yy-mm-dd', altFormat: 'MM d, yy', altField: '#alt-date'});
  $('#date').datepicker("setDate", new Date());
});
