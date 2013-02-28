<%@ Register TagPrefix="uc1" TagName="reportHeader" Src="reportHeader.ascx" %>
<%@ Register TagPrefix="uc1" TagName="reportfooter" Src="reportfooter.ascx" %>
<%@ Page Language="vb" AutoEventWireup="false" Codebehind="ShowTransitComp.aspx.vb" Inherits="AvadepthNet.AvadepthNet.web.ShowTransitComp"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
   <HEAD>
      <title>ShowTransit</title>
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
         <table height="400" width="590" border="0">
            <tr>
               <td>&nbsp;
                  <uc1:reportheader id="ReportHeader1" runat="server"></uc1:reportheader></td>
            </tr>
            <TR>
               <TD style="HEIGHT: 93px" vAlign="top" align="center">
                  <P>
                     <asp:label id="lblTitle" runat="server" CssClass="report-main-header" Width="506px">Specified Depth Transit Window Report</asp:label><asp:label id="lblMain" runat="server" Width="506px" CssClass="report-main-header">For Day, Month Day, Year</asp:label><BR>
                     <asp:label id="lblSubtitle1" runat="server" Width="496px" CssClass="report-header">Maximum Depth & Transit Time Report - 2 hr window</asp:label><BR>
                     <asp:label id="lblSubtitle2" runat="server" Width="506px" CssClass="report-header">From Monday, January 12, 2004 to Tuesday, January 13, 2004</asp:label><BR>
                     <asp:label id="lblSubtitle3" runat="server" Width="432px" CssClass="report-header">Km 0 to 35 at Hope Discharge 700(m3/s)  (User-defined) </asp:label><BR>
                     <asp:label id="lblSubtitle4" runat="server" Width="432px" CssClass="report-header">Current Soundings</asp:label></P>
               </TD>
            </TR>
            <TR>
            </TR>
            </TD></TR>
            <TR>
            </TR>
            <tr>
               <td>
                  <TABLE class="tableborder" id="TableInner" cellSpacing="2" width="100%">
                     <TBODY>
                        <TR>
                           <TD class="report-text" style="WIDTH: 190px" vAlign="top" align="center" colSpan="2">From</TD>
                           <TD class="report-text" vAlign="top" align="center" colSpan="2">To</TD>
                           <TD class="report-text" vAlign="top" align="center">&nbsp;</TD>
                        </TR>
                        <TR>
                           <TD class="report-text" style="WIDTH: 140px; HEIGHT: 5px" vAlign="top" align="center">Date</TD>
                           <TD class="report-text" style="WIDTH: 50px; HEIGHT: 5px" vAlign="top" align="center">Time 
                              (PST)</TD>
                           <TD class="report-text" style="WIDTH: 140px; HEIGHT: 5px" vAlign="top" align="center">Date</TD>
                           <TD class="report-text" style="WIDTH: 50px; HEIGHT: 5px" vAlign="top" align="center">Time 
                              (PST)</TD>
                  </FONT></td>
               <TD class="report-text" style="WIDTH: 180px; HEIGHT: 5px" vAlign="top" align="center">Time<BR>
                  (hrs)</TD>
            </tr>
            <TR>
               <TD vAlign="top" align="center" height="1">
                  <hr SIZE="1">
               </TD>
               <TD vAlign="top" align="center" height="1">
                  <hr SIZE="1">
               </TD>
               <TD vAlign="top" align="center" height="1">
                  <hr SIZE="1">
               </TD>
               <TD vAlign="top" align="center" height="1">
                  <HR SIZE="1">
                  &nbsp;</TD>
               <TD vAlign="top" align="center" height="1">
                  <hr SIZE="1">
               </TD>
            </TR>
            <asp:repeater id="RepeatInner" runat="server">
               <ItemTemplate>
                  <tr bgcolor="beige">
                     <td align="center">
                        <%#DataBinder.Eval(Container.DataItem, "StartDate")%>
                     </td>
                     <td align="center">
                        <%#DataBinder.Eval(Container.DataItem, "WindowStart")%>
                     </td>
                     <td align="center">
                        <%# DataBinder.Eval(Container.DataItem, "EndDate") %>
                     </td>
                     <td align="center">
                        <%#DataBinder.Eval(Container.DataItem, "WindowEnd")%>
                     </td>
                     <td align="center">
                        <%#DataBinder.Eval(Container.DataItem, "Depth")%>
                     </td>
                  </tr>
               </ItemTemplate>
               <AlternatingItemTemplate>
                  <tr>
                     <td align="center">
                        <%#DataBinder.Eval(Container.DataItem, "StartDate")%>
                     </td>
                     <td align="center">
                        <%#DataBinder.Eval(Container.DataItem, "WindowStart")%>
                     </td>
                     <td align="center">
                        <%# DataBinder.Eval(Container.DataItem, "EndDate") %>
                     </td>
                     <td align="center">
                        <%#DataBinder.Eval(Container.DataItem, "WindowEnd")%>
                     </td>
                     <td align="center">
                        <%#DataBinder.Eval(Container.DataItem, "Depth")%>
                     </td>
                  </tr>
               </AlternatingItemTemplate>
            </asp:repeater></table>
         <table width="100%">
            <tr>
               <td colSpan="5">&nbsp;
               </td>
            </tr>
            <tr>
               <td colSpan="5"><font color="red">*</font><FONT class="smalltabletext">Depths are 
                     relative to local low water level</FONT>
               </td>
            </tr>
         </table>
         <P>&nbsp;</P>
         </TD></TR>
         <tr>
            <td><uc1:reportfooter id="Reportfooter1" runat="server"></uc1:reportfooter></td>
         </tr>
         </TBODY></TABLE></form>
   </body>
</HTML>
