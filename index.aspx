<%@ Page Language="vb" AutoEventWireup="false" Codebehind="index.aspx.vb" Inherits="AvadepthNet.AvadepthNet.web.index"%>
<!--#include virtual="/header.inc" -->

<h1>Avadepth</h1>

<p>
Avadepth - forecasts of available water depths for vessels 
navigating the Fraser River South Arm Channel.
</p>
<img alt="Fraser River" src="fraser-ov.gif">
<p>
Avadepth - is distributed weekly to river pilots, 
Port Metro Vancouver, and shipping companies to assist them in 
determining the maximum draft and the best sailing times.The computerized reporting system predicts draft availability and the 
corresponding "transit window" for deep sea ships to navigate the South Arm 
Main Channel of the Fraser River between Sand Heads (kilometre 0) and Fraser 
Surrey Docks (kilometre 34).
</p>

<h3>Login</h3>

<form id="Form1" method="post" runat="server">
  <div>
    <label for="txtUserName">Username</label>
    <asp:textbox id="txtUserName" runat="server" Wrap="False" Width="100px"></asp:textbox>
  </div>
  <div>
    <label for="txtPassword">Password</label>
    <asp:textbox id="txtPassword" runat="server" Wrap="False" Width="100px" TextMode="Password"></asp:textbox>
  </div>
  <asp:button id="btnLogin" runat="server" text="Login"></asp:button>
  <asp:label class="NormalRed" id="Message" runat="server"></asp:label>
  <p><a href="Register.aspx">setup</a> a new account</p>
  <p><a href="passwordrecovery.htm">forgot your password?</a></p>
</form>

<!--#include virtual="/footer.inc" -->
