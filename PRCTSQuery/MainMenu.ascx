<%@ Control Language="vb" AutoEventWireup="false" Codebehind="MainMenu.ascx.vb" Inherits="prctsquery.MainMenu" TargetSchema="http://schemas.microsoft.com/intellisense/ie5" %>
<asp:DataList id="MainMenuList" RepeatDirection="Horizontal" runat="server" BackColor="#FFFFFF"
	BorderColor="Transparent" ForeColor="White">
	<SelectedItemStyle ForeColor="Fuchsia" BackColor="Fuchsia"></SelectedItemStyle>
	<ItemStyle Font-Size="Smaller" ForeColor="#FF00FF" BackColor="#990099"></ItemStyle>
	<ItemTemplate>
		<asp:LinkButton id=idMenuLink BackColor="Transparent" ForeColor="White" Runat="Server" CommandArgument='<%# Container.dataitem("MenuTabURL") %>' Text='<%# Container.dataitem("MenuTabName")%>' ToolTip='<%# Container.dataitem("MenuTabTip")%>' cssclass="menutext">
		</asp:LinkButton>
	</ItemTemplate>
</asp:DataList>
