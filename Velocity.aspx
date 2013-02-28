<%@ Page Language="vb" AutoEventWireup="false" Codebehind="Velocity.aspx.vb" Inherits="AvadepthNet.AvadepthNet.web.Velocity"%>
<%@ Register TagPrefix="uc1" TagName="MenuHeader" Src="MenuHeader.ascx" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
	<HEAD>
		<title>TideSeries</title>
		<meta content="Microsoft Visual Studio .NET 7.1" name="GENERATOR">
		<meta content="Visual Basic .NET 7.1" name="CODE_LANGUAGE">
		<meta content="JavaScript" name="vs_defaultClientScript">
		<meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
		<LINK href="Styles.css" type="text/css" rel="stylesheet">
		<script language="javascript" src="script.js" type="text/javascript"></script>
	</HEAD>
	<body MS_POSITIONING="GridLayout">
		<script>
		//parent.frames['main'].location.href = 'velocityoverview.html';
		</script>
		<form id="Form2" method="post" runat="server">
			<TABLE id="TableEntry" cellSpacing="1" cellPadding="1" width="208" border="0">
				<TR>
					<TD style="HEIGHT: 57px" colSpan="4">
						<uc1:MenuHeader id="MenuHeader1" HelpFile="hcurrents.html" BannerImage="images/bnrCurrentVelocities2.gif"
							runat="server"></uc1:MenuHeader>
					</TD>
				</TR>
				<TR>
					<td colSpan="3">
						<DIV class="header-gray" style="DISPLAY: inline; WIDTH: 48px" ms_positioning="FlowLayout">Date</DIV>
					</td>
				</TR>
				<TR>
					<TD>&nbsp;</TD>
					<TD colSpan="2">
						<asp:textbox id="lblDate" runat="server" BorderStyle="Solid" AutoPostBack="True" Columns="12"
							CssClass="standard-text" BorderWidth="1px" Width="100px" BorderColor="SteelBlue"></asp:textbox><A href="javascript:OpenCalendar('lblDate', true)"><IMG src="images/icon-calendar.gif" align="absMiddle" border="0">calendar</A>
					</TD>
				</TR>
				<TR>
					<TD colSpan="3">
						<DIV class="header-gray" style="DISPLAY: inline" ms_positioning="FlowLayout">River 
							Discharge @ Hope:</DIV>
					</TD>
				</TR>
				<TR>
					<TD></TD>
					<TD colSpan="2"><asp:radiobutton id="RadioPredicted" runat="server" Height="16px" Width="184px" Text="Predicted"
							GroupName="radioDischargeGroup" CssClass="standard-text"></asp:radiobutton></TD>
				</TR>
				<TR>
					<TD></TD>
					<TD colSpan="2"><asp:radiobutton id="RadioActual" runat="server" Height="8px" Width="184px" Text="Actual" GroupName="radioDischargeGroup"
							CssClass="standard-text" Checked="True"></asp:radiobutton></TD>
				</TR>
				<TR>
					<TD style="HEIGHT: 23px"></TD>
					<TD colSpan="2" style="HEIGHT: 23px"><asp:radiobutton id="radioUserDefined" runat="server" Height="16px" Width="95px" Text="User-defined"
							GroupName="radioDischargeGroup" CssClass="standard-text"></asp:radiobutton><asp:textbox id="txtUserDefined" runat="server" Height="16px" Width="72px"></asp:textbox>&nbsp;m<sup>3</sup>/s</TD>
				</TR>
				<TR>
					<TD></TD>
					<TD colSpan="2"><asp:radiobutton id="RadioSelected" runat="server" Height="8px" Width="95px" Text="Selected" GroupName="radioDischargeGroup"
							CssClass="standard-text"></asp:radiobutton><asp:dropdownlist id="ddFlowList" runat="server" Height="24px" Width="72px" CssClass="standard-text"></asp:dropdownlist>&nbsp;m<sup>3</sup>/s</TD>
				</TR>
				<TR>
					<TD colSpan="3">
						<DIV class="header-gray" style="DISPLAY: inline; WIDTH: 56px; HEIGHT: 16px" ms_positioning="FlowLayout">
							<P>Time:</P>
						</DIV>
					</TD>
				</TR>
				<TR>
					<TD style="HEIGHT: 14px"></TD>
					<TD style="HEIGHT: 14px"><asp:dropdownlist id="ddHour" runat="server" Height="8px" Width="48px" CssClass="standard-text">
							<asp:ListItem Value="0">00</asp:ListItem>
							<asp:ListItem Value="1">01</asp:ListItem>
							<asp:ListItem Value="2">02</asp:ListItem>
							<asp:ListItem Value="3">03</asp:ListItem>
							<asp:ListItem Value="4">04</asp:ListItem>
							<asp:ListItem Value="5">05</asp:ListItem>
							<asp:ListItem Value="6">06</asp:ListItem>
							<asp:ListItem Value="7">07</asp:ListItem>
							<asp:ListItem Value="8">08</asp:ListItem>
							<asp:ListItem Value="9">09</asp:ListItem>
							<asp:ListItem Value="10">10</asp:ListItem>
							<asp:ListItem Value="11">11</asp:ListItem>
							<asp:ListItem Value="12" Selected="True">12</asp:ListItem>
							<asp:ListItem Value="13">13</asp:ListItem>
							<asp:ListItem Value="14">14</asp:ListItem>
							<asp:ListItem Value="15">15</asp:ListItem>
							<asp:ListItem Value="16">16</asp:ListItem>
							<asp:ListItem Value="17">17</asp:ListItem>
							<asp:ListItem Value="18">18</asp:ListItem>
							<asp:ListItem Value="19">19</asp:ListItem>
							<asp:ListItem Value="20">20</asp:ListItem>
							<asp:ListItem Value="21">21</asp:ListItem>
							<asp:ListItem Value="22">22</asp:ListItem>
							<asp:ListItem Value="23">23</asp:ListItem>
							<asp:ListItem Value="24">24</asp:ListItem>
						</asp:dropdownlist><asp:dropdownlist id="ddMinute" runat="server" Height="8px" Width="48px" CssClass="standard-text">
							<asp:ListItem Value="0" Selected="True">00</asp:ListItem>
							<asp:ListItem Value="1">01</asp:ListItem>
							<asp:ListItem Value="2">02</asp:ListItem>
							<asp:ListItem Value="3">03</asp:ListItem>
							<asp:ListItem Value="4">04</asp:ListItem>
							<asp:ListItem Value="5">05</asp:ListItem>
							<asp:ListItem Value="6">06</asp:ListItem>
							<asp:ListItem Value="7">07</asp:ListItem>
							<asp:ListItem Value="8">08</asp:ListItem>
							<asp:ListItem Value="9">09</asp:ListItem>
							<asp:ListItem Value="10">10</asp:ListItem>
							<asp:ListItem Value="11">11</asp:ListItem>
							<asp:ListItem Value="12">12</asp:ListItem>
							<asp:ListItem Value="13">13</asp:ListItem>
							<asp:ListItem Value="14">14</asp:ListItem>
							<asp:ListItem Value="15">15</asp:ListItem>
							<asp:ListItem Value="16">16</asp:ListItem>
							<asp:ListItem Value="17">17</asp:ListItem>
							<asp:ListItem Value="18">18</asp:ListItem>
							<asp:ListItem Value="19">19</asp:ListItem>
							<asp:ListItem Value="20">20</asp:ListItem>
							<asp:ListItem Value="21">21</asp:ListItem>
							<asp:ListItem Value="22">22</asp:ListItem>
							<asp:ListItem Value="23">23</asp:ListItem>
							<asp:ListItem Value="24">24</asp:ListItem>
							<asp:ListItem Value="25">25</asp:ListItem>
							<asp:ListItem Value="26">26</asp:ListItem>
							<asp:ListItem Value="27">27</asp:ListItem>
							<asp:ListItem Value="28">28</asp:ListItem>
							<asp:ListItem Value="29">29</asp:ListItem>
							<asp:ListItem Value="30">30</asp:ListItem>
							<asp:ListItem Value="31">31</asp:ListItem>
							<asp:ListItem Value="32">32</asp:ListItem>
							<asp:ListItem Value="33">33</asp:ListItem>
							<asp:ListItem Value="34">34</asp:ListItem>
							<asp:ListItem Value="35">35</asp:ListItem>
							<asp:ListItem Value="36">36</asp:ListItem>
							<asp:ListItem Value="37">37</asp:ListItem>
							<asp:ListItem Value="38">38</asp:ListItem>
							<asp:ListItem Value="39">39</asp:ListItem>
							<asp:ListItem Value="40">40</asp:ListItem>
							<asp:ListItem Value="41">41</asp:ListItem>
							<asp:ListItem Value="42">42</asp:ListItem>
							<asp:ListItem Value="43">43</asp:ListItem>
							<asp:ListItem Value="44">44</asp:ListItem>
							<asp:ListItem Value="45">45</asp:ListItem>
							<asp:ListItem Value="46">46</asp:ListItem>
							<asp:ListItem Value="47">47</asp:ListItem>
							<asp:ListItem Value="48">48</asp:ListItem>
							<asp:ListItem Value="49">49</asp:ListItem>
							<asp:ListItem Value="50">50</asp:ListItem>
							<asp:ListItem Value="51">51</asp:ListItem>
							<asp:ListItem Value="52">52</asp:ListItem>
							<asp:ListItem Value="53">53</asp:ListItem>
							<asp:ListItem Value="54">54</asp:ListItem>
							<asp:ListItem Value="55">55</asp:ListItem>
							<asp:ListItem Value="56">56</asp:ListItem>
							<asp:ListItem Value="57">57</asp:ListItem>
							<asp:ListItem Value="58">58</asp:ListItem>
							<asp:ListItem Value="59">59</asp:ListItem>
						</asp:dropdownlist></TD>
				</TR>
				<TR>
					<TD colSpan="2">
						<DIV class="header-gray" style="DISPLAY: inline; WIDTH: 56px; HEIGHT: 16px" ms_positioning="FlowLayout">
							<P>Zone:</P>
						</DIV>
					</TD>
				</TR>
				<TR>
					<TD style="HEIGHT: 20px"></TD>
					<TD style="HEIGHT: 20px"><asp:dropdownlist name="ddZone" id="ddZone" runat="server" Height="8px" Width="48px" CssClass="standard-text">
							<asp:ListItem Value="1">01</asp:ListItem>
							<asp:ListItem Value="2">02</asp:ListItem>
							<asp:ListItem Value="3">03</asp:ListItem>
							<asp:ListItem Value="4">04</asp:ListItem>
							<asp:ListItem Value="5">05</asp:ListItem>
							<asp:ListItem Value="6">06</asp:ListItem>
							<asp:ListItem Value="7">07</asp:ListItem>
							<asp:ListItem Value="8">08</asp:ListItem>
							<asp:ListItem Value="9">09</asp:ListItem>
							<asp:ListItem Value="10">10</asp:ListItem>
							<asp:ListItem Value="11">11</asp:ListItem>
						</asp:dropdownlist>&nbsp;
						<asp:ImageButton id="btnMap" runat="server" Width="16px" ImageUrl="images/mapicon.gif" ImageAlign="Bottom"></asp:ImageButton></TD>
				</TR>
				<TR>
				</TR>
				<TR>
					<TD colSpan="2">
						<DIV class="header-gray" style="DISPLAY: inline; WIDTH: 120px; HEIGHT: 2px" ms_positioning="FlowLayout">
							<P>Velocity Legend:</P>
						</DIV>
					</TD>
				</TR>
				<TR>
					<TD></TD>
					<TD><asp:radiobutton id="radioLegend2" runat="server" Height="8px" Width="175px" Text="0 to 2 m/s (Interval .25ms)"
							GroupName="radioDisplayGroup" CssClass="standard-text" Checked="True"></asp:radiobutton></TD>
				</TR>
				<TR>
					<TD></TD>
					<TD><asp:radiobutton id="radioLegend4" runat="server" Height="16px" Width="175px" Text="0 to 4 m/s (Interval .5ms)"
							GroupName="radioDisplayGroup" CssClass="standard-text"></asp:radiobutton></TD>
				</TR>
				<TR>
					<TD align="center" colSpan="3">
						<P><asp:imagebutton id="Imagebutton1" runat="server" ImageUrl="images/btnReport.gif"></asp:imagebutton></P>
						<P>
							<asp:CompareValidator id="CompareValidator1" runat="server" CssClass="standard-text" ErrorMessage="CompareValidator"
								ControlToValidate="txtUserDefined" Type="Integer" Operator="LessThan" ValueToCompare="30000">*Invalid Discharge Rate</asp:CompareValidator>
							<asp:Label id="lblInvalidDate" runat="server" CssClass="standard-text" Visible="False" ForeColor="Red">* Invalid Date</asp:Label>
							<asp:Label id="lblNoflow" runat="server" CssClass="standard-text" Height="16px" Visible="False"
								ForeColor="Red">No flow data available.</asp:Label></P>
					</TD>
				</TR>
			</TABLE>
		</form>
	</body>
</HTML>
