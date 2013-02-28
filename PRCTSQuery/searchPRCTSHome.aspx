<%@ Register TagPrefix="uc1" TagName="search_list" Src="search_list.ascx" %>
<%@ Page Language="vb" AutoEventWireup="false" Codebehind="searchPRCTSHome.aspx.vb" Inherits="prctsquery.searchPRCTSHome" %>
<%@ Register TagPrefix="uc1" TagName="NavBar" Src="NavBar.ascx" %>
<%@ Register TagPrefix="cc1" Namespace="WebUserInterface.CustomDataGrids" Assembly="WebUserInterface" %>
<%@ Register TagPrefix="cc3" Namespace="SecHeaderControlWindows" Assembly="SecHeaderControlWindows" %>
<%@ Register TagPrefix="cc2" Namespace="WebUserInterface" Assembly="WebUserInterface" %>
<%@ Register TagPrefix="uc1" TagName="Footer" Src="Footer.ascx" %>
<%@ Register TagPrefix="uc1" TagName="MainMenu" Src="MainMenu.ascx" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
	<HEAD>
		<title>Home</title>
		<meta content="Microsoft Visual Studio.NET 7.0" name="GENERATOR">
		<meta content="Visual Basic 7.0" name="CODE_LANGUAGE">
		<meta content="JavaScript" name="vs_defaultClientScript">
		<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="/MenuTest/Styles.css" type="text/css" rel="stylesheet">
		<style>A.menutext { FONT-WEIGHT: bold; FONT-SIZE: 12pt; MARGIN-LEFT: 5px; COLOR: navy; MARGIN-RIGHT: 5px; TEXT-DECORATION: none }
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
	<body bottomMargin="0" bgColor="white" leftMargin="0" topMargin="0" marginheight="0" marginwidth="0">
		<form id="Form1" method="post" runat="server">
			<TABLE id="tblMain" cellSpacing="0" cellPadding="0" width="100%" bgColor="#ffffff" border="0">
				<TR>
					<TD style="WIDTH: 101px" vAlign="top" align="center" width="101"></TD>
					<TD vAlign="bottom" borderColor="#ffffff" align="left" height="35"><cc3:secheader id="SecHeader1" runat="server" Height="72px"></cc3:secheader></TD>
				</TR>
				<tr>
					<td style="WIDTH: 101px" vAlign="top" align="center" width="101" bgColor="#ffffff" rowSpan="2">&nbsp;
						<IMG height="1" src="spacer.gif" width="90"><br>
						<uc1:navbar id="NavBar1" runat="server"></uc1:navbar></td>
					<td style="HEIGHT: 68px" vAlign="bottom" borderColor="#ffffff" align="left" height="68"><uc1:mainmenu id="MainMenu1" runat="server"></uc1:mainmenu></td>
				</tr>
				<tr>
					<td vAlign="top" bgColor="#ffffff" height="480">
						<!-- Main Sceen here -->
						<table cellSpacing="0" cellPadding="20" width="95%" align="center" border="0">
							<tr>
								<td bgColor="#ffffff">
									<H3 align="center">&nbsp;</H3>
									<TABLE id="Table1" borderColor="navy" cellSpacing="0" cellPadding="5" width="100%" align="center"
										border="1">
										<TR>
											<TD style="HEIGHT: 40px" bgColor="#6699cc" colSpan="2">
												<P class="tablehead" align="center">&nbsp;The&nbsp; <STRONG><EM><FONT size="5">PRCTS Search</FONT></EM></STRONG>&nbsp;&nbsp; 
													page</P>
											</TD>
										</TR>
										<TR>
											<TD colSpan="2">
												<P align="center">
													<TABLE id="Table2" style="WIDTH: 756px; HEIGHT: 328px" cellSpacing="1" cellPadding="1"
														width="756" border="1">
														<TR>
															<TD style="WIDTH: 418px; HEIGHT: 458px">
																<P><asp:label id="Label1" runat="server" Font-Size="Medium" Font-Bold="True">Enter Search Criteria</asp:label>:
																</P>
																<P>
																	<asp:Label id="Label3" runat="server" Width="312px" Font-Italic="True" Font-Size="X-Small">Green text boxes support wildcard searches (*)</asp:Label></P>
																<TABLE id="Table3" cellSpacing="1" cellPadding="1" width="300" border="1">
																	<TR>
																		<TD style="WIDTH: 206px; HEIGHT: 30px"><STRONG>Ref#</STRONG></TD>
																		<TD style="WIDTH: 199px; HEIGHT: 30px">
																			<P><STRONG>Doc Date&nbsp;on or After</STRONG><EM>(YYYY/MM/DD)</EM></P>
																		</TD>
																		<TD style="WIDTH: 208px; HEIGHT: 30px">
																			<P><STRONG>Doc Date&nbsp;on or Before</STRONG><EM>(YYYY/MM/DD)</EM></P>
																		</TD>
																		<TD style="WIDTH: 178px; HEIGHT: 30px"><STRONG>Type</STRONG></TD>
																		<TD style="HEIGHT: 30px"><STRONG>Application</STRONG></TD>
																	</TR>
																	<TR>
																		<TD style="WIDTH: 206px; HEIGHT: 37px"><cc2:customtextcontrol id="txtDocNumber" runat="server" Height="20px" Label="IP" Width="1px"></cc2:customtextcontrol></TD>
																		<TD style="WIDTH: 199px; HEIGHT: 37px">
																			<P align="center"><cc2:customtextcontrol id="ctxtDateFrom" runat="server" Width="138px" DataType="True" ValidationDataType="Date"></cc2:customtextcontrol></P>
																		</TD>
																		<TD style="WIDTH: 208px; HEIGHT: 37px">
																			<P align="center"><cc2:customtextcontrol id="ctxtDateTo" runat="server" Width="204px" DataType="True" ValidationDataType="Date"></cc2:customtextcontrol></P>
																		</TD>
																		<TD style="WIDTH: 178px; HEIGHT: 37px">
																			<P align="center"><asp:dropdownlist id="ddlDocumentType" runat="server" Width="113px"></asp:dropdownlist></P>
																		</TD>
																		<TD style="HEIGHT: 37px"><asp:dropdownlist id="ddlApplication" runat="server" Width="105px"></asp:dropdownlist></TD>
																	</TR>
																	<TR>
																		<TD style="WIDTH: 206px; HEIGHT: 37px"><STRONG>To Person</STRONG></TD>
																		<TD style="WIDTH: 199px; HEIGHT: 37px"><STRONG>To Organization</STRONG></TD>
																		<TD style="WIDTH: 208px; HEIGHT: 37px"><STRONG>From Person</STRONG></TD>
																		<TD style="WIDTH: 178px; HEIGHT: 37px"><STRONG>From Organization</STRONG></TD>
																		<TD style="HEIGHT: 37px"><STRONG>MCU#</STRONG></TD>
																	</TR>
																	<TR>
																		<TD style="WIDTH: 206px; HEIGHT: 17px"><asp:textbox id="txtDocTo" runat="server" BackColor="#C0FFC0"></asp:textbox></TD>
																		<TD style="WIDTH: 199px; HEIGHT: 17px"><asp:textbox id="txtDocToOrg" runat="server" Width="191px" BackColor="#C0FFC0"></asp:textbox></TD>
																		<TD style="WIDTH: 208px; HEIGHT: 17px"><asp:textbox id="txtDocFrom" runat="server" BackColor="#C0FFC0"></asp:textbox></TD>
																		<TD style="WIDTH: 178px; HEIGHT: 17px"><asp:textbox id="txtDocFromOrg" runat="server" BackColor="#C0FFC0"></asp:textbox></TD>
																		<TD style="HEIGHT: 17px"><asp:textbox id="txtMCUNumber" runat="server" Width="119px" BackColor="#C0FFC0"></asp:textbox></TD>
																	</TR>
																	<TR>
																		<TD style="WIDTH: 206px; HEIGHT: 37px"><STRONG>Subject</STRONG></TD>
																		<TD style="WIDTH: 199px; HEIGHT: 37px"><STRONG>RDG</STRONG></TD>
																		<TD style="WIDTH: 208px; HEIGHT: 37px"><STRONG>Branch</STRONG></TD>
																		<TD style="WIDTH: 178px; HEIGHT: 37px"><STRONG>Owner</STRONG></TD>
																		<TD style="HEIGHT: 37px"><STRONG>Author</STRONG></TD>
																	</TR>
																	<TR>
																		<TD style="WIDTH: 206px; HEIGHT: 14px"><asp:textbox id="txtDocName" runat="server" Width="208px" BackColor="#C0FFC0"></asp:textbox></TD>
																		<TD style="WIDTH: 199px; HEIGHT: 14px"><asp:textbox id="txtRdgFile" runat="server" BackColor="#C0FFC0"></asp:textbox></TD>
																		<TD style="WIDTH: 208px; HEIGHT: 14px"><asp:textbox id="txtBranchFile" runat="server" BackColor="#C0FFC0"></asp:textbox></TD>
																		<TD style="WIDTH: 178px; HEIGHT: 14px"><asp:dropdownlist id="ddlAuthor" runat="server" Width="160px"></asp:dropdownlist></TD>
																		<TD style="HEIGHT: 14px"><asp:textbox id="txtDocAuthor" runat="server" BackColor="#C0FFC0"></asp:textbox></TD>
																	</TR>
																	<TR>
																		<TD style="WIDTH: 206px; HEIGHT: 27px"><STRONG>Contact</STRONG></TD>
																		<TD style="WIDTH: 199px; HEIGHT: 27px"><STRONG>Old PRCTS#</STRONG></TD>
																		<TD style="WIDTH: 208px; HEIGHT: 27px"><STRONG>Actions: Sent To</STRONG></TD>
																		<TD style="WIDTH: 178px; HEIGHT: 27px"><STRONG>Actions: Office</STRONG></TD>
																		<TD style="HEIGHT: 27px"><STRONG>Comments</STRONG></TD>
																	</TR>
																	<TR>
																		<TD style="WIDTH: 206px; HEIGHT: 27px"><asp:textbox id="txtDocContact" runat="server" BackColor="#C0FFC0"></asp:textbox></TD>
																		<TD style="WIDTH: 199px; HEIGHT: 27px"><asp:textbox id="txtXref_Docs" runat="server"></asp:textbox></TD>
																		<TD style="WIDTH: 208px; HEIGHT: 27px"><asp:textbox id="txtActTo" runat="server" BackColor="#C0FFC0"></asp:textbox></TD>
																		<TD style="WIDTH: 178px; HEIGHT: 27px"><asp:dropdownlist id="ddlActOfficeId" runat="server" Width="159px"></asp:dropdownlist></TD>
																		<TD style="HEIGHT: 27px"><asp:textbox id="txtAbstract" runat="server" Width="177px" BackColor="#C0FFC0"></asp:textbox></TD>
																	</TR>
																</TABLE>
																<TABLE id="Table5" style="WIDTH: 981px; HEIGHT: 27px" cellSpacing="1" cellPadding="1" width="981"
																	border="1">
																	<TR>
																		<TD></TD>
																	</TR>
																</TABLE>
																<TABLE id="Table4" cellSpacing="1" cellPadding="1" width="300" border="2" borderColor="#000000">
																	<TR>
																		<TD><INPUT id="btnGo" style="WIDTH: 83px; HEIGHT: 24px" type="button" value="Find Now" runat="server"></TD>
																		<TD>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</TD>
																		<TD><asp:button id="btnReset" runat="server" Width="77px" Text="Clear"></asp:button></TD>
																	</TR>
																</TABLE>
																<asp:Label id="lblSQL" runat="server" Width="974px"></asp:Label>
															</TD>
														</TR>
														<TR>
															<TD style="WIDTH: 418px; HEIGHT: 26px"><STRONG><asp:label id="Label2" runat="server" Font-Size="Medium">PRCTS Documents Found:</asp:label></STRONG></TD>
														</TR>
														<TR>
															<TD style="WIDTH: 418px; HEIGHT: 273px">
																<H3 align="center"><cc1:customdatagrid id="objDataGrid1" runat="server" Font-Size="X-Small" Width="760px" DataKeyField="DOCNUMBER"
																		CellPadding="3" BorderColor="#E7E7FF" AutoGenerateColumns="False" AllowSorting="True" Font-Names="Verdana" ShowFooter="True"
																		AllowPaging="True" GridLines="None" ForeColor="Black" PageSize="5" BorderWidth="1px" BorderStyle="Solid" SortDirection="ASC">
																		<PagerStyle NextPageText="&lt;span style='font-family:webdings;font-size:medium;'&gt;4&lt;/span&gt;"
																			PrevPageText="&lt;span style='font-family:webdings;font-size:medium;'&gt;3&lt;/span&gt;"
																			HorizontalAlign="Right" ForeColor="#4A3C8C" BackColor="#E7E7FF"></PagerStyle>
																		<AlternatingItemStyle BackColor="#F7F7F7"></AlternatingItemStyle>
																		<FooterStyle ForeColor="#4A3C8C" BackColor="#B5C7DE"></FooterStyle>
																		<SelectedItemStyle ForeColor="#F7F7F7" BackColor="#738A9C"></SelectedItemStyle>
																		<ItemStyle ForeColor="#4A3C8C" BackColor="#E7E7FF"></ItemStyle>
																		<HeaderStyle Font-Names="Veranda" Font-Bold="True" HorizontalAlign="Center" ForeColor="#F7F7F7"
																			BackColor="#4A3C8C"></HeaderStyle>
																		<Columns>
																			<asp:HyperLinkColumn DataNavigateUrlField="docnumber" DataNavigateUrlFormatString="prctsDetail.aspx?docnumber={0}"
																				DataTextField="DocNumber" HeaderText="Ref#" NavigateUrl="docnumber"></asp:HyperLinkColumn>
																			<asp:BoundColumn DataField="DocName" HeaderText="Subject"></asp:BoundColumn>
																			<asp:BoundColumn DataField="DocAuthor" HeaderText="Author"></asp:BoundColumn>
																			<asp:BoundColumn DataField="Author" HeaderText="Owner"></asp:BoundColumn>
																			<asp:BoundColumn DataField="Application" HeaderText="Application"></asp:BoundColumn>
																			<asp:BoundColumn DataField="DocumentType" HeaderText="Doc Type"></asp:BoundColumn>
																			<asp:BoundColumn DataField="Document_Date" ReadOnly="True" HeaderText="Doc Date"></asp:BoundColumn>
																		</Columns>
																	</cc1:customdatagrid></H3>
															</TD>
														</TR>
														<TR>
															<TD style="WIDTH: 418px">
																<H3 align="center">&nbsp;</H3>
															</TD>
														</TR>
													</TABLE>
												</P>
												<!--<p align="center"><asp:Label id="lblCourts" runat="server" ForeColor="Maroon" Font-Bold="True" BackColor="Yellow" Visible="False"></asp:Label></p>--></TD>
										</TR>
									</TABLE>
									<BR>
								</td>
							</tr>
						</table>
					</td>
				</tr>
				<tr>
					<td style="WIDTH: 101px">&nbsp;</td>
					<td align="center"><uc1:footer id="Footer1" runat="server"></uc1:footer></td>
				</tr>
			</TABLE>
		</form>
	</body>
</HTML>
