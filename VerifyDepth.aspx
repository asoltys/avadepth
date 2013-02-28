<%@ Register TagPrefix="uc1" TagName="reportHeader" Src="reportHeader.ascx" %>
<%@ Register TagPrefix="uc1" TagName="reportfooter" Src="reportfooter.ascx" %>
<%@ Page Language="vb" AutoEventWireup="false" Codebehind="VerifyDepth.aspx.vb" Inherits="AvadepthNet.AvadepthNet.web.VerifyDepth"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
   <HEAD>
      <title>VerifyDepth</title>
      <meta name="GENERATOR" content="Microsoft Visual Studio .NET 7.1">
      <meta name="CODE_LANGUAGE" content="Visual Basic .NET 7.1">
      <meta name="vs_defaultClientScript" content="JavaScript">
      <meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
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
         <TABLE id="TABLEFORMAT" style="Z-INDEX: 102; LEFT: 8px; POSITION: absolute; TOP: 8px" height="600"
            width="600" border="0">
            <TR>
               <TD colSpan="2">
                  <P>
                     <uc1:reportHeader id="ReportHeader1" runat="server"></uc1:reportHeader></P>
               </TD>
            </TR>
            <TR>
               <TD align="center" colSpan="2">
                  <DIV class="report-main-header">Available Depth Verification Report<BR>
                     <asp:label id="lblMain" runat="server" EnableViewState="False" CssClass="report-main-header">Fraser River - Inner Channel Limit</asp:label></DIV>
                  <asp:label id="lblSubtitle1" runat="server" CssClass="report-header" EnableViewState="False">For Day, Month Day, Year</asp:label><BR>
                  <asp:label id="lblSubtitle2" runat="server" CssClass="report-header" EnableViewState="False">For Day, Month Day, Year</asp:label><BR>
                  <asp:label id="lblSubtitle3" runat="server" CssClass="report-header" EnableViewState="False">For Day, Month Day, Year</asp:label></TD>
            </TR>
            <TR>
               <TD vAlign="top" align="center">
                  <asp:Panel id="PanelInner" runat="server">
                     <TABLE class="tableborder" id="TableInner" borderColor="#111111" height="400" cellSpacing="0"
                        cellPadding="0" width="400" border="0">
                        <TR>
                           <TD class="smalltabletext" align="center">Location</TD>
                           <TD class="smalltabletext" align="center">Design Grade</TD>
                           <TD class="smalltabletext" align="center">Least Sounding</TD>
                           <TD class="smalltabletext" align="center" colSpan="2">Available Width</TD>
                           <TD class="smalltabletext" align="center">Tidal Aid</TD>
                           <TD class="smalltabletext" align="center">Depth</TD>
                        </TR>
                        <TR>
                           <TD class="smalltabletext" align="center">(km)</TD>
                           <TD class="smalltabletext" align="center">(m)</TD>
                           <TD class="smalltabletext" align="center">(m)</TD>
                           <TD class="smalltabletext" align="center">(m)</TD>
                           <TD class="smalltabletext" align="center">%</TD>
                           <TD class="smalltabletext" align="center">(m)</TD>
                           <TD class="smalltabletext" align="center">(m)</TD>
                        </TR>
                        <TR>
                           <TD colSpan="7" height="1">
                              <HR SIZE="1">
                           </TD>
                        </TR>
                        <asp:repeater id="RepeatInner" runat="server" OnItemDataBound="RepeatInner_ItemDataBound">
                           <ItemTemplate>
                              <tr>
                                 <td align="center" class="smalltabletext">
                                    <asp:Label ID="Location" Runat="server"></asp:Label>
                                 </td>
                                 <td align="center" class="smalltabletext">
                                    <asp:Label ID="Grade" Runat="server"></asp:Label>
                                 </td>
                                 <td align="center" class="smalltabletext">
                                    <asp:Label ID="Sounding" Runat="server"></asp:Label>
                                 </td>
                                 <td align="center" class="smalltabletext">
                                    <asp:Label ID="Width" Runat="server"></asp:Label>
                                 </td>
                                 <td align="center" class="smalltabletext">
                                    <asp:Label ID="WidthPerc" Runat="server"></asp:Label>
                                 </td>
                                 <td align="center" class="smalltabletext">
                                    <asp:Label ID="Tide" Runat="server"></asp:Label>
                                 </td>
                                 <td align="center" class="smalltabletext">
                                    <asp:Label ID="Total" Runat="server"></asp:Label>
                                 </td>
                              </tr>
                           </ItemTemplate>
                           <AlternatingItemTemplate>
                              <tr bgcolor="Gainsboro">
                                 <td align="center" class="smalltabletext">
                                    <asp:Label ID="Location" Runat="server"></asp:Label>
                                 </td>
                                 <td align="center" class="smalltabletext">
                                    <asp:Label ID="Grade" Runat="server"></asp:Label>
                                 </td>
                                 <td align="center" class="smalltabletext">
                                    <asp:Label ID="Sounding" Runat="server"></asp:Label>
                                 </td>
                                 <td align="center" class="smalltabletext">
                                    <asp:Label ID="Width" Runat="server"></asp:Label>
                                 </td>
                                 <td align="center" class="smalltabletext">
                                    <asp:Label ID="WidthPerc" Runat="server"></asp:Label>
                                 </td>
                                 <td align="center" class="smalltabletext">
                                    <asp:Label ID="Tide" Runat="server"></asp:Label>
                                 </td>
                                 <td align="center" class="smalltabletext">
                                    <asp:Label ID="Total" Runat="server"></asp:Label>
                                 </td>
                              </tr>
                           </AlternatingItemTemplate>
                        </asp:repeater></TABLE>
                  </asp:Panel>
                  <asp:Panel id="PanelOuter" runat="server" Visible="False">
                     <TABLE class="tableborder" id="TableOuter" borderColor="#111111" height="400" cellSpacing="0"
                        cellPadding="0" width="344">
                        <TR align="center">
                           <TD style="HEIGHT: 17px" colSpan="4"><FONT face="ARIAL" size="2"><B>Outer&nbsp;Channel 
                                    Limit</B></FONT></TD>
                        </TR>
                        <TR>
                           <TD class="smalltabletext" align="center">Location<BR>
                              (km)</TD>
                           <TD class="smalltabletext" align="center">Least Sounding<BR>
                              (m)</TD>
                           <TD class="smalltabletext" align="center">Tidal Aid</TD>
                           <TD class="smalltabletext" align="center">Depth (m)</TD>
                        </TR>
                        <TR>
                           <TD colSpan="4" height="1">
                              <HR SIZE="1">
                           </TD>
                        </TR>
                        <asp:repeater id="RepeatOuter" runat="server" OnItemDataBound="RepeatOuter_ItemDataBound">
                           <ItemTemplate>
                              <tr>
                                 <td align="center" class="smalltabletext">
                                    <asp:Label ID="Location2" Runat="server"></asp:Label>
                                 </td>
                                 <td align="center" class="smalltabletext">
                                    <asp:Label ID="Sounding2" Runat="server"></asp:Label>
                                 </td>
                                 <td align="center" class="smalltabletext">
                                    <asp:Label ID="Tide2" Runat="server"></asp:Label>
                                 </td>
                                 <td align="center" class="smalltabletext">
                                    <asp:Label ID="Total2" Runat="server"></asp:Label>
                                 </td>
                              </tr>
                           </ItemTemplate>
                           <AlternatingItemTemplate>
                              <tr bgcolor="Gainsboro">
                                 <td align="center" class="smalltabletext">
                                    <asp:Label ID="Location2" Runat="server"></asp:Label>
                                 </td>
                                 <td align="center" class="smalltabletext">
                                    <asp:Label ID="Sounding2" Runat="server"></asp:Label>
                                 </td>
                                 <td align="center" class="smalltabletext">
                                    <asp:Label ID="Tide2" Runat="server"></asp:Label>
                                 </td>
                                 <td align="center" class="smalltabletext">
                                    <asp:Label ID="Total2" Runat="server"></asp:Label>
                                 </td>
                              </tr>
                           </AlternatingItemTemplate>
                        </asp:repeater></TABLE>
                  </asp:Panel>
               </TD>
            <TR>
               <TD colSpan="2">
                  <uc1:reportfooter id="Reportfooter1" runat="server"></uc1:reportfooter></TD>
            </TR>
         </TABLE>
         <IMG style="Z-INDEX: 101; LEFT: 56px; POSITION: absolute; TOP: 56px" height="16" src="spacer.gif"
            width="1" align="middle" border="0">
      </form>
   </body>
</HTML>
