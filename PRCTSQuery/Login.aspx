<%@ Page Language="vb" AutoEventWireup="false" Codebehind="Login.aspx.vb" Inherits="prctsquery.Login" %>
<%@ Register TagPrefix="sl" Namespace="StateList" Assembly="StateList" %>
<%@ OutputCache Location="None" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
	<HEAD>
		<title></title>
		<meta content="Microsoft Visual Studio .NET 7.1" name="GENERATOR">
		<meta content="Visual Basic .NET 7.1" name="CODE_LANGUAGE">
		<meta content="JavaScript" name="vs_defaultClientScript">
		<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
	</HEAD>
	<body text="#000e00" MS_POSITIONING="GridLayout">
		<form id="Form1" method="post" runat="server">
			<asp:label id="lblErrorMsg" style="Z-INDEX: 101; LEFT: 224px; POSITION: absolute; TOP: 256px"
				runat="server" ForeColor="Blue" Font-Size="Medium" Height="40px" Width="592px"></asp:label><asp:label id="lblTitle" style="Z-INDEX: 103; LEFT: 208px; POSITION: absolute; TOP: 120px"
				runat="server" Font-Size="X-Large" Height="32px" Width="584px"></asp:label><asp:button id="btnGoToApp" style="Z-INDEX: 104; LEFT: 224px; POSITION: absolute; TOP: 392px"
				runat="server" Height="32px" Width="184px" Text="3. Proceed to Application" Font-Size="X-Small" Font-Bold="True"></asp:button><asp:dropdownlist id="ddlUserCurrentRole" style="Z-INDEX: 105; LEFT: 224px; POSITION: absolute; TOP: 344px"
				runat="server" Height="40px" Width="280px"></asp:dropdownlist><asp:label id="Label3" style="Z-INDEX: 106; LEFT: 224px; POSITION: absolute; TOP: 312px" runat="server"
				ForeColor="Black" Font-Size="Medium" Height="24px" Width="248px">2. Select Role for this Session</asp:label><asp:button id="btnLogin" style="Z-INDEX: 107; LEFT: 224px; POSITION: absolute; TOP: 200px"
				runat="server" Height="32px" Width="120px" Text="1. Connect" Font-Bold="True"></asp:button></form>
	</body>
</HTML>
