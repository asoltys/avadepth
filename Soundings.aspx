<%@ Page Language="vb" AutoEventWireup="false" Codebehind="Soundings.aspx.vb" Inherits="AvadepthNet.AvadepthNet.web.Soundings"%>
<%@ Register TagPrefix="uc1" TagName="MenuHeader" Src="MenuHeader.ascx" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
   <HEAD>
      <title>Soundings</title>
      <meta content="Microsoft Visual Studio .NET 7.1" name="GENERATOR">
      <meta content="Visual Basic .NET 7.1" name="CODE_LANGUAGE">
      <meta content="JavaScript" name="vs_defaultClientScript">
      <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
      <LINK href="Styles.css" type="text/css" rel="stylesheet">
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
      <form id="Form1" method="post" runat="server">
         <INPUT type="hidden" value="1" name="mode"> <INPUT type="hidden" value="0" name="advanced">
         <INPUT type="hidden" name="tile"> <INPUT type="hidden" name="locationtile">
         <p align="center">
            <uc1:menuheader id="Menuheader2" runat="server" BannerImage="images/bnrSoundings.gif" HelpFile="hsound.html"
               EnableViewState="False"></uc1:menuheader>
         </p>
         <DIV class="formTitle">Waterway:</DIV>
         <div class="formItem"><asp:dropdownlist id="ddWaterway" runat="server" Width="144px" AutoPostBack="True" CssClass="standard-text"></asp:dropdownlist><asp:imagebutton id="btnMap" runat="server" Width="16px" ImageAlign="AbsMiddle" ImageUrl="images/mapicon.gif"></asp:imagebutton></div>
         <DIV class="formTitle">Options:</DIV>
         <div class="formItem"><asp:radiobutton id="RadioReport" runat="server" Width="176px" AutoPostBack="True" Checked="True"
               GroupName="RadioDisplayGroup" Text="Channel Condition Report" Visible="False"></asp:radiobutton></div>
         <div class="formItem"><asp:radiobutton id="radioFraser" runat="server" AutoPostBack="True" GroupName="RadioDisplayGroup"
               Text="Berth Soundings" Visible="False"></asp:radiobutton></div>
         <div class="formItem"><asp:radiobutton id="radioOverview" runat="server" Width="176px" AutoPostBack="True" GroupName="RadioDisplayGroup"
               Text="Current Overview"></asp:radiobutton><asp:label id="hiddenOverview" runat="server" Visible="False"></asp:label></div>
         <div class="formItem"><asp:radiobutton id="radioOverview2" runat="server" Width="176px" AutoPostBack="True" GroupName="RadioDisplayGroup"
               Text="Current Overview w/Snd'g"></asp:radiobutton><asp:label id="hiddenOverview2" runat="server" Visible="False"></asp:label></div>
         <div class="formItem"><asp:radiobutton id="radioDrawing" runat="server" Width="176px" AutoPostBack="True" GroupName="RadioDisplayGroup"
               Text="Survey Drawings"></asp:radiobutton></div>
         <div class="formItem"></div>
         <asp:panel id="panelSurveys" runat="server" Visible="False">
            <DIV class="formTitle">Drawing Search Options:</DIV>
            <DIV class="formTitle">Channel:</DIV>
            <DIV class="formItem">
               <asp:textbox id="txtChannel" runat="server" CssClass="header-gray" Visible="True" BorderStyle="None"
                  BorderWidth="0px">Channel:</asp:textbox></DIV>
            <DIV class="formItem">
               <asp:radiobutton id="radioMain" runat="server" AutoPostBack="True" Visible="True" Text="Main" GroupName="radioChannelGroup"
                  Checked="True"></asp:radiobutton></DIV>
            <DIV class="formItem">
               <asp:radiobutton id="radioSecondary" runat="server" AutoPostBack="True" Visible="True" Text="Secondary"
                  GroupName="radioChannelGroup"></asp:radiobutton></DIV>
            <DIV class="formItem">
               <asp:radiobutton id="radioOther" runat="server" AutoPostBack="True" Visible="True" Text="Other" GroupName="radioChannelGroup"></asp:radiobutton></DIV>
            <DIV class="formTitle">Location:</DIV>
            <DIV class="formItem">
               <asp:dropdownlist id="ddLocation" runat="server" CssClass="standard-text" Width="144px" Visible="True"></asp:dropdownlist></DIV>
            <DIV class="formTitle">Type (optional):</DIV>
            <DIV class="formItem">
               <asp:dropdownlist id="ddType" runat="server" CssClass="standard-text" Width="144px"></asp:dropdownlist></DIV>
            <DIV class="formTitle"></DIV>
         </asp:panel>
         <p align="center"><asp:imagebutton id="btnSounding" style="Z-INDEX: 101" runat="server" ImageUrl="images/displaybutton.gif"></asp:imagebutton></p>
         <p>&nbsp;</p>
         <p align="center"><a href="http://usa.autodesk.com/adsk/servlet/index?siteID=123112&amp;id=2404513&amp;GP=ILC-dwfitcampaign"
               target="_new"><IMG src="images/dwflogo.jpg" border="0"></a></p>
      </form>
   </body>
</HTML>
