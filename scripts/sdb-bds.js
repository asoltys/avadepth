
  $(function() {
    $('#surveys').dataTable({
      iDisplayLength: 25
    });
    $('#waterway').change(function() {
      $('#heading-waterway').text($(this).find('option:selected').text());
      $('.map-group').hide();
      $('.map-group>div').hide();
      $('#' + $(this).val() + '-map').show();
      $('#' + $(this).val() + '-map').find('.map0').show();
      return $('.tabs-panel').height("540px");
    });
    $('.back').click(function() {
      $(this).closest('.map-group').find('.map0').show();
      $(this).closest('div').hide();
      $('#tile').text('');
      return $('.tabs-panel').height("540px");
    });
    $('.map0 area').click(function() {
      $(this).closest('div').hide();
      $(this).closest('.map-group').find('.map' + $(this).attr('title')).show();
      $('#tile').text('- Tile 00' + $(this).attr('title'));
      return $('.tabs-panel').height("620px");
    });
    return $('#waterway').change();
  });
