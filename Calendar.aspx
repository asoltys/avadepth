<%@ Page language="vb" Codebehind="Calendar.aspx.vb" AutoEventWireup="false" Inherits="AvadepthNet.AvadepthNet.web.Calendar" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN" >
<HTML>
   <HEAD>
      <title>Calendar</title>
      <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
      <link href="styles.css" type="text/css" rel="stylesheet">
      <script language="javascript">
         function CloseWindow()
         {
            self.close();
         }
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
   <body bgColor="#ffffff" leftMargin="5" topMargin="5">
      <form id="Calendar" method="post" runat="server">
         <table cellSpacing="0" cellPadding="0" width="100%" border="0">
            <tr bgColor="white">
               <td colspan="2"><img src="images/spacer.gif" height="10" width="1"></td>
            </tr>
            <tr bgColor="white">
               <td align="center" colSpan="2">
                  <asp:dropdownlist id="MonthSelect" runat="server" CssClass="standard-text" Height="22px" Width="90px"
                     AutoPostBack="True"></asp:dropdownlist>&nbsp;
                  <asp:dropdownlist id="YearSelect" runat="server" CssClass="standard-text" Height="22px" Width="60px"
                     AutoPostBack="True"></asp:dropdownlist>
                  <asp:calendar id="Cal" runat="server" BorderWidth="5px" ShowTitle="False" ShowNextPrevMonth="False"
                     BorderStyle="Solid" Font-Size="XX-Small" Font-Names="Arial" BorderColor="White" DayNameFormat="FirstLetter"
                     ForeColor="#C0C0FF" FirstDayOfWeek="Sunday" CssClass="standard-text">
                     <TodayDayStyle Font-Bold="True" ForeColor="White" BackColor="#990000"></TodayDayStyle>
                     <DayStyle BorderWidth="2px" ForeColor="#666666" BorderStyle="Solid" BorderColor="White" BackColor="#EAEAEA"></DayStyle>
                     <DayHeaderStyle ForeColor="#649CBA"></DayHeaderStyle>
                     <SelectedDayStyle Font-Bold="True" ForeColor="#333333" BackColor="#FAAD50"></SelectedDayStyle>
                     <WeekendDayStyle ForeColor="White" BackColor="#BBBBBB"></WeekendDayStyle>
                     <OtherMonthDayStyle ForeColor="#666666" BackColor="White"></OtherMonthDayStyle>
                  </asp:calendar>
               </td>
            </tr>
            <tr>
               <td align="center" colSpan="2">
                  Date Selected:
                  <asp:label id="lblDate" runat="server"></asp:label>
                  <input id="datechosen" type="hidden" name="datechosen" runat="server">
               </td>
            </tr>
            <tr>
               <td colspan="2"><img src="images/spacer.gif" height="10" width="1"></td>
            </tr>
            <tr>
               <td align="center">
                  <asp:button id="OKButton" runat="server" Text="OK" Width="60px"></asp:button>
               </td>
               <td align="center">
                  <a href="javascript:CloseWindow()">
                     <asp:button id="CancelButton" runat="server" Text="Cancel" Width="60px"></asp:button>
                  </a>
               </td>
            </tr>
         </table>
      </form>
   </body>
</HTML>
