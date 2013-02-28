<%@ Register TagPrefix="uc1" TagName="MenuHeader" Src="MenuHeader.ascx" %>
<%@ Page Language="vb" AutoEventWireup="false" Codebehind="Hydrograph.aspx.vb" Inherits="AvadepthNet.Hydrograph"%>
<%@ Register TagPrefix="cc2" Namespace="DtPicker.iX.Controls" Assembly="DtPicker" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
   <HEAD>
      <title>Hydrograph</title>
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
         <TABLE id="tableMenu">
            <TR>
               <TD colSpan="3"><uc1:menuheader id="MenuHeader1" runat="server" HelpFile="hhydro.html" BannerImage="images/bnrHydrograph.gif"></uc1:menuheader></TD>
            </TR>
            <TR>
               <td align="left" colSpan="3">
                  <DIV class="header-gray" style="DISPLAY: inline; WIDTH: 48px" ms_positioning="FlowLayout">Date:</DIV>
               </td>
            </TR>
            <TR>
               <TD align="left">&nbsp; &nbsp;</TD>
               <TD align="left">
                  <P>
                     <asp:DropDownList id="ddMonth" runat="server" Width="112px" CssClass="standard-text" Height="16px">
                        <asp:ListItem Value="1" Selected="True">January</asp:ListItem>
                        <asp:ListItem Value="2">February</asp:ListItem>
                        <asp:ListItem Value="3">March</asp:ListItem>
                        <asp:ListItem Value="4">April</asp:ListItem>
                        <asp:ListItem Value="5">May</asp:ListItem>
                        <asp:ListItem Value="6">June</asp:ListItem>
                        <asp:ListItem Value="7">July</asp:ListItem>
                        <asp:ListItem Value="8">August</asp:ListItem>
                        <asp:ListItem Value="9">September</asp:ListItem>
                        <asp:ListItem Value="10">October</asp:ListItem>
                        <asp:ListItem Value="11">November</asp:ListItem>
                        <asp:ListItem Value="12">December</asp:ListItem>
                     </asp:DropDownList>
                     <asp:DropDownList id="ddYear" runat="server" Width="64px" CssClass="standard-text" Height="48px"></asp:DropDownList></P>
               </TD>
            </TR>
            <TR>
               <TD align="left" colSpan="2">
                  <P></P>
                  <DIV class="header-gray" style="DISPLAY: inline; WIDTH: 48px" ms_positioning="FlowLayout">Period:</DIV>
               </TD>
            </TR>
            <TR>
               <TD align="left" style="HEIGHT: 15px"></TD>
               <TD align="left" style="HEIGHT: 15px"><asp:dropdownlist id="ddPeriod" runat="server" CssClass="standard-text" Width="144px" Height="24px">
                     <asp:ListItem Value="0" Selected="True">3 Months</asp:ListItem>
                     <asp:ListItem Value="1">6 Months</asp:ListItem>
                     <asp:ListItem Value="2">9 Months</asp:ListItem>
                     <asp:ListItem Value="3">12 Months</asp:ListItem>
                  </asp:dropdownlist></TD>
            </TR>
            <TR>
               <TD style="HEIGHT: 15px" align="left" colSpan="5">
                  <DIV class="header-gray" style="DISPLAY: inline; WIDTH: 40px" ms_positioning="FlowLayout">Plot:</DIV>
               </TD>
            </TR>
            <TR>
               <td style="HEIGHT: 56px"></td>
               <TD style="HEIGHT: 56px" align="left"><asp:checkboxlist id="checkHydro" runat="server" CssClass="standard-text" Width="152px" Height="40px"
                     CellSpacing="0" CellPadding="0">
                     <asp:ListItem Value="0" Selected="True">Actual</asp:ListItem>
                     <asp:ListItem Value="1" Selected="True">Predicted</asp:ListItem>
                  </asp:checkboxlist></TD>
            </TR>
            <TR>
               <TD align="center" colSpan="5"><BR>
                  <asp:imagebutton id="btnHydro" style="Z-INDEX: 103" runat="server" ImageUrl="images/displaybutton.gif"
                     AlternateText="Display"></asp:imagebutton><BR>
               </TD>
            </TR>
         </TABLE>
      </form>
   </body>
</HTML>
