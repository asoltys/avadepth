oscar.Format.WFSCapabilities.v2_0_0=oscar.BaseClass(oscar.Format.WFSCapabilities.v1,oscar.Format.OGC.ows.v1_1_0,{initialize:function(b){oscar.Format.WFSCapabilities.v1.prototype.initialize.apply(this,[b])
},getProcessor:function(h){var e=h.nodeName.split(":").pop();
var f=this[h.prefix]||this;
var g=f["read_cap_"+e]||this["read_cap_"+e];
return g
},read_cap_DefaultCRS:function(c,d){c.DefaultCRS=this.getChildValue(d)
},read_cap_OtherCRS:function(c,d){if(!c.OtherCRS){c.OtherCRS=[]
}c.OtherCRS.push(this.getChildValue(d))
},read_cap_MetadataURL:function(c,d){if(!c.metadataURLs){c.metadataURLs=[]
}c.metadataURLs.push(this.getAttributeNS(d,"http://www.w3.org/1999/xlink","href"))
},CLASS_NAME:"oscar.Format.WFSCapabilities.v2_0_0"});