<%@ Register TagPrefix="uc1" TagName="reportfooter" Src="../reportfooter.ascx" %>
<%@ Register TagPrefix="uc1" TagName="reportHeader" Src="../reportHeader.ascx" %>
<%@ Page Language="vb" AutoEventWireup="false" Codebehind="ShowRiver.aspx.vb" Inherits="AvadepthNet.ShowRiver"%>
<HTML>
	<HEAD>
		<title>ShowSoundings</title>
		<meta content="Microsoft Visual Studio .NET 7.1" name="GENERATOR">
		<meta content="Visual Basic .NET 7.1" name="CODE_LANGUAGE">
		<meta content="JavaScript" name="vs_defaultClientScript">
		<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="styles.css" type="text/css" rel="stylesheet">
		<script language="JavaScript" src="surveyheader.js"></script>
		<LINK href="../Styles.css" type="text/css" rel="stylesheet">
	</HEAD>
	<body MS_POSITIONING="GridLayout">
		<FORM id="Form1" method="post" runat="server">
			<TABLE style="Z-INDEX: 100; LEFT: 10px; POSITION: absolute; TOP: 15px" width="590" border="0">
				<TBODY>
					<TR>
						<TD colSpan="2"><uc1:reportheader id="ReportHeader1" runat="server"></uc1:reportheader></TD>
					</TR>
					</TD></TR>
					<TR>
						<TD colSpan="2"><asp:label id="lblMain" runat="server" Width="568px" CssClass="report-main-header">txt</asp:label></TD>
					</TR>
					<TR>
						<TD colSpan="2"><asp:table id="Table1" runat="server">
								<asp:TableRow>
									<asp:TableCell></asp:TableCell>
								</asp:TableRow>
							</asp:table></TD>
					</TR>
					<TR>
						<TD><FONT color="#ff0066"><FONT face="Arial" color="#ff3333" size="2"><STRONG>Instructions:<BR>
									</STRONG><FONT color="#000000">&nbsp;&nbsp;&nbsp;&nbsp; Click on a tile 
										to zoom in or search for survey drawings.</FONT></FONT></FONT><br>
			&nbsp;&nbsp;&nbsp;&nbsp;
		</FORM>
		</TD>
		<TD align="right"><A href="javascript:BackToMap();"><IMG src="images/btnback.gif" border="0" width="0"></A></TD>
		</TR>
		<TR>
			<TD colspan="2">
				<uc1:reportfooter id="Reportfooter1" runat="server"></uc1:reportfooter></TD>
		</TR>
		</TBODY></TABLE></FORM>
	</body>
</HTML>
