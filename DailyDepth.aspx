<%@ Page Language="vb" AutoEventWireup="false" Codebehind="DailyDepth.aspx.vb" Inherits="AvadepthNet.AvadepthNet.web.WebForm1"%>
<%@ Register TagPrefix="uc1" TagName="MenuHeader" Src="MenuHeader.ascx" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
   <HEAD>
      <title>Test Avadepth Page</title>
      <meta content="Microsoft Visual Studio .NET 7.1" name="GENERATOR">
      <meta content="Visual Basic .NET 7.1" name="CODE_LANGUAGE">
      <meta content="JavaScript" name="vs_defaultClientScript">
      <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
      <LINK href="styles.css" type="text/css" rel="stylesheet">
      <script language="javascript" src="script.js"></script>

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
         <TABLE id="TableEntry" cellSpacing="1" cellPadding="1" width="208" border="0">
            <TR>
               <TD colSpan="2"><uc1:menuheader id="MenuHeader1" runat="server" EnableViewState="False" HelpFile="hdaily.html" BannerImage="images/bnrDailyDepths.gif"></uc1:menuheader></TD>
            </TR>
            <TR>
               <td colSpan="2">
                  <DIV class="header-gray" style="DISPLAY: inline; WIDTH: 48px" ms_positioning="FlowLayout">Date:</DIV>
               </td>
            </TR>
            <TR>
               <TD>&nbsp;</TD>
               <TD></A><asp:textbox id="lblDate" runat="server" BorderStyle="Solid" AutoPostBack="True" Columns="12"
                     Width="100px" BorderWidth="1px" CssClass="standard-text" BorderColor="SteelBlue"></asp:textbox><A href="javascript:OpenCalendar('lblDate', true)"><IMG src="images/icon-calendar.gif" align="absMiddle" border="0">calendar</A>
               </TD>
            </TR>
            <TR>
               <TD colSpan="2">
                  <DIV class="header-gray" style="DISPLAY: inline; WIDTH: 168px; HEIGHT: 8px" ms_positioning="FlowLayout">River 
                     Discharge @ Hope:</DIV>
               </TD>
            </TR>
            <TR>
               <TD></TD>
               <TD><asp:radiobutton id="radioPredicted" runat="server" Width="128px" CssClass="standard-text" GroupName="radioDischargeGroup"
                     Text="Predicted"></asp:radiobutton></TD>
            </TR>
            <TR>
               <TD style="HEIGHT: 5px"></TD>
               <TD style="HEIGHT: 5px"><asp:radiobutton id="radioActual" runat="server" Width="128px" CssClass="standard-text" GroupName="radioDischargeGroup"
                     Text="Actual" Height="8px" Checked="True"></asp:radiobutton></TD>
            </TR>
            <TR>
               <TD></TD>
               <TD><asp:radiobutton id="radioUserDefined" runat="server" Width="95px" CssClass="standard-text" GroupName="radioDischargeGroup"
                     Text="User-defined"></asp:radiobutton><asp:textbox id="txtUserDefined" runat="server" Width="72px" CssClass="standard-text" MaxLength="5"></asp:textbox>&nbsp;m<sup>3</sup>/s</TD>
            <TR>
               <TD style="HEIGHT: 16px"></TD>
               <TD style="HEIGHT: 16px"><asp:radiobutton id="radioSelected" runat="server" Width="95px" CssClass="standard-text" GroupName="radioDischargeGroup"
                     Text="Selected"></asp:radiobutton><asp:dropdownlist id="ddFlowList" runat="server" Width="72px" CssClass="standard-text" Height="24px"></asp:dropdownlist>&nbsp;m<sup>3</sup>/s</TD>
            </TR>
            <TR>
               <TD colSpan="3">
                  <DIV class="header-gray" style="DISPLAY: inline; WIDTH: 120px; HEIGHT: 2px" ms_positioning="FlowLayout">
                     <P>Chainage:</P>
                  </DIV>
               </TD>
            </TR>
            <TR>
               <TD style="HEIGHT: 12px"></TD>
               <TD style="HEIGHT: 12px">&nbsp;
                  <DIV class="standard-text" style="DISPLAY: inline; WIDTH: 32px" ms_positioning="FlowLayout">
                     <P>1 to
                     </P>
                  </DIV>
                  <asp:dropdownlist id="ddChainage" runat="server" Width="40px" CssClass="standard-text">
                     <asp:ListItem Value="6">6</asp:ListItem>
                     <asp:ListItem Value="7">7</asp:ListItem>
                     <asp:ListItem Value="8">8</asp:ListItem>
                     <asp:ListItem Value="9">9</asp:ListItem>
                     <asp:ListItem Value="10">10</asp:ListItem>
                     <asp:ListItem Value="11">11</asp:ListItem>
                     <asp:ListItem Value="12">12</asp:ListItem>
                     <asp:ListItem Value="13">13</asp:ListItem>
                     <asp:ListItem Value="14">14</asp:ListItem>
                     <asp:ListItem Value="15">15</asp:ListItem>
                     <asp:ListItem Value="16">16</asp:ListItem>
                     <asp:ListItem Value="17">17</asp:ListItem>
                     <asp:ListItem Value="18">18</asp:ListItem>
                     <asp:ListItem Value="19">19</asp:ListItem>
                     <asp:ListItem Value="20">20</asp:ListItem>
                     <asp:ListItem Value="21">21</asp:ListItem>
                     <asp:ListItem Value="22">22</asp:ListItem>
                     <asp:ListItem Value="23">23</asp:ListItem>
                     <asp:ListItem Value="24">24</asp:ListItem>
                     <asp:ListItem Value="25">25</asp:ListItem>
                     <asp:ListItem Value="26">26</asp:ListItem>
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
               <TD colSpan="3">
                  <DIV class="header-gray" style="DISPLAY: inline" ms_positioning="FlowLayout">
                     <P>Channel Condition:</P>
                  </DIV>
               </TD>
            </TR>
            <TR>
               <TD></TD>
               <TD><asp:radiobutton id="radioCurrent" runat="server" CssClass="standard-text" GroupName="radioSoundingsGroup"
                     Text="Current Soundings" Checked="True"></asp:radiobutton>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <BR>
                  <asp:radiobutton id="radioAssured" runat="server" CssClass="standard-text" GroupName="radioSoundingsGroup"
                     Text="Design Grade"></asp:radiobutton></TD>
            </TR>
            <TR>
               <TD style="HEIGHT: 16px" colSpan="2">
                  <DIV class="header-gray" style="DISPLAY: inline" ms_positioning="FlowLayout">
                     <DIV class="header-gray" style="DISPLAY: inline; WIDTH: 120px" ms_positioning="FlowLayout">
                        <P>Navigation&nbsp;Channel:</P>
                     </DIV>
                  </DIV>
               </TD>
            </TR>
            <TR>
               <TD style="HEIGHT: 1px"></TD>
               <TD style="HEIGHT: 1px">
                  <asp:radiobutton id="Radio1Lane" runat="server" CssClass="standard-text" Text="Inner Limit" GroupName="radioLaneGroup"
                     Checked="True"></asp:radiobutton>&nbsp;&nbsp;
                  <asp:radiobutton id="radio2Lane" runat="server" CssClass="standard-text" Text="Outer Limit" GroupName="radioLaneGroup"></asp:radiobutton><br>
                  &nbsp;&nbsp;Available&nbsp;Width&nbsp;&nbsp;
                  <asp:dropdownlist id="ddWidth" runat="server" CssClass="standard-text" Width="56px" Height="88px">
                     <asp:ListItem Value="100" Selected="True">100</asp:ListItem>
                     <asp:ListItem Value="95">95</asp:ListItem>
                     <asp:ListItem Value="90">90</asp:ListItem>
                     <asp:ListItem Value="85">85</asp:ListItem>
                     <asp:ListItem Value="80">80</asp:ListItem>
                     <asp:ListItem Value="75">75</asp:ListItem>
                     <asp:ListItem Value="70">70</asp:ListItem>
                     <asp:ListItem Value="65">65</asp:ListItem>
                     <asp:ListItem Value="60">60</asp:ListItem>
                  </asp:dropdownlist>
                  <DIV class="standard-text" style="DISPLAY: inline; WIDTH: 24px; HEIGHT: 13px" ms_positioning="FlowLayout">
                     <P>%</P>
                  </DIV>
               </TD>
            </TR>
            <TR>
            </TR>
            <TR>
            </TR>
            <TR>
               <TD align="center" colSpan="3">
                  <asp:ImageButton id="imgBtnDepth" runat="server" ImageUrl="images/displaybutton.gif"></asp:ImageButton><BR>
                  <BR>
                  <asp:Label id="lblNoflow" runat="server" CssClass="standard-text" Height="16px" Visible="False"
                     ForeColor="Red">No flow data available.</asp:Label>
                  <BR>
                  <asp:Label id="lblInvalidDate" runat="server" CssClass="standard-text" ForeColor="Red" Visible="False">* Invalid Date</asp:Label>
                  <asp:CompareValidator id="CompareValidator1" runat="server" CssClass="standard-text" ErrorMessage="CompareValidator"
                     ControlToValidate="txtUserDefined" Type="Integer" Operator="LessThan" ValueToCompare="30000">*Invalid Discharge Rate</asp:CompareValidator></TD>
            </TR>
         </TABLE>
      </form>
   </body>
</HTML>
