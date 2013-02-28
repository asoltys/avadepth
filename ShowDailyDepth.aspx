<%@ Register TagPrefix="uc1" TagName="reportHeader" Src="reportHeader.ascx" %>
<%@ Page Language="vb" AutoEventWireup="false" Codebehind="ShowDailyDepth.aspx.vb" Inherits="AvadepthNet.AvadepthNet.web.ShowDailyDepth" %>
<%@ Register TagPrefix="uc1" TagName="reportfooter" Src="reportfooter.ascx" %>
<%@ Register TagPrefix="cc1" Namespace="GraphicsServer.GSNet.Charting" Assembly="GSNetWin" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
   <HEAD>
      <title>Daily Depth Report</title>
      <meta content="Microsoft Visual Studio .NET 7.1" name="GENERATOR">
      <meta content="Visual Basic .NET 7.1" name="CODE_LANGUAGE">
      <meta content="JavaScript" name="vs_defaultClientScript">
      <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
      <LINK href="styles.css" type="text/css" rel="stylesheet">

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
      <table id="TABLEFORMAT" height="600" width="600" border="0">
         <tr>
            <td colSpan="2">
               <P><uc1:reportheader id="ReportHeader1" runat="server"></uc1:reportheader></P>
            </td>
         </tr>
         <TR>
            <TD align="center" colSpan="2">
               <DIV class="report-main-header">
                  <asp:label id="lblTitle" runat="server" Width="441px" EnableViewState="False" CssClass="report-main-header">Available Depth Report</asp:label><asp:label id="lblMain" runat="server" CssClass="report-main-header" EnableViewState="False"
                     Width="441px">For Day, Month Day, Year</asp:label><asp:label id="lblSubtitle1" runat="server" CssClass="report-header" EnableViewState="False"
                     Width="441px">For Day, Month Day, Year</asp:label><br>
                  <asp:label id="lblSubtitle2" runat="server" CssClass="report-header" EnableViewState="False"
                     Width="441px">For Day, Month Day, Year</asp:label><br>
                  <asp:label id="lblSubtitle3" runat="server" CssClass="report-header" EnableViewState="False"
                     Width="441px">For Day, Month Day, Year</asp:label></DIV>
            </TD>
         </TR>
         <tr>
            <td vAlign="top">
               <TABLE class="tableborder" id="TableInner" height="400" cellSpacing="1" cellPadding="1"
                  width="295">
                  <TR>
                     <td class="smalltabletext" colspan="5" align="center"><B>Location of Control Point</B></td>
                  </TR>
                  <TR>
                     <TD class="smalltabletext" style="WIDTH: 40px" align="center">&nbsp;Time<BR>
                        (pst)</TD>
                     <TD class="smalltabletext" style="WIDTH: 55px">Chainage<BR>
                        (km)</TD>
                     <TD class="smalltabletext" style="WIDTH: 75px" align="center">Available<BR>
                        Depth (m)</TD>
                     <TD class="smalltabletext" align="left">Location<BR>
                        &nbsp;
                     </TD>
                  </TR>
                  <tr>
                     <td colSpan="4" height="5">
                        <hr SIZE="1">
                     </td>
                  </tr>
                  <asp:repeater id="RepeatInner" runat="server">
                     <ItemTemplate>
                        <tr class="tableborder">
                           <td align="center" class="smalltabletext">
                              <asp:HyperLink id="HyperLink1" NavigateUrl='<%# "VerifyDepth.aspx?Lane=" & DataBinder.Eval(Container.DataItem, "Lane") & "&period=" & DataBinder.Eval(Container.DataItem, "PeriodValue") %>' runat="server">
                                 <%#DataBinder.Eval(Container.DataItem, "Period")%>
                              </asp:HyperLink>
                           </td>
                           <td align="left" class="smalltabletext">
                              <%#DataBinder.Eval(Container.DataItem, "Chainage")%>
                           </td>
                           <td align="center" class="smalltabletext">
                              <%#DataBinder.Eval(Container.DataItem, "Depth")%>
                           </td>
                           <td align="left" class="smalltabletext">
                              <%#DataBinder.Eval(Container.DataItem, "Location")%>
                           </td>
                        </tr>
                     </ItemTemplate>
                     <AlternatingItemTemplate>
                        <tr class="tableborder" bgcolor="Gainsboro">
                           <td align="center" class="smalltabletext">
                              <asp:HyperLink id="Hyperlink2" NavigateUrl='<%# "VerifyDepth.aspx?Lane=" & DataBinder.Eval(Container.DataItem, "Lane") & "&period=" & DataBinder.Eval(Container.DataItem, "PeriodValue") %>' runat="server">
                                 <%#DataBinder.Eval(Container.DataItem, "Period")%>
                              </asp:HyperLink>
                           </td>
                           <td align="left" class="smalltabletext">
                              <%#DataBinder.Eval(Container.DataItem, "Chainage")%>
                           </td>
                           <td align="center" class="smalltabletext">
                              <%#DataBinder.Eval(Container.DataItem, "Depth")%>
                           </td>
                           <td align="left" class="smalltabletext">
                              <%#DataBinder.Eval(Container.DataItem, "Location")%>
                           </td>
                        </tr>
                     </AlternatingItemTemplate>
                  </asp:repeater>
                  <tr>
                     <td colSpan="4">&nbsp;</td>
                  </tr>
               </TABLE>
            </td>
            <TD vAlign="top"><cc1:gsnetwebchart id="chtmain" runat="server" Width="300px" Height="400px" RunTimeImagesFolderLocation="UnderWebApplication"
                  RunTimeDir="Data/Temp" ImageFormat="Jpeg">
                  <Chart ChartType="Line2D" Size="300, 400" AutoSizeText="False">
                     <ChartTitle IsVisible="False" Size="100, 40" Text="Chart Title" Location="100, 12" AutoSizeText="False">
                        <Border FadedEdgeColor="White" RaisedLoweredColor="Gray" GradientDropShadowColor="Black"
                           SimpleColor="Black" DropShadowColor="DimGray"></Border>
                        <Background GradientStartColor="DeepSkyBlue" GradientEndColor="MediumBlue" PatternBackgroundColor="White"
                           PatternForegroundColor="Black" Color="White" TransparentColor="Transparent"></Background>
                        <TextFormat Font="Arial, 16px" HorizontalAlignment="Center" VerticalAlignment="Center" Color="Black"></TextFormat>
                     </ChartTitle>
                     <AnnotationList>
                        <cc1:Annotation IsVisible="True" Size="221, 20" Text="Pacific Standard Time (hrs)" Location="44, 365"
                           AutoSizeText="False">
                           <Border FadedEdgeColor="White" RaisedLoweredColor="Gray" GradientDropShadowColor="Black"
                              SimpleColor="Black" DropShadowColor="DimGray"></Border>
                           <Background GradientStartColor="DeepSkyBlue" GradientEndColor="MediumBlue" PatternBackgroundColor="White"
                              PatternForegroundColor="Black" Color="White" TransparentColor="Transparent"></Background>
                           <TextFormat Font="Arial, 8pt" HorizontalAlignment="Center" VerticalAlignment="Near" Color="Black"></TextFormat>
                        </cc1:Annotation>
                        <cc1:Annotation IsVisible="True" Size="16, 350" Text="Available Depth (m)" Location="9, 1" AutoSizeText="False">
                           <Border FadedEdgeColor="White" RaisedLoweredColor="Gray" GradientDropShadowColor="Black"
                              SimpleColor="Black" DropShadowColor="DimGray"></Border>
                           <Background GradientStartColor="DeepSkyBlue" GradientEndColor="MediumBlue" PatternBackgroundColor="White"
                              PatternForegroundColor="Black" Color="White" TransparentColor="Transparent"></Background>
                           <TextFormat Font="Arial, 8pt" HorizontalAlignment="Center" RotateAngle="-90" VerticalAlignment="Center"
                              Color="Black"></TextFormat>
                        </cc1:Annotation>
                     </AnnotationList>
                     <Legend IsVisible="False" BoxSize="27, 20" Size="60, 212" Location="231, 100" AutoTextColor="False">
                        <Border FadedEdgeColor="White" BorderType="Simple" RaisedLoweredColor="Gray" GradientDropShadowColor="Black"
                           SimpleColor="Black" DropShadowColor="DimGray"></Border>
                        <Background GradientStartColor="DeepSkyBlue" GradientEndColor="MediumBlue" PatternBackgroundColor="White"
                           PatternForegroundColor="Black" Color="White" TransparentColor="Transparent"></Background>
                        <TextFormat Font="Arial, 10pt" HorizontalAlignment="Center" VerticalAlignment="Center" Color="Black"></TextFormat>
                     </Legend>
                     <Border FadedEdgeColor="White" BorderType="Simple" RaisedLoweredColor="Gray" GradientDropShadowColor="Black"
                        SimpleColor="Black" DropShadowColor="DimGray"></Border>
                     <Grid Location="9, 60" Size="210, 320" IsVisible="True">
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
                           MinorTicks="4" MajorTickCount="8" LabelFormatMask="#0.0" AxisPosition="Variable" TickMode="OnStartAtMinValue"
                           MaxAxisValueUser="12" Color="Black" TickDrawStyle="OutsideAxis">
                           <DateMaxAxisValueUser Time="00:00:00" Date=""></DateMaxAxisValueUser>
                           <DateMinAxisValueUser Time="00:00:00" Date=""></DateMinAxisValueUser>
                           <LabelProperties Font="Arial, 7pt" Color="Black"></LabelProperties>
                           <GridLineProperties Color="169, 169, 169"></GridLineProperties>
                           <OriginLine Color="Black"></OriginLine>
                        </AxisY>
                        <AxisX AxisMode="Category" GridLinesOn="True" MajorTickInterval="1" AxisPosition="Variable"
                           Color="Black" TickDrawStyle="OutsideAxis">
                           <DateMaxAxisValueUser Time="00:00:00" Date=""></DateMaxAxisValueUser>
                           <DateMinAxisValueUser Time="00:00:00" Date=""></DateMinAxisValueUser>
                           <LabelProperties Font="Arial, 7pt" Color="Black"></LabelProperties>
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
                     </SeriesDrawingList>
                  </Chart>
               </cc1:gsnetwebchart></TD>
         <tr>
            <td colSpan="2"><uc1:reportfooter id="Reportfooter1" runat="server"></uc1:reportfooter></td>
         </tr>
      </table>
      </TD></TR><tr>
         <IMG style="Z-INDEX: 101; LEFT: 56px; POSITION: absolute; TOP: 56px" height="16" src="spacer.gif"
            width="1" align="middle" border="0">
      </tr>
      </TABLE>
   </body>
</HTML>
