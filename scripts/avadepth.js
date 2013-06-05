$(function() {
  $('.datepicker').datepicker({dateFormat: 'yy-mm-dd'});
  $('.datepicker').val(moment().format('YYYY-MM-DD'));
});
