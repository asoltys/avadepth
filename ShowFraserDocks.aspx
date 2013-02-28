<%@ Register TagPrefix="uc1" TagName="reportHeader" Src="reportHeader.ascx" %>
<%@ Register TagPrefix="uc1" TagName="reportfooter" Src="reportfooter.ascx" %>
<%@ Page Language="vb" AutoEventWireup="false" Codebehind="ShowFraserDocks.aspx.vb" Inherits="AvadepthNet.FraserDocks"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
   <HEAD>
      <title>FraserDocks</title>
      <meta name="GENERATOR" content="Microsoft FrontPage 5.0">
      <meta name="CODE_LANGUAGE" content="Visual Basic .NET 7.1">
      <meta name="vs_defaultClientScript" content="JavaScript">
      <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">

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
   </HEAD>
   <body MS_POSITIONING="GridLayout">
      <form id="Form1" method="post" runat="server">
         <TABLE id="Table1" style="Z-INDEX: 101; LEFT: 0px; WIDTH: 600px; POSITION: absolute; TOP: 0px"
            cellSpacing="1" cellPadding="1" width="300" border="0">
            <TR>
               <TD>
                  <uc1:reportHeader id="ReportHeader1" runat="server">
                        </uc1:reportHeader></TD>
            </TR>
            <TR>
               <TD align="center"><STRONG><FONT face="Arial" size="4">Fraser Surrey&nbsp;Docks - Berth 
                        Soundings</FONT></STRONG><BR>
                  <BR>
                  <IMG SRC="frpa_otop.png" width="608" height="105"><br>
                  <IMG SRC="frpa_ofsd.png" ALT="Fraser Surrey Docks" usemap="#frpa_ofsd.png" border="0" NAME="therollover"
                     width="608" height="129"><br>
                  <IMG SRC="frpa_obot.png" width="608" height="95"> <map name="frpa_ofsd.png">
                     <area shape="POLY" coords="110, 5, 501, 7, 502, 128, 111, 124" onMouseOver="therollover.src='frpa_ofsd1.png'"
                        onMouseOut="therollover.src='frpa_ofsd.png'" href="data/fraserport/fsd_overview.dwf" target="_blank"
                        title="Entrance and Berths 1 to 10">
                  </map>
                  <br>
                  <FONT face="Arial" size="2"><font color="#FF0000"><b>Click on a box to view available soundings</b></font><BR>
                  </FONT>
               </TD>
            </TR>
            <TR>
               <TD>
                  <uc1:reportfooter id="Reportfooter1" runat="server"></uc1:reportfooter></TD>
            </TR>
         </TABLE>
      </form>
   </body>
</HTML>
