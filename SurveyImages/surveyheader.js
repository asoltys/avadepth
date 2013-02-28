var frm;
var rivercode;

frm = parent.frames['contents'].document.Form1;

function BackToMap() {
	history.go(-1);
}

function UpdateSide() {
	location.href = 'showsurveys.aspx?river=' + frm.ddWaterway.value+ '&tile=' + frm.tile.value + '&map=' + frm.radioMap.checked + '&recent=' + frm.radioRecent.checked + '&type=' + frm.ddType.value;
}

function DisplayTile(nSheet) {
	location.href = 'showriver.aspx?river=' + frm.ddWaterway.value+ '&tile=' + nSheet;
}

function GotoTile(nSheet) {
	parent.frames['contents'].document.Form1.tile.value = nSheet;
	location.href = 'showriver.aspx?river=' + frm.ddWaterway.value+ '&tile=' + nSheet;
}

function SearchTile(sheet) {
	parent.frames['contents'].document.Form1.tile.value = sheet;
	if (frm.radioMap == null)
		location.href = 'showsurveys.aspx?river=' + frm.ddWaterway.value+ '&tile=' + sheet + '&map=true';
	else
		location.href = 'showsurveys.aspx?river=' + frm.ddWaterway.value+ '&tile=' + sheet + '&map=' + frm.radioMap.checked + '&recent=' + frm.radioRecent.checked + '&type=' + frm.ddType.value;
}

function Search10KTile(sheet) {
   parent.frames['contents'].document.Form1.tile.value = '[10K]' + sheet;

   if (frm.radioMap == null)
	   location.href = 'showsurveys.aspx?river=' + frm.ddWaterway.value+ '&tile=[10K]' + sheet + '&map=true';
   else
	   location.href = 'showsurveys.aspx?river=' + frm.ddWaterway.value+ '&tile=[10K]' + sheet + '&map=' + frm.radioMap.checked + '&recent=' + frm.radioRecent.checked + '&type=' + frm.ddType.value;
}


function GetRiverName() {
   document.write( frm.ddWaterway.options[frm.ddWaterway.selectedIndex].text);
}


function DisplayHeader() {
alert('aaaaaa');
   document.write('<table border="0" cellpadding="0" cellspacing="0" width="100%">');
   document.write('<tr>');
   document.write('<td><img src="cgfip-s.gif" width="212" height="30" VSPACE=9></td>');
   document.write('<td align="right"><img src="wd-patch.gif" alt="WD" align="absmiddle" width="94" height="21"></td>');
   document.write('</tr>');
   document.write('</table>');


   document.write('<DIV ALIGN=CENTER><FONT FACE=ARIAL SIZE=3 COLOR=RED><B>');
   GetRiverName();
   document.write('</B></FONT><BR></DIV>');


}

function DisplayFooter() {

   document.write('<P><IMG SRC=spacer.gif HEIGHT=8><BR>');
   document.write('</CENTER>');
   document.write('<FONT FACE=Arial COLOR=red SIZE=3><B>Instructions:</B></FONT><BR>');
   document.write('<P>');
   document.write('<FONT FACE=Arial SIZE=2>');
   document.write('<UL>');
   document.write('<LI>Select various criteria for your search');
   document.write('<LI>Click on a red box to zoom into a specific area');
   document.write('</UL>');
   document.write('</FONT>');
   document.write('<P>');
   document.write('<HR SIZE=1>');
   document.write('<table cellpadding=4 cellspacing=0 border=0 width=100%>');
   document.write('<tr>');
   document.write('<td>');
   document.write('<FONT FACE=ARIAL SIZE=1>');
   document.write('Copyright © 2005 Department of Fisheries & Oceans<BR>');
   document.write('Canadian Coast Guard - Pacific Region');
   document.write('</FONT>');
   document.write('</td>');
   document.write('<td>');
   document.write('<img src=can(1).gif VALIGN=TOP align=right>');
   document.write('</td>');
   document.write('</tr>');
   document.write('</table>');
}