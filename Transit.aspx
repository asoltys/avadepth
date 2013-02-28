<%@ Page Language="vb" AutoEventWireup="false" Codebehind="Transit.aspx.vb" Inherits="AvadepthNet.AvadepthNet.web.Transit"%>
<%@ Register TagPrefix="uc1" TagName="MenuHeader" Src="MenuHeader.ascx" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
   <HEAD>
      <title>Transit</title>
      <meta content="Microsoft Visual Studio .NET 7.1" name="GENERATOR">
      <meta content="Visual Basic .NET 7.1" name="CODE_LANGUAGE">
      <meta content="JavaScript" name="vs_defaultClientScript">
      <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
      <LINK href="styles.css" type="text/css" rel="stylesheet">
      <script language="javascript" src="script.js" type="text/javascript"></script>

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
      <DIV style="Z-INDEX: 101; LEFT: 1px; WIDTH: 10px; POSITION: absolute; TOP: 1px; HEIGHT: 10px"
         ms_positioning="text2D">
         <FORM id="Form1" method="post" runat="server">
            <TABLE id="TableEntry" cellSpacing="1" cellPadding="1" width="208" border="0">
               <TR>
                  <TD colSpan="2"><uc1:menuheader id="MenuHeader1" runat="server" HelpFile="htransit.html" bannerImage="images/bnrTransitReport.gif"></uc1:menuheader></TD>
               </TR>
               <TR>
                  <TD colSpan="2">
                     <DIV class="header-gray" style="DISPLAY: inline; WIDTH: 48px" ms_positioning="FlowLayout">Date</DIV>
                  </TD>
               </TR>
               <TR>
                  <TD>&nbsp;</TD>
                  <TD>
                     <P>&nbsp;<asp:textbox id="lblDate" runat="server" BorderStyle="Solid" AutoPostBack="True" Columns="12"
                           CssClass="standard-text" BorderWidth="1px" Width="100px" BorderColor="SteelBlue"></asp:textbox><A href="javascript:OpenCalendar('lblDate', true)"><IMG src="images/icon-calendar.gif" align="absMiddle" border="0">calendar</A></P>
                  </TD>
               </TR>
            </TABLE>
            <TABLE id="TableEntry2" cellSpacing="1" cellPadding="1" width="208" border="0">
            </TABLE>
            <TABLE id="TableEntry3" cellSpacing="1" cellPadding="1" width="208" border="0">
               <TR>
                  <TD style="HEIGHT: 14px" colSpan="2">
                     <DIV class="header-gray" style="DISPLAY: inline; WIDTH: 176px; HEIGHT: 13px" ms_positioning="FlowLayout">River 
                        Discharge @ Hope:</DIV>
                  </TD>
               </TR>
               <TR>
                  <TD></TD>
                  <TD><asp:radiobutton id="radioActual" runat="server" CssClass="standard-text" Width="184px" Text="Actual"
                        GroupName="radioDischargeGroup" Checked="True" Height="16px"></asp:radiobutton></TD>
               </TR>
               <TR>
                  <TD></TD>
                  <TD><asp:radiobutton id="radioPredicted" runat="server" CssClass="standard-text" Width="184px" Text="Predicted"
                        GroupName="radioDischargeGroup" Height="16px"></asp:radiobutton></TD>
               </TR>
               <TR>
                  <TD></TD>
                  <TD colSpan="1"><asp:radiobutton id="radioUserDefined" runat="server" CssClass="standard-text" Width="95px" Text="User-defined"
                        GroupName="radioDischargeGroup" Height="16px"></asp:radiobutton><asp:textbox id="txtUserDefined" runat="server" CssClass="standard-text" Width="72px" Height="16px"></asp:textbox>&nbsp;m<sup>3</sup>/s</TD>
               </TR>
               <TR>
                  <TD></TD>
                  <TD colSpan="1"><asp:radiobutton id="radioSelected" runat="server" CssClass="standard-text" Width="95px" Text="Selected"
                        GroupName="radioDischargeGroup" Height="8px"></asp:radiobutton><asp:dropdownlist id="ddFlowList" runat="server" CssClass="standard-text" Width="72px" Height="24px"></asp:dropdownlist>&nbsp;m<sup>3</sup>/s</TD>
               </TR>
               <TR>
                  <TD colSpan="2">
                     <DIV class="header-gray" style="DISPLAY: inline; WIDTH: 120px; HEIGHT: 2px" ms_positioning="FlowLayout">
                        <P>Chainage:</P>
                     </DIV>
                  </TD>
               </TR>
               <TR>
                  <TD></TD>
                  <TD>&nbsp;
                     <DIV class="standard-text" style="DISPLAY: inline; WIDTH: 32px" ms_positioning="FlowLayout">1 
                        to
                     </DIV>
                     <asp:dropdownlist id="ddChainage" runat="server" CssClass="standard-text" Width="40px">
                        <asp:ListItem Value="27">27</asp:ListItem>
                        <asp:ListItem Value="28">28</asp:ListItem>
                        <asp:ListItem Value="29">29</asp:ListItem>
                        <asp:ListItem Value="30">30</asp:ListItem>
                        <asp:ListItem Value="31">31</asp:ListItem>
                        <asp:ListItem Value="32">32</asp:ListItem>
                        <asp:ListItem Value="33">33</asp:ListItem>
                        <asp:ListItem Value="34">34</asp:ListItem>
                        <asp:ListItem Value="35" Selected="True">35</asp:ListItem>
                     </asp:dropdownlist>&nbsp;km</TD>
               </TR>
               <TR>
                  <TD colSpan="2">
                     <DIV class="header-gray" style="DISPLAY: inline" ms_positioning="FlowLayout">
                        <P>Channel Condition:</P>
                     </DIV>
                  </TD>
               </TR>
               <TR>
                  <TD></TD>
                  <TD><asp:radiobutton id="radioCurrent" runat="server" CssClass="standard-text" Text="Current Soundings"
                        GroupName="radioSoundingsGroup" Checked="True" Height="20px"></asp:radiobutton>&nbsp;&nbsp;&nbsp;&nbsp;<BR>
                     <asp:radiobutton id="radioAssured" runat="server" CssClass="standard-text" Text="Design" GroupName="radioSoundingsGroup"></asp:radiobutton>&nbsp;Grade&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </TD>
               </TR>
               <TR>
                  <TD colSpan="2">
                     <DIV class="header-gray" style="DISPLAY: inline; WIDTH: 120px" ms_positioning="FlowLayout">
                        <P>Navigation&nbsp;Channel:</P>
                     </DIV>
                  </TD>
               </TR>
               <TR>
                  <TD>&nbsp;</TD>
                  <TD><asp:radiobutton id="Radio1Lane" runat="server" CssClass="standard-text" Text="Inner Limit" GroupName="radioLaneGroup"
                        Checked="True"></asp:radiobutton>&nbsp;&nbsp;
                     <asp:radiobutton id="radio2Lane" runat="server" CssClass="standard-text" Text="Outer Limit" GroupName="radioLaneGroup"></asp:radiobutton><BR>
                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                     <asp:label id="lblWidth" runat="server" CssClass="standard-text">Available Width</asp:label>&nbsp;
                     <asp:dropdownlist id="ddWidth" runat="server" CssClass="standard-text" Width="50px">
                        <asp:ListItem Value="100" Selected="True">100</asp:ListItem>
                        <asp:ListItem Value="95">95</asp:ListItem>
                        <asp:ListItem Value="90">90</asp:ListItem>
                        <asp:ListItem Value="85">85</asp:ListItem>
                        <asp:ListItem Value="80">80</asp:ListItem>
                        <asp:ListItem Value="75">75</asp:ListItem>
                        <asp:ListItem Value="70">70</asp:ListItem>
                        <asp:ListItem Value="65">65</asp:ListItem>
                        <asp:ListItem Value="60">60</asp:ListItem>
                     </asp:dropdownlist>&nbsp;
                     <asp:label id="lblWidth2" runat="server" CssClass="standard-text">%</asp:label></TD>
               </TR>
               <TR>
                  <TD style="WIDTH: 108px; HEIGHT: 15px" colSpan="3">
                     <DIV class="header-gray" style="DISPLAY: inline" ms_positioning="FlowLayout">
                        <P>Transit&nbsp;Calculation:</P>
                     </DIV>
                  </TD>
               </TR>
               <TR>
                  <TD></TD>
                  <TD>
                     <DIV class="standard-text" style="DISPLAY: inline; HEIGHT: 12px" ms_positioning="FlowLayout">&nbsp;Period:</DIV>
                     &nbsp;<asp:dropdownlist id="ddPeriod" runat="server" CssClass="standard-text" Width="64px">
                        <asp:ListItem Value="0" Selected="True">Day</asp:ListItem>
                        <asp:ListItem Value="1">Week</asp:ListItem>
                        <asp:ListItem Value="2">Month</asp:ListItem>
                     </asp:dropdownlist>
                     <asp:radiobutton id="Radiobutton1" runat="server" AutoPostBack="True" CssClass="standard-text" Text="Maximum Depth"
                        GroupName="radioTypeGroup" Checked="True" Height="20px"></asp:radiobutton><BR>
                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                     <DIV class="standard-text" style="DISPLAY: inline" ms_positioning="FlowLayout">Min. 
                        Window:</DIV>
                     &nbsp;
                     <asp:dropdownlist id="ddWindow" runat="server" CssClass="standard-text" Width="55px">
                        <asp:ListItem Value="1">1 hr</asp:ListItem>
                        <asp:ListItem Value="2" Selected="True">2 hrs</asp:ListItem>
                        <asp:ListItem Value="3">3 hrs</asp:ListItem>
                        <asp:ListItem Value="4">4 hrs</asp:ListItem>
                     </asp:dropdownlist><asp:radiobutton id="radioCompliance" runat="server" AutoPostBack="True" CssClass="standard-text"
                        Text="Available Windows" GroupName="radioTypeGroup" Height="20px"></asp:radiobutton><BR>
                     &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                     <DIV class="standard-text" style="DISPLAY: inline; WIDTH: 56px; HEIGHT: 13px" ms_positioning="FlowLayout">Depth:</DIV>
                     &nbsp;
                     <asp:textbox id="txtStd" runat="server" CssClass="standard-text" Width="55px" Enabled="False">10.0</asp:textbox>
                     <DIV class="standard-text" style="DISPLAY: inline; WIDTH: 16px; HEIGHT: 13px" ms_positioning="FlowLayout">m</DIV>
                  </TD>
               <TR>
               </TR>
               <TR>
                  </TD></TR>
               <TR>
                  <TD align="center" colSpan="2"><BR>
                     <asp:imagebutton id="imgBtnDepth" runat="server" ImageUrl="images/displaybutton.gif"></asp:imagebutton><BR>
                     <BR>
                     <asp:label id="lblNoflow" runat="server" CssClass="standard-text" Height="16px" ForeColor="Red"
                        Visible="False">No flow data available.</asp:label><asp:label id="lblInvalidDate" runat="server" CssClass="standard-text" ForeColor="Red" Visible="False">* Invalid Date</asp:label><asp:comparevalidator id="CompareValidator1" runat="server" CssClass="standard-text" ValueToCompare="30000"
                        Operator="LessThan" Type="Integer" ControlToValidate="txtUserDefined" ErrorMessage="CompareValidator">*Invalid Discharge Rate</asp:comparevalidator></TD>
               </TR>
            </TABLE>
         </FORM>
      </DIV>
   </body>
</HTML>
