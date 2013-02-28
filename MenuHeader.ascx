<%@ Control Language="vb" AutoEventWireup="false" Codebehind="MenuHeader.ascx.vb" Inherits="AvadepthNet.MenuHeader" TargetSchema="http://schemas.microsoft.com/intellisense/ie5" %>
<P>
	<MAP NAME="FrontPageMap0">
		<AREA SHAPE="RECT" COORDS="0,0,86,22" HREF="menu.htm">
		<AREA SHAPE="RECT" COORDS="136,0,196,22" HREF="logout.aspx" TARGET="_parent">
		<AREA SHAPE="RECT" COORDS="88,0,134,22" HREF="<% %>">
	</MAP>
	<asp:Image id="imageBanner" runat="server"></asp:Image><br>
	<a href="menu.htm"><IMG src="images/sidenavbar1.gif" border="0" height="28" width="85"></a>
	<asp:hyperlink id="HelpLink" runat="server" ImageUrl="images/sidenavbar2.gif"></asp:hyperlink><a href="logout.aspx" TARGET="_parent"><IMG src="images/sidenavbar3.gif" border="0"></a>
</P>
