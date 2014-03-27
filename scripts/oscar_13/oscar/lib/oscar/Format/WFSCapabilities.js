oscar.Format.WFSCapabilities=oscar.BaseClass(OpenLayers.Format.WFSCapabilities,{read:function(j){if(typeof j=="string"){j=OpenLayers.Format.XML.prototype.read.apply(this,[j])
}var l=j.documentElement;
var g=this.version;
if(!g){g=l.getAttribute("version");
if(!g){g=this.defaultVersion
}}var k=oscar.Format.WFSCapabilities["v"+g.replace(/\./g,"_")];
if(!k){throw"Can't find a WFS capabilities parser for version "+g
}var i=new k(this.options);
var h=i.read(j);
h.version=g;
return h
},CLASS_NAME:"oscar.Format.WFSCapabilities"});