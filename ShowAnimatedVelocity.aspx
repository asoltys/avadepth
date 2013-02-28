<%@ Register TagPrefix="uc1" TagName="reportHeader" Src="reportHeader.ascx" %>
<%@ Register TagPrefix="uc1" TagName="reportfooter" Src="reportfooter.ascx" %>
<%@ Page Language="vb" AutoEventWireup="false" Codebehind="ShowAnimatedVelocity.aspx.vb" Inherits="AvadepthNet.ShowAnimatedVelocity" buffer="False" enableViewState="False"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
  <HEAD>
      <title>ShowVelocity</title>
      <meta content="Microsoft Visual Studio .NET 7.1" name="GENERATOR">
      <meta content="Visual Basic .NET 7.1" name="CODE_LANGUAGE">
      <meta content="JavaScript" name="vs_defaultClientScript">
      <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
      <LINK href="Styles.css" type="text/css" rel="stylesheet">



      <SCRIPT language="JavaScript">

      var images = new Array(24);       
      var frame = 0;
      var max = 0;
      var timeinterval = 800;
       
      function animate()
      {
      document.imagename.src = images[frame].src;
      frame = (frame + 1) % max; 
      timeout_id = setTimeout("animate()", 800);
      }
      </SCRIPT>

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
      <FORM id="Form3" method="post" runat="server">
         <asp:label id="Label1" runat="server" Height="48px" Width="176px"></asp:label>
         <DIV style="Z-INDEX: 101; LEFT: 8px; WIDTH: 10px; POSITION: absolute; TOP: 8px; HEIGHT: 10px"
            ms_positioning="text2D">
            <TABLE id="TABLEFORMAT" style="Z-INDEX: 101; LEFT: 8px; POSITION: absolute; TOP: 8px" height="600"
               width="600" border="0">
               <TR>
                  <TD colSpan="2">
                     <P><uc1:reportheader id="ReportHeader1" runat="server"></uc1:reportheader></P>
                  </TD>
               </TR>
               <TR>
                  <TD align="center" colSpan="2">
                     <div><font class="report-main-header"> Fraser River
                     </font></div>
      <DIV><FONT class=report-main-header>Current Velocity and 
      Direction</FONT></DIV>
                     <span style="TEXT-ALIGN:center">
                        <asp:label id="lblSubtitle1" runat="server" CssClass="report-header">For Day, Month Day, Year</asp:label>
                     <span><br >
                     <span style="TEXT-ALIGN:center">
                     <asp:label id="lblSubtitle2" runat="server" CssClass="report-header">For Day, Month Day, Year</asp:label>
                     </span></FONT></span></span></TD>
               </TR>
               <TR>
                  <TD style="HEIGHT: 427px" vAlign="top">&nbsp; <IMG src="xxx" border="0" name="imagename">
                     <DIV align="center"><FONT face="ARIAL" size="2"><asp:image id="imgLegend" runat="server"></asp:image></FONT></DIV>
                     <DIV ms_positioning="FlowLayout"><FONT face="ARIAL" size="2">Note: Data taken from 
                           Canadian Coast Guard &amp; Water Survey Canada</FONT></DIV>
                  </TD>
               <TR>
                  <TD colSpan="2"><uc1:reportfooter id="Reportfooter1" runat="server"></uc1:reportfooter></TD>
               </TR>
            </TABLE>
            <IMG style="Z-INDEX: 102; LEFT: 56px; POSITION: absolute; TOP: 48px" height="16" src="spacer.gif"
               width="1" align="middle" border="0">
      </FORM></DIV>
      <script>animate();</script>
   </body>
</HTML>
