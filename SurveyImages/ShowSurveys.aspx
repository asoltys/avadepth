<%@ Page Language="vb" AutoEventWireup="false" Codebehind="ShowSurveys.aspx.vb" Inherits="AvadepthNet.ShowSurveys" %>
<%@ Register TagPrefix="uc1" TagName="reportHeader" Src="../reportHeader.ascx" %>
<%@ Register TagPrefix="uc1" TagName="reportfooter" Src="../reportfooter.ascx" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
	<HEAD>
		<title>ShowSoundings</title>
		<meta content="Microsoft Visual Studio .NET 7.1" name="GENERATOR">
		<meta content="Visual Basic .NET 7.1" name="CODE_LANGUAGE">
		<meta content="JavaScript" name="vs_defaultClientScript">
		<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="../Styles.css" type="text/css" rel="stylesheet">
		<script language="JavaScript" src="surveyheader.js"></script>
	</HEAD>
	<body MS_POSITIONING="GridLayout">
		<form id="Form1" method="post" runat="server">
			<TABLE id="TABLEFORMAT" style="Z-INDEX: 101" height="600" cellPadding="0" width="600" border="0">
				<TBODY>
					<TR>
						<TD colSpan="2">
							<P><uc1:reportheader id="ReportHeader1" runat="server"></uc1:reportheader><asp:label id="txtTile" runat="server" Width="64px" Height="16px" Visible="False">Label</asp:label><asp:textbox id="txtRiver" runat="server" Width="64px" Height="16px" Visible="False"></asp:textbox></P>
						</TD>
					</TR>
					<TR>
						<TD style="HEIGHT: 63px" vAlign="bottom" colSpan="1">
							<DIV class="surveys-main-header" ms_positioning="FlowLayout">Surveys Search Results</DIV>
							<asp:label id="lblMain" runat="server" CssClass="surveys-main-header">For Day, Month Day, Year</asp:label></TD>
						<!-- <TD style="HEIGHT: 63px" vAlign="bottom" align="right"><STRONG>Options:<BR>
							</STRONG>
							<asp:hyperlink id="hyperRefine" runat="server" CssClass="standard-text" NavigateUrl="javascript:UpdateSide();">Refine-Search</asp:hyperlink><BR>
							<asp:linkbutton id="linkTile" runat="server" CssClass="standard-text" Width="72px" Height="8px">Back to Map</asp:linkbutton><BR>
						</TD> -->
					<TR>
						<TD style="HEIGHT: 2px" vAlign="bottom" colSpan="2">
							<HR SIZE="1">
							&nbsp;</TD>
					</TR>
					<TR>
						<TD style="HEIGHT: 400px" vAlign="top" colSpan="2">
							<TABLE id="TableInner" cellPadding="0" width="100%" border="0">
								<TR vAlign="top">
									<TD class="smalltabletext" style="WIDTH: 90px">Date</TD>
									<TD class="smalltabletext" style="WIDTH: 150px">Drawing<BR>
										(click on a drawing to view)</TD>
									<TD class="smalltabletext" style="WIDTH: 135px">Location (km)</TD>
									<TD class="smalltabletext" style="WIDTH: 100px">Type</TD>
									<TD class="smalltabletext" style="WIDTH: 55px">Km Start</TD>
									<TD class="smalltabletext" style="WIDTH: 55px">Km End</TD>
								</TR>
								<TR>
									<TD colSpan="6" height="3">
										<HR SIZE="1">
									</TD>
								</TR>
								<asp:repeater id="RepeatInner" runat="server">
									<ItemTemplate>
										<tr bgcolor="Gainsboro">
											<td class="smalltabletext">
												<%# FormatDateTime(DataBinder.Eval(Container.DataItem, "yyyy_mm_dd"),2) %>
											</td>
											<td class="smalltabletext">
												<asp:HyperLink id="SurveyLink1" NavigateUrl='<%# DataBinder.Eval(Container.DataItem, "Filenm", "../Data/dwf/{0}.dwf")%>' target=_blank runat="server">
													<%#DataBinder.Eval(Container.DataItem, "Filenm")%>
												</asp:HyperLink>
											</td>
											<td class="smalltabletext">
												<%#DataBinder.Eval(Container.DataItem, "Location")%>
												<asp:Label ID="Snd1" Runat="server"></asp:Label>
											</td>
											<td class="smalltabletext">
												<%#DataBinder.Eval(Container.DataItem, "Type")%>
											</td>
											<td class="smalltabletext">
												<%#DataBinder.Eval(Container.DataItem, "KmStart")%>
											</td>
											<td class="smalltabletext">
												<%#DataBinder.Eval(Container.DataItem, "KmEnd")%>
											</td>
										</tr>
									</ItemTemplate>
									<AlternatingItemTemplate>
										<tr bgcolor="White">
											<td class="smalltabletext">
												<%# FormatDateTime(DataBinder.Eval(Container.DataItem, "yyyy_mm_dd"),2) %>
											</td>
											<td class="smalltabletext">
												<asp:HyperLink id="SurveyLink2" NavigateUrl='<%# DataBinder.Eval(Container.DataItem, "Filenm", "../Data/dwf/{0}.dwf")%>' target=_blank runat="server">
													<%#DataBinder.Eval(Container.DataItem, "Filenm")%>
												</asp:HyperLink>
											</td>
											<td class="smalltabletext">
												<%#DataBinder.Eval(Container.DataItem, "Location")%>
												<asp:Label ID="Label1" Runat="server"></asp:Label>
											</td>
											<td class="smalltabletext">
												<%#DataBinder.Eval(Container.DataItem, "Type")%>
											</td>
											<td class="smalltabletext">
												<%#DataBinder.Eval(Container.DataItem, "KmStart")%>
											</td>
											<td class="smalltabletext">
												<%#DataBinder.Eval(Container.DataItem, "KmEnd")%>
											</td>
										</tr>
									</AlternatingItemTemplate>
								</asp:repeater></TABLE>
							<HR SIZE="1">
							<TABLE id="Table1" width="100%" border="0">
								<TBODY>
									<TR>
										<TD><FORM target="main" method="post" action="selectsurveyriver.asp" name="surveys">
												&nbsp;&nbsp;&nbsp;&nbsp; <FONT size="2"><FONT face="ARIAL" color="#ff0000"><B>Instructions:</B></FONT>
												</FONT>
												<BR>
												<LI>
													click
													<asp:linkbutton id="linkTile2" runat="server" Height="8px" CssClass="standard-text" Font-Bold="True">back</asp:linkbutton>
													to select another map area <I>or</I>
												<LI>
													change the search criteria and click <B><A href="javascript:UpdateSide();">refine-search</A></B>.<IMG height="8" src="spacer.gif">&nbsp;&nbsp;&nbsp;
											</FORM>
											</LI></TD>
										<TD>
											<P>&nbsp;<INPUT style="WIDTH: 72px; HEIGHT: 22px" type="hidden" size="6" value="1" name="mode"><INPUT style="WIDTH: 48px; HEIGHT: 22px" type="hidden" size="2" name="locationtile"><INPUT type="hidden" name="type"><INPUT type="hidden" value="NA0809" name="tile"><INPUT type="hidden" value="FRNA" name="RIVERID" style="WIDTH: 88px; HEIGHT: 22px" size="9"></P>
											<A href="javascript:BackToMap();"></A><A href="javascript:UpdateSide();"></A>
										</TD>
									</TR>
								</TBODY>
							</TABLE>
							<BR>
							</FONT></TD>
					<TR>
						<TD style="HEIGHT: 2px" vAlign="top" colSpan="2"></TD>
					</TR>
					<TR>
						<TD colSpan="2">
							<uc1:reportfooter id="Reportfooter1" runat="server"></uc1:reportfooter></TD>
					</TR>
				</TBODY>
			</TABLE>
		</form>
		</TR></TBODY></TABLE></TR></TBODY></TABLE>
	</body>
</HTML>
