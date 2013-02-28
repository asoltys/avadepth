<%@ Page Language="vb" AutoEventWireup="false" Codebehind="WebForm2.aspx.vb" Inherits="prctsquery.WebForm2"%>
<%@ Register TagPrefix="cc1" Namespace="WebUserInterface" Assembly="WebUserInterface" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
	<HEAD>
		<title>WebForm2</title>
		<meta content="Microsoft Visual Studio .NET 7.1" name="GENERATOR">
		<meta content="Visual Basic .NET 7.1" name="CODE_LANGUAGE">
		<meta content="JavaScript" name="vs_defaultClientScript">
		<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
	</HEAD>
	<body MS_POSITIONING="GridLayout">
		<form id="Form1" method="post" runat="server">
			<cc1:customtextcontrol id="CustomTextControl1" style="Z-INDEX: 101; LEFT: 248px; POSITION: absolute; TOP: 112px"
				runat="server" ValidationDataType="Date" DataType="True"></cc1:customtextcontrol><asp:button id="Button1" style="Z-INDEX: 102; LEFT: 112px; POSITION: absolute; TOP: 112px" runat="server"
				Text="Button"></asp:button><asp:textbox id="TextBox1" style="Z-INDEX: 103; LEFT: 248px; POSITION: absolute; TOP: 160px"
				runat="server"></asp:textbox>
			<asp:TextBox id="txtFormatMask" style="Z-INDEX: 104; LEFT: 256px; POSITION: absolute; TOP: 216px"
				runat="server"></asp:TextBox>
			<asp:Label id="Label1" style="Z-INDEX: 105; LEFT: 160px; POSITION: absolute; TOP: 208px" runat="server"
				Width="80px" Height="24px">Format Mask</asp:Label>
			<asp:Label id="lblError" style="Z-INDEX: 106; LEFT: 256px; POSITION: absolute; TOP: 288px"
				runat="server" Width="192px">Label</asp:Label></form>
	</body>
</HTML>
