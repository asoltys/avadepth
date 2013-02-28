<%@ Page Language="vb" AutoEventWireup="false" Codebehind="ShowSoundingsHistory.aspx.vb" Inherits="AvadepthNet.AvadepthNet.web.ShowSoundingsHistory"%>
<%@ Register TagPrefix="uc1" TagName="reportHeader" Src="reportHeader.ascx" %>
<%@ Register TagPrefix="uc1" TagName="reportfooter" Src="reportfooter.ascx" %>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<HTML>
   <HEAD>
      <title>Soundings History</title>
      <meta content="Microsoft Visual Studio .NET 7.1" name="GENERATOR">
      <meta content="Visual Basic .NET 7.1" name="CODE_LANGUAGE">
      <meta content="JavaScript" name="vs_defaultClientScript">
      <meta content="http://schemas.microsoft.com/intellisense/ie5" name="vs_targetSchema">
      <LINK href="styles.css" type="text/css" rel="stylesheet">
      <link rel="stylesheet" type="text/css" href="css/smoothness/jquery-ui-1.7.1.custom.css">
      <script type='text/javascript' src="Scripts/jquery-1.3.2.min.js"></script>
      <script type='text/javascript' src="Scripts/jquery-ui-1.7.1.custom.min.js"></script>
      <script type="text/javascript" src="Scripts/jquery.hint.js"></script>
      <script type="text/javascript" src="Scripts/jquery.corner.js"></script>
      <script type="text/javascript" src="Scripts/jquery.layout.min.js"></script>
      <script type="text/javascript" src="Scripts/jquery.loading.min.js"></script>
      <script language="javascript">
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
      <form id="Form2" method="post" runat="server">
               <TABLE id="TABLEFORMAT" style="Z-INDEX: 101" height="500" width="600" border="0">
                  <TBODY>
                     <TR>
                        <TD colSpan="2">
                           <P><uc1:reportheader id="ReportHeader1" runat="server"></uc1:reportheader></P>
                        </TD>
                     </TR>
                     <TR>
                        <TD align="center" colSpan="2">
                           <DIV class="report-main-header">
                              <asp:label id="lblTitle" runat="server" Width="405px" CssClass="report-main-header">History of Least Soundings & Available Widths</asp:label><asp:label id="lblMain" runat="server" CssClass="report-main-header" Width="405px">For Day, Month Day, Year</asp:label></DIV>
                           <asp:label id="lblSubtitle1" runat="server" CssClass="report-header" Width="392px">For Day, Month Day, Year</asp:label><BR>
                        </TD>
                     </TR>
                     <TR>
                        <TD style="HEIGHT: 427px" vAlign="top"><asp:panel id="PanelReport" runat="server">
                              <asp:HyperLink id="HyperLinkLane" runat="server" Width="240px" Height="8px" NavigateUrl="ShowSoundingsHistory.aspx"
                                 Font-Names="Arial" Font-Size="10pt"> Display Outer Channel History</asp:HyperLink>
                              <BR>
                              <asp:HyperLink id="HyperLink1" runat="server" Width="176px" Height="8px" NavigateUrl="ShowSoundings.aspx"
                                 Font-Names="Arial" Font-Size="10pt">Back to Channel Conditions</asp:HyperLink>
                              <br>
                              <br>
                              <TABLE id="Wrap" border="0">
                                 <TR>
                                    <TD vAlign="top">
                                       <TABLE id="TableInner" class="tableborder" style="WIDTH: 600px" border="0">
                                          <TR valign="top">
                                             <TD class="smalltabletext" rowspan="2" vAlign="top">Date of Survey</TD>
                                             <TD class="smalltabletext" rowspan="2" vAlign="top">Reference Plan</TD>
                                             <TD class="smalltabletext" rowspan="2" vAlign="top" align="center">Design<br>
                                                Grade (m)</TD>
                                             <TD class="smalltabletext" align="center">Least Soundings</TD>
                                             <TD class="smalltabletext" align="center" colSpan="2">Available Width</TD>
                                          </TR>
                                          <TR>
                                             <TD class="smalltabletext" align="center">(m)</TD>
                                             <TD class="smalltabletext" align="center">(m)</TD>
                                             <TD class="smalltabletext" align="center">(%)</TD>
                                          </TR>
                                          <TR>
                                             <TD colSpan="7" height="1">
                                                <HR SIZE="1">
                                             </TD>
                                          </TR>
                                          <asp:repeater id="RepeatInner" runat="server" OnItemDataBound="RepeatInner_ItemDataBound">
                                             <AlternatingItemTemplate>
                                                <tr bgcolor="Gainsboro">
                                                   <td class="smalltabletext">
                                                      <%# format(DataBinder.Eval(Container.DataItem, "date"),"d-MMM-yyyy") %>
                                                   </td>
                                                   <td class="smalltabletext">
                                                      <asp:HyperLink runat="server" NavigateUrl='<%# "Data/dwf/" + DataBinder.Eval(Container.DataItem, "Plan") + ".dwf" %>' ID="PlanLink1" NAME="PlanLink1" Target=_blank >
                                                         <%# DataBinder.Eval(Container.DataItem, "Plan") %>
                                                      </asp:HyperLink>
                                                   </td>
                                                   <td align="center" class="smalltabletext">
                                                      <asp:hyperlink name="Grade" id="Hyperlink3" runat="server">
                                                         <%#DataBinder.Eval(Container.DataItem, "Grade")%>
                                                      </asp:hyperlink>
                                                   </td>
                                                   <td align="center" class="smalltabletext">
                                                      <%# formatnumber(DataBinder.Eval(Container.DataItem, "Sounding"),1) %>
                                                   </td>
                                                   <td align="center" class="smalltabletext">
                                                      <asp:hyperlink name="Width1" id="Width1" runat="server">
                                                         <%#DataBinder.Eval(Container.DataItem, "Width")%>
                                                      </asp:hyperlink>
                                                   </td>
                                                   <td align="center" class="smalltabletext">
                                                      <%# DataBinder.Eval(Container.DataItem, "WidthPerc") %>
                                                   </td>
                                                </tr>
                                             </AlternatingItemTemplate>
                                             <ItemTemplate>
                                                <tr>
                                                   <td class="smalltabletext">
                                                      <%# format(DataBinder.Eval(Container.DataItem, "Update"),"d-MMM-yyyy") %>
                                                   </td>
                                                   <td class="smalltabletext">
                                                      <asp:HyperLink runat="server" NavigateUrl='<%# "Data/dwf/" + DataBinder.Eval(Container.DataItem, "Plan") + ".dwf" %>' ID="PlanLink2" NAME="PlanLink2" Target=_blank>
                                                         <%# DataBinder.Eval(Container.DataItem, "Plan") %>
                                                      </asp:HyperLink>
                                                      &nbsp;
                                                      <asp:Label ID="Plan1" Runat="server"></asp:Label>
                                                   </td>
                                                   <td align="center" class="smalltabletext">
                                                      <asp:hyperlink name="Grade" id="Grade" runat="server">
                                                         <%#DataBinder.Eval(Container.DataItem, "Grade")%>
                                                      </asp:hyperlink>
                                                   </td>
                                                   <td align="center" class="smalltabletext">
                                                      <%# formatnumber(DataBinder.Eval(Container.DataItem, "Sounding"),1) %>
                                                   </td>
                                                   <td align="center" class="smalltabletext">
                                                      <asp:HyperLink runat="server" ID="Width1" NAME="Width1">
                                                         <%#DataBinder.Eval(Container.DataItem, "Width")%>
                                                      </asp:HyperLink>
                                                   </td>
                                                   <td align="center" class="smalltabletext">
                                                      <%# DataBinder.Eval(Container.DataItem, "WidthPerc") %>
                                                   </td>
                                                   <td align="center" class="smalltabletext">&nbsp;
                                                   </td>
                                                </tr>
                                             </ItemTemplate>
                                          </asp:repeater></TABLE>
                                    </TD>
                                    <TD vAlign="top">
                                    </TD>
                                 </TR>
                                 <TR>
                                 </TR>
                              </TABLE>
                        </TD>
                        <td></td>
                     </TR>
                     <TR>
                        <TD colSpan="2"><FONT face="ARIAL" size="1"><BR>
                              Note: </FONT><FONT face="ARIAL" size="1">All soundings are relative to local 
                              low water level.</FONT>
                           <p align="center"><a href="javascript:history.go(-1);"><img src="images/btnback.gif" border="0"><font class="standard-text"></font></a>&nbsp;&nbsp;&nbsp;</p>
                        </TD>
                     </TR>
                  </TBODY>
               </TABLE>
               </asp:panel><asp:panel id="PanelGraph" runat="server" Visible="False" Height="236px"></asp:panel></TD>
               <TR>
                  <TD style="HEIGHT: 2px" vAlign="top" colSpan="2"></TD>
               </TR>
               <TR>
                  <TD colSpan="2"><uc1:reportfooter id="Reportfooter1" runat="server"></uc1:reportfooter></TD>
               </TR>
         </TBODY></TABLE>
      </form>
      </TR></TBODY></TABLE></TR></TBODY></TABLE></DIV>
      </FORM>
   </body>
</HTML>
