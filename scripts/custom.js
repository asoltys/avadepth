// the following script will open external links in a new window or tab
$("a").click(function(){
  var myHref=$(this).attr('href');

  if (myHref) {
    // covers development ips, gtisdev, production
    if(myHref.indexOf("http") !== -1 && myHref.indexOf("10.") == -1 && myHref.indexOf("avadepth") == -1 && myHref.indexOf("gtisdev") == -1){
	  window.open(myHref);
	  return false;
	}
  }

})