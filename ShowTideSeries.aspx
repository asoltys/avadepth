<%@ Register TagPrefix="uc1" TagName="reportHeader" Src="reportHeader.ascx" %>
<%@ Register TagPrefix="uc1" TagName="reportfooter" Src="reportfooter.ascx" %>
<%@ Register TagPrefix="cc1" Namespace="GraphicsServer.GSNet.Charting" Assembly="GSNetWin" %>
<%@ Page Language="vb" AutoEventWireup="false" Codebehind="ShowTideSeries.aspx.vb" Inherits="AvadepthNet.AvadepthNet.web.ShowTideSeries"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
   <HEAD>
      <title>ShowTideSeries</title>
      <meta content="Microsoft Visual Studio .NET 7.1" name="GENERATOR">
      <meta content="Visual Basic .NET 7.1" name="CODE_LANGUAGE">
      <meta content="JavaScript" name="vs_defaultClientScript">
      <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
      <LINK href="Styles.css" type="text/css" rel="stylesheet">

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
      <DIV style="Z-INDEX: 101; LEFT: 8px; WIDTH: 100%; POSITION: absolute; TOP: 8px; HEIGHT: 626px"
         ms_positioning="FlowLayout">
         <FORM id="Form2" method="post" runat="server">
            <TABLE id="Table1" height="400" width="100%" border="0">
               <TR>
                  <TD>&nbsp;
                     <uc1:reportheader id="ReportHeader1" runat="server"></uc1:reportheader></TD>
               </TR>
               <TR>
                  <TD style="HEIGHT: 61px" align="center">
                     <P>
                        <asp:label id="lblTitle" runat="server" CssClass="report-main-header" Width="460px">Predicted Water Levels</asp:label><BR>
                        <asp:label id="lblMain" runat="server" Width="460px" CssClass="report-main-header">For Day, Month Day, Year</asp:label><BR>
                        <asp:label id="lblSubtitle1" runat="server" Width="432px" CssClass="report-header">Maximum Depth & Transit Time Report - 2 hr window</asp:label><BR>
                        <asp:label id="lblSubtitle2" runat="server" Width="432px" CssClass="report-header">From Monday, January 12, 2004 to Tuesday, January 13, 2004</asp:label></P>
                  </TD>
               </TR>
               </TD></TR>
               <TR>
                  <TD><asp:panel id="PanelTable" runat="server">
                        <asp:table id="tableTides" runat="server" Width="100%" BorderWidth="1px" BorderStyle="Solid"
                           GridLines="Vertical" CellSpacing="0" CellPadding="2">
                           <asp:TableRow>
                              <asp:TableCell BackColor="Ivory" RowSpan="2" ColumnSpan="1" Font-Bold="True" HorizontalAlign="Center"
                                 Text="Time (PST)"></asp:TableCell>
                              <asp:TableCell BackColor="Ivory" ColumnSpan="12" Font-Bold="True" HorizontalAlign="Center" Text="Location Sandheads Km 0 to Port Mann Km "></asp:TableCell>
                           </asp:TableRow>
                        </asp:table>
                        <BR>
                        <asp:label id="lblNote" runat="server" Width="576px" Height="32px">* Water level is referenced to Chart Datum which is relative to Local Low Water.<BR>Click on a time or location to display a graph.</asp:label>
                        <asp:label id="lblNote2" runat="server">* Velocities are in metres per second.  Negative values indicate a flow in an upstream direction as a result of tides.</asp:label>
                     </asp:panel></TD>
               </TR>
               <TR>
                  <td><asp:panel id="PanelGraph" runat="server" Visible="False">
                        <CENTER>
                           <cc1:GSNetWebChart id="GSNetWebChart1" runat="server" Width="590px" Height="400px" RunTimeDir="Data/Temp"
                              RunTimeImagesFolderLocation="UnderWebApplication" ImageFormat="Jpeg">
                              <Chart ChartType="Line2D" Size="590, 400">
                                 <ChartTitle IsVisible="False" Size="196, 40" Text="Chart Title" Location="197, 12">
                                    <Border FadedEdgeColor="White" RaisedLoweredColor="Gray" GradientDropShadowColor="Black"
                                       SimpleColor="Black" DropShadowColor="DimGray"></Border>
                                    <Background GradientStartColor="DeepSkyBlue" GradientEndColor="MediumBlue" PatternBackgroundColor="White"
                                       PatternForegroundColor="Black" Color="White" TransparentColor="Transparent"></Background>
                                    <TextFormat Font="Arial, 16px" HorizontalAlignment="Center" VerticalAlignment="Center" Color="Black"></TextFormat>
                                 </ChartTitle>
                                 <AnnotationList>
                                    <cc1:Annotation IsVisible="True" Size="550, 27" Text="Location (km)" Location="26, 370" AutoSizeText="False">
                                       <Border FadedEdgeColor="White" RaisedLoweredColor="Gray" GradientDropShadowColor="Black"
                                          SimpleColor="Black" DropShadowColor="DimGray"></Border>
                                       <Background GradientStartColor="DeepSkyBlue" GradientEndColor="MediumBlue" PatternBackgroundColor="White"
                                          PatternForegroundColor="Black" Color="White" TransparentColor="Transparent"></Background>
                                       <TextFormat Font="Arial, 10px" HorizontalAlignment="Center" VerticalAlignment="Near" Color="Black"></TextFormat>
                                    </cc1:Annotation>
                                    <cc1:Annotation IsVisible="True" Size="20, 350" Text="Water Level (metres) relative to LWD" Location="8, 1"
                                       AutoSizeText="False">
                                       <Border FadedEdgeColor="White" RaisedLoweredColor="Gray" GradientDropShadowColor="Black"
                                          SimpleColor="Black" DropShadowColor="DimGray"></Border>
                                       <Background GradientStartColor="DeepSkyBlue" GradientEndColor="MediumBlue" PatternBackgroundColor="White"
                                          PatternForegroundColor="Black" Color="White" TransparentColor="Transparent"></Background>
                                       <TextFormat Font="Arial, 10px" HorizontalAlignment="Center" RotateAngle="-90" VerticalAlignment="Center"
                                          Color="Black"></TextFormat>
                                    </cc1:Annotation>
                                 </AnnotationList>
                                 <Legend BoxAlignment="CenterTop" IsVisible="False" BoxSize="25, 8" MarginBottom="0" DisplayHorizontal="True"
                                    Size="118, 212" Location="454, 100" MarginTop="0" MarginLeft="0" MarginRight="0" AutoTextColor="False">
                                    <Border FadedEdgeColor="White" BorderType="Simple" RaisedLoweredColor="Gray" GradientDropShadowColor="Black"
                                       SimpleColor="Black" DropShadowColor="DimGray"></Border>
                                    <Background GradientStartColor="DeepSkyBlue" GradientEndColor="MediumBlue" PatternBackgroundColor="White"
                                       PatternForegroundColor="Black" Color="White" TransparentColor="Transparent"></Background>
                                    <TextFormat Font="Arial, 8pt" HorizontalAlignment="Center" VerticalAlignment="Near" Color="Black"></TextFormat>
                                 </Legend>
                                 <Border FadedEdgeColor="White" BorderType="Simple" RaisedLoweredColor="Gray" GradientDropShadowColor="Black"
                                    SimpleColor="Black" DropShadowColor="DimGray"></Border>
                                 <Grid Location="17, 60" MarginAxisRight="10" MarginAxisTop="10" Size="413, 320" IsVisible="True">
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
                                       MinorTicks="4" MajorTickCount="8" LabelFormatMask="#0.00" AxisPosition="Variable" TickMode="OnStartAtMinValue"
                                       MaxAxisValueUser="12" Color="Black" DisplayOriginLine="True" TickDrawStyle="OutsideAxis">
                                       <DateMaxAxisValueUser Time="00:00:00" Date=""></DateMaxAxisValueUser>
                                       <DateMinAxisValueUser Time="00:00:00" Date=""></DateMinAxisValueUser>
                                       <LabelProperties Font="Arial, 7pt" Color="Black"></LabelProperties>
                                       <GridLineProperties Color="169, 169, 169"></GridLineProperties>
                                       <OriginLine Color="Black" Thickness="3"></OriginLine>
                                    </AxisY>
                                    <AxisX MinAxisValueUser="1" AxisMode="Category" GridLinesOn="True" MajorTickInterval="1"
                                       MajorTickCount="10" LabelFormatMask="##" AxisPosition="Bottom" MaxAxisValueUser="11"
                                       Color="Black" TickDrawStyle="OutsideAxis">
                                       <DateMaxAxisValueUser Time="00:00:00" Date=""></DateMaxAxisValueUser>
                                       <DateMinAxisValueUser Time="00:00:00" Date=""></DateMinAxisValueUser>
                                       <LabelProperties Font="Arial, 7pt" Color="Black"></LabelProperties>
                                       <GridLineProperties Transparency="75" Color="63, 169, 169, 169"></GridLineProperties>
                                       <OriginLine Color="Black"></OriginLine>
                                    </AxisX>
                                    <AxisYPrime AxisMode="ValueLinear" Color="Black" DisplayOriginLine="True">
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
                                 </SeriesDrawingList>
                              </Chart>
                           </cc1:GSNetWebChart><BR>
                           <BR>
                           <asp:ImageButton id="ImageButton1" runat="server" ImageUrl="images/btnBack.gif"></asp:ImageButton></CENTER>
                     </asp:panel></td>
               </TR>
               <TR>
                  <TD><uc1:reportfooter id="Reportfooter1" runat="server"></uc1:reportfooter></TD>
               </TR>
            </TABLE>
         </FORM>
      </DIV>
   </body>
</HTML>
