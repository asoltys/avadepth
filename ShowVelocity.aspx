<%@ Register TagPrefix="uc1" TagName="reportHeader" Src="reportHeader.ascx" %>
<%@ Register TagPrefix="uc1" TagName="reportfooter" Src="reportfooter.ascx" %>
<%@ Page Language="vb" AutoEventWireup="false" Codebehind="ShowVelocity.aspx.vb" Inherits="AvadepthNet.ShowVelocity"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
   <HEAD>
      <title>ShowVelocity</title>
      <meta content="Microsoft Visual Studio .NET 7.1" name="GENERATOR">
      <meta content="Visual Basic .NET 7.1" name="CODE_LANGUAGE">
      <meta content="JavaScript" name="vs_defaultClientScript">
      <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
      <LINK href="Styles.css" type="text/css" rel="stylesheet">

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
                     <DIV><FONT class="report-main-header">Currents &amp; Velocities</FONT></DIV>
                     <DIV><FONT class="report-main-header">Fraser River South Arm</FONT>
                        <asp:label id="lblSubtitle1" runat="server" CssClass="report-header" Width="500px">For Day, Month Day, Year</asp:label>
                        <asp:label id="lblSubtitle2" runat="server" CssClass="report-header" Width="500px">For Day, Month Day, Year</asp:label></FONT></DIV>
                  </TD>
               </TR>
               <TR>
                  <TD style="HEIGHT: 427px" vAlign="top">&nbsp;
                     <asp:ImageButton id="ImageButton2" runat="server"></asp:ImageButton>
                     <DIV ms_positioning="FlowLayout"><FONT face="Arial" size="2"></FONT>&nbsp;</DIV>
                     <center><FONT face="ARIAL" size="2">
                           <asp:Image id="imgLegend" runat="server"></asp:Image></FONT></center>
                     <CENTER><FONT face="ARIAL" size="2"></FONT>&nbsp;</CENTER>
                     <CENTER><FONT face="ARIAL" size="2">
                           <DIV ms_positioning="FlowLayout"><FONT face="ARIAL" size="2">Note: Data taken from 
                                 Canadian Coast Guard &amp; Water Survey Canada</FONT></DIV>
                     </CENTER>
                     </FONT>
                  </TD>
               <TR>
                  <TD colSpan="2"><uc1:reportfooter id="Reportfooter1" runat="server"></uc1:reportfooter></TD>
               </TR>
            </TABLE>
            <IMG style="Z-INDEX: 102; LEFT: 56px; POSITION: absolute; TOP: 48px" height="16" src="spacer.gif"
               width="1" align="middle" border="0">
      </FORM>
      </DIV>
   </body>
</HTML>
