<%@ Page Language="vb" AutoEventWireup="false" Codebehind="ShowHydrograph.aspx.vb" Inherits="AvadepthNet.AvadepthNet.web.ShowHydrograph"%>
<%@ Register TagPrefix="cc1" Namespace="GraphicsServer.GSNet.Charting" Assembly="GSNetWin" %>
<%@ Register TagPrefix="uc1" TagName="reportfooter" Src="reportfooter.ascx" %>
<%@ Register TagPrefix="uc1" TagName="reportHeader" Src="reportHeader.ascx" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
   <HEAD>
      <title>ShowHydrograph</title>
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
      <form id="Form1" method="post" runat="server">
         <DIV style="Z-INDEX: 101; LEFT: 8px; WIDTH: 10px; POSITION: absolute; TOP: 8px; HEIGHT: 10px"
            ms_positioning="text2D">
            <TABLE id="TABLEFORMAT" style="Z-INDEX: 101; LEFT: 8px; POSITION: absolute; TOP: 8px" width="670"
               border="0">
               <TBODY>
                  <TR>
                     <TD colSpan="2">
                        <P><uc1:reportheader id="ReportHeader1" runat="server"></uc1:reportheader></P>
                     </TD>
                  </TR>
                  <TR>
                     <TD align="center" colSpan="2">
                        <DIV class="report-main-header"><FONT class="report-main-header" face="Arial" size="3">Fraser 
                              River Hydrograph at Hope, B.C<BR>
                              &nbsp;
                              <asp:label id="lblSubtitle1" runat="server" CssClass="report-header" Width="540px">For Day, Month Day, Year</asp:label></FONT></DIV>
                     </TD>
                  </TR>
                  <TR>
                     <TD vAlign="top"></TD>
                  <TR>
                     <TD vAlign="top"><asp:placeholder id="LabelPlaceHolder" runat="server"></asp:placeholder></TD>
                  </TR>
                  <TR>
                     <TD vAlign="top" align="center"><asp:Image id="legendP" runat="server" ImageUrl="images/hydrolegp.jpg"></asp:Image>
                        <asp:Image id="legendA" runat="server" ImageUrl="images/hydrolega.jpg"></asp:Image><img src="images/hydrolegm.jpg"><br>
                        <font face="arial" size="1">Note: Data taken from Canadian Coast Guard &amp; Water 
                           Survey</font></TD>
                  </TR>
                  <TR>
                     <TD colSpan="2"><uc1:reportfooter id="Reportfooter1" runat="server"></uc1:reportfooter></TD>
                  </TR>
               </TBODY>
            </TABLE>
      </form>
      </DIV></TD></TR></TBODY></TABLE>
      <DIV></DIV>
      </FORM>
   </body>
</HTML>
