<%@ Page Language="vb" AutoEventWireup="false" Codebehind="AjaxHydrograph.aspx.vb" Inherits="AvadepthNet.AjaxHydrograph"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
<html>
  <head>
    <title>AjaxHydrograph</title>
    <meta name="GENERATOR" content="Microsoft Visual Studio .NET 7.1">
    <meta name="CODE_LANGUAGE" content="Visual Basic .NET 7.1">
    <meta name=vs_defaultClientScript content="JavaScript">
    <meta name=vs_targetSchema content="http://schemas.microsoft.com/intellisense/ie5">

<!--[if IE]><script language="javascript" type="text/javascript" src="scripts/excanvas.js"></script><![endif]-->
  
  <link rel="stylesheet" type="text/css" href="scripts/jquery.jqplot.css" />
  
  <!-- BEGIN: load jquery -->
  <script language="javascript" type="text/javascript" src="scripts/jquery-1.3.2.min.js"></script>
  <!-- END: load jquery -->
  
  <!-- BEGIN: load jqplot -->
  <script language="javascript" type="text/javascript" src="scripts/jquery.jqplot.js"></script>
  <script language="javascript" type="text/javascript" src="scripts/plugins/jqplot.categoryAxisRenderer.js"></script>
  <script language="javascript" type="text/javascript" src="scripts/plugins/jqplot.barRenderer.js"></script>
  <!-- END: load jqplot -->
  
	<script language="javascript" type="text/javascript" src="scripts/plugins/jqplot.logAxisRenderer.js"></script>
	<script language="javascript" type="text/javascript" src="scripts/plugins/jqplot.canvasTextRenderer.js"></script>
	<script language="javascript" type="text/javascript" src="scripts/plugins/jqplot.canvasAxisLabelRenderer.js"></script>
	<script language="javascript" type="text/javascript" src="scripts/plugins/jqplot.canvasAxisTickRenderer.js"></script>
	<script language="javascript" type="text/javascript" src="scripts/plugins/jqplot.dateAxisRenderer.js"></script>
	<script language="javascript" type="text/javascript" src="scripts/plugins/jqplot.categoryAxisRenderer.js"></script>
	<script language="javascript" type="text/javascript" src="scripts/plugins/jqplot.barRenderer.js"></script>
	<script type="text/javascript" src="scripts/plugins/jqplot.cursor.min.js"></script>
	<style type="text/css">
	  .jqplot-point-label {white-space: nowrap;}
	  .jqplot-yaxis-label {font-size: 9pt;}
	  .jqplot-yaxis-tick {font-size: 8pt;}
      .jqplot { margin: 10px;}
	</style>
	
	
	  
  <style type="text/css" media="screen">
    .jqplot-axis {
      font-size: 0.8em;
    }
  </style>
  <script type="text/javascript" language="javascript">
  
  $(document).ready(function(){
    
    var data;

     $.get("GetHydroData.aspx", function(response) {
     
		data= eval(response);
            
//            data=[['2008-06-30',4], ['2008-7-30',6.5], ['2008-8-30',5.7], ['2008-9-30',9], ['2008-10-30',8.2]];

line2=[['2008-06-30',4], ['2008-7-30',6.5], ['2008-8-30',5.7], ['2008-9-30',9], ['2008-10-30',8.2]];

plot2 = $.jqplot('chart2', [data], {
	 series:[{showMarker:false}],

	  axes: {
	    xaxis: {
	      autoscale: true,
	      renderer: $.jqplot.DateAxisRenderer,
	      label: 'Date',
	      labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
	      tickRenderer: $.jqplot.CanvasAxisTickRenderer,
	      tickOptions: {
           labelPosition: 'start',
           formatString:'%b %Y',
           min:'1/1/1997',
           tickInterval:'1 month',
          angle: 90
          
	      }
	      
	    },
	    yaxis: {
	      label: 'Hope Discharge (m3s)',
	      labelRenderer: $.jqplot.CanvasAxisLabelRenderer,
	      tickRenderer: $.jqplot.CanvasAxisTickRenderer,
	      tickOptions: {
	      angle: -10 },
	      min: 0
	    },
	      legend: {
        show: true,
        location: 'ne',     // compass direction, nw, n, ne, e, se, s, sw, w.
        xoffset: 12,        // pixel offset of the legend box from the x (or x2) axis.
        yoffset: 12,        // pixel offset of the legend box from the y (or y2) axis.
    },

cursor: {  
      showVerticalLine:true,
      showHorizontalLine:false,
      showCursorLegend:true,
      showTooltip: true,
      tooltipLocation: 'nw',
      zoom:true
    } 	    
	  }
	});

});

/*
  $.ajax({
    type: "POST",
    url: "GetHydroData.aspx",
    data: "{}",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    success: function(msg) {
		alert(msg);
    }
  });

*/
    
		//	data = [ [25,1], [26,0], [27,1], [28,0], [29,0], [30,3], [31,3]];
  });
  </script>
  
  </head>
  <body MS_POSITIONING="GridLayout">

    <form id="Form1" method="post" runat="server">
<div class="jqplot" id="chart2" style="margin-top:0px; margin-left:0px; width:600px; height:300px;"></div>

    </form>

  </body>
</html>
