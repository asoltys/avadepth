$(->
  date = new Date()
  weekday = [ "Sunday", "Monday", "Tuesday", "Wednesday",
              "Thursday", "Friday", "Saturday"]
  month = [ "January", "February", "March", "April",
            "May", "June", "July", "August",
            "September", "October", "November", "December"]

  $('#static-date').text('For ' + weekday[date. getDay()] + ', ' + month[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear())
  $.getJSON("/api/Soundings?id=#{date.getFullYear()}-#{date.getMonth()+1}-#{date.getDate()}", (data) ->
    count = 0
    $.each(data, (index) ->
      row = "<tr><td><a href=\"soundings-sondages-eng.html?lane=1&chainage=#{index+1}\">#{this.Chainage}</a></td><td>#{this.SoundingDate}</td><td class=\"1\">#{this.Dredge}</td><td class=\"1\">#{this.Sounding}"
      if (this.IsHigh)
        row = row + "*"
      row = row + "</td><td class=\"1\">#{this.Width}</td><td class=\"1\">#{this.WidthPerc}</td><td class=\"2\">#{this.Dredge2}</td><td class=\"2\">#{this.Sounding2}"
      if (this.IsHigh2)
        row = row + "*"
      row = row + "</td><td class=\"2\">#{this.Width2}</td><td class=\"2\">#{this.WidthPerc2}</td></tr>"
      rowhtml = $.parseHTML(row)
      if (this.IsHigh)
        $(rowhtml).find(".1").addClass("red")
      if (this.IsHigh2)
        $(rowhtml).find(".2").addClass("red")
      if (count % 2)
        $(rowhtml).addClass("even")
      else
        $(rowhtml).addClass("odd")
      count++
      $("#soundings").append(rowhtml)
    )
  )
)
