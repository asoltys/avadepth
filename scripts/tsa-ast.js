
  $(function() {
    var images;
    images = ['SC_0710_ARS_2012.jpg', 'SC_0710_R01_2012.jpg', 'SC_0710_R02_2012.jpg', 'SC_0710_R03_2012.jpg', 'SC_0710_R04_2012.jpg', 'SC_0710_R05_2012.jpg', 'SC_0710_R06_2012.jpg', 'SC_0710_R07_2012.jpg', 'SC_0710_R08_2012.jpg', 'SC_0710_R09_2012.jpg', 'SC_0710_R10_2012.jpg', 'SC_0710_R12_2012.jpg', 'SC_0710_R13_2012.jpg'];
    return $.each(images, function(i, img) {
      var html;
      html = "<li><a href=\"#tab" + (i + 1) + "\">" + (i + 1) + "</a></li>";
      $('.tabs').append(html);
      html = "<div id=\"tab" + (i + 1) + "\">\n  <section>\n    <div class=\"span-8\"><img src=\"/images/time_series/" + img + "\" alt=\"Fraser River\" class=\"margin-bottom-none\" /></div>\n    <div class=\"clear\"></div>\n  </section>\n</div>";
      return $('.tabs-panel').append(html);
    });
  });
