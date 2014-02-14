monthNames = [
  "Jan", "Feb", "Mar", "Apr"
  "May", "Jun", "Jul", "Aug"
  "Sep", "Oct", "Nov", "Dec"
]
    
$(->
  chainage = querystring('chainage')
  $('.heading').text("Kilometre #{chainage-1} to #{chainage}")
  $.getJSON("/api/History?date=#{moment().format("YYYY-M-D").toString()}&" +
      "lane=#{querystring('lane')}&" +
      "chainage=#{chainage}",(data) ->
    $.each(data, (index) ->
      if (index%2 == 1)
        surveydate = moment(this.date).format("D-MMM-YYYY").toString()
      else
        surveydate = moment(this.update).format("D-MMM-YYYY").toString()
      row = "<tr>" +
            "<td>#{surveydate}</td>" +
            "<td><a href=\"http://www2.pac.dfo-mpo.gc.ca/Data/dwf/#{this.Plan}.dwf\" target=\"_blank\">#{this.Plan}</a></td>" +
            "<td>#{this.grade.toFixed(1)}</td><td>#{this.sounding.toFixed(1)}</td>" +
            "<td>#{this.width}</td><td>#{this.widthperc}</td>" +
            "</tr>"
      $("#surveys").append(row)
    )
  )
)
