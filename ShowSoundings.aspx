<%@ Register TagPrefix="cc1" Namespace="GraphicsServer.GSNet.Charting" Assembly="GSNetWin" %>
<%@ Page Language="vb" AutoEventWireup="false" Codebehind="ShowSoundings.aspx.vb" Inherits="AvadepthNet.AvadepthNet.web.ShowSoundings"%>
<%@ Register TagPrefix="uc1" TagName="reportHeader" Src="reportHeader.ascx" %>
<%@ Register TagPrefix="uc1" TagName="reportfooter" Src="reportfooter.ascx" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
   <HEAD>
      <title>ShowSoundings</title>
      <meta content="Microsoft Visual Studio .NET 7.1" name="GENERATOR">
      <meta content="Visual Basic .NET 7.1" name="CODE_LANGUAGE">
      <meta content="JavaScript" name="vs_defaultClientScript">
      <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
      <LINK href="styles.css" type="text/css" rel="stylesheet">
      
      <link rel="stylesheet" type="text/css" href="css/smoothness/jquery-ui-1.7.1.custom.css"/>

      <script type='text/javascript' src="Scripts/jquery-1.3.2.min.js"></script>
      <script type='text/javascript' src="Scripts/jquery-ui-1.7.1.custom.min.js"></script>
       
      <script type="text/javascript" src="Scripts/jquery.hint.js"></script>
      <script type="text/javascript" src="Scripts/jquery.corner.js"></script>
      <script type="text/javascript" src="Scripts/jquery.layout.min.js"></script>
      <script type="text/javascript" src="Scripts/jquery.loading.min.js"></script>
      
      <script language=javascript>
           $(document).ready(function() {
           });
      </script>

      <script type="text/javascript">
         var _gaq = _gaq || [];
         _gaq.push(['_setAccount', 'UA-5411606-40']);
         _gaq.push(['_trackPageview']);

         (function() {
         var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
         ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
         var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
         })();
      </script>
   </HEAD>
   <body MS_POSITIONING="GridLayout">
      <form id="Form1" method="post" runat="server">
         <TABLE id="TABLEFORMAT" style="Z-INDEX: 101" height="600" width="600">
            <TBODY>
               <TR>
                  <TD colSpan="2">
                     <P><uc1:reportheader id="ReportHeader1" runat="server"></uc1:reportheader></P>
                  </TD>
               </TR>
               <TR>
                  <TD align="center" colSpan="2">
                     <DIV class="report-main-header">
                        <asp:label id="lblTitle" runat="server" CssClass="report-main-header" Width="405px">Riverbed Profile</asp:label><asp:label id="lblMain" runat="server" Width="405px" CssClass="report-main-header">For Day, Month Day, Year</asp:label></DIV>
                     <asp:label id="lblSubtitle1" runat="server" Width="392px" CssClass="report-header">For Day, Month Day, Year</asp:label><BR>
                  </TD>
               </TR>
               <TR>
                  <TD style="HEIGHT: 427px" vAlign="top"><asp:panel id="PanelReport" runat="server" Visible="False">
                        <TABLE id="Wrap" border="0">
                           <TR>
                              <TD vAlign="top">
                                 <TABLE class="tableborder" id="TableInner" style="WIDTH: 595px" border="0">
                                    <TR align="center">
                                       <TD class="report-header" style="WIDTH: 200px" bgColor="ivory" colSpan="3">&nbsp;</TD>
                                       <TD class="report-header" width="205" bgColor="ivory" colSpan="4"><B>Inner Channel 
                                             Limit</B>
                                          <HR width="100%" SIZE="1">
                                       </TD>
                                       <TD class="report-header" width="205" bgColor="ivory" colSpan="4"><B>Outer Channel 
                                             Limit</B>
                                          <HR SIZE="1">
                                       </TD>
                                    </TR>
                                    <TR>
                                       <TD class="smalltabletext" style="WIDTH: 40px; HEIGHT: 47px" align="center" bgColor="ivory"
                                          rowSpan="2">Km</TD>
                                       <TD class="smalltabletext" style="WIDTH: 60px; HEIGHT: 47px" align="center" bgColor="ivory"
                                          rowSpan="2">Date of<BR>
                                          Survey</TD>
                                       <TD class="smalltabletext" style="WIDTH: 50px; HEIGHT: 18px" vAlign="bottom" align="center"
                                          bgColor="ivory">Design<BR>
                                          Grade</TD>
                                       <TD class="smalltabletext" style="WIDTH: 55px; HEIGHT: 18px" vAlign="bottom" align="center"
                                          bgColor="ivory">Least<BR>
                                          Sounding</TD>
                                       <TD class="smalltabletext" style="WIDTH: 100px; HEIGHT: 18px" vAlign="bottom" align="center"
                                          bgColor="ivory" colSpan="2">Available Width</TD>
                                       <TD class="smalltabletext" style="WIDTH: 50px; HEIGHT: 18px" vAlign="bottom" align="center"
                                          bgColor="ivory">Design<BR>
                                          Grade</TD>
                                       <TD class="smalltabletext" style="WIDTH: 55px; HEIGHT: 18px" vAlign="bottom" align="center"
                                          bgColor="ivory">Least<BR>
                                          Sounding</TD>
                                       <TD class="smalltabletext" style="WIDTH: 100px; HEIGHT: 18px" vAlign="bottom" align="center"
                                          bgColor="ivory" colSpan="2">Available Width</TD>
                                    </TR>
                                    <TR>
                                       <TD class="smalltabletext" style="HEIGHT: 15px" align="center" bgColor="ivory">(m)</TD>
                                       <TD class="smalltabletext" style="HEIGHT: 15px" align="center" bgColor="ivory">&nbsp;(m)</TD>
                                       <TD class="smalltabletext" style="WIDTH: 50px; HEIGHT: 15px" align="center" bgColor="ivory">(m)</TD>
                                       <TD class="smalltabletext" style="WIDTH: 50px; HEIGHT: 15px" align="center" bgColor="ivory">(%)</TD>
                                       <TD class="smalltabletext" style="HEIGHT: 15px" align="center" bgColor="ivory">&nbsp;(m)</TD>
                                       <TD class="smalltabletext" style="WIDTH: 69px; HEIGHT: 15px" align="center" bgColor="ivory">(m)</TD>
                                       <TD class="smalltabletext" style="WIDTH: 50px; HEIGHT: 15px" align="center" bgColor="ivory">(m)</TD>
                                       <TD class="smalltabletext" style="WIDTH: 50px; HEIGHT: 15px" align="center" bgColor="ivory">(%)</TD>
                                    </TR>
                                    <TR>
                                       <TD bgColor="ivory" colSpan="13" height="6">
                                          <HR SIZE="1">
                                       </TD>
                                    </TR>
                                    <asp:repeater id="RepeatInner" runat="server" OnItemDataBound="RepeatInner_ItemDataBound">
                                       <AlternatingItemTemplate>
                                          <tr bgcolor="Gainsboro">
                                             <td align="center" class="smalltabletext">
                                                <asp:HyperLink runat="server" NavigateUrl='<%# "ShowSoundingsHistory.aspx?lane=1&chainage=" + DataBinder.Eval(Container.DataItem, "Chainage") %>' ID="Hyperlink7" NAME="Hyperlink1">
                                                   <%#DataBinder.Eval(Container.DataItem, "Chainage")%>
                                                </asp:HyperLink>
                                             </td>
                                             <td align="center" class="smalltabletext">
                                                <%#DataBinder.Eval(Container.DataItem, "SoundingDate")%>
                                             </td>
                                             <td align="center" class="smalltabletext">
                                                <asp:Label ID="Dredge" Runat="server"></asp:Label>
                                             </td>
                                             <td align="center" class="smalltabletext">
                                                <asp:Label ID="Snd1" Runat="server"></asp:Label>
                                             </td>
                                             <td align="center" class="smalltabletext">&nbsp;
                                                <asp:Label ID="WidthVal" Runat="server"></asp:Label>
                                             </td>
                                             <td align="center" class="smalltabletext">&nbsp;
                                                <asp:Label ID="WidthPerc" Runat="server"></asp:Label>
                                             </td>
                                             <td align="center" class="smalltabletext">
                                                <asp:Label ID="Dredge2" Runat="server"></asp:Label>
                                             </td>
                                             <td align="center" class="smalltabletext">
                                                <asp:Label ID="Snd2" Runat="server"></asp:Label>
                                             </td>
                                             <td align="center" class="smalltabletext">&nbsp;
                                                <asp:Label ID="WidthVal2" Runat="server"></asp:Label>
                                             </td>
                                             <td align="center" class="smalltabletext">&nbsp;
                                                <asp:Label ID="WidthPerc2" Runat="server"></asp:Label>
                                             </td>
                                          </tr>
                                       </AlternatingItemTemplate>
                                       <ItemTemplate>
                                          <tr>
                                             <td align="center" class="smalltabletext">
                                                <asp:HyperLink runat="server" NavigateUrl='<%# "ShowSoundingsHistory.aspx?lane=1&chainage=" + DataBinder.Eval(Container.DataItem, "Chainage") %>' ID="Hyperlink3" NAME="Hyperlink1">
                                                   <%#DataBinder.Eval(Container.DataItem, "Chainage")%>
                                                </asp:HyperLink>
                                             </td>
                                             <td align="center" class="smalltabletext">
                                                <%#DataBinder.Eval(Container.DataItem, "SoundingDate")%>
                                             </td>
                                             <td align="center" class="smalltabletext">
                                                <asp:Label id="Dredge" runat="server"></asp:Label>
                                             </td>
                                             <td align="center" class="smalltabletext">
                                                <asp:Label id="Snd1" runat="server"></asp:Label>
                                             </td>
                                             <td align="center" class="smalltabletext">&nbsp;
                                                <asp:Label id="WidthVal" runat="server"></asp:Label>
                                             </td>
                                             <td align="center" class="smalltabletext">&nbsp;
                                                <asp:Label id="WidthPerc" runat="server"></asp:Label>
                                             </td>
                                             <td align="center" class="smalltabletext">
                                                <asp:Label ID="Dredge2" Runat="server"></asp:Label>
                                             </td>
                                             <td align="center" class="smalltabletext">
                                                <asp:Label ID="Snd2" Runat="server"></asp:Label>
                                             </td>
                                             <td align="center" class="smalltabletext">&nbsp;
                                                <asp:Label ID="WidthVal2" Runat="server"></asp:Label>
                                             </td>
                                             <td align="center" class="smalltabletext">&nbsp;
                                                <asp:Label ID="WidthPerc2" Runat="server"></asp:Label>
                                             </td>
                                          </tr>
                                       </ItemTemplate>
                                    </asp:repeater></TABLE>
                              </TD>
                              <TD vAlign="top" bgColor="ivory"></TD>
                           </TR>
                           <TR>
                              <TD colSpan="2"><FONT face="ARIAL" size="1"><BR>
                                    Note: </FONT><FONT face="ARIAL" size="1">All soundings are relative to local 
                                    low water level.<BR>
                                    <FONT face="ARIAL" size="1">Least soundings highlighted in <FONT color="#ff0000">RED</FONT>, 
                                       marked with * denote highspots and shoal areas within the navigation channel 
                                       limits.</FONT></FONT>
                              </TD>
                           </TR>
                        </TABLE>
                     </asp:panel><asp:panel id="PanelGraph" runat="server" Visible="False" Height="236px">
                        <cc1:gsnetwebchart id="GSNetWebChart1" runat="server" Width="595px" Height="400px" RunTimeImagesFolderLocation="UnderWebApplication"
                           RunTimeDir="Data/Temp" ImageFormat="Jpeg" MinutesOld="5">
                           <Chart ChartType="Line2D" Size="595, 400">
                              <ChartTitle IsVisible="False" Size="198, 40" Text="Chart Title" Location="198, 12">
                                 <Border FadedEdgeColor="White" RaisedLoweredColor="Gray" GradientDropShadowColor="Black"
                                    SimpleColor="Black" DropShadowColor="DimGray"></Border>
                                 <Background GradientStartColor="DeepSkyBlue" GradientEndColor="MediumBlue" PatternBackgroundColor="White"
                                    PatternForegroundColor="Black" Color="White" TransparentColor="Transparent"></Background>
                                 <TextFormat Font="Arial, 16px" HorizontalAlignment="Center" VerticalAlignment="Center" Color="Black"></TextFormat>
                              </ChartTitle>
                              <AnnotationList>
                                 <cc1:Annotation IsVisible="True" Size="372, 26" Text="Location (km)" Location="122, 330" AutoSizeText="False">
                                    <Border FadedEdgeColor="White" RaisedLoweredColor="Gray" GradientDropShadowColor="Black"
                                       SimpleColor="Black" DropShadowColor="DimGray"></Border>
                                    <Background GradientStartColor="DeepSkyBlue" GradientEndColor="MediumBlue" PatternBackgroundColor="White"
                                       PatternForegroundColor="Black" Color="White" TransparentColor="Transparent"></Background>
                                    <TextFormat Font="Arial, 12px" HorizontalAlignment="Center" VerticalAlignment="Near" Color="Black"></TextFormat>
                                 </cc1:Annotation>
                                 <cc1:Annotation IsVisible="True" Size="29, 335" Text="Riverbed Depth Below LLWL (m)" Location="5, 1"
                                    AutoSizeText="False">
                                    <Border FadedEdgeColor="White" RaisedLoweredColor="Gray" GradientDropShadowColor="Black"
                                       SimpleColor="Black" DropShadowColor="DimGray"></Border>
                                    <Background GradientStartColor="DeepSkyBlue" GradientEndColor="MediumBlue" PatternBackgroundColor="White"
                                       PatternForegroundColor="Black" Color="White" TransparentColor="Transparent"></Background>
                                    <TextFormat Font="Arial, 12px" HorizontalAlignment="Center" RotateAngle="-90" VerticalAlignment="Center"
                                       Color="Black"></TextFormat>
                                 </cc1:Annotation>
                              </AnnotationList>
                              <Legend BoxAlignment="CenterTop" IsVisible="True" BoxSize="23, 8" DisplayHorizontal="True"
                                 Size="119, 212" Location="458, 100" AutoTextColor="False">
                                 <Border FadedEdgeColor="White" RaisedLoweredColor="Gray" GradientDropShadowColor="Black"
                                    SimpleColor="Black" DropShadowColor="DimGray"></Border>
                                 <Background GradientStartColor="DeepSkyBlue" GradientEndColor="MediumBlue" PatternBackgroundColor="White"
                                    PatternForegroundColor="Black" Color="White" TransparentColor="Transparent"></Background>
                                 <TextFormat Font="Arial, 14px" HorizontalAlignment="Center" VerticalAlignment="Near" Color="Black"></TextFormat>
                              </Legend>
                              <Border FadedEdgeColor="White" BorderType="Simple" RaisedLoweredColor="Gray" GradientDropShadowColor="Black"
                                 SimpleColor="Black" DropShadowColor="DimGray"></Border>
                              <Grid Location="17, 60" MarginAxisRight="10" MarginAxisTop="10" Size="416, 320" IsVisible="True">
                                 <ErrorBarX>
                                    <LineProperties Color="Black"></LineProperties>
                                 </ErrorBarX>
                                 <Axis3DZ AxisMode="Category" Color="Black">
                                    <LabelProperties Font="Arial, 10pt" Color="Black"></LabelProperties>
                                    <GridLineProperties Color="Black"></GridLineProperties>
                                 </Axis3DZ>
                                 <Background GradientStartColor="DeepSkyBlue" GradientEndColor="MediumBlue" PatternBackgroundColor="White"
                                    PatternForegroundColor="Black" Color="White" TransparentColor="Transparent"></Background>
                                 <Axis3DY AxisMode="ValueLinear" MajorTickCount="5" LabelFormatMask="#0." Color="Black">
                                    <LabelProperties Font="Arial, 10pt" Color="Black"></LabelProperties>
                                    <GridLineProperties Color="Black"></GridLineProperties>
                                 </Axis3DY>
                                 <AxisFunnel Color="Black">
                                    <LabelProperties Font="Arial, 10pt" Color="Black"></LabelProperties>
                                    <FunnelFill GradientStartColor="DeepSkyBlue" GradientEndColor="MediumBlue" PatternBackgroundColor="White"
                                       PatternForegroundColor="Black" Color="White" TransparentColor="Transparent"></FunnelFill>
                                    <FunnelEndFill GradientStartColor="DeepSkyBlue" GradientEndColor="MediumBlue" PatternBackgroundColor="White"
                                       PatternForegroundColor="Black" Color="White" TransparentColor="Transparent"></FunnelEndFill>
                                 </AxisFunnel>
                                 <LimitLines>
                                    <FillProperties GradientStartColor="DeepSkyBlue" GradientEndColor="MediumBlue" PatternBackgroundColor="White"
                                       PatternForegroundColor="Black" Color="White" TransparentColor="Transparent"></FillProperties>
                                    <LineProperties Color="Black"></LineProperties>
                                 </LimitLines>
                                 <AxisRadar AxisMode="ValueLinear" Color="Black">
                                    <LabelProperties Font="Arial, 10pt" Color="Black"></LabelProperties>
                                    <GridLineProperties Color="Black"></GridLineProperties>
                                 </AxisRadar>
                                 <Cage WallThickness="8">
                                    <WallBottom IsVisible="True">
                                       <ExteriorBackground GradientStartColor="DeepSkyBlue" Transparency="65" GradientEndColor="MediumBlue"
                                          PatternBackgroundColor="White" PatternForegroundColor="Black" Color="LightGray" TransparentColor="Transparent"></ExteriorBackground>
                                       <InteriorBackground GradientStartColor="DeepSkyBlue" GradientEndColor="MediumBlue" PatternBackgroundColor="White"
                                          PatternForegroundColor="Black" Color="White" TransparentColor="Transparent"></InteriorBackground>
                                    </WallBottom>
                                    <WallLeft IsVisible="True">
                                       <ExteriorBackground GradientStartColor="DeepSkyBlue" Transparency="65" GradientEndColor="MediumBlue"
                                          PatternBackgroundColor="White" PatternForegroundColor="Black" Color="LightGray" TransparentColor="Transparent"></ExteriorBackground>
                                       <InteriorBackground GradientStartColor="DeepSkyBlue" GradientEndColor="MediumBlue" PatternBackgroundColor="White"
                                          PatternForegroundColor="Black" Color="White" TransparentColor="Transparent"></InteriorBackground>
                                    </WallLeft>
                                    <WallFront IsVisible="False">
                                       <ExteriorBackground GradientStartColor="DeepSkyBlue" Transparency="65" GradientEndColor="MediumBlue"
                                          PatternBackgroundColor="White" PatternForegroundColor="Black" Color="LightGray" TransparentColor="Transparent"></ExteriorBackground>
                                       <InteriorBackground GradientStartColor="DeepSkyBlue" GradientEndColor="MediumBlue" PatternBackgroundColor="White"
                                          PatternForegroundColor="Black" Color="White" TransparentColor="Transparent"></InteriorBackground>
                                    </WallFront>
                                    <Outline Color="228, 228, 228"></Outline>
                                    <WallTop IsVisible="False">
                                       <ExteriorBackground GradientStartColor="DeepSkyBlue" Transparency="65" GradientEndColor="MediumBlue"
                                          PatternBackgroundColor="White" PatternForegroundColor="Black" Color="LightGray" TransparentColor="Transparent"></ExteriorBackground>
                                       <InteriorBackground GradientStartColor="DeepSkyBlue" GradientEndColor="MediumBlue" PatternBackgroundColor="White"
                                          PatternForegroundColor="Black" Color="White" TransparentColor="Transparent"></InteriorBackground>
                                    </WallTop>
                                    <WallRight IsVisible="False">
                                       <ExteriorBackground GradientStartColor="DeepSkyBlue" Transparency="65" GradientEndColor="MediumBlue"
                                          PatternBackgroundColor="White" PatternForegroundColor="Black" Color="LightGray" TransparentColor="Transparent"></ExteriorBackground>
                                       <InteriorBackground GradientStartColor="DeepSkyBlue" GradientEndColor="MediumBlue" PatternBackgroundColor="White"
                                          PatternForegroundColor="Black" Color="White" TransparentColor="Transparent"></InteriorBackground>
                                    </WallRight>
                                    <WallBack IsVisible="True">
                                       <ExteriorBackground GradientStartColor="DeepSkyBlue" Transparency="65" GradientEndColor="MediumBlue"
                                          PatternBackgroundColor="White" PatternForegroundColor="Black" Color="LightGray" TransparentColor="Transparent"></ExteriorBackground>
                                       <InteriorBackground GradientStartColor="DeepSkyBlue" GradientEndColor="MediumBlue" PatternBackgroundColor="White"
                                          PatternForegroundColor="Black" Color="White" TransparentColor="Transparent"></InteriorBackground>
                                    </WallBack>
                                 </Cage>
                                 <Axis3DX AxisMode="Category" MajorTickInterval="1" Color="Black">
                                    <LabelProperties Font="Arial, 10pt" Color="Black"></LabelProperties>
                                    <GridLineProperties Color="Black"></GridLineProperties>
                                 </Axis3DX>
                                 <Border FadedEdgeColor="White" RaisedLoweredColor="Gray" GradientDropShadowColor="Black"
                                    SimpleColor="Black" DropShadowColor="DimGray"></Border>
                                 <AxisY MinAxisValueUser="8" AxisScale="UserDefined" AxisMode="ValueLinear" GridLinesOn="True"
                                    MinorTicks="4" MajorTickCount="8" LabelFormatMask="#0.0;#0.0" AxisPosition="Left" TickMode="OnStartAtMinValue"
                                    MaxAxisValueUser="12" Color="Black" DisplayOriginLine="True" TickDrawStyle="OutsideAxis">
                                    <DateMaxAxisValueUser Time="00:00:00" Date=""></DateMaxAxisValueUser>
                                    <DateMinAxisValueUser Time="00:00:00" Date=""></DateMinAxisValueUser>
                                    <LabelProperties Font="Arial, 7pt" Color="Black"></LabelProperties>
                                    <GridLineProperties Color="169, 169, 169"></GridLineProperties>
                                    <OriginLine Color="Black"></OriginLine>
                                 </AxisY>
                                 <AxisX MinAxisValueUser="1" AxisScale="UserDefined" AxisMode="ValueLinear" GridLinesOn="True"
                                    MajorTickInterval="1" MajorTickCount="34" LabelFormatMask="#0" AxisPosition="Bottom"
                                    TickMode="OnStartAtMinValue" MaxAxisValueUser="35" Color="Black" TickDrawStyle="OutsideAxis">
                                    <DateMaxAxisValueUser Time="00:00:00" Date=""></DateMaxAxisValueUser>
                                    <DateMinAxisValueUser Time="00:00:00" Date=""></DateMinAxisValueUser>
                                    <LabelProperties Font="Arial, 6pt" Color="Black"></LabelProperties>
                                    <GridLineProperties Transparency="75" Color="63, 169, 169, 169"></GridLineProperties>
                                    <OriginLine Color="Black"></OriginLine>
                                 </AxisX>
                                 <AxisYPrime AxisMode="ValueLinear" Color="Black">
                                    <DateMaxAxisValueUser Time="00:00:00" Date=""></DateMaxAxisValueUser>
                                    <OriginLine Color="Black"></OriginLine>
                                    <LabelProperties Font="Arial, 10pt" Color="Black"></LabelProperties>
                                    <GridLineProperties Color="Black"></GridLineProperties>
                                    <DateMinAxisValueUser Time="00:00:00" Date=""></DateMinAxisValueUser>
                                 </AxisYPrime>
                                 <AxisPie AxisMode="Category" Color="Black">
                                    <GridLineProperties Color="Black"></GridLineProperties>
                                    <LabelProperties Font="Arial, 10pt" Color="Black"></LabelProperties>
                                 </AxisPie>
                                 <AxisXPrime AxisMode="Category" Color="Black">
                                    <GridLineProperties Color="Black"></GridLineProperties>
                                    <DateMaxAxisValueUser Time="00:00:00" Date=""></DateMaxAxisValueUser>
                                    <DateMinAxisValueUser Time="00:00:00" Date=""></DateMinAxisValueUser>
                                    <LabelProperties Font="Arial, 10pt" Color="Black"></LabelProperties>
                                    <OriginLine Color="Black"></OriginLine>
                                 </AxisXPrime>
                                 <AxisBackground GradientStartColor="DeepSkyBlue" GradientEndColor="MediumBlue" PatternBackgroundColor="White"
                                    PatternForegroundColor="Black" Color="White" TransparentColor="Transparent"></AxisBackground>
                                 <SurfaceChart MinColor="White" MaxColor="Black">
                                    <SideWallsFill GradientStartColor="DeepSkyBlue" GradientEndColor="MediumBlue" PatternBackgroundColor="White"
                                       PatternForegroundColor="Black" Color="PaleGoldenrod" TransparentColor="Transparent"></SideWallsFill>
                                 </SurfaceChart>
                                 <AxisRadial AxisMode="ValueLinear" Color="Black">
                                    <LabelProperties Font="Arial, 10pt" Color="Black"></LabelProperties>
                                    <GridLineProperties Color="Black"></GridLineProperties>
                                 </AxisRadial>
                                 <AxisAngular AxisMode="ValueLinear" Color="Black">
                                    <LabelProperties Font="Arial, 10pt" Color="Black"></LabelProperties>
                                    <GridLineProperties Color="Black"></GridLineProperties>
                                 </AxisAngular>
                                 <ErrorBarY>
                                    <LineProperties Color="Black"></LineProperties>
                                 </ErrorBarY>
                              </Grid>
                              <Background GradientStartColor="DeepSkyBlue" GradientEndColor="MediumBlue" PatternBackgroundColor="White"
                                 PatternForegroundColor="Black" Color="White" TransparentColor="Transparent"></Background>
                              <SeriesDrawingList>
                                 <cc1:SeriesDrawing ColorCloseHigher="White" ColorCloseLower="Red" LinesOn="True" SeriesName="Series 1">
                                    <GanttCompletionFill GradientStartColor="DeepSkyBlue" GradientEndColor="MediumBlue" PatternBackgroundColor="White"
                                       PatternForegroundColor="Black" Color="White" TransparentColor="Transparent"></GanttCompletionFill>
                                    <MarkerLine Color="220, 20, 60"></MarkerLine>
                                    <Symbol PatternColor="Black">
                                       <Background GradientStartColor="DeepSkyBlue" GradientEndColor="MediumBlue" PatternBackgroundColor="White"
                                          PatternForegroundColor="Black" Color="Crimson" TransparentColor="Transparent"></Background>
                                       <Outline Color="Black"></Outline>
                                    </Symbol>
                                    <MarkerLabelProperties Font="Arial, 10pt" Color="Black"></MarkerLabelProperties>
                                    <MarkerOutline Color="Black"></MarkerOutline>
                                    <MarkerFill GradientStartColor="DeepSkyBlue" GradientEndColor="MediumBlue" PatternBackgroundColor="White"
                                       PatternForegroundColor="Black" Color="Crimson" TransparentColor="Transparent"></MarkerFill>
                                 </cc1:SeriesDrawing>
                                 <cc1:SeriesDrawing ColorCloseHigher="White" ColorCloseLower="Red" LinesOn="True" SeriesName="Series 2">
                                    <GanttCompletionFill GradientStartColor="DeepSkyBlue" GradientEndColor="MediumBlue" PatternBackgroundColor="White"
                                       PatternForegroundColor="Black" Color="White" TransparentColor="Transparent"></GanttCompletionFill>
                                    <MarkerLine Color="30, 144, 255"></MarkerLine>
                                    <Symbol PatternColor="Black" Shape="Circle">
                                       <Background GradientStartColor="DeepSkyBlue" GradientEndColor="MediumBlue" PatternBackgroundColor="White"
                                          PatternForegroundColor="Black" Color="DodgerBlue" TransparentColor="Transparent"></Background>
                                       <Outline Color="Black"></Outline>
                                    </Symbol>
                                    <MarkerLabelProperties Font="Arial, 10pt" Color="Black"></MarkerLabelProperties>
                                    <MarkerOutline Color="Black"></MarkerOutline>
                                    <MarkerFill GradientStartColor="DeepSkyBlue" GradientEndColor="MediumBlue" PatternBackgroundColor="White"
                                       PatternForegroundColor="Black" Color="DodgerBlue" TransparentColor="Transparent"></MarkerFill>
                                 </cc1:SeriesDrawing>
                                 <cc1:SeriesDrawing ColorCloseHigher="White" ColorCloseLower="Red" LinesOn="True" SeriesName="Series 1">
                                    <GanttCompletionFill GradientStartColor="DeepSkyBlue" GradientEndColor="MediumBlue" PatternBackgroundColor="White"
                                       PatternForegroundColor="Black" Color="White" TransparentColor="Transparent"></GanttCompletionFill>
                                    <MarkerLine Color="220, 20, 60"></MarkerLine>
                                    <Symbol PatternColor="Black">
                                       <Background GradientStartColor="DeepSkyBlue" GradientEndColor="MediumBlue" PatternBackgroundColor="White"
                                          PatternForegroundColor="Black" Color="Crimson" TransparentColor="Transparent"></Background>
                                       <Outline Color="Black"></Outline>
                                    </Symbol>
                                    <MarkerLabelProperties Font="Arial, 10pt" Color="Black"></MarkerLabelProperties>
                                    <MarkerOutline Color="Black"></MarkerOutline>
                                    <MarkerFill GradientStartColor="DeepSkyBlue" GradientEndColor="MediumBlue" PatternBackgroundColor="White"
                                       PatternForegroundColor="Black" Color="Crimson" TransparentColor="Transparent"></MarkerFill>
                                 </cc1:SeriesDrawing>
                                 <cc1:SeriesDrawing ColorCloseHigher="White" ColorCloseLower="Red" LinesOn="True" SeriesName="Series 2">
                                    <GanttCompletionFill GradientStartColor="DeepSkyBlue" GradientEndColor="MediumBlue" PatternBackgroundColor="White"
                                       PatternForegroundColor="Black" Color="White" TransparentColor="Transparent"></GanttCompletionFill>
                                    <MarkerLine Color="30, 144, 255"></MarkerLine>
                                    <Symbol PatternColor="Black" Shape="Circle">
                                       <Background GradientStartColor="DeepSkyBlue" GradientEndColor="MediumBlue" PatternBackgroundColor="White"
                                          PatternForegroundColor="Black" Color="DodgerBlue" TransparentColor="Transparent"></Background>
                                       <Outline Color="Black"></Outline>
                                    </Symbol>
                                    <MarkerLabelProperties Font="Arial, 10pt" Color="Black"></MarkerLabelProperties>
                                    <MarkerOutline Color="Black"></MarkerOutline>
                                    <MarkerFill GradientStartColor="DeepSkyBlue" GradientEndColor="MediumBlue" PatternBackgroundColor="White"
                                       PatternForegroundColor="Black" Color="DodgerBlue" TransparentColor="Transparent"></MarkerFill>
                                 </cc1:SeriesDrawing>
                              </SeriesDrawingList>
                           </Chart>
                        </cc1:gsnetwebchart>
                     </asp:panel></TD>
               <TR>
                  <TD style="HEIGHT: 2px" vAlign="top" colSpan="2"></TD>
               </TR>
               <TR>
                  <TD colSpan="2"><uc1:reportfooter id="Reportfooter1" runat="server"></uc1:reportfooter></TD>
               </TR>
            </TBODY>
         </TABLE>
      </form>
      </TR></TBODY></TABLE></TR></TBODY></TABLE></FORM>
   </body>
</HTML>
