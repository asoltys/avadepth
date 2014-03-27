oscar.Format.WFSCapabilities.v1=oscar.BaseClass(OpenLayers.Format.WFSCapabilities.v1,{initialize:function(b){OpenLayers.Format.WFSCapabilities.v1.prototype.initialize.apply(this,[b])
},runChildNodes:function(i,j){var l=j.childNodes;
var g,k;
for(var h=0;
h<l.length;
++h){g=l[h];
if(g.nodeType==1){k=this.getProcessor(g);
if(k){k.apply(this,[i,g])
}}}},getProcessor:function(c){var d=c.nodeName.split(":").pop();
processor=this["read_cap_"+d];
return processor
},read_cap_Name:function(c,d){c.name=this.getChildValue(d)
},read_cap_GetCapabilities:function(d,e){var f={href:{},formats:[]};
this.runChildNodes(f,e);
d.getcapabilities=f
},read_cap_DescribeFeatureType:function(f,d){var e={href:{},formats:[]};
this.runChildNodes(e,d);
f.describefeaturetype=e
},CLASS_NAME:"oscar.Format.WFSCapabilities.v1"});