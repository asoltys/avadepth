<%@ Page Language="vb" AutoEventWireup="false" Codebehind="Register.aspx.vb" Inherits="AvadepthNet.AvadepthNet.web.Register"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
	<HEAD>
		<title>Register</title>
		<meta name="GENERATOR" content="Microsoft Visual Studio .NET 7.1">
		<meta name="CODE_LANGUAGE" content="Visual Basic .NET 7.1">
		<meta name="vs_defaultClientScript" content="JavaScript">
		<meta name="vs_targetSchema" content="http://schemas.microsoft.com/intellisense/ie5">
		<LINK href="Styles.css" type="text/css" rel="stylesheet">
		<LINK href="Styles.css" type="text/css" rel="stylesheet">
	</HEAD>
	<body MS_POSITIONING="GridLayout">
		<DIV style="Z-INDEX: 101; LEFT: 8px; WIDTH: 10px; POSITION: absolute; TOP: 8px; HEIGHT: 10px"
			ms_positioning="text2D">
			<FORM name="update" method="post" runat="server">
				<INPUT type="hidden" value="SignInMemberID" name="CmdID">
				<TABLE id="Table1" cellSpacing="1" width="750" border="0">
					<TR>
						<TD>
							<TABLE id="Table2" cellSpacing="4" cellPadding="0" width="100%" border="0">
								<TR>
									<TD><IMG src="CGFIP-s.gif"></TD>
									<TD align="right"><IMG height="21" alt="WD" src="wd-patch.gif" width="94" align="absMiddle">
									</TD>
								</TR>
							</TABLE>
							<P align="left"><IMG src="images/acctsignup.gif"><BR>
								<IMG src="images/newhr.gif">
							</P>
						</TD>
					</TR>
					<TR>
						<TD></TD>
					</TR>
				</TABLE>
				<TABLE id="Table3" style="WIDTH: 752px; HEIGHT: 366px" cellPadding="2" border="0">
					<TR>
						<TD align="right" class="standard-text">Name
						</TD>
						<TD>
							<asp:TextBox id="txtName" runat="server" Columns="50" CssClass="standard-text"></asp:TextBox></TD>
					</TR>
					<TR>
						<TD align="right" class="standard-text">Company/Organization
						</TD>
						<TD>
							<asp:TextBox id="txtCompany" runat="server" Columns="50" CssClass="standard-text"></asp:TextBox>
						</TD>
					</TR>
					<TR>
						<TD align="right" class="standard-text">Address
						</TD>
						<TD>
							<asp:TextBox id="txtAddress" runat="server" Columns="50" CssClass="standard-text"></asp:TextBox></FONT></TD>
					</TR>
					<TR>
						<TD align="right" class="standard-text">City
						</TD>
						<TD>
							<asp:TextBox id="txtCity" runat="server" Columns="50" CssClass="standard-text"></asp:TextBox>
						</TD>
					<TR>
						<TD align="right" class="standard-text">Province/State
						</TD>
						<TD>
							<asp:TextBox id="txtProvince" runat="server" Columns="25" CssClass="standard-text"></asp:TextBox>
						</TD>
					</TR>
					<TR>
						<TD align="right" class="standard-text">Postal/ZIP Code</TD>
						<TD>
							<asp:TextBox id="txtPostal" runat="server" Columns="10" CssClass="standard-text"></asp:TextBox>
						</TD>
					</TR>
					<TR>
						<TD align="right" class="standard-text">Country</TD>
						<TD>
							<asp:TextBox id="txtCountry" runat="server" Columns="25" CssClass="standard-text"></asp:TextBox>
						</TD>
					</TR>
					<TR>
						<TD align="right" class="standard-text">
							<P>Telephone</P>
						</TD>
						<TD>
							<asp:TextBox id="txtPhone" runat="server" Columns="25" CssClass="standard-text"></asp:TextBox>
						</TD>
					</TR>
					<TR>
						<TD align="right" class="standard-text">
							<P>E-Mail&nbsp;</P>
						</TD>
						<TD>
							<asp:TextBox id="txtEmail" runat="server" Columns="35" CssClass="standard-text"></asp:TextBox>
							<asp:RequiredFieldValidator id="EmailRequiredFieldValidator" runat="server" ErrorMessage="'Email' must not be left blank."
								ControlToValidate="txtEmail" Display="Dynamic"></asp:RequiredFieldValidator>
							<asp:RegularExpressionValidator id="RegularExpressionValidator2" runat="server" ErrorMessage="Must use a valid email address."
								ControlToValidate="txtEmail" Display="Dynamic" ValidationExpression="[\w\.-]+(\+[\w-]*)?@([\w-]+\.)+[\w-]+"></asp:RegularExpressionValidator>
						</TD>
					</TR>
					<TR>
						<TD align="right" class="standard-text"></TD>
						<TD>&nbsp;
						</TD>
					</TR>
					<TR>
						<TD align="right" colSpan="2" class="standard-text">
							<P class="instructions" align="center">Choose a user login name and password</P>
						</TD>
					</TR>
					<TR>
						<TD align="right" class="standard-text" style="HEIGHT: 24px">Login Name</TD>
						<TD style="HEIGHT: 24px">&nbsp;
							<asp:TextBox id="txtLogin" runat="server" Columns="25" CssClass="standard-text"></asp:TextBox>
							<asp:RequiredFieldValidator id="RequiredFieldValidator6" runat="server" ErrorMessage="'Login Name' must not be left blank"
								ControlToValidate="txtLogin"></asp:RequiredFieldValidator>
						</TD>
					</TR>
					<TR>
						<TD align="right" class="standard-text" style="HEIGHT: 24px">Password</TD>
						<TD style="HEIGHT: 24px">&nbsp;
							<asp:TextBox id="txtPwd" runat="server" Columns="25" CssClass="standard-text" TextMode="Password"></asp:TextBox>
							<asp:RequiredFieldValidator id="RequiredFieldValidator5" runat="server" ErrorMessage="'Password' must not be left blank."
								ControlToValidate="txtPwd" Display="Dynamic"></asp:RequiredFieldValidator>
							<asp:CompareValidator id="CompareValidator2" runat="server" ErrorMessage="Password fields do not match."
								ControlToValidate="txtPwdConfirm" ControlToCompare="txtPwd"></asp:CompareValidator>
						</TD>
					</TR>
					<TR>
						<TD align="right" class="standard-text"><FONT face="ARIAL" size="2"></FONT> Confirm&nbsp;Password</TD>
						<TD>&nbsp;
							<asp:TextBox id="txtPwdConfirm" runat="server" Columns="25" CssClass="standard-text" TextMode="Password"></asp:TextBox>
							<asp:RequiredFieldValidator id="RequiredFieldValidator1" runat="server" ErrorMessage="'Confirm Password' must not be left blank."
								ControlToValidate="txtPwdConfirm" Display="Dynamic"></asp:RequiredFieldValidator>
						</TD>
					</TR>
				</TABLE>
				<BR>
				<TABLE id="Table4" width="750" border="0">
					<TR>
						<TD align="center" width="750">
							<P align="center"><IMG src="images/newhr.gif">&nbsp;&nbsp; <A href="index.asp"></A>&nbsp;
								<A href="javascript:document.update.submit()"></A>
								<asp:ImageButton id="imgCancel" runat="server" ImageUrl="images/cancelbutton.gif"></asp:ImageButton>
								<asp:ImageButton id="imgSubmit" runat="server" ImageUrl="images/submitbutton.gif"></asp:ImageButton><BR>
								<asp:label id="Message" runat="server" CssClass="NormalRed"></asp:label>
							</P>
						</TD>
					</TR>
				</TABLE>
			</FORM>
		</DIV>
	</body>
</HTML>
