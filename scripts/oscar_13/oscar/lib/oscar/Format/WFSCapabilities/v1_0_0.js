oscar.Format.WFSCapabilities.v1_0_0=oscar.BaseClass(OpenLayers.Format.WFSCapabilities.v1_0_0,oscar.Format.WFSCapabilities.v1,{initialize:function(b){OpenLayers.Format.WFSCapabilities.v1_0_0.prototype.initialize.apply(this,[b])
},read_cap_LatLongBoundingBox:function(g,l){var j=this.getAttributeNS(l,"","maxx");
var k=this.getAttributeNS(l,"","maxy");
var h=this.getAttributeNS(l,"","minx");
var i=this.getAttributeNS(l,"","miny");
g.wgs84BoundingBox={north:k,south:i,east:j,west:h}
},CLASS_NAME:"oscar.Format.WFSCapabilities.v1_0_0"});