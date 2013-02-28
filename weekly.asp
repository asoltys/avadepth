<%@ LANGUAGE="VBSCRIPT" %>	 

<html>

<head>

<title>Available Depth</title>
</head>

<body bgcolor="#FFFFFF" topmargin="1">

<%
sShow = Request("Show")
nLane = Request("Lane")

If sShow = "" Then
    sShow = "Graph"
End If

If nLane = empty Then
    nLane = 1
End If


showGraph = (sShow = "Graph")

%>
	<br>

		<table border="0" cellpadding="0" cellspacing="0" width="100%">
		  <tr>
		    <td><img src="cgfip-s.gif" width="212" height="30"></td>
		    <td align="right"><img src="wd-patch.gif" alt="WD" align="absmiddle" width="94" height="21"></td>
		  </tr>
		</table>
		<br>

		<% If showGraph Then%>
				 <% If nLane=2 Then %>
    		   <!--#include file="Data/Weekly/eweekly2.inc"-->
				     <center>
				     <img src="Data/Weekly/eweekly21.jpg" !WIDTH="804" !HEIGHT="527"><br>
				     <img src="Data/Weekly/eweekly25.jpg" !WIDTH="804" !HEIGHT="527">
				     </center>
					<% Else %>
	   		   <!--#include file="Data/Weekly/eweekly1.inc"-->
				     <center>
				     <img src="Data/Weekly/eweekly11.jpg" !WIDTH="804" !HEIGHT="527"><br>
				     <img src="Data/Weekly/eweekly15.jpg" !WIDTH="804" !HEIGHT="527">
				     </center>
   		<% End If %>

		<% Else %>

		   <% If sShow="Value" Then %>

	    		   <!--#include file="Data/Weekly/ectrlpt1.inc"-->
			       <!--#include file="Data/Weekly/ectrlpt2.inc"-->
					<% Else %>
						       <!--#include file="Data/Weekly/eweeknts.inc"-->

   		<% End If %>

<br>

<% If sShow<>"Notes" Then %>

<font FACE="ARIAL" SIZE="1">
</font>

<% End If %>


		<% End If %>

<br><br>

<!--#include file="Data/Weekly/bottom.inc"-->

</body>
</html>
