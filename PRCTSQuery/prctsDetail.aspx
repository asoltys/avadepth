<%@ Register TagPrefix="uc1" TagName="MainMenu" Src="MainMenu.ascx" %>
<%@ Register TagPrefix="uc1" TagName="Footer" Src="Footer.ascx" %>
<%@ Page Language="vb" AutoEventWireup="false" Codebehind="prctsDetail.aspx.vb" Inherits="prctsquery.prctsDetail" %>
<%@ Register TagPrefix="cc1" Namespace="SecHeaderControlWindows" Assembly="SecHeaderControlWindows" %>
<%@ Register TagPrefix="uc1" TagName="NavBar" Src="NavBar.ascx" %>
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
	<body bottomMargin="0" bgColor="#4169e1" leftMargin="0" topMargin="0" marginheight="0"
		marginwidth="0">
		<form id="Form1" method="post" runat="server">
			<TABLE id="tblMain" cellSpacing="0" cellPadding="0" width="100%" border="0">
				<TR>
					<TD style="HEIGHT: 112px" vAlign="top" align="center" width="125" bgColor="#ffffff"></TD>
					<TD vAlign="bottom" align="left" bgColor="#ffffff" height="35"><cc1:secheader id="SecHeader1" runat="server" BackColor="#8080FF"></cc1:secheader></TD>
				</TR>
				<tr>
					<td vAlign="top" align="center" width="125" bgColor="#ffffff" rowSpan="2">&nbsp; <IMG height="1" src="spacer.gif" width="90"><br>
						<uc1:navbar id="NavBar1" runat="server"></uc1:navbar></td>
					<td vAlign="bottom" align="left" bgColor="#ffffff" height="35"><uc1:mainmenu id="MainMenu1" runat="server"></uc1:mainmenu></td>
				</tr>
				<tr>
					<td vAlign="top" bgColor="#ffffff" height="480">
						<!-- Main Sceen here -->
						<table cellSpacing="0" cellPadding="20" width="95%" align="center" border="0">
							<tr>
								<td style="HEIGHT: 127px" height="127">
									<H3 align="center">
										<TABLE id="Table1" style="WIDTH: 684px; HEIGHT: 59px" borderColor="navy" cellSpacing="0"
											cellPadding="5" width="684" align="left" border="1">
											<TR>
												<TD style="HEIGHT: 42px" align="left" bgColor="#6699cc" colSpan="2" rowSpan="1">
													<P class="tablehead" align="center"><STRONG><EM><FONT size="5">PRCTS&nbsp;Detail</FONT></EM></STRONG>&nbsp;</P>
												</TD>
											</TR>
											<TR>
												<TD colSpan="2">
													<P align="center">
														<TABLE id="Table2" cellSpacing="1" cellPadding="1" width="300" border="1">
															<TR>
																<TD style="WIDTH: 134px; HEIGHT: 40px"><asp:label id="Label1" runat="server" Width="89px" Font-Size="Medium" ForeColor="Black" BackColor="White">Ref#</asp:label></TD>
																<TD style="WIDTH: 241px; HEIGHT: 40px"><asp:textbox id="txtDocNumber" runat="server" BackColor="#C0FFFF"></asp:textbox></TD>
																<TD style="WIDTH: 202px; HEIGHT: 40px"><asp:label id="Label2" runat="server" Width="94px" Font-Size="Medium" ForeColor="Black" BackColor="White">Date Rcvd</asp:label></TD>
																<TD style="HEIGHT: 40px"><asp:textbox id="txtCreation_Date" runat="server" Width="152px" BackColor="#C0FFFF"></asp:textbox></TD>
																<TD style="HEIGHT: 40px"><asp:label id="Label4" runat="server" Width="80px" Font-Size="Medium" ForeColor="Black" BackColor="White">Doc Date</asp:label></TD>
																<TD style="HEIGHT: 40px"><asp:textbox id="txtDocument_Date" runat="server" Width="160px" BackColor="#C0FFFF"></asp:textbox></TD>
															</TR>
															<TR>
																<TD style="WIDTH: 134px; HEIGHT: 25px"><asp:label id="Label3" runat="server" Font-Size="Medium" ForeColor="Black" BackColor="White">Type</asp:label></TD>
																<TD style="WIDTH: 241px; HEIGHT: 25px"><asp:textbox id="txtDocumentType" runat="server" Width="160px" BackColor="#C0FFFF"></asp:textbox></TD>
																<TD style="WIDTH: 202px; HEIGHT: 25px"><asp:label id="Label5" runat="server" Font-Size="Medium" ForeColor="Black" BackColor="White">Application</asp:label></TD>
																<TD style="HEIGHT: 25px"><asp:textbox id="txtApplication" runat="server" BackColor="#C0FFFF"></asp:textbox></TD>
																<TD style="HEIGHT: 25px"><asp:label id="Label6" runat="server" Font-Size="Medium" ForeColor="Black" BackColor="White">File#</asp:label></TD>
																<TD style="HEIGHT: 25px"><asp:textbox id="txtFile_Number" runat="server" BackColor="#C0FFFF"></asp:textbox></TD>
															</TR>
															<TR>
																<TD style="WIDTH: 134px; HEIGHT: 29px"><asp:label id="Label8" runat="server" Font-Size="Medium" ForeColor="Black" BackColor="White">To Person</asp:label></TD>
																<TD style="WIDTH: 241px; HEIGHT: 29px"><asp:textbox id="txtDocTo" runat="server" BackColor="#C0FFFF"></asp:textbox></TD>
																<TD style="WIDTH: 202px; HEIGHT: 29px"><asp:label id="Label9" runat="server" Font-Size="Medium" ForeColor="Black" BackColor="White">To Org</asp:label></TD>
																<TD style="HEIGHT: 29px"><asp:textbox id="txtDocToOrg" runat="server" BackColor="#C0FFFF"></asp:textbox></TD>
																<TD style="HEIGHT: 29px"><asp:label id="Label7" runat="server" Font-Size="Medium" ForeColor="Black" BackColor="White">MCU#</asp:label></TD>
																<TD style="HEIGHT: 29px"><asp:textbox id="txtMcuNumber" runat="server" BackColor="#C0FFFF"></asp:textbox></TD>
															</TR>
															<TR>
																<TD style="WIDTH: 117px; HEIGHT: 22px"><asp:label id="Label10" runat="server" Width="108px" Font-Size="Medium" ForeColor="Black" BackColor="White">From Person</asp:label></TD>
																<TD style="WIDTH: 241px; HEIGHT: 22px"><asp:textbox id="txtDocFrom" runat="server" BackColor="#C0FFFF"></asp:textbox></TD>
																<TD style="WIDTH: 202px; HEIGHT: 22px"><asp:label id="Label11" runat="server" Font-Size="Medium" ForeColor="Black" BackColor="White">From Org</asp:label></TD>
																<TD style="HEIGHT: 22px"><asp:textbox id="txtDocFromOrg" runat="server" BackColor="#C0FFFF"></asp:textbox></TD>
																<TD style="HEIGHT: 22px"><asp:label id="Label12" runat="server" Font-Size="Medium" ForeColor="Black" BackColor="White">CC</asp:label></TD>
																<TD style="HEIGHT: 22px"><asp:textbox id="txtDocCc" runat="server" BackColor="#C0FFFF"></asp:textbox></TD>
															</TR>
														</TABLE>
													</P>
													<P align="center">
														<TABLE id="Table4" cellSpacing="1" cellPadding="1" width="300" border="1">
															<TR>
																<TD style="WIDTH: 58px"><asp:label id="Label22" runat="server" Font-Size="Medium">Subject</asp:label></TD>
																<TD><asp:textbox id="txtDocName" runat="server" Width="629px" Height="39px" TextMode="MultiLine"
																		BackColor="#C0FFFF"></asp:textbox></TD>
																<TD><asp:label id="Label34" runat="server" Width="48px" Font-Size="Medium">encl.</asp:label></TD>
																<TD><asp:checkbox id="chkAttachment" runat="server" Width="30px" BackColor="White"></asp:checkbox></TD>
															</TR>
														</TABLE>
													</P>
													<P align="center">
														<TABLE id="Table5" cellSpacing="1" cellPadding="1" width="300" border="1">
															<TR>
																<TD style="HEIGHT: 21px"><asp:label id="Label13" runat="server" Font-Size="Medium" BackColor="White">CR</asp:label></TD>
																<TD style="HEIGHT: 21px"><asp:textbox id="txtCrFile" runat="server" BackColor="#C0FFFF"></asp:textbox></TD>
																<TD style="HEIGHT: 21px"><asp:label id="Label14" runat="server" Font-Size="Medium">RDG</asp:label></TD>
																<TD style="HEIGHT: 21px"><asp:textbox id="txtRdgFile" runat="server" BackColor="#C0FFFF"></asp:textbox></TD>
																<TD style="WIDTH: 71px; HEIGHT: 21px"><asp:label id="Label15" runat="server" Font-Size="Medium">Branch</asp:label></TD>
																<TD style="HEIGHT: 21px"><asp:textbox id="txtBranchFile" runat="server" BackColor="#C0FFFF"></asp:textbox></TD>
															</TR>
															<TR>
																<TD style="HEIGHT: 22px"><asp:label id="Label16" runat="server" Font-Size="Medium">Owner</asp:label></TD>
																<TD style="HEIGHT: 22px"><asp:textbox id="txtAuthor" runat="server" BackColor="#C0FFFF"></asp:textbox></TD>
																<TD style="HEIGHT: 22px"><asp:label id="Label17" runat="server" Width="111px" Font-Size="Medium">Old PRCTS#</asp:label></TD>
																<TD style="HEIGHT: 22px"><asp:textbox id="txtXref_Docs" runat="server" BackColor="#C0FFFF"></asp:textbox></TD>
																<TD style="WIDTH: 71px; HEIGHT: 22px"><asp:label id="Label18" runat="server" Font-Size="Medium">Closed</asp:label></TD>
																<TD style="HEIGHT: 22px">
																	<asp:CheckBox id="chkDocClosed" runat="server" BackColor="White" Width="66px"></asp:CheckBox></TD>
															</TR>
															<TR>
																<TD style="HEIGHT: 24px"><asp:label id="Label19" runat="server" Font-Size="Medium">Author</asp:label></TD>
																<TD style="HEIGHT: 24px"><asp:textbox id="txtDocAuthor" runat="server" BackColor="#C0FFFF"></asp:textbox></TD>
																<TD style="HEIGHT: 24px"><asp:label id="Label20" runat="server" Font-Size="Medium">Contact</asp:label></TD>
																<TD style="HEIGHT: 24px"><asp:textbox id="txtDocContact" runat="server" BackColor="#C0FFFF"></asp:textbox></TD>
																<TD style="WIDTH: 71px; HEIGHT: 24px"><asp:label id="Label21" runat="server" Width="133px" Font-Size="Medium">Last Edited By</asp:label></TD>
																<TD style="HEIGHT: 24px"><asp:textbox id="txtLast_Edited_By" runat="server" Width="160px" BackColor="#C0FFFF"></asp:textbox></TD>
															</TR>
														</TABLE>
													</P>
													<P align="center"><asp:label id="Label26" runat="server" Width="147px" Font-Size="Large">Actions</asp:label></P>
													<P align="center">
														<TABLE id="Table6" cellSpacing="1" cellPadding="1" width="300" border="1">
															<TR>
																<TD style="WIDTH: 66px"><asp:label id="Label25" runat="server" Width="98px" Font-Size="Small" Font-Bold="True">Sent To</asp:label></TD>
																<TD><asp:label id="Label27" runat="server" Width="80px" Font-Size="Small" Font-Bold="True">Office</asp:label></TD>
																<TD style="WIDTH: 37px"><asp:label id="Label28" runat="server" Width="121px" Font-Size="Small" Font-Bold="True">Requested By</asp:label></TD>
																<TD><asp:label id="Label29" runat="server" Width="105px" Font-Size="Small" Font-Bold="True">Sent Date</asp:label></TD>
																<TD><asp:label id="Label30" runat="server" Width="113px" Font-Size="Small" Font-Bold="True">Due Date</asp:label></TD>
																<TD><asp:label id="Label31" runat="server" Width="87px" Font-Size="Small" Font-Bold="True">Extension</asp:label></TD>
																<TD><asp:label id="Label32" runat="server" Width="96px" Font-Size="Small" Font-Bold="True">Completed</asp:label></TD>
																<TD><asp:label id="Label33" runat="server" Width="30px" Font-Size="Small" Font-Bold="True">Kill</asp:label></TD>
															</TR>
															<TR>
																<TD style="WIDTH: 66px"><asp:textbox id="txtAct1To" runat="server" Width="131px" BackColor="#C0FFFF"></asp:textbox></TD>
																<TD><asp:textbox id="txtAct1ToOfficeId" runat="server" Width="129px" BackColor="#C0FFFF"></asp:textbox></TD>
																<TD style="WIDTH: 37px"><asp:textbox id="txtAct1OfficeId" runat="server" Width="134px" BackColor="#C0FFFF"></asp:textbox></TD>
																<TD><asp:textbox id="txtAct1SentDate" runat="server" Width="128px" BackColor="#C0FFFF"></asp:textbox></TD>
																<TD><asp:textbox id="txtAct1DueDate" runat="server" Width="133px" BackColor="#C0FFFF"></asp:textbox></TD>
																<TD><asp:textbox id="txtAct1ExtDate" runat="server" Width="127px" BackColor="#C0FFFF"></asp:textbox></TD>
																<TD><asp:textbox id="txtAct1CompDate" runat="server" Width="131px" BackColor="#C0FFFF"></asp:textbox></TD>
																<TD><asp:checkbox id="chkAct1Kill" runat="server" Width="16px" BackColor="White"></asp:checkbox></TD>
															</TR>
															<TR>
																<TD style="WIDTH: 66px"><asp:textbox id="txtAct2To" runat="server" Width="131px" BackColor="#C0FFFF"></asp:textbox></TD>
																<TD><asp:textbox id="txtAct2ToOfficeId" runat="server" Width="129px" BackColor="#C0FFFF"></asp:textbox></TD>
																<TD style="WIDTH: 37px"><asp:textbox id="txtAct2OfficeId" runat="server" Width="134px" BackColor="#C0FFFF"></asp:textbox></TD>
																<TD><asp:textbox id="txtAct2SentDate" runat="server" Width="128px" BackColor="#C0FFFF"></asp:textbox></TD>
																<TD><asp:textbox id="txtAct2DueDate" runat="server" Width="133px" BackColor="#C0FFFF"></asp:textbox></TD>
																<TD><asp:textbox id="txtAct2ExtDate" runat="server" Width="127px" BackColor="#C0FFFF"></asp:textbox></TD>
																<TD><asp:textbox id="txtAct2CompDate" runat="server" Width="131px" BackColor="#C0FFFF"></asp:textbox></TD>
																<TD><asp:checkbox id="chkAct2Kill" runat="server" Width="12px" BackColor="White"></asp:checkbox></TD>
															</TR>
															<TR>
																<TD style="WIDTH: 66px"><asp:textbox id="txtAct3To" runat="server" Width="131px" BackColor="#C0FFFF"></asp:textbox></TD>
																<TD><asp:textbox id="txtAct3ToOfficeId" runat="server" Width="129px" BackColor="#C0FFFF"></asp:textbox></TD>
																<TD style="WIDTH: 37px"><asp:textbox id="txtAct3OfficeId" runat="server" Width="134px" BackColor="#C0FFFF"></asp:textbox></TD>
																<TD><asp:textbox id="txtAct3SentDate" runat="server" Width="128px" BackColor="#C0FFFF"></asp:textbox></TD>
																<TD><asp:textbox id="txtAct3DueDate" runat="server" Width="133px" BackColor="#C0FFFF"></asp:textbox></TD>
																<TD><asp:textbox id="txtAct3ExtDate" runat="server" Width="127px" BackColor="#C0FFFF"></asp:textbox></TD>
																<TD><asp:textbox id="txtAct3CompDate" runat="server" Width="131px" BackColor="#C0FFFF"></asp:textbox></TD>
																<TD><asp:checkbox id="chkAct3Kill" runat="server" Width="12px" BackColor="White"></asp:checkbox></TD>
															</TR>
															<TR>
																<TD style="WIDTH: 66px; HEIGHT: 39px"><asp:textbox id="txtAct4To" runat="server" Width="131px" BackColor="#C0FFFF"></asp:textbox></TD>
																<TD style="HEIGHT: 39px"><asp:textbox id="txtAct4ToOfficeId" runat="server" Width="129px" BackColor="#C0FFFF"></asp:textbox></TD>
																<TD style="WIDTH: 37px; HEIGHT: 39px"><asp:textbox id="txtAct4OfficeId" runat="server" Width="134px" BackColor="#C0FFFF"></asp:textbox></TD>
																<TD style="HEIGHT: 39px"><asp:textbox id="txtAct4SentDate" runat="server" Width="128px" BackColor="#C0FFFF"></asp:textbox></TD>
																<TD style="HEIGHT: 39px"><asp:textbox id="txtAct4DueDate" runat="server" Width="133px" BackColor="#C0FFFF"></asp:textbox></TD>
																<TD style="HEIGHT: 39px"><asp:textbox id="txtAct4ExtDate" runat="server" Width="127px" BackColor="#C0FFFF"></asp:textbox></TD>
																<TD style="HEIGHT: 39px"><asp:textbox id="txtAct4CompDate" runat="server" Width="131px" BackColor="#C0FFFF"></asp:textbox></TD>
																<TD style="HEIGHT: 39px"><asp:checkbox id="chkAct4Kill" runat="server" Width="12px" BackColor="White"></asp:checkbox></TD>
															</TR>
															<TR>
																<TD style="WIDTH: 66px; HEIGHT: 28px"><asp:textbox id="txtAct5To" runat="server" Width="131px" BackColor="#C0FFFF"></asp:textbox></TD>
																<TD style="HEIGHT: 28px"><asp:textbox id="txtAct5ToOfficeId" runat="server" Width="129px" BackColor="#C0FFFF"></asp:textbox></TD>
																<TD style="WIDTH: 37px; HEIGHT: 28px"><asp:textbox id="txtAct5OfficeId" runat="server" Width="134px" BackColor="#C0FFFF"></asp:textbox></TD>
																<TD style="HEIGHT: 28px"><asp:textbox id="txtAct5SentDate" runat="server" Width="128px" BackColor="#C0FFFF"></asp:textbox></TD>
																<TD style="HEIGHT: 28px"><asp:textbox id="txtAct5DueDate" runat="server" Width="133px" BackColor="#C0FFFF"></asp:textbox></TD>
																<TD style="HEIGHT: 28px"><asp:textbox id="txtAct5ExtDate" runat="server" Width="127px" BackColor="#C0FFFF"></asp:textbox></TD>
																<TD style="HEIGHT: 28px"><asp:textbox id="txtAct5CompDate" runat="server" Width="131px" BackColor="#C0FFFF"></asp:textbox></TD>
																<TD style="HEIGHT: 28px"><asp:checkbox id="chkAct5Kill" runat="server" Width="12px" BackColor="White"></asp:checkbox></TD>
															</TR>
															<TR>
																<TD style="WIDTH: 66px"><asp:textbox id="txtAct6To" runat="server" Width="131px" BackColor="#C0FFFF"></asp:textbox></TD>
																<TD><asp:textbox id="txtAct6ToOfficeId" runat="server" Width="129px" BackColor="#C0FFFF"></asp:textbox></TD>
																<TD style="WIDTH: 37px"><asp:textbox id="txtAct6OfficeId" runat="server" Width="134px" BackColor="#C0FFFF"></asp:textbox></TD>
																<TD><asp:textbox id="txtAct6SentDate" runat="server" Width="128px" BackColor="#C0FFFF"></asp:textbox></TD>
																<TD><asp:textbox id="txtAct6DueDate" runat="server" Width="133px" BackColor="#C0FFFF"></asp:textbox></TD>
																<TD><asp:textbox id="txtAct6ExtDate" runat="server" Width="127px" BackColor="#C0FFFF"></asp:textbox></TD>
																<TD><asp:textbox id="txtAct6CompDate" runat="server" Width="131px" BackColor="#C0FFFF"></asp:textbox></TD>
																<TD><asp:checkbox id="chkAct6Kill" runat="server" Width="12px" BackColor="White"></asp:checkbox></TD>
															</TR>
														</TABLE>
													</P>
													<P>
														<TABLE id="Table3" cellSpacing="1" cellPadding="1" width="300" border="1">
															<TR>
																<TD style="WIDTH: 81px"><asp:label id="Label23" runat="server" Width="134px" Font-Size="X-Small" Font-Bold="True">For Signature Of</asp:label></TD>
																<TD><asp:textbox id="txtForSignatureOf" runat="server" Width="286px" BackColor="#C0FFFF"></asp:textbox></TD>
															</TR>
															<TR>
																<TD style="WIDTH: 81px"><asp:label id="Label24" runat="server" Width="96px" Font-Size="Medium">Comments</asp:label></TD>
																<TD><asp:textbox id="txtAbstract" runat="server" Width="622px" Height="54px" TextMode="MultiLine"
																		DESIGNTIMEDRAGDROP="721" BackColor="#C0FFFF"></asp:textbox></TD>
															</TR>
														</TABLE>
													</P>
													<P>
														<asp:Button id="Button1" runat="server" Width="152px" Font-Bold="True" Text="Return to Search List"></asp:Button></P>
												</TD>
											</TR>
										</TABLE>
									</H3>
								</td>
							</tr>
							<TR>
								<TD>
									<P></P>
								</TD>
							</TR>
						</table>
					</td>
				</tr>
				<tr>
					<td style="WIDTH: 81px" bgColor="#ffffff">&nbsp;</td>
					<td align="center" bgColor="#ffffff">
						<uc1:Footer id="Footer1" runat="server"></uc1:Footer></td>
				</tr>
			</TABLE>
		</form>
	</body>
</HTML>
