<%@ Control Language="vb" AutoEventWireup="false" Codebehind="NavBar.ascx.vb" Inherits="prctsquery.NavBar" TargetSchema="http://schemas.microsoft.com/intellisense/ie5" %>
<table id="idNavTable" cellpadding="0" cellspacing="0" border="0" width="100">
	<tr>
		<td bgcolor="#3366ff" align="center">
			<asp:LinkButton id="Menu" Font-Bold="True" text="Menu" CssClass="navbartext" ForeColor="White" runat="server"
				width="100%" BackColor="#000040">Menu</asp:LinkButton>
		</td>
	</tr>
	<tr>
		<td align="center" bgColor="#ffffff">
			<asp:DataList id="NavBarList" runat="server" width="100%" BorderColor="Purple">
				<SelectedItemStyle ForeColor="Fuchsia" BackColor="Fuchsia"></SelectedItemStyle>
				<ItemStyle HorizontalAlign="Center" BackColor="Purple"></ItemStyle>
				<ItemTemplate>
					<asp:LinkButton id=idNavLink BackColor="Purple" ForeColor="White" cssclass="navbartext" ToolTip='<%# Container.dataitem("NavBarTip")%>' Text='<%# Container.dataitem("NavBarName")%>' CommandArgument='<%# Container.dataitem("NavBarURL") %>' Runat="Server">
					</asp:LinkButton>
				</ItemTemplate>
			</asp:DataList>
		</td>
	</tr>
</table>
