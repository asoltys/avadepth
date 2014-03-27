oscar.Format.WFSCapabilities.v1_1_0=oscar.BaseClass(oscar.Format.WFSCapabilities.v1,oscar.Format.OGC.ows.v1_0_0,oscar.Format.OGC.wfs,{initialize:function(b){oscar.Format.WFSCapabilities.v1.prototype.initialize.apply(this,[b])
},getProcessor:function(h){var e=h.nodeName.split(":").pop();
var f=this[h.prefix]||this;
var g=f["read_cap_"+e]||this["read_cap_"+e];
return g
},CLASS_NAME:"oscar.Format.WFSCapabilities.v1_1_0"});