<%@ Register TagPrefix="uc1" TagName="MainMenu" Src="MainMenu.ascx" %>
<%@ Page Language="vb" AutoEventWireup="false" Codebehind="underConstruction.aspx.vb" Inherits="prctsquery.underConstruction" %>
<%@ Register TagPrefix="cc1" Namespace="SecHeaderControlWindows" Assembly="SecHeaderControlWindows" %>
<%@ Register TagPrefix="uc1" TagName="NavBar" Src="NavBar.ascx" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
	<HEAD>
		<title>Home</title>
		<meta name="GENERATOR" content="Microsoft Visual Studio.NET 7.0">
		<meta name="CODE_LANGUAGE" content="Visual Basic 7.0">
		<meta name="vs_defaultClientScript" content="JavaScript">
		<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<LINK href="/MenuTest/Styles.css" type="text/css" rel="stylesheet">
		<style>
				A.menutext { FONT-WEIGHT: bold; FONT-SIZE: 12pt; MARGIN-LEFT: 5px; COLOR: navy; MARGIN-RIGHT: 5px; TEXT-DECORATION: none }
				A.menutext:hover { COLOR: blue; TEXT-DECORATION: none }
				A.menutext:visited { COLOR: navy; TEXT-DECORATION: none }
				A.menutext:hover { COLOR: skyblue; TEXT-DECORATION: none }
				A.navbartext { FONT-WEIGHT: bold; FONT-SIZE: 10pt; MARGIN-LEFT: 5px; COLOR: navy; MARGIN-RIGHT: 5px; TEXT-DECORATION: none }
				A.navbartext:hover { COLOR: black; TEXT-DECORATION: none }
				A.navbartext:visited { COLOR: navy; TEXT-DECORATION: none }
				A.navbartext:hover { COLOR: black; TEXT-DECORATION: none }
				BODY { FONT-WEIGHT: normal; FONT-SIZE: 10pt; MARGIN: 0px; WORD-SPACING: normal; TEXT-TRANSFORM: none; FONT-FAMILY: Tahoma, Arial, Helvetica, Sans-Serif; LETTER-SPACING: normal; BACKGROUND-COLOR: #aec1eb }
		</style>
	</HEAD>
	<body marginheight="0" marginwidth="0" bottommargin="0" leftmargin="0" topmargin="0" bgcolor="#4169e1">
		<form id="Form1" method="post" runat="server">
			<TABLE id="tblMain" cellSpacing="0" cellPadding="0" width="100%" border="0">
				<TR>
					<TD vAlign="top" align="center" width="125" bgColor="#ffffff"></TD>
					<TD vAlign="bottom" align="left" bgColor="#ffffff" height="35">
						<cc1:SecHeader id="SecHeader1" runat="server"></cc1:SecHeader></TD>
				</TR>
				<tr>
					<td valign="top" align="center" width="125" rowSpan="2" bgColor="#ffffff">&nbsp; <IMG height="1" src="spacer.gif" width="90"><br>
						<uc1:NavBar id="NavBar1" runat="server"></uc1:NavBar>
					</td>
					<td vAlign="bottom" align="left" height="35" bgColor="#ffffff">
						<uc1:MainMenu id="MainMenu1" runat="server"></uc1:MainMenu></td>
				</tr>
				<tr>
					<td vAlign="top" bgColor="#ffffff" height="480">
						<!-- Main Sceen here -->
						<table cellSpacing="0" cellPadding="20" width="95%" align="center" border="0">
							<tr>
								<td>
									<H3 align="center">&nbsp;</H3>
									<TABLE id="Table1" borderColor="navy" cellSpacing="0" cellPadding="5" width="100%" align="center"
										border="1">
										<TR>
											<TD bgColor="#6699cc" colspan="2">
												<P class="tablehead" align="center">WELCOME TO&nbsp;THE&nbsp;<STRONG><EM><FONT size="5">PRCTS 
																QUERY</FONT></EM></STRONG> WEB SITE</P>
											</TD>
										</TR>
										<TR>
											<TD colspan="2">
												<P align="center">
													This page is Under Construction. Try again soon.<BR>
												</P>
												<!--<p align="center"><asp:Label id="lblCourts" runat="server" ForeColor="Maroon" Font-Bold="True" BackColor="Yellow" Visible="False"></asp:Label></p>-->
											</TD>
										</TR>
									</TABLE>
									<BR>
								</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td style="WIDTH: 81px" bgColor="#ffffff">&nbsp;</td>
					<td align="center" bgColor="#ffffff">DFO 2002</td>
				</tr>
			</TABLE>
		</form>
	</body>
</HTML>
