
  $(function() {
    var i, s;
    s = '';
    for (i = 6; i <= 36; i++) {
      s += '<option value=' + i + '>' + i + '</option>';
    }
    $('#chainage').append(s);
    $('#date').change(function() {
      $.getJSON('/api/depths?date=' + $(this).val(), function(data) {
        $('#flows option').remove();
        s = '';
        $.each(data.Flowrates, function(idx, itm) {
          return s += '<option value=' + itm + '>' + itm + '</option>';
        });
        $('#flows').append(s);
        $('#flowPred').text(data.Predicted);
        return $('#flowAct').text(data.Actual);
      });
      return $('#static-date').text($('#alt-date').val());
    });
    $('input[name="discharge"]').change(function() {
      switch ($(this).val()) {
        case 'Actual':
          0;
          break;
        case 'Predicted':
          0;
          break;
        case 'Defined':
          $('#static-discharge').text($('#defined_discharge').val());
          break;
        case 'Selected':
          $('#static-discharge').text($('#selected_discharge').val());
      }
      return $('#static-discharge-eval').text($(this).val());
    });
    $('#defined_discharge').change(function() {
      if ($('input[name="discharge"].checked').val() === "Defined") {
        return $('#static-discharge').text($('#defined_discharge').val());
      }
    });
    $('#selected_discharge').change(function() {
      if ($('input[name="discharge"].checked').val() === "Selected") {
        return $('#static-discharge').text($('#selected_discharge').val());
      }
    });
    $('select#zone').change(function() {
      return $('#static-zone').text($(this).val());
    });
    $('select#interval').change(function() {
      return $('#static-interval').text($(this).val());
    });
    $('select#from').change(function() {
      return $('#static-start').text($(this).val());
    });
    $('select#to').change(function() {
      return $('#static-end').text($(this).val());
    });
    $('input[name="velocity_legend"]').change(function() {
      return $('#static-legend').text($(this).next().text());
    });
    $('#display').click(function() {
      var flow, hr, minute;
      switch ($("input:radio[name=discharge]:checked").val()) {
        case '0':
          flow = $('#flowPred').text();
          break;
        case '1':
          flow = $('#flowAct').text();
          break;
        case '2':
          break;
        case '3':
          flow = $('#flows').val();
      }
      hr = Math.floor(parseFloat($('#ddFrom').val()));
      minute = (parseFloat($('#ddFrom').val()) - hr) * 60;
      return $.getJSON('/api/animated?date=' + $('#date').val() + '&legendScale=0' + '&zone=' + $('#ddZone').val() + '&flowRate=' + flow + '&flowType=0' + '&hour=' + hr + '&minute=' + minute, function(data) {
        $('#animated').html(data);
        return $('tr', '#location tbody').remove();
      });
    });
    return $('#date').change();
  });
