<%@ Page Language="vb" AutoEventWireup="false" Codebehind="Weekly.aspx.vb" Inherits="AvadepthNet.Weekly"%>
<%@ Register TagPrefix="uc1" TagName="MenuHeader" Src="MenuHeader.ascx" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
   <HEAD>
      <title>Weekly</title>
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
         <TABLE id="Table1" style="Z-INDEX: 103" cellSpacing="1" cellPadding="1" width="208" border="0">
            <TR>
               <TD colSpan="2"><uc1:menuheader id="MenuHeader1" runat="server" HelpFile="hweekly.html" BannerImage="images/bnrWeekly.gif"></uc1:menuheader></TD>
            </TR>
            <TR>
               <td colSpan="2"></td>
            </TR>
            <TR>
               <TD style="HEIGHT: 5px" colSpan="2">
                  <DIV class="header-gray" style="DISPLAY: inline" ms_positioning="FlowLayout">Display 
                     Options:</DIV>
               </TD>
            </TR>
            <TR>
               <TD></TD>
               <TD><asp:radiobutton id="RadioReport" runat="server" CssClass="standard-text" AutoPostBack="True" Width="176px"
                     Text="Inner Lane Graph" GroupName="RadioWeekly" Checked="True"></asp:radiobutton></TD>
            </TR>
            <TR>
               <TD></TD>
               <TD><asp:radiobutton id="RadioProfile" runat="server" CssClass="standard-text" AutoPostBack="True" Width="176px"
                     Text="Outer Lane Graph" GroupName="RadioWeekly"></asp:radiobutton></TD>
            </TR>
            <TR>
               <TD style="HEIGHT: 21px"></TD>
               <TD style="HEIGHT: 21px"><asp:radiobutton id="radioFraser" runat="server" CssClass="standard-text" AutoPostBack="True" Width="176px"
                     Text="Control Points" GroupName="RadioWeekly"></asp:radiobutton></TD>
            </TR>
            <TR>
               <TD></TD>
               <TD><asp:radiobutton id="radioOverview" runat="server" CssClass="standard-text" AutoPostBack="True" Width="176px"
                     Text="Notes" GroupName="RadioWeekly"></asp:radiobutton></TD>
            </TR>
            <TR>
               <TD></TD>
               <TD>
                  <P>&nbsp;
                     <BR>
                  </P>
               </TD>
            </TR>
            <TR>
               <TD></TD>
               <TD class="standard-text">&nbsp;<A href="data/weekly/weekly.pdf" target="_new">View 
                     Weekly Report in PDF format</A> (Adobe Acrobat)
               </TD>
            </TR>
            <TR>
               <TD align="center" colSpan="2" style="HEIGHT: 25px"><BR>
               </TD>
            </TR>
            <TR>
               <TD align="left" colSpan="2">
                  <P></FONT><a href="http://usa.autodesk.com/adsk/servlet/index?siteID=123112&amp;id=2404513&amp;GP=ILC-dwfitcampaign"
                        target="_new"></a></P>
               </TD>
            </TR>
         </TABLE>
      </form>
   </body>
</HTML>
