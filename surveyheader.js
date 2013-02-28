var frm;
var rivercode;

alert('a');

frm = parent.frames['contents'].document.Form1;

function DisplayTile(nSheet) {
	alert(1);
	location.href = 'showriver.aspx?river=' + frm.ddWaterway.value+ '&tile=' + nSheet;
}

function GotoTile(nSheet) {
	alert( 'showriver.aspx?river=' + frm.ddWaterway.value+ '&tile=' + nSheet);
	location.href = 'showriver.aspx?river=' + frm.ddWaterway.value+ '&tile=' + nSheet;
}

function SearchTile(sheet) {
	alert(1);
   parent.frames['contents'].document.Form1.tile.value = sheet;
//   parent.frames['contents'].document.Form1.submit();
}

function Search10KTile(sheet) {
	alert(1);
   parent.frames['contents'].document.Form1.tile.value = '';
   parent.frames['contents'].document.Form1.locationtile.value = sheet;
//   parent.frames['contents'].document.Form1.submit();
}


function GetRiverName() {
   document.write( frm.ddWaterway.options[frm.ddWaterway.selectedIndex].text);
}


function DisplayHeader() {
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
   document.write('Copyright © 2000 Department of Fisheries & Oceans<BR>');
   document.write('Canadian Coast Guard - Pacific Region');
   document.write('</FONT>');
   document.write('</td>');
   document.write('<td>');
   document.write('<img src=can(1).gif VALIGN=TOP align=right>');
   document.write('</td>');
   document.write('</tr>');
   document.write('</table>');
}