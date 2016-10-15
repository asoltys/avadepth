$(->
  path = '/images/time_series/'
  images = [
    'SC_0710_ARS_2012.jpg',
    'SC_0710_R01_2012.jpg',
    'SC_0710_R02_2012.jpg',
    'SC_0710_R03_2012.jpg',
    'SC_0710_R04_2012.jpg',
    'SC_0710_R05_2012.jpg',
    'SC_0710_R06_2012.jpg',
    'SC_0710_R07_2012.jpg',
    'SC_0710_R08_2012.jpg',
    'SC_0710_R09_2012.jpg',
    'SC_0710_R10_2012.jpg',
    'SC_0710_R12_2012.jpg',
    'SC_0710_R13_2012.jpg'
  ]

  images = $.map(images, (n, i) ->
    path + n
  )

  preload(images)

  $.each(images, (i, img) ->
    html = """
      <li><a href="#tab#{i+1}">#{i+1}</a></li>
    """

    $('.tabs').append(html)

    html = """
    <div id="tab#{i+1}">
      <section>
        <div class="span-8"><img src="#{img}" alt="Fraser River" class="margin-bottom-none" /></div>
        <div class="clear"></div>
      </section>
    </div>
    """
    $('.tabs-panel').append(html)
  )
)

preload = (arrayOfImages) ->
  $(arrayOfImages).each(->
    $('<img/>')[0].src = this;
  )

