<%@ Page Language="vb" AutoEventWireup="false" Codebehind="Surveys.aspx.vb" Inherits="AvadepthNet.AvadepthNet.web.Surveys" smartNavigation="False"%>
<%@ Register TagPrefix="uc1" TagName="MenuHeader" Src="MenuHeader.ascx" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
   <HEAD>
      <title>Surveys</title>
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
      <FORM id="Form1" method="post" runat="server">
         <INPUT type="hidden" value="1" name="mode"> <INPUT type="hidden" value="0" name="advanced">
         <INPUT type="hidden" name="tile"> <INPUT type="hidden" name="locationtile">
         <TABLE id="Table1" style="Z-INDEX: 103" cellSpacing="0" cellPadding="1" border="0">
            <TBODY>
               <TR>
                  <TD colSpan="2"><uc1:menuheader id="MenuHeader1" runat="server" HelpFile="hsurvey.html" BannerImage="images\bnrSurveyDrawings.gif"></uc1:menuheader></TD>
               </TR>
               <TR>
                  <TD colSpan="2">
                     <DIV class="header-gray" style="DISPLAY: inline" ms_positioning="FlowLayout">Waterway:</DIV>
                  </TD>
               </TR>
               <TR>
                  <td style="HEIGHT: 17px">&nbsp;&nbsp;</td>
                  <TD colSpan="2" style="HEIGHT: 17px">&nbsp;
                     <asp:dropdownlist id="ddWaterway" runat="server" CssClass="standard-text" AutoPostBack="True" Width="144px"></asp:dropdownlist>
                     <asp:ImageButton id="btnMap" runat="server" Width="16px" ImageUrl="images/mapicon.gif" ImageAlign="AbsMiddle"></asp:ImageButton></TD>
               </TR>
               <TR>
                  <TD colSpan="2">
                     <DIV class="header-gray" style="DISPLAY: inline" ms_positioning="FlowLayout">Search 
                        By:</DIV>
                  </TD>
               </TR>
               <TR>
                  <td></td>
                  <TD colSpan="2"><asp:radiobutton id="radioMap" runat="server" AutoPostBack="True" Checked="True" GroupName="radioMethodGroup"
                        Text="Map" cssClass="standard-text"></asp:radiobutton></TD>
               </TR>
               <TR>
                  <TD></TD>
                  <TD colSpan="2"><asp:radiobutton id="radioFeature" runat="server" AutoPostBack="True" GroupName="radioMethodGroup"
                        Text="Feature Name" cssClass="standard-text"></asp:radiobutton></TD>
               </TR>
               <TR>
                  <TD colSpan="2">
                     <DIV class="header-gray" style="DISPLAY: inline" ms_positioning="FlowLayout">Surveys:</DIV>
                  </TD>
               </TR>
               <TR>
                  <TD></TD>
                  <TD><asp:radiobutton id="radioRecent" runat="server" CssClass="standard-text" Checked="True" GroupName="radioSurveyGroup"
                        Text="Current (Most Recent)"></asp:radiobutton></TD>
               </TR>
               <TR>
                  <TD></TD>
                  <TD><asp:radiobutton id="radioAll" runat="server" CssClass="standard-text" GroupName="radioSurveyGroup"
                        Text="All (Historical)"></asp:radiobutton></TD>
               </TR>
               <TR>
                  <TD colSpan="2"><asp:textbox id="txtChannel" runat="server" CssClass="header-gray" BorderStyle="None" Visible="False"
                        BorderWidth="0px">Channel:</asp:textbox></TD>
               </TR>
               <TR>
                  <TD></TD>
                  <TD><asp:radiobutton id="radioMain" runat="server" CssClass="standard-text" Checked="True" GroupName="radioChannelGroup"
                        Text="Main" Visible="False" AutoPostBack="True"></asp:radiobutton></TD>
               </TR>
               <TR>
                  <TD></TD>
                  <TD><asp:radiobutton id="radioSecondary" runat="server" CssClass="standard-text" GroupName="radioChannelGroup"
                        Text="Secondary" Visible="False" AutoPostBack="True"></asp:radiobutton></TD>
               </TR>
               <TR>
                  <TD style="HEIGHT: 21px"></TD>
                  <TD style="HEIGHT: 21px"><asp:radiobutton id="radioOther" runat="server" CssClass="standard-text" GroupName="radioChannelGroup"
                        Text="Other" Visible="False" AutoPostBack="True"></asp:radiobutton></TD>
               </TR>
               <TR>
                  <TD colSpan="2"><asp:textbox id="txtLocation" runat="server" CssClass="header-gray" BorderStyle="None" Visible="False"
                        ReadOnly="True" BorderWidth="0px">Location:</asp:textbox></TD>
               </TR>
               <TR>
                  <TD>&nbsp;&nbsp;</TD>
                  <TD>&nbsp;&nbsp;<asp:dropdownlist id="ddLocation" runat="server" CssClass="standard-text" Visible="False" Width="144px"></asp:dropdownlist></TD>
               </TR>
               <TR>
                  <TD colSpan="2">
                     <DIV class="header-gray" style="DISPLAY: inline" ms_positioning="FlowLayout">Type 
                        (optional):</DIV>
                  </TD>
               </TR>
               <TR>
                  <TD></TD>
                  <TD>&nbsp;&nbsp;<asp:dropdownlist id="ddType" runat="server" CssClass="standard-text" Width="144px"></asp:dropdownlist></TD>
               </TR>
               <TR>
                  <TD align="center" colSpan="2"><BR>
                     <asp:imagebutton id="btnSounding" style="Z-INDEX: 101" runat="server" Visible="False" ImageUrl="images/btnsearch.gif"></asp:imagebutton></TD>
               </TR>
            </TBODY>
         </TABLE>
      </FORM>
   </body>
</HTML>
