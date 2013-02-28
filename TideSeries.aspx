<%@ Register TagPrefix="uc1" TagName="MenuHeader" Src="MenuHeader.ascx" %>
<%@ Page Language="vb" AutoEventWireup="false" Codebehind="TideSeries.aspx.vb" Inherits="AvadepthNet.AvadepthNet.web.TideSeries"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
   <HEAD>
      <title>TideSeries</title>
      <meta content="Microsoft Visual Studio .NET 7.1" name="GENERATOR">
      <meta content="Visual Basic .NET 7.1" name="CODE_LANGUAGE">
      <meta content="JavaScript" name="vs_defaultClientScript">
      <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
      <LINK href="Styles.css" type="text/css" rel="stylesheet">
      <script language="javascript" src="script.js" type="text/javascript"></script>
      <SCRIPT language="JavaScript">

      var zone = 10;

      function GotoTile(nSheet) {
      document.model.ZONE[nSheet].selected = true;
      } 

      function zonerestart() {
         document.model.ZONE.selectedIndex = zone;
         mywindow.close();
      }

      function newZoneWindow() {
         parent.frames['main'].location.href = 'velocityoverview.html';
      }

      function DisplayRiver(i)  {
      parent.frames['main'].location.href = 'tideoverview' + i + '.html';
      }

      function DisplayMap()  {
      parent.frames['main'].location.href = 'tideoverview.html';
      }


      //-->

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
      <DIV style="Z-INDEX: 101; LEFT: 1px; WIDTH: 200px; POSITION: absolute; TOP: 1px" ms_positioning="FlowLayout">
         <form id="Form1" method="post" runat="server">
            <TABLE id="TableEntry" cellSpacing="1" cellPadding="1" width="200" border="0">
               <TR>
                  <TD colSpan="2"><uc1:menuheader id="MenuHeader1" runat="server" BannerImage="images/bnrWaterLevels.gif"></uc1:menuheader></TD>
               </TR>
               <TR>
                  <TD colSpan="2">
                     <DIV class="header-gray" style="DISPLAY: inline" ms_positioning="FlowLayout">Date:</DIV>
                  </TD>
               </TR>
               <TR>
                  <TD style="WIDTH: 5px"></TD>
                  <TD colSpan="1">&nbsp;<asp:textbox id="lblDate" runat="server" MaxLength="12" BorderColor="SteelBlue" Width="100px"
                        BorderWidth="1px" CssClass="standard-text" Columns="12" AutoPostBack="True" BorderStyle="Solid"></asp:textbox><A href="javascript:OpenCalendar('lblDate', true)"><IMG src="images/icon-calendar.gif" align="absMiddle" border="0">calendar</A>
                  </TD>
               </TR>
               <TR>
                  <TD colSpan="2">
                     <DIV class="header-gray" style="DISPLAY: inline" ms_positioning="FlowLayout">
                        <P>Fraser River:</P>
                     </DIV>
                  </TD>
               </TR>
               <TR>
                  <TD style="WIDTH: 4px"></TD>
                  <TD colSpan="1"><asp:radiobutton id="radioSouth" onclick="javascript:DisplayMap();" runat="server" CssClass="standard-text"
                        Checked="True" GroupName="radioRiverGroup" Text="South Arm (km 0-40) "></asp:radiobutton></TD>
               </TR>
               <TR>
                  <TD style="WIDTH: 4px"></TD>
                  <TD colSpan="1"><asp:radiobutton id="radioNorth" onclick="javascript:DisplayRiver(1);" runat="server" CssClass="standard-text"
                        GroupName="radioRiverGroup" Text="North Arm (km 0-30) " Height="8px"></asp:radiobutton></TD>
               </TR>
               <TR>
                  <TD style="WIDTH: 4px"></TD>
                  <TD colSpan="1"><asp:radiobutton id="radioMain" onclick="javascript:DisplayRiver(2);" runat="server" CssClass="standard-text"
                        GroupName="radioRiverGroup" Text="Main Arm (km 40-92) " Height="8px"></asp:radiobutton></TD>
               </TR>
               <TR>
                  <TD colSpan="2">
                     <DIV class="header-gray" style="DISPLAY: inline" ms_positioning="FlowLayout">River 
                        Discharge @ Hope:</DIV>
                  </TD>
               </TR>
               <TR>
                  <TD style="WIDTH: 4px"></TD>
                  <TD><asp:radiobutton id="radioPredicted" runat="server" Width="176px" CssClass="standard-text" GroupName="radioDischargeGroup"
                        Text="Predicted"></asp:radiobutton></TD>
               </TR>
               <TR>
                  <TD style="WIDTH: 4px"></TD>
                  <TD><asp:radiobutton id="radioActual" runat="server" Width="176px" CssClass="standard-text" Checked="True"
                        GroupName="radioDischargeGroup" Text="Actual"></asp:radiobutton></TD>
               </TR>
               <TR>
                  <TD style="WIDTH: 4px; HEIGHT: 22px"></TD>
                  <TD style="HEIGHT: 22px"><asp:radiobutton id="radioUserDefined" runat="server" Width="95px" CssClass="standard-text" GroupName="radioDischargeGroup"
                        Text="User-defined"></asp:radiobutton><asp:textbox id="txtUserDefined" runat="server" Width="65px" CssClass="standard-text"></asp:textbox>&nbsp;m<sup>3</sup>/s</TD>
               </TR>
               <TR>
                  <TD style="WIDTH: 4px"></TD>
                  <TD><asp:radiobutton id="radioSelected" runat="server" Width="95px" CssClass="standard-text" GroupName="radioDischargeGroup"
                        Text="Selected" Height="16px"></asp:radiobutton><asp:dropdownlist id="ddFlowList" runat="server" Width="65px" CssClass="standard-text" Height="24px"></asp:dropdownlist>&nbsp;m<sup>3</sup>/s</TD>
               </TR>
               <TR>
                  <TD colSpan="2">
                     <DIV class="header-gray" style="DISPLAY: inline" ms_positioning="FlowLayout">
                        <P>Interval:</P>
                     </DIV>
                  </TD>
               </TR>
               <TR>
                  <TD style="WIDTH: 4px"></TD>
                  <TD>&nbsp;<asp:dropdownlist id="ddInterval" runat="server" Width="120px" CssClass="standard-text" Height="48px">
                        <asp:ListItem Value="15">15 minute</asp:ListItem>
                        <asp:ListItem Value="30">30 minute</asp:ListItem>
                        <asp:ListItem Value="60" Selected="True">1 hour</asp:ListItem>
                        <asp:ListItem Value="120">2 hour</asp:ListItem>
                     </asp:dropdownlist></TD>
               </TR>
               <TR>
               </TR>
               <TR>
                  <TD colSpan="2">
                     <DIV class="header-gray" style="DISPLAY: inline" ms_positioning="FlowLayout">
                        <P>Report:</P>
                     </DIV>
                  </TD>
               </TR>
               <TR>
                  <TD style="WIDTH: 4px"></TD>
                  <TD><asp:radiobutton id="RadioCurrent" runat="server" Width="96px" CssClass="standard-text" Checked="True"
                        GroupName="radioDisplayGroup" Text="Water Levels" Height="16px"></asp:radiobutton>&nbsp;&nbsp;&nbsp;
                     <asp:radiobutton id="RadioVelocity" runat="server" Width="72px" CssClass="standard-text" GroupName="radioDisplayGroup"
                        Text="Velocities" Height="16px"></asp:radiobutton></TD>
               </TR>
               <TR>
                  <TD align="center" colSpan="2"><asp:imagebutton id="imgBtnDepth" runat="server" ImageUrl="images/displaybutton.gif"></asp:imagebutton><BR>
                     <asp:label id="lblNoflow" runat="server" CssClass="standard-text" Height="16px" Visible="False"
                        ForeColor="Red">No flow data available.</asp:label><BR>
                     <asp:label id="lblInvalidDate" runat="server" CssClass="standard-text" Visible="False" ForeColor="Red">* Invalid Date</asp:label><BR>
                     <asp:comparevalidator id="CompareValidator1" runat="server" CssClass="standard-text" ErrorMessage="CompareValidator"
                        ControlToValidate="txtUserDefined" Type="Integer" Operator="LessThan" ValueToCompare="30000">*Invalid Discharge Rate</asp:comparevalidator></TD>
               </TR>
            </TABLE>
         </form>
      </DIV>
   </body>
</HTML>
