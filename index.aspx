<%@ Page Language="vb" AutoEventWireup="false" Codebehind="index.aspx.vb" Inherits="AvadepthNet.AvadepthNet.web.index"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
   <HEAD>
      <title>CCG Avadepth Website</title>
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
         <table cellSpacing="0" cellPadding="0" width="750" border="0">
            <TBODY>
               <tr>
                  <td vAlign="top">
                     <table height="100%" width="100%" border="0">
                        <tr>
                           <td colSpan="2">
                              <table cellSpacing="4" cellPadding="0" width="100%" border="0">
                                 <tr>
                                    <td><IMG src="CGFIP-s.gif"></td>
                                    <td align="right"><IMG height="21" alt="WD" src="wd-patch.gif" width="94" align="absMiddle">
                                    </td>
                                 </tr>
                              </table>
                              <IMG alt="Available Water Depths Forecasting" src="images/newbanner.gif" align="absMiddle"><br>
                              <IMG src="images/newhr.gif">
                           </td>
                        </tr>
                        <TR>
                           <TD bgColor="#f3f3f3">
                              <p align="center"><font size="3"><IMG height="170" src="images/ccg-logotran.gif" width="130">
                                    <form name="Signin" action="xt_LookupRecord.asp" method="post">
                                       <center>
                                          <table border="0">
                                             <TBODY>
                                                <tr>
                                                   <td width="100%"><FONT face="ARIAL">User name</FONT><br>
                                                      <asp:textbox id="txtUserName" runat="server" Wrap="False" Width="100px"></asp:textbox></td>
                                                </tr>
                                                <tr>
                                                   <td width="100%"><FONT face="ARIAL">Password</FONT><br>
                                                      <asp:textbox id="txtPassword" runat="server" Wrap="False" Width="100px" TextMode="Password"></asp:textbox></td>
                                                </tr>
                                                <tr>
                                                   <td width="100%">
                                                      <P><asp:imagebutton id="btnLogin" runat="server" ImageUrl="images/btnLogin.gif"></asp:imagebutton><BR>
                                                         <asp:label class="NormalRed" id="Message" runat="server" CssClass="standard-text"></asp:label><br>
                                 </font><font size="1"><A href="passwordrecovery.htm">forgot your password?</A></font></p>
                           </TD>
                        </TR>
                     </table>
         </CENTER></form>
      <font size="3">
         <table width="100%" border="0">
            <TBODY>
               <tr>
                  <td vAlign="top"></td>
                  <td></td>
               </tr>
               <tr>
                  <td vAlign="top"><font size="3"><IMG alt="" src="Bullet_home.GIF" border="0"> </font>
                  </td>
                  <td>
                     <p align="left">To access Avadepth <A href="register.aspx">setup</A> a new account.</p>
                  </td>
               </tr>
               <tr>
                  <td vAlign="top"><font size="3"><a href="http://www.demographicsnow.com/AllocateOnline.dll?ShowPage=Static/whats_new.htm"><IMG alt="" src="Bullet_home.GIF" border="0"></a>
                     </font>
                  </td>
                  <td><A href="samples.htm">View Sample<br>
                        Reports</A>.</td>
               </tr>
               <tr>
                  <td vAlign="top"></td>
      </font>
      <td>&nbsp;</td>
      </TR></TBODY></TABLE></FONT></TD>
      <TD><font face="arial" size="2">Avadepth - forecasts of available water depths for vessels 
            navigating the Fraser River South Arm Channel.</font><BR>
         <CENTER><IMG alt="Fraser River" src="fraser-ov.gif" vspace="10" border="0"></CENTER>
         <p><font face="arial"><font size="2">Avadepth - is distributed weekly to river pilots, 
                  Port Metro Vancouver, and shipping companies to assist them in 
                  determining the maximum draft and the best sailing times.</font><small> </small>
            </font>
         </p>
         <p><font face="arial" size="2">The computerized reporting system predicts draft availability and the 
               corresponding "transit window" for deep sea ships to navigate the South Arm 
               Main Channel of the Fraser River between Sand Heads (kilometre 0) and Fraser 
               Surrey Docks (kilometre 34).</font><small> </small></FONT>
         </p>
      </TD>
      </TR>
      <tr>
         <td vAlign="top" colSpan="2"><IMG src="images/newhr.gif">
         </td>
      </tr>
      <tr>
         <td vAlign="top"><IMG src="CAN(1).gif" align="left">
         </td>
      </tr>
      </TBODY></TABLE></TD></TR></TBODY></TABLE></FORM>
   </body>
</HTML>
