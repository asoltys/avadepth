monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
    
querystring = (key) ->
  re = new RegExp('(?:\\?|&)'+key+'=(.*?)(?=&|$)','gi')
  r = []
  m = []
  while ((m=re.exec(document.location.search)) != null) 
    r.push(m[1])
  return r

$(->
  chainage = querystring('chainage')
  $('.heading').text("Kilometre #{chainage-1} to #{chainage}")
  date = new Date()
  datestr = date.getFullYear() + "-" + (date.getMonth()+1) + "-" + date.getDate()
  $.getJSON("/api/History?date=#{datestr}&lane=#{querystring('lane')}&chainage=#{chainage}", (data) ->
    $.each(data, (index) ->
      if (index%2 == 1)
        surveydate = new Date(this.date)
      else
        surveydate = new Date(this.update)
      surveydate.setHours(24)
      surveydatestr = surveydate.getDate() + "-" + monthNames[surveydate.getMonth()] + "-" + surveydate.getFullYear()
      row = "<tr><td>#{surveydatestr}</td><td><a href=\"http://www2.pac.dfo-mpo.gc.ca/Data/dwf/#{this.Plan}.dwf\">#{this.Plan}</a></td><td>#{this.grade.toFixed(1)}</td><td>#{this.sounding.toFixed(1)}</td><td>#{this.width}</td><td>#{this.widthperc}</td></tr>"
      $("#surveys").append(row)
    )
  )
)