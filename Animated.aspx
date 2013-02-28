<%@ Page Language="vb" AutoEventWireup="false" Codebehind="Animated.aspx.vb" Inherits="AvadepthNet.AvadepthNet.web.Animated"%>
<%@ Register TagPrefix="uc1" TagName="MenuHeader" Src="MenuHeader.ascx" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
   <HEAD>
      <title>TideSeries</title>
      <meta content="Microsoft Visual Studio .NET 7.1" name="GENERATOR">
      <meta content="Visual Basic .NET 7.1" name="CODE_LANGUAGE">
      <meta content="JavaScript" name="vs_defaultClientScript">
      <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
      <LINK href="Styles.css" type="text/css" rel="stylesheet">
      
      <link href="../../Content/Site.css" rel="stylesheet" type="text/css" />
      <link rel="stylesheet" type="text/css" href="css/smoothness/jquery-ui-1.7.1.custom.css"/>

      <script type='text/javascript' src="Scripts/jquery-1.3.2.min.js"></script>
      <script type='text/javascript' src="Scripts/jquery-ui-1.7.1.custom.min.js"></script>
       
      <script type="text/javascript" src="Scripts/jquery.hint.js"></script>
      <script type="text/javascript" src="Scripts/jquery.corner.js"></script>
      <script type="text/javascript" src="Scripts/jquery.layout.min.js"></script>
      <script type="text/javascript" src="Scripts/jquery.loading.min.js"></script>
      
      <script language=javascript>
           $(document).ready(function() {
           });
      </script>
      
      
      <script language="javascript" src="script.js" type="text/javascript">
      </script>

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
      <form id="Form2" method="post" runat="server">
         <p align="center">
            <uc1:menuheader id="MenuHeader1" runat="server" HelpFile="hanimated.html" BannerImage="images/bnrAnimatedCurrents.gif"></uc1:menuheader>
         </p>
         <div class="formTitle">Date:</div>
         <div class="formItem"><asp:textbox id="lblDate" runat="server" BorderColor="SteelBlue" CssClass="standard-text" BorderWidth="1px"
               Width="100px" Columns="12" AutoPostBack="True" BorderStyle="Solid"></asp:textbox><A href="javascript:OpenCalendar('lblDate', true)"></A><A href="javascript:OpenCalendar('lblDate', true)"><IMG src="images/icon-calendar.gif" align="absMiddle" border="0">calendar</A></div>
         <div class="formTitle">River Discharge @ Hope:</div>
         <div class="formItem"><asp:radiobutton id="RadioPredicted" runat="server" CssClass="standard-text" Width="184px" GroupName="radioDischargeGroup"
               Text="Predicted"></asp:radiobutton></div>
         <div class="formItem"><asp:radiobutton id="RadioActual" runat="server" CssClass="standard-text" Width="184px" GroupName="radioDischargeGroup"
               Text="Actual" Checked="True"></asp:radiobutton></div>
         <div class="formItem"><asp:radiobutton id="radioUserDefined" runat="server" CssClass="standard-text" Width="96px" GroupName="radioDischargeGroup"
               Text="User-defined"></asp:radiobutton><asp:textbox id="txtUserDefined" runat="server" Width="72px"></asp:textbox>m<sup>3</sup>/s</div>
         <div class="formItem"><asp:radiobutton id="RadioSelected" runat="server" CssClass="standard-text" Width="96px" GroupName="radioDischargeGroup"
               Text="Selected"></asp:radiobutton><asp:dropdownlist id="ddFlowList" runat="server" CssClass="standard-text" Width="72px"></asp:dropdownlist>m<sup>3</sup>/s</div>
         <div class="formItem"></div>
         <div class="formTitle">Display Type:</div>
         <div class="formItem">
            <asp:radiobutton id="radioSingle" runat="server" GroupName="radioTypeGroup" Text="Single Image"
               Checked="True" AutoPostBack="True"></asp:radiobutton>
         </div>
         <div class="formItem">
            <asp:radiobutton id="radioAnimated" runat="server" GroupName="radioTypeGroup" Text="Animated"
               AutoPostBack="True"></asp:radiobutton>
         </div>
         <div class="formTitle">
         <table width="100%" cellpadding=0 cellspacing=0>
            <tr>
               <td class="formTitle" style="HEIGHT: 16px"><asp:Label id="lblFrom" CssClass="formTitle" runat="server">Time:</asp:Label></td>
               <td class="formTitle" style="HEIGHT: 16px">
                  <asp:Label id="lblTo" runat="server" CssClass="formTitle" Visible="False">To:</asp:Label></td>
            </tr>
            <tr>
               <TD>&nbsp;<asp:dropdownlist id="ddFrom" runat="server" CssClass="standard-text" Width="65px">
                     <asp:ListItem Value="0">00:00</asp:ListItem>
                     <asp:ListItem Value=".25">00:15</asp:ListItem>
                     <asp:ListItem Value=".50">00:30</asp:ListItem>
                     <asp:ListItem Value=".75">00:45</asp:ListItem>
                     <asp:ListItem Value="1">01:00</asp:ListItem>
                     <asp:ListItem Value="1.25">01:15</asp:ListItem>
                     <asp:ListItem Value="1.50">01:30</asp:ListItem>
                     <asp:ListItem Value="1.75">01:45</asp:ListItem>
                     <asp:ListItem Value="2">02:00</asp:ListItem>
                     <asp:ListItem Value="2.25.25">02:15</asp:ListItem>
                     <asp:ListItem Value="2.50">02:30</asp:ListItem>
                     <asp:ListItem Value="2.75">02:45</asp:ListItem>
                     <asp:ListItem Value="3">03:00</asp:ListItem>
                     <asp:ListItem Value="3.25">03:15</asp:ListItem>
                     <asp:ListItem Value="3.50">03:30</asp:ListItem>
                     <asp:ListItem Value="3.75">03:45</asp:ListItem>
                     <asp:ListItem Value="4">04:00</asp:ListItem>
                     <asp:ListItem Value="4.25">04:15</asp:ListItem>
                     <asp:ListItem Value="4.50">04:30</asp:ListItem>
                     <asp:ListItem Value="4.75">04:45</asp:ListItem>
                     <asp:ListItem Value="5">05:00</asp:ListItem>
                     <asp:ListItem Value="5.25">05:15</asp:ListItem>
                     <asp:ListItem Value="5.50">05:30</asp:ListItem>
                     <asp:ListItem Value="5.75">05:45</asp:ListItem>
                     <asp:ListItem Value="6">06:00</asp:ListItem>
                     <asp:ListItem Value="6.25">06:15</asp:ListItem>
                     <asp:ListItem Value="6.50">06:30</asp:ListItem>
                     <asp:ListItem Value="6.75">06:45</asp:ListItem>
                     <asp:ListItem Value="7">07:00</asp:ListItem>
                     <asp:ListItem Value="7.25">07:15</asp:ListItem>
                     <asp:ListItem Value="7.50">07:30</asp:ListItem>
                     <asp:ListItem Value="7.75">07:45</asp:ListItem>
                     <asp:ListItem Value="8">08:00</asp:ListItem>
                     <asp:ListItem Value="8.25">08:15</asp:ListItem>
                     <asp:ListItem Value="8.50">08:30</asp:ListItem>
                     <asp:ListItem Value="8.75">08:45</asp:ListItem>
                     <asp:ListItem Value="9">09:00</asp:ListItem>
                     <asp:ListItem Value="9.25">09:15</asp:ListItem>
                     <asp:ListItem Value="9.50">09:30</asp:ListItem>
                     <asp:ListItem Value="9.75">09:45</asp:ListItem>
                     <asp:ListItem Value="10">10:00</asp:ListItem>
                     <asp:ListItem Value="10.25">10:15</asp:ListItem>
                     <asp:ListItem Value="10.50">10:30</asp:ListItem>
                     <asp:ListItem Value="10.75">10:45</asp:ListItem>
                     <asp:ListItem Value="11">11:00</asp:ListItem>
                     <asp:ListItem Value="11.25">11:15</asp:ListItem>
                     <asp:ListItem Value="11.50">11:30</asp:ListItem>
                     <asp:ListItem Value="11.75">11:45</asp:ListItem>
                     <asp:ListItem Value="12" Selected="True">12:00</asp:ListItem>
                     <asp:ListItem Value="12.25">12:15</asp:ListItem>
                     <asp:ListItem Value="12.50">12:30</asp:ListItem>
                     <asp:ListItem Value="12.75">12:45</asp:ListItem>
                     <asp:ListItem Value="13">13:00</asp:ListItem>
                     <asp:ListItem Value="13.25">13:15</asp:ListItem>
                     <asp:ListItem Value="13.50">13:30</asp:ListItem>
                     <asp:ListItem Value="13.75">13:45</asp:ListItem>
                     <asp:ListItem Value="14">14:00</asp:ListItem>
                     <asp:ListItem Value="14.25">14:15</asp:ListItem>
                     <asp:ListItem Value="14.50">14:30</asp:ListItem>
                     <asp:ListItem Value="14.75">14:45</asp:ListItem>
                     <asp:ListItem Value="15">15:00</asp:ListItem>
                     <asp:ListItem Value="15.25">15:15</asp:ListItem>
                     <asp:ListItem Value="15.50">15:30</asp:ListItem>
                     <asp:ListItem Value="15.75">15:45</asp:ListItem>
                     <asp:ListItem Value="16">16:00</asp:ListItem>
                     <asp:ListItem Value="16.25">16:15</asp:ListItem>
                     <asp:ListItem Value="16.50">16:30</asp:ListItem>
                     <asp:ListItem Value="16.75">16:45</asp:ListItem>
                     <asp:ListItem Value="17">17:00</asp:ListItem>
                     <asp:ListItem Value="17.25">17:15</asp:ListItem>
                     <asp:ListItem Value="17.50">17:30</asp:ListItem>
                     <asp:ListItem Value="17.75">17:45</asp:ListItem>
                     <asp:ListItem Value="18">18:00</asp:ListItem>
                     <asp:ListItem Value="18.25">18:15</asp:ListItem>
                     <asp:ListItem Value="18.50">18:30</asp:ListItem>
                     <asp:ListItem Value="18.75">18:45</asp:ListItem>
                     <asp:ListItem Value="19">19:00</asp:ListItem>
                     <asp:ListItem Value="19.25">19:15</asp:ListItem>
                     <asp:ListItem Value="19.50">19:30</asp:ListItem>
                     <asp:ListItem Value="19.75">19:45</asp:ListItem>
                     <asp:ListItem Value="20">20:00</asp:ListItem>
                     <asp:ListItem Value="20.25">20:15</asp:ListItem>
                     <asp:ListItem Value="20.50">20:30</asp:ListItem>
                     <asp:ListItem Value="20.75">20:45</asp:ListItem>
                     <asp:ListItem Value="21">21:00</asp:ListItem>
                     <asp:ListItem Value="21.25">21:15</asp:ListItem>
                     <asp:ListItem Value="21.50">21:30</asp:ListItem>
                     <asp:ListItem Value="21.75">21:45</asp:ListItem>
                     <asp:ListItem Value="22">22:00</asp:ListItem>
                     <asp:ListItem Value="22.25">22:15</asp:ListItem>
                     <asp:ListItem Value="22.50">22:30</asp:ListItem>
                     <asp:ListItem Value="22.75">22:45</asp:ListItem>
                     <asp:ListItem Value="23">23:00</asp:ListItem>
                     <asp:ListItem Value="23.25">23:15</asp:ListItem>
                     <asp:ListItem Value="23.50">23:30</asp:ListItem>
                     <asp:ListItem Value="23.75">23:45</asp:ListItem>
                     <asp:ListItem Value="24">24:00</asp:ListItem>
                  </asp:dropdownlist>
               </TD>
               <TD>&nbsp;
                  <asp:dropdownlist id="ddTo" runat="server" CssClass="standard-text" Width="65px" Visible="False">
                     <asp:ListItem Value="0">00:00</asp:ListItem>
                     <asp:ListItem Value=".25">00:15</asp:ListItem>
                     <asp:ListItem Value=".50">00:30</asp:ListItem>
                     <asp:ListItem Value=".75">00:45</asp:ListItem>
                     <asp:ListItem Value="1">01:00</asp:ListItem>
                     <asp:ListItem Value="1.25">01:15</asp:ListItem>
                     <asp:ListItem Value="1.50">01:30</asp:ListItem>
                     <asp:ListItem Value="1.75">01:45</asp:ListItem>
                     <asp:ListItem Value="2">02:00</asp:ListItem>
                     <asp:ListItem Value="2.25.25">02:15</asp:ListItem>
                     <asp:ListItem Value="2.50">02:30</asp:ListItem>
                     <asp:ListItem Value="2.75">02:45</asp:ListItem>
                     <asp:ListItem Value="3">03:00</asp:ListItem>
                     <asp:ListItem Value="3.25">03:15</asp:ListItem>
                     <asp:ListItem Value="3.50">03:30</asp:ListItem>
                     <asp:ListItem Value="3.75">03:45</asp:ListItem>
                     <asp:ListItem Value="4">04:00</asp:ListItem>
                     <asp:ListItem Value="4.25">04:15</asp:ListItem>
                     <asp:ListItem Value="4.50">04:30</asp:ListItem>
                     <asp:ListItem Value="4.75">04:45</asp:ListItem>
                     <asp:ListItem Value="5">05:00</asp:ListItem>
                     <asp:ListItem Value="5.25">05:15</asp:ListItem>
                     <asp:ListItem Value="5.50">05:30</asp:ListItem>
                     <asp:ListItem Value="5.75">05:45</asp:ListItem>
                     <asp:ListItem Value="6">06:00</asp:ListItem>
                     <asp:ListItem Value="6.25">06:15</asp:ListItem>
                     <asp:ListItem Value="6.50">06:30</asp:ListItem>
                     <asp:ListItem Value="6.75">06:45</asp:ListItem>
                     <asp:ListItem Value="7">07:00</asp:ListItem>
                     <asp:ListItem Value="7.25">07:15</asp:ListItem>
                     <asp:ListItem Value="7.50">07:30</asp:ListItem>
                     <asp:ListItem Value="7.75">07:45</asp:ListItem>
                     <asp:ListItem Value="8">08:00</asp:ListItem>
                     <asp:ListItem Value="8.25">08:15</asp:ListItem>
                     <asp:ListItem Value="8.50">08:30</asp:ListItem>
                     <asp:ListItem Value="8.75">08:45</asp:ListItem>
                     <asp:ListItem Value="9">09:00</asp:ListItem>
                     <asp:ListItem Value="9.25">09:15</asp:ListItem>
                     <asp:ListItem Value="9.50">09:30</asp:ListItem>
                     <asp:ListItem Value="9.75">09:45</asp:ListItem>
                     <asp:ListItem Value="10">10:00</asp:ListItem>
                     <asp:ListItem Value="10.25">10:15</asp:ListItem>
                     <asp:ListItem Value="10.50">10:30</asp:ListItem>
                     <asp:ListItem Value="10.75">10:45</asp:ListItem>
                     <asp:ListItem Value="11">11:00</asp:ListItem>
                     <asp:ListItem Value="11.25">11:15</asp:ListItem>
                     <asp:ListItem Value="11.50">11:30</asp:ListItem>
                     <asp:ListItem Value="11.75">11:45</asp:ListItem>
                     <asp:ListItem Value="12">12:00</asp:ListItem>
                     <asp:ListItem Value="12.25">12:15</asp:ListItem>
                     <asp:ListItem Value="12.50">12:30</asp:ListItem>
                     <asp:ListItem Value="12.75">12:45</asp:ListItem>
                     <asp:ListItem Value="13">13:00</asp:ListItem>
                     <asp:ListItem Value="13.25">13:15</asp:ListItem>
                     <asp:ListItem Value="13.50">13:30</asp:ListItem>
                     <asp:ListItem Value="13.75">13:45</asp:ListItem>
                     <asp:ListItem Value="14">14:00</asp:ListItem>
                     <asp:ListItem Value="14.25">14:15</asp:ListItem>
                     <asp:ListItem Value="14.50">14:30</asp:ListItem>
                     <asp:ListItem Value="14.75">14:45</asp:ListItem>
                     <asp:ListItem Value="15">15:00</asp:ListItem>
                     <asp:ListItem Value="15.25">15:15</asp:ListItem>
                     <asp:ListItem Value="15.50">15:30</asp:ListItem>
                     <asp:ListItem Value="15.75">15:45</asp:ListItem>
                     <asp:ListItem Value="16" Selected="True">16:00</asp:ListItem>
                     <asp:ListItem Value="16.25">16:15</asp:ListItem>
                     <asp:ListItem Value="16.50">16:30</asp:ListItem>
                     <asp:ListItem Value="16.75">16:45</asp:ListItem>
                     <asp:ListItem Value="17">17:00</asp:ListItem>
                     <asp:ListItem Value="17.25">17:15</asp:ListItem>
                     <asp:ListItem Value="17.50">17:30</asp:ListItem>
                     <asp:ListItem Value="17.75">17:45</asp:ListItem>
                     <asp:ListItem Value="18">18:00</asp:ListItem>
                     <asp:ListItem Value="18.25">18:15</asp:ListItem>
                     <asp:ListItem Value="18.50">18:30</asp:ListItem>
                     <asp:ListItem Value="18.75">18:45</asp:ListItem>
                     <asp:ListItem Value="19">19:00</asp:ListItem>
                     <asp:ListItem Value="19.25">19:15</asp:ListItem>
                     <asp:ListItem Value="19.50">19:30</asp:ListItem>
                     <asp:ListItem Value="19.75">19:45</asp:ListItem>
                     <asp:ListItem Value="20">20:00</asp:ListItem>
                     <asp:ListItem Value="20.25">20:15</asp:ListItem>
                     <asp:ListItem Value="20.50">20:30</asp:ListItem>
                     <asp:ListItem Value="20.75">20:45</asp:ListItem>
                     <asp:ListItem Value="21">21:00</asp:ListItem>
                     <asp:ListItem Value="21.25">21:15</asp:ListItem>
                     <asp:ListItem Value="21.50">21:30</asp:ListItem>
                     <asp:ListItem Value="21.75">21:45</asp:ListItem>
                     <asp:ListItem Value="22">22:00</asp:ListItem>
                     <asp:ListItem Value="22.25">22:15</asp:ListItem>
                     <asp:ListItem Value="22.50">22:30</asp:ListItem>
                     <asp:ListItem Value="22.75">22:45</asp:ListItem>
                     <asp:ListItem Value="23">23:00</asp:ListItem>
                     <asp:ListItem Value="23.25">23:15</asp:ListItem>
                     <asp:ListItem Value="23.50">23:30</asp:ListItem>
                     <asp:ListItem Value="23.75">23:45</asp:ListItem>
                     <asp:ListItem Value="24">24:00</asp:ListItem>
                  </asp:dropdownlist></TD>
            </tr>
         </table>
         </div>
         <div class="formTitle">
         <table width="100%" cellpadding=0 cellspacing=0>
            <tr>
               <td class="formTitle">Zone:</td>
               <td class="formTitle"><asp:Label id="lblInterval" runat="server" CssClass="formTitle" Visible="False">Interval:</asp:Label></td>
            </tr>
            <tr>
               <TD style="HEIGHT: 13px">&nbsp;<asp:dropdownlist id="ddZone" runat="server" CssClass="standard-text" Width="50px">
                     <asp:ListItem Value="1">01</asp:ListItem>
                     <asp:ListItem Value="2">02</asp:ListItem>
                     <asp:ListItem Value="3">03</asp:ListItem>
                     <asp:ListItem Value="4">04</asp:ListItem>
                     <asp:ListItem Value="5">05</asp:ListItem>
                     <asp:ListItem Value="6">06</asp:ListItem>
                     <asp:ListItem Value="7">07</asp:ListItem>
                     <asp:ListItem Value="8">08</asp:ListItem>
                     <asp:ListItem Value="9">09</asp:ListItem>
                     <asp:ListItem Value="10">10</asp:ListItem>
                     <asp:ListItem Value="11">11</asp:ListItem>
                  </asp:dropdownlist></TD>
               <TD style="HEIGHT: 13px">&nbsp;
                  <asp:dropdownlist id="ddInterval" runat="server" CssClass="standard-text" Width="55px" Visible="False">
                     <asp:ListItem Value="8">8 hr</asp:ListItem>
                     <asp:ListItem Value="6">6 hr</asp:ListItem>
                     <asp:ListItem Value="4" Selected="True">4 hr</asp:ListItem>
                     <asp:ListItem Value="2">2 hr</asp:ListItem>
                     <asp:ListItem Value="1">1 hr</asp:ListItem>
                     <asp:ListItem Value=".5">30 min.</asp:ListItem>
                     <asp:ListItem Value=".25">15 min.</asp:ListItem>
                  </asp:dropdownlist></TD>
            </tr>
         </table>
         </div>
         <div class="formTitle">Velocity Legend:</div>
         <div class="formItem"><asp:radiobutton id="radioLegend2" runat="server" CssClass="standard-text" Width="175px" GroupName="radioDisplayGroup"
               Text="0 to 2 m/s (Interval .25ms)" Checked="True"></asp:radiobutton>
         </div>
         <div class="formItem"><asp:radiobutton id="radioLegend4" runat="server" CssClass="standard-text" Width="175px" GroupName="radioDisplayGroup"
               Text="0 to 4 m/s (Interval .5ms)"></asp:radiobutton>
         </div>
         <div class="formItem">
         </div>
         <p align="center">
<!--<div id="goButton" style="width: 75px; background-color: red; text-align: center; padding: 3; color: white; font-weight: 600; font-size: 12px; font-family: Verdana;">Display</div><br /> -->        
            <asp:imagebutton id="Imagebutton1" runat="server" ImageUrl="images/displaybutton.gif"></asp:imagebutton><BR>
         <P align="center"><asp:label id="lblInvalidDate" runat="server" CssClass="standard-text" ForeColor="Red" Visible="False">* Invalid Date</asp:label><asp:label id="lblNoflow" runat="server" CssClass="standard-text" ForeColor="Red" Visible="False">No flow data available.</asp:label><asp:comparevalidator id="CompareValidator1" runat="server" CssClass="standard-text" ValueToCompare="30000"
               Operator="LessThan" Type="Integer" ControlToValidate="txtUserDefined" ErrorMessage="CompareValidator">*Invalid Discharge Rate</asp:comparevalidator></P>
         <P></P>
      </form>
   </body>
</HTML>
