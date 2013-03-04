<%@ Page Language="vb" AutoEventWireup="false" Codebehind="index.aspx.vb" Inherits="AvadepthNet.AvadepthNet.web.index"%>
<!DOCTYPE html>
<!--[if IE 7]><html lang="en" class="no-js ie7"><![endif]-->
<!--[if IE 8]><html lang="en" class="no-js ie8"><![endif]-->
<!--[if gt IE 8]><!-->
<html lang="en" class="no-js">
<!--<![endif]-->
<head>
<meta charset="utf-8" />
<!-- Web Experience Toolkit (WET) / Boîte à outils de l'expérience Web (BOEW)
wet-boew.github.com/wet-boew/License-eng.txt / wet-boew.github.com/wet-boew/Licence-fra.txt -->
<!-- WET 3.0, PWGSC 1.0 file: 2col-eng.html -->
<!-- TitleStart -->
<title>Avadepth</title>
<!-- TitleEnd -->
<!-- MetadataStart -->
<meta name="description" content="Avadepth" />
<meta name="dcterms.description" content="Avadepth" />
<meta name="dcterms.creator" content="DFO" />
<meta name="dcterms.title" content="Avadepth" />
<meta name="dcterms.issued" title="W3CDTF" content="2013-02-27" />
<meta name="dcterms.modified" title="W3CDTF" content="<!--#config timefmt='%Y-%m-%d'--><!--#echo var='LAST_MODIFIED'-->" />
<meta name="dcterms.subject" title="gccore" content="Waterways; Bathymetry; Hydrography" />
<meta name="dcterms.language" title="ISO639-2" content="eng" />
<meta name="keywords" content="Fraser River, Waterways, Bathymetry, Hydrographic Data, Coast Guard" />
<!-- MetadataEnd -->
<!--#include virtual="/boew-wet/wet3.0/html5/includes/tete-head.html" -->

<!-- CustomScriptsCSSStart -->
<script type="text/javascript">
   var _gaq = _gaq || [];
   _gaq.push(['_setAccount', 'UA-5411606-40']);
   _gaq.push(['_trackPageview']);

   (function() {
   var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
   ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
   var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
   })();
</script>
<!-- CustomScriptsCSSEnd -->
</head>
<body><div id="wb-body-sec">
<div id="wb-skip">
<ul id="wb-tphp">
<li id="wb-skip1"><a href="#wb-cont">Skip to main content</a></li>
<li id="wb-skip2"><a href="#wb-nav">Skip to secondary menu</a></li>
</ul>
</div>

<div id="wb-head"><div id="wb-head-in"><header>
<!-- HeaderStart -->
<!--#include virtual="/boew-wet/wet3.0/html5/includes/banner_gc-gc_banner-eng.html" -->
<!--#include virtual="/site/wet3.0/html5/includes/banner_site-site_banner-eng.html" -->
<nav role="navigation">
<!--#include virtual="/site/wet3.0/html5/includes/nav_mega-mega_nav-eng.html" -->

<div id="gcwu-bc"><h2>Breadcrumb trail</h2><div id="gcwu-bc-in">
<ol>
<!--#include virtual="/site/wet3.0/html5/includes/pain-bread-eng.html" -->
<!--#include virtual="/site30/includes/pain-bread-section-eng.html" -->
</ol>
</div></div>
</nav>
<!-- HeaderEnd -->
</header></div></div>

<div id="wb-core"><div id="wb-core-in" class="equalize">
<div id="wb-main" role="main"><div id="wb-main-in">
<!-- MainContentStart -->
<img src="images/newbanner.gif" alt="Avadepth Water Depth Forecasting for the Fraser River" />
<form name="Signin" action="xt_LookupRecord.asp" method="post" runat="server">
<asp:textbox id="txtUserName" runat="server" Wrap="False" Width="100px"></asp:textbox>
<asp:textbox id="txtPassword" runat="server" Wrap="False" Width="100px" TextMode="Password"></asp:textbox>
<asp:imagebutton id="btnLogin" runat="server" ImageUrl="images/btnLogin.gif"></asp:imagebutton>
<asp:label class="NormalRed" id="Message" runat="server"></asp:label>
</form>
<p><a href="passwordrecovery.htm">forgot your password?</a></p>
<p>To access Avadepth <A href="register.aspx">setup</a> a new account.</p>
<p><a href="samples.htm">View Sample Reports</a></p>
<p>
  Avadepth - forecasts of available water depths for vessels 
  navigating the Fraser River South Arm Channel.
</p>
<img alt="Fraser River" src="fraser-ov.gif">
<p>
Avadepth - is distributed weekly to river pilots, 
Port Metro Vancouver, and shipping companies to assist them in 
determining the maximum draft and the best sailing times.The computerized reporting system predicts draft availability and the 
corresponding "transit window" for deep sea ships to navigate the South Arm 
Main Channel of the Fraser River between Sand Heads (kilometre 0) and Fraser 
Surrey Docks (kilometre 34).
</p>

<!-- EndEditableContent -->
<dl id="gcwu-date-mod" role="contentinfo">
<dt>Date modified:</dt><dd><span><time><!--#config timefmt='%Y-%m-%d'--><!--#echo var='LAST_MODIFIED'--></time></span></dd>
</dl>
<div class="clear"></div>
<!-- MainContentEnd -->
</div></div>

<div id="wb-sec"><div id="wb-sec-in">
<!--#include virtual="/site30/includes/nav_gauche-nav_left-eng.html" -->
</div></div>
</div></div>

<div id="wb-foot"><div id="wb-foot-in"><footer><h2>Footer</h2>
<!-- FooterStart -->
<!--#include virtual="/site/wet3.0/html5/includes/pied_site-site_footer-eng.html" -->
<!--#include virtual="/boew-wet/wet3.0/html5/includes/pied_gc-gc_footer-eng.html" -->
<!-- FooterEnd -->
</footer>
</div></div></div>

<!-- ScriptsStart -->
<!--#include virtual="/boew-wet/wet3.0/html5/includes/script_pied-script_footer.html" -->
<!-- ScriptsEnd -->
</body>
</html>
