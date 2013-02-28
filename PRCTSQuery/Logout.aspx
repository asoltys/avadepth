<%@ OutputCache Location="None" %>
<%@ Register TagPrefix="cc1" Namespace="SecHeaderControlWindows" Assembly="SecHeaderControlWindows" %>
<%@ Page Language="vb" AutoEventWireup="false" Codebehind="Logout.aspx.vb" Inherits="prctsquery.TestSecureComponent" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
	<HEAD>
		<title>TestSecureComponent</title>
		<meta content="Microsoft Visual Studio .NET 7.1" name="GENERATOR">
		<meta content="Visual Basic .NET 7.1" name="CODE_LANGUAGE">
		<meta content="JavaScript" name="vs_defaultClientScript">
		<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
	</HEAD>
	<body text="#0000e0" MS_POSITIONING="GridLayout">
		<form id="Form1" method="post" runat="server">
			<asp:button id="btnLogOut" style="Z-INDEX: 101; LEFT: 376px; POSITION: absolute; TOP: 264px"
				runat="server" Text="Quit" Width="128px" Height="32px"></asp:button><asp:label id="Label1" style="Z-INDEX: 104; LEFT: 352px; POSITION: absolute; TOP: 216px" runat="server"
				Width="200px" Height="24px" Font-Size="Large" Font-Bold="True">Quit Application</asp:label><cc1:secheader id="SecHeader1" style="Z-INDEX: 105; LEFT: 24px; POSITION: absolute; TOP: 16px"
				runat="server" Text="IT Inventory" ImagePath="\TestSecurItWindows\images\dfo.gif"></cc1:secheader></form>
	</body>
</HTML>
