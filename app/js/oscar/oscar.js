var oscar={singleFile:true};
(function(){var g=(typeof oscar=="object"&&oscar.singleFile);
window.oscar={_imgPath:null,_scriptName:(!g)?"lib/oscar.js":"oscar.js",_scriptLocation:null,_getScriptLocation:function(){if(this._scriptLcoation!=null){return this._scriptLocation
}var o=oscar._scriptName;
var l=document.getElementsByTagName("script");
for(var n=0,h=l.length;
n<h;
n++){var p=l[n].getAttribute("src");
if(p){var m=p.indexOf(this._scriptName);
if(m>-1){this._scriptLocation=p.substring(0,m);
break
}}}return this._scriptLocation
},getImagePath:function(){return this._imgPath||(oscar._getScriptLocation()+"images/")
}};
oscar.jQuery=jQuery.noConflict();
window.$$=oscar.jQuery;
oscar.DownloadHost=null;
if(!g){var j=new Array("oscar/Util.js","oscar/Types/BaseClass.js","oscar/Types/Global.js","oscar/Types/Bounds.js","oscar/Types/Size.js","oscar/Types/Theme.js","oscar/ox/ox.js","oscar/Gui.js","oscar/Gui/Dialog.js","oscar/Gui/AlertDialog.js","oscar/Gui/ConfirmDialog.js","oscar/Gui/SelectionTable.js","oscar/Gui/ThemeManager.js","oscar/Gui/ThemeManagerViewer.js","oscar/Gui/KeywordVocabularyTable.js","oscar/Gui/ComboBox.js","oscar/SelectionHandler.js","oscar/Handler/WFSRequest.js","oscar/Control.js","oscar/Control/ArgParser.js","oscar/Control/Extractor.js","oscar/Control/PanZoomBar.js","oscar/Control/Permalink.js","oscar/Control/ThemeSwitcher.js","oscar/Control/ToolBar.js","oscar/Control/Select.js","oscar/Control/ClearSelection.js","oscar/Control/Print.js","oscar/Control/MetaData.js","oscar/Control/PermaLink.js","oscar/Control/PreviousView.js","oscar/Control/OverviewMap.js","oscar/Control/ThemeManager.js","oscar/Control/OXFConfigManager.js","oscar/Layer.js","oscar/Layer/POILayer.js","oscar/Layer/WMTS.js","oscar/Util/Capabilities.js","oscar/Util/ConfigManager.js","oscar/Util/ConfirmBox.js","oscar/Util/AlertBox.js","oscar/Util/SelectControl.js","oscar/Util/SettingsAutoCompleteTable.js","oscar/Util/MultiCoordinateSystemsChooser.js","oscar/Util/StatusChecker.js","oscar/Util/DivSelect.js","oscar/Util/DivSelectOption.js","oscar/Format.js","oscar/Lang.js","oscar/lang.dictionary.js","oscar/Popup/FramedCloud.js","oscar/Map.js","oscar/Map2.js","oscar/Util/CoordinateSystemAutoComplete.js");
var b=navigator.userAgent;
var d=(b.match("MSIE")||b.match("Safari"));
if(d){var a=new Array(j.length)
}host=oscar._getScriptLocation()+"lib/";
for(var c=0,f=j.length;
c<f;
c++){if(d){a[c]="<script src='"+host+j[c]+"'><\/script>"
}else{var k=document.createElement("script");
k.src=host+j[c];
var e=document.getElementsByTagName("head").length?document.getElementsByTagName("head")[0]:document.body;
e.appendChild(k)
}}if(d){document.write(a.join(""))
}oscar.jQuery=jQuery.noConflict()
}})();
oscar.VERSION_NUMBER="10.1.0-SNAPSHOT";
oscar.debug={canOutput:function(){var b=false;
try{b=(window.console)?true:false
}catch(a){}return b
},error:function(a){if(this.canOutput()){window.console.error(a.message)
}}};
oscar.Util={};
oscar.Util.isFeatureInArray=function(a,c){for(var b in c){if(a==c[b]){return true
}}return false
};
oscar.Util.createFormElement=function(b,d,a,h,f,c){var g=document.createElement(b);
g.setAttribute("name",a);
g.setAttribute("type",d);
g.setAttribute("id",h);
g.setAttribute("value",f);
c.appendChild(g)
};
oscar.Util.checkAll=function(d){for(var b=0;
b<d.elements.length;
b++){var c=d.elements[b];
var a=c.name;
if(a!="allbox"&&c.type!=null&&(c.type.indexOf("checkbox")==0)){c.checked=d.allbox.checked
}}};
oscar.Util.isOneChecked=function(b){if(b==null){return false
}if(b.length){for(var a=0;
a<b.length;
a++){if(b[a].checked){return true
}}}else{if(b.checked){return true
}}return false
};
oscar.Util.isSphericalMercator=function(a){if((a=="EPSG:900913")||(a=="EPSG:3857")){return true
}return false
};
oscar.Util.moveSelectedOptions=function(e,f){var d=document.getElementsByName(e)[0];
var c=document.getElementsByName(f)[0];
if(d!=null&&c!=null){var b;
for(b=0;
b<d.options.length;
b++){if(d.options[b].selected){var a=d.options[b];
c.options[c.options.length]=new Option(a.text,a.value);
d.remove(b);
b--
}}}};
oscar.Util.moveAllSelectOptions=function(f,g){var e=document.getElementsByName(f)[0];
var d=document.getElementsByName(g)[0];
if(e!=null&&d!=null){var c;
var a=e.options.length;
for(c=0;
c<a;
c++){var b=e.options[0];
d.options[d.options.length]=new Option(b.text,b.value);
e.remove(0)
}}};
oscar.Util.submitForm=function(a,b){if(b!=null){a.action=b
}a.submit()
};
oscar.Util.getBrowserName=function(){var b="";
var a=navigator.userAgent.toLowerCase();
if(a.indexOf("opera")!=-1){b="opera"
}else{if(a.indexOf("msie")!=-1){b="msie"
}else{if(a.indexOf("safari")!=-1){b="safari"
}else{if(a.indexOf("mozilla")!=-1){if(a.indexOf("firefox")!=-1){b="firefox"
}else{b="mozilla"
}}}}}return b
};
oscar.Util.buildWFSFilterForRequest=function(g,f,e,c){var b=OpenLayers.Filter.Spatial.BBOX;
spatialFilter=new OpenLayers.Filter.Spatial({type:b,value:g,projection:f,property:c});
var a=new OpenLayers.Format.Filter({version:e});
var d=new OpenLayers.Format.XML();
return d.write(a.write(spatialFilter))
};
oscar.Util.getDataFormatter=function(a,b){var c=a.toLowerCase();
if(c.contains("gml2")||c.contains("gml/2")){return new OpenLayers.Format.GML(b)
}else{if(c.contains("kml")){return new OpenLayers.Format.KML(b)
}else{if(c.contains("json")){return new OpenLayers.Format.GeoJSON(b)
}else{if(c=="georss_simple"||c=="georss_geo"){return new OpenLayers.Format.GeoRSS(b)
}}}}return null
};
if(typeof window.$==="undefined"){window.$=OpenLayers.Util.getElement
}var isOldIE=false;
var userAgent=navigator.userAgent;
if(userAgent.indexOf("MSIE")!=-1){var userAgentVersion=parseFloat(navigator.userAgent.split("MSIE")[1]);
if(userAgentVersion<8){isOldIE=true
}}if(isOldIE){document.nativeGetElementById=document.getElementById;
document.getElementById=function(c){var b=document.nativeGetElementById(c);
if(b){if(b.attributes.id&&b.attributes.id.value==c){return b
}else{for(var a=1;
a<document.all[c].length;
a++){if(document.all[c][a].attributes.id&&document.all[c][a].attributes.id.value==c){return document.all[c][a]
}}}}return null
}
}oscar.Util.getTimeStamp=function(){var a=new Date().getTime();
return"timestamp="+a
};
oscar.Util.getToolTipId=function(a){return toolTipId=a.CLASS_NAME.toLowerCase().replaceAll(".","_")
};
oscar.Util.EpsgConversion={CRS:"CRS",OGC:"OGC",EPSG:"EPSG",EPSG_URN:"urn:ogc:def:crs:EPSG::",CRS_URN:"urn:ogc:def:crs:OGC:2:",urnToEpsg:function(a){var b=a.split(":");
if(b.length==7){if(b[4]==oscar.Util.EpsgConversion.OGC){return oscar.Util.EpsgConversion.CRS+":"+b[6]
}else{return b[4]+":"+b[6]
}}else{return a
}},epsgToUrn:function(a){var b=a.split(":");
if(b[0]==oscar.Util.EpsgConversion.EPSG){return oscar.Util.EpsgConversion.EPSG_URN+b[1]
}else{if(b[0]==oscar.Util.EpsgConversion.CRS){return oscar.Util.EpsgConversion.CRS_URN+b[1]
}else{return a
}}}};
String.prototype.replaceAll=function(c,d){var a=this;
var b=a.indexOf(c);
while(b!=-1){a=a.replace(c,d);
b=a.indexOf(c)
}return a
};
oscar.Util.getServerGeometryPropertyName=function(b){var c=b.ComplexType.ComplexContent.Extension.Sequence.Elements;
for(var a=0;
a<c.length;
a++){if(c[a].type.indexOf("gml:")!=-1){return geoPropName=c[a].name
}}return""
};
oscar.Util.convertFormat=function(a){if(a!=null||a.length>0){if(a.indexOf("gml/3")!=-1||a.indexOf("gml3")!=-1){return"gml3"
}else{if(a.indexOf("gml/2")!=-1||a.indexOf("gml2")!=-1){return"gml2"
}else{if(a.indexOf("kml")!=-1){return"kml"
}else{if(a.indexOf("json")!=-1){return"json"
}else{if(a.indexOf("tiff")!=-1){return"tiff"
}else{if(a.indexOf("xyz")!=-1){return"XYZ"
}else{if(a.indexOf("bag")!=-1){return"BAG"
}else{if(a.indexOf("shapefile")!=-1){return"ShapeFile"
}}}}}}}}}return a
};
oscar.alert=function(e,g,f){var h={modal:true,resizable:false,closeOnEscape:false,show:"fade",hide:"fade",draggable:false,open:function(i,j){$$(this).parent().children().children(".ui-dialog-titlebar-close").hide()
}};
var d=OpenLayers.Util.extend(e,h);
var b=$$("<div></div>").dialog(d).html(g);
var a=$$("<div></div>").addClass("dlgButtonPanel");
var c=$$("<a></a>").html("Ok").button({icons:{primary:"ui-icon-check"},text:false}).click(function(){b.dialog("close");
if(f&&f.complete){f.complete.apply(f.scope,[true])
}});
a.append(c);
b.append(a)
};
oscar.confirm=function(h,f,g){var b={modal:true,resizable:false,closeOnEscape:false,show:"fade",hide:"fade",draggable:false,open:function(j,k){$$(this).parent().children().children(".ui-dialog-titlebar-close").hide()
}};
var i=OpenLayers.Util.extend(h,b);
var a=$$("<div></div>").dialog(i).html(f);
var c=$$("<div></div>").addClass("dlgButtonPanel");
var e=$$("<a></a>").html("Ok").button({icons:{primary:"ui-icon-check"},text:false}).click(function(){a.dialog("close");
if(g&&g.complete){g.complete.apply(g.scope,[true])
}});
var d=$$("<a></a>").html("Cancel").button({icons:{primary:"ui-icon-cancel"},text:false}).click(function(){a.dialog("close");
if(g&&g.complete){g.complete.apply(g.scope,[false])
}});
c.append(e);
c.append(d);
a.append(c)
};
oscar.Util.parseText=function(b){if(b==null){return""
}var e={makeTag:function(f){return document.createElement(f)
},url:function(f){if(f.indexOf("http://")==0||f.indexOf("https://")==0){var h=this.makeTag("span");
var g=this.makeTag("a");
h.appendChild(g);
g.href=f;
g.innerHTML=f;
g.target="_new";
f=h.innerHTML
}return f
},email:function(f){if(f.indexOf("@")>-1){var h=this.makeTag("span");
var g=this.makeTag("a");
h.appendChild(g);
g.href="mailto:"+f;
g.innerHTML=f;
f=h.innerHTML
}return f
},image:function(f){if(f.indexOf(".png")>-1||f.indexOf(".gif")>-1||f.indexOf(".jpg")>-1||f.indexOf(".jpeg")>-1){var g=this.makeTag("span");
var h=this.makeTag("img");
g.appendChild(h);
h.src=f;
f=g.innerHTML
}return f
}};
var a=b.split(" ");
for(var d=0;
d<a.length;
d++){var c=a[d];
a[d]=e.email(a[d]);
a[d]=e.image(a[d]);
a[d]=e.url(a[d])
}return a.join(" ")
};
OpenLayers.Util.onImageLoadErrorColor="transparent";
oscar.BaseClass=function(){var c=function(){this.initialize.apply(this,arguments)
};
var b={};
var e;
for(var d=0,a=arguments.length;
d<a;
++d){if(typeof arguments[d]=="function"){e=arguments[d].prototype
}else{e=arguments[d]
}OpenLayers.Util.extend(b,e)
}c.prototype=b;
return c
};
oscar.ox=oscar.BaseClass({version:null,initialize:function(a){OpenLayers.Util.extend(this,a);
this.themes=[]
},addTheme:function(a){this.themes.push(a)
},CLASS_NAME:"oscar.ox"});
oscar.ox.Theme=oscar.BaseClass({layers:null,selectionLayers:null,displayOrder:-1,id:0,name:null,srs:null,projection:null,isActive:false,services:null,covers:null,initialize:function(a){this.layers=[];
this.selectionLayers=[];
this.covers=[];
OpenLayers.Util.extend(this,a)
},addLayer:function(a){this.layers.push(a);
if(a.layerType=="SELECTION"){this.selectionLayers.push(a)
}},hasSelectionService:function(){return(this.services&&this.services.selection)?true:false
},getSelectionService:function(){if(this.hasSelectionService()){return this.services.selection.serviceEntries
}else{return null
}},hasExtractionService:function(){return(this.services&&this.services.extraction)?true:false
},getExtractionService:function(){if(this.hasExtractionService()){return this.services.extraction.serviceEntries
}else{return null
}},getProjection:function(){return this.projection
},getDefaultCover:function(){return this.getCover("DEFAULT")
},getMaxCover:function(){return this.getCover("MAX")
},getCover:function(b){for(var a=0;
a<this.covers.length;
a++){if(this.covers[a].type==b){return new OpenLayers.Bounds(this.covers[a].minX,this.covers[a].minY,this.covers[a].maxX,this.covers[a].maxY)
}}return null
},buildMap:function(f){if(this.displaySRS){try{var b=f.getControlsByClass("OpenLayers.Control.MousePosition")[0];
b.displayProjection=new OpenLayers.Projection(this.displaySRS)
}catch(d){}}var e=this.layers.length;
for(var a=0;
a<e;
a++){var c=this.layers[a];
if(!c.baseLayer){c.baseLayer=(a==0)?true:false
}var g=c.toMapLayer(f)
}},CLASS_NAME:"oscar.ox.Theme"});
oscar.ox.Layer=oscar.BaseClass({baseLayer:false,displayOrder:null,dataLayers:null,layerId:null,layerType:null,name:null,parameters:null,urls:null,initialize:function(a){this.dataLayers=[];
this.parameters={};
this.urls=[];
OpenLayers.Util.extend(this,a)
},addDataLayer:function(a){if(!this.dataLayers){this.dataLayers=[]
}this.dataLayers.push(a)
},addUrl:function(a){if(!this.urls){this.urls=[]
}this.urls.push(a)
},toMapLayer:function(b){layerNamesArr=[];
for(var h=0;
h<this.dataLayers.length;
h++){layerNamesArr.push(this.dataLayers[h].layerName)
}var l=null;
var n=null;
switch(this.layerType){case"GOOGLE_PHYSICAL":l=new OpenLayers.Layer.Google("Google Physical",{type:G_PHYSICAL_MAP,sphericalMercator:true});
break;
case"GOOGLE_STREETS":l=new OpenLayers.Layer.Google("Google Streets",{type:G_NORMAL_MAP,sphericalMercator:true});
break;
case"GOOGLE_HYBRID":l=new OpenLayers.Layer.Google("Google Hybrid",{type:G_HYBRID_MAP,sphericalMercator:true});
break;
case"GOOGLE_SATELLITE":l=new OpenLayers.Layer.Google("Google Satellite",{type:G_SATELLITE_MAP,sphericalMercator:true});
break;
case"MARKER":var o=null;
if(this.parameters.srs){o=new OpenLayers.Projection(this.parameters.srs)
}else{o=new OpenLayers.Projection("EPSG:4326")
}var l=null;
var k={projection:b.getProjectionObject(),formatOptions:{externalProjection:o,internalProjection:b.getProjectionObject()}};
var g=this.parameters.formatType.toLowerCase();
switch(g){case"gml2":var c=new OpenLayers.Style({externalGraphic:this.parameters.iconUri,pointRadius:20});
c.isDefault=true;
l=null;
l=new OpenLayers.Layer.GML(this.name,this.urls[0],{setMap:function(i){OpenLayers.Layer.GML.prototype.setMap.apply(this,arguments);
this.formatOptions.internalProjection=this.map.projection
},format:OpenLayers.Format.WFST,formatOptions:{extractStyles:false,externalProjection:new OpenLayers.Projection(this.parameters.srs)},styleMap:new OpenLayers.StyleMap({"default":c,select:new OpenLayers.Style({pointRadius:35})})});
l.events.on({beforefeaturesadded:function(p){for(var q in p.features){var r=p.features[q];
var s=r.geometry.getBounds().getCenterLonLat();
var i=new OpenLayers.Geometry.Point(s.lon,s.lat);
r.geometry=i;
r.style=c.defaultStyle
}},featureselected:function(x){var y=x.feature;
var i=$$("<table></table>");
i.addClass("popup-table");
for(var u in y.attributes){var q=y.attributes[u];
if(q==null||q.length==0){continue
}var s=$$("<tr></tr>");
var w=$$("<td></td>").html(oscar.i18n(u));
var v=$$("<td></td>").html(oscar.Util.parseText(q));
s.append(w);
s.append(v);
i.append(s)
}var t=$$("<div></div>");
t.append(i);
var r=new OpenLayers.LonLat(y.geometry.x,y.geometry.y);
var p=new oscar.FramedCloud("id",r,null,t.html(),null,true);
p.autoSize=true;
y.popup=p;
y.layer.map.addPopup(p)
},featureunselected:function(i){var p=i.feature;
p.layer.map.removePopup(p.popup);
p.popup=null
},scope:this});
break;
case"geojson":var c=new OpenLayers.Style({externalGraphic:this.parameters.iconUri,pointRadius:20});
c.isDefault=true;
l=null;
l=new OpenLayers.Layer.GML(this.name,this.urls[0],{setMap:function(i){OpenLayers.Layer.GML.prototype.setMap.apply(this,arguments);
this.formatOptions.internalProjection=this.map.projection
},format:OpenLayers.Format.JSON,formatOptions:{extractStyles:false,externalProjection:new OpenLayers.Projection(this.parameters.srs),read:function(A,p){var r=OpenLayers.Format.JSON.prototype.read.apply(this,[A,p]);
if(!r.features){var B=r;
r={};
r.features=[B]
}for(var s=0;
s<r.features.length;
s++){var B=r.features[s];
var w=B.geometry;
switch(w.type){case"Polygon":var u=new OpenLayers.Geometry.LinearRing();
for(var q=0;
q<w.coordinates.length;
q++){var v=w.coordinates[q];
for(var y in v){u.addComponent(new OpenLayers.Geometry.Point(v[y][0],v[y][1]))
}}var x=new OpenLayers.Geometry.Polygon(u);
var t=x.getBounds().getCenterLonLat();
var z=new OpenLayers.Geometry.Point(t.lon,t.lat);
r.features[s].geometry=z;
break;
case"Point":var z=new OpenLayers.Geometry.Point(w.coordinates[0],w.coordinates[1]);
B.geometry=z;
break
}r.features[s].style=c.defaultStyle
}return r.features
}},styleMap:new OpenLayers.StyleMap({"default":c,select:new OpenLayers.Style({pointRadius:35})})});
l.events.on({featureselected:function(x){var y=x.feature;
var i=$$("<table></table>");
i.addClass("popup-table");
for(var q in y.properties){var w=y.properties[q];
if(w==null||w.length==0){continue
}var s=$$("<tr></tr>");
var v=$$("<td></td>").html(oscar.i18n(q));
var u=$$("<td></td>").html(oscar.Util.parseText(w));
s.append(v);
s.append(u);
i.append(s)
}var t=$$("<div></div>");
t.append(i);
var r=new OpenLayers.LonLat(y.geometry.x,y.geometry.y);
var p=new oscar.FramedCloud("id",r,null,t.html(),null,true);
p.autoSize=true;
y.popup=p;
y.layer.map.addPopup(p)
},featureunselected:function(i){var p=i.feature;
p.layer.map.removePopup(p.popup);
p.popup=null
},scope:this});
break;
case"georss_simple":var c=new OpenLayers.Style({externalGraphic:this.parameters.iconUri});
var m=new OpenLayers.Rule({symbolizer:{pointRadius:30},filter:new OpenLayers.Filter.Comparison({type:OpenLayers.Filter.Comparison.LIKE,property:"title",value:"*powder*"})});
m.filter.value2regex("*");
var d=new OpenLayers.Rule({elseFilter:true,symbolizer:{pointRadius:20}});
c.addRules([d]);
l=null;
l=new OpenLayers.Layer.GML(this.name,this.urls[0],{setMap:function(i){OpenLayers.Layer.GML.prototype.setMap.apply(this,arguments);
this.formatOptions.internalProjection=this.map.projection
},format:OpenLayers.Format.GeoRSS,formatOptions:{extractStyles:false,externalProjection:new OpenLayers.Projection("EPSG:4326"),createFeatureFromItem:function(p){var i=OpenLayers.Format.GeoRSS.prototype.createFeatureFromItem.apply(this,arguments);
return i;
var q=this.getElementsByTagNameNS(p,"*","thumbnail")[0].getAttribute("url");
i.attributes.thumbnail=q
}},styleMap:new OpenLayers.StyleMap({"default":c,select:new OpenLayers.Style({pointRadius:20})})});
l.events.on({featureselected:function(r){var s=r.feature;
var i=document.createElement("div");
var u=document.createElement("div");
u.innerHTML=s.attributes.title;
var t=document.createElement("p");
t.innerHTML=oscar.Util.parseText(s.attributes.description);
i.appendChild(u);
i.appendChild(t);
html=t.innerHTML;
var q=new oscar.FramedCloud("id",s.geometry.getBounds().getCenterLonLat(),null,i.innerHTML,null,true);
q.autoSize=true;
s.popup=q;
s.layer.map.addPopup(q)
},featureunselected:function(i){var p=i.feature;
p.layer.map.removePopup(p.popup);
p.popup=null
},scope:this});
break;
case"kml":l=null;
var c=new OpenLayers.Style({externalGraphic:this.parameters.iconUri,pointRadius:20});
l=new OpenLayers.Layer.GML(this.name,this.urls[0],{setMap:function(){OpenLayers.Layer.GML.prototype.setMap.apply(this,arguments);
this.formatOptions.internalProjection=this.map.projection
},format:OpenLayers.Format.KML,formatOptions:{extractStyles:true,externalProjection:new OpenLayers.Projection("EPSG:4326")},styleMap:new OpenLayers.StyleMap({"default":c,select:new OpenLayers.Style({pointRadius:35})})});
l.events.on({beforefeaturesadded:function(p){for(var s in p.features){var q=p.features[s];
if(q.geometry.CLASS_NAME!="OpenLayers.Geometry.Point"){var r=q.geometry.getBounds().getCenterLonLat();
var i=new OpenLayers.Geometry.Point(r.lon,r.lat);
q.geometry=i
}}},featureselected:function(r){var s=r.feature;
var i=document.createElement("div");
var u=document.createElement("div");
u.innerHTML=oscar.Util.parseText(s.attributes.name);
var t=document.createElement("p");
t.innerHTML=oscar.Util.parseText(s.attributes.description);
i.appendChild(u);
i.appendChild(t);
html=oscar.Util.parseText(s.attributes.description);
var q=new oscar.FramedCloud("id",s.geometry.getBounds().getCenterLonLat(),null,i.innerHTML,null,true);
q.autoSize=true;
s.popup=q;
s.layer.map.addPopup(q)
},featureunselected:function(i){var p=i.feature;
p.layer.map.removePopup(p.popup);
p.popup=null
},scope:this});
break;
case"youtube":n={featureselected:function(s){var t=s.feature;
var q=document.createElement("div");
var w=document.createElement("div");
w.innerHTML=t.attributes.title;
var i="http://www.youtube.com/embed/";
var v=t.fid.substring(t.fid.lastIndexOf("/")+1);
html='<iframe width="480" height="390" src="'+i+v+'" frameborder="0" allowfullscreen></iframe>';
var u=document.createElement("p");
u.innerHTML=html;
q.appendChild(w);
q.appendChild(u);
html=t.attributes.description;
var r=new oscar.FramedCloud("id",t.geometry.getBounds().getCenterLonLat(),null,q.innerHTML,null,true);
r.autoSize=true;
t.popup=r;
t.layer.map.addPopup(r)
},featureunselected:function(i){var p=i.feature;
p.layer.map.removePopup(p.popup);
p.popup=null
},scope:this};
case"flickr":if(n==null){n=null
}case"picasa":var c=new OpenLayers.Style({externalGraphic:"${thumbnail}"});
var m=new OpenLayers.Rule({symbolizer:{pointRadius:30},filter:new OpenLayers.Filter.Comparison({type:OpenLayers.Filter.Comparison.LIKE,property:"title",value:"*powder*"})});
m.filter.value2regex("*");
var d=new OpenLayers.Rule({elseFilter:true,symbolizer:{pointRadius:20}});
c.addRules([d]);
l=new OpenLayers.Layer.GML(this.name,this.urls[0],{setMap:function(){OpenLayers.Layer.GML.prototype.setMap.apply(this,arguments);
this.formatOptions.internalProjection=this.map.projection
},format:OpenLayers.Format.GeoRSS,formatOptions:{externalProjection:new OpenLayers.Projection("EPSG:4326"),createFeatureFromItem:function(p){var i=OpenLayers.Format.GeoRSS.prototype.createFeatureFromItem.apply(this,arguments);
var q=this.getElementsByTagNameNS(p,"*","thumbnail")[0].getAttribute("url");
i.attributes.thumbnail=q;
return i
}},styleMap:new OpenLayers.StyleMap({"default":c,select:new OpenLayers.Style({pointRadius:35})})});
if(n==null){n={featureselected:function(p){var q=p.feature;
html=q.attributes.description;
var i=new oscar.FramedCloud("id",q.geometry.getBounds().getCenterLonLat(),null,html,null,true);
i.autoSize=true;
q.popup=i;
q.layer.map.addPopup(i)
},featureunselected:function(i){var p=i.feature;
p.layer.map.removePopup(p.popup);
p.popup=null
},scope:this}
}l.events.on(n);
break;
case"vessels":return;
var a=this.parameters.pollInterval*1000;
var o=null;
try{o=new OpenLayers.Projection(this.parameters.projection)
}catch(f){o=new OpenLayers.Projection("EPSG:4326")
}var j=new oscar.Control.AIS(this.urls[0],a,{externalProjection:o,layerName:this.name});
b.addControl(j);
j.activate();
return
}break;
case"OSM":l=new OpenLayers.Layer.OSM(this.name);
break;
case"WMS":var e={};
e.layers=layerNamesArr;
e.format=(this.format)?this.format:"image/png";
e.transparent=true;
l=new OpenLayers.Layer.WMS(this.name,this.urls,e,{wrapDateLine:false,buffer:0,isBaseLayer:this.baseLayer});
break;
case"WMTS":l=new OpenLayers.Layer.WMTS({name:this.name,url:this.urls[0],layer:this.dataLayers[0].layerName,matrixSet:this.tileMatrixSet,style:"default",requestEncoding:"REST",format:this.format,isBaseLayer:this.baseLayer,buffer:0});
break
}if(l!=null){b.addLayer(l)
}},CLASS_NAME:"oscar.ox.Layer"});
oscar.ox.DataLayer=oscar.BaseClass({id:null,index:null,layerName:null,initialize:function(a){OpenLayers.Util.extend(this,a)
},CLASS_NAME:"oscar.ox.DataLayer"});
oscar.ox.Services=oscar.BaseClass({selection:null,extraction:null,initialize:function(){},addSelectionService:function(){this.selection=new oscar.ox.SelectionService();
return this.selection
},addExtractionService:function(){this.extraction=new oscar.ox.ExtractionService();
return this.extraction
},CLASS_NAME:"oscar.ox.Services"});
oscar.ox.Service=oscar.BaseClass({serviceEntries:null,initialize:function(a){this.serviceEntries=[]
},addServiceEntry:function(a){if(a.CLASS_NAME&&a.CLASS_NAME=="oscar.ox.ServiceEntry"){this.serviceEntries.push(a.clone())
}},getServiceEntries:function(){return this.serviceEntries
},getServiceEntry:function(a){return this.serviceEntries[a]
},CLASS_NAME:"oscar.ox.Service"});
oscar.ox.SelectionService=oscar.BaseClass(oscar.ox.Service,{initialize:function(a){oscar.ox.Service.prototype.initialize.apply(this,[a])
},CLASS_NAME:"oscar.ox.SelectionService"});
oscar.ox.ExtractionService=oscar.BaseClass(oscar.ox.Service,{initialize:function(a){oscar.ox.Service.prototype.initialize.apply(this,[a])
},CLASS_NAME:"oscar.ox.ExtractionService"});
oscar.ox.ServiceEntry=oscar.BaseClass({url:null,version:null,serviceType:null,format:null,identifiers:null,geometryName:null,initialize:function(a){this.identifiers=[];
this.geometryName="";
if(a){OpenLayers.Util.extend(this,a)
}},addUrl:function(a){this.url=a
},clone:function(){var a={};
OpenLayers.Util.extend(a,this);
return new oscar.ox.ServiceEntry(a)
},CLASS_NAME:"oscar.ox.ServiceEntry"});
oscar.Gui=oscar.BaseClass({EVENT_TYPES:["afterDraw","afterAppend","beforeDraw"],events:null,div:null,initialize:function(a){OpenLayers.Util.extend(this,a);
this.events=new OpenLayers.Events(this,null,this.EVENT_TYPES,false,{includeXY:true})
},draw:function(){this.div=document.createElement("div");
this.div.id=OpenLayers.Util.createUniqueID(this.CLASS_NAME);
var a=this.CLASS_NAME.replace(/\./g,"");
oscar.jQuery(this.div).addClass(a)
},appendTo:function(a){if(this.div==null){this.draw()
}$$(a).append(this.div)
},CLASS_NAME:"oscar.Gui"});
oscar.Gui.Download=oscar.BaseClass(oscar.Gui,{initialize:function(){oscar.Gui.prototype.initialize.apply(this)
},downloadFromService:function(c,a){if(oscar.DownloadHost){var e=document.createElement("form");
var d=OpenLayers.Util.createUniqueID("randomForm");
e.name=d;
e.action=oscar.DownloadHost;
e.method="POST";
var b=document.createElement("input");
b.name="url";
b.tyle="text";
b.value=c;
e.appendChild(b);
var f=document.createElement("input");
f.name="filename";
f.tyle="text";
f.value=a;
e.appendChild(f);
document.body.appendChild(e);
e.submit()
}else{window.open(c,"abc123","width=640,height=480,menuBar=yes,location=false,scrollbars=yes")
}},CLASS_NAME:"oscar.Gui.Download"});
oscar.Gui.Download.WCS=oscar.BaseClass(oscar.Gui.Download,{autoStart:true,title:null,events:null,EVENT_TYPES:["xmlReceived","xslReceived"],wcsRequest:null,hasXML:false,xslRequest:null,hasXSL:false,initialize:function(b,c,a){OpenLayers.Util.extend(this,a);
this.url=b;
this.parameters=c;
this.events=new OpenLayers.Events(this,null,this.EVENT_TYPES,false,{includeXY:true});
this.events.register("xmlReceived",this,this.checkExternalRequests);
this.events.register("xslReceived",this,this.checkExternalRequests);
this.isEMLDownload=this.url.contains("store=false")
},draw:function(){this.div=document.createElement("div");
this.contentContainer=document.createElement("div");
this.div.id=OpenLayers.Util.createUniqueID(this.CLASS_NAME);
var b=this.CLASS_NAME.replace(/\./g,"");
oscar.jQuery(this.div).addClass(b);
this.content=document.createElement("div");
oscar.jQuery(this.content).addClass("downloadContainer");
this.grfx=document.createElement("div");
this.content.appendChild(this.grfx);
oscar.jQuery(this.grfx).addClass("animatedDownload");
this.txt=document.createElement("div");
oscar.jQuery(this.txt).addClass("dmTextContainer");
this.transformedDiv=document.createElement("div");
oscar.jQuery(this.transformedDiv).addClass("dContainer");
this.content.appendChild(this.txt);
this.content.appendChild(this.transformedDiv);
if(this.title==null){this.title=prompt("Download Name:","default")
}this.txt.innerHTML=this.title;
this.txt.title=this.title;
this.div.appendChild(this.content);
this.disableClick();
if(this.autoStart){var a=this;
var c=function(){a.initRequests()
};
setTimeout(c,500)
}return this.div
},disableClick:function(){OpenLayers.Event.observe(this.div,"mousedown",function(a){OpenLayers.Event.stop(a,true)
});
return;
oscar.jQuery(this.div).draggable({containment:"parent",start:function(a,b){oscar.jQuery(this).addClass("olDragDown")
},stop:function(a,b){oscar.jQuery(this).removeClass("olDragDown")
}})
},initRequests:function(){if(!this.isEMLDownload){this.wcsRequest=OpenLayers.Request.GET({url:this.url,async:true,parameters:this.parameters,success:this.xmlObtained,failure:this.requestFail,scope:this});
this.xslRequest=OpenLayers.Request.GET({url:oscar._getScriptLocation()+"resources/GetCoverage.xsl",async:true,success:this.xslObtained,failure:this.requestFail,scope:this})
}else{var b=document.createElement("span");
$$(b).addClass("dCoverage");
$$(this.grfx).addClass("downloadReady");
this.transformedDiv.appendChild(b);
var a=this;
OpenLayers.Event.observe(b,"click",function(c){a.gotoUrl("dCoverage",a.url)
})
}},xslObtained:function(a){this.xsl=a.responseXML;
this.hasXSL=true;
this.events.triggerEvent("xslReceived")
},xmlObtained:function(a){this.xml=a.responseXML;
this.hasXML=true;
this.events.triggerEvent("xmlReceived")
},checkExternalRequests:function(a){if(this.hasXSL&&this.hasXML){this.transform()
}},transform:function(){var c=oscar.Util.Transform.transform(this.xml,this.xsl);
var b=document.createElement("div");
if(typeof c=="string"){b.innerHTML=c
}else{b.appendChild(c)
}var d=this;
var a=function(){d.transformedDiv.innerHTML=b.innerHTML;
var h=oscar.jQuery(d.transformedDiv).children();
for(var g=0;
g<h.length;
g++){var j=h[g];
var e=j.attributes.href.value;
var f=function(k,i){return function(){d.gotoUrl(k,i)
}
};
j.onclick=f(j.attributes["class"].value,e)
}oscar.jQuery(d.grfx).addClass("downloadReady");
oscar.jQuery(this.content).addClass("ready");
oscar.jQuery(d.content).fadeIn("fast")
};
oscar.jQuery(this.content).fadeOut("fast",a)
},gotoUrl:function(c,b){switch(c){case"dCoverage":var a=document.createElement("iframe");
oscar.jQuery(a).addClass("dmIFrame");
document.body.appendChild(a);
a.src=b;
break;
case"dMetadata":this.downloadFromService(b,"metadata.xml");
break
}},requestFail:function(c){if(this.xslRequest!=null){this.xslRequest.abort()
}if(this.wcsRequest!=null){this.wcsRequest.abort()
}var b=this;
var a=function(){b.txt.innerHTML="Download Cancelled";
oscar.jQuery(b.grfx).addClass("downloadCancelled");
oscar.jQuery(b.content).fadeIn("fast")
};
oscar.jQuery(this.content).fadeOut("fast",a)
},CLASS_NAME:"oscar.Gui.Download.WCS"});
oscar.Gui.Download.WFS=oscar.BaseClass(oscar.Gui.Download,{autoStart:true,title:null,initialize:function(b,c,a){OpenLayers.Util.extend(this,a);
this.url=b;
this.parameters=c;
var e=OpenLayers.Util.getParameterString(this.parameters);
e=unescape(e);
if(e.length>0){var d=(this.url.indexOf("?")>-1)?"&":"?";
this.url+=d+e
}},draw:function(){var b=this;
this.div=document.createElement("div");
this.contentContainer=document.createElement("div");
this.div.id=OpenLayers.Util.createUniqueID(this.CLASS_NAME);
var a=this.CLASS_NAME.replace(/\./g,"");
oscar.jQuery(this.div).addClass(a);
this.content=document.createElement("div");
oscar.jQuery(this.content).addClass("downloadContainer");
this.grfx=document.createElement("div");
this.content.appendChild(this.grfx);
oscar.jQuery(this.grfx).addClass("animatedDownload");
this.txt=document.createElement("div");
oscar.jQuery(this.txt).addClass("dmTextContainer");
this.transformedDiv=document.createElement("div");
oscar.jQuery(this.transformedDiv).addClass("dContainer");
downloadButton=$$("<span></span>").addClass("ui-icon-disk-save").attr("title",oscar.i18n("saveButtonLabel"));
$$(this.transformedDiv).append(downloadButton);
downloadButton.click(function(d){b.prepDownloadParams()
});
this.content.appendChild(this.txt);
this.content.appendChild(this.transformedDiv);
if(this.title==null){this.title=prompt("Download Name:","default")
}this.txt.innerHTML=this.title;
this.txt.title=this.title;
this.txt.alt=this.title;
this.div.appendChild(this.content);
this.disableClick();
if(this.autoStart){var b=this;
var c=function(){b.initRequests()
};
setTimeout(c,500)
}return this.div
},prepDownloadParams:function(){var a=this.title+".";
var b=new String(this.parameters.outputFormat);
if(b.toLowerCase().contains("gml")){a+="xml"
}else{if(b.toLowerCase().contains("kml")){a+="kml"
}else{if(b.toLowerCase().contains("json")){a+="json"
}else{if(b.toLowerCase().contains("shape")){a+="zip"
}else{a+=b.toLowerCase()
}}}}this.downloadFromService(this.url,a)
},disableClick:function(){OpenLayers.Event.observe(this.div,"mousedown",function(a){OpenLayers.Event.stop(a,true)
});
return;
oscar.jQuery(this.div).draggable({containment:"parent",start:function(a,b){oscar.jQuery(this).addClass("olDragDown")
},stop:function(a,b){oscar.jQuery(this).removeClass("olDragDown")
}})
},initRequests:function(){this.transform();
return
},transform:function(){var b=this;
var a=function(){oscar.jQuery(b.grfx).addClass("downloadReady");
oscar.jQuery(b.content).addClass("ready");
oscar.jQuery(b.content).fadeIn("fast")
};
oscar.jQuery(this.content).fadeOut("fast",a)
},gotoUrl:function(c,b){switch(c){case"dCoverage":var a=document.createElement("iframe");
oscar.jQuery(a).addClass("dmIFrame");
document.body.appendChild(a);
a.src=b;
break;
case"dMetadata":window.open(b);
break
}},requestFail:function(c){var b=this;
var a=function(){b.txt.innerHTML="Download Cancelled";
oscar.jQuery(b.grfx).addClass("downloadCancelled");
oscar.jQuery(b.content).fadeIn("fast")
};
oscar.jQuery(this.content).fadeOut("fast",a)
},CLASS_NAME:"oscar.Gui.Download.WFS"});
oscar.Gui.Dialog=oscar.BaseClass(oscar.Gui,{name:"Dialog",dialog:null,container:null,header:null,body:null,icon:null,dialogButtons:null,initialize:function(b,a){this._setDlgDefaults();
this.dialogButtons=[];
if(!a){a={}
}this.dialogProperties.icon=a.icon;
this.name=b;
OpenLayers.Util.extend(this.dialogProperties,a);
if(!this.dialogProperties.effect){this.dialogProperties.effect={effect:YAHOO.widget.ContainerEffect.FADE,duration:0.2}
}this.dialog=new YAHOO.widget.SimpleDialog(this.name,this.dialogProperties)
},setHeader:function(a){this.header=a
},setContent:function(a){this.body=document.createElement("div");
this.body.className="oscarGuiDialog";
if(typeof a=="object"){this.body.appendChild(a)
}else{this.body.innerHTML=oscar.i18n(a)
}},addButton:function(a){this.dialogButtons.push(a)
},render:function(){if(!this.container){this._createDialogContainer()
}this.dialog.cfg.queueProperty("buttons",this.dialogButtons);
this.dialog.setHeader(oscar.i18n(this.header));
this.dialog.setBody(this.body);
document.body.appendChild(this.container);
this.dialog.render(this.container)
},hide:function(){if(this.dialog){this.dialog.hide()
}this.destroy()
},show:function(){if(this.dialog){this.render();
this.dialog.show()
}},addOkButton:function(a){this.createButton("okayButtonLabel",a)
},addCancelButton:function(a){this.createButton("cancelButtonLabel",a)
},createButton:function(a,d){var b=this;
var c;
if(!d){c=function(){this.hide()
}
}else{c=function(){if(b.autoclose){this.hide()
}d()
}
}this.addButton({text:oscar.i18n(a),handler:c})
},destroy:function(){try{if(this.container!=null){document.body.removeChild(this.container)
}this.dialog=null
}catch(a){}},_createDialogContainer:function(){this.container=document.createElement("div");
this.container.className="yui-skin-sam";
this.container.id=OpenLayers.Util.createUniqueID("oscarGuiDialog")
},_setDlgDefaults:function(){this.dialogProperties={fixedcenter:true,visible:false,draggable:false,close:false,modal:true,constraintoviewport:true,zIndex:999}
},CLASS_NAME:"oscar.Gui.Dialog"});
oscar.Gui.AlertDialog=oscar.BaseClass(oscar.Gui.Dialog,{initialize:function(c,b,a){if(!c){c=oscar.i18n("alertBoxHeader")
}if(!b){b=oscar.i18n("oneChecked")
}if(!a){a=[]
}a.icon=YAHOO.widget.SimpleDialog.ICON_WARN;
oscar.Gui.Dialog.prototype.initialize.apply(this,["AlertDialog",a]);
this.addOkButton();
this.setHeader(c);
this.setContent(b);
this.show()
},CLASS_NAME:"oscar.Gui.AlertDialog"});
oscar.Gui.ConfirmDialog=oscar.BaseClass(oscar.Gui.Dialog,{yesCallback:null,noCallback:null,initialize:function(c,b,a){a.icon=YAHOO.widget.SimpleDialog.ICON_HELP;
oscar.Gui.Dialog.prototype.initialize.apply(this,["ConfirmDialog",a]);
OpenLayers.Util.extend(this,a);
this.createButton("yesButtonLabel",this.yesCallback);
this.createButton("cancelButtonLabel",this.noCallback);
this.setHeader(c);
this.setContent(b);
this.show()
},CLASS_NAME:"oscar.Gui.ConfirmDialog"});
oscar.Gui.MultiItemChooserTable=oscar.BaseClass({EVENT_TYPES:["clicked","resetClicked"],events:null,DataSource:null,DataTable:null,autoComplete:null,ItemsSelections:null,preSelectedItems:null,sortOnCheck:true,paginator:null,rowsPerPage:8,numPageLinks:5,columnDefs:null,dataTableConfig:null,paginatorPanel:null,container:null,requestParameter:"filter",checkAllDisplay:true,resetButtonDisplay:true,autoCompletePanel:null,getDefaultTableConfiguration:function(){return{MSG_EMPTY:oscar.i18n("MICT_MSG_EMPTY"),MSG_ERROR:oscar.i18n("MICT_MSG_ERROR"),MSG_LOADING:oscar.i18n("MICT_MSG_LOADING"),MSG_SORTASC:oscar.i18n("MICT_MSG_SORTASC"),MSG_SORTDESC:oscar.i18n("MICT_MSG_SORTDESC")}
},initialize:function(a,f,c,d,g,e,b){if(b){OpenLayers.Util.extend(this,b)
}this.dataTableConfig=this.getDefaultTableConfiguration();
OpenLayers.Util.extend(this.dataTableConfig,d);
this.events=new OpenLayers.Events(this,null,this.EVENT_TYPES,false,{includeXY:true});
this.container=a;
this.preSelectedItems=f;
this.ItemsSelections=f.slice(0);
this.DataSource=c;
this.columnDefs=g;
this.requestParameter=e;
this.inputBoxElement=null;
this.checkAllLabel=null;
this.buildAutoComplete();
if(this.checkAllDisplay){this.buildCheckAll()
}this.buildPaginator();
this.buildTableChooser()
},buildAutoComplete:function(){this.autoCompletePanel=document.createElement("div");
this.autoCompletePanel.setAttribute("class","oscar_Gui_MultiItemChooserTable_autoComplete");
this.autoCompletePanel.setAttribute("id",OpenLayers.Util.createUniqueID("mict_autoComplete"));
var e=document.createElement("span");
e.setAttribute("class","oscar_Gui_MultiItemChooserTable_inputPanel");
e.setAttribute("id",OpenLayers.Util.createUniqueID("mict_inputPanel"));
var d=document.createElement("div");
d.setAttribute("class","oscar_Gui_MultiItemChooserTable_filterContainer");
d.setAttribute("id",OpenLayers.Util.createUniqueID("filterContainer"));
var b=document.createElement("label");
b.setAttribute("class","oscar_Gui_MultiItemChooserTable_autocomplete_label");
b.setAttribute("id",OpenLayers.Util.createUniqueID("mict_autocomplete_label"));
b.setAttribute("for","autoCompleteInputBox");
b.innerHTML=oscar.i18n("mict_autocomplete_label");
this.inputBoxElement=document.createElement("input");
this.inputBoxElement.setAttribute("class","oscar_Gui_MultiItemChooserTable_autocomplete_input");
this.inputBoxElement.setAttribute("id",OpenLayers.Util.createUniqueID("mict_autocomplete_input"));
this.inputBoxElement.value=oscar.i18n("mict_autocomplete_label");
oscar.jQuery(this.inputBoxElement).addClass("mict_input_default");
oscar.jQuery(this.inputBoxElement).addClass("mict_input_inactive");
var c=function(){return function(h){if(this.value==oscar.i18n("mict_autocomplete_label")){this.value="";
oscar.jQuery(this).removeClass("mict_input_inactive")
}}
};
var f=function(h){return function(j){if(h.inputBoxElement.value.length==0){h.inputBoxElement.value=oscar.i18n("mict_autocomplete_label");
oscar.jQuery(h.inputBoxElement).addClass("mict_input_inactive");
if(h.clearFilterElement){h.clearFilterElement.removeClass("oscar_Gui_MultiItemChooserTable_clearFilter");
h.clearFilterElement.applyClass("oscar_Gui_MultiItemChooserTable_clearFilter_disabled")
}}}
};
this.inputBoxElement.onfocus=c();
this.inputBoxElement.onblur=f(this);
e.appendChild(this.inputBoxElement);
this.autoCompletePanel.appendChild(e);
if(this.resetButtonDisplay){this.createResetClickableLabel()
}this.createClearFilterClickableLabel();
var g=document.createElement("div");
g.setAttribute("style","clear:both");
this.autoCompletePanel.appendChild(g);
$(this.container).appendChild(this.autoCompletePanel);
var a=function(h){return function(j){if(this.value!=""){h.clearFilterElement.removeClass("oscar_Gui_MultiItemChooserTable_clearFilter_disabled");
h.clearFilterElement.applyClass("oscar_Gui_MultiItemChooserTable_clearFilter")
}h.getItems(this.value)
}
};
this.inputBoxElement.onkeyup=a(this)
},createClearFilterClickableLabel:function(){var c=document.createElement("span");
c.setAttribute("class","oscar_Gui_MultiItemChooserTable_clearFilterPanel");
c.setAttribute("id",OpenLayers.Util.createUniqueID("mict_clearFilterPanel"));
var a="";
var d=OpenLayers.Util.createUniqueID("mict_clearFilter_icon");
this.clearFilterElement=new oscar.Gui.ClickableLabel(a,{style:"block",ref:d});
this.clearFilterElement.events.on({labelClicked:this.clearFilter,scope:this});
this.clearFilterElement.applyClass("oscar_Gui_MultiItemChooserTable_clearFilter_disabled");
var b=oscar.i18n("mict_clearFilter_icon");
this.clearFilterElement.setTooltip(b);
this.clearFilterElement.appendTo(c);
this.autoCompletePanel.appendChild(c)
},createResetClickableLabel:function(){var a=document.createElement("span");
a.setAttribute("class","oscar_Gui_MultiItemChooserTable_resetPanel");
a.setAttribute("id",OpenLayers.Util.createUniqueID("mict_resetPanel"));
var b="";
var d=OpenLayers.Util.createUniqueID("mict_reset_icon");
this.resetElement=new oscar.Gui.ClickableLabel(b,{style:"block",ref:d});
this.resetElement.events.on({labelClicked:this.resetTable,scope:this});
this.resetElement.applyClass("oscar_Gui_MultiItemChooserTable_resetTable_disabled");
var c=oscar.i18n("mict_reset_icon");
this.resetElement.setTooltip(c);
this.resetElement.appendTo(a);
this.autoCompletePanel.appendChild(a)
},buildCheckAll:function(){var a=document.createElement("div");
a.setAttribute("class","oscar_Gui_MultiItemChooserTable_checkAll_Panel");
a.setAttribute("id",OpenLayers.Util.createUniqueID("mict_checkAll_Panel"));
var c="";
var d=OpenLayers.Util.createUniqueID("mict_checkAll_checkbox");
this.checkAllElement=new oscar.Gui.ClickableLabel(c,{style:"block",ref:d});
this.checkAllElement.events.on({labelClicked:this.toggleAllCheckBoxes,scope:this});
this.checkAllElement.appendTo(a);
var b=document.createElement("label");
b.setAttribute("class","oscar_Gui_MultiItemChooserTable_checkAll_label");
b.setAttribute("id",OpenLayers.Util.createUniqueID("mict_checkAll_label"));
b.setAttribute("for","autoCompleteInputBox");
b.innerHTML=oscar.i18n("mict_checkAll_label");
a.appendChild(b);
$(this.container).appendChild(a)
},toggleAllCheckBoxes:function(b){var a=this.checkAllElement.count%2;
var c=new Array();
records=this.DataTable.getRecordSet().getRecords();
for(i=0;
i<records.length;
i++){this.DataTable.getRecordSet().updateKey(records[i],"check",a);
c.push(records[i].getData(this.getCheckboxCol()))
}if(a){this.setCheckAllImage("All");
this.setItemsSelections(c)
}else{this.setCheckAllImage("None");
this.setItemsSelections([])
}this.DataTable.refreshView();
this.events.triggerEvent("clicked",this.ItemsSelections);
return false
},setCheckAllImage:function(a){if(a==null){var a="";
var b=this.isAllCheckboxesSelected();
if(b==0){a="None"
}else{if(b==1){a="All"
}else{a="Partial"
}}}if(a.toLowerCase()=="none"){this.checkAllElement.reset()
}this.checkAllElement.removeClass("oscar_Gui_MultiItemChooserTable_checkAll oscar_Gui_MultiItemChooserTable_checkAll_none oscar_Gui_MultiItemChooserTable_checkAll_partial oscar_Gui_MultiItemChooserTable_checkAll_all");
this.checkAllElement.applyClass("oscar_Gui_MultiItemChooserTable_checkAll oscar_Gui_MultiItemChooserTable_checkAll_"+a.toLowerCase())
},isAllCheckboxesSelected:function(){var a=0;
var b=this.DataTable.getRecordSet().getRecords();
for(i=0;
i<b.length;
i++){if(b[i].getData().check){a++
}}if(a==0){return 0
}else{if(a==b.length){return 1
}else{return -1
}}},buildPaginator:function(){this.paginatorPanel=document.createElement("div");
this.paginatorPanel.id=OpenLayers.Util.createUniqueID("mict_paginatorPanel");
this.paginatorPanel.setAttribute("class","oscar_Gui_MultiItemChooserTable_paginatorPanel");
this.paginator=new YAHOO.widget.Paginator({rowsPerPage:this.rowsPerPage,pageLinks:this.numPageLinks,containers:this.paginatorPanel,firstPageLinkLabel:oscar.i18n("first"),lastPageLinkLabel:oscar.i18n("last"),previousPageLinkLabel:oscar.i18n("previous"),nextPageLinkLabel:oscar.i18n("next"),alwaysVisible:false})
},buildTableChooser:function(){var b=document.createElement("div");
b.id=OpenLayers.Util.createUniqueID("tableChooser");
b.setAttribute("class","oscar_Gui_MultiItemChooserTable_multiItemChooserTable");
this.dataTableConfig.paginator=this.paginator;
var a=this;
this.DataTable=new YAHOO.widget.DataTable(b,this.columnDefs,this.DataSource,this.dataTableConfig);
this.DataTable.subscribe("rowMouseoverEvent",this.DataTable.onEventHighlightRow);
this.DataTable.subscribe("rowMouseoutEvent",this.DataTable.onEventUnhighlightRow);
this.DataTable.subscribe("rowClickEvent",this.DataTable.onEventSelectRow);
$(this.container).appendChild(b);
$(this.container).appendChild(this.paginatorPanel);
this.DataTable.subscribe("checkboxClickEvent",function(j){var g=this.getRecordSet();
var h=j.target;
var d=this.getRecord(h);
d.setData("check",h.checked);
var l=this.getColumn(h);
var f=d.getData(a.getCheckboxCol());
if(h.checked){a.ItemsSelections.push(f)
}else{for(var c=a.ItemsSelections.length-1;
c>-1;
c--){if(a.compareObj(a.ItemsSelections[c],f)){a.ItemsSelections.splice(c,1)
}}}a.events.triggerEvent("clicked",a.ItemsSelections);
if(a.resetButtonDisplay){a.enableResetButton()
}if(a.checkAllDisplay){a.setCheckAllImage()
}if(a.sortOnCheck){this.sortColumn(l,"yui-dt-desc")
}});
this.DataTable.subscribe("radioClickEvent",function(h){var f=this.getRecordSet();
var g=h.target;
var c=this.getRecord(g);
c.setData("check",g.checked);
var j=this.getColumn(g);
var d=c.getData(a.getCheckboxCol());
if(g.checked){a.ItemsSelections=[d]
}a.events.triggerEvent("clicked",a.ItemsSelections)
})
},setCheckboxes:function(){var b=this.DataTable.getRecordSet().getRecords();
for(var a=0;
a<b.length;
a++){b[a].setData("check",false)
}var e;
var d;
for(var c=0;
c<this.ItemsSelections.length;
c++){e=this.ItemsSelections[c];
for(var a=0;
a<b.length;
a++){d=b[a].getData(this.getCheckboxCol());
if(this.compareObj(e,d)){b[a].setData("check",true);
continue
}}}this.DataTable.render()
},compareObj:function(b,a){if(b===a.toString()){return true
}return false
},getCheckboxCol:function(){var b=this.columnDefs;
for(var a=0;
a<b.length;
a++){if(b[a].isCheckboxCol){return b[a].key
}}},checkboxSortFunction:function(e,d,h,g){var c=YAHOO.util.Sort.compare;
var f=c(e.getData(g),d.getData(g),h);
if(f===0){return c(d.getCount(),e.getCount(),h)
}else{return f
}},getItems:function(e){var a=this;
var c=function(j,k,l){a.DataTable.onDataReturnReplaceRows(j,k,l);
a.setCheckboxes();
var h=a.DataTable.getColumn("check");
a.DataTable.sortColumn(h,"yui-dt-desc");
a.paginator.set("totalRecords",a.DataTable.getRecordSet().getRecords().length);
if(a.checkAllDisplay){a.setCheckAllImage()
}};
var d="";
var b={};
b[this.requestParameter]=e;
var g=OpenLayers.Util.getParameterString(b);
if(g.length>0){var f=(this.DataSource.liveData.indexOf("?")>-1)?"&":"?";
d=f+g
}this.DataSource.sendRequest(d,c,this.DataTable)
},clearFilter:function(a){if(this.clearFilterElement.container.className=="oscar_Gui_MultiItemChooserTable_clearFilter"){this.inputBoxElement.value=oscar.i18n("mict_autocomplete_label");
oscar.jQuery(this.inputBoxElement).addClass("mict_input_inactive");
this.getItems("");
this.clearFilterElement.removeClass("oscar_Gui_MultiItemChooserTable_clearFilter");
this.clearFilterElement.applyClass("oscar_Gui_MultiItemChooserTable_clearFilter_disabled")
}},resetTable:function(a){if(this.resetElement.container.className=="oscar_Gui_MultiItemChooserTable_resetTable"){this.ItemsSelections=this.preSelectedItems.slice(0);
this.getItems("");
this.events.triggerEvent("resetClicked");
this.resetElement.removeClass("oscar_Gui_MultiItemChooserTable_resetTable");
this.resetElement.applyClass("oscar_Gui_MultiItemChooserTable_resetTable_disabled")
}},getItemsSelections:function(){return this.ItemsSelections
},setItemsSelections:function(a){this.ItemsSelections=a
},destroy:function(){this.DataTable.destroy();
$(this.container).innerHTML=""
},enableResetButton:function(){this.resetElement.removeClass("oscar_Gui_MultiItemChooserTable_resetTable_disabled");
this.resetElement.applyClass("oscar_Gui_MultiItemChooserTable_resetTable")
},CLASS_NAME:"oscar.Gui.MultiItemChooserTable"});
oscar.Gui.MultiCoordinateSystemsChooser=oscar.BaseClass(oscar.Gui.MultiItemChooserTable,{initialize:function(f,e,c,b,a,d){oscar.Gui.MultiItemChooserTable.prototype.initialize.apply(this,[f,e,c,{scrollable:false,width:"700px",height:"200px",initialRequest:"?"+d+"&IECachePatch"+new Date().getTime(),paginator:null,selectionMode:"standard"},[{key:"check",label:" ",sortable:true,sortOptions:{sortFunction:this.checkboxSortFunction},formatter:"checkbox",width:30},{key:b,label:oscar.i18n("srsCodeColumnLabel"),sortable:false,isCheckboxCol:true,width:150},{key:a,label:oscar.i18n("srsDescriptionColumnLabel"),sortable:false,width:480}],d,{checkAllDisplay:false,numPageLinks:10},]);
this.getItems("")
},getSRSsSelections:function(){return this.getItemsSelections()
},CLASS_NAME:"oscar.Gui.MultiCoordinateSystemsChooser"});
oscar.Gui.MultiDataExtractionChooser=oscar.BaseClass({clearSelections:true,initialize:function(b,j,g,c,h,e,f,d){this.preSelectedItemsIn=g;
this.DataSourceIn=h;
this.requestParameter=d;
if(b){this.container=b
}else{var a=document.createElement("div");
a.setAttribute("id",OpenLayers.Util.createUniqueID("MultiDataExtractionChooser"));
this.container=a
}if(j.toLowerCase()=="wcs"){titleHeaderText=oscar.i18n("mdec_coverage_type")
}else{titleHeaderText=oscar.i18n("mdec_feature_type")
}this.columnDefs=[{key:"check",label:"",sortable:true,sortOptions:{sortFunction:this.checkboxSortFunction},formatter:"checkbox",width:30},{key:e,label:"Id",sortable:false,hidden:true,isCheckboxCol:true,width:50},{key:f,label:titleHeaderText,sortable:false,width:300}];
if(c.length>0){this.buildDataConnList(c);
this.buildMultiItemChooserTable()
}else{return null
}},setDatasource:function(a){this.mict.DataSource=a
},buildDataConnList:function(d){var o=this;
var k=null;
var c=document.createElement("div");
oscar.jQuery(c).addClass(this.CLASS_NAME.replace(/\./g,"_")+"_radioPanel");
c.setAttribute("id",OpenLayers.Util.createUniqueID("mdec_radioPanel"));
var h=document.createElement("div");
oscar.jQuery(h).addClass(this.CLASS_NAME.replace(/\./g,"_")+"_dataConnItem");
h.setAttribute("id",OpenLayers.Util.createUniqueID("mdec_dataConnItem"));
radioButtonGroupName=OpenLayers.Util.createUniqueID("extractionConnections");
var m=document.createElement("label");
m.innerHTML=oscar.i18n("mdec_data_connection_none");
m.setAttribute("class","oscar_Gui_MultiDataExtractionTable_dataConnection_label");
try{radioDataConnection=document.createElement('<input type="radio" name="'+radioButtonGroupName+'" />')
}catch(f){radioDataConnection=document.createElement("input");
radioDataConnection.setAttribute("type","radio");
radioDataConnection.setAttribute("name",radioButtonGroupName)
}radioDataConnection.setAttribute("id",OpenLayers.Util.createUniqueID("mdec_dataextraction_radiobuttton"));
radioDataConnection.setAttribute("class","oscar_Gui_MultiDataExtractionTable_dataConnection_radio");
radioDataConnection.setAttribute("value","None");
radioDataConnection.setAttribute("dataConnName","None");
h.appendChild(radioDataConnection);
h.appendChild(m);
c.appendChild(h);
var b={radioButtonElements:radioDataConnection,ctx:this};
var l=null;
if(document.createEvent){l=document.createEvent("MouseEvents");
l.initMouseEvent("click",true,true,window,0,0,0,0,0,false,false,false,false,0,null);
radioDataConnection.dispatchEvent(l)
}else{if(document.createEventObject){l=document.createEventObject("MouseEvents");
l.button=1;
radioDataConnection.fireEvent("onclick",l)
}else{return
}}var n=function(e){return function(p){o.changeExtractionContents(e)
}
};
radioDataConnection.onclick=n({radioButtonElements:radioDataConnection,ctx:this});
for(var g=0;
g<d.length;
g++){var j=document.createElement("label");
j.innerHTML=oscar.i18n("mdec_data_connections");
oscar.jQuery(j).addClass(this.CLASS_NAME.replace(/\./g,"_")+"_dataConnLabel");
h.setAttribute("id",OpenLayers.Util.createUniqueID("mdec_dataConnLabel"));
var h=document.createElement("div");
oscar.jQuery(h).addClass(this.CLASS_NAME.replace(/\./g,"_")+"_dataConnItem");
h.setAttribute("id",OpenLayers.Util.createUniqueID("mdec_dataConnItem"));
try{radioDataConnection=document.createElement('<input type="radio" name="'+radioButtonGroupName+'" />')
}catch(f){radioDataConnection=document.createElement("input");
radioDataConnection.setAttribute("type","radio");
radioDataConnection.setAttribute("name",radioButtonGroupName)
}radioDataConnection.setAttribute("id",OpenLayers.Util.createUniqueID("mdec_dataextraction_radiobuttton"));
radioDataConnection.setAttribute("class","oscar_Gui_MultiDataExtractionTable_dataConnection_radio");
radioDataConnection.setAttribute("value",d[g].id);
radioDataConnection.setAttribute("dataConnName",d[g].name);
var a=document.createElement("label");
a.innerHTML=d[g].name;
a.setAttribute("class","oscar_Gui_MultiDataExtractionTable_dataConnection_label");
h.appendChild(radioDataConnection);
h.appendChild(a);
c.appendChild(h);
var b={radioButtonElements:radioDataConnection,ctx:o};
var l=null;
if(document.createEvent){l=document.createEvent("MouseEvents");
l.initMouseEvent("click",true,true,window,0,0,0,0,0,false,false,false,false,0,null);
radioDataConnection.dispatchEvent(l)
}else{if(document.createEventObject){l=document.createEventObject("MouseEvents");
l.button=1;
radioDataConnection.fireEvent("onclick",l)
}else{return
}}var n=function(e){return function(p){o.changeExtractionContents(e)
}
};
radioDataConnection.onclick=n({radioButtonElements:radioDataConnection,ctx:this})
}$(this.container).appendChild(j);
$(this.container).appendChild(c)
},buildMultiItemChooserTable:function(){var a=document.createElement("div");
a.setAttribute("id",OpenLayers.Util.createUniqueID("mdec_multiDataItemChooser"));
a.setAttribute("class","oscar_Gui_MultiDataExtractionTable__MultiDataItemChooser");
$(this.container).appendChild(a);
this.mict=new oscar.Gui.MultiItemChooserTable(a.id,this.preSelectedItemsIn,this.DataSourceIn,{scrollable:false,width:"100%",height:"200px",initialRequest:"?"+this.requestParameter+"&IECachePatch"+new Date().getTime(),paginator:null,selectionMode:"standard"},this.columnDefs,this.requestParameter);
this.mict.events.on({resetClicked:this.resetDataConnection,scope:this})
},setDefaultDataConnection:function(f,e){var a="input";
var c=this.getElementsByName_iefix(a,e);
for(var b=0;
b<c.length;
b++){var d=c[b].getAttribute("dataConnName");
if(d==f){this.defaultDataConnectionId=c[b].getAttribute("Id");
c[b].setAttribute("checked",true);
c[b].checked="checked";
c[b].defaultChecked=true;
this.clearSelections=false;
c[b].onclick()
}}},getElementsByName_iefix:function(b,c){var d=document.getElementsByTagName(b);
var a=new Array();
for(i=0,iarr=0;
i<d.length;
i++){att=d[i].getAttribute("name");
if(att==c){a[iarr]=d[i];
iarr++
}}return a
},getContainer:function(){return this.container
},changeExtractionContents:function(c){var b=document.getElementsByName(c.radioButtonElements.name);
for(var a=0;
a<b.length;
a++){if(b[a].checked){c.ctx.loadExtractionContents(c.radioButtonElements);
break
}}},loadExtractionContents:function(a){try{this.contentsRequest(a.value,a.getAttribute("dataconnname"),this.mict.DataTable)
}catch(b){}},contentsRequest:function(f,b,c){var e=[];
for(i=0;
i<this.columnDefs.length;
i++){e.push('{key : "'+this.columnDefs[i].key+'"}')
}var a=new YAHOO.util.XHRDataSource("themeAction_findDataConnContents.action?dataConnectionId="+f);
a.responseType=YAHOO.util.XHRDataSource.TYPE_JSON;
a.connXhrMode="queueRequests";
a.responseSchema={resultsList:"Response.Results",fields:[{key:"check"},{key:"id"},{key:"title"}]};
if(this.clearSelections!=false){this.setExtractionSelections([]);
this.mict.setCheckAllImage("None")
}else{this.clearSelections=true
}c.getRecordSet().reset();
c.render();
var d=this.mict.getDefaultTableConfiguration()["MSG_LOADING"];
c.showTableMessage(d);
if(this!=null){this.setDatasource(a);
this.mict.getItems("")
}},getExtractionSelections:function(){return this.mict.getItemsSelections()
},setExtractionSelections:function(a){this.mict.setItemsSelections(a)
},getRadioButtonsNameAttribute:function(){return radioDataConnection.getAttribute("name")
},resetDataConnection:function(a){var b=document.getElementById(this.defaultDataConnectionId);
b.checked=true;
this.clearSelections=false;
b.onclick()
},CLASS_NAME:"oscar.Gui.MultiDataExtractionChooser"});
oscar.Gui.Grid=oscar.BaseClass({processor:null,doDialog:false,div:"selResults",tab:null,features:null,tabView:null,map:null,tables:null,featureCtrl:null,featureLayer:null,initialize:function(a){this.tables={};
OpenLayers.Util.extend(this,a);
this.EVENT_TYPES=["gridready","clean"];
this.events=new OpenLayers.Events(this,null,this.EVENT_TYPES,false,{includeXY:true});
if(this.processor){this.processor.events.on({complete:this.processResults,scope:this});
this.processor.events.on({clean:this.clean,scope:this})
}if(!document.getElementById(this.div)){var b=document.createElement("div");
b.id=this.div;
document.body.appendChild(b)
}this.buildTabLayout()
},processResults:function(d){this.map=d.map;
this.layer=d;
var c=d.features;
this.features={};
for(var b=0;
b<c.length;
b++){var a=c[b];
if(this.features[a.type]==null){this.features[a.type]=[]
}this.features[a.type].push(a)
}this.showGrid()
},showGrid:function(){this.tabView=new YAHOO.widget.TabView(this.tab.id);
for(var c in this.features){var b=this.features[c];
if(b.length==0){continue
}var a=this._addTab(c);
this._buildTable(a,c,b)
}oscar.jQuery("#"+this.div).addClass("yui-skin-sam");
if(this.doDialog){this.dlg=oscar.jQuery("#"+this.div).dialog({title:oscar.i18n("Features"),width:640,height:480,resizable:true,position:["left","bottom"]})
}this.tabView.selectTab(0);
this.events.triggerEvent("gridready",this.layer)
},buildTabLayout:function(){this.tab=document.createElement("div");
this.tab.id="tabs";
$(this.div).appendChild(this.tab)
},buildTable:function(a,l,d){oscar.jQuery(a).addClass("wfsGrid");
var f=this._getFeatureHeaders(d[0]);
var b=[];
for(var h=0;
h<f.length;
h++){b.push({key:f[h],sortable:true})
}var k=[];
for(var h=0;
h<d.length;
h++){var g=d[h].attributes;
g.fid=d[h].fid;
g.key=l;
k.push(g)
}var e=new YAHOO.util.DataSource(k);
e.responseType=YAHOO.util.DataSource.TYPE_JSARRAY;
e.responseSchema={fields:f};
var c=new YAHOO.widget.DataTable(a,b,e);
var j=function(o){d=this.features;
var p=function(u){for(var t=0;
t<d.length;
t++){var s=d[t];
if(s.key==u){return s.features
}}};
var r=function(u,t){for(var s=0;
s<t.length;
s++){if(u==t[s].fid){return t[s]
}}};
var i=this.tabView._configs.activeTab.value._configs.label.value;
var q=c.getRecord(o.target).getData("fid");
var n=r(q,this.features[i]);
var m=this.map.getControlsByClass("oscar.Control.SelectFeature")[0];
m.ctrl.unselectAll();
m.ctrl.select(n)
};
c.hideColumn("fid");
c.subscribe("rowMouseoverEvent",c.onEventHighlightRow);
c.subscribe("rowMouseoutEvent",c.onEventUnhighlightRow);
c.subscribe("rowClickEvent",c.onEventSelectRow);
c.subscribe("rowClickEvent",j,this,this);
this.tables[l]={dt:c}
},clean:function(){if(!this.tabView){return
}while(this.tabView._configs.tabs.value.length!=0){this.tabView.removeTab(this.tabView.getTab(0))
}if(this.map!=null){this.map.removeLayer(this.layer);
this.layer=null;
this.map=null
}if(this.dlg){oscar.jQuery(this.dlg).dialog("destroy")
}this.events.triggerEvent("clean")
},selectFeature:function(c){this._selectRow(c);
var d="";
d+="<TABLE>";
for(attributeName in c.attributes){if(!(attributeName=="fid"||attributeName=="key")){d+="<TR>";
d+="<TD valign='top'>";
d+="<span style='font-size:.75pc' class='entTitle'>"+attributeName+" : "+c.attributes[attributeName]+"</span>";
d+="</TD>";
d+="</TR>"
}}d+="</TABLE>";
var a=new oscar.FramedCloud("id",c.geometry.getBounds().getCenterLonLat(),null,d,null,true);
a.autoSize=false;
c.popup=a;
this.map.addPopup(a);
var b=c.geometry.getBounds().getCenterLonLat();
this.map.panTo(b)
},unSelectFeature:function(a){if(a.popup==null){return
}this.map.removePopup(a.popup);
a.popup.destroy();
a.popup=null
},_selectRow:function(k){var a=k.key;
if(!a){a=k.attributes.key
}if(k.gml){if(k.gml.featureNSPrefix&&k.gml.featureType){a=k.gml.featureNSPrefix+":"+k.gml.featureType
}}var h=null;
var c=null;
if(a.length>1){c=this._findTab(a)
}var b=this.tables[a].dt;
b.unselectAllRows();
var j=b.getRecordSet();
var d=j.getLength();
for(var f=0;
f<d;
f++){var g=j.getRecord(f);
var e=g.getData("fid");
if(e==k.fid){b.selectRow(g);
break
}}},_getListByName:function(a){for(var b=0;
b<this.features.length;
b++){var c=this.features[b];
if(c.key==a){return c
}}},_findTab:function(a){for(var b=0;
b<this.features.length;
b++){var c=this.tabView.getTab(b);
if(c._getLabel()==a){this.tabView.selectTab(b);
return c
}}},_addTab:function(a){var b=new YAHOO.widget.Tab({label:a});
this.tabView.addTab(b);
return b
},_buildTable:function(c,a,b){this.buildTable(c._configs.contentEl.value,a,b)
},_getFeatureHeaders:function(b){var c=[];
for(var a in b.attributes){c.push(a)
}c.push("fid");
return c
},CLASS_NAME:"oscar.Gui.Grid"});
oscar.Gui.CollapsiblePanel=oscar.BaseClass({collapsed:false,title:"",panel:null,container:null,contentPane:null,headerPanel:null,css:{container:"_collapsiblePanel",headerPanel:"_headerPanel",contentPanel:"_contentPanel",contentOpen:"contentOpen",contentClosed:"contentClosed",headerText:"_headerText"},initialize:function(a,b){OpenLayers.Util.extend(this,b);
this.container=a;
this.panel=document.createElement("div");
this.panel.id=OpenLayers.Util.createUniqueID(this.CLASS_NAME);
oscar.jQuery(this.panel).addClass(this.CLASS_NAME.replace(/\./g,"_")+"_collapsiblePanel");
this.contentPane=document.createElement("div");
this.contentPane.id=OpenLayers.Util.createUniqueID(this.CLASS_NAME+"_ContentPane");
oscar.jQuery(this.contentPane).addClass(this.CLASS_NAME.replace(/\./g,"_")+this.css.contentPanel);
this.createHeaderPanel();
this.panel.appendChild(this.contentPane);
$(this.container).appendChild(this.panel)
},createHeaderPanel:function(){var b=document.createElement("div");
oscar.jQuery(b).addClass(this.CLASS_NAME.replace(/\./g,"_")+this.css.headerPanel);
var a=this;
this.titleElement=document.createElement("div");
oscar.jQuery(this.titleElement).addClass(this.CLASS_NAME.replace(/\./g,"_")+this.css.headerText);
b.appendChild(this.titleElement);
oscar.jQuery(this.titleElement).click(function(c){a.collapsed=(!a.collapsed);
if(a.collapsed){oscar.jQuery(a.titleElement).removeClass(a.css.contentOpen);
oscar.jQuery(a.titleElement).addClass(a.css.contentClosed)
}else{oscar.jQuery(a.titleElement).removeClass(a.css.contentClosed);
oscar.jQuery(a.titleElement).addClass(a.css.contentOpen)
}oscar.jQuery(a.contentPane).slideToggle("slow")
});
if(this.collapsed){oscar.jQuery(this.titleElement).addClass(this.css.contentClosed);
oscar.jQuery(this.contentPane).css("display","none")
}else{oscar.jQuery(this.titleElement).addClass(this.css.contentOpen)
}this.panel.appendChild(b)
},setTitle:function(a){this.title=a;
this.titleElement.innerHTML=this.title
},getPanel:function(){return this.panel
},getContentPane:function(){return this.contentPane
},appendContent:function(a){this.contentPane.appendChild(a)
},CLASS_NAME:"oscar.Gui.CollapsiblePanel"});
oscar.Gui.DownloadOptions=oscar.BaseClass(oscar.Gui,{db:null,capabilities:null,serviceType:null,feature:null,defaultOptions:null,EVENT_TYPES:["serviceReady"],events:null,initialize:function(a){oscar.Gui.prototype.initialize.apply(this,arguments);
this.defaultOptions={};
this.events=new OpenLayers.Events(this,null,this.EVENT_TYPES,false,{includeXY:false})
},draw:function(){oscar.Gui.prototype.draw.apply(this);
oscar.jQuery(this.div).addClass("options");
OpenLayers.Event.observe(this.div,"mousedown",function(a){OpenLayers.Event.stop(a,true)
});
OpenLayers.Event.observe(this.div,"click",function(a){OpenLayers.Event.stop(a,true)
});
return this.div
},redraw:function(){this.div.innerHTML="";
var b=document.createElement("div");
this.div.appendChild(b);
oscar.jQuery(b).addClass("info");
var a=document.createElement("span");
var c=document.createElement("p");
b.appendChild(a);
b.appendChild(c);
a.innerHTML=this.feature.div.data("title")||this.feature.div.data("id");
if(!this.feature.div.data("abstract")||this.feature.div.data("abstract").length==0){c.innerHTML=""
}else{c.innerHTML=this.feature.div.data("abstract")
}this.buildDownloadOptions()
},deactivate:function(){if(this.cropTool){this.cropTool.deactivate()
}},buildDownloadOptions:function(){var d=this;
this.defaultOptions={};
var e=document.createElement("div");
e.id="userConfigPanel";
this.div.appendChild(e);
var b=document.createElement("div");
oscar.jQuery(b).addClass("buttonsPanel");
this.div.appendChild(b);
this.cropDiv=document.createElement("span");
oscar.jQuery(this.cropDiv).addClass("dOption crop");
this.cropDiv.setAttribute("title",oscar.i18n("Crop"));
b.appendChild(this.cropDiv);
var c=document.createElement("span");
c.setAttribute("title",oscar.i18n("AddToQueue"));
oscar.jQuery(c).addClass("dOption queueDownload");
b.appendChild(c);
OpenLayers.Event.observe(c,"click",function(f){d.queueDownload()
});
OpenLayers.Event.observe(this.cropDiv,"click",function(f){d.cropTool=new oscar.Control.Box();
d.map.addControl(d.cropTool);
$$(d.cropDiv).addClass("active");
d.cropTool.activate();
d.cropTool.events.on({done:function(i){var h=d.feature.layer;
var g=d.feature.geometry.getBounds();
var k=i.getBounds();
if(!g.intersectsBounds(k)&&!g.containsBounds(k)){alert("Crop area outside of the bounds");
return
}if(d.cropFeature){try{h.removeFeatures(d.cropFeature);
d.cropFeature=null
}catch(j){}}d.cropFeature=newFeature=d.feature.clone();
d.cropFeature.geometry=i;
h.addFeatures(d.cropFeature);
h.drawFeature(d.cropFeature,"temporary");
d.cropTool.deactivate();
$$(d.cropDiv).removeClass("active");
d.defaultOptions.bbox=i.getBounds()
},scope:d})
});
var a=this["getOptions_"+this.serviceType];
if(a){a.call(this,e)
}},getOptions_WFS:function(f){this.defaultOptions.service="WFS";
var b=oscar.Util.Metadata.getOperation(this.capabilities.capabilities,"GetFeature");
outputFormats=oscar.Util.Metadata.getParameters(this.capabilities.capabilities,"GetFeature",["outputFormat","formats"]);
var d=oscar.Util.Metadata.getFeatureTypesById(this.capabilities.capabilities,this.feature.div.data("id"));
this.makeFormatList(f,outputFormats);
this.makeCRSList(f,d.srss||[d.srs]);
var a=null;
try{opUrl=b.dcp.http.get
}catch(c){opUrl=b.href.get
}this.defaultOptions.operationUrl=opUrl;
this.defaultOptions.id=this.feature.div.data("id");
this.defaultOptions.bbox=this.feature.div.data("bbox");
this.defaultOptions.title=this.feature.div.data("title")||this.feature.div.data("id")
},makeFormatList:function(a,d){var j=this;
var h=document.createElement("div");
var l=function(n,f){for(var m=0;
m<f.length;
m++){if(n.toLowerCase()==f[m].label.toLowerCase()){return true
}}return false
};
var i=[];
for(var e in d){var k=oscar.Util.convertFormat(d[e]);
if(l(k,i)){continue
}var b={label:k,value:d[e]};
i.push(b)
}$$(a).append($$("<label></label>").html(oscar.i18n("Format")+":").addClass("heading"));
var g=document.createElement("input");
g.type="text";
h.appendChild(g);
$$(g).autocomplete({minLength:0,source:i,select:function(n,f){this.value=f.item.label;
j.defaultOptions.format=f.item.value;
if(f.item.value.indexOf("bag")>-1){var m=oscar.Util.CoordinateReferences.getReference(j.gridBaseCRS);
$$(".crsInput").attr("disabled","disabled");
$$(".crsButton").attr("disabled","disabled");
$$(".crsInput").val(m.description);
j.defaultOptions.crs=j.gridBaseCRS
}else{$$(".crsInput").removeAttr("disabled");
$$(".crsButton").removeAttr("disabled")
}return false
},focus:function(f,m){this.value=m.item.label;
j.defaultOptions.format=m.item.value;
return false
}}).css("width","190px");
oscar.jQuery(g).addClass("foramtListWidth");
var c=document.createElement("button");
c.innerHTML=oscar.i18n("Format");
h.appendChild(c);
oscar.jQuery(c).insertAfter(g).button({icons:{primary:"ui-icon-triangle-1-s"},text:false}).removeClass("ui-corner-all").addClass("ui-corner-right ui-button-icon").click(function(){if(oscar.jQuery(g).autocomplete("widget").is(":visible")){oscar.jQuery(g).autocomplete("close");
return
}oscar.jQuery(g).autocomplete("search","");
oscar.jQuery(g).focus()
});
g.value=i[0].label;
this.defaultOptions.format=i[0].value;
a.appendChild(h)
},makeCRSList:function(h,g){var e=this;
var f=document.createElement("div");
$$(f).css("margin-top","5px");
var a=[];
for(var d=0;
d<g.length;
d++){a.push(oscar.Util.CoordinateReferences.getReference(g[d]))
}$$(f).append($$("<label></label>").html(oscar.i18n("srsCodeColumnLabel")+":").addClass("heading"));
var b=document.createElement("input");
b.type="text";
$$(b).addClass("crsInput");
f.appendChild(b);
oscar.jQuery(b).autocomplete({minLength:0,source:function(n,j){var m=n.term;
var k=[];
for(var l in a){if(a[l].code.toLowerCase().contains(m.toLowerCase())){k.push(a[l])
}}j(k);
return
},select:function(j,i){this.value=i.item.description;
e.defaultOptions.crs=i.item.code;
return false
},focus:function(i,j){this.value=j.item.description;
return false
}}).data("autocomplete")._renderItem=function(j,k){var i=document.createElement("li");
return oscar.jQuery(i).data("item.autocomplete",k).append("<a>"+k.code+"<br>"+k.description+"</a>").appendTo(j)
};
$$(b).css("width","190px");
var c=document.createElement("button");
c.innerHTML=oscar.i18n("srsCodeColumnLabel");
$$(c).addClass("crsButton");
f.appendChild(c);
oscar.jQuery(c).insertAfter(b).button({icons:{primary:"ui-icon-triangle-1-s"},text:false}).removeClass("ui-corner-all").addClass("ui-corner-right ui-button-icon").click(function(){if(oscar.jQuery(b).autocomplete("widget").is(":visible")){oscar.jQuery(b).autocomplete("close");
return
}oscar.jQuery(b).autocomplete("search","");
oscar.jQuery(b).focus()
});
b.value=a[0].description;
this.defaultOptions.crs=a[0].code;
h.appendChild(f)
},makeFieldList:function(b,g){var m=this;
var c=document.createElement("div");
$$(c).css({position:"relative","margin-top":"5px"});
b.appendChild(c);
var f=[];
for(var e in g){f.push(g[e].identifier)
}$$(c).append($$("<label></label>").html(oscar.i18n("Fields")+": ").addClass("heading"));
var a=document.createElement("a");
a.innerHTML=oscar.i18n("Fields");
c.appendChild(a);
var h=$$("<div></div>");
$$(h).addClass("ui-fields");
$$(h).hide();
for(var e=0;
e<f.length;
e++){var l=$$("<div>");
var k=$$("<input type='checkbox'>");
if(e==0){k.attr("checked",true)
}k.click(function(o){var n=$$(this);
var p=m.defaultOptions.field;
var i=n.data("field");
var d=$$.inArray(i,p);
if(d!=-1){p.splice(d,1)
}else{p.push(i)
}m.defaultOptions.field=p
});
var j=$$("<label>");
j.text(f[e]);
k.data("field",f[e]);
$$(l).append(k);
$$(l).append(j);
$$(h).append(l)
}oscar.jQuery(h).insertAfter(a);
oscar.jQuery(a).button({icons:{primary:"ui-icon-triangle-1-s"},text:false}).click(function(){oscar.jQuery(h).fadeToggle("slow")
});
this.defaultOptions.field=new Array(f[0])
},getOptions_WCS:function(a){this.defaultOptions.service="WCS";
var c=document.createElement("div");
oscar.jQuery(c).addClass("optionsLoading");
a.appendChild(c);
var f=oscar.Util.Metadata.getOperation(this.capabilities.capabilities,"GetCoverage");
var h=function(n){for(var l=0;
l<n.parameters.length;
l++){var m=n.parameters[l];
if(m.name.toLowerCase("store")){for(var k=0;
k<m.values.length;
k++){if(m.values[k].toLowerCase()=="true"){return true
}}}}return false
};
this.defaultOptions.store=h(f);
var b=oscar.Util.Metadata.getOperationHref(this.capabilities.capabilities,"DescribeCoverage");
var d={service:"WCS",request:"DescribeCoverage",identifiers:this.feature.div.data("id"),version:this.capabilities.capabilities.version};
var i=this;
var g=function(o){oscar.jQuery(c).fadeOut();
var l=this.capabilities.capabilities.version;
var k=new oscar.Format.WCSDescribeCoverage({version:l});
var n=k.read(o.responseXML);
var j=null;
try{this.gridBaseCRS=n.coverageDescription.domain.spatialDomain.gridCRS.gridBaseCRS;
var j=n.coverageDescription.range.fields;
supportedCRSs=n.coverageDescription.supportedCRS;
supportedFormats=n.coverageDescription.supportedFormats;
this.makeFormatList(a,supportedFormats);
this.makeCRSList(a,supportedCRSs);
this.makeFieldList(a,j)
}catch(m){alert(m.message);
alert("error in response")
}};
var e=new OpenLayers.Request.GET({url:b,params:d,async:true,success:g,failure:function(j){},scope:this});
this.defaultOptions.operationUrl=f.dcp.http.get;
this.defaultOptions.id=this.feature.div.data("id");
this.defaultOptions.bbox=this.feature.div.data("bbox");
this.defaultOptions.title=this.feature.div.data("title")||this.feature.div.data("id")
},setFeature:function(a){this.feature=a;
this.getCapabilities();
this.redraw()
},getCapabilities:function(){this.capabilities=this.db.search("capabilities",this.feature.div.data("fk_capabilities"),function(a,b){return a.records[b]
});
this.serviceType=oscar.Util.Metadata.getServiceType(this.capabilities.capabilities)
},queueDownload:function(){var g=this.defaultOptions.service;
var k=null;
var i={service:g,version:this.capabilities.capabilities.version};
var n=function(r,u){if(!r){r=""
}var t=OpenLayers.Util.getParameterString(u);
t=unescape(t);
if(t.length>0){var s=(r.indexOf("?")>-1)?"&":"?";
r+=s+t
}return r
};
switch(g){case"WFS":var l=function(y,s,t,v,x){var z={version:t,featureType:v};
if(t!="1.0.0"){z.xy=(s.proj.projName=="longlat")?false:true
}if(x){z.srsName=x
}var w=new OpenLayers.Format.WFST(z);
var u=new OpenLayers.Filter.Spatial({type:OpenLayers.Filter.Spatial.BBOX,value:y,projection:s.projCode});
var r=OpenLayers.Format.XML.prototype.write.apply(w,[w.writeNode("wfs:GetFeature",{filter:u})]);
return r
};
var f=l(this.defaultOptions.bbox,this.map.projection,this.capabilities.capabilities.version,this.defaultOptions.id,this.defaultOptions.crs);
var i={service:"WFS",request:"GetFeature",srsName:this.defaultOptions.crs,filter:encodeURIComponent(f),version:this.capabilities.capabilities.version,typename:this.defaultOptions.id,outputFormat:encodeURIComponent(this.defaultOptions.format)};
var d=this.defaultOptions.operationUrl;
var h=OpenLayers.Util.getParameterString(i);
h=unescape(h);
if(h.length>0){var j=(d.indexOf("?")>-1)?"&":"?";
d+=j+h
}k=new oscar.Gui.Download.WFS(this.defaultOptions.operationUrl,i,{title:this.defaultOptions.title});
break;
case"WCS":var q=oscar.Util.EpsgConversion.epsgToUrn("ESPG:4326");
var b=this.defaultOptions.bbox;
var e=null;
var a=oscar.Util.EpsgConversion.epsgToUrn("EPSG:4326");
if(this.map.getProjectionObject().projCode!="EPSG:4326"){var m=this.map.getProjectionObject();
var p=new OpenLayers.Projection("EPSG:4326");
e=b.clone().transform(m,p).toArray();
m=null;
p=null
}else{e=b.toArray()
}var q=this.defaultOptions.crs;
if(q.indexOf("::")==-1){q=oscar.Util.EpsgConversion.epsgToUrn(q)
}var c=this.defaultOptions.field;
if(c.length>1){c=c.join(";")
}else{c=c.join(" ")
}var o={request:"GetCoverage",store:this.defaultOptions.store,GridBaseCRS:q,identifier:this.defaultOptions.id,RangeSubset:"contents",BoundingBox:e+","+a,format:this.defaultOptions.format,RangeSubset:c};
OpenLayers.Util.extend(o,i);
var d=n(this.defaultOptions.operationUrl,o);
k=new oscar.Gui.Download.WCS(d,null,{title:this.defaultOptions.title});
break
}if(k){this.events.triggerEvent("serviceReady",k)
}},CLASS_NAME:"oscar.Gui.DownloadOptions"});
oscar.Gui.ServicePanel=oscar.BaseClass(oscar.Gui.CollapsiblePanel,{serviceMetadata:null,serviceContent:null,initialize:function(a){oscar.Gui.CollapsiblePanel.prototype.initialize.apply(this,[a]);
this.css.contentClass="servicePanelContent";
this.serviceContents=new oscar.Gui.CollapsiblePanel(this.contentPane);
this.serviceContents.setTitle(oscar.i18n("servicepanel_content_header"));
this.serviceMetadata=new oscar.Gui.CollapsiblePanel(this.contentPane,{collapsed:true});
this.serviceMetadata.setTitle(oscar.i18n("servicepanel_info_header"));
this.panel.appendChild(this.contentPane);
$(this.container).appendChild(this.panel)
},appendMetadataContent:function(a){this.serviceMetadata.appendContent(a)
},appendServiceContents:function(a){this.serviceContents.appendContent(a)
},CLASS_NAME:"oscar.Gui.ServicePanel"});
oscar.Gui.Metadata=oscar.BaseClass({div:null,servicePanel:null,metadataPanel:null,showUsed:true,requestList:null,theme:null,initialize:function(c,b,a){this.requestList=[];
if(a){OpenLayers.Util.extend(this,a)
}this.div=document.createElement("div");
oscar.jQuery(this.div).addClass("metadataConstraint");
this.servicePanel=document.createElement("div");
this.metadataPanel=document.createElement("div");
oscar.jQuery(this.servicePanel).addClass("Metadata_ServicePanel");
oscar.jQuery(this.metadataPanel).addClass("Metadata_MetadataPanel");
oscar.jQuery(this.metadataPanel).addClass("yui-skin-sam");
this.div.appendChild(this.servicePanel);
this.div.appendChild(this.metadataPanel);
this.theme=b;
this.loadCapabilities()
},getContainer:function(){return this.div
},loadCapabilities:function(){this.requestList=[];
for(var e=0;
e<this.theme.layers.length;
e++){var d=this.theme.layers[e];
if(d.layerType=="WMS"){if(!this.isLoaded(d.urls[0])){this.loadWMSCapabilities(d.urls[0])
}}if(d.layerType=="WMTS"){var b=d.urls[0];
b=b.split("/1.0.0")[0];
if(!this.isLoaded(b)){this.loadWMTSCapabilities(b)
}}}var a=null;
var c=new Array();
if((a=this.theme.getSelectionService())){c=c.concat(a)
}if((a=this.theme.getExtractionService())){c=c.concat(a)
}for(var e=0;
e<c.length;
e++){var f=c[e];
if(this.isLoaded(f.url)){continue
}switch(f.serviceType){case"WCS":this.loadWCSCapabilities(f.url);
break;
case"WFS":this.loadWFSCapabilities(f.url);
break
}}},isLoaded:function(a){for(var b=0;
b<this.requestList.length;
b++){if(this.requestList[b]==a){return true
}}this.requestList.push(a);
return false
},getLoadingDiv:function(){var a=document.createElement("div");
oscar.jQuery(a).addClass("md_loadingActive");
this.servicePanel.appendChild(a);
return a
},loadWCSCapabilities:function(c){var b=this.getLoadingDiv();
var e=function(j){try{var g=new oscar.Format.WCSCapabilities();
var i=j.responseXML;
var f=g.read(i);
oscar.jQuery(b).removeClass("md_loadingActive");
this.renderService(b,f)
}catch(h){a()
}};
var a=function(f){oscar.jQuery(b).removeClass("md_loadingActive");
oscar.jQuery(b).addClass("md_loadingFailed");
b.innerHTML=oscar.i18n("md_request_failed");
b.innerHTML+="<br>Url: "+c
};
var d={service:"WCS",request:"GetCapabilities"};
OpenLayers.loadURL(c,d,this,e,a)
},loadWMSCapabilities:function(c){var b=this.getLoadingDiv();
var e=function(j){try{var g=new OpenLayers.Format.WMSCapabilities();
var i=j.responseXML;
var f=g.read(i);
oscar.jQuery(b).removeClass("md_loadingActive");
this.renderService(b,f)
}catch(h){a()
}};
var a=function(f){oscar.jQuery(b).removeClass("md_loadingActive");
oscar.jQuery(b).addClass("md_loadingFailed");
b.innerHTML=oscar.i18n("md_request_failed");
b.innerHTML+="<br>Url: "+c
};
var d={service:"WMS",request:"GetCapabilities"};
OpenLayers.loadURL(c,d,this,e,a)
},loadWMTSCapabilities:function(c){var b=this.getLoadingDiv();
var e=function(j){try{var g=new oscar.Format.WMTSCapabilities();
var i=j.responseXML;
var f=g.read(i);
oscar.jQuery(b).removeClass("md_loadingActive");
this.renderService(b,f)
}catch(h){a()
}};
var a=function(f){oscar.jQuery(b).removeClass("md_loadingActive");
oscar.jQuery(b).addClass("md_loadingFailed");
b.innerHTML=oscar.i18n("md_request_failed");
b.innerHTML+="<br>Url: "+c
};
var d={service:"WMTS",request:"GetCapabilities"};
OpenLayers.loadURL(c,d,this,e,a)
},loadWFSCapabilities:function(c){var b=this.getLoadingDiv();
var e=function(j){try{var g=new oscar.Format.WFSCapabilities();
var i=j.responseXML;
var f=g.read(i);
oscar.jQuery(b).removeClass("md_loadingActive");
this.renderService(b,f)
}catch(h){a()
}};
var a=function(f){oscar.jQuery(b).removeClass("md_loadingActive");
oscar.jQuery(b).addClass("md_loadingFailed");
b.innerHTML=oscar.i18n("md_request_failed");
b.innerHTML+="<br>Url: "+c
};
var d={service:"WFS",request:"GetCapabilities"};
OpenLayers.loadURL(c,d,this,e,a)
},renderService:function(b,a){var c=new oscar.Gui.ServicePanel(b);
c.setTitle(oscar.Util.Metadata.getServiceTitle(a));
c.appendServiceContents(this.buildServiceContent(a));
c.appendMetadataContent(this.buildServiceMetadata(a))
},buildServiceMetadata:function(a){var d=document.createElement("div");
var b=this.buildServiceInformationPanel(a);
d.appendChild(b);
var c=this.buildServiceContactPanel(a);
d.appendChild(c);
return d
},buildServiceInformationPanel:function(a){var b=document.createElement("div");
var d=document.createElement("label");
d.innerHTML=oscar.i18n("md_service_info");
oscar.jQuery(d).addClass("identifier");
b.appendChild(d);
var e={serviceAbstract:oscar.Util.Metadata.getServiceAbstract(a)};
var c=this;
oscar.jQuery(d).click(function(i,h){var g=c.metadataPanel;
g.innerHTML="";
if(e.serviceAbstract){var j=c.buildAbstractPanel(e.serviceAbstract);
g.appendChild(j)
}if(e.serviceKeywords){var f=c.buildKeywordsPanel(e.serviceKeywords);
g.appendChild(f)
}});
return b
},buildServiceContactPanel:function(a){var c=document.createElement("div");
var d=document.createElement("label");
d.innerHTML=oscar.i18n("md_service_contactInfo");
oscar.jQuery(d).addClass("identifier");
c.appendChild(d);
var e=oscar.Util.Metadata.getContactInformation(a);
var b=this;
oscar.jQuery(d).click(function(j,i){var h=function(o,n){for(var q in o){var p=document.createElement("div");
oscar.jQuery(p).css("width","100%");
var m=o[q];
if(typeof m=="object"){h(m,n);
continue
}else{var l=document.createElement("div");
oscar.jQuery(l).css("width","45%");
oscar.jQuery(l).css("float","left");
l.innerHTML=oscar.i18n("md_contact_"+q)+":";
var k=document.createElement("div");
if(m.length==0){m=oscar.i18n("NotAvailable")
}k.innerHTML=m;
oscar.jQuery(k).css("width","45%");
oscar.jQuery(k).css("float","left");
p.appendChild(l);
p.appendChild(k)
}n.appendChild(p)
}};
var f=b.metadataPanel;
f.innerHTML="";
if(e){var g=document.createElement("div");
g.innerHTML=oscar.i18n("md_contact_caption");
oscar.jQuery(g).css("text-align","center");
oscar.jQuery(g).css("background-color","#B7AB83");
oscar.jQuery(g).css("font-weight","bold");
oscar.jQuery(g).css("font-size","14px");
f.appendChild(g);
h(e,f)
}else{f.innerHTML=oscar.i18n("md_contact_info_unavailable")
}});
return c
},buildServiceContent:function(e){var j=document.createElement("div");
var n=oscar.Util.Metadata.getServiceType(e);
var o=null;
var d=null;
var k=[];
switch(n){case oscar.Util.Metadata.WCS:o=oscar.Util.Metadata.getCoverages(e);
r=oscar.Util.Metadata.getOperationHref(e,"GetCoverage");
var p=this.theme.getExtractionService();
for(var q=0;
q<p.length;
q++){var t=p[q].url;
if(this.checkUrls(r,t)){for(var c in p[q].identifiers){k.push(p[q].identifiers[c])
}}}break;
case oscar.Util.Metadata.WFS:o=oscar.Util.Metadata.getFeatureTypes(e);
var r=oscar.Util.Metadata.getOperationHref(e,"GetFeature");
var y=null;
var a=new Array();
if((y=this.theme.getSelectionService())){a=a.concat(y)
}if((y=this.theme.getExtractionService())){a=a.concat(y)
}for(var q=0;
q<a.length;
q++){var t=a[q].url;
if(this.checkUrls(r,t)){for(var c in a[q].identifiers){k.push(a[q].identifiers[c])
}}}break;
case oscar.Util.Metadata.WMS:o=oscar.Util.Metadata.getLayers(e);
var r=oscar.Util.Metadata.getOperationHref(e,"GetMap");
for(var q=0;
q<this.theme.layers.length;
q++){var h=this.theme.layers[q].urls[0];
if(this.checkUrls(r,h)){for(var v in this.theme.layers[q].dataLayers){k.push(this.theme.layers[q].dataLayers[v].layerName)
}}}break;
case oscar.Util.Metadata.WMTS:o=oscar.Util.Metadata.getContent(e);
var r=oscar.Util.Metadata.getOperationHref(e,"GetTile");
for(var q=0;
q<this.theme.layers.length;
q++){var f=this.theme.layers[q].urls[0];
f=f.split("/1.0.0")[0];
if(this.checkUrls(r,f)){for(var v in this.theme.layers[q].dataLayers){k.push(this.theme.layers[q].dataLayers[v].layerName)
}}}break
}var b=document.createElement("div");
oscar.jQuery(b).addClass("idContainer");
for(var q=0;
q<o.length;
q++){var g=document.createElement("div");
oscar.jQuery(g).css("height","30px");
var m=o[q];
if(this.showUsed){var l=function(D,C){for(var A=0;
A<D.length;
A++){var B=D[A];
var z=C.name||C.identifier||C.title;
if(B==z){return true
}}return false
};
if(!l(k,m)){continue
}}var x=null;
if(typeof m.title=="object"){x=m.title[OpenLayers.Lang.getCode()];
if(x==null){for(var w in m.title){x=m.title[w];
break
}}}var s=x||m.title||m.name||m.Title;
var u=new oscar.Gui.ClickableLabel(s,{style:"block",ref:m});
u.applyClass("identifier");
u.events.on({labelClicked:this.identifierClicked,scope:this});
u.appendTo(b)
}j.appendChild(b);
return j
},buildAbstractPanel:function(b){var c=document.createElement("div");
c.id="md_abstract_panel";
var a=document.createElement("label");
a.innerHTML=oscar.i18n("md_abstract_label");
oscar.jQuery(a).addClass("md_label");
c.appendChild(a);
var d=document.createElement("div");
d.id="md_abstractPanel";
if(b.length==0){b=oscar.i18n("NotAvailable")
}d.innerHTML=b;
c.appendChild(d);
return c
},buildKeywordsPanel:function(f){var c=[];
for(var e=0;
e<f.length;
e++){if(typeof f[e]=="object"){c.push(f[e].value)
}else{c.push(f[e])
}}f=c;
var a=document.createElement("div");
a.id="md_keywords_panel";
var b=document.createElement("label");
b.innerHTML=oscar.i18n("md_keywords_label");
oscar.jQuery(b).addClass("md_label");
var d=document.createElement("div");
d.innerHTML=f;
a.appendChild(b);
a.appendChild(d);
oscar.jQuery(a).css("display","none");
return a
},checkUrls:function(c,b){try{return c.toLowerCase().contains(b.toLowerCase())
}catch(a){return false
}},identifierClicked:function(r){var o=this.metadataPanel;
o.innerHTML="";
var v=r.ref;
var G=v.title||v.name||v.Title;
var g=v["abstract"]||"";
var B=v.keywords||v.Keywords||"";
var z=this.buildAbstractPanel(g);
var m=this.buildKeywordsPanel(B);
o.appendChild(z);
o.appendChild(m);
var y=document.createElement("div");
y.id="md_resource_panel";
var q=document.createElement("label");
oscar.jQuery(q).addClass("md_label");
q.innerHTML=oscar.i18n("md_resources_label");
y.appendChild(q);
var D=document.createElement("div");
y.appendChild(D);
o.appendChild(y);
var c=oscar.Util.Metadata.getIdentifierMetadataUrls(v);
if(c.length==0){oscar.jQuery(y).css("display","none")
}if(c.length>0){var h=[];
var b=c[0];
if(typeof b=="object"){for(var e in b){h.push(e)
}}else{h.push("type");
h.push("format");
h.push("url");
var t=[];
for(var i in c){var l=new String(c[i]);
var r={type:"",format:"",url:l};
t.push(r)
}c=t
}var x=function(J,I,K,L){if(!L){L=I.getData("href")||I.getData("url")
}var H=document.createElement("a");
H.href=L;
H.innerHTML="View";
H.target="_new";
J.appendChild(H)
};
var A=function(I,H,J,K){if(K.length==0){K=oscar.i18n("NotAvailable")
}I.innerHTML=K
};
var d=function(I,H,J,K){if(K.length==0){K=oscar.i18n("NotAvailable")
}I.innerHTML=K
};
var p=function(H){for(var I=0;
I<h.length;
I++){if(H==h[I]){return h[I]
}}return null
};
var j=p("type");
var a=p("format");
var n=p("url")||p("href");
var F=[{key:j,label:oscar.i18n("map.information.url.column.type"),formatter:A,sortable:true,resizeable:true},{key:a,label:oscar.i18n("map.information.url.column.format"),formatter:d,resizeable:true},{key:n,formatter:x,label:oscar.i18n("map.information.url.column.onlineresource"),resizeable:true}];
var u=new YAHOO.util.DataSource(c);
u.responseType=YAHOO.util.DataSource.TYPE_JSARRAY;
u.responseSchema={fields:h};
var C={MSG_EMPTY:oscar.i18n("map.information.no.records.found")};
var s=new YAHOO.widget.DataTable(D,F,u,C);
s.render()
}if(v.styles&&v.styles.length>0){var f=document.createElement("div");
var k=document.createElement("label");
oscar.jQuery(k).addClass("md_label");
k.innerHTML=oscar.i18n("md_legend_graphic");
f.appendChild(k);
var w=v.styles[0].legend;
var E=document.createElement("img");
E.src=w.href;
f.appendChild(E);
o.appendChild(f)
}},CLASS_NAME:"oscar.Gui.Metadata"});
oscar.Gui.ClickableLabel=oscar.BaseClass(oscar.Gui,{styles:{BLOCK:"block",INLINE:"inline"},EVENT_TYPES:["labelClicked","labelTextChanged"],events:null,container:null,style:"inline",ref:null,count:0,isToggled:false,labelText:"",previousText:"",initialize:function(b,a){if(a){OpenLayers.Util.extend(this,a)
}this.events=new OpenLayers.Events(this,null,this.EVENT_TYPES,false,{includeXY:true});
this.events.register("labelTextChanged",this,this.updateText);
this.createContainer();
this.setLabelText(b)
},createContainer:function(){if(this.style==this.styles.BLOCK){this.container=document.createElement("div")
}else{if(this.style==this.styles.INLINE){this.container=document.createElement("span")
}else{throw"Invalid style: "+this.style;
return
}}this.container.onmouseup=this.clicked.bind(this)
},clicked:function(a){this.count++;
this.isToggled=!this.isToggled;
this.events.triggerEvent("labelClicked",this)
},setLabelText:function(a){this.previousText=this.labelText;
this.labelText=a;
this.events.triggerEvent("labelTextChanged")
},updateText:function(a){this.container.innerHTML=this.labelText
},appendTo:function(a){a.appendChild(this.container)
},revert:function(){if(this.previousText.length>0){this.setLabelText(this.previousText)
}},toggle:function(){return this.isToggled
},applyClass:function(a){if(!(a instanceof Array)){a=[a]
}for(var b=0;
b<a.length;
b++){oscar.jQuery(this.container).addClass(a[b])
}},removeClass:function(a){if(!(a instanceof Array)){a=[a]
}for(var b=0;
b<a.length;
b++){oscar.jQuery(this.container).removeClass(a[b])
}},reset:function(){this.count=0
},setTooltip:function(a){oscar.jQuery(this.container).attr("title",a)
},CLASS_NAME:"oscar.Gui.ClickableLabel"});
oscar.Gui.KeywordVocabularyTable=oscar.BaseClass({tableDisplayTag:null,preSavedKeywords:null,preSavedVocabularies:null,kwDataTable:null,tableContent:null,initialize:function(a,c,b){this.tableDisplayTag=a;
this.preSavedKeywords=c;
this.preSavedVocabularies=b;
this.tableContent={keywords:{},vocabularies:{}};
YAHOO.widget.DataTable.Formatter.customBtnFormatter=this.customBtnFormatter;
this.buildKeywordVocabularyTable(this.preSavedKeywords,this.preSavedVocabularies)
},customBtnFormatter:function(a,b,c,d){if(b._oData.Keyword){a.innerHTML='<div class="KeywordVocabularyTableDeleteRow"></div>'
}else{a.innerHTML='<div class="KeywordVocabularyTableAddRow"></div>'
}},buildKeywordVocabularyTable:function(c,f){var e;
if((c.length<1)||(c.length==1&&c[0]=="")){e=new YAHOO.util.DataSource([{Keyword:"",Vocabulary:""}])
}else{var g=[];
for(var b=0;
b<c.length;
b++){g[b]={Keyword:c[b],Vocabulary:f[b]}
}g.push({Keyword:"",Vocabulary:""});
e=new YAHOO.util.DataSource(g)
}e.responseType=YAHOO.util.DataSource.TYPE_JSARRAY;
e.responseSchema={fields:["Keyword","Vocabulary","button"]};
var d=[{key:"Keyword",label:oscar.i18n("metadataKeywordLabel"),sortable:false,width:240,editor:new YAHOO.widget.TextboxCellEditor()},{key:"Vocabulary",label:oscar.i18n("metadataVocabularyLabel"),sortable:false,width:390,editor:new YAHOO.widget.TextboxCellEditor()},{key:"button",label:"",formatter:"customBtnFormatter",width:16}];
var a=this;
kwDataTable=new YAHOO.widget.DataTable(this.tableDisplayTag,d,e,{});
kwDataTable.subscribe("cellMouseoverEvent",function(h){a.highlightEditableCell(h)
});
kwDataTable.subscribe("cellMouseoutEvent",kwDataTable.onEventUnhighlightCell);
kwDataTable.subscribe("cellClickEvent",kwDataTable.onEventShowCellEditor);
kwDataTable.subscribe("cellClickEvent",function(h){a.cellClicked(h)
})
},highlightEditableCell:function(a){var b=a.target;
if(YAHOO.util.Dom.hasClass(b,"yui-dt-editable")){kwDataTable.highlightCell(b)
}},cellClicked:function(e){var f=e.target;
var a=kwDataTable.getRecord(f);
var d=kwDataTable.getColumn(f);
var c=kwDataTable.getRecordIndex(a);
if(d.key=="button"){var b=f.innerHTML;
if(b.indexOf("KeywordVocabularyTableAddRow")!=-1){f.innerHTML='<div class="KeywordVocabularyTableDeleteRow"></div>';
this.addRow(c+1)
}else{this.deleteRow(c);
if(kwDataTable.getRecordSet().getLength()==0){this.addRow(0)
}}}},addRow:function(a){var b={Keyword:"",Vocabulary:"",button:null};
kwDataTable.addRow(b,a)
},deleteRow:function(a){kwDataTable.deleteRow(a)
},getTableContent:function(){var d=kwDataTable.getRecordSet();
var a,c=[],e=[];
for(var b=0;
b<d.getLength();
b++){a=d.getRecord(b).getData("Keyword");
if(a!=""){c.push(d.getRecord(b).getData("Keyword"));
e.push(d.getRecord(b).getData("Vocabulary"))
}}this.tableContent.keywords=c;
this.tableContent.vocabularies=e;
return this.tableContent
},CLASS_NAME:"oscar.Gui.KeywordVocabularyTable"});
oscar.Gui.ComboBox=oscar.BaseClass(oscar.Gui,{data:null,defaultValue:"",source:null,EVENT_TYPES:["onSelect","onRender","onChange"],initialize:function(a){this.EVENT_TYPES=oscar.Gui.ComboBox.prototype.EVENT_TYPES.concat(oscar.Gui.prototype.EVENT_TYPES);
oscar.Gui.prototype.initialize.apply(this,[a]);
this.draw()
},draw:function(){oscar.Gui.prototype.draw.apply(this);
this.input=document.createElement("input");
this.input.setAttribute("class","comboBoxInput");
if(this.defaultValue!=""){this.input.value=this.defaultValue
}this.div.appendChild(this.input);
var b=this;
var a=oscar.jQuery(this.input).autocomplete({delay:0,minLength:0,source:b.source.bind(b),select:b.select.bind(b),change:b.change.bind(b)});
a.addClass("ui-widget ui-widget-content ui-corner-left");
a.data("autocomplete")._renderItem=b.render.bind(b);
this.button=document.createElement("button");
this.button.setAttribute("type","button");
this.button.innerHTML="&nbsp";
oscar.jQuery(this.button).attr("tabIndex",-1).attr("title",oscar.i18n("showall")).insertAfter(this.input).button({icons:{primary:"ui-icon-triangle-1-s"},text:false}).removeClass("ui-corner-all").addClass("ui-corner-right ui-button-icon").click(function(){if(oscar.jQuery(b.input).autocomplete("widget").is(":visible")){oscar.jQuery(b.input).autocomplete("close");
return
}oscar.jQuery(b.input).autocomplete("search","");
oscar.jQuery(b.input).focus()
})
},select:function(a,b){if(this.onSelect){this.onSelect.call(a.target,a,b)
}this.events.triggerEvent("onSelect",a.target.value)
},onSelect:function(a){var b=document.createElement("div");
b.value=a
},render:function(a,b){if(this.onRender){this.onRender.call(this,a,b)
}this.events.triggerEvent("onRender",a,b)
},onRender:function(b,c){var a=document.createElement("li");
oscar.jQuery(a).data("item.autocomplete",c).append("<a>"+c.label+"</a>").appendTo(b)
},change:function(a,b){if(this.onChange){this.onChange.call(a.target,a,b)
}this.events.triggerEvent("onChange",a.target.value)
},onChange:function(a){var b=document.createElement("div");
b.value=a
},CLASS_NAME:"oscar.Gui.ComboBox"});
oscar.Handler=oscar.BaseClass({initialize:function(a){},execute:function(a,b){},CLASS_NAME:"oscar.Handler"});
oscar.Handler.WFS=oscar.BaseClass(oscar.Handler,{EVENT_TYPES:["complete","requestComplete","beforeStart","clean"],events:null,singleRequest:false,requestCounter:0,feats:null,map:null,dialog:null,initialize:function(b,a){this.feats=[];
this.map=b;
OpenLayers.Util.extend(this,a);
this.events=new OpenLayers.Events(this,null,this.EVENT_TYPES,false,{includeXY:true});
this.events.register("requestComplete",this,this.requestComplete);
this.events.register("clean",this,this.clean)
},execute:function(b,d){this.events.triggerEvent("beforeStart");
this.events.triggerEvent("clean");
var e=d.getSelectionService();
for(var a=0;
a<e.length;
a++){var c=e[a];
if(c.geometryName==""){c.geometryName=this.doDescribeFeatureTypeRequest(c,b,d)
}else{this.doGetFeatureRequest(c,b,d)
}}},doDescribeFeatureTypeRequest:function(c,a,b){var e={service:"WFS",request:"DescribeFeatureType",version:c.version};
var d=function(g){c.schema=new OpenLayers.Format.WFSDescribeFeatureType().read(g.responseXML);
this.doGetFeatureRequest(c,a,b)
};
var f=function(g){this.events.triggerEvent("requestComplete")
};
OpenLayers.loadURL(c.url,e,this,d,f)
},buildProtocol:function(h,g,c){var f=new OpenLayers.Filter.Spatial({type:OpenLayers.Filter.Spatial.BBOX,value:this.getBounds(g),projection:c.srs});
var d=[];
for(var a in h.identifiers){var e=h.identifiers[a];
if(e.indexOf(h.schema.targetPrefix)>-1){e=e.split(":")[1]
}d.push(e)
}var b={extractAttributes:true};
b.srsName=c.srs;
if(h.version!="1.0.0"){b.xy=(this.map.projection.proj.projName=="longlat")?false:true
}b.autoConfig=true;
b.singleFeatureType=false;
var i=new OpenLayers.Protocol.WFS({url:h.url,version:h.version,featureType:d.toString(),geometryName:h.schema.featureTypes[0].properties[0].name,featureNS:h.schema.targetNamespace,featurePrefix:h.schema.targetPrefix,formatOptions:b,filter:f,scope:this});
return i
},doGetFeatureRequest:function(g,e,f){var h=this.buildProtocol(g,e,f);
var c=new Date();
var a=c.getHours();
var d=c.getMinutes();
var b=(a>12)?"am":"pm";
this.layer=new OpenLayers.Layer.Vector("@ "+a+":"+d+" "+b,{strategies:[new OpenLayers.Strategy.Fixed()],protocol:h,temporary:true,displayInLayerSwitcher:false});
this.layer.events.on({featureselected:function(k){var m=k.feature;
var n="<table>";
for(var l in m.attributes){var i=m.attributes[l];
n+="<tr><td>"+l;
n+="</td><td>"+i+"</td></tr>"
}n+="</table>";
var j=new oscar.FramedCloud("id",m.geometry.getBounds().getCenterLonLat(),null,n,null,true);
j.autoSize=false;
m.popup=j;
m.layer.map.addPopup(j)
},featureunselected:function(i){var j=i.feature;
j.layer.map.removePopup(j.popup);
j.popup=null
},beforefeatureremoved:function(i){feature=i.feature;
if(feature.popup){feature.layer.map.removePopup(feature.popup);
feature.popup=null
}},loadstart:function(){this.showDialog()
},loadend:function(){this.events.triggerEvent("requestComplete")
},scope:this});
this.map.addLayer(this.layer)
},getBounds:function(c){if(c.CLASS_NAME!=="OpenLayers.Geometry.Point"){return c.getBounds()
}var b=this.map.getPixelFromLonLat(new OpenLayers.LonLat(c.x,c.y));
var d=this.map.getLonLatFromPixel(new OpenLayers.Pixel(b.x+2,b.y+2));
var a=this.map.getLonLatFromPixel(new OpenLayers.Pixel(b.x-2,b.y-2));
var f=new OpenLayers.Geometry.LinearRing();
f.addComponent(new OpenLayers.Geometry.Point(a.lon,a.lat));
f.addComponent(new OpenLayers.Geometry.Point(d.lon,d.lat));
var e=new OpenLayers.Geometry.Polygon([f]);
return e.getBounds()
},showDialog:function(){this.dialog=new oscar.Gui.Dialog("Selection",{draggable:true,modal:false,width:250,height:100,zIndex:2001,fixedcenter:false});
this.dialog.setHeader(oscar.i18n("Loading"));
this.dialog.setContent(oscar.i18n("Please Wait"));
this.dialog.show()
},requestComplete:function(){if(this.dialog){this.dialog.hide();
this.dialog=null
}try{if(this.layer.features.length>0){this.events.triggerEvent("complete",this.layer)
}}catch(a){}},clean:function(){if(this.layer){this.layer.removeAllFeatures()
}},CLASS_NAME:"oscar.Handler.WFS"});
oscar.Control=oscar.BaseClass(OpenLayers.Control,{deactivate:function(){OpenLayers.Control.prototype.deactivate.apply(this,[arguments])
},draw:function(a){OpenLayers.Control.prototype.draw.apply(this,[a]);
return this.div
},CLASS_NAME:"oscar.Control"});
oscar.Control.ArgParser=oscar.BaseClass(OpenLayers.Control.ArgParser,{args:null,initialize:function(){OpenLayers.Control.ArgParser.prototype.initialize.apply(this,[])
},setMap:function(a){this.map=a;
this.args=OpenLayers.Util.getParameters()
},CLASS_NAME:"oscar.Control.ArgParser"});
oscar.Control.DragPanel=oscar.BaseClass(oscar.Control,{resizable:true,closed:true,closable:false,collapsible:true,iconClass:"",tooltipText:"",titleText:"",initialize:function(a){oscar.Control.prototype.initialize.apply(this,[a])
},setMap:function(a){this.map=a
},draw:function(){oscar.Control.prototype.draw.apply(this);
oscar.jQuery(this.div).addClass("o-widget");
this.handle=document.createElement("div");
oscar.jQuery(this.handle).addClass("handle");
this.handle.setAttribute("title",oscar.i18n(this.tooltipText));
this.icon=document.createElement("div");
oscar.jQuery(this.icon).addClass("oIcon");
if(this.iconClass&&this.iconClass.length>0){oscar.jQuery(this.icon).addClass(this.iconClass)
}this.title=document.createElement("div");
var c=document.createElement("span");
oscar.jQuery(c).addClass("panelTitleText");
c.innerHTML=oscar.i18n(this.titleText);
this.title.appendChild(c);
oscar.jQuery(this.title).addClass("panelTitle");
this.handle.appendChild(this.icon);
this.handle.appendChild(this.title);
if(this.closable){this.closeBox=document.createElement("div");
oscar.jQuery(this.closeBox).addClass("closeBox");
var a=this;
OpenLayers.Event.observe(this.closeBox,"click",function(d){oscar.jQuery(a.div).fadeOut();
OpenLayers.Event.stop(d,true)
});
this.handle.appendChild(this.closeBox)
}if(this.collapsible){this.minMax=document.createElement("div");
oscar.jQuery(this.minMax).addClass("minMax");
oscar.jQuery(this.minMax).addClass("contentOpen");
var a=this;
OpenLayers.Event.observe(this.minMax,"click",function(d){a.toggleContentDisplay();
OpenLayers.Event.stop(d,true)
});
oscar.jQuery(this.clicker).addClass("contentOpen");
this.handle.appendChild(this.minMax)
}this.div.appendChild(this.handle);
this.content=document.createElement("div");
oscar.jQuery(this.content).addClass("content");
this.div.appendChild(this.content);
OpenLayers.Event.observe(this.div,"mousedown",function(d){OpenLayers.Event.stop(d,true)
});
oscar.jQuery(this.div).draggable({containment:"parent",start:function(d,e){oscar.jQuery(this).addClass("olDragDown")
},stop:function(d,e){oscar.jQuery(this).removeClass("olDragDown")
},cancel:"div.content"});
if(this.resizable){oscar.jQuery(this.div).resizable()
}if(this.closed){this.toggleContentDisplay()
}oscar.jQuery(this.div).hide();
var b=this;
setTimeout(function(){oscar.jQuery(b.div).fadeIn("fast")
},0);
return this.div
},setTitle:function(a){this.title.innerHTML=oscar.i18n(a)
},toggleContentDisplay:function(){if(oscar.jQuery(this.minMax).hasClass("contentOpen")){oscar.jQuery(this.minMax).removeClass("contentOpen");
oscar.jQuery(this.minMax).addClass("contentClosed");
oscar.jQuery(this.div).addClass("small");
oscar.jQuery(this.content).hide();
if(this.resizable){oscar.jQuery(this.div).resizable("destroy")
}}else{oscar.jQuery(this.minMax).removeClass("contentClosed");
oscar.jQuery(this.minMax).addClass("contentOpen");
oscar.jQuery(this.div).removeClass("small");
oscar.jQuery(this.content).show();
if(this.resizable){oscar.jQuery(this.div).resizable()
}}},CLASS_NAME:"oscar.Control.DragPanel"});
oscar.Control.DataDiscovery=oscar.BaseClass(oscar.Control.DragPanel,{autoActivate:true,tooltipText:"DataDiscoverySearchToolTip",titleText:"DataDiscoverySearchTitle",iconClass:"",closed:false,resizable:false,collapsible:true,database:null,styles:{select:{fillColor:"#fff",strokeColor:"#000",strokeWidth:1,strokeDashstyle:"solid",opacity:0.1},temporary:{fillColor:"#ace",strokeColor:"#000",strokeWidth:1,strokeDashstyle:"dash",opacity:0.1}},initialize:function(a){oscar.Control.DragPanel.prototype.initialize.apply(this);
this.database=a;
this.database.events.on({dbupdated:this.dbupdated,scope:this})
},dbupdated:function(a){},setMap:function(a){oscar.Control.prototype.setMap.apply(this,[a]);
this.map.events.on({moveend:this.displayResults,scope:this});
this.checkLayer()
},draw:function(){oscar.Control.DragPanel.prototype.draw.apply(this);
this.buildDiscoverPanels();
return this.div
},buildDiscoverPanels:function(){this.discoverPanel=$$("<div></div>").addClass("discoverPanel");
var f=$$("<h3></h3>");
var h=$$("<a></a>").attr("href","#").html(oscar.i18n("Search"));
f.append(h);
var b=$$("<div></div>").addClass("searchPanel");
var c=$$("<h3></h3>");
var l=$$("<a></a>").attr("href","#").html(oscar.i18n("DownloadOptions"));
c.append(l);
this.optionsPanel=$$("<div></div>").addClass("optionsPanel");
this.queueHeader=$$("<h3></h3>");
var d=$$("<a></a>").attr("href","#").html(oscar.i18n("DownloadQueue"));
this.queueHeader.append(d);
this.queuePanel=$$("<div></div>").addClass("queuePanel");
$$(this.discoverPanel).append(f);
$$(this.discoverPanel).append(b);
$$(this.discoverPanel).append(c);
$$(this.discoverPanel).append(this.optionsPanel);
$$(this.discoverPanel).append(this.queueHeader);
$$(this.discoverPanel).append(this.queuePanel);
var a=$$("<div></div>");
a.css({padding:"2px 2px 2px 2px"});
var e=$$("<div></div>");
this.resultsPanel=$$("<div></div>").addClass("resultsPanel");
e.addClass("oscar_Gui_MultiItemChooserTable_resetTable_disabled");
e.addClass("reset");
var g=$$("<span></span>");
g.addClass("magnifyingGlass");
b.append(g);
b.append(a);
b.append(this.resultsPanel);
this.txt=$$("<input>").attr("type","text").addClass("search");
this.txt.css("width","200px");
a.append(this.txt);
a.append(e);
var k=this;
e.click(function(){k.reset()
});
var j=$$("<br>").attr("clear","left");
a.append(j);
this.txt.focus(function(){this.value=""
});
this.txt.keyup(function(m){switch(m.keyCode){case 13:case 16:case 16:case 17:case 18:return
}k.displayResults()
});
var i={header:"ui-icon-circle-arrow-e",headerSelected:"ui-icon-circle-arrow-s"};
oscar.jQuery(this.discoverPanel).accordion({collapsible:false,animated:false,icons:i});
OpenLayers.Event.observe(this.discoverPanel,"mousedown",function(m){OpenLayers.Event.stop(m,true)
});
OpenLayers.Event.observe(this.discoverPanel,"click",function(m){OpenLayers.Event.stop(m,true)
});
$$(this.content).append(this.discoverPanel);
this.getResults()
},unselectFeature:function(){this.resultsPanel.children().each(function(){$$(this).removeClass("selected")
});
this.layer.removeAllFeatures()
},reset:function(){this.unselectFeature();
this.txt.val("");
this.map.zoomToMaxExtent();
this.displayResults()
},getResults:function(){var j=this;
var f=this.database.tables.sources.columns;
var d=this.database.tables.sources.records;
for(var b=0;
b<d.length;
b++){var h=d[b];
var a=$$("<div></div>");
a.html(h.title||h.id).addClass("result");
var g=$$("<div></div>");
g.addClass(h.dataType);
a.prepend(g);
for(var i=0;
i<f.length;
i++){var e=f[i];
a.data(e,h[e])
}a.click(function(){var c=$$(this);
j.unselectFeature();
c.addClass("selected");
j.discoverPanel.accordion("activate",1);
j.drawFeature(c)
});
a.hide();
this.resultsPanel.append(a)
}this.displayResults()
},displayResults:function(c){var a=this;
var b=this.txt.val().trim();
this.resultsPanel.children().each(function(){var g=$$(this);
var e=a.map.getExtent();
var f=(e.containsBounds(g.data("bbox"))||e.intersectsBounds(g.data("bbox")));
var d=(b.length==0||g.data("id").toLowerCase().contains(b.toLowerCase())||g.data("title").toLowerCase().contains(b.toLowerCase()));
if(f&&d){g.show()
}else{g.hide()
}})
},drawFeature:function(a){var e=a.data("bbox");
if(this.layer&&this.layer.features.length>0){this.layer.removeAllFeatures()
}var c=new OpenLayers.Feature.Vector(e.toGeometry());
c.div=a;
this.layer.addFeatures(c);
this.layer.events.triggerEvent("loadend");
var b=this;
setTimeout(function(){var f=b.map.getControlsByClass("oscar.Control.SelectFeature")[0];
f.ctrl.unselectAll();
f.ctrl.select(c)
},0);
var d=this.map.getExtent();
if(d.containsBounds(e)){this.map.zoomToExtent(e)
}if(this.downloadOptions==null){this.downloadOptions=new oscar.Gui.DownloadOptions({db:this.database,map:this.map});
this.downloadOptions.events.on({serviceReady:this.queueDownload,scope:this});
this.downloadOptions.appendTo(this.optionsPanel)
}this.downloadOptions.setFeature(c)
},activate:function(){oscar.Control.prototype.activate.apply(this);
if(this.div){oscar.jQuery(this.div).fadeIn()
}this.checkLayer();
this.displayResults()
},checkLayer:function(){if(this.layer){return
}this.layer=new OpenLayers.Layer.Vector("Results");
this.layer.hidden=true;
var a=OpenLayers.Util.applyDefaults(this.styles.select,OpenLayers.Feature.Vector.style.select);
a.cursor="";
var b=OpenLayers.Util.applyDefaults(this.styles.temporary,OpenLayers.Feature.Vector.style.temporary);
this.layer.styleMap=new OpenLayers.StyleMap({select:a,temporary:b});
this.map.addLayer(this.layer)
},deactivate:function(){this.map.events.un({moveend:this.displayResults,scope:this});
if(this.layer&&this.layer.map!=null){this.map.removeLayer(this.layer);
this.layer=null
}if(this.div){oscar.jQuery(this.div).fadeOut()
}oscar.jQuery(this.div).empty();
oscar.Control.prototype.deactivate.apply(this)
},queueDownload:function(a){this.discoverPanel.accordion("activate",2);
if(this.queuePanel.children().length>0){this.queuePanel.prepend(a.draw())
}else{this.queuePanel.append(a.draw())
}},CLASS_NAME:"oscar.Control.DataDiscovery"});
oscar.Control.Multi=oscar.BaseClass(oscar.Control,{type:OpenLayers.Control.TYPE_TOOL,className:"MeasureToolBar",parent:null,size:new OpenLayers.Size(32,32),controls:null,subMenu:null,subMenuWidth:null,subMenuPosition:null,initialize:function(a){this.controls=[];
OpenLayers.Control.prototype.initialize.apply(this,[a])
},activate:function(){OpenLayers.Control.prototype.activate.apply(this,arguments);
this.initSubMenu()
},deactivate:function(){try{var a=function(c){return function(){try{c.panel_div.removeChild(c.subMenu)
}catch(d){}}
};
oscar.jQuery(this.subMenu).fadeOut("fast",a(this))
}catch(b){}},initSubMenu:function(){this.subMenuPosition=new OpenLayers.Pixel(this.panel_div.offsetLeft,this.panel_div.offsetHeight+20);
this.subMenu=document.createElement("div");
oscar.jQuery(this.subMenu).addClass("subMenu");
this.panel_div.appendChild(this.subMenu);
var a=document.createElement("div");
oscar.jQuery(a).addClass("subMenuBookEnd");
this.subMenu.appendChild(a);
oscar.jQuery(this.subMenu).hide();
oscar.jQuery(this.subMenu).fadeIn("fast");
this.subMenuWidth=this.subMenu.offsetWidth
},createSubMenuItem:function(){var b=function(c){return function(d){OpenLayers.Event.stop(d,true)
}
};
var a=document.createElement("span");
oscar.jQuery(a).addClass("subTool");
OpenLayers.Event.observe(a,"click",b(this));
return a
},addToSubMenu:function(c){this.subMenu.appendChild(c);
this.subMenuWidth+=c.offsetWidth;
var d=null;
var a=function(e){var g=e.offsetParent;
var f=e.parentNode;
return g.offsetWidth-f.offsetLeft-(f.offsetWidth/2)
};
var b=function(e){var h=e.offsetParent;
var j=0;
for(var f=0;
f<h.childNodes.length;
f++){var g=h.childNodes[f];
j+=g.offsetWidth
}return(j/2)
};
if(document.documentMode&&document.documentMode==8||oscar.Util.getBrowserName()!="msie"){d=a(this.subMenu)
}else{d=b(this.subMenu)
}oscar.jQuery(this.subMenu).css("position","absolute");
oscar.jQuery(this.subMenu).css("top","33px");
oscar.jQuery(this.subMenu).css("right",d+"px");
oscar.jQuery(this.subMenu).css("width",this.subMenuWidth+"px");
oscar.jQuery(this.subMenu).css("z-index","1999");
return;
this.subMenu.setAttribute("style","position:relative;top:"+33+"px;left:"+(0-this.subMenuWidth+18)+"px;width:"+this.subMenuWidth+"px")
},calcPosition:function(){var b=0;
var d=0;
for(var c=0;
c<this.subMenu.childNodes.length;
c++){b+=this.subMenu.childNodes[c].clientWidth;
d=(d<this.subMenu.childNodes[c].clientHeight)?this.subMenu.childNodes[c].clientHeight:d
}var a=this.subMenuPosition.x-b+(this.size.w/4)
},CLASS_NAME:"oscar.Control.Multi"});
oscar.Control.PanZoom=oscar.BaseClass(OpenLayers.Control.PanZoom,{initialize:function(a){OpenLayers.Control.PanZoom.prototype.initialize.apply(this,[a])
},draw:function(b){OpenLayers.Control.prototype.draw.apply(this,arguments);
b=this.position;
this.buttons=[];
var c=new OpenLayers.Size(22,30);
var a=new OpenLayers.Pixel(b.x,b.y);
this._addButton("zoomin","sliderTop.png",a,c);
this._addButton("zoomout","sliderBottom.png",a.add(0,c.h),c);
return this.div
},_addButton:function(a,d,i,g){var f=oscar.getImagePath()+"panzoom/"+d;
var b=OpenLayers.Util.createAlphaImageDiv(this.id+"_"+a,i,g,f,"absolute");
oscar.jQuery(b).addClass("panZoomPointer");
this.div.appendChild(b);
OpenLayers.Event.observe(b,"mousedown",OpenLayers.Function.bindAsEventListener(this.buttonDown,b));
OpenLayers.Event.observe(b,"dblclick",OpenLayers.Function.bindAsEventListener(this.doubleClick,b));
OpenLayers.Event.observe(b,"click",OpenLayers.Function.bindAsEventListener(this.doubleClick,b));
b.action=a;
b.map=this.map;
if(!this.slideRatio){var c=this.slideFactor;
var e=function(){return c
}
}else{var h=this.slideRatio;
var e=function(j){return this.map.getSize()[j]*h
}
}b.getSlideFactor=e;
this.buttons.push(b);
return b
},CLASS_NAME:"oscar.Control.PanZoom"});
oscar.Control.PanZoomBar=oscar.BaseClass(OpenLayers.Control.PanZoomBar,{zoomStopWidth:18,zoomStopHeight:11,slider:null,sliderEvents:null,zoomBarDiv:null,divEvents:null,zoomWorldIcon:false,draw:function(a){OpenLayers.Control.prototype.draw.apply(this,arguments);
a=this.position.clone();
this.buttons=[];
var b=new OpenLayers.Size(21,21);
var c=new OpenLayers.Pixel(13,10);
if(this.zoomWorldIcon){this._addButton("zoomworld",oscar.getImagePath()+"panzoom/overviewIcon.png",c,new OpenLayers.Size(28,30));
c=c.add(2,32)
}this._addButton("zoomin",oscar.getImagePath()+"panzoom/sliderTop.png",c,new OpenLayers.Size(22,30));
c=c.add(0,30);
c=this._addZoomBar(c);
this._addButton("zoomout",oscar.getImagePath()+"panzoom/sliderBottom.png",c,new OpenLayers.Size(22,30));
return this.div
},_addZoomBar:function(a){var f="OpenLayers_Control_PanZoomBar_Slider"+this.map.id;
var b=this.map.getNumZoomLevels()-1-this.map.getZoom();
var c=OpenLayers.Util.createAlphaImageDiv(f,a.add(-1,b*this.zoomStopHeight),new OpenLayers.Size(22,8),oscar.getImagePath()+"panzoom/sliderHandle.png","absolute");
this.slider=c;
this.sliderEvents=new OpenLayers.Events(this,c,null,true,{includeXY:true});
this.sliderEvents.on({mousedown:this.zoomBarDown,mousemove:this.zoomBarDrag,mouseup:this.zoomBarUp,dblclick:this.doubleClick,click:this.doubleClick});
var d=new OpenLayers.Size();
d.h=this.zoomStopHeight*this.map.getNumZoomLevels();
d.w=22;
var e=null;
if(OpenLayers.Util.alphaHack()){var f="OpenLayers_Control_PanZoomBar"+this.map.id;
e=OpenLayers.Util.createAlphaImageDiv(f,a,new OpenLayers.Size(d.w,this.zoomStopHeight),oscar.getImagePath()+"panzoom/sliderCenter.png","absolute",null,"crop");
e.style.height=d.h
}else{e=OpenLayers.Util.createDiv("OpenLayers_Control_PanZoomBar_Zoombar"+this.map.id,a,d,oscar.getImagePath()+"panzoom/sliderCenter.png")
}this.zoombarDiv=e;
this.divEvents=new OpenLayers.Events(this,e,null,true,{includeXY:true});
this.divEvents.on({mousedown:this.divClick,mousemove:this.passEventToSlider,dblclick:this.doubleClick,click:this.doubleClick});
this.div.appendChild(e);
this.startTop=parseInt(e.style.top);
this.div.appendChild(c);
this.map.events.register("zoomend",this,this.moveZoomBar);
a=a.add(0,this.zoomStopHeight*this.map.getNumZoomLevels());
return a
},passEventToSlider:function(a){this.sliderEvents.handleBrowserEvent(a)
},divClick:function(a){if(!OpenLayers.Event.isLeftClick(a)){return
}var e=a.xy.y;
var d=OpenLayers.Util.pagePosition(a.object)[1];
var c=(e-d)/this.zoomStopHeight;
var b=(this.map.getNumZoomLevels()-1)-c;
if(this.map.fractionalZoom){b=Math.min(Math.max(b,0),this.map.getNumZoomLevels()-1)
}else{b=Math.floor(b)
}this.map.zoomTo(b);
OpenLayers.Event.stop(a)
},zoomBarDown:function(a){if(!OpenLayers.Event.isLeftClick(a)){return
}this.map.events.on({mousemove:this.passEventToSlider,mouseup:this.passEventToSlider,scope:this});
this.mouseDragStart=a.xy.clone();
this.zoomStart=a.xy.clone();
this.div.style.cursor="move";
this.zoombarDiv.offsets=null;
OpenLayers.Event.stop(a)
},zoomBarDrag:function(b){if(this.mouseDragStart!=null){var a=this.mouseDragStart.y-b.xy.y;
var d=OpenLayers.Util.pagePosition(this.zoombarDiv);
if((b.clientY-d[1])>0&&(b.clientY-d[1])<parseInt(this.zoombarDiv.style.height)-2){var c=parseInt(this.slider.style.top)-a;
this.slider.style.top=c+"px"
}this.mouseDragStart=b.xy.clone();
OpenLayers.Event.stop(b)
}},zoomBarUp:function(b){if(!OpenLayers.Event.isLeftClick(b)){return
}if(this.zoomStart){this.div.style.cursor="";
this.map.events.un({mouseup:this.passEventToSlider,mousemove:this.passEventToSlider,scope:this});
var a=this.zoomStart.y-b.xy.y;
var c=this.map.zoom;
if(this.map.fractionalZoom){c+=a/this.zoomStopHeight;
c=Math.min(Math.max(c,0),this.map.getNumZoomLevels()-1)
}else{c+=Math.round(a/this.zoomStopHeight)
}this.map.zoomTo(c);
this.moveZoomBar();
this.mouseDragStart=null;
OpenLayers.Event.stop(b)
}},moveZoomBar:function(){OpenLayers.Control.PanZoomBar.prototype.moveZoomBar.apply(this,arguments)
},_addButton:function(a,d,i,g){var f=d;
var b=OpenLayers.Util.createAlphaImageDiv(this.id+"_"+a,i,g,f,"absolute");
this.div.appendChild(b);
OpenLayers.Event.observe(b,"mousedown",OpenLayers.Function.bindAsEventListener(this.buttonDown,b));
OpenLayers.Event.observe(b,"dblclick",OpenLayers.Function.bindAsEventListener(this.doubleClick,b));
OpenLayers.Event.observe(b,"click",OpenLayers.Function.bindAsEventListener(this.doubleClick,b));
b.action=a;
b.map=this.map;
if(!this.slideRatio){var c=this.slideFactor;
var e=function(){return c
}
}else{var h=this.slideRatio;
var e=function(j){return this.map.getSize()[j]*h
}
}b.getSlideFactor=e;
this.buttons.push(b);
return b
},doubleClick:function(a){return OpenLayers.Control.PanZoom.prototype.doubleClick.apply(this,arguments)
},buttonDown:function(a){OpenLayers.Control.PanZoom.prototype.buttonDown.apply(this,arguments)
},CLASS_NAME:"oscar.Control.PanZoomBar"});
oscar.Control.Permalink=oscar.BaseClass(OpenLayers.Control.Permalink,{argParserClass:oscar.Control.ArgParser,panel:null,permalinkPanel:null,initialize:function(c,d,b){var a=[];
a.push(c);
a.push(d);
a.push(b);
OpenLayers.Control.Permalink.prototype.initialize.apply(this,a)
},createParams:function(){var a=this.map.getControlsByClass("oscar.Control.ThemeManager")[0];
var b=OpenLayers.Control.Permalink.prototype.createParams.apply(this,arguments);
if(a&&a.activeTheme){b.theme=a.activeTheme.name
}return b
},updateLink:function(){OpenLayers.Control.Permalink.prototype.updateLink.apply(this);
if(this.permalinkPanel){this.permalinkPanel.hide()
}},draw:function(){OpenLayers.Control.Permalink.prototype.draw.apply(this);
var a=this;
var b=function(){a._showPermalink()
};
this.element.onclick=function(){return false
};
OpenLayers.Event.observe(this.element,"mouseup",OpenLayers.Function.bindAsEventListener(b));
return this.div
},_showPermalink:function(){this.container=this.element.parentNode;
this.container.setAttribute("class","yui-skin-sam");
this.panel=document.getElementById("permalinkPanel");
if(!this.panel){this.panel=document.createElement("div");
this.panel.setAttribute("id","permalinkPanel");
var c=document.createElement("div");
c.innerHTML=this.panelTitle;
this.panel.appendChild(c);
var b=document.createElement("input");
this.panel.appendChild(b);
document.body.appendChild(this.panel)
}this.permalinkPanel=new YAHOO.widget.Panel(this.panel,{width:"360px",visible:false,draggable:false,constraintoviewport:true,underlay:"none",context:[this.panelContainer,"tl","tl",["beforeShow","windowResize"],[this.panelOffset,0]]});
this.permalinkPanel.cfg.setProperty("zIndex","1500");
this.permalinkPanel.render(this.panelContainer);
this.permalinkPanel.show();
var a=this.panel.getElementsByTagName("input")[0];
a.style.width="98%";
a.value=this.element.href;
a.onclick=this._selectAll(a);
a.click()
},_selectAll:function(a){return function(d){var c=a.value.length;
if(a.createTextRange){var b=a.createTextRange();
b.select()
}else{if(a.setSelectionRange){a.setSelectionRange(0,c)
}else{if(a.selectionStart){a.selectionStart=0;
a.selectionEnd=c
}}}a.focus()
}
},_createSelection:function(c){var b=c.value.length;
if(c.createTextRange){var a=c.createTextRange();
a.select()
}else{if(c.setSelectionRange){c.setSelectionRange(0,b)
}else{if(c.selectionStart){c.selectionStart=0;
c.selectionEnd=b
}}}c.focus()
},CLASS_NAME:"oscar.Control.Permalink"});
oscar.Control.ToolBar=oscar.BaseClass(OpenLayers.Control.Panel,{id:"oscarToolbar",leftCap:null,rightCap:null,usePreviousView:false,defaultWidth:30,draggable:false,showMeasureControl:true,EVENT_TYPES:["selection","extraction","measurement","activate","deactivate"],initialize:function(a){OpenLayers.Control.Panel.prototype.initialize.apply(this,[a]);
this.displayClass="oscarControlToolBar";
this.leftCap=document.createElement("div");
oscar.jQuery(this.leftCap).addClass("toolBarBookendLeft");
this.rightCap=document.createElement("div");
oscar.jQuery(this.rightCap).addClass("toolBarBookendRight")
},draw:function(){OpenLayers.Control.prototype.draw.apply(this,[]);
this.div.setAttribute("style","");
this.div.appendChild(this.rightCap);
this.ctrlContainer=document.createElement("div");
this.div.appendChild(this.ctrlContainer);
if(this.usePreviousView){this.addControls(new oscar.Control.PreviousView())
}else{this.div.appendChild(this.leftCap)
}OpenLayers.Event.observe(this.div,"mousedown",function(a){OpenLayers.Event.stop(a,true)
});
if(this.draggable){oscar.jQuery(this.div).draggable({containment:"parent",handle:"div.toolBarBookendRight"})
}return this.div
},redraw:function(){if(this.active){for(var d=0,a=this.controls.length;
d<a;
d++){var c=this.controls[d].panel_div;
var g=oscar.i18n("tooltip_"+this.controls[d].CLASS_NAME.toLowerCase());
oscar.jQuery(c).attr("title",g);
var f=function(h){return function(k){if(!h.active){var j=h.displayClass+"ItemActive";
var i=h.displayClass+"ItemInactive";
oscar.jQuery(h.panel_div).removeClass(i);
oscar.jQuery(h.panel_div).addClass(j)
}}
};
var b=function(h){return function(k){if(!h.active){var j=h.displayClass+"ItemActive";
var i=h.displayClass+"ItemInactive";
oscar.jQuery(h.panel_div).addClass(i);
oscar.jQuery(h.panel_div).removeClass(j)
}}
};
c.onmouseover=f(this.controls[d]);
c.onmouseout=b(this.controls[d]);
if(this.controls[d].active){c.className=this.controls[d].displayClass+"ItemActive"
}else{c.className=this.controls[d].displayClass+"ItemInactive"
}if(this.controls[d].CLASS_NAME=="oscar.Control.PreviousView"){oscar.jQuery(c).addClass("oscarControlPreviousViewItemActive");
this.div.appendChild(c)
}else{controlsLength=(this.usePreviousView)?this.controls.length-1:this.controls.length;
var e=this.defaultWidth*controlsLength;
oscar.jQuery(this.ctrlContainer).css("width",e);
this.ctrlContainer.appendChild(c)
}}}},activateControl:function(d){if(!this.active){return false
}var e;
for(var b=0,a=this.controls.length;
b<a;
b++){e=this.controls[b];
if(e!=d&&(e.type===OpenLayers.Control.TYPE_TOOL||e.type==OpenLayers.Control.TYPE_TOGGLE)){e.deactivate()
}}if(d.type==OpenLayers.Control.TYPE_BUTTON){d.trigger();
return
}if(d.type==OpenLayers.Control.TYPE_TOGGLE){if(d.active){d.deactivate()
}else{d.activate()
}return
}d.activate()
},removeControl:function(a){if(this.usePreviousView&&(a.CLASS_NAME=="oscar.Control.PreviousView")){return
}a.deactivate();
this.ctrlContainer.removeChild(a.panel_div);
this.map.removeControl(a)
},clean:function(){var a;
var b=(this.usePreviousView)?1:0;
while(this.controls.length>b){a=this.controls[this.controls.length-1];
this.removeControl(a);
this.controls.splice(this.controls.length-1,1)
}},applyTheme:function(b){this.clean();
if(this.showMeasureControl){this.addControls(new oscar.Control.Measure())
}if(b.hasSelectionService()){var a=new oscar.Control.Select({theme:b});
this.addControls(a);
this.events.triggerEvent("selection",a)
}if(b.hasExtractionService()){this.addControls(new oscar.Control.DataExtractor(b))
}},CLASS_NAME:"oscar.Control.ToolBar"});
oscar.Control.Box=oscar.BaseClass(oscar.Control,{EVENT_TYPES:["done"],type:OpenLayers.Control.TYPE_TOGGLE,initialize:function(a){this.EVENT_TYPES=oscar.Control.Box.prototype.EVENT_TYPES.concat(OpenLayers.Control.prototype.EVENT_TYPES);
this.events=new OpenLayers.Events(this,null,this.EVENT_TYPES,false,{includeXY:true});
this.handlers={}
},draw:function(){this.handlers.rangeSelect=new OpenLayers.Handler.RegularPolygon(this,{done:this.done,down:function(b){OpenLayers.Element.addClass(this.map.viewPortDiv,"olDrawBox")
},up:function(b){OpenLayers.Element.removeClass(this.map.viewPortDiv,"olDrawBox")
}},{irregular:true});
var a={move:this.panMap,done:this.panMapDone};
this.handlers.dragPan=new OpenLayers.Handler.Drag(this,a,{keyMask:OpenLayers.Handler.MOD_SHIFT})
},panMap:function(a){this.panned=true;
this.map.pan(this.handlers.dragPan.last.x-a.x,this.handlers.dragPan.last.y-a.y,{dragging:this.handlers.dragPan.dragging,animate:false})
},panMapDone:function(a){if(this.panned){this.panMap(a);
this.panned=false
}},activate:function(){this.handlers.rangeSelect.activate();
this.handlers.dragPan.activate();
return oscar.Control.prototype.activate.apply(this,arguments)
},deactivate:function(){for(var a in this.handlers){this.handlers[a].deactivate()
}return oscar.Control.prototype.deactivate.apply(this.arguments)
},done:function(a){this.events.triggerEvent("done",a)
},CLASS_NAME:"oscar.Control.Box"});
oscar.Control.RangeSelect=oscar.BaseClass(oscar.Control.Box,{container:null,displayClass:"rangeSelect",div:null,initialize:function(a){oscar.Control.Box.prototype.initialize.apply(this,[]);
this.container=a;
this.div=document.createElement("span");
this.div.ref="area";
oscar.jQuery(this.div).addClass("subTool");
oscar.jQuery(this.div).addClass("range");
oscar.jQuery(this.div).addClass("toolInactive")
},CLASS_NAME:"oscar.Control.RangeSelect"});
oscar.Control.Point=oscar.BaseClass(oscar.Control,{EVENT_TYPES:["done"],type:OpenLayers.Control.TYPE_TOOL,events:null,initialize:function(a){this.events=new OpenLayers.Events(this,null,this.EVENT_TYPES,false,{includeXY:true})
},draw:function(){this.handler=new OpenLayers.Handler.Point(this,{done:this.done})
},done:function(a){this.events.triggerEvent("done",a)
},CLASS_NAME:"oscar.Control.Point"});
oscar.Control.Select=oscar.BaseClass(oscar.Control.Multi,{type:OpenLayers.Control.TYPE_TOGGLE,theme:null,processor:null,threshold:1500,ignoreDblClick:null,sketchSymbolizers:{Point:{pointRadius:4,graphicName:"square",fillColor:"white",fillOpacity:1,strokeWidth:1,strokeOpacity:1,strokeColor:"#333333"},Line:{strokeWidth:3,strokeOpacity:1,strokeColor:"#666666",strokeDashstyle:"dash"},Polygon:{strokeWidth:2,strokeOpacity:1,strokeColor:"#666666",fillColor:"white",fillOpacity:0.3}},callback:null,initialize:function(a){oscar.Control.Multi.prototype.initialize.apply(this,[a]);
this.style=new OpenLayers.Style();
this.style.addRules([new OpenLayers.Rule({symbolizer:this.sketchSymbolizers})]);
this.styleMap=new OpenLayers.StyleMap({"default":this.style});
this.controls={point:new oscar.Control.Point(),area:new oscar.Control.Box()}
},activate:function(){oscar.Control.Multi.prototype.activate.apply(this,arguments);
this._createPointControl();
this._createBoxControl();
var b;
for(var a in this.controls){b=this.controls[a];
b.events.on({done:this.done,scope:this});
this.map.addControl(b)
}},deactivate:function(){OpenLayers.Control.prototype.deactivate.apply(this,arguments);
for(key in this.controls){this.controls[key].deactivate();
this.controls[key].events.un({done:this.done,scope:this});
this.map.removeControl(this.controls[key])
}if(this.processor){this.processor.events.triggerEvent("clean")
}oscar.Control.Multi.prototype.deactivate.apply(this,[])
},done:function(b){if(this.ignoreDblClick){return
}var c=function(){a.ignoreDblClick=null
};
var a=this;
this.ignoreDblClick=window.setTimeout(c,this.threshold);
if(this.processor){this.processor.execute(b,this.theme)
}else{if(this.callback){this.callback(b)
}}},_createPointControl:function(){var b=this.createSubMenuItem();
b.ref="point";
b.title=oscar.i18n("Point");
oscar.jQuery(b).addClass("point");
oscar.jQuery(b).addClass("toolInactive");
var c={element:b,owner:this};
var a=function(){this.owner._toggleTool(this,this.element)
};
OpenLayers.Event.observe(b,"mouseup",OpenLayers.Function.bindAsEventListener(a,c));
this.addToSubMenu(b)
},_createBoxControl:function(){var c=this.createSubMenuItem();
c.ref="area";
c.title=oscar.i18n("Range");
oscar.jQuery(c).addClass("range");
oscar.jQuery(c).addClass("toolInactive");
var b={element:c,owner:this};
var a=function(){this.owner._toggleTool(this,this.element)
};
OpenLayers.Event.observe(c,"mouseup",OpenLayers.Function.bindAsEventListener(a,b));
this.addToSubMenu(c)
},_toggleTool:function(e,c){var d=c.parentNode;
for(var b=0;
b<d.childNodes.length;
b++){oscar.jQuery(d.childNodes[b]).removeClass("toolActive");
oscar.jQuery(d.childNodes[b]).addClass("toolInactive")
}for(var a in this.controls){var f=this.controls[a];
if(c.ref==a){oscar.jQuery(c).removeClass("toolInactive");
oscar.jQuery(c).addClass("toolActive");
this.activeControl=f;
this.activeControl.activate()
}else{f.deactivate()
}}},CLASS_NAME:"oscar.Control.Select"});
oscar.Control.Print=oscar.BaseClass(OpenLayers.Control.Permalink,{callback:null,initialize:function(c,d,b){var a=[];
a.push(c);
a.push(d);
a.push(b);
OpenLayers.Control.Permalink.prototype.initialize.apply(this,a)
},destroy:function(){OpenLayers.Control.Permalink.prototype.destroy.apply(this,arguments)
},draw:function(){OpenLayers.Control.prototype.draw.apply(this,arguments);
if(!this.element){var a=this;
var b=function(){a.createPrintParams()
};
this.div.className=this.displayClass;
this.element=document.createElement("a");
this.element.innerHTML=OpenLayers.i18n("Print");
this.element.href="#";
this.element.onclick=b;
this.div.appendChild(this.element)
}return this.div
},createPrintParams:function(){var a=this.map.currentThemeName;
var b=this.map.getExtent().toBBOX();
if(this.callback){this.callback(a,b)
}},updateLink:function(){},CLASS_NAME:"oscar.Control.Print"});
oscar.Control.DataExtractor=oscar.BaseClass(oscar.Control,{type:OpenLayers.Control.TYPE_TOGGLE,database:null,initialize:function(d){OpenLayers.Control.prototype.initialize.apply(this);
this.theme=d;
this.database=new oscar.Util.Database();
this.database.addTable("sources",["id","title","bbox","abstract","fk_capabilities","dataType"]);
this.database.addTable("capabilities",["capabilities"]);
this.extractionServices=this.theme.getExtractionService();
for(var c in this.extractionServices){var a=this.extractionServices[c];
var b=this["load_"+a.serviceType.toLowerCase()];
if(b){b.apply(this,[a])
}else{}}},activate:function(){oscar.Control.prototype.activate.apply(this);
if(this.ctrl){this.ctrl.activate()
}else{this.ctrl=new oscar.Control.DataDiscovery(this.database);
this.map.addControl(this.ctrl)
}},deactivate:function(){if(this.ctrl){this.ctrl.deactivate();
this.ctrl=null
}oscar.Control.prototype.deactivate.apply(this)
},load_wcs:function(a){var c={request:"GetCapabilities",service:"WCS",version:"1.1.0"};
var b=function(e){var i=new oscar.Format.WCSCapabilities();
var d=i.read(e.responseXML);
var g=this.database.addRecord("capabilities",{capabilities:d});
coverages=oscar.Util.Metadata.getCoverages(d);
for(var j in coverages){var l=coverages[j];
if(!oscar.Util.isFeatureInArray(l.identifier,a.identifiers)){continue
}var k=this.getBoundingBox(l.wgs84BoundingBox,"EPSG:4326");
var h={id:l.identifier,title:l.title,"abstract":l["abstract"],bbox:k,fk_capabilities:g,dataType:"wcs"};
var f=this.database.addRecord("sources",h)
}};
this.wcsRequest=OpenLayers.Request.GET({url:a.url,params:c,async:true,success:b,failure:this.requestFail,scope:this})
},load_wfs:function(a){var c=function(g){var k=new oscar.Format.WFSCapabilities();
var d=k.read(g.responseXML);
var i=this.database.addRecord("capabilities",{capabilities:d});
features=oscar.Util.Metadata.getFeatureTypes(d);
for(var l in features){var n=features[l];
if(!oscar.Util.isFeatureInArray(n.name,a.identifiers)){continue
}var e=n.srs||"EPSG:4326";
var m=this.getBoundingBox(n.wgs84BoundingBox,e);
var j={id:n.name,title:n.title,"abstract":n["abstract"],bbox:m,fk_capabilities:i,dataType:"wfs"};
var h=this.database.addRecord("sources",j)
}};
var b={service:a.serviceType,version:a.version,request:"GetCapabilities"};
this.wfsRequest=OpenLayers.Request.GET({url:a.url,params:b,async:true,success:c,failure:this.requestFail,scope:this})
},getBoundingBox:function(d,b){var a=new OpenLayers.Bounds(d.west,d.south,d.east,d.north);
if(this.map.projection.projCode!=b){var c=new OpenLayers.Projection(b);
a.transform(c,this.map.projection)
}return a
},requestFail:function(a){},CLASS_NAME:"oscar.Control.DataExtractor"});
oscar.Control.Measure=oscar.BaseClass(oscar.Control.Multi,{type:OpenLayers.Control.TYPE_TOGGLE,sketchSymbolizers:{Point:{pointRadius:4,graphicName:"square",fillColor:"white",fillOpacity:1,strokeWidth:1,strokeOpacity:1,strokeColor:"#333333"},Line:{strokeWidth:3,strokeOpacity:1,strokeColor:"#f00",strokeDashstyle:"solid"},Polygon:{strokeWidth:2,strokeOpacity:1,strokeColor:"#f00",fillColor:"white",fillOpacity:0.3}},defaultUnit:"metric",currentUnit:null,initialize:function(a){oscar.Control.Multi.prototype.initialize.apply(this,[]);
if(a&&a.sketchSymbolizers){for(var b in this.sketchSymbolizers){this._setupSketchSymbolizers(this.sketchSymbolizers[b],a.sketchSymbolizers[b])
}}this.style=new OpenLayers.Style();
this.style.addRules([new OpenLayers.Rule({symbolizer:this.sketchSymbolizers})]);
this.styleMap=new OpenLayers.StyleMap({"default":this.style});
this.controls={line:new OpenLayers.Control.Measure(OpenLayers.Handler.Path,{persist:true,handlerOptions:{layerOptions:{styleMap:this.styleMap}}},{displaySystem:this.defaultUnit}),polygon:new OpenLayers.Control.Measure(OpenLayers.Handler.Polygon,{persist:true,handlerOptions:{layerOptions:{styleMap:this.styleMap}}},{displaySystem:this.defaultUnit})}
},activate:function(){oscar.Control.Multi.prototype.activate.apply(this,arguments);
this._createLineMeasure();
this._createAreaMeasure();
this._createUnits();
var b;
for(var a in this.controls){b=this.controls[a];
b.events.on({measure:this.handleMeasurements,measurepartial:this.handleMeasurements,scope:this});
this.map.addControl(b)
}this.createDialog()
},deactivate:function(){OpenLayers.Control.prototype.deactivate.apply(this,arguments);
if(d=document.getElementById("MeasureToolBar")){document.body.removeChild(d)
}for(key in this.controls){if(this.controls[key].popup){this.map.removePopup(this.controls[key].popup)
}this.controls[key].events.un({measure:this.handleMeasurements,measurepartial:this.handleMeasurements});
this.controls[key].deactivate();
this.map.removeControl(this.controls[key])
}if(this.dialog){this.dialog.hide();
this.dialog=null
}oscar.Control.Multi.prototype.deactivate.apply(this,[])
},_setupSketchSymbolizers:function(a,b){if(a&&b){OpenLayers.Util.extend(a,b)
}},createDialog:function(){this.dialog=new oscar.Gui.Dialog("Measurement",{draggable:true,modal:false,height:55,zIndex:2001,fixedcenter:false});
var b=oscar.i18n("");
this.dialog.setHeader(b);
this.dlgDiv=document.createElement("div");
this.dlgDiv.id="Measurement";
this.dialog.setContent(this.dlgDiv);
var a=function(c){return function(){c.dialog.destroy();
c.dialog=null
}
}
},_createLineMeasure:function(){var c=this.createSubMenuItem();
c.ref="line";
c.title=oscar.i18n("Distance");
oscar.jQuery(c).addClass("line");
oscar.jQuery(c).addClass("toolInactive");
var b={button:c,owner:this};
var a=function(){this.owner._toggleTool(this,this.button)
};
OpenLayers.Event.observe(c,"mouseup",OpenLayers.Function.bindAsEventListener(a,b));
OpenLayers.Event.observe(c,"click",function(f){OpenLayers.Event.stop(f,true)
});
this.addToSubMenu(c)
},_createAreaMeasure:function(){var c=this.createSubMenuItem();
c.ref="polygon";
c.title=oscar.i18n("Area");
oscar.jQuery(c).addClass("polygon");
oscar.jQuery(c).addClass("toolInactive");
var b={button:c,owner:this};
var a=function(){this.owner._toggleTool(this,this.button)
};
OpenLayers.Event.observe(c,"mouseup",OpenLayers.Function.bindAsEventListener(a,b));
OpenLayers.Event.observe(c,"click",function(f){OpenLayers.Event.stop(f,true)
});
this.addToSubMenu(c)
},_createUnits:function(){var e=["english","metric"];
var c=document.createElement("span");
oscar.jQuery(c).css("float","left");
oscar.jQuery(c).css("background","transparent");
oscar.jQuery(c).css("display","block");
oscar.jQuery(c).css("padding-top","7px");
var a=document.createElement("select");
a.id="oscarMeasureUnits";
oscar.jQuery(a).addClass("measurementUnits");
var g=document.createElement("option");
a.options[a.options.length];
for(var h=0;
h<e.length;
h++){var g=document.createElement("option");
a.options[a.options.length];
g.value=e[h];
g.text=oscar.i18n(e[h]);
if(e[h]==this.defaultUnit){g.selected=true
}a.options[a.options.length]=g
}var b=this;
var f=function(i){b.changeUnits();
OpenLayers.Event.stop(i,true)
};
OpenLayers.Event.observe(a,"change",OpenLayers.Function.bindAsEventListener(f,b));
OpenLayers.Event.observe(a,"mousedown",OpenLayers.Function.bindAsEventListener(f,b));
OpenLayers.Event.observe(a,"click",OpenLayers.Function.bindAsEventListener(f,b));
c.appendChild(a);
this.addToSubMenu(c)
},changeUnits:function(b){var a=$("oscarMeasureUnits");
unit=a.options[a.selectedIndex].value;
if(unit==-1){return
}this.currentUnit=unit;
if(this.activeControl){this.activeControl.displaySystem=unit
}},_toggleTool:function(e,c){var g=this.currentUnit?this.currentUnit:this.defaultUnit;
if(d=document.getElementById("MeasureToolBar")){d.style.visibility="hidden"
}var f=c.parentNode;
for(var b=0;
b<f.childNodes.length;
b++){oscar.jQuery(f.childNodes[b]).removeClass("toolActive");
oscar.jQuery(f.childNodes[b]).addClass("toolInactive")
}for(var a in this.controls){var h=this.controls[a];
if(e.button.ref==a){h.displaySystem=g;
var j=(a=="line")?oscar.i18n("Distance"):oscar.i18n("Area");
if(!this.dialog){this.createDialog()
}this.dialog.setHeader(j);
if(!this.dlgDiv){this.dlgDiv=document.createElement("div");
this.dialog.setContent(this.dlgDiv)
}this.dlgDiv.innerHTML="";
this.dialog.show();
h.activate();
oscar.jQuery(c).removeClass("toolInactive");
oscar.jQuery(c).addClass("toolActive");
this.activeControl=h
}else{if(h.popup){this.map.removePopup(h.popup)
}h.deactivate()
}}},handleMeasurements:function(h){var i=h.geometry;
var c=h.units;
var a=h.order;
var g=h.measure;
var f=document.getElementById("measureInfo");
var e="";
if(a==1){e+=g.toFixed(2)+" "+c
}else{e+=g.toFixed(2)+" "+c+"<sup>2</sup>"
}var b=document.getElementById("MeasurementText");
if(!b){this.dlgDiv=document.createElement("div");
this.dlgDiv.id="MeasurementText"
}this.dlgDiv.innerHTML=e;
this.dialog.setContent(this.dlgDiv);
this.dialog.show()
},CLASS_NAME:"oscar.Control.Measure"});
oscar.Control.PreviousView=oscar.BaseClass(OpenLayers.Control.Button,{type:OpenLayers.Control.TYPE_BUTTON,previous:null,limit:50,activateOnDraw:true,registry:null,nextStack:null,previousStack:null,listeners:null,restoring:false,initialize:function(a){OpenLayers.Control.Button.prototype.initialize.apply(this,[a]);
this.registry=OpenLayers.Util.extend({moveend:function(){return{center:this.map.getCenter(),resolution:this.map.getResolution()}
}},this.registry);
this.clear()
},trigger:function(){var b=this.previousStack.shift();
var a=this.previousStack.shift();
if(a!=undefined){this.previousStack.unshift(a);
this.restoring=true;
this.restore(a);
this.restoring=false;
this.onPreviousChange(this.previousStack[1],this.previousStack.length-1)
}else{this.previousStack.unshift(b)
}return a
},onPreviousChange:function(b,a){if(b&&!this.active){this.activate()
}else{if(!b&&this.active){this.deactivate()
}}},destroy:function(){OpenLayers.Control.prototype.destroy.apply(this)
},setMap:function(b){this.map=b;
var a=function(){if(!this.restoring){var c=this.registry.moveend.apply(this,arguments);
this.previousStack.unshift(c);
if(this.previousStack.length>1){this.onPreviousChange(this.previousStack[1],this.previousStack.length-1)
}if(this.previousStack.length>(this.limit+1)){this.previousStack.pop()
}}return true
};
this.map.events.register("moveend",this,a)
},draw:function(){OpenLayers.Control.Button.prototype.draw.apply(this,arguments);
if(this.activateOnDraw){this.activate()
}},clear:function(){this.previousStack=[]
},restore:function(b){var a=this.map.getZoomForResolution(b.resolution);
this.map.setCenter(b.center,a)
},activate:function(){return OpenLayers.Control.Button.prototype.activate.apply(this)
},initStack:function(){if(this.map.getCenter()){this.listeners.moveend()
}},deactivate:function(){if(this.map){this.map.events.unregister("moveend",this)
}},CLASS_NAME:"oscar.Control.PreviousView"});
oscar.Control.OverviewMap=oscar.BaseClass(OpenLayers.Control.OverviewMap,{initialize:function(a){OpenLayers.Control.OverviewMap.prototype.initialize.apply(this,arguments)
},draw:function(){var b=[];
for(var a in this.map.layers){if(this.map.layers[a].renderer){continue
}if(this.map.layers[a].clone){b.push(this.map.layers[a].clone())
}}this.layers=b;
OpenLayers.Control.OverviewMap.prototype.draw.apply(this,arguments);
$$(this.maximizeDiv).empty();
$$(this.minimizeDiv).empty();
return this.div
},CLASS_NAME:"oscar.Control.OverviewMap"});
oscar.Control.SelectFeature=oscar.BaseClass(oscar.Control,{autoActivate:true,initialize:function(a){OpenLayers.Control.prototype.initialize.apply(this,[a]);
this.layers=[];
this.handlers={}
},setMap:function(a){oscar.Control.prototype.setMap.apply(this,[a]);
this.map.events.on({addlayer:this.addLayer,scope:this});
this.map.events.on({removelayer:this.layerRemoved,scope:this})
},activate:function(){this.handlers.click.activate();
var a=this;
this.ctrl=new OpenLayers.Control.SelectFeature(this.layers);
this.map.addControl(this.ctrl)
},draw:function(){var a={click:this.clicked};
this.handlers.click=new OpenLayers.Handler.Click(this,a)
},clicked:function(b){var a=this.map.getLonLatFromPixel(b.xy)
},layerRemoved:function(d){var b=d.layer;
var c=this.layers.length;
for(var a=0;
a<this.layers.length;
a++){if(b.id==this.layers[a].id){this.layers.splice(a,1);
this.ctrl.setLayer(this.layers);
break
}}},addLayer:function(b){var a=b.layer;
if(a.renderers){a.events.on({loadend:this.layerLoaded,scope:this})
}},layerLoaded:function(d){var b=d.object;
if(b.features.length==0){this.map.removeLayer(b)
}else{if(b.hidden){return
}var a=function(f,g){for(var e=0;
e<g.length;
e++){if(f.id==g[e].id){return false
}}return true
};
if(a(b,this.layers)){try{this.layers.push(b);
this.ctrl.setLayer(this.layers)
}catch(c){}this.ctrl.activate()
}}},clearControl:function(){if(this.ctrl){this.ctrl.deactivate();
this.map.removeControl(this.ctrl);
this.ctrl=null
}},CLASS_NAME:"oscar.Control.SelectFeature"});
oscar.Control.ThemeManager=oscar.BaseClass(OpenLayers.Control,{EVENT_TYPES:["themeAdded","afterDraw"],events:null,defaultThemeIndex:0,themes:null,themeLbls:null,themeDlg:null,autoDraw:false,layers:null,IS_SPHERICALMERCATOR:null,guiManager:null,controlManager:null,activeTheme:null,argParserClass:oscar.Control.ArgParser,argParser:null,initialize:function(a){OpenLayers.Control.prototype.initialize.apply(this,[a]);
OpenLayers.Util.extend(this,a);
this.themes=[];
this.themeLbls=[];
this.events=new OpenLayers.Events(this,null,this.EVENT_TYPES,true,{includeXY:true});
this.events.register("themeAdded",this,this.themeAdded)
},ignoreEvent:function(a){OpenLayers.Event.stop(a)
},setMap:function(a){OpenLayers.Control.prototype.setMap.apply(this,[a]);
if(this.guiManager){if(this.map.addToToolBox&&this.guiManager.getToggleButton){this.map.addToToolBox(this.guiManager.getToggleButton())
}}if(this.argParser==null){this.argParser=new this.argParserClass();
this.map.addControl(this.argParser)
}},setConfigManager:function(a){this.configManager=a;
this.configManager.events.on({haveThemes:this.applyThemes,scope:this})
},setGuiManager:function(a){this.guiManager=a;
this.guiManager.events.on({themeActivated:this.themeActivated,scope:this})
},applyThemes:function(){if(this.configManager){for(var a=0;
a<this.configManager.ox.themes.length;
a++){this.addTheme(this.configManager.ox.themes[a])
}}},addTheme:function(b){this.themes.push(b);
this.events.triggerEvent("themeAdded",{theme:b});
if(this.argParser){if(this.argParser.args&&this.argParser.args.theme==b.name){this.autoDraw=true;
this.drawTheme(b);
var a=new OpenLayers.LonLat(parseFloat(this.argParser.args.lon),parseFloat(this.argParser.args.lat));
this.map.setCenter(a,parseInt(this.argParser.args.zoom));
this.autoDraw=false;
return
}}if(this.autoDraw){if(this.activeTheme==null){this.drawTheme(this.themes[0])
}}},themeAdded:function(a){if(this.guiManager){this.guiManager.setGuiContainer(this.div);
this.guiManager.addTheme(a.theme)
}},themeActivated:function(a){if(a.theme.isActive){return
}if(this.activeTheme){this.activeTheme.isActive=false
}a.theme.isActive=true;
this.drawTheme(a.theme)
},drawTheme:function(e,g){try{var i=this.map.getControlsByClass("oscar.Control.OverviewMap")[0]||this.map.getControlsByClass("OpenLayers.Control.OverviewMap")[0];
if(i){i.destroy()
}}catch(c){}var j={project:false};
if(this.map.getExtent()!=null){j.previousView=this.map.getExtent();
j.previousProjection=this.map.projection;
j.project=true
}this.activeTheme=e;
$$(this.map.div).css({backgroundColor:this.activeTheme.backgroundColor});
this.layers=this.activeTheme.layers;
var a=16;
try{a=parseInt(this.activeTheme.parameters.numzoomlevels)
}catch(c){a=16
}var b=this.map.getControlsByClass("oscar.Control.SelectFeature")[0];
if(b){b.ctrl.deactivate()
}while(this.map.layers.length>0){try{this.map.removeLayer(this.map.layers[this.map.layers.length-1])
}catch(c){}}var k={};
var f=null;
if((f=this.activeTheme.getMaxCover())!=null){if(oscar.Util.isSphericalMercator(this.activeTheme.srs)){k.maxResolution=156543.0339
}else{k.maxResolution="auto"
}k.maxExtent=f
}else{if(oscar.Util.isSphericalMercator(this.activeTheme.srs)){k={maxExtent:new OpenLayers.Bounds(-128*156543.0339,-128*156543.0339,128*156543.0339,128*156543.0339),maxResolution:156543.0339}
}else{k={maxResolution:1.40625,maxExtent:new OpenLayers.Bounds(-180,-90,180,90)}
}}k.projection=new OpenLayers.Projection(this.activeTheme.srs);
k.numZoomLevels=a;
OpenLayers.Util.extend(this.map,k);
var h=this;
var d=function(){if(h.map.projection.proj.readyToUse){window.clearTimeout(h.interval);
h.activeTheme.buildMap(h.map);
if(g){g.call()
}var l=null;
if(!h.autoDraw){return
}if((l=h.activeTheme.getDefaultCover())){h.doDraw(l)
}else{if(j.project){var m=j.previousView.transform(j.previousProjection,new OpenLayers.Projection(h.activeTheme.srs));
h.doDraw(m)
}else{h.doDraw()
}}}};
this.interval=setInterval(d,500)
},doDraw:function(c,b){if(c){if(c.CLASS_NAME=="OpenLayers.LonLat"){var a=c.clone();
var d=new OpenLayers.Bounds();
d.extend(c);
if(b&&b.zoom){this.map.setCenter(a,b.zoom)
}else{c=d;
this.map.zoomToExtent(c)
}}else{this.map.zoomToExtent(c)
}}else{this.map.zoomToMaxExtent()
}this.events.triggerEvent("afterDraw",this)
},CLASS_NAME:"oscar.Control.ThemeManager"});
oscar.Control.OXFConfigManager=oscar.BaseClass(OpenLayers.Control,{ox:null,EVENT_TYPES:["haveThemes"],events:null,themeManager:null,defaultThemeId:-1,initialize:function(a){OpenLayers.Control.prototype.initialize.apply(this,arguments);
this.events=new OpenLayers.Events(this,null,this.EVENT_TYPES,false,{includeXY:true});
this.events.register("haveThemes",this,this.applyThemes)
},load:function(a){OpenLayers.loadURL(a,null,this,this.success,this.failure)
},success:function(d){var b=d.getResponseHeader("Content-Type");
var a=null;
if(d.getResponseHeader("Content-Type").contains("xml")){a=new oscar.Format.OXF.XML();
try{this.ox=a.read(d.responseXML)
}catch(c){this.failure(null)
}}else{a=new oscar.Format.OXF();
try{this.ox=a.read(d.responseText);
if(this.ox.themes.length==0){this.failure(null)
}}catch(c){this.failure(null);
return
}}this.events.triggerEvent("haveThemes",this.ox)
},failure:function(a){new oscar.Gui.AlertDialog(oscar.i18n("Error"),oscar.i18n("NoThemesAvailable"),{width:300,height:100,draggable:true})
},applyThemeToMap:function(a){this.defaultThemeId=a
},CLASS_NAME:"oscar.Control.OXFConfigManager"});
oscar.Control.ThemeSwitcher=oscar.BaseClass(oscar.Control.DragPanel,{tooltipText:"ThemeSwitcherToolTip",titleText:"ThemeSwitcherTitle",iconClass:"ThemesIcon",closed:false,collapsible:true,themePanels:null,themeManager:new oscar.Control.ThemeManager,configManager:new oscar.Control.OXFConfigManager,toolbar:null,activeTheme:null,events:null,EVENT_TYPES:["switchthemes"],initialize:function(a){this.EVENT_TYPES=oscar.Control.ThemeSwitcher.prototype.EVENT_TYPES.concat(OpenLayers.Control.prototype.EVENT_TYPES);
this.events=new OpenLayers.Events(this,null,this.EVENT_TYPES,false,{includeXY:true});
oscar.Control.DragPanel.prototype.initialize.apply(this,[a]);
if(this.configManager){this.registerConfigManagerEvents()
}this.themePanels=[];
this.layerGroups=[];
this.timers=[];
this.layerCaps=[];
this.resizable=false
},setConfigManager:function(a){this.configManager=a;
this.registerConfigManagerEvents()
},getConfigManager:function(){return this.configManager
},registerConfigManagerEvents:function(){this.configManager.events.on({haveThemes:this.addThemes,scope:this})
},setMap:function(a){this.map=a;
if(this.configManager){this.map.addControl(this.configManager)
}if(this.themeManager){this.map.addControl(this.themeManager)
}this.toolbar=this.map.getControlsByClass("oscar.Control.ToolBar")[0];
if((this.toolbar=this.map.getControlsByClass("oscar.Control.ToolBar")[0])){this.events.on({switchthemes:this.updateToolbar})
}this.map.events.on({addlayer:this.addLayer,scope:this});
this.map.events.on({removelayer:this.removeLayer,scope:this})
},setThemeManager:function(a){this.themeManager=a
},getThemeManager:function(){return this.themeManager
},addThemes:function(a){this.ox=a;
this.buildMenu();
if(this.themeManager.argParser){var d=this.themeManager.argParser.args.theme;
for(var c in this.ox.themes){var e=this.ox.themes[c];
if(e.name==d){themeFound=true;
this.themeSelect[0].selectedIndex=c;
this.themeManager.autoDraw=false;
var b=this;
this.changeTheme(c,function(){var f=new OpenLayers.LonLat(parseFloat(b.themeManager.argParser.args.lon),parseFloat(b.themeManager.argParser.args.lat));
var h=parseInt(b.themeManager.argParser.args.zoom);
var g={zoom:h};
b.themeManager.doDraw(f,g)
});
return
}}}this.changeTheme(0)
},changeTheme:function(a,b){if(this.activeTheme!=null){if(this.activeTheme==a){return
}}this.activeTheme=a;
this.events.triggerEvent("switchthemes",this.ox.themes[a]);
this.themeManager.drawTheme(this.ox.themes[a],b)
},updateToolbar:function(a){this.toolbar.applyTheme(a)
},buildMenu:function(){var d=this;
var a=document.createElement("div");
var c=$$(a);
oscar.jQuery(a).addClass("themeContainer");
$$(this.content).append(a);
this.$themeDiv=$$("<div></div>").css({position:"relative"});
this.themeSelect=$$("<select></select>").change(function(){d.changeTheme(d.themeSelect[0].selectedIndex)
});
this.$themeDiv.append(this.themeSelect);
c.append(this.$themeDiv);
for(var e in this.ox.themes){var f=this.ox.themes[e];
var b=$$("<option></option").html(f.name);
this.themeSelect.append(b)
}this.$layersPanel=$$("<div></div>").addClass("themeLayers").css({height:"110px","overflow-y":"auto"});
$$(this.content).append(this.$layersPanel)
},draw:function(){oscar.Control.DragPanel.prototype.draw.apply(this);
return this.div
},addLayer:function(a){if(a.layer.isBaseLayer){this.layerGroups=[];
this.timers=[];
this.layerCaps=[]
}if(a.layer.displayInLayerSwitcher&&a.layer.isBaseLayer==false){this.getLayerCapabilities(a.layer)
}},removeLayer:function(a){var b=$("LT_"+a.layer.id);
if(b!=null){$$(b).remove()
}},getLayerCapabilities:function(b){this.setPlaceHolder(b);
var f={request:"GetCapabilities",service:"WMS"};
switch(b.CLASS_NAME){case"OpenLayers.Layer.WMS":var e=function(j){var h=new OpenLayers.Format.WMSCapabilities();
var g=null;
try{g=h.read(j.responseXML)
}catch(i){g=h.read(j.responseText)
}this.layerCaps[b.url]=g;
this.displayLayer(b)
};
var a=function(g){};
OpenLayers.loadURL(b.url[0],f,this,e,a);
break;
case"OpenLayers.Layer.WMTS":var d=b.url;
var c=d+"/"+b.version+"/WMTSCapabilities.xml";
var e=function(j){var h=new oscar.Format.WMTSCapabilities();
var g=null;
try{g=h.read(j.responseXML)
}catch(i){g=h.read(j.responseText)
}this.layerCaps[b.url]=g;
this.displayLayer(b)
};
var a=function(g){};
f=null;
OpenLayers.loadURL(c,f,this,e,a);
break;
case"OpenLayers.Layer.GML":this.displayLayer(b);
break
}},setPlaceHolder:function(b){var a=document.createElement("div");
a.setAttribute("class","layerToggle");
id="LT_"+b.id;
a.id=id;
if(this.content.hasChildNodes()){this.$layersPanel.prepend(a)
}else{this.$layersPanel.append(a)
}},showWMSLayer:function(g){try{var p=$("LT_"+g.id);
var c=OpenLayers.Util.createUniqueID(g.name);
this.layerGroups[c]={layer:g,layers:[]};
if(g.params.LAYERS.length>0){var f=oscar.Util.Metadata.getLayers(this.layerCaps[g.url]);
var h=function(q){for(var s in f){var r=f[s];
if(q==r.name){return r.title||r.name
}}};
var n=g.params.LAYERS.slice(0);
n=n.reverse();
for(var e in n){var m=h(n[e]);
var b=OpenLayers.Util.createUniqueID(g.name);
var o=document.createElement("div");
oscar.jQuery(o).addClass("serviceLayer");
var k=document.createElement("input");
k.type="checkbox";
k.title=m;
k.value=n[e];
var l=OpenLayers.Util.createUniqueID("checkbox");
k.id=l;
o.appendChild(k);
k.checked=true;
var j=document.createElement("label");
j.setAttribute("for",l);
oscar.jQuery(j).addClass("serviceLayerLabel");
j.innerHTML=m;
var a=document.createElement("button");
a.value=n[e];
o.appendChild(j);
p.appendChild(o);
oscar.jQuery(a).button({icons:{primary:"ui-icon-gear"}});
var i=function(q,r){return function(s){q.adjustLayerGroup(r)
}
};
this.layerGroups[c].layers.push(k);
OpenLayers.Event.observe(k,"click",OpenLayers.Function.bindAsEventListener(i(this,c)))
}}}catch(d){}},showWMTSLayer:function(d){var c=oscar.Util.Metadata.getContent(this.layerCaps[d.url]);
var h=oscar.Util.Metadata.getThemes(this.layerCaps[d.url]);
var e=c.concat(h);
var f=function(o){for(var q in e){var p=e[q];
if(o==p.identifier){return p.title||p.identifier
}}};
var n=$("LT_"+d.id);
var l=f(d.layer);
var a=OpenLayers.Util.createUniqueID(l);
var m=document.createElement("div");
var j=document.createElement("input");
j.type="checkbox";
j.title=l;
j.value=d.layer;
m.appendChild(j);
j.checked=true;
var k=OpenLayers.Util.createUniqueID("checkbox");
j.id=k;
var i=document.createElement("label");
oscar.jQuery(i).addClass("serviceLayerLabel");
i.setAttribute("for",k);
i.innerHTML=l;
m.appendChild(i);
n.appendChild(m);
var b={layer:d};
var g=function(o){return function(p){o.setVisibility(!o.getVisibility())
}
};
OpenLayers.Event.observe(j,"click",OpenLayers.Function.bindAsEventListener(g(d)))
},showGMLLayer:function(c){var j=$("LT_"+c.id);
var g=c.name;
var a=OpenLayers.Util.createUniqueID(g);
var i=document.createElement("div");
var f=document.createElement("input");
f.type="checkbox";
f.title=g;
f.value=c.layer;
i.appendChild(f);
f.checked=c.visibility;
var h=OpenLayers.Util.createUniqueID("checkbox");
f.id=h;
var e=document.createElement("label");
oscar.jQuery(e).addClass("serviceLayerLabel");
e.setAttribute("for",h);
e.innerHTML=g;
i.appendChild(e);
j.appendChild(i);
var b={layer:c};
var d=function(k){return function(l){k.setVisibility(!k.getVisibility())
}
};
OpenLayers.Event.observe(f,"click",OpenLayers.Function.bindAsEventListener(d(c)))
},displayLayer:function(a){if(a.isBaseLayer){return
}switch(a.CLASS_NAME){case"OpenLayers.Layer.WMS":this.showWMSLayer(a);
break;
case"OpenLayers.Layer.WMTS":this.showWMTSLayer(a);
break;
case"OpenLayers.Layer.GML":this.showGMLLayer(a);
break
}},adjustLayerGroup:function(e){if(this.timers[this.layerGroups[e].layer.id]){window.clearTimeout(this.timers[this.layerGroups[e].layer.id]);
this.timers[this.layerGroups[e].layer.id]=null
}var a=this.layerGroups[e].layers;
var c=this.layerGroups[e].layer;
var d=[];
for(var b=0;
b<a.length;
b++){if(a[b].checked){d.push(a[b].value)
}}if(d.length==0){c.setVisibility(false)
}else{var f=function(g,h){return function(){var i=h.reverse();
g.mergeNewParams({layers:i});
g.setVisibility(true)
}
};
this.timers[this.layerGroups[e].layer.id]=window.setTimeout(f(c,d),this.threshold)
}},CLASS_NAME:"oscar.Control.ThemeSwitcher"});
oscar.Format=oscar.BaseClass(OpenLayers.Format,{CLASS_NAME:"oscar.Format"});
oscar.Format.OGC={CLASS_NAME:"oscar.Format.OGC"};
oscar.Format.OGC.ows={};
oscar.Format.OGC.ows.v1_0_0={read_cap_ServiceIdentification:function(a,b){a.serviceIdentification={};
this.runChildNodes(a.serviceIdentification,b)
},read_cap_ServiceProvider:function(a,b){a.serviceProvider={};
this.runChildNodes(a.serviceProvider,b)
},read_cap_ProviderName:function(b,a){b.providerName=this.getChildValue(a)
},read_cap_ProviderSite:function(c,b){var a=this.getAttributeNS(b,"http://www.w3.org/1999/xlink","href");
if(a){c.providerSite=a
}},read_cap_ServiceContact:function(b,a){b.serviceContact={};
this.runChildNodes(b.serviceContact,a)
},read_cap_IndividualName:function(a,b){a.individualName=this.getChildValue(b)
},read_cap_PositionName:function(a,b){a.positionName=this.getChildValue(b)
},read_cap_ContactInfo:function(a,b){a.contactInfo={};
this.runChildNodes(a.contactInfo,b)
},read_cap_Phone:function(a,b){if(!a.phone){a.phone={}
}this.runChildNodes(a.phone,b)
},read_cap_Voice:function(a,b){a.voice=this.getChildValue(b)
},read_cap_Facsimile:function(a,b){a.facsimile=this.getChildValue(b)
},read_cap_Address:function(a,b){a.address={};
this.runChildNodes(a.address,b)
},read_cap_DeliveryPoint:function(a,b){a.deliveryPoint=this.getChildValue(b)
},read_cap_City:function(a,b){a.city=this.getChildValue(b)
},read_cap_AdministrativeArea:function(a,b){a.administrativeArea=this.getChildValue(b)
},read_cap_Country:function(a,b){a.country=this.getChildValue(b)
},read_cap_ElectronicMailAddress:function(a,b){a.electronicMailAddress=this.getChildValue(b)
},read_cap_OnlineResource:function(b,c){var a=this.getAttributeNS(c,"http://www.w3.org/1999/xlink","href");
if(a){b.onlineResource=a
}},read_cap_Title:function(b,a){b.title=this.getChildValue(a)
},read_cap_Identifier:function(b,a){b.identifier=this.getChildValue(a)
},read_cap_Abstract:function(b,a){b["abstract"]=this.getChildValue(a)
},read_cap_Keywords:function(b,a){b.keywords=[];
this.runChildNodes(b.keywords,a)
},read_cap_Keyword:function(c,b){var a=this.getChildValue(b);
c.push(a)
},read_cap_ServiceType:function(b,a){b.serviceType=this.getChildValue(a)
},read_cap_OperationsMetadata:function(a,b){a.operationsMetadata={};
this.runChildNodes(a.operationsMetadata,b)
},read_cap_Operation:function(c,b){var a=this.getAttributeNS(b,"","name");
c[a]={};
this.runChildNodes(c[a],b)
},read_cap_DCP:function(b,a){if(!b.dcp){b.dcp={}
}this.runChildNodes(b.dcp,a)
},read_cap_HTTP:function(b,a){if(!b.http){b.http={}
}this.runChildNodes(b.http,a)
},read_cap_Get:function(c,b){var a=this.getAttributeNS(b,"http://www.w3.org/1999/xlink","href");
if(a){c.get=a
}},read_cap_Post:function(c,b){var a=this.getAttributeNS(b,"http://www.w3.org/1999/xlink","href");
if(a){c.post=a
}},read_cap_Parameter:function(b,a){if(!b.parameters){b.parameters=[]
}var c={};
c.name=this.getAttributeNS(a,"","name");
this.runChildNodes(c,a);
b.parameters.push(c)
},read_cap_Value:function(c,a){if(!c.values){c.values=[]
}var b=this.getChildValue(a);
c.values.push(b)
},read_cap_AllowedValues:function(b,a){this.runChildNodes(b,a)
},read_cap_WGS84BoundingBox:function(b,a){b.wgs84BoundingBox={};
this.runChildNodes(b.wgs84BoundingBox,a)
},read_cap_BoundingBox:function(c,b){if(!c.boundingBoxes){c.boundingBoxes=[]
}var d={};
var a=this.getAttributeNS(b,"","crs");
d.crs=a;
this.runChildNodes(d,b);
c.boundingBoxes.push(d)
},read_cap_LowerCorner:function(c,b){var a=this.getChildValue(b).split(" ");
c.west=a[0];
c.south=a[1]
},read_cap_UpperCorner:function(c,b){var a=this.getChildValue(b).split(" ");
c.east=a[0];
c.north=a[1]
},read_cap_Metadata:function(d,c){if(!d.metadataUrls){d.metadataUrls=[]
}var a=this.getAttributeNS(c,"http://www.w3.org/1999/xlink","href");
if(a.length==0){return
}var b={url:a,type:"",format:""};
d.metadataUrls.push(b)
},CLASS_NAME:"oscar.Format.OGC.ows.v1_0_0"};
oscar.Format.OGC.ows.v1_1_0={};
OpenLayers.Util.extend(oscar.Format.OGC.ows.v1_1_0,oscar.Format.OGC.ows.v1_0_0);
OpenLayers.Util.extend(oscar.Format.OGC.ows.v1_1_0,{read_cap_Title:function(b,a){if(!b.title){b.title={}
}var c=null;
c=this.getAttributeNS(a,"http://www.w3.org/XML/1998/namespace","lang");
if(c!=null&&c.length>0){b.title[c]=this.getChildValue(a)
}else{b.title=this.getChildValue(a)
}},CLASS_NAME:"oscar.Format.OGC.ows.v1_1_0"});
oscar.Format.OGC.owcs=oscar.Format.OGC.ows.v1_0_0;
oscar.Format.OGC.wcs={read_cap_Contents:function(b,a){b.contents={};
this.runChildNodes(b.contents,a)
},read_cap_CoverageSummary:function(b,a){if(!b.coverages){b.coverages=[]
}var c={};
this.runChildNodes(c,a);
b.coverages.push(c)
},read_cap_Identifier:function(b,a){b.identifier=this.getChildValue(a)
},read_cap_SupportedFormat:function(b,a){if(!b.supportedFormats){b.supportedFormats=[]
}var c=this.getChildValue(a);
b.supportedFormats.push(c)
},read_cap_Domain:function(a,b){if(!a.domain){a.domain={}
}this.runChildNodes(a.domain,b)
},read_cap_SpatialDomain:function(b,a){if(!b.spatialDomain){b.spatialDomain={}
}this.runChildNodes(b.spatialDomain,a)
},read_cap_SupportedCRS:function(c,b){if(!c.supportedCRS){c.supportedCRS=[]
}var a=this.getChildValue(b);
c.supportedCRS.push(a)
},CLASS_NAME:"oscar.Format.OGC.wcs"};
oscar.Format.OGC.wfs={read_cap_OutputFormats:function(a,b){var c={formats:[]};
this.runChildNodes(c,b);
a.outputFormats=c
},read_cap_Format:function(c,a){var b=this.getChildValue(a);
if(b){c.formats.push(b)
}},read_cap_MetadataURL:function(d,c){if(!d.metadataUrls){d.metadataUrls=[]
}var a=this.getChildValue(c);
if(a.length==0){return
}var b={url:a,type:this.getAttributeNS(c,"","type"),format:this.getAttributeNS(c,"","format")};
d.metadataUrls.push(b)
},read_cap_DefaultSRS:function(b,a){if(!b.srss){b.srss=[]
}b.srss.push(this.getChildValue(a))
},read_cap_OtherSRS:function(b,a){if(!b.srss){b.srss=[]
}b.srss.push(this.getChildValue(a))
},CLASS_NAME:"oscar.Format.OGC.wfs"};
oscar.Format.OGC.wmts={CLASS_NAME:"oscar.Format.OGC.wmts"};
oscar.Format.OXF=oscar.BaseClass(OpenLayers.Format.JSON,{defaultVersion:2,version:null,initialize:function(a){OpenLayers.Format.JSON.prototype.initialize.apply(this,[a])
},read:function(c){if(typeof c=="string"){c=OpenLayers.Format.JSON.prototype.read.apply(this,[c])
}var a=""+(this.version||c.version||this.defaultVersion);
var b=oscar.Format.OXF["v"+a.replace(/\./g,"_")];
if(!b){throw"Can't find a OXF parser for version "+a
}var e=new b(this.options);
var d=e.read(c);
return d
},CLASS_NAME:"oscar.Format.OXF"});
oscar.Format.OXF.v2=oscar.BaseClass({filters:{themes:function(d,b){if(!d.themes){d.themes=[]
}for(var a=0;
a<b.length;
a++){var c=new oscar.ox.Theme();
this.runProps(c,b[a]);
d.themes.push(c)
}},layers:function(d,c){if(!d.layers){d.layers=[]
}for(var b=0;
b<c.length;
b++){var a=new oscar.ox.Layer();
this.runProps(a,c[b]);
d.layers.push(a)
}},services:function(b,a){if(!b.services){b.services=new oscar.ox.Services()
}this.runProps(b.services,a)
},selection:function(b,a){if(a.length==0){return
}var c=b.addSelectionService();
this.runProps(c,a[0])
},extraction:function(c,b){if(b.length==0){return
}var a=c.addExtractionService();
this.runProps(a,b[0])
},serviceEntries:function(d,c){for(var a=0;
a<c.length;
a++){var b=new oscar.ox.ServiceEntry(c[a]);
d.addServiceEntry(b)
}}},initialize:function(a){},read:function(a){var b={};
this.runProps(b,a);
return b
},runProps:function(d,c){for(var b in c){var a=this.filters[b];
if(a){a.apply(this,[d,c[b]])
}else{d[b]=c[b]
}}},CLASS_NAME:"oscar.Format.OXF.v2"});
oscar.Format.OXF.XML=oscar.BaseClass(OpenLayers.Format.XML,{defaultPrefix:"ox",initialize:function(a){OpenLayers.Format.XML.prototype.initialize.apply(this,[a])
},read:function(a){if(typeof a=="string"){a=OpenLayers.Format.XML.prototype.read.apply(this,[a])
}if(a&&a.nodeType==9){a=a.documentElement
}var b=new oscar.ox();
this.readNode(a,b);
return b
},readers:{ox:{configuration:function(a,b){b.version=a.getAttribute("version");
this.readChildNodes(a,b)
},themes:function(a,b){this.readChildNodes(a,b)
},theme:function(a,c){var b=new oscar.ox.Theme();
c.addTheme(b);
this.readChildNodes(a,b)
},srs:function(b,c){var a=this.getChildValue(b);
c.srs=a
},name:function(a,b){b.name=this.getChildValue(a)
},covers:function(b,c){var a=[];
this.readChildNodes(b,a);
c.covers=a
},cover:function(a,b){var c={};
c.type=a.getAttribute("type");
c.minX=parseFloat(a.getAttribute("minX"));
c.minY=parseFloat(a.getAttribute("minY"));
c.maxX=parseFloat(a.getAttribute("maxX"));
c.maxY=parseFloat(a.getAttribute("maxY"));
b.push(c)
},layers:function(a,b){this.readChildNodes(a,b)
},layer:function(b,c){var a=new oscar.ox.Layer();
c.addLayer(a);
this.readChildNodes(b,a)
},urls:function(a,b){this.readChildNodes(a,b)
},url:function(b,c){var a=this.getChildValue(b);
c.addUrl($$.trim(a))
},format:function(a,b){b.format=this.getChildValue(a)
},baseLayer:function(a,b){},layerType:function(a,b){b.layerType=this.getChildValue(a)
},dataLayers:function(a,b){this.readChildNodes(a,b)
},dataLayer:function(b,c){var a=new oscar.ox.DataLayer();
c.addDataLayer(a);
this.readChildNodes(b,a)
},layerName:function(b,c){var a=this.getChildValue(b);
c.layerName=a
},tileOrigin:function(a,b){var c=this.getChildValue(a);
b.tileOrigin=c.split(",")
},tileFullExtent:function(a,c){var b=this.getChildValue(a);
c.tileFullExtent=b.split(",")
},requestType:function(a,b){b.requestType=this.getChildValue(a)
},tileMatrixSet:function(a,b){b.tileMatrixSet=this.getChildValue(a)
},parameter:function(c,d){var a=c.getAttribute("name");
var b=c.getAttribute("value");
d.parameters[a]=b
},services:function(a,b){b.services=new oscar.ox.Services();
this.readChildNodes(a,b.services)
},service:function(b,d){var c=b.getAttribute("type");
var a=null;
switch(c){case"extraction":a=d.addExtractionService();
break;
case"selection":a=d.addSelectionService();
break
}this.readChildNodes(b,a)
},serviceEntry:function(a,c){var b=new oscar.ox.ServiceEntry();
b.serviceType=a.getAttribute("type");
b.version=a.getAttribute("version");
b.format=a.getAttribute("format");
this.readChildNodes(a,b);
c.addServiceEntry(b)
},identifiers:function(a,b){this.readChildNodes(a,b)
},identifier:function(b,c){var a=this.getChildValue(b);
c.identifiers.push(a)
}}},CLASS_NAME:"oscar.Format.OXF.XML"});
oscar.Format.WFSCapabilities=oscar.BaseClass(OpenLayers.Format.WFSCapabilities,{read:function(e){if(typeof e=="string"){e=OpenLayers.Format.XML.prototype.read.apply(this,[e])
}var c=e.documentElement;
var b=this.version;
if(!b){b=c.getAttribute("version");
if(!b){b=this.defaultVersion
}}var d=oscar.Format.WFSCapabilities["v"+b.replace(/\./g,"_")];
if(!d){throw"Can't find a WFS capabilities parser for version "+b
}var f=new d(this.options);
var a=f.read(e);
a.version=b;
return a
},CLASS_NAME:"oscar.Format.WFSCapabilities"});
oscar.Format.WFSCapabilities.v1=oscar.BaseClass(OpenLayers.Format.WFSCapabilities.v1,{initialize:function(a){OpenLayers.Format.WFSCapabilities.v1.prototype.initialize.apply(this,[a])
},runChildNodes:function(f,e){var c=e.childNodes;
var b,d;
for(var a=0;
a<c.length;
++a){b=c[a];
if(b.nodeType==1){d=this.getProcessor(b);
if(d){d.apply(this,[f,b])
}}}},getProcessor:function(b){var a=b.nodeName.split(":").pop();
processor=this["read_cap_"+a];
return processor
},read_cap_Name:function(b,a){b.name=this.getChildValue(a)
},read_cap_GetCapabilities:function(b,a){var c={href:{},formats:[]};
this.runChildNodes(c,a);
b.getcapabilities=c
},read_cap_DescribeFeatureType:function(c,b){var a={href:{},formats:[]};
this.runChildNodes(a,b);
c.describefeaturetype=a
},CLASS_NAME:"oscar.Format.WFSCapabilities.v1"});
oscar.Format.WFSCapabilities.v1_0_0=oscar.BaseClass(OpenLayers.Format.WFSCapabilities.v1_0_0,oscar.Format.WFSCapabilities.v1,{initialize:function(a){OpenLayers.Format.WFSCapabilities.v1_0_0.prototype.initialize.apply(this,[a])
},read_cap_LatLongBoundingBox:function(b,c){var e=this.getAttributeNS(c,"","maxx");
var d=this.getAttributeNS(c,"","maxy");
var a=this.getAttributeNS(c,"","minx");
var f=this.getAttributeNS(c,"","miny");
b.wgs84BoundingBox={north:d,south:f,east:e,west:a}
},CLASS_NAME:"oscar.Format.WFSCapabilities.v1_0_0"});
oscar.Format.WFSCapabilities.v1_1_0=oscar.BaseClass(oscar.Format.WFSCapabilities.v1,oscar.Format.OGC.ows.v1_0_0,oscar.Format.OGC.wfs,{initialize:function(a){oscar.Format.WFSCapabilities.v1.prototype.initialize.apply(this,[a])
},getProcessor:function(c){var b=c.nodeName.split(":").pop();
var a=this[c.prefix]||this;
var d=a["read_cap_"+b]||this["read_cap_"+b];
return d
},CLASS_NAME:"oscar.Format.WFSCapabilities.v1_1_0"});
oscar.Format.WFSCapabilities.v2_0_0=oscar.BaseClass(oscar.Format.WFSCapabilities.v1,oscar.Format.OGC.ows.v1_1_0,{initialize:function(a){oscar.Format.WFSCapabilities.v1.prototype.initialize.apply(this,[a])
},getProcessor:function(c){var b=c.nodeName.split(":").pop();
var a=this[c.prefix]||this;
var d=a["read_cap_"+b]||this["read_cap_"+b];
return d
},read_cap_DefaultCRS:function(b,a){b.DefaultCRS=this.getChildValue(a)
},read_cap_OtherCRS:function(b,a){if(!b.OtherCRS){b.OtherCRS=[]
}b.OtherCRS.push(this.getChildValue(a))
},read_cap_MetadataURL:function(b,a){if(!b.metadataURLs){b.metadataURLs=[]
}b.metadataURLs.push(this.getAttributeNS(a,"http://www.w3.org/1999/xlink","href"))
},CLASS_NAME:"oscar.Format.WFSCapabilities.v2_0_0"});
oscar.Format.WCSCapabilities=oscar.BaseClass(OpenLayers.Format.XML,{defaultVersion:"1.1.0",version:null,parser:null,initialize:function(a){OpenLayers.Format.prototype.initialize.apply(this,[a]);
this.options=a
},read:function(e){if(typeof e=="string"){e=OpenLayers.Format.XML.prototype.read.apply(this,[e])
}var c=e.documentElement;
var b=this.version||c.getAttribute("version")||this.defaultVersion;
if(!this.parser||this.parser.version!==b){var d=oscar.Format.WCSCapabilities["v"+b.replace(/\./g,"_")];
if(!d){throw"Can't find a WCS capabilities parser for version "+b
}var f=new d(this.options)
}var a=f.read(e);
a.version=b;
return a
},CLASS_NAME:"oscar.Format.WCSCapabilities"});
oscar.Format.WCSCapabilities.v1=oscar.BaseClass(OpenLayers.Format.XML,{initialize:function(a){OpenLayers.Format.XML.prototype.initialize.apply(this,[a])
},read:function(c){if(typeof c=="string"){c=OpenLayers.Format.XML.prototype.read.apply(this,[c])
}var a={};
var b=c.documentElement;
this.runChildNodes(a,b);
return a
},runChildNodes:function(f,e){var c=e.childNodes;
var b,d;
for(var a=0;
a<c.length;
++a){b=c[a];
if(b.nodeType==1){d=this.getProcessor(b);
if(d){d.apply(this,[f,b])
}}}},getProcessor:function(a){processor=this["read_cap_"+a.nodeName.split(":").pop()];
return processor
},CLASS_NAME:"oscar.Format.WCSCapabilities.v1"});
oscar.Format.WCSCapabilities.v1_0_0=oscar.BaseClass(oscar.Format.WCSCapabilities.v1,oscar.Format.OGC.ows.v1_0_0,oscar.Format.OGC.wcs,{initialize:function(a){},nsRef:function(c,a,e,d){var b=this["read_cap_"+a];
if(b){b.apply(this,[e,d])
}},read_cap_Service:function(b,a){this.nsRef("ows","ServiceIdentification",b,a)
},read_cap_metadataLink:function(b,a){},read_cap_description:function(b,a){this.nsRef("ows","Abstract",b,a)
},read_cap_name:function(b,a){this.nsRef("ows","ServiceType",b,a)
},read_cap_label:function(b,a){this.nsRef("ows","Title",b,a)
},read_cap_keywords:function(b,a){this.nsRef("ows","Keywords",b,a)
},read_cap_keyword:function(b,a){this.nsRef("ows","Keyword",b,a)
},read_cap_responsibleParty:function(b,a){this.nsRef("ows","ServiceProvider",b,a)
},read_cap_individualName:function(b,a){this.nsRef("ows","IndividualName",b,a)
},read_cap_positionName:function(b,a){this.nsRef("ows","PositionName",b,a)
},read_cap_organisationName:function(b,a){this.nsRef("ows","ProviderName",b,a)
},read_cap_contactInfo:function(b,a){this.nsRef("ows","ServiceContact",b,a)
},read_cap_phone:function(b,a){this.nsRef("ows","Phone",b,a)
},read_cap_address:function(b,a){this.nsRef("ows","Address",b,a)
},read_cap_city:function(b,a){this.nsRef("ows","City",b,a)
},read_cap_country:function(b,a){this.nsRef("ows","Country",b,a)
},read_cap_electronicMailAddress:function(b,a){this.nsRef("ows","ElectronicMailAddress",b,a)
},read_cap_onlineResource:function(b,a){this.nsRef("ows","OnlineResource",b,a)
},read_cap_fees:function(b,a){},read_cap_accessConstraints:function(b,a){},read_cap_Capability:function(b,a){this.nsRef("ows","OperationsMetadata",b,a)
},read_cap_Request:function(b,a){this.runChildNodes(b,a)
},read_cap_GetCapabilities:function(b,a){b[a.nodeName]={};
this.runChildNodes(b[a.nodeName],a)
},read_cap_GetCoverage:function(b,a){b[a.nodeName]={};
this.runChildNodes(b[a.nodeName],a)
},read_cap_Get:function(c,b){var a={};
this.runChildNodes(a,b);
c.Get=a.OnlineResource
},read_cap_DescribeCoverage:function(b,a){b[a.nodeName]={};
this.runChildNodes(b[a.nodeName],a)
},read_cap_Post:function(c,b){var a={};
this.runChildNodes(a,b);
c.Post=a.OnlineResource
},read_cap_Exception:function(b,a){},read_cap_Format:function(b,a){},read_cap_ContentMetadata:function(b,a){this.nsRef("wcs","Contents",b,a)
},read_cap_CoverageOfferingBrief:function(b,a){this.nsRef("wcs","CoverageSummary",b,a)
},read_cap_lonLatEnvelope:function(b,a){b.wgs84BoundingBox={};
var c=[];
this.runChildNodes(c,a);
b.wgs84BoundingBox.west=c[0];
b.wgs84BoundingBox.south=c[1];
b.wgs84BoundingBox.east=c[2];
b.wgs84BoundingBox.north=c[3]
},read_cap_pos:function(c,b){var a=this.getChildValue(b).split(" ");
c.push(a[0]);
c.push(a[1])
},CLASS_NAME:"oscar.Format.WCSCapabilities.v1_0_0"});
oscar.Format.WCSCapabilities.v1_1_0=oscar.BaseClass(oscar.Format.WCSCapabilities.v1,oscar.Format.OGC.ows.v1_0_0,oscar.Format.OGC.wcs,{initialize:function(a){},getProcessor:function(c){var e=c.prefix||"wcs";
var b=c.localName||c.nodeName.split(":").pop();
var a=this[e]||this;
var d=a["read_cap_"+b]||this["read_cap_"+b];
return d
},CLASS_NAME:"oscar.Format.WCSCapabilities.v1_1_0"});
oscar.Format.WCSCapabilities.v1_1_1=oscar.BaseClass(oscar.Format.WCSCapabilities.v1_1_0,oscar.Format.OGC.ows.v1_1_0,oscar.Format.OGC.wcs,{initialize:function(a){},CLASS_NAME:"oscar.Format.WCSCapabilities.v1_1_1"});
oscar.Format.WCSDescribeCoverage=oscar.BaseClass(OpenLayers.Format.XML,{defaultVersion:"1.1.0",read:function(e){if(typeof e=="string"){e=OpenLayers.Format.XML.prototype.read.apply(this,[e])
}var c=e.documentElement;
var b=this.version;
if(!b){b=c.getAttribute("version");
if(!b){b=this.defaultVersion
}}var d=oscar.Format.WCSDescribeCoverage["v"+b.replace(/\./g,"_")];
if(!d){throw"Can't find a WCS DescribeCoverage parser for version "+b
}var f=new d(this.options);
var a=f.read(e);
a.version=b;
return a
},CLASS_NAME:"oscar.Format.WCSDescribeCoverage"});
oscar.Format.WCSDescribeCoverage.v1=oscar.BaseClass(OpenLayers.Format.XML,{initialize:function(a){OpenLayers.Format.XML.prototype.initialize.apply(this,[a]);
this.options=a
},read:function(c){if(typeof c=="string"){c=OpenLayers.Format.XML.prototype.read.apply(this,[c])
}var a={};
var b=c.documentElement;
this.runChildNodes(a,b);
return a
},runChildNodes:function(f,e){var c=e.childNodes;
var b,d;
for(var a=0;
a<c.length;
++a){b=c[a];
if(b.nodeType==1){d=this["read_cap_"+b.nodeName.split(":").pop()];
if(d){d.apply(this,[f,b])
}}}},CLASS_NAME:"oscar.Format.WCSDescribeCoverage.v1"});
oscar.Format.WCSDescribeCoverage.v1_0_0=oscar.BaseClass(oscar.Format.WCSDescribeCoverage.v1,{initialize:function(a){},read_cap_CoverageOffering:function(b,a){if(!b.coverageDescription){b.coverageDescription={}
}this.runChildNodes(b.coverageDescription,a)
},read_cap_Title:function(b,a){b.title=this.getChildValue(a)
},read_cap_Abstract:function(b,a){b["abstract"]=this.getChildValue(a)
},read_cap_Keywords:function(b,a){b.keywords=[];
this.runChildNodes(b.keywords,a)
},read_cap_Keyword:function(c,b){var a=this.getChildValue(b);
c.push(a)
},read_cap_Identifier:function(b,a){b.identifier=this.getChildValue(a)
},read_cap_Domain:function(a,b){if(!a.domain){a.domain={}
}this.runChildNodes(a.domain,b)
},read_cap_SpatialDomain:function(b,a){if(!b.spatialDomain){b.spatialDomain={}
}this.runChildNodes(b.spatialDomain,a)
},read_cap_GridCRS:function(b,a){},read_cap_GridBaseCRS:function(a,b){},read_cap_GridType:function(a,b){},read_cap_GridOffsets:function(a,b){},read_cap_GridCS:function(a,b){},read_cap_AllowedValues:function(b,a){},read_cap_WGS84BoundingBox:function(b,a){this.read_cap_BoundingBox(b,a)
},read_cap_BoundingBox:function(c,b){if(!c.boundingBoxes){c.boundingBoxes=[]
}var d={};
var a=this.getAttributeNS(b,"","crs");
d.crs=a;
this.runChildNodes(d,b);
c.boundingBoxes.push(d)
},read_cap_LowerCorner:function(c,b){var a=this.getChildValue(b).split(" ");
c.west=a[0];
c.south=a[1]
},read_cap_UpperCorner:function(c,b){var a=this.getChildValue(b).split(" ");
c.east=a[0];
c.north=a[1]
},read_cap_SupportedFormat:function(b,a){if(!b.supportedFormats){b.supportedFormats=[]
}var c=this.getChildValue(a);
b.supportedFormats.push(c)
},read_cap_SupportedCRS:function(c,b){if(!c.supportedCRS){c.supportedCRS=[]
}var a=this.getChildValue(b);
c.supportedCRS.push(a)
},read_cap_Range:function(b,a){b.range={};
this.runChildNodes(b.range,a)
},read_cap_Field:function(c,a){if(!c.fields){c.fields=[]
}var b={};
this.runChildNodes(b,a);
c.fields.push(b)
},CLASS_NAME:"oscar.Format.WCSDescribeCoverage.v1_0_0"});
oscar.Format.WCSDescribeCoverage.v1_1_0=oscar.BaseClass(oscar.Format.WCSDescribeCoverage.v1,{initialize:function(a){},read_cap_CoverageDescription:function(b,a){if(!b.coverageDescription){b.coverageDescription={}
}this.runChildNodes(b.coverageDescription,a)
},read_cap_Title:function(b,a){b.title=this.getChildValue(a)
},read_cap_Abstract:function(b,a){b["abstract"]=this.getChildValue(a)
},read_cap_Keywords:function(b,a){b.keywords=[];
this.runChildNodes(b.keywords,a)
},read_cap_Keyword:function(c,b){var a=this.getChildValue(b);
c.push(a)
},read_cap_Identifier:function(b,a){b.identifier=this.getChildValue(a)
},read_cap_Domain:function(a,b){if(!a.domain){a.domain={}
}this.runChildNodes(a.domain,b)
},read_cap_SpatialDomain:function(b,a){if(!b.spatialDomain){b.spatialDomain={}
}this.runChildNodes(b.spatialDomain,a)
},read_cap_GridCRS:function(b,a){if(!b.gridCRS){b.gridCRS={}
}this.runChildNodes(b.gridCRS,a)
},read_cap_GridBaseCRS:function(a,b){a.gridBaseCRS=this.getChildValue(b)
},read_cap_GridType:function(a,b){a.gridType=this.getChildValue(b)
},read_cap_GridOffsets:function(a,b){a.gridOffsets=this.getChildValue(b)
},read_cap_GridCS:function(a,b){a.gridCS=this.getChildValue(b)
},read_cap_GridOrigin:function(a,b){a.gridOrigin=this.getChildValue(b)
},read_cap_AllowedValues:function(b,a){},read_cap_WGS84BoundingBox:function(b,a){this.read_cap_BoundingBox(b,a)
},read_cap_BoundingBox:function(c,b){if(!c.boundingBoxes){c.boundingBoxes=[]
}var d={};
var a=this.getAttributeNS(b,"","crs");
d.crs=a;
this.runChildNodes(d,b);
c.boundingBoxes.push(d)
},read_cap_LowerCorner:function(c,b){var a=this.getChildValue(b).split(" ");
c.west=a[0];
c.south=a[1]
},read_cap_UpperCorner:function(c,b){var a=this.getChildValue(b).split(" ");
c.east=a[0];
c.north=a[1]
},read_cap_SupportedFormat:function(b,a){if(!b.supportedFormats){b.supportedFormats=[]
}var c=this.getChildValue(a);
b.supportedFormats.push(c)
},read_cap_SupportedCRS:function(c,b){if(!c.supportedCRS){c.supportedCRS=[]
}var a=this.getChildValue(b);
c.supportedCRS.push(a)
},read_cap_Range:function(b,a){b.range={};
this.runChildNodes(b.range,a)
},read_cap_Field:function(c,a){if(!c.fields){c.fields=[]
}var b={};
this.runChildNodes(b,a);
c.fields.push(b)
},CLASS_NAME:"oscar.Format.WCSDescribeCoverage.v1_0_0"});
oscar.Format.WCSDescribeCoverage.v1_1_1=oscar.BaseClass(oscar.Format.WCSDescribeCoverage.v1_1_0,{initialize:function(a){},CLASS_NAME:"oscar.Format.WCSDescribeCoverage.v1_1_1"});
oscar.Format.WMTSCapabilities=oscar.BaseClass(OpenLayers.Format.XML,{defaultVersion:"1.0.0",version:null,parser:null,initialize:function(a){OpenLayers.Format.prototype.initialize.apply(this,[a]);
this.options=a
},read:function(e){if(typeof e=="string"){e=OpenLayers.Format.XML.prototype.read.apply(this,[e])
}var c=e.documentElement;
var b=this.version||c.getAttribute("version")||this.defaultVersion;
if(!this.parser||this.parser.version!==b){var d=oscar.Format.WMTSCapabilities["v"+b.replace(/\./g,"_")];
if(!d){throw"Can't find a WMTS capabilities parser for version "+b
}var f=new d(this.options)
}var a=f.read(e);
a.version=b;
return a
},CLASS_NAME:"oscar.Format.WMTSCapabilities"});
oscar.Format.WMTSCapabilities.v1=oscar.BaseClass(OpenLayers.Format.XML,{initialize:function(a){OpenLayers.Format.XML.prototype.initialize.apply(this,[a]);
this.options=a
},read:function(c){if(typeof c=="string"){c=OpenLayers.Format.XML.prototype.read.apply(this,[c])
}var a={};
var b=c.documentElement;
this.runChildNodes(a,b);
return a
},runChildNodes:function(f,e){var c=e.childNodes;
var b,d;
for(var a=0;
a<c.length;
++a){b=c[a];
if(b.nodeType==1){d=this.getProcessor(b);
if(d){d.apply(this,[f,b])
}}}},getProcessor:function(a){processor=this["read_cap_"+a.nodeName.split(":").pop()];
return processor
},CLASS_NAME:"oscar.Format.WMTSCapabilities.v1"});
oscar.Format.WMTSCapabilities.v1_0_0=oscar.BaseClass(oscar.Format.WMTSCapabilities.v1,oscar.Format.OGC.ows.v1_1_0,{initialize:function(a){oscar.Format.WMTSCapabilities.v1.prototype.initialize.apply(this,[a]);
this.options=a
},getProcessor:function(c){var b=c.nodeName.split(":").pop();
var a=this[c.prefix]||this;
var d=a["read_cap_"+b]||this["read_cap_"+b];
return d
},read_cap_Contents:function(a,b){a.contents={};
this.runChildNodes(a.contents,b)
},read_cap_Layer:function(c,b){if(!c.layers){c.layers=[]
}var a={};
this.runChildNodes(a,b);
c.layers.push(a)
},read_cap_Format:function(b,a){b.format=this.getChildValue(a)
},read_cap_ResourceURL:function(c,a){if(!c.resources){c.resources=[]
}var b={};
b.format=this.getAttributeNS(a,"","format");
b.resourceType=this.getAttributeNS(a,"","resourceType");
b.template=this.getAttributeNS(a,"","template");
c.resources.push(b)
},read_cap_Themes:function(a,b){a.themes=[];
this.runChildNodes(a.themes,b)
},read_cap_Theme:function(c,a){var b={};
this.runChildNodes(b,a);
c.push(b)
},read_cap_LayerRef:function(b,a){if(!b.layerRef){b.layerRef=[]
}var c=this.getChildValue(a);
b.layerRef.push(c)
},read_cap_TileMatrixSet:function(b,a){},CLASS_NAME:"oscar.Format.WMTSCapabilities.v1_0_0"});
oscar.Format.WFSDescribeFeatureType=oscar.BaseClass(OpenLayers.Format.XML,{defaultVersion:"1.0.0",version:null,parser:null,initialize:function(a){OpenLayers.Format.prototype.initialize.apply(this,[a]);
this.options=a
},read:function(d){if(typeof d=="string"){d=OpenLayers.Format.XML.prototype.read.apply(this,[d])
}var b=d.documentElement;
var a=this.version;
if(!a){a=b.getAttribute("version");
if(!a){a=this.defaultVersion
}}var c=oscar.Format.WFSDescribeFeatureType["v"+a.replace(/\./g,"_")];
if(!c){throw"Can't find a WFSDescribeFeatureType parser for version "+a
}var f=new c(this.options);
var e=f.read(d);
e.version=a;
return e
},CLASS_NAME:"oscar.Format.WFSDescribeFeatureType"});
oscar.Format.WFSDescribeFeatureType.v1=oscar.BaseClass(OpenLayers.Format.XML,{initialize:function(a){OpenLayers.Format.XML.prototype.initialize.apply(this,[a])
},read:function(b){if(typeof b=="string"){b=OpenLayers.Format.XML.prototype.read.apply(this,[b])
}var c={};
var a=b.documentElement;
this.runChildNodes(c,a);
return c
},runChildNodes:function(f,e){var c=e.childNodes;
var b,d;
for(var a=0;
a<c.length;
++a){b=c[a];
if(b.nodeType==1){d=this.getProcessor(b);
if(d){d.apply(this,[f,b])
}}}},getProcessor:function(a){processor=this["read_DesFeatureType_"+a.nodeName.split(":").pop()];
return processor
},CLASS_NAME:"oscar.Format.WFSDescribeFeatureType.v1"});
oscar.Format.WFSDescribeFeatureType.v1_0_0=oscar.BaseClass(oscar.Format.WFSDescribeFeatureType.v1,{initialize:function(a){oscar.Format.WFSDescribeFeatureType.v1.prototype.initialize.apply(this,[a]);
this.options=a
},getProcessor:function(b){var a=b.nodeName.split(":").pop();
var c=this["read_DesFeatureType_"+a];
return c
},read_DesFeatureType_schema:function(b,a){b.Schema={};
this.runChildNodes(b.Schema,a)
},read_DesFeatureType_import:function(b,c){b.Import={};
var a={namespace:"",schemaLocation:""};
a.namespace=c.getAttribute("namespace");
a.schemaLocation=c.getAttribute("schemaLocation");
b.Import=a
},read_DesFeatureType_complexType:function(b,c){if(!b.ComplexType){b.ComplexType={}
}var a={};
this.runChildNodes(a,c);
b.ComplexType=a
},read_DesFeatureType_complexContent:function(a,c){if(!a.ComplexContent){a.ComplexContent={}
}var b={};
this.runChildNodes(b,c);
a.ComplexContent=b
},read_DesFeatureType_extension:function(b,a){if(!b.Extension){b.Extension={}
}var c={};
this.runChildNodes(c,a);
b.Extension=c
},read_DesFeatureType_sequence:function(b,a){if(!b.Sequence){b.Sequence={}
}var c={};
this.runChildNodes(c,a);
b.Sequence=c
},read_DesFeatureType_element:function(c,b){if(!c.Elements){c.Elements=[]
}var a={name:"",type:""};
a.name=b.getAttribute("name");
a.type=b.getAttribute("type");
c.Elements.push(a)
},CLASS_NAME:"oscar.Format.WFSDescribeFeatureType.v1_0_0"});
oscar.Format.WFSDescribeFeatureType.v1_1_0=oscar.BaseClass(oscar.Format.WFSDescribeFeatureType.v1,{initialize:function(a){oscar.Format.WFSDescribeFeatureType.v1.prototype.initialize.apply(this,[a]);
this.options=a
},getProcessor:function(b){var a=b.nodeName.split(":").pop();
var c=this["read_DesFeatureType_"+a];
return c
},read_DesFeatureType_schema:function(b,a){b.Schema={};
this.runChildNodes(b.Schema,a)
},read_DesFeatureType_import:function(b,c){b.Import={};
var a={namespace:"",schemaLocation:""};
a.namespace=c.getAttribute("namespace");
a.schemaLocation=c.getAttribute("schemaLocation");
b.Import=a
},read_DesFeatureType_complexType:function(b,c){if(!b.ComplexType){b.ComplexType={}
}var a={};
this.runChildNodes(a,c);
b.ComplexType=a
},read_DesFeatureType_complexContent:function(a,c){if(!a.ComplexContent){a.ComplexContent={}
}var b={};
this.runChildNodes(b,c);
a.ComplexContent=b
},read_DesFeatureType_extension:function(b,a){if(!b.Extension){b.Extension={}
}var c={};
this.runChildNodes(c,a);
b.Extension=c
},read_DesFeatureType_sequence:function(b,a){if(!b.Sequence){b.Sequence={}
}var c={};
this.runChildNodes(c,a);
b.Sequence=c
},read_DesFeatureType_element:function(c,b){if(!c.Elements){c.Elements=[]
}var a={name:"",type:""};
a.name=b.getAttribute("name");
a.type=b.getAttribute("type");
c.Elements.push(a)
},CLASS_NAME:"oscar.Format.WFSDescribeFeatureType.v1_1_0"});
oscar.Util.SelectControl=oscar.BaseClass({available:null,selected:null,initialize:function(a,b){this.available=a;
this.selected=b
},selectOptions:function(a,c,b){this.moveOptions(a,c,this.available,this.selected,b,"")
},unSelectOptions:function(b,c,a){this.moveOptions(b,false,this.selected,this.available,c,a)
},moveOptions:function(d,h,c,a,b,g){var j=null;
if(d===true){j=c.getSelectedOptions()
}else{j=c.getEnabledOptions()
}for(var e=0;
e<j.length;
e++){var f=j[e];
if(g===""||g===f.listName){a.addOption(new oscar.Util.DivSelectOption(f.id,f.name,b,f.listName,h))
}}if(d===true){c.removeSelectedOptions()
}else{c.removeEnabledOptions()
}},CLASS_NAME:"oscar.Util.SelectControl"});
oscar.Util.SettingsAutoCompleteTable=oscar.BaseClass({filterTag:null,displayTag:null,tableDisplayTag:null,settingsDataSource:null,settingsDataTable:null,autoComplete:null,dataTableConfig:null,getDefaultTableConfiguration:function(){return{MSG_EMPTY:oscar.i18n("MICT_MSG_EMPTY"),MSG_ERROR:oscar.i18n("MICT_MSG_ERROR"),MSG_LOADING:oscar.i18n("MICT_MSG_LOADING"),MSG_SORTASC:oscar.i18n("MICT_MSG_SORTASC"),MSG_SORTDESC:oscar.i18n("MICT_MSG_SORTDESC"),scrollable:true,width:"700px",height:"300px",initialRequest:"?filter="+YAHOO.util.Dom.get(filterTag).value+"&IECachePatch"+new Date().getTime()}
},initialize:function(k,i,j){filterTag=k;
displayTag=i;
tableDisplayTag=j;
YAHOO.widget.DataTable.Formatter.statusFormatter=this.statusFormatter;
YAHOO.widget.DataTable.Formatter.resetFormatter=this.resetFormatter;
settingsDataSource=new YAHOO.util.XHRDataSource("getSettings");
settingsDataSource.responseType=YAHOO.util.XHRDataSource.TYPE_JSON;
settingsDataSource.connXhrMode="queueRequests";
settingsDataSource.responseSchema={resultsList:"Response.Results",fields:[{key:"id"},{key:"name"},{key:"value"},{key:"defaultValue"},{key:"type"}]};
var h=new YAHOO.util.FunctionDataSource(this.getSettings);
h.queryMatchContains=true;
autoComplete=new YAHOO.widget.AutoComplete(filterTag,displayTag,h);
autoComplete.minQueryLength=0;
var g=null;
var f=null;
var m=null;
var l=null;
var c={handleSuccess:function(v){settingsDataSource.sendRequest("?filter="+document.getElementById(filterTag).value,settingsDataTable.onDataReturnInitializeTable,settingsDataTable);
tcb=v.argument.tblCallback;
tnv=v.argument.tblNewValue;
var q=v.argument.tblRecord;
var t=settingsDataTable.getRecordIndex(q);
var u=q.getData(t);
var s=YAHOO.lang.JSON.parse(v.responseText);
if(s.Response.Results.status==true){settingsDataTable.updateRow(q,u);
d("info",s.Response.Results.message);
tcb(true,tnv);
settingsDataTable.render()
}else{d("error",s.Response.Results.message);
tcb(false)
}},handleFailure:function(q){YAHOO.log("Failed to process XHR transaction.","error")
},startRequest:function(r,q){o.argument.tblCallback=r;
o.argument.tblNewValue=q;
o.argument.tblRecord=this.getRecord();
var s=this.getRecord().getData("id");
YAHOO.util.Connect.asyncRequest("GET","updateSetting?settingId="+s+"&settingValue="+q,o)
}};
var a={handleSuccess:function(v){var q=v.argument.tblRecord;
var t=settingsDataTable.getRecordIndex(q);
var u=q.getData(t);
var s=YAHOO.lang.JSON.parse(v.responseText);
if(s.Response.Results.status==true){u.value=u.defaultValue;
settingsDataTable.updateRow(q,u);
d("info",s.Response.Results.message);
settingsDataTable.render()
}else{d("error",s.Response.Results.message)
}},handleFailure:function(q){YAHOO.log("Failed to process XHR transaction.","error")
},startRequest:function(q){b.argument.tblRecord=q;
YAHOO.util.Connect.asyncRequest("GET","resetSetting?settingId="+q.getData("id"),b)
}};
var o={success:c.handleSuccess,failure:c.handleFailure,scope:c,argument:{tblCallback:g,tblNewValue:f,tblRecord:m}};
var b={success:a.handleSuccess,failure:a.handleFailure,scope:a,argument:{tblRecord:l}};
var p=[{key:"name",label:oscar.i18n("nameColumnLabel"),sortable:true,width:200},{key:"status",label:oscar.i18n("statusColumnLabel"),formatter:"statusFormatter",sortable:false,width:80},{key:"type",label:oscar.i18n("typeColumnLabel"),sortable:false,width:140},{key:"value",label:oscar.i18n("valueColumnLabel"),sortable:true,editor:new YAHOO.widget.TextboxCellEditor({asyncSubmitter:c.startRequest,LABEL_SAVE:oscar.i18n("saveButtonLabel"),LABEL_CANCEL:oscar.i18n("cancelButtonLabel")}),width:170},{key:"reset",label:oscar.i18n("resetColumnLabel"),formatter:"resetFormatter",sortable:false,width:50}];
settingsDataSource=new YAHOO.util.XHRDataSource("getSettings");
settingsDataSource.responseType=YAHOO.util.XHRDataSource.TYPE_JSON;
settingsDataSource.connXhrMode="queueRequests";
settingsDataSource.responseSchema={resultsList:"Response.Results",fields:[{key:"id"},{key:"name"},{key:"value"},{key:"defaultValue"},{key:"type"}]};
this.dataTableConfig=this.getDefaultTableConfiguration();
settingsDataTable=new YAHOO.widget.DataTable(tableDisplayTag,p,settingsDataSource,this.dataTableConfig);
var e=function(q){var r=q.target;
if(YAHOO.util.Dom.hasClass(r,"yui-dt-editable")){this.highlightCell(r)
}};
var n=function(t){var u=t.target;
var s=this.getColumn(u);
if(s.key=="reset"){var q=this.getRecord(u);
if(q.getData("value")!=q.getData("defaultValue")){var r=new oscar.Gui.ConfirmDialog(oscar.i18n("confirmBoxHeader"),oscar.i18n("confirmReset"),{yesCallback:function(){a.startRequest(q);
r.hide()
},noCallback:function(){r.hide()
}})
}}};
settingsDataTable.subscribe("cellMouseoverEvent",e);
settingsDataTable.subscribe("cellMouseoutEvent",settingsDataTable.onEventUnhighlightCell);
settingsDataTable.subscribe("cellClickEvent",settingsDataTable.onEventShowCellEditor);
settingsDataTable.subscribe("cellClickEvent",n);
var d=function(r,q){if(r=="error"){YAHOO.util.Dom.get("jsMessage").innerHTML="";
YAHOO.util.Dom.get("jsError").innerHTML="<ul><li><span>"+q+"</span></li></ul>"
}else{YAHOO.util.Dom.get("jsError").innerHTML="";
YAHOO.util.Dom.get("jsMessage").innerHTML="<ul><li><span>"+q+"</span></li></ul>"
}};
return{oDS:settingsDataSource,oDT:settingsDataTable}
},getSettings:function(a){settingsDataSource.sendRequest("?filter="+a,settingsDataTable.onDataReturnInitializeTable,settingsDataTable)
},statusFormatter:function(b,a,c,d){if(a.getData("value")==a.getData("defaultValue")){YAHOO.util.Dom.replaceClass(b.parentNode,"default","modified");
b.innerHTML=oscar.i18n("default")
}else{YAHOO.util.Dom.replaceClass(b.parentNode,"modified","default");
b.innerHTML=oscar.i18n("modified")
}},resetFormatter:function(b,a,c,d){if(a.getData("value")==a.getData("defaultValue")){YAHOO.util.Dom.replaceClass(b.parentNode,"default","modified");
b.innerHTML=""
}else{YAHOO.util.Dom.replaceClass(b.parentNode,"modified","default");
b.innerHTML='<div align="center"><a href="#"><img src="../images/configmanager/content_reset.png"/></a></div>'
}},resetTable:function(){settingsDataSource.sendRequest("?filter=",settingsDataTable.onDataReturnInitializeTable,settingsDataTable)
},CLASS_NAME:"oscar.Util.SettingsAutoCompleteTable"});
oscar.Util.StatusChecker=oscar.BaseClass({idParamName:null,baseUrl:null,goodMsgTxt:null,badMsgTxt:null,goodImgUrl:null,badImgUrl:null,goodStatus:null,badStatus:null,initialize:function(h,f,b,g,d,a,e,c){this.idParamName=h;
this.baseUrl=f;
this.goodMsgTxt=b;
this.badMsgTxt=g;
this.goodImgUrl=d;
this.badImgUrl=a;
this.goodStatus=e;
this.badStatus=c
},callback:function(a,b,c){return{success:function(g){var d=YAHOO.lang.JSON.parse(g.responseText);
var e=d.Response.Results;
var f="";
if(e===c.goodStatus){f+='<img src="'+c.goodImgUrl+'"/>';
f+=c.goodMsgTxt;
b.innerHTML=f
}else{if(e===c.badStatus){f+='<img src="'+c.badImgUrl+'"/>';
f+=c.badMsgTxt;
b.innerHTML=f
}else{b.innerHTML="Invalid status returned: "+e
}}},failure:function(d){}}
},checkStatus:function(c,b){var a=this.baseUrl+"?"+this.idParamName+"="+c;
return YAHOO.util.Connect.asyncRequest("GET",a,this.callback(c,b,this))
},CLASS_NAME:"oscar.Util.StatusChecker"});
oscar.Util.Database=oscar.BaseClass({events:null,EVENT_TYPES:["dbupdated"],tables:null,initialize:function(a){this.tables=[];
this.events=new OpenLayers.Events(this,null,this.EVENT_TYPES,false,{includeXY:false})
},addTable:function(a,b){this.tables[a]={columns:b,records:[]}
},addRecord:function(a,c){var b=this.tables[a];
if(b){b.records.push(c);
this.events.triggerEvent("dbupdated");
return b.records.length-1
}return -1
},search:function(a,d,c){var b=this.tables[a];
return c.call(this,b,d)
},CLASS_NAME:"oscar.Util.Database"});
oscar.Util.DivSelect=oscar.BaseClass({initialize:function(b,a){this.selectDiv=b;
if(typeof document.onselectstart!="undefined"){this.selectDiv.onselectstart=new Function("return false")
}else{this.selectDiv.onmousedown=new Function("return false");
this.selectDiv.onmouseup=new Function("return true")
}this.options=new Array();
this.dragable=a;
if(this.dragable){new YAHOO.util.DDTarget(this.selectDiv,this.selectDiv.id)
}},clickOptionDiv:function(){if(this.className=="highlighted"){this.className="unhighlighted"
}else{if(this.className=="unhighlighted"){this.className="highlighted"
}}},addOption:function(c,a){var e=c.createHTMLDiv();
c.optionDiv=e;
if(e!=null){if(!a||this.options.length==0){this.selectDiv.appendChild(e);
this.options[this.options.length]=c
}else{var d=this.selectDiv.childNodes;
var b=false;
for(i=0;
i<this.options.length;
i++){if(a(c,this.options[i])<0){this.options.splice(i,0,c);
this.selectDiv.insertBefore(e,d[i]);
b=true;
break
}}if(!b){this.selectDiv.appendChild(e);
this.options[this.options.length]=c
}}e.onclick=this.clickOptionDiv;
e.className="unhighlighted"
}if(this.dragable){new oscar.Util.DivSelect.DD(this,e.id,this.selectDiv.id)
}},removeOption:function(a){if(a>this.options.length-1){return false
}this.options.splice(a,1);
var b=this.selectDiv.childNodes;
if(b!=null){this.selectDiv.removeChild(b[a])
}},getOption:function(a){return this.options[a]
},selectOption:function(a){if(a>this.options.length-1){return false
}var b=this.selectDiv.childNodes[a];
if(b.className=="unhighlighted"){b.className="highlighted"
}},unselectOption:function(a){if(a>this.options.length-1){return false
}var b=this.selectDiv.childNodes[a];
if(b.className=="highlighted"){b.className="unhighlighted"
}},enableOption:function(a){if(a>this.options.length-1){return false
}this.selectDiv.childNodes[a].className="unhighlighted"
},disableOption:function(a){if(a>this.options.length-1){return false
}this.selectDiv.childNodes[a].className="isDisabled"
},removeSelectedOptions:function(){var a=this.selectDiv.childNodes;
if(a!=null){for(i=a.length-1;
i>=0;
i--){var b=a[i];
if(b.className=="highlighted"){this.selectDiv.removeChild(b);
this.options.splice(i,1)
}}}},removeEnabledOptions:function(){var a=this.selectDiv.childNodes;
if(a!=null){for(i=a.length-1;
i>=0;
i--){var b=a[i];
if(b.className!="isDisabled"){this.selectDiv.removeChild(b);
this.options.splice(i,1)
}}}},removeAllOptions:function(){var a=this.selectDiv.childNodes;
if(a!=null){for(i=a.length-1;
i>=0;
i--){var b=a[i];
this.selectDiv.removeChild(b);
this.options.splice(i,1)
}}},getAllOptions:function(){return this.options
},getSelectedOptions:function(){var a=new Array();
var b=this.selectDiv.childNodes;
if(b!=null){for(i=0;
i<b.length;
i++){var c=b[i];
if(c.className=="highlighted"){a.push(this.options[i])
}}}return a
},getEnabledOptions:function(){var a=new Array();
var b=this.selectDiv.childNodes;
if(b!=null){for(i=0;
i<b.length;
i++){var c=b[i];
if(c.className!="isDisabled"){a.push(this.options[i])
}}}return a
},CLASS_NAME:"oscar.Util.DivSelect"});
oscar.Util.DivSelect.DD=function(c,d,a,b){oscar.Util.DivSelect.DD.superclass.constructor.call(this,d,a,b);
this.divSelect=c;
this.Dom=YAHOO.util.Dom;
this.Event=YAHOO.util.Event;
this.DDM=YAHOO.util.DragDropMgr;
this.logger=this.logger||YAHOO;
this.Dom.setStyle(this.getDragEl(),"opacity",0.67);
this.goingUp=false;
this.lastY=0
};
YAHOO.extend(oscar.Util.DivSelect.DD,YAHOO.util.DDProxy,{startDrag:function(b,d){this.logger.log(this.id+" startDrag");
var a=this.getDragEl();
var c=this.getEl();
this.Dom.setStyle(c,"visibility","hidden");
a.innerHTML=c.innerHTML;
this.Dom.setStyle(a,"text-align",this.Dom.getStyle(c,"text-align"));
this.Dom.setStyle(a,"color",this.Dom.getStyle(c,"color"));
this.Dom.setStyle(a,"backgroundColor",this.Dom.getStyle(c,"backgroundColor"))
},endDrag:function(g){var d=this.getEl();
var f=this.getDragEl();
this.Dom.setStyle(f,"visibility","");
var b=new YAHOO.util.Motion(f,{points:{to:this.Dom.getXY(d)}},0.2,YAHOO.util.Easing.easeOut);
var c=f.id;
var h=this.id;
b.onComplete.subscribe(function(){YAHOO.util.Dom.setStyle(c,"visibility","hidden");
YAHOO.util.Dom.setStyle(h,"visibility","")
});
b.animate()
},onDragDrop:function(f,g){if(this.DDM.interactionInfo.drop.length===1){var d=this.DDM.interactionInfo.point;
var c=this.DDM.interactionInfo.sourceRegion;
if(!c.intersect(d)){var a=this.Dom.get(g);
var b=this.DDM.getDDById(g);
a.appendChild(this.getEl());
b.isEmpty=false;
this.DDM.refreshCache()
}}},onDrag:function(a){var b=this.Event.getPageY(a);
if(b<this.lastY){this.goingUp=true
}else{if(b>this.lastY){this.goingUp=false
}}this.lastY=b
},onDragOver:function(j,c){var b=this.getEl();
var g=this.Dom.get(c);
if(g.className=="highlighted"||g.className=="unhighlighted"||g.className=="isDisabled"){var f=b.parentNode;
var d=g.parentNode;
if(this.goingUp){d.insertBefore(b,g)
}else{d.insertBefore(b,g.nextSibling)
}this.DDM.refreshCache();
var l=this.divSelect.getAllOptions();
var a=new Array();
var k=new Array();
var h=null;
for(i=0;
i<l.length;
i++){if(l[i].optionDiv==b){h=l[i]
}else{k[k.length]=l[i]
}}for(i=0;
i<k.length;
i++){if(k[i].optionDiv==g){if(this.goingUp){a[a.length]=h;
a[a.length]=k[i]
}else{a[a.length]=k[i];
a[a.length]=h
}}else{a[a.length]=k[i]
}}this.divSelect.options=a
}}});
oscar.Util.DivSelectOption=oscar.BaseClass({listName:null,showListName:null,separator:"::",initialize:function(d,a,b,e,c){this.id=d;
this.name=a;
this.inputTagName=b;
this.listName=e;
this.showListName=c
},createHTMLDiv:function(){var a=document.createElement("div");
if(this.showListName){a.id="selectedLayer"+this.id+"Option"
}else{a.id="availableLayer"+this.id+"Option"
}var b="<input type='hidden' name='"+this.inputTagName+"' value='"+this.id+"'/>";
if(this.showListName){b+=this.listName+this.separator+this.name
}else{b+=this.name
}a.innerHTML=b;
return a
},CLASS_NAME:"oscar.Util.DivSelectOption"});
oscar.Util.Metadata={WFS:"WFS",WMS:"WMS",WMTS:"WMTS",WCS:"WCS",getServiceTitle:function(b){var a=this.getService(b);
var d=a.title||a.Title||a.serviceType||oscar.i18n("NotAvailable");
if(d.length==0){d=oscar.i18n("NotAvailable")
}if(typeof d=="object"){var c=d[OpenLayers.Lang.getCode()]||d.en;
d=c
}return d
},getServiceAbstract:function(a){var b=null;
if(a.serviceIdentification){b=a.serviceIdentification["abstract"]||oscar.i18n("NotAvailable")
}else{b=a.service["abstract"]||oscar.i18n("NotAvailable")
}return b
},getServiceKeywords:function(a){var b=null;
if(a.serviceIdentification){b=a.serviceIdentification.keywords||oscar.i18n("NotAvailable")
}return b
},getServiceType:function(b){var a=this.getService(b);
var c=a.name||a.serviceType;
if(c.contains("WMS")){return"WMS"
}else{if(c.contains("WFS")){return"WFS"
}else{if(c.contains("WMTS")){return"WMTS"
}else{if(c.contains("WCS")){return"WCS"
}else{return c
}}}}},getService:function(a){return a.service||a.serviceIdentification
},getLayers:function(a){try{var c=a.capability.layers
}catch(b){}return c
},getFeatureTypes:function(a){return a.featureTypeList.featureTypes
},getFeatureTypesById:function(a,d){for(var c in a.featureTypeList.featureTypes){var b=a.featureTypeList.featureTypes[c];
if(b.name==d){return b
}}return null
},getCoverages:function(a){return a.contents.coverages
},getParameters:function(a,f,c){var b=null;
if(a.operationsMetadata){b=a.operationsMetadata[f]
}else{if(a.capability.request){b=a.capability.request[f]||a.capability.request[f.toLowerCase()]
}}if(b.parameters){for(var e=0;
e<b.parameters.length;
e++){var h=b.parameters[e];
for(var d=0;
d<c.length;
d++){if(h.name.toLowerCase()==c[d].toLowerCase()){return h.values
}}if(b.parameters[e].name==c){return b.parameters[e].values
}}}else{for(var g in b){for(var e=0;
e<c.length;
e++){if(g.toLowerCase()==c[e].toLowerCase()){return b[g]
}}}}return[]
},getIdentifierMetadataUrls:function(a){var b=a.metadataURLs||a.metadataUrls||[];
return b
},getContent:function(a){return a.contents.layers
},getThemes:function(a){return a.themes
},getOperation:function(a,b){if(a.operationsMetadata){return a.operationsMetadata[b]
}else{if(a.capability.request){b=b.toLowerCase();
return a.capability.request[b]
}}return null
},getServiceHref:function(b,a){return oscar.Util.Metadata.getOperationHref(b,a)
},getOperationHref:function(a,b){var d=oscar.Util.Metadata.getOperation(a,b);
if(!d){return""
}if(d.href){if(typeof d.href=="object"){return d.href.get
}else{return d.href
}}else{try{return d.dcp.http.get
}catch(c){return""
}}},getContactInformation:function(a){var b=null;
var c=function(g){var e=["serviceProvider","contactInformation"];
var d=null;
for(var h in g){for(var f=0;
f<e.length;
f++){if(h==e[f]){return d=g[h]
}}if(typeof g[h]=="object"){d=c(g[h]);
if(d!=null){break
}}}return d
};
var b=c(a,"serviceProvider");
if(a.serviceProvider){b={};
OpenLayers.Util.extend(b,a.serviceProvider)
}return b
},CLASS_NAME:"oscar.Util.Metadata"};
oscar.Util.CoordinateSystemAutoComplete=oscar.BaseClass({filterTag:null,containerTag:null,context:null,coorDataSource:null,autoComplete:null,initialize:function(d,c,b){this.filterTag=d;
this.containerTag=c;
this.context=b;
this.coorDataSource=new YAHOO.util.XHRDataSource("getEpsgs");
this.coorDataSource.responseType=YAHOO.util.XHRDataSource.TYPE_JSON;
this.coorDataSource.responseSchema={resultsList:"Response.Results",fields:["code","name"]};
this.autoComplete=new YAHOO.widget.AutoComplete(this.filterTag,this.containerTag,this.coorDataSource);
this.autoComplete.minQueryLength=3;
this.autoComplete.queryDelay=0.3;
this.autoComplete.maxResultsDisplayed=20;
this.autoComplete.forceSelection=true;
this.autoComplete.autoSnapContainer=true;
this.autoComplete.applyLocalFilter=false;
this.autoComplete.resultTypeList=false;
this.autoComplete.generateRequest=function(e){return"?filter="+e
};
this.autoComplete.formatResult=function(f,g,e){return f.code+" ("+f.name+")"
};
var a=this.context;
this.autoComplete.itemSelectEvent.subscribe(function(i,h){var g=h[0];
var f=h[2];
g._elTextbox.value=f.code+"("+f.name+")";
var e=f.code;
a.changeSrs(e)
})
},CLASS_NAME:"oscar.Util.CoordinateSystemAutoComplete"});
oscar.Util.CoordinateReferences={coords:[{description:"HD1909",code:"EPSG:3819"},{description:"TWD67",code:"EPSG:3821"},{description:"TWD97",code:"EPSG:3824"},{description:"IGRS",code:"EPSG:3889"},{description:"MGI 1901",code:"EPSG:3906"},{description:"Unknown datum based upon the Airy 1830 ellipsoid",code:"EPSG:4001"},{description:"Unknown datum based upon the Airy Modified 1849 ellipsoid",code:"EPSG:4002"},{description:"Unknown datum based upon the Australian National Spheroid",code:"EPSG:4003"},{description:"Unknown datum based upon the Bessel 1841 ellipsoid",code:"EPSG:4004"},{description:"Unknown datum based upon the Bessel Modified ellipsoid",code:"EPSG:4005"},{description:"Unknown datum based upon the Bessel Namibia ellipsoid",code:"EPSG:4006"},{description:"Unknown datum based upon the Clarke 1858 ellipsoid",code:"EPSG:4007"},{description:"Unknown datum based upon the Clarke 1866 ellipsoid",code:"EPSG:4008"},{description:"Unknown datum based upon the Clarke 1866 Michigan ellipsoid",code:"EPSG:4009"},{description:"Unknown datum based upon the Clarke 1880 (Benoit) ellipsoid",code:"EPSG:4010"},{description:"Unknown datum based upon the Clarke 1880 (IGN) ellipsoid",code:"EPSG:4011"},{description:"Unknown datum based upon the Clarke 1880 (RGS) ellipsoid",code:"EPSG:4012"},{description:"Unknown datum based upon the Clarke 1880 (Arc) ellipsoid",code:"EPSG:4013"},{description:"Unknown datum based upon the Clarke 1880 (SGA 1922) ellipsoid",code:"EPSG:4014"},{description:"Unknown datum based upon the Everest 1830 (1937 Adjustment) ellipsoid",code:"EPSG:4015"},{description:"Unknown datum based upon the Everest 1830 (1967 Definition) ellipsoid",code:"EPSG:4016"},{description:"Unknown datum based upon the Everest 1830 Modified ellipsoid",code:"EPSG:4018"},{description:"Unknown datum based upon the GRS 1980 ellipsoid",code:"EPSG:4019"},{description:"Unknown datum based upon the Helmert 1906 ellipsoid",code:"EPSG:4020"},{description:"Unknown datum based upon the Indonesian National Spheroid",code:"EPSG:4021"},{description:"Unknown datum based upon the International 1924 ellipsoid",code:"EPSG:4022"},{description:"MOLDREF99",code:"EPSG:4023"},{description:"Unknown datum based upon the Krassowsky 1940 ellipsoid",code:"EPSG:4024"},{description:"Unknown datum based upon the NWL 9D ellipsoid",code:"EPSG:4025"},{description:"Unknown datum based upon the Plessis 1817 ellipsoid",code:"EPSG:4027"},{description:"Unknown datum based upon the Struve 1860 ellipsoid",code:"EPSG:4028"},{description:"Unknown datum based upon the War Office ellipsoid",code:"EPSG:4029"},{description:"Unknown datum based upon the WGS 84 ellipsoid",code:"EPSG:4030"},{description:"Unknown datum based upon the GEM 10C ellipsoid",code:"EPSG:4031"},{description:"Unknown datum based upon the OSU86F ellipsoid",code:"EPSG:4032"},{description:"Unknown datum based upon the OSU91A ellipsoid",code:"EPSG:4033"},{description:"Unknown datum based upon the Clarke 1880 ellipsoid",code:"EPSG:4034"},{description:"Unknown datum based upon the Authalic Sphere",code:"EPSG:4035"},{description:"Unknown datum based upon the GRS 1967 ellipsoid",code:"EPSG:4036"},{description:"Unknown datum based upon the Average Terrestrial System 1977 ellipsoid",code:"EPSG:4041"},{description:"Unknown datum based upon the Everest (1830 Definition) ellipsoid",code:"EPSG:4042"},{description:"Unknown datum based upon the WGS 72 ellipsoid",code:"EPSG:4043"},{description:"Unknown datum based upon the Everest 1830 (1962 Definition) ellipsoid",code:"EPSG:4044"},{description:"Unknown datum based upon the Everest 1830 (1975 Definition) ellipsoid",code:"EPSG:4045"},{description:"RGRDC 2005",code:"EPSG:4046"},{description:"Unspecified datum based upon the GRS 1980 Authalic Sphere",code:"EPSG:4047"},{description:"Unspecified datum based upon the Clarke 1866 Authalic Sphere",code:"EPSG:4052"},{description:"Unspecified datum based upon the International 1924 Authalic Sphere",code:"EPSG:4053"},{description:"Unspecified datum based upon the Hughes 1980 ellipsoid",code:"EPSG:4054"},{description:"Popular Visualisation CRS",code:"EPSG:4055"},{description:"SREF98",code:"EPSG:4075"},{description:"REGCAN95",code:"EPSG:4081"},{description:"Greek",code:"EPSG:4120"},{description:"GGRS87",code:"EPSG:4121"},{description:"ATS77",code:"EPSG:4122"},{description:"KKJ",code:"EPSG:4123"},{description:"RT90",code:"EPSG:4124"},{description:"Samboja",code:"EPSG:4125"},{description:"LKS94 (ETRS89)",code:"EPSG:4126"},{description:"Tete",code:"EPSG:4127"},{description:"Madzansua",code:"EPSG:4128"},{description:"Observatario",code:"EPSG:4129"},{description:"Moznet",code:"EPSG:4130"},{description:"Indian 1960",code:"EPSG:4131"},{description:"FD58",code:"EPSG:4132"},{description:"EST92",code:"EPSG:4133"},{description:"PSD93",code:"EPSG:4134"},{description:"Old Hawaiian",code:"EPSG:4135"},{description:"St. Lawrence Island",code:"EPSG:4136"},{description:"St. Paul Island",code:"EPSG:4137"},{description:"St. George Island",code:"EPSG:4138"},{description:"Puerto Rico",code:"EPSG:4139"},{description:"NAD83(CSRS98)",code:"EPSG:4140"},{description:"Israel",code:"EPSG:4141"},{description:"Locodjo 1965",code:"EPSG:4142"},{description:"Abidjan 1987",code:"EPSG:4143"},{description:"Kalianpur 1937",code:"EPSG:4144"},{description:"Kalianpur 1962",code:"EPSG:4145"},{description:"Kalianpur 1975",code:"EPSG:4146"},{description:"Hanoi 1972",code:"EPSG:4147"},{description:"Hartebeesthoek94",code:"EPSG:4148"},{description:"CH1903",code:"EPSG:4149"},{description:"CH1903+",code:"EPSG:4150"},{description:"CHTRF95",code:"EPSG:4151"},{description:"NAD83(HARN)",code:"EPSG:4152"},{description:"Rassadiran",code:"EPSG:4153"},{description:"ED50(ED77)",code:"EPSG:4154"},{description:"Dabola 1981",code:"EPSG:4155"},{description:"S-JTSK",code:"EPSG:4156"},{description:"Mount Dillon",code:"EPSG:4157"},{description:"Naparima 1955",code:"EPSG:4158"},{description:"ELD79",code:"EPSG:4159"},{description:"Chos Malal 1914",code:"EPSG:4160"},{description:"Pampa del Castillo",code:"EPSG:4161"},{description:"Korean 1985",code:"EPSG:4162"},{description:"Yemen NGN96",code:"EPSG:4163"},{description:"South Yemen",code:"EPSG:4164"},{description:"Bissau",code:"EPSG:4165"},{description:"Korean 1995",code:"EPSG:4166"},{description:"NZGD2000",code:"EPSG:4167"},{description:"Accra",code:"EPSG:4168"},{description:"American Samoa 1962",code:"EPSG:4169"},{description:"SIRGAS 1995",code:"EPSG:4170"},{description:"RGF93",code:"EPSG:4171"},{description:"POSGAR",code:"EPSG:4172"},{description:"IRENET95",code:"EPSG:4173"},{description:"Sierra Leone 1924",code:"EPSG:4174"},{description:"Sierra Leone 1968",code:"EPSG:4175"},{description:"Australian Antarctic",code:"EPSG:4176"},{description:"Pulkovo 1942(83)",code:"EPSG:4178"},{description:"Pulkovo 1942(58)",code:"EPSG:4179"},{description:"EST97",code:"EPSG:4180"},{description:"Luxembourg 1930",code:"EPSG:4181"},{description:"Azores Occidental 1939",code:"EPSG:4182"},{description:"Azores Central 1948",code:"EPSG:4183"},{description:"Azores Oriental 1940",code:"EPSG:4184"},{description:"Madeira 1936",code:"EPSG:4185"},{description:"OSNI 1952",code:"EPSG:4188"},{description:"REGVEN",code:"EPSG:4189"},{description:"POSGAR 98",code:"EPSG:4190"},{description:"Albanian 1987",code:"EPSG:4191"},{description:"Douala 1948",code:"EPSG:4192"},{description:"Manoca 1962",code:"EPSG:4193"},{description:"Qornoq 1927",code:"EPSG:4194"},{description:"Scoresbysund 1952",code:"EPSG:4195"},{description:"Ammassalik 1958",code:"EPSG:4196"},{description:"Garoua",code:"EPSG:4197"},{description:"Kousseri",code:"EPSG:4198"},{description:"Egypt 1930",code:"EPSG:4199"},{description:"Pulkovo 1995",code:"EPSG:4200"},{description:"Adindan",code:"EPSG:4201"},{description:"AGD66",code:"EPSG:4202"},{description:"AGD84",code:"EPSG:4203"},{description:"Ain el Abd",code:"EPSG:4204"},{description:"Afgooye",code:"EPSG:4205"},{description:"Agadez",code:"EPSG:4206"},{description:"Lisbon",code:"EPSG:4207"},{description:"Aratu",code:"EPSG:4208"},{description:"Arc 1950",code:"EPSG:4209"},{description:"Arc 1960",code:"EPSG:4210"},{description:"Batavia",code:"EPSG:4211"},{description:"Barbados 1938",code:"EPSG:4212"},{description:"Beduaram",code:"EPSG:4213"},{description:"Beijing 1954",code:"EPSG:4214"},{description:"Belge 1950",code:"EPSG:4215"},{description:"Bermuda 1957",code:"EPSG:4216"},{description:"Bogota 1975",code:"EPSG:4218"},{description:"Bukit Rimpah",code:"EPSG:4219"},{description:"Camacupa",code:"EPSG:4220"},{description:"Campo Inchauspe",code:"EPSG:4221"},{description:"Cape",code:"EPSG:4222"},{description:"Carthage",code:"EPSG:4223"},{description:"Chua",code:"EPSG:4224"},{description:"Corrego Alegre",code:"EPSG:4225"},{description:"Cote d'Ivoire",code:"EPSG:4226"},{description:"Deir ez Zor",code:"EPSG:4227"},{description:"Douala",code:"EPSG:4228"},{description:"Egypt 1907",code:"EPSG:4229"},{description:"ED50",code:"EPSG:4230"},{description:"ED87",code:"EPSG:4231"},{description:"Fahud",code:"EPSG:4232"},{description:"Gandajika 1970",code:"EPSG:4233"},{description:"Garoua",code:"EPSG:4234"},{description:"Guyane Francaise",code:"EPSG:4235"},{description:"Hu Tzu Shan 1950",code:"EPSG:4236"},{description:"HD72",code:"EPSG:4237"},{description:"ID74",code:"EPSG:4238"},{description:"Indian 1954",code:"EPSG:4239"},{description:"Indian 1975",code:"EPSG:4240"},{description:"Jamaica 1875",code:"EPSG:4241"},{description:"JAD69",code:"EPSG:4242"},{description:"Kalianpur 1880",code:"EPSG:4243"},{description:"Kandawala",code:"EPSG:4244"},{description:"Kertau 1968",code:"EPSG:4245"},{description:"KOC",code:"EPSG:4246"},{description:"La Canoa",code:"EPSG:4247"},{description:"PSAD56",code:"EPSG:4248"},{description:"Lake",code:"EPSG:4249"},{description:"Leigon",code:"EPSG:4250"},{description:"Liberia 1964",code:"EPSG:4251"},{description:"Lome",code:"EPSG:4252"},{description:"Luzon 1911",code:"EPSG:4253"},{description:"Hito XVIII 1963",code:"EPSG:4254"},{description:"Herat North",code:"EPSG:4255"},{description:"Mahe 1971",code:"EPSG:4256"},{description:"Makassar",code:"EPSG:4257"},{description:"ETRS89",code:"EPSG:4258"},{description:"Malongo 1987",code:"EPSG:4259"},{description:"Manoca",code:"EPSG:4260"},{description:"Merchich",code:"EPSG:4261"},{description:"Massawa",code:"EPSG:4262"},{description:"Minna",code:"EPSG:4263"},{description:"Mhast",code:"EPSG:4264"},{description:"Monte Mario",code:"EPSG:4265"},{description:"M'poraloko",code:"EPSG:4266"},{description:"NAD27",code:"EPSG:4267"},{description:"NAD27 Michigan",code:"EPSG:4268"},{description:"NAD83",code:"EPSG:4269"},{description:"Nahrwan 1967",code:"EPSG:4270"},{description:"Naparima 1972",code:"EPSG:4271"},{description:"NZGD49",code:"EPSG:4272"},{description:"NGO 1948",code:"EPSG:4273"},{description:"Datum 73",code:"EPSG:4274"},{description:"NTF",code:"EPSG:4275"},{description:"NSWC 9Z-2",code:"EPSG:4276"},{description:"OSGB 1936",code:"EPSG:4277"},{description:"OSGB70",code:"EPSG:4278"},{description:"OS(SN)80",code:"EPSG:4279"},{description:"Padang",code:"EPSG:4280"},{description:"Palestine 1923",code:"EPSG:4281"},{description:"Pointe Noire",code:"EPSG:4282"},{description:"GDA94",code:"EPSG:4283"},{description:"Pulkovo 1942",code:"EPSG:4284"},{description:"Qatar 1974",code:"EPSG:4285"},{description:"Qatar 1948",code:"EPSG:4286"},{description:"Qornoq",code:"EPSG:4287"},{description:"Loma Quintana",code:"EPSG:4288"},{description:"Amersfoort",code:"EPSG:4289"},{description:"SAD69",code:"EPSG:4291"},{description:"Sapper Hill 1943",code:"EPSG:4292"},{description:"Schwarzeck",code:"EPSG:4293"},{description:"Segora",code:"EPSG:4294"},{description:"Serindung",code:"EPSG:4295"},{description:"Sudan",code:"EPSG:4296"},{description:"Tananarive",code:"EPSG:4297"},{description:"Timbalai 1948",code:"EPSG:4298"},{description:"TM65",code:"EPSG:4299"},{description:"TM75",code:"EPSG:4300"},{description:"Tokyo",code:"EPSG:4301"},{description:"Trinidad 1903",code:"EPSG:4302"},{description:"TC(1948)",code:"EPSG:4303"},{description:"Voirol 1875",code:"EPSG:4304"},{description:"Bern 1938",code:"EPSG:4306"},{description:"Nord Sahara 1959",code:"EPSG:4307"},{description:"RT38",code:"EPSG:4308"},{description:"Yacare",code:"EPSG:4309"},{description:"Yoff",code:"EPSG:4310"},{description:"Zanderij",code:"EPSG:4311"},{description:"MGI",code:"EPSG:4312"},{description:"Belge 1972",code:"EPSG:4313"},{description:"DHDN",code:"EPSG:4314"},{description:"Conakry 1905",code:"EPSG:4315"},{description:"Dealul Piscului 1930",code:"EPSG:4316"},{description:"Dealul Piscului 1970",code:"EPSG:4317"},{description:"NGN",code:"EPSG:4318"},{description:"KUDAMS",code:"EPSG:4319"},{description:"WGS 72",code:"EPSG:4322"},{description:"WGS 72BE",code:"EPSG:4324"},{description:"WGS 84",code:"EPSG:4326"},{description:"Anguilla 1957",code:"EPSG:4600"},{description:"Antigua 1943",code:"EPSG:4601"},{description:"Dominica 1945",code:"EPSG:4602"},{description:"Grenada 1953",code:"EPSG:4603"},{description:"Montserrat 1958",code:"EPSG:4604"},{description:"St. Kitts 1955",code:"EPSG:4605"},{description:"St. Lucia 1955",code:"EPSG:4606"},{description:"St. Vincent 1945",code:"EPSG:4607"},{description:"NAD27(76)",code:"EPSG:4608"},{description:"NAD27(CGQ77)",code:"EPSG:4609"},{description:"Xian 1980",code:"EPSG:4610"},{description:"Hong Kong 1980",code:"EPSG:4611"},{description:"JGD2000",code:"EPSG:4612"},{description:"Segara",code:"EPSG:4613"},{description:"QND95",code:"EPSG:4614"},{description:"Porto Santo",code:"EPSG:4615"},{description:"Selvagem Grande",code:"EPSG:4616"},{description:"NAD83(CSRS)",code:"EPSG:4617"},{description:"SAD69",code:"EPSG:4618"},{description:"SWEREF99",code:"EPSG:4619"},{description:"Point 58",code:"EPSG:4620"},{description:"Fort Marigot",code:"EPSG:4621"},{description:"Guadeloupe 1948",code:"EPSG:4622"},{description:"CSG67",code:"EPSG:4623"},{description:"RGFG95",code:"EPSG:4624"},{description:"Martinique 1938",code:"EPSG:4625"},{description:"Reunion 1947",code:"EPSG:4626"},{description:"RGR92",code:"EPSG:4627"},{description:"Tahiti 52",code:"EPSG:4628"},{description:"Tahaa 54",code:"EPSG:4629"},{description:"IGN72 Nuku Hiva",code:"EPSG:4630"},{description:"K0 1949",code:"EPSG:4631"},{description:"Combani 1950",code:"EPSG:4632"},{description:"IGN56 Lifou",code:"EPSG:4633"},{description:"IGN72 Grand Terre",code:"EPSG:4634"},{description:"ST87 Ouvea",code:"EPSG:4635"},{description:"Petrels 1972",code:"EPSG:4636"},{description:"Perroud 1950",code:"EPSG:4637"},{description:"Saint Pierre et Miquelon 1950",code:"EPSG:4638"},{description:"MOP78",code:"EPSG:4639"},{description:"RRAF 1991",code:"EPSG:4640"},{description:"IGN53 Mare",code:"EPSG:4641"},{description:"ST84 Ile des Pins",code:"EPSG:4642"},{description:"ST71 Belep",code:"EPSG:4643"},{description:"NEA74 Noumea",code:"EPSG:4644"},{description:"RGNC 1991",code:"EPSG:4645"},{description:"Grand Comoros",code:"EPSG:4646"},{description:"Reykjavik 1900",code:"EPSG:4657"},{description:"Hjorsey 1955",code:"EPSG:4658"},{description:"ISN93",code:"EPSG:4659"},{description:"Helle 1954",code:"EPSG:4660"},{description:"LKS92",code:"EPSG:4661"},{description:"IGN72 Grande Terre",code:"EPSG:4662"},{description:"Porto Santo 1995",code:"EPSG:4663"},{description:"Azores Oriental 1995",code:"EPSG:4664"},{description:"Azores Central 1995",code:"EPSG:4665"},{description:"Lisbon 1890",code:"EPSG:4666"},{description:"IKBD-92",code:"EPSG:4667"},{description:"ED79",code:"EPSG:4668"},{description:"LKS94",code:"EPSG:4669"},{description:"IGM95",code:"EPSG:4670"},{description:"Voirol 1879",code:"EPSG:4671"},{description:"Chatham Islands 1971",code:"EPSG:4672"},{description:"Chatham Islands 1979",code:"EPSG:4673"},{description:"SIRGAS 2000",code:"EPSG:4674"},{description:"Guam 1963",code:"EPSG:4675"},{description:"Vientiane 1982",code:"EPSG:4676"},{description:"Lao 1993",code:"EPSG:4677"},{description:"Lao 1997",code:"EPSG:4678"},{description:"Jouik 1961",code:"EPSG:4679"},{description:"Nouakchott 1965",code:"EPSG:4680"},{description:"Mauritania 1999",code:"EPSG:4681"},{description:"Gulshan 303",code:"EPSG:4682"},{description:"PRS92",code:"EPSG:4683"},{description:"Gan 1970",code:"EPSG:4684"},{description:"Gandajika",code:"EPSG:4685"},{description:"MAGNA-SIRGAS",code:"EPSG:4686"},{description:"RGPF",code:"EPSG:4687"},{description:"Fatu Iva 72",code:"EPSG:4688"},{description:"IGN63 Hiva Oa",code:"EPSG:4689"},{description:"Tahiti 79",code:"EPSG:4690"},{description:"Moorea 87",code:"EPSG:4691"},{description:"Maupiti 83",code:"EPSG:4692"},{description:"Nakhl-e Ghanem",code:"EPSG:4693"},{description:"POSGAR 94",code:"EPSG:4694"},{description:"Katanga 1955",code:"EPSG:4695"},{description:"Kasai 1953",code:"EPSG:4696"},{description:"IGC 1962 6th Parallel South",code:"EPSG:4697"},{description:"IGN 1962 Kerguelen",code:"EPSG:4698"},{description:"Le Pouce 1934",code:"EPSG:4699"},{description:"IGN Astro 1960",code:"EPSG:4700"},{description:"IGCB 1955",code:"EPSG:4701"},{description:"Mauritania 1999",code:"EPSG:4702"},{description:"Mhast 1951",code:"EPSG:4703"},{description:"Mhast (onshore)",code:"EPSG:4704"},{description:"Mhast (offshore)",code:"EPSG:4705"},{description:"Egypt Gulf of Suez S-650 TL",code:"EPSG:4706"},{description:"Tern Island 1961",code:"EPSG:4707"},{description:"Cocos Islands 1965",code:"EPSG:4708"},{description:"Iwo Jima 1945",code:"EPSG:4709"},{description:"St. Helena 1971",code:"EPSG:4710"},{description:"Marcus Island 1952",code:"EPSG:4711"},{description:"Ascension Island 1958",code:"EPSG:4712"},{description:"Ayabelle Lighthouse",code:"EPSG:4713"},{description:"Bellevue",code:"EPSG:4714"},{description:"Camp Area Astro",code:"EPSG:4715"},{description:"Phoenix Islands 1966",code:"EPSG:4716"},{description:"Cape Canaveral",code:"EPSG:4717"},{description:"Solomon 1968",code:"EPSG:4718"},{description:"Easter Island 1967",code:"EPSG:4719"},{description:"Fiji 1986",code:"EPSG:4720"},{description:"Fiji 1956",code:"EPSG:4721"},{description:"South Georgia 1968",code:"EPSG:4722"},{description:"Grand Cayman 1959",code:"EPSG:4723"},{description:"Diego Garcia 1969",code:"EPSG:4724"},{description:"Johnston Island 1961",code:"EPSG:4725"},{description:"Little Cayman 1961",code:"EPSG:4726"},{description:"Midway 1961",code:"EPSG:4727"},{description:"Pico de las Nieves 1984",code:"EPSG:4728"},{description:"Pitcairn 1967",code:"EPSG:4729"},{description:"Santo 1965",code:"EPSG:4730"},{description:"Viti Levu 1916",code:"EPSG:4731"},{description:"Marshall Islands 1960",code:"EPSG:4732"},{description:"Wake Island 1952",code:"EPSG:4733"},{description:"Tristan 1968",code:"EPSG:4734"},{description:"Kusaie 1951",code:"EPSG:4735"},{description:"Deception Island",code:"EPSG:4736"},{description:"Korea 2000",code:"EPSG:4737"},{description:"Hong Kong 1963",code:"EPSG:4738"},{description:"Hong Kong 1963(67)",code:"EPSG:4739"},{description:"PZ-90",code:"EPSG:4740"},{description:"FD54",code:"EPSG:4741"},{description:"GDM2000",code:"EPSG:4742"},{description:"Karbala 1979",code:"EPSG:4743"},{description:"Nahrwan 1934",code:"EPSG:4744"},{description:"RD/83",code:"EPSG:4745"},{description:"PD/83",code:"EPSG:4746"},{description:"GR96",code:"EPSG:4747"},{description:"Vanua Levu 1915",code:"EPSG:4748"},{description:"RGNC91-93",code:"EPSG:4749"},{description:"ST87 Ouvea",code:"EPSG:4750"},{description:"Kertau (RSO)",code:"EPSG:4751"},{description:"Viti Levu 1912",code:"EPSG:4752"},{description:"fk89",code:"EPSG:4753"},{description:"LGD2006",code:"EPSG:4754"},{description:"DGN95",code:"EPSG:4755"},{description:"VN-2000",code:"EPSG:4756"},{description:"SVY21",code:"EPSG:4757"},{description:"JAD2001",code:"EPSG:4758"},{description:"NAD83(NSRS2007)",code:"EPSG:4759"},{description:"WGS 66",code:"EPSG:4760"},{description:"HTRS96",code:"EPSG:4761"},{description:"BDA2000",code:"EPSG:4762"},{description:"Pitcairn 2006",code:"EPSG:4763"},{description:"RSRGD2000",code:"EPSG:4764"},{description:"Slovenia 1996",code:"EPSG:4765"},{description:"Bern 1898 (Bern)",code:"EPSG:4801"},{description:"Bogota 1975 (Bogota)",code:"EPSG:4802"},{description:"Lisbon (Lisbon)",code:"EPSG:4803"},{description:"Makassar (Jakarta)",code:"EPSG:4804"},{description:"MGI (Ferro)",code:"EPSG:4805"},{description:"Monte Mario (Rome)",code:"EPSG:4806"},{description:"NTF (Paris)",code:"EPSG:4807"},{description:"Padang (Jakarta)",code:"EPSG:4808"},{description:"Belge 1950 (Brussels)",code:"EPSG:4809"},{description:"Tananarive (Paris)",code:"EPSG:4810"},{description:"Voirol 1875 (Paris)",code:"EPSG:4811"},{description:"Batavia (Jakarta)",code:"EPSG:4813"},{description:"RT38 (Stockholm)",code:"EPSG:4814"},{description:"Greek (Athens)",code:"EPSG:4815"},{description:"Carthage (Paris)",code:"EPSG:4816"},{description:"NGO 1948 (Oslo)",code:"EPSG:4817"},{description:"S-JTSK (Ferro)",code:"EPSG:4818"},{description:"Nord Sahara 1959 (Paris)",code:"EPSG:4819"},{description:"Segara (Jakarta)",code:"EPSG:4820"},{description:"Voirol 1879 (Paris)",code:"EPSG:4821"},{description:"ATF (Paris)",code:"EPSG:4901"},{description:"NDG (Paris)",code:"EPSG:4902"},{description:"Madrid 1870 (Madrid)",code:"EPSG:4903"},{description:"Lisbon 1890 (Lisbon)",code:"EPSG:4904"},{description:"Anguilla 1957 / British West Indies Grid",code:"EPSG:2000"},{description:"Antigua 1943 / British West Indies Grid",code:"EPSG:2001"},{description:"Dominica 1945 / British West Indies Grid",code:"EPSG:2002"},{description:"Grenada 1953 / British West Indies Grid",code:"EPSG:2003"},{description:"Montserrat 1958 / British West Indies Grid",code:"EPSG:2004"},{description:"St. Kitts 1955 / British West Indies Grid",code:"EPSG:2005"},{description:"St. Lucia 1955 / British West Indies Grid",code:"EPSG:2006"},{description:"St. Vincent 45 / British West Indies Grid",code:"EPSG:2007"},{description:"NAD27(CGQ77) / SCoPQ zone 2",code:"EPSG:2008"},{description:"NAD27(CGQ77) / SCoPQ zone 3",code:"EPSG:2009"},{description:"NAD27(CGQ77) / SCoPQ zone 4",code:"EPSG:2010"},{description:"NAD27(CGQ77) / SCoPQ zone 5",code:"EPSG:2011"},{description:"NAD27(CGQ77) / SCoPQ zone 6",code:"EPSG:2012"},{description:"NAD27(CGQ77) / SCoPQ zone 7",code:"EPSG:2013"},{description:"NAD27(CGQ77) / SCoPQ zone 8",code:"EPSG:2014"},{description:"NAD27(CGQ77) / SCoPQ zone 9",code:"EPSG:2015"},{description:"NAD27(CGQ77) / SCoPQ zone 10",code:"EPSG:2016"},{description:"NAD27(76) / MTM zone 8",code:"EPSG:2017"},{description:"NAD27(76) / MTM zone 9",code:"EPSG:2018"},{description:"NAD27(76) / MTM zone 10",code:"EPSG:2019"},{description:"NAD27(76) / MTM zone 11",code:"EPSG:2020"},{description:"NAD27(76) / MTM zone 12",code:"EPSG:2021"},{description:"NAD27(76) / MTM zone 13",code:"EPSG:2022"},{description:"NAD27(76) / MTM zone 14",code:"EPSG:2023"},{description:"NAD27(76) / MTM zone 15",code:"EPSG:2024"},{description:"NAD27(76) / MTM zone 16",code:"EPSG:2025"},{description:"NAD27(76) / MTM zone 17",code:"EPSG:2026"},{description:"NAD27(76) / UTM zone 15N",code:"EPSG:2027"},{description:"NAD27(76) / UTM zone 16N",code:"EPSG:2028"},{description:"NAD27(76) / UTM zone 17N",code:"EPSG:2029"},{description:"NAD27(76) / UTM zone 18N",code:"EPSG:2030"},{description:"NAD27(CGQ77) / UTM zone 17N",code:"EPSG:2031"},{description:"NAD27(CGQ77) / UTM zone 18N",code:"EPSG:2032"},{description:"NAD27(CGQ77) / UTM zone 19N",code:"EPSG:2033"},{description:"NAD27(CGQ77) / UTM zone 20N",code:"EPSG:2034"},{description:"NAD27(CGQ77) / UTM zone 21N",code:"EPSG:2035"},{description:"NAD83(CSRS98) / New Brunswick Stereo",code:"EPSG:2036"},{description:"NAD83(CSRS98) / UTM zone 19N",code:"EPSG:2037"},{description:"NAD83(CSRS98) / UTM zone 20N",code:"EPSG:2038"},{description:"Israel / Israeli TM Grid",code:"EPSG:2039"},{description:"Locodjo 1965 / UTM zone 30N",code:"EPSG:2040"},{description:"Abidjan 1987 / UTM zone 30N",code:"EPSG:2041"},{description:"Locodjo 1965 / UTM zone 29N",code:"EPSG:2042"},{description:"Abidjan 1987 / UTM zone 29N",code:"EPSG:2043"},{description:"Hanoi 1972 / Gauss-Kruger zone 18",code:"EPSG:2044"},{description:"Hanoi 1972 / Gauss-Kruger zone 19",code:"EPSG:2045"},{description:"Hartebeesthoek94 / Lo15",code:"EPSG:2046"},{description:"Hartebeesthoek94 / Lo17",code:"EPSG:2047"},{description:"Hartebeesthoek94 / Lo19",code:"EPSG:2048"},{description:"Hartebeesthoek94 / Lo21",code:"EPSG:2049"},{description:"Hartebeesthoek94 / Lo23",code:"EPSG:2050"},{description:"Hartebeesthoek94 / Lo25",code:"EPSG:2051"},{description:"Hartebeesthoek94 / Lo27",code:"EPSG:2052"},{description:"Hartebeesthoek94 / Lo29",code:"EPSG:2053"},{description:"Hartebeesthoek94 / Lo31",code:"EPSG:2054"},{description:"Hartebeesthoek94 / Lo33",code:"EPSG:2055"},{description:"CH1903+ / LV95",code:"EPSG:2056"},{description:"Rassadiran / Nakhl e Taqi",code:"EPSG:2057"},{description:"ED50(ED77) / UTM zone 38N",code:"EPSG:2058"},{description:"ED50(ED77) / UTM zone 39N",code:"EPSG:2059"},{description:"ED50(ED77) / UTM zone 40N",code:"EPSG:2060"},{description:"ED50(ED77) / UTM zone 41N",code:"EPSG:2061"},{description:"Madrid 1870 (Madrid) / Spain",code:"EPSG:2062"},{description:"Dabola 1981 / UTM zone 28N",code:"EPSG:2063"},{description:"Dabola 1981 / UTM zone 29N",code:"EPSG:2064"},{description:"S-JTSK (Ferro) / Krovak",code:"EPSG:2065"},{description:"Mount Dillon / Tobago Grid",code:"EPSG:2066"},{description:"Naparima 1955 / UTM zone 20N",code:"EPSG:2067"},{description:"ELD79 / Libya zone 5",code:"EPSG:2068"},{description:"ELD79 / Libya zone 6",code:"EPSG:2069"},{description:"ELD79 / Libya zone 7",code:"EPSG:2070"},{description:"ELD79 / Libya zone 8",code:"EPSG:2071"},{description:"ELD79 / Libya zone 9",code:"EPSG:2072"},{description:"ELD79 / Libya zone 10",code:"EPSG:2073"},{description:"ELD79 / Libya zone 11",code:"EPSG:2074"},{description:"ELD79 / Libya zone 12",code:"EPSG:2075"},{description:"ELD79 / Libya zone 13",code:"EPSG:2076"},{description:"ELD79 / UTM zone 32N",code:"EPSG:2077"},{description:"ELD79 / UTM zone 33N",code:"EPSG:2078"},{description:"ELD79 / UTM zone 34N",code:"EPSG:2079"},{description:"ELD79 / UTM zone 35N",code:"EPSG:2080"},{description:"Chos Malal 1914 / Argentina zone 2",code:"EPSG:2081"},{description:"Pampa del Castillo / Argentina zone 2",code:"EPSG:2082"},{description:"Hito XVIII 1963 / Argentina zone 2",code:"EPSG:2083"},{description:"Hito XVIII 1963 / UTM zone 19S",code:"EPSG:2084"},{description:"NAD27 / Cuba Norte",code:"EPSG:2085"},{description:"NAD27 / Cuba Sur",code:"EPSG:2086"},{description:"ELD79 / TM 12 NE",code:"EPSG:2087"},{description:"Carthage / TM 11 NE",code:"EPSG:2088"},{description:"Yemen NGN96 / UTM zone 38N",code:"EPSG:2089"},{description:"Yemen NGN96 / UTM zone 39N",code:"EPSG:2090"},{description:"South Yemen / Gauss Kruger zone 8",code:"EPSG:2091"},{description:"South Yemen / Gauss Kruger zone 9",code:"EPSG:2092"},{description:"Hanoi 1972 / GK 106 NE",code:"EPSG:2093"},{description:"WGS 72BE / TM 106 NE",code:"EPSG:2094"},{description:"Bissau / UTM zone 28N",code:"EPSG:2095"},{description:"Korean 1985 / Korea East Belt",code:"EPSG:2096"},{description:"Korean 1985 / Korea Central Belt",code:"EPSG:2097"},{description:"Korean 1985 / Korea West Belt",code:"EPSG:2098"},{description:"Qatar 1948 / Qatar Grid",code:"EPSG:2099"},{description:"GGRS87 / Greek Grid",code:"EPSG:2100"},{description:"Lake / Maracaibo Grid M1",code:"EPSG:2101"},{description:"Lake / Maracaibo Grid",code:"EPSG:2102"},{description:"Lake / Maracaibo Grid M3",code:"EPSG:2103"},{description:"Lake / Maracaibo La Rosa Grid",code:"EPSG:2104"},{description:"NZGD2000 / Mount Eden 2000",code:"EPSG:2105"},{description:"NZGD2000 / Bay of Plenty 2000",code:"EPSG:2106"},{description:"NZGD2000 / Poverty Bay 2000",code:"EPSG:2107"},{description:"NZGD2000 / Hawkes Bay 2000",code:"EPSG:2108"},{description:"NZGD2000 / Taranaki 2000",code:"EPSG:2109"},{description:"NZGD2000 / Tuhirangi 2000",code:"EPSG:2110"},{description:"NZGD2000 / Wanganui 2000",code:"EPSG:2111"},{description:"NZGD2000 / Wairarapa 2000",code:"EPSG:2112"},{description:"NZGD2000 / Wellington 2000",code:"EPSG:2113"},{description:"NZGD2000 / Collingwood 2000",code:"EPSG:2114"},{description:"NZGD2000 / Nelson 2000",code:"EPSG:2115"},{description:"NZGD2000 / Karamea 2000",code:"EPSG:2116"},{description:"NZGD2000 / Buller 2000",code:"EPSG:2117"},{description:"NZGD2000 / Grey 2000",code:"EPSG:2118"},{description:"NZGD2000 / Amuri 2000",code:"EPSG:2119"},{description:"NZGD2000 / Marlborough 2000",code:"EPSG:2120"},{description:"NZGD2000 / Hokitika 2000",code:"EPSG:2121"},{description:"NZGD2000 / Okarito 2000",code:"EPSG:2122"},{description:"NZGD2000 / Jacksons Bay 2000",code:"EPSG:2123"},{description:"NZGD2000 / Mount Pleasant 2000",code:"EPSG:2124"},{description:"NZGD2000 / Gawler 2000",code:"EPSG:2125"},{description:"NZGD2000 / Timaru 2000",code:"EPSG:2126"},{description:"NZGD2000 / Lindis Peak 2000",code:"EPSG:2127"},{description:"NZGD2000 / Mount Nicholas 2000",code:"EPSG:2128"},{description:"NZGD2000 / Mount York 2000",code:"EPSG:2129"},{description:"NZGD2000 / Observation Point 2000",code:"EPSG:2130"},{description:"NZGD2000 / North Taieri 2000",code:"EPSG:2131"},{description:"NZGD2000 / Bluff 2000",code:"EPSG:2132"},{description:"NZGD2000 / UTM zone 58S",code:"EPSG:2133"},{description:"NZGD2000 / UTM zone 59S",code:"EPSG:2134"},{description:"NZGD2000 / UTM zone 60S",code:"EPSG:2135"},{description:"Accra / Ghana National Grid",code:"EPSG:2136"},{description:"Accra / TM 1 NW",code:"EPSG:2137"},{description:"NAD27(CGQ77) / Quebec Lambert",code:"EPSG:2138"},{description:"NAD83(CSRS98) / SCoPQ zone 2",code:"EPSG:2139"},{description:"NAD83(CSRS98) / MTM zone 3",code:"EPSG:2140"},{description:"NAD83(CSRS98) / MTM zone 4",code:"EPSG:2141"},{description:"NAD83(CSRS98) / MTM zone 5",code:"EPSG:2142"},{description:"NAD83(CSRS98) / MTM zone 6",code:"EPSG:2143"},{description:"NAD83(CSRS98) / MTM zone 7",code:"EPSG:2144"},{description:"NAD83(CSRS98) / MTM zone 8",code:"EPSG:2145"},{description:"NAD83(CSRS98) / MTM zone 9",code:"EPSG:2146"},{description:"NAD83(CSRS98) / MTM zone 10",code:"EPSG:2147"},{description:"NAD83(CSRS98) / UTM zone 21N",code:"EPSG:2148"},{description:"NAD83(CSRS98) / UTM zone 18N",code:"EPSG:2149"},{description:"NAD83(CSRS98) / UTM zone 17N",code:"EPSG:2150"},{description:"NAD83(CSRS98) / UTM zone 13N",code:"EPSG:2151"},{description:"NAD83(CSRS98) / UTM zone 12N",code:"EPSG:2152"},{description:"NAD83(CSRS98) / UTM zone 11N",code:"EPSG:2153"},{description:"RGF93 / Lambert-93",code:"EPSG:2154"},{description:"American Samoa 1962 / American Samoa Lambert",code:"EPSG:2155"},{description:"NAD83(HARN) / UTM zone 59S",code:"EPSG:2156"},{description:"IRENET95 / Irish Transverse Mercator",code:"EPSG:2157"},{description:"IRENET95 / UTM zone 29N",code:"EPSG:2158"},{description:"Sierra Leone 1924 / New Colony Grid",code:"EPSG:2159"},{description:"Sierra Leone 1924 / New War Office Grid",code:"EPSG:2160"},{description:"Sierra Leone 1968 / UTM zone 28N",code:"EPSG:2161"},{description:"Sierra Leone 1968 / UTM zone 29N",code:"EPSG:2162"},{description:"US National Atlas Equal Area",code:"EPSG:2163"},{description:"Locodjo 1965 / TM 5 NW",code:"EPSG:2164"},{description:"Abidjan 1987 / TM 5 NW",code:"EPSG:2165"},{description:"Pulkovo 1942(83) / Gauss Kruger zone 3",code:"EPSG:2166"},{description:"Pulkovo 1942(83) / Gauss Kruger zone 4",code:"EPSG:2167"},{description:"Pulkovo 1942(83) / Gauss Kruger zone 5",code:"EPSG:2168"},{description:"Luxembourg 1930 / Gauss",code:"EPSG:2169"},{description:"MGI / Slovenia Grid",code:"EPSG:2170"},{description:"Pulkovo 1942(58) / Poland zone I",code:"EPSG:2171"},{description:"Pulkovo 1942(58) / Poland zone II",code:"EPSG:2172"},{description:"Pulkovo 1942(58) / Poland zone III",code:"EPSG:2173"},{description:"Pulkovo 1942(58) / Poland zone IV",code:"EPSG:2174"},{description:"Pulkovo 1942(58) / Poland zone V",code:"EPSG:2175"},{description:"ETRS89 / Poland CS2000 zone 5",code:"EPSG:2176"},{description:"ETRS89 / Poland CS2000 zone 6",code:"EPSG:2177"},{description:"ETRS89 / Poland CS2000 zone 7",code:"EPSG:2178"},{description:"ETRS89 / Poland CS2000 zone 8",code:"EPSG:2179"},{description:"ETRS89 / Poland CS92",code:"EPSG:2180"},{description:"Azores Occidental 1939 / UTM zone 25N",code:"EPSG:2188"},{description:"Azores Central 1948 / UTM zone 26N",code:"EPSG:2189"},{description:"Azores Oriental 1940 / UTM zone 26N",code:"EPSG:2190"},{description:"Madeira 1936 / UTM zone 28N",code:"EPSG:2191"},{description:"ED50 / France EuroLambert",code:"EPSG:2192"},{description:"NZGD2000 / New Zealand Transverse Mercator 2000",code:"EPSG:2193"},{description:"American Samoa 1962 / American Samoa Lambert",code:"EPSG:2194"},{description:"NAD83(HARN) / UTM zone 2S",code:"EPSG:2195"},{description:"ETRS89 / Kp2000 Jutland",code:"EPSG:2196"},{description:"ETRS89 / Kp2000 Zealand",code:"EPSG:2197"},{description:"ETRS89 / Kp2000 Bornholm",code:"EPSG:2198"},{description:"Albanian 1987 / Gauss Kruger zone 4",code:"EPSG:2199"},{description:"ATS77 / New Brunswick Stereographic (ATS77)",code:"EPSG:2200"},{description:"REGVEN / UTM zone 18N",code:"EPSG:2201"},{description:"REGVEN / UTM zone 19N",code:"EPSG:2202"},{description:"REGVEN / UTM zone 20N",code:"EPSG:2203"},{description:"NAD27 / Tennessee",code:"EPSG:2204"},{description:"NAD83 / Kentucky North",code:"EPSG:2205"},{description:"ED50 / 3-degree Gauss-Kruger zone 9",code:"EPSG:2206"},{description:"ED50 / 3-degree Gauss-Kruger zone 10",code:"EPSG:2207"},{description:"ED50 / 3-degree Gauss-Kruger zone 11",code:"EPSG:2208"},{description:"ED50 / 3-degree Gauss-Kruger zone 12",code:"EPSG:2209"},{description:"ED50 / 3-degree Gauss-Kruger zone 13",code:"EPSG:2210"},{description:"ED50 / 3-degree Gauss-Kruger zone 14",code:"EPSG:2211"},{description:"ED50 / 3-degree Gauss-Kruger zone 15",code:"EPSG:2212"},{description:"ETRS89 / TM 30 NE",code:"EPSG:2213"},{description:"Douala 1948 / AOF west",code:"EPSG:2214"},{description:"Manoca 1962 / UTM zone 32N",code:"EPSG:2215"},{description:"Qornoq 1927 / UTM zone 22N",code:"EPSG:2216"},{description:"Qornoq 1927 / UTM zone 23N",code:"EPSG:2217"},{description:"Scoresbysund 1952 / Greenland zone 5 east",code:"EPSG:2218"},{description:"ATS77 / UTM zone 19N",code:"EPSG:2219"},{description:"ATS77 / UTM zone 20N",code:"EPSG:2220"},{description:"Scoresbysund 1952 / Greenland zone 6 east",code:"EPSG:2221"},{description:"NAD83 / Arizona East (ft)",code:"EPSG:2222"},{description:"NAD83 / Arizona Central (ft)",code:"EPSG:2223"},{description:"NAD83 / Arizona West (ft)",code:"EPSG:2224"},{description:"NAD83 / California zone 1 (ftUS)",code:"EPSG:2225"},{description:"NAD83 / California zone 2 (ftUS)",code:"EPSG:2226"},{description:"NAD83 / California zone 3 (ftUS)",code:"EPSG:2227"},{description:"NAD83 / California zone 4 (ftUS)",code:"EPSG:2228"},{description:"NAD83 / California zone 5 (ftUS)",code:"EPSG:2229"},{description:"NAD83 / California zone 6 (ftUS)",code:"EPSG:2230"},{description:"NAD83 / Colorado North (ftUS)",code:"EPSG:2231"},{description:"NAD83 / Colorado Central (ftUS)",code:"EPSG:2232"},{description:"NAD83 / Colorado South (ftUS)",code:"EPSG:2233"},{description:"NAD83 / Connecticut (ftUS)",code:"EPSG:2234"},{description:"NAD83 / Delaware (ftUS)",code:"EPSG:2235"},{description:"NAD83 / Florida East (ftUS)",code:"EPSG:2236"},{description:"NAD83 / Florida West (ftUS)",code:"EPSG:2237"},{description:"NAD83 / Florida North (ftUS)",code:"EPSG:2238"},{description:"NAD83 / Georgia East (ftUS)",code:"EPSG:2239"},{description:"NAD83 / Georgia West (ftUS)",code:"EPSG:2240"},{description:"NAD83 / Idaho East (ftUS)",code:"EPSG:2241"},{description:"NAD83 / Idaho Central (ftUS)",code:"EPSG:2242"},{description:"NAD83 / Idaho West (ftUS)",code:"EPSG:2243"},{description:"NAD83 / Indiana East (ftUS)",code:"EPSG:2244"},{description:"NAD83 / Indiana West (ftUS)",code:"EPSG:2245"},{description:"NAD83 / Kentucky North (ftUS)",code:"EPSG:2246"},{description:"NAD83 / Kentucky South (ftUS)",code:"EPSG:2247"},{description:"NAD83 / Maryland (ftUS)",code:"EPSG:2248"},{description:"NAD83 / Massachusetts Mainland (ftUS)",code:"EPSG:2249"},{description:"NAD83 / Massachusetts Island (ftUS)",code:"EPSG:2250"},{description:"NAD83 / Michigan North (ft)",code:"EPSG:2251"},{description:"NAD83 / Michigan Central (ft)",code:"EPSG:2252"},{description:"NAD83 / Michigan South (ft)",code:"EPSG:2253"},{description:"NAD83 / Mississippi East (ftUS)",code:"EPSG:2254"},{description:"NAD83 / Mississippi West (ftUS)",code:"EPSG:2255"},{description:"NAD83 / Montana (ft)",code:"EPSG:2256"},{description:"NAD83 / New Mexico East (ftUS)",code:"EPSG:2257"},{description:"NAD83 / New Mexico Central (ftUS)",code:"EPSG:2258"},{description:"NAD83 / New Mexico West (ftUS)",code:"EPSG:2259"},{description:"NAD83 / New York East (ftUS)",code:"EPSG:2260"},{description:"NAD83 / New York Central (ftUS)",code:"EPSG:2261"},{description:"NAD83 / New York West (ftUS)",code:"EPSG:2262"},{description:"NAD83 / New York Long Island (ftUS)",code:"EPSG:2263"},{description:"NAD83 / North Carolina (ftUS)",code:"EPSG:2264"},{description:"NAD83 / North Dakota North (ft)",code:"EPSG:2265"},{description:"NAD83 / North Dakota South (ft)",code:"EPSG:2266"},{description:"NAD83 / Oklahoma North (ftUS)",code:"EPSG:2267"},{description:"NAD83 / Oklahoma South (ftUS)",code:"EPSG:2268"},{description:"NAD83 / Oregon North (ft)",code:"EPSG:2269"},{description:"NAD83 / Oregon South (ft)",code:"EPSG:2270"},{description:"NAD83 / Pennsylvania North (ftUS)",code:"EPSG:2271"},{description:"NAD83 / Pennsylvania South (ftUS)",code:"EPSG:2272"},{description:"NAD83 / South Carolina (ft)",code:"EPSG:2273"},{description:"NAD83 / Tennessee (ftUS)",code:"EPSG:2274"},{description:"NAD83 / Texas North (ftUS)",code:"EPSG:2275"},{description:"NAD83 / Texas North Central (ftUS)",code:"EPSG:2276"},{description:"NAD83 / Texas Central (ftUS)",code:"EPSG:2277"},{description:"NAD83 / Texas South Central (ftUS)",code:"EPSG:2278"},{description:"NAD83 / Texas South (ftUS)",code:"EPSG:2279"},{description:"NAD83 / Utah North (ft)",code:"EPSG:2280"},{description:"NAD83 / Utah Central (ft)",code:"EPSG:2281"},{description:"NAD83 / Utah South (ft)",code:"EPSG:2282"},{description:"NAD83 / Virginia North (ftUS)",code:"EPSG:2283"},{description:"NAD83 / Virginia South (ftUS)",code:"EPSG:2284"},{description:"NAD83 / Washington North (ftUS)",code:"EPSG:2285"},{description:"NAD83 / Washington South (ftUS)",code:"EPSG:2286"},{description:"NAD83 / Wisconsin North (ftUS)",code:"EPSG:2287"},{description:"NAD83 / Wisconsin Central (ftUS)",code:"EPSG:2288"},{description:"NAD83 / Wisconsin South (ftUS)",code:"EPSG:2289"},{description:"ATS77 / Prince Edward Isl. Stereographic (ATS77)",code:"EPSG:2290"},{description:"NAD83(CSRS98) / Prince Edward Isl. Stereographic (NAD83)",code:"EPSG:2291"},{description:"NAD83(CSRS98) / Prince Edward Isl. Stereographic (NAD83)",code:"EPSG:2292"},{description:"ATS77 / MTM Nova Scotia zone 4",code:"EPSG:2294"},{description:"ATS77 / MTM Nova Scotia zone 5",code:"EPSG:2295"},{description:"Ammassalik 1958 / Greenland zone 7 east",code:"EPSG:2296"},{description:"Qornoq 1927 / Greenland zone 1 east",code:"EPSG:2297"},{description:"Qornoq 1927 / Greenland zone 2 east",code:"EPSG:2298"},{description:"Qornoq 1927 / Greenland zone 2 west",code:"EPSG:2299"},{description:"Qornoq 1927 / Greenland zone 3 east",code:"EPSG:2300"},{description:"Qornoq 1927 / Greenland zone 3 west",code:"EPSG:2301"},{description:"Qornoq 1927 / Greenland zone 4 east",code:"EPSG:2302"},{description:"Qornoq 1927 / Greenland zone 4 west",code:"EPSG:2303"},{description:"Qornoq 1927 / Greenland zone 5 west",code:"EPSG:2304"},{description:"Qornoq 1927 / Greenland zone 6 west",code:"EPSG:2305"},{description:"Qornoq 1927 / Greenland zone 7 west",code:"EPSG:2306"},{description:"Qornoq 1927 / Greenland zone 8 east",code:"EPSG:2307"},{description:"Batavia / TM 109 SE",code:"EPSG:2308"},{description:"WGS 84 / TM 116 SE",code:"EPSG:2309"},{description:"WGS 84 / TM 132 SE",code:"EPSG:2310"},{description:"WGS 84 / TM 6 NE",code:"EPSG:2311"},{description:"Garoua / UTM zone 33N",code:"EPSG:2312"},{description:"Kousseri / UTM zone 33N",code:"EPSG:2313"},{description:"Trinidad 1903 / Trinidad Grid (ftCla)",code:"EPSG:2314"},{description:"Campo Inchauspe / UTM zone 19S",code:"EPSG:2315"},{description:"Campo Inchauspe / UTM zone 20S",code:"EPSG:2316"},{description:"PSAD56 / ICN Regional",code:"EPSG:2317"},{description:"Ain el Abd / Aramco Lambert",code:"EPSG:2318"},{description:"ED50 / TM27",code:"EPSG:2319"},{description:"ED50 / TM30",code:"EPSG:2320"},{description:"ED50 / TM33",code:"EPSG:2321"},{description:"ED50 / TM36",code:"EPSG:2322"},{description:"ED50 / TM39",code:"EPSG:2323"},{description:"ED50 / TM42",code:"EPSG:2324"},{description:"ED50 / TM45",code:"EPSG:2325"},{description:"Hong Kong 1980 Grid System",code:"EPSG:2326"},{description:"Xian 1980 / Gauss-Kruger zone 13",code:"EPSG:2327"},{description:"Xian 1980 / Gauss-Kruger zone 14",code:"EPSG:2328"},{description:"Xian 1980 / Gauss-Kruger zone 15",code:"EPSG:2329"},{description:"Xian 1980 / Gauss-Kruger zone 16",code:"EPSG:2330"},{description:"Xian 1980 / Gauss-Kruger zone 17",code:"EPSG:2331"},{description:"Xian 1980 / Gauss-Kruger zone 18",code:"EPSG:2332"},{description:"Xian 1980 / Gauss-Kruger zone 19",code:"EPSG:2333"},{description:"Xian 1980 / Gauss-Kruger zone 20",code:"EPSG:2334"},{description:"Xian 1980 / Gauss-Kruger zone 21",code:"EPSG:2335"},{description:"Xian 1980 / Gauss-Kruger zone 22",code:"EPSG:2336"},{description:"Xian 1980 / Gauss-Kruger zone 23",code:"EPSG:2337"},{description:"Xian 1980 / Gauss-Kruger CM 75E",code:"EPSG:2338"},{description:"Xian 1980 / Gauss-Kruger CM 81E",code:"EPSG:2339"},{description:"Xian 1980 / Gauss-Kruger CM 87E",code:"EPSG:2340"},{description:"Xian 1980 / Gauss-Kruger CM 93E",code:"EPSG:2341"},{description:"Xian 1980 / Gauss-Kruger CM 99E",code:"EPSG:2342"},{description:"Xian 1980 / Gauss-Kruger CM 105E",code:"EPSG:2343"},{description:"Xian 1980 / Gauss-Kruger CM 111E",code:"EPSG:2344"},{description:"Xian 1980 / Gauss-Kruger CM 117E",code:"EPSG:2345"},{description:"Xian 1980 / Gauss-Kruger CM 123E",code:"EPSG:2346"},{description:"Xian 1980 / Gauss-Kruger CM 129E",code:"EPSG:2347"},{description:"Xian 1980 / Gauss-Kruger CM 135E",code:"EPSG:2348"},{description:"Xian 1980 / 3-degree Gauss-Kruger zone 25",code:"EPSG:2349"},{description:"Xian 1980 / 3-degree Gauss-Kruger zone 26",code:"EPSG:2350"},{description:"Xian 1980 / 3-degree Gauss-Kruger zone 27",code:"EPSG:2351"},{description:"Xian 1980 / 3-degree Gauss-Kruger zone 28",code:"EPSG:2352"},{description:"Xian 1980 / 3-degree Gauss-Kruger zone 29",code:"EPSG:2353"},{description:"Xian 1980 / 3-degree Gauss-Kruger zone 30",code:"EPSG:2354"},{description:"Xian 1980 / 3-degree Gauss-Kruger zone 31",code:"EPSG:2355"},{description:"Xian 1980 / 3-degree Gauss-Kruger zone 32",code:"EPSG:2356"},{description:"Xian 1980 / 3-degree Gauss-Kruger zone 33",code:"EPSG:2357"},{description:"Xian 1980 / 3-degree Gauss-Kruger zone 34",code:"EPSG:2358"},{description:"Xian 1980 / 3-degree Gauss-Kruger zone 35",code:"EPSG:2359"},{description:"Xian 1980 / 3-degree Gauss-Kruger zone 36",code:"EPSG:2360"},{description:"Xian 1980 / 3-degree Gauss-Kruger zone 37",code:"EPSG:2361"},{description:"Xian 1980 / 3-degree Gauss-Kruger zone 38",code:"EPSG:2362"},{description:"Xian 1980 / 3-degree Gauss-Kruger zone 39",code:"EPSG:2363"},{description:"Xian 1980 / 3-degree Gauss-Kruger zone 40",code:"EPSG:2364"},{description:"Xian 1980 / 3-degree Gauss-Kruger zone 41",code:"EPSG:2365"},{description:"Xian 1980 / 3-degree Gauss-Kruger zone 42",code:"EPSG:2366"},{description:"Xian 1980 / 3-degree Gauss-Kruger zone 43",code:"EPSG:2367"},{description:"Xian 1980 / 3-degree Gauss-Kruger zone 44",code:"EPSG:2368"},{description:"Xian 1980 / 3-degree Gauss-Kruger zone 45",code:"EPSG:2369"},{description:"Xian 1980 / 3-degree Gauss-Kruger CM 75E",code:"EPSG:2370"},{description:"Xian 1980 / 3-degree Gauss-Kruger CM 78E",code:"EPSG:2371"},{description:"Xian 1980 / 3-degree Gauss-Kruger CM 81E",code:"EPSG:2372"},{description:"Xian 1980 / 3-degree Gauss-Kruger CM 84E",code:"EPSG:2373"},{description:"Xian 1980 / 3-degree Gauss-Kruger CM 87E",code:"EPSG:2374"},{description:"Xian 1980 / 3-degree Gauss-Kruger CM 90E",code:"EPSG:2375"},{description:"Xian 1980 / 3-degree Gauss-Kruger CM 93E",code:"EPSG:2376"},{description:"Xian 1980 / 3-degree Gauss-Kruger CM 96E",code:"EPSG:2377"},{description:"Xian 1980 / 3-degree Gauss-Kruger CM 99E",code:"EPSG:2378"},{description:"Xian 1980 / 3-degree Gauss-Kruger CM 102E",code:"EPSG:2379"},{description:"Xian 1980 / 3-degree Gauss-Kruger CM 105E",code:"EPSG:2380"},{description:"Xian 1980 / 3-degree Gauss-Kruger CM 108E",code:"EPSG:2381"},{description:"Xian 1980 / 3-degree Gauss-Kruger CM 111E",code:"EPSG:2382"},{description:"Xian 1980 / 3-degree Gauss-Kruger CM 114E",code:"EPSG:2383"},{description:"Xian 1980 / 3-degree Gauss-Kruger CM 117E",code:"EPSG:2384"},{description:"Xian 1980 / 3-degree Gauss-Kruger CM 120E",code:"EPSG:2385"},{description:"Xian 1980 / 3-degree Gauss-Kruger CM 123E",code:"EPSG:2386"},{description:"Xian 1980 / 3-degree Gauss-Kruger CM 126E",code:"EPSG:2387"},{description:"Xian 1980 / 3-degree Gauss-Kruger CM 129E",code:"EPSG:2388"},{description:"Xian 1980 / 3-degree Gauss-Kruger CM 132E",code:"EPSG:2389"},{description:"Xian 1980 / 3-degree Gauss-Kruger CM 135E",code:"EPSG:2390"},{description:"KKJ / Finland zone 1",code:"EPSG:2391"},{description:"KKJ / Finland zone 2",code:"EPSG:2392"},{description:"KKJ / Finland Uniform Coordinate System",code:"EPSG:2393"},{description:"KKJ / Finland zone 4",code:"EPSG:2394"},{description:"South Yemen / Gauss-Kruger zone 8",code:"EPSG:2395"},{description:"South Yemen / Gauss-Kruger zone 9",code:"EPSG:2396"},{description:"Pulkovo 1942(83) / 3-degree Gauss-Kruger zone 3",code:"EPSG:2397"},{description:"Pulkovo 1942(83) / 3-degree Gauss-Kruger zone 4",code:"EPSG:2398"},{description:"Pulkovo 1942(83) / 3-degree Gauss-Kruger zone 5",code:"EPSG:2399"},{description:"RT90 2.5 gon W",code:"EPSG:2400"},{description:"Beijing 1954 / 3-degree Gauss-Kruger zone 25",code:"EPSG:2401"},{description:"Beijing 1954 / 3-degree Gauss-Kruger zone 26",code:"EPSG:2402"},{description:"Beijing 1954 / 3-degree Gauss-Kruger zone 27",code:"EPSG:2403"},{description:"Beijing 1954 / 3-degree Gauss-Kruger zone 28",code:"EPSG:2404"},{description:"Beijing 1954 / 3-degree Gauss-Kruger zone 29",code:"EPSG:2405"},{description:"Beijing 1954 / 3-degree Gauss-Kruger zone 30",code:"EPSG:2406"},{description:"Beijing 1954 / 3-degree Gauss-Kruger zone 31",code:"EPSG:2407"},{description:"Beijing 1954 / 3-degree Gauss-Kruger zone 32",code:"EPSG:2408"},{description:"Beijing 1954 / 3-degree Gauss-Kruger zone 33",code:"EPSG:2409"},{description:"Beijing 1954 / 3-degree Gauss-Kruger zone 34",code:"EPSG:2410"},{description:"Beijing 1954 / 3-degree Gauss-Kruger zone 35",code:"EPSG:2411"},{description:"Beijing 1954 / 3-degree Gauss-Kruger zone 36",code:"EPSG:2412"},{description:"Beijing 1954 / 3-degree Gauss-Kruger zone 37",code:"EPSG:2413"},{description:"Beijing 1954 / 3-degree Gauss-Kruger zone 38",code:"EPSG:2414"},{description:"Beijing 1954 / 3-degree Gauss-Kruger zone 39",code:"EPSG:2415"},{description:"Beijing 1954 / 3-degree Gauss-Kruger zone 40",code:"EPSG:2416"},{description:"Beijing 1954 / 3-degree Gauss-Kruger zone 41",code:"EPSG:2417"},{description:"Beijing 1954 / 3-degree Gauss-Kruger zone 42",code:"EPSG:2418"},{description:"Beijing 1954 / 3-degree Gauss-Kruger zone 43",code:"EPSG:2419"},{description:"Beijing 1954 / 3-degree Gauss-Kruger zone 44",code:"EPSG:2420"},{description:"Beijing 1954 / 3-degree Gauss-Kruger zone 45",code:"EPSG:2421"},{description:"Beijing 1954 / 3-degree Gauss-Kruger CM 75E",code:"EPSG:2422"},{description:"Beijing 1954 / 3-degree Gauss-Kruger CM 78E",code:"EPSG:2423"},{description:"Beijing 1954 / 3-degree Gauss-Kruger CM 81E",code:"EPSG:2424"},{description:"Beijing 1954 / 3-degree Gauss-Kruger CM 84E",code:"EPSG:2425"},{description:"Beijing 1954 / 3-degree Gauss-Kruger CM 87E",code:"EPSG:2426"},{description:"Beijing 1954 / 3-degree Gauss-Kruger CM 90E",code:"EPSG:2427"},{description:"Beijing 1954 / 3-degree Gauss-Kruger CM 93E",code:"EPSG:2428"},{description:"Beijing 1954 / 3-degree Gauss-Kruger CM 96E",code:"EPSG:2429"},{description:"Beijing 1954 / 3-degree Gauss-Kruger CM 99E",code:"EPSG:2430"},{description:"Beijing 1954 / 3-degree Gauss-Kruger CM 102E",code:"EPSG:2431"},{description:"Beijing 1954 / 3-degree Gauss-Kruger CM 105E",code:"EPSG:2432"},{description:"Beijing 1954 / 3-degree Gauss-Kruger CM 108E",code:"EPSG:2433"},{description:"Beijing 1954 / 3-degree Gauss-Kruger CM 111E",code:"EPSG:2434"},{description:"Beijing 1954 / 3-degree Gauss-Kruger CM 114E",code:"EPSG:2435"},{description:"Beijing 1954 / 3-degree Gauss-Kruger CM 117E",code:"EPSG:2436"},{description:"Beijing 1954 / 3-degree Gauss-Kruger CM 120E",code:"EPSG:2437"},{description:"Beijing 1954 / 3-degree Gauss-Kruger CM 123E",code:"EPSG:2438"},{description:"Beijing 1954 / 3-degree Gauss-Kruger CM 126E",code:"EPSG:2439"},{description:"Beijing 1954 / 3-degree Gauss-Kruger CM 129E",code:"EPSG:2440"},{description:"Beijing 1954 / 3-degree Gauss-Kruger CM 132E",code:"EPSG:2441"},{description:"Beijing 1954 / 3-degree Gauss-Kruger CM 135E",code:"EPSG:2442"},{description:"JGD2000 / Japan Plane Rectangular CS I",code:"EPSG:2443"},{description:"JGD2000 / Japan Plane Rectangular CS II",code:"EPSG:2444"},{description:"JGD2000 / Japan Plane Rectangular CS III",code:"EPSG:2445"},{description:"JGD2000 / Japan Plane Rectangular CS IV",code:"EPSG:2446"},{description:"JGD2000 / Japan Plane Rectangular CS V",code:"EPSG:2447"},{description:"JGD2000 / Japan Plane Rectangular CS VI",code:"EPSG:2448"},{description:"JGD2000 / Japan Plane Rectangular CS VII",code:"EPSG:2449"},{description:"JGD2000 / Japan Plane Rectangular CS VIII",code:"EPSG:2450"},{description:"JGD2000 / Japan Plane Rectangular CS IX",code:"EPSG:2451"},{description:"JGD2000 / Japan Plane Rectangular CS X",code:"EPSG:2452"},{description:"JGD2000 / Japan Plane Rectangular CS XI",code:"EPSG:2453"},{description:"JGD2000 / Japan Plane Rectangular CS XII",code:"EPSG:2454"},{description:"JGD2000 / Japan Plane Rectangular CS XIII",code:"EPSG:2455"},{description:"JGD2000 / Japan Plane Rectangular CS XIV",code:"EPSG:2456"},{description:"JGD2000 / Japan Plane Rectangular CS XV",code:"EPSG:2457"},{description:"JGD2000 / Japan Plane Rectangular CS XVI",code:"EPSG:2458"},{description:"JGD2000 / Japan Plane Rectangular CS XVII",code:"EPSG:2459"},{description:"JGD2000 / Japan Plane Rectangular CS XVIII",code:"EPSG:2460"},{description:"JGD2000 / Japan Plane Rectangular CS XIX",code:"EPSG:2461"},{description:"Albanian 1987 / Gauss-Kruger zone 4",code:"EPSG:2462"},{description:"Pulkovo 1995 / Gauss-Kruger CM 21E",code:"EPSG:2463"},{description:"Pulkovo 1995 / Gauss-Kruger CM 27E",code:"EPSG:2464"},{description:"Pulkovo 1995 / Gauss-Kruger CM 33E",code:"EPSG:2465"},{description:"Pulkovo 1995 / Gauss-Kruger CM 39E",code:"EPSG:2466"},{description:"Pulkovo 1995 / Gauss-Kruger CM 45E",code:"EPSG:2467"},{description:"Pulkovo 1995 / Gauss-Kruger CM 51E",code:"EPSG:2468"},{description:"Pulkovo 1995 / Gauss-Kruger CM 57E",code:"EPSG:2469"},{description:"Pulkovo 1995 / Gauss-Kruger CM 63E",code:"EPSG:2470"},{description:"Pulkovo 1995 / Gauss-Kruger CM 69E",code:"EPSG:2471"},{description:"Pulkovo 1995 / Gauss-Kruger CM 75E",code:"EPSG:2472"},{description:"Pulkovo 1995 / Gauss-Kruger CM 81E",code:"EPSG:2473"},{description:"Pulkovo 1995 / Gauss-Kruger CM 87E",code:"EPSG:2474"},{description:"Pulkovo 1995 / Gauss-Kruger CM 93E",code:"EPSG:2475"},{description:"Pulkovo 1995 / Gauss-Kruger CM 99E",code:"EPSG:2476"},{description:"Pulkovo 1995 / Gauss-Kruger CM 105E",code:"EPSG:2477"},{description:"Pulkovo 1995 / Gauss-Kruger CM 111E",code:"EPSG:2478"},{description:"Pulkovo 1995 / Gauss-Kruger CM 117E",code:"EPSG:2479"},{description:"Pulkovo 1995 / Gauss-Kruger CM 123E",code:"EPSG:2480"},{description:"Pulkovo 1995 / Gauss-Kruger CM 129E",code:"EPSG:2481"},{description:"Pulkovo 1995 / Gauss-Kruger CM 135E",code:"EPSG:2482"},{description:"Pulkovo 1995 / Gauss-Kruger CM 141E",code:"EPSG:2483"},{description:"Pulkovo 1995 / Gauss-Kruger CM 147E",code:"EPSG:2484"},{description:"Pulkovo 1995 / Gauss-Kruger CM 153E",code:"EPSG:2485"},{description:"Pulkovo 1995 / Gauss-Kruger CM 159E",code:"EPSG:2486"},{description:"Pulkovo 1995 / Gauss-Kruger CM 165E",code:"EPSG:2487"},{description:"Pulkovo 1995 / Gauss-Kruger CM 171E",code:"EPSG:2488"},{description:"Pulkovo 1995 / Gauss-Kruger CM 177E",code:"EPSG:2489"},{description:"Pulkovo 1995 / Gauss-Kruger CM 177W",code:"EPSG:2490"},{description:"Pulkovo 1995 / Gauss-Kruger CM 171W",code:"EPSG:2491"},{description:"Pulkovo 1942 / Gauss-Kruger CM 9E",code:"EPSG:2492"},{description:"Pulkovo 1942 / Gauss-Kruger CM 15E",code:"EPSG:2493"},{description:"Pulkovo 1942 / Gauss-Kruger CM 21E",code:"EPSG:2494"},{description:"Pulkovo 1942 / Gauss-Kruger CM 27E",code:"EPSG:2495"},{description:"Pulkovo 1942 / Gauss-Kruger CM 33E",code:"EPSG:2496"},{description:"Pulkovo 1942 / Gauss-Kruger CM 39E",code:"EPSG:2497"},{description:"Pulkovo 1942 / Gauss-Kruger CM 45E",code:"EPSG:2498"},{description:"Pulkovo 1942 / Gauss-Kruger CM 51E",code:"EPSG:2499"},{description:"Pulkovo 1942 / Gauss-Kruger CM 57E",code:"EPSG:2500"},{description:"Pulkovo 1942 / Gauss-Kruger CM 63E",code:"EPSG:2501"},{description:"Pulkovo 1942 / Gauss-Kruger CM 69E",code:"EPSG:2502"},{description:"Pulkovo 1942 / Gauss-Kruger CM 75E",code:"EPSG:2503"},{description:"Pulkovo 1942 / Gauss-Kruger CM 81E",code:"EPSG:2504"},{description:"Pulkovo 1942 / Gauss-Kruger CM 87E",code:"EPSG:2505"},{description:"Pulkovo 1942 / Gauss-Kruger CM 93E",code:"EPSG:2506"},{description:"Pulkovo 1942 / Gauss-Kruger CM 99E",code:"EPSG:2507"},{description:"Pulkovo 1942 / Gauss-Kruger CM 105E",code:"EPSG:2508"},{description:"Pulkovo 1942 / Gauss-Kruger CM 111E",code:"EPSG:2509"},{description:"Pulkovo 1942 / Gauss-Kruger CM 117E",code:"EPSG:2510"},{description:"Pulkovo 1942 / Gauss-Kruger CM 123E",code:"EPSG:2511"},{description:"Pulkovo 1942 / Gauss-Kruger CM 129E",code:"EPSG:2512"},{description:"Pulkovo 1942 / Gauss-Kruger CM 135E",code:"EPSG:2513"},{description:"Pulkovo 1942 / Gauss-Kruger CM 141E",code:"EPSG:2514"},{description:"Pulkovo 1942 / Gauss-Kruger CM 147E",code:"EPSG:2515"},{description:"Pulkovo 1942 / Gauss-Kruger CM 153E",code:"EPSG:2516"},{description:"Pulkovo 1942 / Gauss-Kruger CM 159E",code:"EPSG:2517"},{description:"Pulkovo 1942 / Gauss-Kruger CM 165E",code:"EPSG:2518"},{description:"Pulkovo 1942 / Gauss-Kruger CM 171E",code:"EPSG:2519"},{description:"Pulkovo 1942 / Gauss-Kruger CM 177E",code:"EPSG:2520"},{description:"Pulkovo 1942 / Gauss-Kruger CM 177W",code:"EPSG:2521"},{description:"Pulkovo 1942 / Gauss-Kruger CM 171W",code:"EPSG:2522"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger zone 7",code:"EPSG:2523"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger zone 8",code:"EPSG:2524"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger zone 9",code:"EPSG:2525"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger zone 10",code:"EPSG:2526"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger zone 11",code:"EPSG:2527"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger zone 12",code:"EPSG:2528"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger zone 13",code:"EPSG:2529"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger zone 14",code:"EPSG:2530"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger zone 15",code:"EPSG:2531"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger zone 16",code:"EPSG:2532"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger zone 17",code:"EPSG:2533"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger zone 18",code:"EPSG:2534"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger zone 19",code:"EPSG:2535"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger zone 20",code:"EPSG:2536"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger zone 21",code:"EPSG:2537"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger zone 22",code:"EPSG:2538"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger zone 23",code:"EPSG:2539"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger zone 24",code:"EPSG:2540"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger zone 25",code:"EPSG:2541"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger zone 26",code:"EPSG:2542"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger zone 27",code:"EPSG:2543"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger zone 28",code:"EPSG:2544"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger zone 29",code:"EPSG:2545"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger zone 30",code:"EPSG:2546"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger zone 31",code:"EPSG:2547"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger zone 32",code:"EPSG:2548"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger zone 33",code:"EPSG:2549"},{description:"Samboja / UTM zone 50S",code:"EPSG:2550"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger zone 34",code:"EPSG:2551"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger zone 35",code:"EPSG:2552"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger zone 36",code:"EPSG:2553"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger zone 37",code:"EPSG:2554"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger zone 38",code:"EPSG:2555"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger zone 39",code:"EPSG:2556"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger zone 40",code:"EPSG:2557"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger zone 41",code:"EPSG:2558"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger zone 42",code:"EPSG:2559"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger zone 43",code:"EPSG:2560"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger zone 44",code:"EPSG:2561"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger zone 45",code:"EPSG:2562"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger zone 46",code:"EPSG:2563"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger zone 47",code:"EPSG:2564"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger zone 48",code:"EPSG:2565"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger zone 49",code:"EPSG:2566"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger zone 50",code:"EPSG:2567"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger zone 51",code:"EPSG:2568"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger zone 52",code:"EPSG:2569"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger zone 53",code:"EPSG:2570"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger zone 54",code:"EPSG:2571"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger zone 55",code:"EPSG:2572"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger zone 56",code:"EPSG:2573"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger zone 57",code:"EPSG:2574"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger zone 58",code:"EPSG:2575"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger zone 59",code:"EPSG:2576"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger zone 60",code:"EPSG:2577"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger zone 61",code:"EPSG:2578"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger zone 62",code:"EPSG:2579"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger zone 63",code:"EPSG:2580"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger zone 64",code:"EPSG:2581"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger CM 21E",code:"EPSG:2582"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger CM 24E",code:"EPSG:2583"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger CM 27E",code:"EPSG:2584"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger CM 30E",code:"EPSG:2585"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger CM 33E",code:"EPSG:2586"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger CM 36E",code:"EPSG:2587"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger CM 39E",code:"EPSG:2588"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger CM 42E",code:"EPSG:2589"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger CM 45E",code:"EPSG:2590"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger CM 48E",code:"EPSG:2591"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger CM 51E",code:"EPSG:2592"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger CM 54E",code:"EPSG:2593"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger CM 57E",code:"EPSG:2594"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger CM 60E",code:"EPSG:2595"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger CM 63E",code:"EPSG:2596"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger CM 66E",code:"EPSG:2597"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger CM 69E",code:"EPSG:2598"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger CM 72E",code:"EPSG:2599"},{description:"Lietuvos Koordinoei Sistema 1994",code:"EPSG:2600"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger CM 75E",code:"EPSG:2601"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger CM 78E",code:"EPSG:2602"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger CM 81E",code:"EPSG:2603"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger CM 84E",code:"EPSG:2604"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger CM 87E",code:"EPSG:2605"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger CM 90E",code:"EPSG:2606"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger CM 93E",code:"EPSG:2607"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger CM 96E",code:"EPSG:2608"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger CM 99E",code:"EPSG:2609"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger CM 102E",code:"EPSG:2610"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger CM 105E",code:"EPSG:2611"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger CM 108E",code:"EPSG:2612"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger CM 111E",code:"EPSG:2613"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger CM 114E",code:"EPSG:2614"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger CM 117E",code:"EPSG:2615"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger CM 120E",code:"EPSG:2616"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger CM 123E",code:"EPSG:2617"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger CM 126E",code:"EPSG:2618"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger CM 129E",code:"EPSG:2619"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger CM 132E",code:"EPSG:2620"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger CM 135E",code:"EPSG:2621"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger CM 138E",code:"EPSG:2622"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger CM 141E",code:"EPSG:2623"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger CM 144E",code:"EPSG:2624"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger CM 147E",code:"EPSG:2625"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger CM 150E",code:"EPSG:2626"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger CM 153E",code:"EPSG:2627"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger CM 156E",code:"EPSG:2628"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger CM 159E",code:"EPSG:2629"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger CM 162E",code:"EPSG:2630"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger CM 165E",code:"EPSG:2631"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger CM 168E",code:"EPSG:2632"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger CM 171E",code:"EPSG:2633"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger CM 174E",code:"EPSG:2634"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger CM 177E",code:"EPSG:2635"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger CM 180E",code:"EPSG:2636"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger CM 177W",code:"EPSG:2637"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger CM 174W",code:"EPSG:2638"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger CM 171W",code:"EPSG:2639"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger CM 168W",code:"EPSG:2640"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger zone 7",code:"EPSG:2641"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger zone 8",code:"EPSG:2642"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger zone 9",code:"EPSG:2643"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger zone 10",code:"EPSG:2644"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger zone 11",code:"EPSG:2645"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger zone 12",code:"EPSG:2646"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger zone 13",code:"EPSG:2647"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger zone 14",code:"EPSG:2648"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger zone 15",code:"EPSG:2649"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger zone 16",code:"EPSG:2650"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger zone 17",code:"EPSG:2651"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger zone 18",code:"EPSG:2652"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger zone 19",code:"EPSG:2653"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger zone 20",code:"EPSG:2654"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger zone 21",code:"EPSG:2655"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger zone 22",code:"EPSG:2656"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger zone 23",code:"EPSG:2657"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger zone 24",code:"EPSG:2658"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger zone 25",code:"EPSG:2659"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger zone 26",code:"EPSG:2660"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger zone 27",code:"EPSG:2661"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger zone 28",code:"EPSG:2662"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger zone 29",code:"EPSG:2663"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger zone 30",code:"EPSG:2664"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger zone 31",code:"EPSG:2665"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger zone 32",code:"EPSG:2666"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger zone 33",code:"EPSG:2667"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger zone 34",code:"EPSG:2668"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger zone 35",code:"EPSG:2669"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger zone 36",code:"EPSG:2670"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger zone 37",code:"EPSG:2671"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger zone 38",code:"EPSG:2672"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger zone 39",code:"EPSG:2673"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger zone 40",code:"EPSG:2674"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger zone 41",code:"EPSG:2675"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger zone 42",code:"EPSG:2676"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger zone 43",code:"EPSG:2677"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger zone 44",code:"EPSG:2678"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger zone 45",code:"EPSG:2679"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger zone 46",code:"EPSG:2680"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger zone 47",code:"EPSG:2681"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger zone 48",code:"EPSG:2682"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger zone 49",code:"EPSG:2683"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger zone 50",code:"EPSG:2684"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger zone 51",code:"EPSG:2685"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger zone 52",code:"EPSG:2686"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger zone 53",code:"EPSG:2687"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger zone 54",code:"EPSG:2688"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger zone 55",code:"EPSG:2689"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger zone 56",code:"EPSG:2690"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger zone 57",code:"EPSG:2691"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger zone 58",code:"EPSG:2692"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger zone 59",code:"EPSG:2693"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger zone 60",code:"EPSG:2694"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger zone 61",code:"EPSG:2695"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger zone 62",code:"EPSG:2696"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger zone 63",code:"EPSG:2697"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger zone 64",code:"EPSG:2698"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger CM 21E",code:"EPSG:2699"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger CM 24E",code:"EPSG:2700"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger CM 27E",code:"EPSG:2701"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger CM 30E",code:"EPSG:2702"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger CM 33E",code:"EPSG:2703"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger CM 36E",code:"EPSG:2704"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger CM 39E",code:"EPSG:2705"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger CM 42E",code:"EPSG:2706"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger CM 45E",code:"EPSG:2707"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger CM 48E",code:"EPSG:2708"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger CM 51E",code:"EPSG:2709"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger CM 54E",code:"EPSG:2710"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger CM 57E",code:"EPSG:2711"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger CM 60E",code:"EPSG:2712"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger CM 63E",code:"EPSG:2713"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger CM 66E",code:"EPSG:2714"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger CM 69E",code:"EPSG:2715"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger CM 72E",code:"EPSG:2716"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger CM 75E",code:"EPSG:2717"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger CM 78E",code:"EPSG:2718"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger CM 81E",code:"EPSG:2719"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger CM 84E",code:"EPSG:2720"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger CM 87E",code:"EPSG:2721"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger CM 90E",code:"EPSG:2722"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger CM 93E",code:"EPSG:2723"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger CM 96E",code:"EPSG:2724"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger CM 99E",code:"EPSG:2725"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger CM 102E",code:"EPSG:2726"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger CM 105E",code:"EPSG:2727"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger CM 108E",code:"EPSG:2728"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger CM 111E",code:"EPSG:2729"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger CM 114E",code:"EPSG:2730"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger CM 117E",code:"EPSG:2731"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger CM 120E",code:"EPSG:2732"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger CM 123E",code:"EPSG:2733"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger CM 126E",code:"EPSG:2734"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger CM 129E",code:"EPSG:2735"},{description:"Tete / UTM zone 36S",code:"EPSG:2736"},{description:"Tete / UTM zone 37S",code:"EPSG:2737"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger CM 132E",code:"EPSG:2738"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger CM 135E",code:"EPSG:2739"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger CM 138E",code:"EPSG:2740"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger CM 141E",code:"EPSG:2741"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger CM 144E",code:"EPSG:2742"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger CM 147E",code:"EPSG:2743"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger CM 150E",code:"EPSG:2744"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger CM 153E",code:"EPSG:2745"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger CM 156E",code:"EPSG:2746"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger CM 159E",code:"EPSG:2747"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger CM 162E",code:"EPSG:2748"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger CM 165E",code:"EPSG:2749"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger CM 168E",code:"EPSG:2750"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger CM 171E",code:"EPSG:2751"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger CM 174E",code:"EPSG:2752"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger CM 177E",code:"EPSG:2753"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger CM 180E",code:"EPSG:2754"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger CM 177W",code:"EPSG:2755"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger CM 174W",code:"EPSG:2756"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger CM 171W",code:"EPSG:2757"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger CM 168W",code:"EPSG:2758"},{description:"NAD83(HARN) / Alabama East",code:"EPSG:2759"},{description:"NAD83(HARN) / Alabama West",code:"EPSG:2760"},{description:"NAD83(HARN) / Arizona East",code:"EPSG:2761"},{description:"NAD83(HARN) / Arizona Central",code:"EPSG:2762"},{description:"NAD83(HARN) / Arizona West",code:"EPSG:2763"},{description:"NAD83(HARN) / Arkansas North",code:"EPSG:2764"},{description:"NAD83(HARN) / Arkansas South",code:"EPSG:2765"},{description:"NAD83(HARN) / California zone 1",code:"EPSG:2766"},{description:"NAD83(HARN) / California zone 2",code:"EPSG:2767"},{description:"NAD83(HARN) / California zone 3",code:"EPSG:2768"},{description:"NAD83(HARN) / California zone 4",code:"EPSG:2769"},{description:"NAD83(HARN) / California zone 5",code:"EPSG:2770"},{description:"NAD83(HARN) / California zone 6",code:"EPSG:2771"},{description:"NAD83(HARN) / Colorado North",code:"EPSG:2772"},{description:"NAD83(HARN) / Colorado Central",code:"EPSG:2773"},{description:"NAD83(HARN) / Colorado South",code:"EPSG:2774"},{description:"NAD83(HARN) / Connecticut",code:"EPSG:2775"},{description:"NAD83(HARN) / Delaware",code:"EPSG:2776"},{description:"NAD83(HARN) / Florida East",code:"EPSG:2777"},{description:"NAD83(HARN) / Florida West",code:"EPSG:2778"},{description:"NAD83(HARN) / Florida North",code:"EPSG:2779"},{description:"NAD83(HARN) / Georgia East",code:"EPSG:2780"},{description:"NAD83(HARN) / Georgia West",code:"EPSG:2781"},{description:"NAD83(HARN) / Hawaii zone 1",code:"EPSG:2782"},{description:"NAD83(HARN) / Hawaii zone 2",code:"EPSG:2783"},{description:"NAD83(HARN) / Hawaii zone 3",code:"EPSG:2784"},{description:"NAD83(HARN) / Hawaii zone 4",code:"EPSG:2785"},{description:"NAD83(HARN) / Hawaii zone 5",code:"EPSG:2786"},{description:"NAD83(HARN) / Idaho East",code:"EPSG:2787"},{description:"NAD83(HARN) / Idaho Central",code:"EPSG:2788"},{description:"NAD83(HARN) / Idaho West",code:"EPSG:2789"},{description:"NAD83(HARN) / Illinois East",code:"EPSG:2790"},{description:"NAD83(HARN) / Illinois West",code:"EPSG:2791"},{description:"NAD83(HARN) / Indiana East",code:"EPSG:2792"},{description:"NAD83(HARN) / Indiana West",code:"EPSG:2793"},{description:"NAD83(HARN) / Iowa North",code:"EPSG:2794"},{description:"NAD83(HARN) / Iowa South",code:"EPSG:2795"},{description:"NAD83(HARN) / Kansas North",code:"EPSG:2796"},{description:"NAD83(HARN) / Kansas South",code:"EPSG:2797"},{description:"NAD83(HARN) / Kentucky North",code:"EPSG:2798"},{description:"NAD83(HARN) / Kentucky South",code:"EPSG:2799"},{description:"NAD83(HARN) / Louisiana North",code:"EPSG:2800"},{description:"NAD83(HARN) / Louisiana South",code:"EPSG:2801"},{description:"NAD83(HARN) / Maine East",code:"EPSG:2802"},{description:"NAD83(HARN) / Maine West",code:"EPSG:2803"},{description:"NAD83(HARN) / Maryland",code:"EPSG:2804"},{description:"NAD83(HARN) / Massachusetts Mainland",code:"EPSG:2805"},{description:"NAD83(HARN) / Massachusetts Island",code:"EPSG:2806"},{description:"NAD83(HARN) / Michigan North",code:"EPSG:2807"},{description:"NAD83(HARN) / Michigan Central",code:"EPSG:2808"},{description:"NAD83(HARN) / Michigan South",code:"EPSG:2809"},{description:"NAD83(HARN) / Minnesota North",code:"EPSG:2810"},{description:"NAD83(HARN) / Minnesota Central",code:"EPSG:2811"},{description:"NAD83(HARN) / Minnesota South",code:"EPSG:2812"},{description:"NAD83(HARN) / Mississippi East",code:"EPSG:2813"},{description:"NAD83(HARN) / Mississippi West",code:"EPSG:2814"},{description:"NAD83(HARN) / Missouri East",code:"EPSG:2815"},{description:"NAD83(HARN) / Missouri Central",code:"EPSG:2816"},{description:"NAD83(HARN) / Missouri West",code:"EPSG:2817"},{description:"NAD83(HARN) / Montana",code:"EPSG:2818"},{description:"NAD83(HARN) / Nebraska",code:"EPSG:2819"},{description:"NAD83(HARN) / Nevada East",code:"EPSG:2820"},{description:"NAD83(HARN) / Nevada Central",code:"EPSG:2821"},{description:"NAD83(HARN) / Nevada West",code:"EPSG:2822"},{description:"NAD83(HARN) / New Hampshire",code:"EPSG:2823"},{description:"NAD83(HARN) / New Jersey",code:"EPSG:2824"},{description:"NAD83(HARN) / New Mexico East",code:"EPSG:2825"},{description:"NAD83(HARN) / New Mexico Central",code:"EPSG:2826"},{description:"NAD83(HARN) / New Mexico West",code:"EPSG:2827"},{description:"NAD83(HARN) / New York East",code:"EPSG:2828"},{description:"NAD83(HARN) / New York Central",code:"EPSG:2829"},{description:"NAD83(HARN) / New York West",code:"EPSG:2830"},{description:"NAD83(HARN) / New York Long Island",code:"EPSG:2831"},{description:"NAD83(HARN) / North Dakota North",code:"EPSG:2832"},{description:"NAD83(HARN) / North Dakota South",code:"EPSG:2833"},{description:"NAD83(HARN) / Ohio North",code:"EPSG:2834"},{description:"NAD83(HARN) / Ohio South",code:"EPSG:2835"},{description:"NAD83(HARN) / Oklahoma North",code:"EPSG:2836"},{description:"NAD83(HARN) / Oklahoma South",code:"EPSG:2837"},{description:"NAD83(HARN) / Oregon North",code:"EPSG:2838"},{description:"NAD83(HARN) / Oregon South",code:"EPSG:2839"},{description:"NAD83(HARN) / Rhode Island",code:"EPSG:2840"},{description:"NAD83(HARN) / South Dakota North",code:"EPSG:2841"},{description:"NAD83(HARN) / South Dakota South",code:"EPSG:2842"},{description:"NAD83(HARN) / Tennessee",code:"EPSG:2843"},{description:"NAD83(HARN) / Texas North",code:"EPSG:2844"},{description:"NAD83(HARN) / Texas North Central",code:"EPSG:2845"},{description:"NAD83(HARN) / Texas Central",code:"EPSG:2846"},{description:"NAD83(HARN) / Texas South Central",code:"EPSG:2847"},{description:"NAD83(HARN) / Texas South",code:"EPSG:2848"},{description:"NAD83(HARN) / Utah North",code:"EPSG:2849"},{description:"NAD83(HARN) / Utah Central",code:"EPSG:2850"},{description:"NAD83(HARN) / Utah South",code:"EPSG:2851"},{description:"NAD83(HARN) / Vermont",code:"EPSG:2852"},{description:"NAD83(HARN) / Virginia North",code:"EPSG:2853"},{description:"NAD83(HARN) / Virginia South",code:"EPSG:2854"},{description:"NAD83(HARN) / Washington North",code:"EPSG:2855"},{description:"NAD83(HARN) / Washington South",code:"EPSG:2856"},{description:"NAD83(HARN) / West Virginia North",code:"EPSG:2857"},{description:"NAD83(HARN) / West Virginia South",code:"EPSG:2858"},{description:"NAD83(HARN) / Wisconsin North",code:"EPSG:2859"},{description:"NAD83(HARN) / Wisconsin Central",code:"EPSG:2860"},{description:"NAD83(HARN) / Wisconsin South",code:"EPSG:2861"},{description:"NAD83(HARN) / Wyoming East",code:"EPSG:2862"},{description:"NAD83(HARN) / Wyoming East Central",code:"EPSG:2863"},{description:"NAD83(HARN) / Wyoming West Central",code:"EPSG:2864"},{description:"NAD83(HARN) / Wyoming West",code:"EPSG:2865"},{description:"NAD83(HARN) / Puerto Rico and Virgin Is.",code:"EPSG:2866"},{description:"NAD83(HARN) / Arizona East (ft)",code:"EPSG:2867"},{description:"NAD83(HARN) / Arizona Central (ft)",code:"EPSG:2868"},{description:"NAD83(HARN) / Arizona West (ft)",code:"EPSG:2869"},{description:"NAD83(HARN) / California zone 1 (ftUS)",code:"EPSG:2870"},{description:"NAD83(HARN) / California zone 2 (ftUS)",code:"EPSG:2871"},{description:"NAD83(HARN) / California zone 3 (ftUS)",code:"EPSG:2872"},{description:"NAD83(HARN) / California zone 4 (ftUS)",code:"EPSG:2873"},{description:"NAD83(HARN) / California zone 5 (ftUS)",code:"EPSG:2874"},{description:"NAD83(HARN) / California zone 6 (ftUS)",code:"EPSG:2875"},{description:"NAD83(HARN) / Colorado North (ftUS)",code:"EPSG:2876"},{description:"NAD83(HARN) / Colorado Central (ftUS)",code:"EPSG:2877"},{description:"NAD83(HARN) / Colorado South (ftUS)",code:"EPSG:2878"},{description:"NAD83(HARN) / Connecticut (ftUS)",code:"EPSG:2879"},{description:"NAD83(HARN) / Delaware (ftUS)",code:"EPSG:2880"},{description:"NAD83(HARN) / Florida East (ftUS)",code:"EPSG:2881"},{description:"NAD83(HARN) / Florida West (ftUS)",code:"EPSG:2882"},{description:"NAD83(HARN) / Florida North (ftUS)",code:"EPSG:2883"},{description:"NAD83(HARN) / Georgia East (ftUS)",code:"EPSG:2884"},{description:"NAD83(HARN) / Georgia West (ftUS)",code:"EPSG:2885"},{description:"NAD83(HARN) / Idaho East (ftUS)",code:"EPSG:2886"},{description:"NAD83(HARN) / Idaho Central (ftUS)",code:"EPSG:2887"},{description:"NAD83(HARN) / Idaho West (ftUS)",code:"EPSG:2888"},{description:"NAD83(HARN) / Indiana East (ftUS)",code:"EPSG:2889"},{description:"NAD83(HARN) / Indiana West (ftUS)",code:"EPSG:2890"},{description:"NAD83(HARN) / Kentucky North (ftUS)",code:"EPSG:2891"},{description:"NAD83(HARN) / Kentucky South (ftUS)",code:"EPSG:2892"},{description:"NAD83(HARN) / Maryland (ftUS)",code:"EPSG:2893"},{description:"NAD83(HARN) / Massachusetts Mainland (ftUS)",code:"EPSG:2894"},{description:"NAD83(HARN) / Massachusetts Island (ftUS)",code:"EPSG:2895"},{description:"NAD83(HARN) / Michigan North (ft)",code:"EPSG:2896"},{description:"NAD83(HARN) / Michigan Central (ft)",code:"EPSG:2897"},{description:"NAD83(HARN) / Michigan South (ft)",code:"EPSG:2898"},{description:"NAD83(HARN) / Mississippi East (ftUS)",code:"EPSG:2899"},{description:"NAD83(HARN) / Mississippi West (ftUS)",code:"EPSG:2900"},{description:"NAD83(HARN) / Montana (ft)",code:"EPSG:2901"},{description:"NAD83(HARN) / New Mexico East (ftUS)",code:"EPSG:2902"},{description:"NAD83(HARN) / New Mexico Central (ftUS)",code:"EPSG:2903"},{description:"NAD83(HARN) / New Mexico West (ftUS)",code:"EPSG:2904"},{description:"NAD83(HARN) / New York East (ftUS)",code:"EPSG:2905"},{description:"NAD83(HARN) / New York Central (ftUS)",code:"EPSG:2906"},{description:"NAD83(HARN) / New York West (ftUS)",code:"EPSG:2907"},{description:"NAD83(HARN) / New York Long Island (ftUS)",code:"EPSG:2908"},{description:"NAD83(HARN) / North Dakota North (ft)",code:"EPSG:2909"},{description:"NAD83(HARN) / North Dakota South (ft)",code:"EPSG:2910"},{description:"NAD83(HARN) / Oklahoma North (ftUS)",code:"EPSG:2911"},{description:"NAD83(HARN) / Oklahoma South (ftUS)",code:"EPSG:2912"},{description:"NAD83(HARN) / Oregon North (ft)",code:"EPSG:2913"},{description:"NAD83(HARN) / Oregon South (ft)",code:"EPSG:2914"},{description:"NAD83(HARN) / Tennessee (ftUS)",code:"EPSG:2915"},{description:"NAD83(HARN) / Texas North (ftUS)",code:"EPSG:2916"},{description:"NAD83(HARN) / Texas North Central (ftUS)",code:"EPSG:2917"},{description:"NAD83(HARN) / Texas Central (ftUS)",code:"EPSG:2918"},{description:"NAD83(HARN) / Texas South Central (ftUS)",code:"EPSG:2919"},{description:"NAD83(HARN) / Texas South (ftUS)",code:"EPSG:2920"},{description:"NAD83(HARN) / Utah North (ft)",code:"EPSG:2921"},{description:"NAD83(HARN) / Utah Central (ft)",code:"EPSG:2922"},{description:"NAD83(HARN) / Utah South (ft)",code:"EPSG:2923"},{description:"NAD83(HARN) / Virginia North (ftUS)",code:"EPSG:2924"},{description:"NAD83(HARN) / Virginia South (ftUS)",code:"EPSG:2925"},{description:"NAD83(HARN) / Washington North (ftUS)",code:"EPSG:2926"},{description:"NAD83(HARN) / Washington South (ftUS)",code:"EPSG:2927"},{description:"NAD83(HARN) / Wisconsin North (ftUS)",code:"EPSG:2928"},{description:"NAD83(HARN) / Wisconsin Central (ftUS)",code:"EPSG:2929"},{description:"NAD83(HARN) / Wisconsin South (ftUS)",code:"EPSG:2930"},{description:"Beduaram / TM 13 NE",code:"EPSG:2931"},{description:"QND95 / Qatar National Grid",code:"EPSG:2932"},{description:"Segara / UTM zone 50S",code:"EPSG:2933"},{description:"Segara (Jakarta) / NEIEZ",code:"EPSG:2934"},{description:"Pulkovo 1942 / CS63 zone A1",code:"EPSG:2935"},{description:"Pulkovo 1942 / CS63 zone A2",code:"EPSG:2936"},{description:"Pulkovo 1942 / CS63 zone A3",code:"EPSG:2937"},{description:"Pulkovo 1942 / CS63 zone A4",code:"EPSG:2938"},{description:"Pulkovo 1942 / CS63 zone K2",code:"EPSG:2939"},{description:"Pulkovo 1942 / CS63 zone K3",code:"EPSG:2940"},{description:"Pulkovo 1942 / CS63 zone K4",code:"EPSG:2941"},{description:"Porto Santo / UTM zone 28N",code:"EPSG:2942"},{description:"Selvagem Grande / UTM zone 28N",code:"EPSG:2943"},{description:"NAD83(CSRS) / SCoPQ zone 2",code:"EPSG:2944"},{description:"NAD83(CSRS) / MTM zone 3",code:"EPSG:2945"},{description:"NAD83(CSRS) / MTM zone 4",code:"EPSG:2946"},{description:"NAD83(CSRS) / MTM zone 5",code:"EPSG:2947"},{description:"NAD83(CSRS) / MTM zone 6",code:"EPSG:2948"},{description:"NAD83(CSRS) / MTM zone 7",code:"EPSG:2949"},{description:"NAD83(CSRS) / MTM zone 8",code:"EPSG:2950"},{description:"NAD83(CSRS) / MTM zone 9",code:"EPSG:2951"},{description:"NAD83(CSRS) / MTM zone 10",code:"EPSG:2952"},{description:"NAD83(CSRS) / New Brunswick Stereographic",code:"EPSG:2953"},{description:"NAD83(CSRS) / Prince Edward Isl. Stereographic (NAD83)",code:"EPSG:2954"},{description:"NAD83(CSRS) / UTM zone 11N",code:"EPSG:2955"},{description:"NAD83(CSRS) / UTM zone 12N",code:"EPSG:2956"},{description:"NAD83(CSRS) / UTM zone 13N",code:"EPSG:2957"},{description:"NAD83(CSRS) / UTM zone 17N",code:"EPSG:2958"},{description:"NAD83(CSRS) / UTM zone 18N",code:"EPSG:2959"},{description:"NAD83(CSRS) / UTM zone 19N",code:"EPSG:2960"},{description:"NAD83(CSRS) / UTM zone 20N",code:"EPSG:2961"},{description:"NAD83(CSRS) / UTM zone 21N",code:"EPSG:2962"},{description:"Lisbon 1890 (Lisbon) / Portugal Bonne",code:"EPSG:2963"},{description:"NAD27 / Alaska Albers",code:"EPSG:2964"},{description:"NAD83 / Indiana East (ftUS)",code:"EPSG:2965"},{description:"NAD83 / Indiana West (ftUS)",code:"EPSG:2966"},{description:"NAD83(HARN) / Indiana East (ftUS)",code:"EPSG:2967"},{description:"NAD83(HARN) / Indiana West (ftUS)",code:"EPSG:2968"},{description:"Fort Marigot / UTM zone 20N",code:"EPSG:2969"},{description:"Guadeloupe 1948 / UTM zone 20N",code:"EPSG:2970"},{description:"CSG67 / UTM zone 22N",code:"EPSG:2971"},{description:"RGFG95 / UTM zone 22N",code:"EPSG:2972"},{description:"Martinique 1938 / UTM zone 20N",code:"EPSG:2973"},{description:"RGR92 / UTM zone 40S",code:"EPSG:2975"},{description:"Tahiti 52 / UTM zone 6S",code:"EPSG:2976"},{description:"Tahaa 54 / UTM zone 5S",code:"EPSG:2977"},{description:"IGN72 Nuku Hiva / UTM zone 7S",code:"EPSG:2978"},{description:"K0 1949 / UTM zone 42S",code:"EPSG:2979"},{description:"Combani 1950 / UTM zone 38S",code:"EPSG:2980"},{description:"IGN56 Lifou / UTM zone 58S",code:"EPSG:2981"},{description:"IGN72 Grand Terre / UTM zone 58S",code:"EPSG:2982"},{description:"ST87 Ouvea / UTM zone 58S",code:"EPSG:2983"},{description:"RGNC 1991 / Lambert New Caledonia",code:"EPSG:2984"},{description:"Petrels 1972 / Terre Adelie Polar Stereographic",code:"EPSG:2985"},{description:"Perroud 1950 / Terre Adelie Polar Stereographic",code:"EPSG:2986"},{description:"Saint Pierre et Miquelon 1950 / UTM zone 21N",code:"EPSG:2987"},{description:"MOP78 / UTM zone 1S",code:"EPSG:2988"},{description:"RRAF 1991 / UTM zone 20N",code:"EPSG:2989"},{description:"Reunion 1947 / TM Reunion",code:"EPSG:2990"},{description:"NAD83 / Oregon Lambert",code:"EPSG:2991"},{description:"NAD83 / Oregon Lambert (ft)",code:"EPSG:2992"},{description:"NAD83(HARN) / Oregon Lambert",code:"EPSG:2993"},{description:"NAD83(HARN) / Oregon Lambert (ft)",code:"EPSG:2994"},{description:"IGN53 Mare / UTM zone 58S",code:"EPSG:2995"},{description:"ST84 Ile des Pins / UTM zone 58S",code:"EPSG:2996"},{description:"ST71 Belep / UTM zone 58S",code:"EPSG:2997"},{description:"NEA74 Noumea / UTM zone 58S",code:"EPSG:2998"},{description:"Grand Comoros / UTM zone 38S",code:"EPSG:2999"},{description:"Segara / NEIEZ",code:"EPSG:3000"},{description:"Batavia / NEIEZ",code:"EPSG:3001"},{description:"Makassar / NEIEZ",code:"EPSG:3002"},{description:"Monte Mario / Italy zone 1",code:"EPSG:3003"},{description:"Monte Mario / Italy zone 2",code:"EPSG:3004"},{description:"NAD83 / BC Albers",code:"EPSG:3005"},{description:"SWEREF99 TM",code:"EPSG:3006"},{description:"SWEREF99 12 00",code:"EPSG:3007"},{description:"SWEREF99 13 30",code:"EPSG:3008"},{description:"SWEREF99 15 00",code:"EPSG:3009"},{description:"SWEREF99 16 30",code:"EPSG:3010"},{description:"SWEREF99 18 00",code:"EPSG:3011"},{description:"SWEREF99 14 15",code:"EPSG:3012"},{description:"SWEREF99 15 45",code:"EPSG:3013"},{description:"SWEREF99 17 15",code:"EPSG:3014"},{description:"SWEREF99 18 45",code:"EPSG:3015"},{description:"SWEREF99 20 15",code:"EPSG:3016"},{description:"SWEREF99 21 45",code:"EPSG:3017"},{description:"SWEREF99 23 15",code:"EPSG:3018"},{description:"RT90 7.5 gon V",code:"EPSG:3019"},{description:"RT90 5 gon V",code:"EPSG:3020"},{description:"RT90 2.5 gon V",code:"EPSG:3021"},{description:"RT90 0 gon",code:"EPSG:3022"},{description:"RT90 2.5 gon O",code:"EPSG:3023"},{description:"RT90 5 gon O",code:"EPSG:3024"},{description:"RT38 7.5 gon V",code:"EPSG:3025"},{description:"RT38 5 gon V",code:"EPSG:3026"},{description:"RT38 2.5 gon V",code:"EPSG:3027"},{description:"RT38 0 gon",code:"EPSG:3028"},{description:"RT38 2.5 gon O",code:"EPSG:3029"},{description:"RT38 5 gon O",code:"EPSG:3030"},{description:"WGS 84 / Antarctic Polar Stereographic",code:"EPSG:3031"},{description:"WGS 84 / Australian Antarctic Polar Stereographic",code:"EPSG:3032"},{description:"WGS 84 / Australian Antarctic Lambert",code:"EPSG:3033"},{description:"ETRS89 / ETRS-LCC",code:"EPSG:3034"},{description:"ETRS89 / ETRS-LAEA",code:"EPSG:3035"},{description:"Moznet / UTM zone 36S",code:"EPSG:3036"},{description:"Moznet / UTM zone 37S",code:"EPSG:3037"},{description:"ETRS89 / ETRS-TM26",code:"EPSG:3038"},{description:"ETRS89 / ETRS-TM27",code:"EPSG:3039"},{description:"ETRS89 / ETRS-TM28",code:"EPSG:3040"},{description:"ETRS89 / ETRS-TM29",code:"EPSG:3041"},{description:"ETRS89 / ETRS-TM30",code:"EPSG:3042"},{description:"ETRS89 / ETRS-TM31",code:"EPSG:3043"},{description:"ETRS89 / ETRS-TM32",code:"EPSG:3044"},{description:"ETRS89 / ETRS-TM33",code:"EPSG:3045"},{description:"ETRS89 / ETRS-TM34",code:"EPSG:3046"},{description:"ETRS89 / ETRS-TM35",code:"EPSG:3047"},{description:"ETRS89 / ETRS-TM36",code:"EPSG:3048"},{description:"ETRS89 / ETRS-TM37",code:"EPSG:3049"},{description:"ETRS89 / ETRS-TM38",code:"EPSG:3050"},{description:"ETRS89 / ETRS-TM39",code:"EPSG:3051"},{description:"Reykjavik 1900 / Lambert 1900",code:"EPSG:3052"},{description:"Hjorsey 1955 / Lambert 1955",code:"EPSG:3053"},{description:"Hjorsey 1955 / UTM zone 26N",code:"EPSG:3054"},{description:"Hjorsey 1955 / UTM zone 27N",code:"EPSG:3055"},{description:"Hjorsey 1955 / UTM zone 28N",code:"EPSG:3056"},{description:"ISN93 / Lambert 1993",code:"EPSG:3057"},{description:"Helle 1954 / Jan Mayen Grid",code:"EPSG:3058"},{description:"LKS92 / Latvia TM",code:"EPSG:3059"},{description:"IGN72 Grande Terre / UTM zone 58S",code:"EPSG:3060"},{description:"Porto Santo 1995 / UTM zone 28N",code:"EPSG:3061"},{description:"Azores Oriental 1995 / UTM zone 26N",code:"EPSG:3062"},{description:"Azores Central 1995 / UTM zone 26N",code:"EPSG:3063"},{description:"IGM95 / UTM zone 32N",code:"EPSG:3064"},{description:"IGM95 / UTM zone 33N",code:"EPSG:3065"},{description:"ED50 / Jordan TM",code:"EPSG:3066"},{description:"ETRS89 / ETRS-TM35FIN",code:"EPSG:3067"},{description:"DHDN / Soldner Berlin",code:"EPSG:3068"},{description:"NAD27 / Wisconsin Transverse Mercator",code:"EPSG:3069"},{description:"NAD83 / Wisconsin Transverse Mercator",code:"EPSG:3070"},{description:"NAD83(HARN) / Wisconsin Transverse Mercator",code:"EPSG:3071"},{description:"NAD83 / Maine CS2000 East",code:"EPSG:3072"},{description:"NAD83 / Maine CS2000 Central",code:"EPSG:3073"},{description:"NAD83 / Maine CS2000 West",code:"EPSG:3074"},{description:"NAD83(HARN) / Maine CS2000 East",code:"EPSG:3075"},{description:"NAD83(HARN) / Maine CS2000 Central",code:"EPSG:3076"},{description:"NAD83(HARN) / Maine CS2000 West",code:"EPSG:3077"},{description:"NAD83 / Michigan Oblique Mercator",code:"EPSG:3078"},{description:"NAD83(HARN) / Michigan Oblique Mercator",code:"EPSG:3079"},{description:"NAD27 / Shackleford",code:"EPSG:3080"},{description:"NAD83 / Texas State Mapping System",code:"EPSG:3081"},{description:"NAD83 / Texas Centric Lambert Conformal",code:"EPSG:3082"},{description:"NAD83 / Texas Centric Albers Equal Area",code:"EPSG:3083"},{description:"NAD83(HARN) / Texas Centric Lambert Conformal",code:"EPSG:3084"},{description:"NAD83(HARN) / Texas Centric Albers Equal Area",code:"EPSG:3085"},{description:"NAD83 / Florida GDL Albers",code:"EPSG:3086"},{description:"NAD83(HARN) / Florida GDL Albers",code:"EPSG:3087"},{description:"NAD83 / Kentucky Single Zone",code:"EPSG:3088"},{description:"NAD83 / Kentucky Single Zone (ftUS)",code:"EPSG:3089"},{description:"NAD83(HARN) / Kentucky Single Zone",code:"EPSG:3090"},{description:"NAD83(HARN) / Kentucky Single Zone (ftUS)",code:"EPSG:3091"},{description:"Tokyo / UTM zone 51N",code:"EPSG:3092"},{description:"Tokyo / UTM zone 52N",code:"EPSG:3093"},{description:"Tokyo / UTM zone 53N",code:"EPSG:3094"},{description:"Tokyo / UTM zone 54N",code:"EPSG:3095"},{description:"Tokyo / UTM zone 55N",code:"EPSG:3096"},{description:"JGD2000 / UTM zone 51N",code:"EPSG:3097"},{description:"JGD2000 / UTM zone 52N",code:"EPSG:3098"},{description:"JGD2000 / UTM zone 53N",code:"EPSG:3099"},{description:"JGD2000 / UTM zone 54N",code:"EPSG:3100"},{description:"JGD2000 / UTM zone 55N",code:"EPSG:3101"},{description:"American Samoa 1962 / American Samoa Lambert",code:"EPSG:3102"},{description:"Mauritania 1999 / UTM zone 28N",code:"EPSG:3103"},{description:"Mauritania 1999 / UTM zone 29N",code:"EPSG:3104"},{description:"Mauritania 1999 / UTM zone 30N",code:"EPSG:3105"},{description:"Gulshan 303 / Bangladesh Transverse Mercator",code:"EPSG:3106"},{description:"GDA94 / SA Lambert",code:"EPSG:3107"},{description:"ETRS89 / Guernsey Grid",code:"EPSG:3108"},{description:"ETRS89 / Jersey Transverse Mercator",code:"EPSG:3109"},{description:"AGD66 / Vicgrid66",code:"EPSG:3110"},{description:"GDA94 / Vicgrid94",code:"EPSG:3111"},{description:"GDA94 / Geoscience Australia Lambert",code:"EPSG:3112"},{description:"GDA94 / BCSG02",code:"EPSG:3113"},{description:"MAGNA-SIRGAS / Colombia Far West zone",code:"EPSG:3114"},{description:"MAGNA-SIRGAS / Colombia West zone",code:"EPSG:3115"},{description:"MAGNA-SIRGAS / Colombia Bogota zone",code:"EPSG:3116"},{description:"MAGNA-SIRGAS / Colombia East Central zone",code:"EPSG:3117"},{description:"MAGNA-SIRGAS / Colombia East zone",code:"EPSG:3118"},{description:"Douala 1948 / AEF west",code:"EPSG:3119"},{description:"Pulkovo 1942(58) / Poland zone I",code:"EPSG:3120"},{description:"PRS92 / Philippines zone 1",code:"EPSG:3121"},{description:"PRS92 / Philippines zone 2",code:"EPSG:3122"},{description:"PRS92 / Philippines zone 3",code:"EPSG:3123"},{description:"PRS92 / Philippines zone 4",code:"EPSG:3124"},{description:"PRS92 / Philippines zone 5",code:"EPSG:3125"},{description:"ETRS89 / ETRS-GK19FIN",code:"EPSG:3126"},{description:"ETRS89 / ETRS-GK20FIN",code:"EPSG:3127"},{description:"ETRS89 / ETRS-GK21FIN",code:"EPSG:3128"},{description:"ETRS89 / ETRS-GK22FIN",code:"EPSG:3129"},{description:"ETRS89 / ETRS-GK23FIN",code:"EPSG:3130"},{description:"ETRS89 / ETRS-GK24FIN",code:"EPSG:3131"},{description:"ETRS89 / ETRS-GK25FIN",code:"EPSG:3132"},{description:"ETRS89 / ETRS-GK26FIN",code:"EPSG:3133"},{description:"ETRS89 / ETRS-GK27FIN",code:"EPSG:3134"},{description:"ETRS89 / ETRS-GK28FIN",code:"EPSG:3135"},{description:"ETRS89 / ETRS-GK29FIN",code:"EPSG:3136"},{description:"ETRS89 / ETRS-GK30FIN",code:"EPSG:3137"},{description:"ETRS89 / ETRS-GK31FIN",code:"EPSG:3138"},{description:"Vanua Levu 1915 / Vanua Levu Grid",code:"EPSG:3139"},{description:"Viti Levu 1912 / Viti Levu Grid",code:"EPSG:3140"},{description:"Fiji 1956 / UTM zone 60S",code:"EPSG:3141"},{description:"Fiji 1956 / UTM zone 1S",code:"EPSG:3142"},{description:"Fiji 1986 / Fiji Map Grid",code:"EPSG:3143"},{description:"FD54 / Faroe Lambert",code:"EPSG:3144"},{description:"ETRS89 / Faroe Lambert",code:"EPSG:3145"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger zone 6",code:"EPSG:3146"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger CM 18E",code:"EPSG:3147"},{description:"Indian 1960 / UTM zone 48N",code:"EPSG:3148"},{description:"Indian 1960 / UTM zone 49N",code:"EPSG:3149"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger zone 6",code:"EPSG:3150"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger CM 18E",code:"EPSG:3151"},{description:"ST74",code:"EPSG:3152"},{description:"NAD83(CSRS) / BC Albers",code:"EPSG:3153"},{description:"NAD83(CSRS) / UTM zone 7N",code:"EPSG:3154"},{description:"NAD83(CSRS) / UTM zone 8N",code:"EPSG:3155"},{description:"NAD83(CSRS) / UTM zone 9N",code:"EPSG:3156"},{description:"NAD83(CSRS) / UTM zone 10N",code:"EPSG:3157"},{description:"NAD83(CSRS) / UTM zone 14N",code:"EPSG:3158"},{description:"NAD83(CSRS) / UTM zone 15N",code:"EPSG:3159"},{description:"NAD83(CSRS) / UTM zone 16N",code:"EPSG:3160"},{description:"NAD83 / Ontario MNR Lambert",code:"EPSG:3161"},{description:"NAD83(CSRS) / Ontario MNR Lambert",code:"EPSG:3162"},{description:"RGNC91-93 / Lambert New Caledonia",code:"EPSG:3163"},{description:"ST87 Ouvea / UTM zone 58S",code:"EPSG:3164"},{description:"NEA74 Noumea / Noumea Lambert",code:"EPSG:3165"},{description:"NEA74 Noumea / Noumea Lambert 2",code:"EPSG:3166"},{description:"Kertau (RSO) / RSO Malaya (ch)",code:"EPSG:3167"},{description:"Kertau (RSO) / RSO Malaya (m)",code:"EPSG:3168"},{description:"RGNC91-93 / UTM zone 57S",code:"EPSG:3169"},{description:"RGNC91-93 / UTM zone 58S",code:"EPSG:3170"},{description:"RGNC91-93 / UTM zone 59S",code:"EPSG:3171"},{description:"IGN53 Mare / UTM zone 59S",code:"EPSG:3172"},{description:"fk89 / Faroe Lambert FK89",code:"EPSG:3173"},{description:"NAD83 / Great Lakes Albers",code:"EPSG:3174"},{description:"NAD83 / Great Lakes and St Lawrence Albers",code:"EPSG:3175"},{description:"Indian 1960 / TM 106 NE",code:"EPSG:3176"},{description:"LGD2006 / Libya TM",code:"EPSG:3177"},{description:"GR96 / UTM zone 18N",code:"EPSG:3178"},{description:"GR96 / UTM zone 19N",code:"EPSG:3179"},{description:"GR96 / UTM zone 20N",code:"EPSG:3180"},{description:"GR96 / UTM zone 21N",code:"EPSG:3181"},{description:"GR96 / UTM zone 22N",code:"EPSG:3182"},{description:"GR96 / UTM zone 23N",code:"EPSG:3183"},{description:"GR96 / UTM zone 24N",code:"EPSG:3184"},{description:"GR96 / UTM zone 25N",code:"EPSG:3185"},{description:"GR96 / UTM zone 26N",code:"EPSG:3186"},{description:"GR96 / UTM zone 27N",code:"EPSG:3187"},{description:"GR96 / UTM zone 28N",code:"EPSG:3188"},{description:"GR96 / UTM zone 29N",code:"EPSG:3189"},{description:"LGD2006 / Libya TM zone 5",code:"EPSG:3190"},{description:"LGD2006 / Libya TM zone 6",code:"EPSG:3191"},{description:"LGD2006 / Libya TM zone 7",code:"EPSG:3192"},{description:"LGD2006 / Libya TM zone 8",code:"EPSG:3193"},{description:"LGD2006 / Libya TM zone 9",code:"EPSG:3194"},{description:"LGD2006 / Libya TM zone 10",code:"EPSG:3195"},{description:"LGD2006 / Libya TM zone 11",code:"EPSG:3196"},{description:"LGD2006 / Libya TM zone 12",code:"EPSG:3197"},{description:"LGD2006 / Libya TM zone 13",code:"EPSG:3198"},{description:"LGD2006 / UTM zone 32N",code:"EPSG:3199"},{description:"FD58 / Iraq zone",code:"EPSG:3200"},{description:"LGD2006 / UTM zone 33N",code:"EPSG:3201"},{description:"LGD2006 / UTM zone 34N",code:"EPSG:3202"},{description:"LGD2006 / UTM zone 35N",code:"EPSG:3203"},{description:"WGS 84 / SCAR IMW SP19-20",code:"EPSG:3204"},{description:"WGS 84 / SCAR IMW SP21-22",code:"EPSG:3205"},{description:"WGS 84 / SCAR IMW SP23-24",code:"EPSG:3206"},{description:"WGS 84 / SCAR IMW SQ01-02",code:"EPSG:3207"},{description:"WGS 84 / SCAR IMW SQ19-20",code:"EPSG:3208"},{description:"WGS 84 / SCAR IMW SQ21-22",code:"EPSG:3209"},{description:"WGS 84 / SCAR IMW SQ37-38",code:"EPSG:3210"},{description:"WGS 84 / SCAR IMW SQ39-40",code:"EPSG:3211"},{description:"WGS 84 / SCAR IMW SQ41-42",code:"EPSG:3212"},{description:"WGS 84 / SCAR IMW SQ43-44",code:"EPSG:3213"},{description:"WGS 84 / SCAR IMW SQ45-46",code:"EPSG:3214"},{description:"WGS 84 / SCAR IMW SQ47-48",code:"EPSG:3215"},{description:"WGS 84 / SCAR IMW SQ49-50",code:"EPSG:3216"},{description:"WGS 84 / SCAR IMW SQ51-52",code:"EPSG:3217"},{description:"WGS 84 / SCAR IMW SQ53-54",code:"EPSG:3218"},{description:"WGS 84 / SCAR IMW SQ55-56",code:"EPSG:3219"},{description:"WGS 84 / SCAR IMW SQ57-58",code:"EPSG:3220"},{description:"WGS 84 / SCAR IMW SR13-14",code:"EPSG:3221"},{description:"WGS 84 / SCAR IMW SR15-16",code:"EPSG:3222"},{description:"WGS 84 / SCAR IMW SR17-18",code:"EPSG:3223"},{description:"WGS 84 / SCAR IMW SR19-20",code:"EPSG:3224"},{description:"WGS 84 / SCAR IMW SR27-28",code:"EPSG:3225"},{description:"WGS 84 / SCAR IMW SR29-30",code:"EPSG:3226"},{description:"WGS 84 / SCAR IMW SR31-32",code:"EPSG:3227"},{description:"WGS 84 / SCAR IMW SR33-34",code:"EPSG:3228"},{description:"WGS 84 / SCAR IMW SR35-36",code:"EPSG:3229"},{description:"WGS 84 / SCAR IMW SR37-38",code:"EPSG:3230"},{description:"WGS 84 / SCAR IMW SR39-40",code:"EPSG:3231"},{description:"WGS 84 / SCAR IMW SR41-42",code:"EPSG:3232"},{description:"WGS 84 / SCAR IMW SR43-44",code:"EPSG:3233"},{description:"WGS 84 / SCAR IMW SR45-46",code:"EPSG:3234"},{description:"WGS 84 / SCAR IMW SR47-48",code:"EPSG:3235"},{description:"WGS 84 / SCAR IMW SR49-50",code:"EPSG:3236"},{description:"WGS 84 / SCAR IMW SR51-52",code:"EPSG:3237"},{description:"WGS 84 / SCAR IMW SR53-54",code:"EPSG:3238"},{description:"WGS 84 / SCAR IMW SR55-56",code:"EPSG:3239"},{description:"WGS 84 / SCAR IMW SR57-58",code:"EPSG:3240"},{description:"WGS 84 / SCAR IMW SR59-60",code:"EPSG:3241"},{description:"WGS 84 / SCAR IMW SS04-06",code:"EPSG:3242"},{description:"WGS 84 / SCAR IMW SS07-09",code:"EPSG:3243"},{description:"WGS 84 / SCAR IMW SS10-12",code:"EPSG:3244"},{description:"WGS 84 / SCAR IMW SS13-15",code:"EPSG:3245"},{description:"WGS 84 / SCAR IMW SS16-18",code:"EPSG:3246"},{description:"WGS 84 / SCAR IMW SS19-21",code:"EPSG:3247"},{description:"WGS 84 / SCAR IMW SS25-27",code:"EPSG:3248"},{description:"WGS 84 / SCAR IMW SS28-30",code:"EPSG:3249"},{description:"WGS 84 / SCAR IMW SS31-33",code:"EPSG:3250"},{description:"WGS 84 / SCAR IMW SS34-36",code:"EPSG:3251"},{description:"WGS 84 / SCAR IMW SS37-39",code:"EPSG:3252"},{description:"WGS 84 / SCAR IMW SS40-42",code:"EPSG:3253"},{description:"WGS 84 / SCAR IMW SS43-45",code:"EPSG:3254"},{description:"WGS 84 / SCAR IMW SS46-48",code:"EPSG:3255"},{description:"WGS 84 / SCAR IMW SS49-51",code:"EPSG:3256"},{description:"WGS 84 / SCAR IMW SS52-54",code:"EPSG:3257"},{description:"WGS 84 / SCAR IMW SS55-57",code:"EPSG:3258"},{description:"WGS 84 / SCAR IMW SS58-60",code:"EPSG:3259"},{description:"WGS 84 / SCAR IMW ST01-04",code:"EPSG:3260"},{description:"WGS 84 / SCAR IMW ST05-08",code:"EPSG:3261"},{description:"WGS 84 / SCAR IMW ST09-12",code:"EPSG:3262"},{description:"WGS 84 / SCAR IMW ST13-16",code:"EPSG:3263"},{description:"WGS 84 / SCAR IMW ST17-20",code:"EPSG:3264"},{description:"WGS 84 / SCAR IMW ST21-24",code:"EPSG:3265"},{description:"WGS 84 / SCAR IMW ST25-28",code:"EPSG:3266"},{description:"WGS 84 / SCAR IMW ST29-32",code:"EPSG:3267"},{description:"WGS 84 / SCAR IMW ST33-36",code:"EPSG:3268"},{description:"WGS 84 / SCAR IMW ST37-40",code:"EPSG:3269"},{description:"WGS 84 / SCAR IMW ST41-44",code:"EPSG:3270"},{description:"WGS 84 / SCAR IMW ST45-48",code:"EPSG:3271"},{description:"WGS 84 / SCAR IMW ST49-52",code:"EPSG:3272"},{description:"WGS 84 / SCAR IMW ST53-56",code:"EPSG:3273"},{description:"WGS 84 / SCAR IMW ST57-60",code:"EPSG:3274"},{description:"WGS 84 / SCAR IMW SU01-05",code:"EPSG:3275"},{description:"WGS 84 / SCAR IMW SU06-10",code:"EPSG:3276"},{description:"WGS 84 / SCAR IMW SU11-15",code:"EPSG:3277"},{description:"WGS 84 / SCAR IMW SU16-20",code:"EPSG:3278"},{description:"WGS 84 / SCAR IMW SU21-25",code:"EPSG:3279"},{description:"WGS 84 / SCAR IMW SU26-30",code:"EPSG:3280"},{description:"WGS 84 / SCAR IMW SU31-35",code:"EPSG:3281"},{description:"WGS 84 / SCAR IMW SU36-40",code:"EPSG:3282"},{description:"WGS 84 / SCAR IMW SU41-45",code:"EPSG:3283"},{description:"WGS 84 / SCAR IMW SU46-50",code:"EPSG:3284"},{description:"WGS 84 / SCAR IMW SU51-55",code:"EPSG:3285"},{description:"WGS 84 / SCAR IMW SU56-60",code:"EPSG:3286"},{description:"WGS 84 / SCAR IMW SV01-10",code:"EPSG:3287"},{description:"WGS 84 / SCAR IMW SV11-20",code:"EPSG:3288"},{description:"WGS 84 / SCAR IMW SV21-30",code:"EPSG:3289"},{description:"WGS 84 / SCAR IMW SV31-40",code:"EPSG:3290"},{description:"WGS 84 / SCAR IMW SV41-50",code:"EPSG:3291"},{description:"WGS 84 / SCAR IMW SV51-60",code:"EPSG:3292"},{description:"WGS 84 / SCAR IMW SW01-60",code:"EPSG:3293"},{description:"WGS 84 / USGS Transantarctic Mountains",code:"EPSG:3294"},{description:"Guam 1963 / Yap Islands",code:"EPSG:3295"},{description:"RGPF / UTM zone 5S",code:"EPSG:3296"},{description:"RGPF / UTM zone 6S",code:"EPSG:3297"},{description:"RGPF / UTM zone 7S",code:"EPSG:3298"},{description:"RGPF / UTM zone 8S",code:"EPSG:3299"},{description:"Estonian Coordinate System of 1992",code:"EPSG:3300"},{description:"Estonian Coordinate System of 1997",code:"EPSG:3301"},{description:"IGN63 Hiva Oa / UTM zone 7S",code:"EPSG:3302"},{description:"Fatu Iva 72 / UTM zone 7S",code:"EPSG:3303"},{description:"Tahiti 79 / UTM zone 6S",code:"EPSG:3304"},{description:"Moorea 87 / UTM zone 6S",code:"EPSG:3305"},{description:"Maupiti 83 / UTM zone 5S",code:"EPSG:3306"},{description:"Nakhl-e Ghanem / UTM zone 39N",code:"EPSG:3307"},{description:"GDA94 / NSW Lambert",code:"EPSG:3308"},{description:"NAD27 / California Albers",code:"EPSG:3309"},{description:"NAD83 / California Albers",code:"EPSG:3310"},{description:"NAD83(HARN) / California Albers",code:"EPSG:3311"},{description:"CSG67 / UTM zone 21N",code:"EPSG:3312"},{description:"RGFG95 / UTM zone 21N",code:"EPSG:3313"},{description:"Katanga 1955 / Katanga Lambert",code:"EPSG:3314"},{description:"Katanga 1955 / Katanga TM",code:"EPSG:3315"},{description:"Kasai 1953 / Congo TM zone 22",code:"EPSG:3316"},{description:"Kasai 1953 / Congo TM zone 24",code:"EPSG:3317"},{description:"IGC 1962 / Congo TM zone 12",code:"EPSG:3318"},{description:"IGC 1962 / Congo TM zone 14",code:"EPSG:3319"},{description:"IGC 1962 / Congo TM zone 16",code:"EPSG:3320"},{description:"IGC 1962 / Congo TM zone 18",code:"EPSG:3321"},{description:"IGC 1962 / Congo TM zone 20",code:"EPSG:3322"},{description:"IGC 1962 / Congo TM zone 22",code:"EPSG:3323"},{description:"IGC 1962 / Congo TM zone 24",code:"EPSG:3324"},{description:"IGC 1962 / Congo TM zone 26",code:"EPSG:3325"},{description:"IGC 1962 / Congo TM zone 28",code:"EPSG:3326"},{description:"IGC 1962 / Congo TM zone 30",code:"EPSG:3327"},{description:"Pulkovo 1942(58) / GUGiK-80",code:"EPSG:3328"},{description:"Pulkovo 1942(58) / 3-degree Gauss-Kruger zone 5",code:"EPSG:3329"},{description:"Pulkovo 1942(58) / 3-degree Gauss-Kruger zone 6",code:"EPSG:3330"},{description:"Pulkovo 1942(58) / 3-degree Gauss-Kruger zone 7",code:"EPSG:3331"},{description:"Pulkovo 1942(58) / 3-degree Gauss-Kruger zone 8",code:"EPSG:3332"},{description:"Pulkovo 1942(58) / Gauss-Kruger zone 3",code:"EPSG:3333"},{description:"Pulkovo 1942(58) / Gauss-Kruger zone 4",code:"EPSG:3334"},{description:"Pulkovo 1942(58) / Gauss-Kruger zone 5",code:"EPSG:3335"},{description:"IGN 1962 Kerguelen / UTM zone 42S",code:"EPSG:3336"},{description:"Le Pouce 1934 / Mauritius Grid",code:"EPSG:3337"},{description:"NAD83 / Alaska Albers",code:"EPSG:3338"},{description:"IGCB 1955 / Congo TM zone 12",code:"EPSG:3339"},{description:"IGCB 1955 / Congo TM zone 14",code:"EPSG:3340"},{description:"IGCB 1955 / Congo TM zone 16",code:"EPSG:3341"},{description:"IGCB 1955 / UTM zone 33S",code:"EPSG:3342"},{description:"Mauritania 1999 / UTM zone 28N",code:"EPSG:3343"},{description:"Mauritania 1999 / UTM zone 29N",code:"EPSG:3344"},{description:"Mauritania 1999 / UTM zone 30N",code:"EPSG:3345"},{description:"LKS94 / Lithuania TM",code:"EPSG:3346"},{description:"NAD83 / Statistics Canada Lambert",code:"EPSG:3347"},{description:"NAD83(CSRS) / Statistics Canada Lambert",code:"EPSG:3348"},{description:"WGS 84 / PDC Mercator",code:"EPSG:3349"},{description:"Pulkovo 1942 / CS63 zone C0",code:"EPSG:3350"},{description:"Pulkovo 1942 / CS63 zone C1",code:"EPSG:3351"},{description:"Pulkovo 1942 / CS63 zone C2",code:"EPSG:3352"},{description:"Mhast (onshore) / UTM zone 32S",code:"EPSG:3353"},{description:"Mhast (offshore) / UTM zone 32S",code:"EPSG:3354"},{description:"Egypt Gulf of Suez S-650 TL / Red Belt",code:"EPSG:3355"},{description:"Grand Cayman 1959 / UTM zone 17N",code:"EPSG:3356"},{description:"Little Cayman 1961 / UTM zone 17N",code:"EPSG:3357"},{description:"NAD83(HARN) / North Carolina",code:"EPSG:3358"},{description:"NAD83(HARN) / North Carolina (ftUS)",code:"EPSG:3359"},{description:"NAD83(HARN) / South Carolina",code:"EPSG:3360"},{description:"NAD83(HARN) / South Carolina (ft)",code:"EPSG:3361"},{description:"NAD83(HARN) / Pennsylvania North",code:"EPSG:3362"},{description:"NAD83(HARN) / Pennsylvania North (ftUS)",code:"EPSG:3363"},{description:"NAD83(HARN) / Pennsylvania South",code:"EPSG:3364"},{description:"NAD83(HARN) / Pennsylvania South (ftUS)",code:"EPSG:3365"},{description:"Hong Kong 1963 Grid System",code:"EPSG:3366"},{description:"IGN Astro 1960 / UTM zone 28N",code:"EPSG:3367"},{description:"IGN Astro 1960 / UTM zone 29N",code:"EPSG:3368"},{description:"IGN Astro 1960 / UTM zone 30N",code:"EPSG:3369"},{description:"NAD27 / UTM zone 59N",code:"EPSG:3370"},{description:"NAD27 / UTM zone 60N",code:"EPSG:3371"},{description:"NAD83 / UTM zone 59N",code:"EPSG:3372"},{description:"NAD83 / UTM zone 60N",code:"EPSG:3373"},{description:"FD54 / UTM zone 29N",code:"EPSG:3374"},{description:"GDM2000 / Peninsula RSO",code:"EPSG:3375"},{description:"GDM2000 / East Malaysia BRSO",code:"EPSG:3376"},{description:"GDM2000 / Johor Grid",code:"EPSG:3377"},{description:"GDM2000 / Sembilan and Melaka Grid",code:"EPSG:3378"},{description:"GDM2000 / PahangGrid",code:"EPSG:3379"},{description:"GDM2000 / Selangor Grid",code:"EPSG:3380"},{description:"GDM2000 / Terengganu Grid",code:"EPSG:3381"},{description:"GDM2000 / Pinang Grid",code:"EPSG:3382"},{description:"GDM2000 / Kedah and Perlis Grid",code:"EPSG:3383"},{description:"GDM2000 / Perak Grid",code:"EPSG:3384"},{description:"GDM2000 / Kelantan Grid",code:"EPSG:3385"},{description:"KKJ / Finland zone 0",code:"EPSG:3386"},{description:"KKJ / Finland zone 5",code:"EPSG:3387"},{description:"Pulkovo 1942 / Caspian Sea Mercator",code:"EPSG:3388"},{description:"Pulkovo 1942 / 3-degree Gauss-Kruger zone 60",code:"EPSG:3389"},{description:"Pulkovo 1995 / 3-degree Gauss-Kruger zone 60",code:"EPSG:3390"},{description:"Karbala 1979 / UTM zone 37N",code:"EPSG:3391"},{description:"Karbala 1979 / UTM zone 38N",code:"EPSG:3392"},{description:"Karbala 1979 / UTM zone 39N",code:"EPSG:3393"},{description:"Nahrwan 1934 / Iraq zone",code:"EPSG:3394"},{description:"WGS 84 / World Mercator",code:"EPSG:3395"},{description:"PD/83 / 3-degree Gauss-Kruger zone 3",code:"EPSG:3396"},{description:"PD/83 / 3-degree Gauss-Kruger zone 4",code:"EPSG:3397"},{description:"RD/83 / 3-degree Gauss-Kruger zone 4",code:"EPSG:3398"},{description:"RD/83 / 3-degree Gauss-Kruger zone 5",code:"EPSG:3399"},{description:"NAD83 / Alberta 10-TM (Forest)",code:"EPSG:3400"},{description:"NAD83 / Alberta 10-TM (Resource)",code:"EPSG:3401"},{description:"NAD83(CSRS) / Alberta 10-TM (Forest)",code:"EPSG:3402"},{description:"NAD83(CSRS) / Alberta 10-TM (Resource)",code:"EPSG:3403"},{description:"NAD83(HARN) / North Carolina (ftUS)",code:"EPSG:3404"},{description:"VN-2000 / UTM zone 48N",code:"EPSG:3405"},{description:"VN-2000 / UTM zone 49N",code:"EPSG:3406"},{description:"Hong Kong 1963 Grid System",code:"EPSG:3407"},{description:"NSIDC EASE-Grid North",code:"EPSG:3408"},{description:"NSIDC EASE-Grid South",code:"EPSG:3409"},{description:"NSIDC EASE-Grid Global",code:"EPSG:3410"},{description:"NSIDC Sea Ice Polar Stereographic North",code:"EPSG:3411"},{description:"NSIDC Sea Ice Polar Stereographic South",code:"EPSG:3412"},{description:"WGS 84 / NSIDC Sea Ice Polar Stereographic North",code:"EPSG:3413"},{description:"SVY21 / Singapore TM",code:"EPSG:3414"},{description:"WGS 72BE / South China Sea Lambert",code:"EPSG:3415"},{description:"ETRS89 / Austria Lambert",code:"EPSG:3416"},{description:"NAD83 / Iowa North (ft US)",code:"EPSG:3417"},{description:"NAD83 / Iowa South (ft US)",code:"EPSG:3418"},{description:"NAD83 / Kansas North (ft US)",code:"EPSG:3419"},{description:"NAD83 / Kansas South (ft US)",code:"EPSG:3420"},{description:"NAD83 / Nevada East (ft US)",code:"EPSG:3421"},{description:"NAD83 / Nevada Central (ft US)",code:"EPSG:3422"},{description:"NAD83 / Nevada West (ft US)",code:"EPSG:3423"},{description:"NAD83 / New Jersey (ft US)",code:"EPSG:3424"},{description:"NAD83(HARN) / Iowa North (ft US)",code:"EPSG:3425"},{description:"NAD83(HARN) / Iowa South (ft US)",code:"EPSG:3426"},{description:"NAD83(HARN) / Kansas North (ft US)",code:"EPSG:3427"},{description:"NAD83(HARN) / Kansas South (ft US)",code:"EPSG:3428"},{description:"NAD83(HARN) / Nevada East (ft US)",code:"EPSG:3429"},{description:"NAD83(HARN) / Nevada Central (ft US)",code:"EPSG:3430"},{description:"NAD83(HARN) / Nevada West (ft US)",code:"EPSG:3431"},{description:"NAD83(HARN) / New Jersey (ft US)",code:"EPSG:3432"},{description:"NAD83 / Arkansas North (ftUS)",code:"EPSG:3433"},{description:"NAD83 / Arkansas South (ftUS)",code:"EPSG:3434"},{description:"NAD83 / Illinois East (ftUS)",code:"EPSG:3435"},{description:"NAD83 / Illinois West (ftUS)",code:"EPSG:3436"},{description:"NAD83 / New Hampshire (ftUS)",code:"EPSG:3437"},{description:"NAD83 / Rhode Island (ftUS)",code:"EPSG:3438"},{description:"PSD93 / UTM zone 39N",code:"EPSG:3439"},{description:"PSD93 / UTM zone 40N",code:"EPSG:3440"},{description:"NAD83(HARN) / Arkansas North (ftUS)",code:"EPSG:3441"},{description:"NAD83(HARN) / Arkansas South (ftUS)",code:"EPSG:3442"},{description:"NAD83(HARN) / Illinois East (ftUS)",code:"EPSG:3443"},{description:"NAD83(HARN) / Illinois West (ftUS)",code:"EPSG:3444"},{description:"NAD83(HARN) / New Hampshire (ftUS)",code:"EPSG:3445"},{description:"NAD83(HARN) / Rhode Island (ftUS)",code:"EPSG:3446"},{description:"ETRS89 / Belgian Lambert 2005",code:"EPSG:3447"},{description:"JAD2001 / Jamaica Metric Grid",code:"EPSG:3448"},{description:"JAD2001 / UTM zone 17N",code:"EPSG:3449"},{description:"JAD2001 / UTM zone 18N",code:"EPSG:3450"},{description:"NAD83 / Louisiana North (ftUS)",code:"EPSG:3451"},{description:"NAD83 / Louisiana South (ftUS)",code:"EPSG:3452"},{description:"NAD83 / Louisiana Offshore (ftUS)",code:"EPSG:3453"},{description:"NAD83 / South Dakota North (ftUS)",code:"EPSG:3454"},{description:"NAD83 / South Dakota South (ftUS)",code:"EPSG:3455"},{description:"NAD83(HARN) / Louisiana North (ftUS)",code:"EPSG:3456"},{description:"NAD83(HARN) / Louisiana South (ftUS)",code:"EPSG:3457"},{description:"NAD83(HARN) / South Dakota North (ftUS)",code:"EPSG:3458"},{description:"NAD83(HARN) / South Dakota South (ftUS)",code:"EPSG:3459"},{description:"Fiji 1986 / Fiji Map Grid",code:"EPSG:3460"},{description:"Dabola 1981 / UTM zone 28N",code:"EPSG:3461"},{description:"Dabola 1981 / UTM zone 29N",code:"EPSG:3462"},{description:"NAD83 / Maine CS2000 Central",code:"EPSG:3463"},{description:"NAD83(HARN) / Maine CS2000 Central",code:"EPSG:3464"},{description:"NAD83(NSRS2007) / Alabama East",code:"EPSG:3465"},{description:"NAD83(NSRS2007) / Alabama West",code:"EPSG:3466"},{description:"NAD83(NSRS2007) / Alaska Albers",code:"EPSG:3467"},{description:"NAD83(NSRS2007) / Alaska zone 1",code:"EPSG:3468"},{description:"NAD83(NSRS2007) / Alaska zone 2",code:"EPSG:3469"},{description:"NAD83(NSRS2007) / Alaska zone 3",code:"EPSG:3470"},{description:"NAD83(NSRS2007) / Alaska zone 4",code:"EPSG:3471"},{description:"NAD83(NSRS2007) / Alaska zone 5",code:"EPSG:3472"},{description:"NAD83(NSRS2007) / Alaska zone 6",code:"EPSG:3473"},{description:"NAD83(NSRS2007) / Alaska zone 7",code:"EPSG:3474"},{description:"NAD83(NSRS2007) / Alaska zone 8",code:"EPSG:3475"},{description:"NAD83(NSRS2007) / Alaska zone 9",code:"EPSG:3476"},{description:"NAD83(NSRS2007) / Alaska zone 10",code:"EPSG:3477"},{description:"NAD83(NSRS2007) / Arizona Central",code:"EPSG:3478"},{description:"NAD83(NSRS2007) / Arizona Central (ft)",code:"EPSG:3479"},{description:"NAD83(NSRS2007) / Arizona East",code:"EPSG:3480"},{description:"NAD83(NSRS2007) / Arizona East (ft)",code:"EPSG:3481"},{description:"NAD83(NSRS2007) / Arizona West",code:"EPSG:3482"},{description:"NAD83(NSRS2007) / Arizona West (ft)",code:"EPSG:3483"},{description:"NAD83(NSRS2007) / Arkansas North",code:"EPSG:3484"},{description:"NAD83(NSRS2007) / Arkansas North (ftUS)",code:"EPSG:3485"},{description:"NAD83(NSRS2007) / Arkansas South",code:"EPSG:3486"},{description:"NAD83(NSRS2007) / Arkansas South (ftUS)",code:"EPSG:3487"},{description:"NAD83(NSRS2007) / California Albers",code:"EPSG:3488"},{description:"NAD83(NSRS2007) / California zone 1",code:"EPSG:3489"},{description:"NAD83(NSRS2007) / California zone 1 (ftUS)",code:"EPSG:3490"},{description:"NAD83(NSRS2007) / California zone 2",code:"EPSG:3491"},{description:"NAD83(NSRS2007) / California zone 2 (ftUS)",code:"EPSG:3492"},{description:"NAD83(NSRS2007) / California zone 3",code:"EPSG:3493"},{description:"NAD83(NSRS2007) / California zone 3 (ftUS)",code:"EPSG:3494"},{description:"NAD83(NSRS2007) / California zone 4",code:"EPSG:3495"},{description:"NAD83(NSRS2007) / California zone 4 (ftUS)",code:"EPSG:3496"},{description:"NAD83(NSRS2007) / California zone 5",code:"EPSG:3497"},{description:"NAD83(NSRS2007) / California zone 5 (ftUS)",code:"EPSG:3498"},{description:"NAD83(NSRS2007) / California zone 6",code:"EPSG:3499"},{description:"NAD83(NSRS2007) / California zone 6 (ftUS)",code:"EPSG:3500"},{description:"NAD83(NSRS2007) / Colorado Central",code:"EPSG:3501"},{description:"NAD83(NSRS2007) / Colorado Central (ftUS)",code:"EPSG:3502"},{description:"NAD83(NSRS2007) / Colorado North",code:"EPSG:3503"},{description:"NAD83(NSRS2007) / Colorado North (ftUS)",code:"EPSG:3504"},{description:"NAD83(NSRS2007) / Colorado South",code:"EPSG:3505"},{description:"NAD83(NSRS2007) / Colorado South (ftUS)",code:"EPSG:3506"},{description:"NAD83(NSRS2007) / Connecticut",code:"EPSG:3507"},{description:"NAD83(NSRS2007) / Connecticut (ftUS)",code:"EPSG:3508"},{description:"NAD83(NSRS2007) / Delaware",code:"EPSG:3509"},{description:"NAD83(NSRS2007) / Delaware (ftUS)",code:"EPSG:3510"},{description:"NAD83(NSRS2007) / Florida East",code:"EPSG:3511"},{description:"NAD83(NSRS2007) / Florida East (ftUS)",code:"EPSG:3512"},{description:"NAD83(NSRS2007) / Florida GDL Albers",code:"EPSG:3513"},{description:"NAD83(NSRS2007) / Florida North",code:"EPSG:3514"},{description:"NAD83(NSRS2007) / Florida North (ftUS)",code:"EPSG:3515"},{description:"NAD83(NSRS2007) / Florida West",code:"EPSG:3516"},{description:"NAD83(NSRS2007) / Florida West (ftUS)",code:"EPSG:3517"},{description:"NAD83(NSRS2007) / Georgia East",code:"EPSG:3518"},{description:"NAD83(NSRS2007) / Georgia East (ftUS)",code:"EPSG:3519"},{description:"NAD83(NSRS2007) / Georgia West",code:"EPSG:3520"},{description:"NAD83(NSRS2007) / Georgia West (ftUS)",code:"EPSG:3521"},{description:"NAD83(NSRS2007) / Idaho Central",code:"EPSG:3522"},{description:"NAD83(NSRS2007) / Idaho Central (ftUS)",code:"EPSG:3523"},{description:"NAD83(NSRS2007) / Idaho East",code:"EPSG:3524"},{description:"NAD83(NSRS2007) / Idaho East (ftUS)",code:"EPSG:3525"},{description:"NAD83(NSRS2007) / Idaho West",code:"EPSG:3526"},{description:"NAD83(NSRS2007) / Idaho West (ftUS)",code:"EPSG:3527"},{description:"NAD83(NSRS2007) / Illinois East",code:"EPSG:3528"},{description:"NAD83(NSRS2007) / Illinois East (ftUS)",code:"EPSG:3529"},{description:"NAD83(NSRS2007) / Illinois West",code:"EPSG:3530"},{description:"NAD83(NSRS2007) / Illinois West (ftUS)",code:"EPSG:3531"},{description:"NAD83(NSRS2007) / Indiana East",code:"EPSG:3532"},{description:"NAD83(NSRS2007) / Indiana East (ftUS)",code:"EPSG:3533"},{description:"NAD83(NSRS2007) / Indiana West",code:"EPSG:3534"},{description:"NAD83(NSRS2007) / Indiana West (ftUS)",code:"EPSG:3535"},{description:"NAD83(NSRS2007) / Iowa North",code:"EPSG:3536"},{description:"NAD83(NSRS2007) / Iowa North (ft US)",code:"EPSG:3537"},{description:"NAD83(NSRS2007) / Iowa South",code:"EPSG:3538"},{description:"NAD83(NSRS2007) / Iowa South (ft US)",code:"EPSG:3539"},{description:"NAD83(NSRS2007) / Kansas North",code:"EPSG:3540"},{description:"NAD83(NSRS2007) / Kansas North (ft US)",code:"EPSG:3541"},{description:"NAD83(NSRS2007) / Kansas South",code:"EPSG:3542"},{description:"NAD83(NSRS2007) / Kansas South (ft US)",code:"EPSG:3543"},{description:"NAD83(NSRS2007) / Kentucky North",code:"EPSG:3544"},{description:"NAD83(NSRS2007) / Kentucky North (ftUS)",code:"EPSG:3545"},{description:"NAD83(NSRS2007) / Kentucky Single Zone",code:"EPSG:3546"},{description:"NAD83(NSRS2007) / Kentucky Single Zone (ftUS)",code:"EPSG:3547"},{description:"NAD83(NSRS2007) / Kentucky South",code:"EPSG:3548"},{description:"NAD83(NSRS2007) / Kentucky South (ftUS)",code:"EPSG:3549"},{description:"NAD83(NSRS2007) / Louisiana North",code:"EPSG:3550"},{description:"NAD83(NSRS2007) / Louisiana North (ftUS)",code:"EPSG:3551"},{description:"NAD83(NSRS2007) / Louisiana South",code:"EPSG:3552"},{description:"NAD83(NSRS2007) / Louisiana South (ftUS)",code:"EPSG:3553"},{description:"NAD83(NSRS2007) / Maine CS2000 Central",code:"EPSG:3554"},{description:"NAD83(NSRS2007) / Maine CS2000 East",code:"EPSG:3555"},{description:"NAD83(NSRS2007) / Maine CS2000 West",code:"EPSG:3556"},{description:"NAD83(NSRS2007) / Maine East",code:"EPSG:3557"},{description:"NAD83(NSRS2007) / Maine West",code:"EPSG:3558"},{description:"NAD83(NSRS2007) / Maryland",code:"EPSG:3559"},{description:"NAD83 / Utah North (ftUS)",code:"EPSG:3560"},{description:"Old Hawaiian / Hawaii zone 1",code:"EPSG:3561"},{description:"Old Hawaiian / Hawaii zone 2",code:"EPSG:3562"},{description:"Old Hawaiian / Hawaii zone 3",code:"EPSG:3563"},{description:"Old Hawaiian / Hawaii zone 4",code:"EPSG:3564"},{description:"Old Hawaiian / Hawaii zone 5",code:"EPSG:3565"},{description:"NAD83 / Utah Central (ftUS)",code:"EPSG:3566"},{description:"NAD83 / Utah South (ftUS)",code:"EPSG:3567"},{description:"NAD83(HARN) / Utah North (ftUS)",code:"EPSG:3568"},{description:"NAD83(HARN) / Utah Central (ftUS)",code:"EPSG:3569"},{description:"NAD83(HARN) / Utah South (ftUS)",code:"EPSG:3570"},{description:"WGS 84 / North Pole LAEA Bering Sea",code:"EPSG:3571"},{description:"WGS 84 / North Pole LAEA Alaska",code:"EPSG:3572"},{description:"WGS 84 / North Pole LAEA Canada",code:"EPSG:3573"},{description:"WGS 84 / North Pole LAEA Atlantic",code:"EPSG:3574"},{description:"WGS 84 / North Pole LAEA Europe",code:"EPSG:3575"},{description:"WGS 84 / North Pole LAEA Russia",code:"EPSG:3576"},{description:"GDA94 / Australian Albers",code:"EPSG:3577"},{description:"NAD83 / Yukon Albers",code:"EPSG:3578"},{description:"NAD83(CSRS) / Yukon Albers",code:"EPSG:3579"},{description:"NAD83 / NWT Lambert",code:"EPSG:3580"},{description:"NAD83(CSRS) / NWT Lambert",code:"EPSG:3581"},{description:"NAD83(NSRS2007) / Maryland (ftUS)",code:"EPSG:3582"},{description:"NAD83(NSRS2007) / Massachusetts Island",code:"EPSG:3583"},{description:"NAD83(NSRS2007) / Massachusetts Island (ftUS)",code:"EPSG:3584"},{description:"NAD83(NSRS2007) / Massachusetts Mainland",code:"EPSG:3585"},{description:"NAD83(NSRS2007) / Massachusetts Mainland (ftUS)",code:"EPSG:3586"},{description:"NAD83(NSRS2007) / Michigan Central",code:"EPSG:3587"},{description:"NAD83(NSRS2007) / Michigan Central (ft)",code:"EPSG:3588"},{description:"NAD83(NSRS2007) / Michigan North",code:"EPSG:3589"},{description:"NAD83(NSRS2007) / Michigan North (ft)",code:"EPSG:3590"},{description:"NAD83(NSRS2007) / Michigan Oblique Mercator",code:"EPSG:3591"},{description:"NAD83(NSRS2007) / Michigan South",code:"EPSG:3592"},{description:"NAD83(NSRS2007) / Michigan South (ft)",code:"EPSG:3593"},{description:"NAD83(NSRS2007) / Minnesota Central",code:"EPSG:3594"},{description:"NAD83(NSRS2007) / Minnesota North",code:"EPSG:3595"},{description:"NAD83(NSRS2007) / Minnesota South",code:"EPSG:3596"},{description:"NAD83(NSRS2007) / Mississippi East",code:"EPSG:3597"},{description:"NAD83(NSRS2007) / Mississippi East (ftUS)",code:"EPSG:3598"},{description:"NAD83(NSRS2007) / Mississippi West",code:"EPSG:3599"},{description:"NAD83(NSRS2007) / Mississippi West (ftUS)",code:"EPSG:3600"},{description:"NAD83(NSRS2007) / Missouri Central",code:"EPSG:3601"},{description:"NAD83(NSRS2007) / Missouri East",code:"EPSG:3602"},{description:"NAD83(NSRS2007) / Missouri West",code:"EPSG:3603"},{description:"NAD83(NSRS2007) / Montana",code:"EPSG:3604"},{description:"NAD83(NSRS2007) / Montana (ft)",code:"EPSG:3605"},{description:"NAD83(NSRS2007) / Nebraska",code:"EPSG:3606"},{description:"NAD83(NSRS2007) / Nevada Central",code:"EPSG:3607"},{description:"NAD83(NSRS2007) / Nevada Central (ft US)",code:"EPSG:3608"},{description:"NAD83(NSRS2007) / Nevada East",code:"EPSG:3609"},{description:"NAD83(NSRS2007) / Nevada East (ft US)",code:"EPSG:3610"},{description:"NAD83(NSRS2007) / Nevada West",code:"EPSG:3611"},{description:"NAD83(NSRS2007) / Nevada West (ft US)",code:"EPSG:3612"},{description:"NAD83(NSRS2007) / New Hampshire",code:"EPSG:3613"},{description:"NAD83(NSRS2007) / New Hampshire (ftUS)",code:"EPSG:3614"},{description:"NAD83(NSRS2007) / New Jersey",code:"EPSG:3615"},{description:"NAD83(NSRS2007) / New Jersey (ft US)",code:"EPSG:3616"},{description:"NAD83(NSRS2007) / New Mexico Central",code:"EPSG:3617"},{description:"NAD83(NSRS2007) / New Mexico Central (ftUS)",code:"EPSG:3618"},{description:"NAD83(NSRS2007) / New Mexico East",code:"EPSG:3619"},{description:"NAD83(NSRS2007) / New Mexico East (ftUS)",code:"EPSG:3620"},{description:"NAD83(NSRS2007) / New Mexico West",code:"EPSG:3621"},{description:"NAD83(NSRS2007) / New Mexico West (ftUS)",code:"EPSG:3622"},{description:"NAD83(NSRS2007) / New York Central",code:"EPSG:3623"},{description:"NAD83(NSRS2007) / New York Central (ftUS)",code:"EPSG:3624"},{description:"NAD83(NSRS2007) / New York East",code:"EPSG:3625"},{description:"NAD83(NSRS2007) / New York East (ftUS)",code:"EPSG:3626"},{description:"NAD83(NSRS2007) / New York Long Island",code:"EPSG:3627"},{description:"NAD83(NSRS2007) / New York Long Island (ftUS)",code:"EPSG:3628"},{description:"NAD83(NSRS2007) / New York West",code:"EPSG:3629"},{description:"NAD83(NSRS2007) / New York West (ftUS)",code:"EPSG:3630"},{description:"NAD83(NSRS2007) / North Carolina",code:"EPSG:3631"},{description:"NAD83(NSRS2007) / North Carolina (ftUS)",code:"EPSG:3632"},{description:"NAD83(NSRS2007) / North Dakota North",code:"EPSG:3633"},{description:"NAD83(NSRS2007) / North Dakota North (ft)",code:"EPSG:3634"},{description:"NAD83(NSRS2007) / North Dakota South",code:"EPSG:3635"},{description:"NAD83(NSRS2007) / North Dakota South (ft)",code:"EPSG:3636"},{description:"NAD83(NSRS2007) / Ohio North",code:"EPSG:3637"},{description:"NAD83(NSRS2007) / Ohio South",code:"EPSG:3638"},{description:"NAD83(NSRS2007) / Oklahoma North",code:"EPSG:3639"},{description:"NAD83(NSRS2007) / Oklahoma North (ftUS)",code:"EPSG:3640"},{description:"NAD83(NSRS2007) / Oklahoma South",code:"EPSG:3641"},{description:"NAD83(NSRS2007) / Oklahoma South (ftUS)",code:"EPSG:3642"},{description:"NAD83(NSRS2007) / Oregon Lambert",code:"EPSG:3643"},{description:"NAD83(NSRS2007) / Oregon Lambert (ft)",code:"EPSG:3644"},{description:"NAD83(NSRS2007) / Oregon North",code:"EPSG:3645"},{description:"NAD83(NSRS2007) / Oregon North (ft)",code:"EPSG:3646"},{description:"NAD83(NSRS2007) / Oregon South",code:"EPSG:3647"},{description:"NAD83(NSRS2007) / Oregon South (ft)",code:"EPSG:3648"},{description:"NAD83(NSRS2007) / Pennsylvania North",code:"EPSG:3649"},{description:"NAD83(NSRS2007) / Pennsylvania North (ftUS)",code:"EPSG:3650"},{description:"NAD83(NSRS2007) / Pennsylvania South",code:"EPSG:3651"},{description:"NAD83(NSRS2007) / Pennsylvania South (ftUS)",code:"EPSG:3652"},{description:"NAD83(NSRS2007) / Rhode Island",code:"EPSG:3653"},{description:"NAD83(NSRS2007) / Rhode Island (ftUS)",code:"EPSG:3654"},{description:"NAD83(NSRS2007) / South Carolina",code:"EPSG:3655"},{description:"NAD83(NSRS2007) / South Carolina (ft)",code:"EPSG:3656"},{description:"NAD83(NSRS2007) / South Dakota North",code:"EPSG:3657"},{description:"NAD83(NSRS2007) / South Dakota North (ftUS)",code:"EPSG:3658"},{description:"NAD83(NSRS2007) / South Dakota South",code:"EPSG:3659"},{description:"NAD83(NSRS2007) / South Dakota South (ftUS)",code:"EPSG:3660"},{description:"NAD83(NSRS2007) / Tennessee",code:"EPSG:3661"},{description:"NAD83(NSRS2007) / Tennessee (ftUS)",code:"EPSG:3662"},{description:"NAD83(NSRS2007) / Texas Central",code:"EPSG:3663"},{description:"NAD83(NSRS2007) / Texas Central (ftUS)",code:"EPSG:3664"},{description:"NAD83(NSRS2007) / Texas Centric Albers Equal Area",code:"EPSG:3665"},{description:"NAD83(NSRS2007) / Texas Centric Lambert Conformal",code:"EPSG:3666"},{description:"NAD83(NSRS2007) / Texas North",code:"EPSG:3667"},{description:"NAD83(NSRS2007) / Texas North (ftUS)",code:"EPSG:3668"},{description:"NAD83(NSRS2007) / Texas North Central",code:"EPSG:3669"},{description:"NAD83(NSRS2007) / Texas North Central (ftUS)",code:"EPSG:3670"},{description:"NAD83(NSRS2007) / Texas South",code:"EPSG:3671"},{description:"NAD83(NSRS2007) / Texas South (ftUS)",code:"EPSG:3672"},{description:"NAD83(NSRS2007) / Texas South Central",code:"EPSG:3673"},{description:"NAD83(NSRS2007) / Texas South Central (ftUS)",code:"EPSG:3674"},{description:"NAD83(NSRS2007) / Utah Central",code:"EPSG:3675"},{description:"NAD83(NSRS2007) / Utah Central (ft)",code:"EPSG:3676"},{description:"NAD83(NSRS2007) / Utah Central (ftUS)",code:"EPSG:3677"},{description:"NAD83(NSRS2007) / Utah North",code:"EPSG:3678"},{description:"NAD83(NSRS2007) / Utah North (ft)",code:"EPSG:3679"},{description:"NAD83(NSRS2007) / Utah North (ftUS)",code:"EPSG:3680"},{description:"NAD83(NSRS2007) / Utah South",code:"EPSG:3681"},{description:"NAD83(NSRS2007) / Utah South (ft)",code:"EPSG:3682"},{description:"NAD83(NSRS2007) / Utah South (ftUS)",code:"EPSG:3683"},{description:"NAD83(NSRS2007) / Vermont",code:"EPSG:3684"},{description:"NAD83(NSRS2007) / Virginia North",code:"EPSG:3685"},{description:"NAD83(NSRS2007) / Virginia North (ftUS)",code:"EPSG:3686"},{description:"NAD83(NSRS2007) / Virginia South",code:"EPSG:3687"},{description:"NAD83(NSRS2007) / Virginia South (ftUS)",code:"EPSG:3688"},{description:"NAD83(NSRS2007) / Washington North",code:"EPSG:3689"},{description:"NAD83(NSRS2007) / Washington North (ftUS)",code:"EPSG:3690"},{description:"NAD83(NSRS2007) / Washington South",code:"EPSG:3691"},{description:"NAD83(NSRS2007) / Washington South (ftUS)",code:"EPSG:3692"},{description:"NAD83(NSRS2007) / West Virginia North",code:"EPSG:3693"},{description:"NAD83(NSRS2007) / West Virginia South",code:"EPSG:3694"},{description:"NAD83(NSRS2007) / Wisconsin Central",code:"EPSG:3695"},{description:"NAD83(NSRS2007) / Wisconsin Central (ftUS)",code:"EPSG:3696"},{description:"NAD83(NSRS2007) / Wisconsin North",code:"EPSG:3697"},{description:"NAD83(NSRS2007) / Wisconsin North (ftUS)",code:"EPSG:3698"},{description:"NAD83(NSRS2007) / Wisconsin South",code:"EPSG:3699"},{description:"NAD83(NSRS2007) / Wisconsin South (ftUS)",code:"EPSG:3700"},{description:"NAD83(NSRS2007) / Wisconsin Transverse Mercator",code:"EPSG:3701"},{description:"NAD83(NSRS2007) / Wyoming East",code:"EPSG:3702"},{description:"NAD83(NSRS2007) / Wyoming East Central",code:"EPSG:3703"},{description:"NAD83(NSRS2007) / Wyoming West Central",code:"EPSG:3704"},{description:"NAD83(NSRS2007) / Wyoming West",code:"EPSG:3705"},{description:"NAD83(NSRS2007) / UTM zone 59N",code:"EPSG:3706"},{description:"NAD83(NSRS2007) / UTM zone 60N",code:"EPSG:3707"},{description:"NAD83(NSRS2007) / UTM zone 1N",code:"EPSG:3708"},{description:"NAD83(NSRS2007) / UTM zone 2N",code:"EPSG:3709"},{description:"NAD83(NSRS2007) / UTM zone 3N",code:"EPSG:3710"},{description:"NAD83(NSRS2007) / UTM zone 4N",code:"EPSG:3711"},{description:"NAD83(NSRS2007) / UTM zone 5N",code:"EPSG:3712"},{description:"NAD83(NSRS2007) / UTM zone 6N",code:"EPSG:3713"},{description:"NAD83(NSRS2007) / UTM zone 7N",code:"EPSG:3714"},{description:"NAD83(NSRS2007) / UTM zone 8N",code:"EPSG:3715"},{description:"NAD83(NSRS2007) / UTM zone 9N",code:"EPSG:3716"},{description:"NAD83(NSRS2007) / UTM zone 10N",code:"EPSG:3717"},{description:"NAD83(NSRS2007) / UTM zone 11N",code:"EPSG:3718"},{description:"NAD83(NSRS2007) / UTM zone 12N",code:"EPSG:3719"},{description:"NAD83(NSRS2007) / UTM zone 13N",code:"EPSG:3720"},{description:"NAD83(NSRS2007) / UTM zone 14N",code:"EPSG:3721"},{description:"NAD83(NSRS2007) / UTM zone 15N",code:"EPSG:3722"},{description:"NAD83(NSRS2007) / UTM zone 16N",code:"EPSG:3723"},{description:"NAD83(NSRS2007) / UTM zone 17N",code:"EPSG:3724"},{description:"NAD83(NSRS2007) / UTM zone 18N",code:"EPSG:3725"},{description:"NAD83(NSRS2007) / UTM zone 19N",code:"EPSG:3726"},{description:"Reunion 1947 / TM Reunion",code:"EPSG:3727"},{description:"NAD83(NSRS2007) / Ohio North (ftUS)",code:"EPSG:3728"},{description:"NAD83(NSRS2007) / Ohio South (ftUS)",code:"EPSG:3729"},{description:"NAD83(NSRS2007) / Wyoming East (ftUS)",code:"EPSG:3730"},{description:"NAD83(NSRS2007) / Wyoming East Central (ftUS)",code:"EPSG:3731"},{description:"NAD83(NSRS2007) / Wyoming West Central (ftUS)",code:"EPSG:3732"},{description:"NAD83(NSRS2007) / Wyoming West (ftUS)",code:"EPSG:3733"},{description:"NAD83 / Ohio North (ftUS)",code:"EPSG:3734"},{description:"NAD83 / Ohio South (ftUS)",code:"EPSG:3735"},{description:"NAD83 / Wyoming East (ftUS)",code:"EPSG:3736"},{description:"NAD83 / Wyoming East Central (ftUS)",code:"EPSG:3737"},{description:"NAD83 / Wyoming West Central (ftUS)",code:"EPSG:3738"},{description:"NAD83 / Wyoming West (ftUS)",code:"EPSG:3739"},{description:"NAD83(HARN) / UTM zone 10N",code:"EPSG:3740"},{description:"NAD83(HARN) / UTM zone 11N",code:"EPSG:3741"},{description:"NAD83(HARN) / UTM zone 12N",code:"EPSG:3742"},{description:"NAD83(HARN) / UTM zone 13N",code:"EPSG:3743"},{description:"NAD83(HARN) / UTM zone 14N",code:"EPSG:3744"},{description:"NAD83(HARN) / UTM zone 15N",code:"EPSG:3745"},{description:"NAD83(HARN) / UTM zone 16N",code:"EPSG:3746"},{description:"NAD83(HARN) / UTM zone 17N",code:"EPSG:3747"},{description:"NAD83(HARN) / UTM zone 18N",code:"EPSG:3748"},{description:"NAD83(HARN) / UTM zone 19N",code:"EPSG:3749"},{description:"NAD83(HARN) / UTM zone 4N",code:"EPSG:3750"},{description:"NAD83(HARN) / UTM zone 5N",code:"EPSG:3751"},{description:"WGS 84 / Mercator 41",code:"EPSG:3752"},{description:"NAD83(HARN) / Ohio North (ftUS)",code:"EPSG:3753"},{description:"NAD83(HARN) / Ohio South (ftUS)",code:"EPSG:3754"},{description:"NAD83(HARN) / Wyoming East (ftUS)",code:"EPSG:3755"},{description:"NAD83(HARN) / Wyoming East Central (ftUS)",code:"EPSG:3756"},{description:"NAD83(HARN) / Wyoming West Central (ftUS)",code:"EPSG:3757"},{description:"NAD83(HARN) / Wyoming West (ftUS)",code:"EPSG:3758"},{description:"NAD83 / Hawaii zone 3 (ftUS)",code:"EPSG:3759"},{description:"NAD83(HARN) / Hawaii zone 3 (ftUS)",code:"EPSG:3760"},{description:"NAD83(CSRS) / UTM zone 22N",code:"EPSG:3761"},{description:"WGS 84 / South Georgia Lambert",code:"EPSG:3762"},{description:"ETRS89 / Portugal TM06",code:"EPSG:3763"},{description:"NZGD2000 / Chatham Island Circuit 2000",code:"EPSG:3764"},{description:"HTRS96 / Croatia TM",code:"EPSG:3765"},{description:"HTRS96 / Croatia LCC",code:"EPSG:3766"},{description:"HTRS96 / UTM zone 33N",code:"EPSG:3767"},{description:"HTRS96 / UTM zone 34N",code:"EPSG:3768"},{description:"Bermuda 1957 / UTM zone 20N",code:"EPSG:3769"},{description:"BDA2000 / Bermuda 2000 National Grid",code:"EPSG:3770"},{description:"NAD27 / Alberta 3TM ref merid 111 W",code:"EPSG:3771"},{description:"NAD27 / Alberta 3TM ref merid 114 W",code:"EPSG:3772"},{description:"NAD27 / Alberta 3TM ref merid 117 W",code:"EPSG:3773"},{description:"NAD27 / Alberta 3TM ref merid 120 W",code:"EPSG:3774"},{description:"NAD83 / Alberta 3TM ref merid 111 W",code:"EPSG:3775"},{description:"NAD83 / Alberta 3TM ref merid 114 W",code:"EPSG:3776"},{description:"NAD83 / Alberta 3TM ref merid 117 W",code:"EPSG:3777"},{description:"NAD83 / Alberta 3TM ref merid 120 W",code:"EPSG:3778"},{description:"NAD83(CSRS) / Alberta 3TM ref merid 111 W",code:"EPSG:3779"},{description:"NAD83(CSRS) / Alberta 3TM ref merid 114 W",code:"EPSG:3780"},{description:"NAD83(CSRS) / Alberta 3TM ref merid 117 W",code:"EPSG:3781"},{description:"NAD83(CSRS) / Alberta 3TM ref merid 120 W",code:"EPSG:3782"},{description:"Pitcairn 2006 / Pitcairn TM 2006",code:"EPSG:3783"},{description:"Pitcairn 1967 / UTM zone 9S",code:"EPSG:3784"},{description:"Popular Visualisation CRS / Mercator",code:"EPSG:3785"},{description:"World Equidistant Cylindrical (Sphere)",code:"EPSG:3786"},{description:"MGI / Slovene National Grid",code:"EPSG:3787"},{description:"NZGD2000 / Auckland Islands TM 2000",code:"EPSG:3788"},{description:"NZGD2000 / Campbell Island TM 2000",code:"EPSG:3789"},{description:"NZGD2000 / Antipodes Islands TM 2000",code:"EPSG:3790"},{description:"NZGD2000 / Raoul Island TM 2000",code:"EPSG:3791"},{description:"NZGD2000 / Chatham Islands TM 2000",code:"EPSG:3793"},{description:"Slovenia 1996 / Slovene National Grid",code:"EPSG:3794"},{description:"NAD27 / Cuba Norte",code:"EPSG:3795"},{description:"NAD27 / Cuba Sur",code:"EPSG:3796"},{description:"NAD27 / MTQ Lambert",code:"EPSG:3797"},{description:"NAD83 / MTQ Lambert",code:"EPSG:3798"},{description:"NAD83(CSRS) / MTQ Lambert",code:"EPSG:3799"},{description:"NAD27 / Alberta 3TM ref merid 120 W",code:"EPSG:3800"},{description:"NAD83 / Alberta 3TM ref merid 120 W",code:"EPSG:3801"},{description:"NAD83(CSRS) / Alberta 3TM ref merid 120 W",code:"EPSG:3802"},{description:"ETRS89 / Belgian Lambert 2008",code:"EPSG:3812"},{description:"NAD83 / Mississippi TM",code:"EPSG:3814"},{description:"NAD83(HARN) / Mississippi TM",code:"EPSG:3815"},{description:"NAD83(NSRS2007) / Mississippi TM",code:"EPSG:3816"},{description:"TWD97 / TM2 zone 119",code:"EPSG:3825"},{description:"TWD97 / TM2 zone 121",code:"EPSG:3826"},{description:"TWD67 / TM2 zone 119",code:"EPSG:3827"},{description:"TWD67 / TM2 zone 121",code:"EPSG:3828"},{description:"Hu Tzu Shan / UTM zone 51N",code:"EPSG:3829"},{description:"WGS 84 / PDC Mercator",code:"EPSG:3832"},{description:"Pulkovo 1942(58) / Gauss-Kruger zone 2",code:"EPSG:3833"},{description:"Pulkovo 1942(83) / Gauss-Kruger zone 2",code:"EPSG:3834"},{description:"Pulkovo 1942(83) / Gauss-Kruger zone 3",code:"EPSG:3835"},{description:"Pulkovo 1942(83) / Gauss-Kruger zone 4",code:"EPSG:3836"},{description:"Pulkovo 1942(58) / 3-degree Gauss-Kruger zone 3",code:"EPSG:3837"},{description:"Pulkovo 1942(58) / 3-degree Gauss-Kruger zone 4",code:"EPSG:3838"},{description:"Pulkovo 1942(58) / 3-degree Gauss-Kruger zone 9",code:"EPSG:3839"},{description:"Pulkovo 1942(58) / 3-degree Gauss-Kruger zone 10",code:"EPSG:3840"},{description:"Pulkovo 1942(83) / 3-degree Gauss-Kruger zone 6",code:"EPSG:3841"},{description:"Pulkovo 1942(83) / 3-degree Gauss-Kruger zone 7",code:"EPSG:3842"},{description:"Pulkovo 1942(83) / 3-degree Gauss-Kruger zone 8",code:"EPSG:3843"},{description:"Pulkovo 1942(58) / Stereo70",code:"EPSG:3844"},{description:"SWEREF99 / RT90 7.5 gon V emulation",code:"EPSG:3845"},{description:"SWEREF99 / RT90 5 gon V emulation",code:"EPSG:3846"},{description:"SWEREF99 / RT90 2.5 gon V emulation",code:"EPSG:3847"},{description:"SWEREF99 / RT90 0 gon emulation",code:"EPSG:3848"},{description:"SWEREF99 / RT90 2.5 gon O emulation",code:"EPSG:3849"},{description:"SWEREF99 / RT90 5 gon O emulation",code:"EPSG:3850"},{description:"NZGD2000 / NZCS2000",code:"EPSG:3851"},{description:"RSRGD2000 / DGLC2000",code:"EPSG:3852"},{description:"County ST74",code:"EPSG:3854"},{description:"WGS 84 / Pseudo-Mercator",code:"EPSG:3857"},{description:"WGS 84 / Pseudo-Mercator",code:"EPSG:900913"},{description:"IGRS / UTM zone 37N",code:"EPSG:3890"},{description:"IGRS / UTM zone 38N",code:"EPSG:3891"},{description:"IGRS / UTM zone 39N",code:"EPSG:3892"},{description:"ED50 / Iraq National Grid",code:"EPSG:3893"},{description:"MGI 1901 / Balkans zone 5",code:"EPSG:3907"},{description:"MGI 1901 / Balkans zone 6",code:"EPSG:3908"},{description:"MGI 1901 / Balkans zone 7",code:"EPSG:3909"},{description:"MGI 1901 / Balkans zone 8",code:"EPSG:3910"},{description:"MGI 1901 / Slovenia Grid",code:"EPSG:3911"},{description:"MGI 1901 / Slovene National Grid",code:"EPSG:3912"},{description:"Puerto Rico / UTM zone 20N",code:"EPSG:3920"},{description:"RGF93 / CC42",code:"EPSG:3942"},{description:"RGF93 / CC43",code:"EPSG:3943"},{description:"RGF93 / CC44",code:"EPSG:3944"},{description:"RGF93 / CC45",code:"EPSG:3945"},{description:"RGF93 / CC46",code:"EPSG:3946"},{description:"RGF93 / CC47",code:"EPSG:3947"},{description:"RGF93 / CC48",code:"EPSG:3948"},{description:"RGF93 / CC49",code:"EPSG:3949"},{description:"RGF93 / CC50",code:"EPSG:3950"},{description:"NAD83 / Virginia Lambert",code:"EPSG:3968"},{description:"NAD83(HARN) / Virginia Lambert",code:"EPSG:3969"},{description:"NAD83(NSRS2007) / Virginia Lambert",code:"EPSG:3970"},{description:"WGS 84 / NSIDC EASE-Grid North",code:"EPSG:3973"},{description:"WGS 84 / NSIDC EASE-Grid South",code:"EPSG:3974"},{description:"WGS 84 / NSIDC EASE-Grid Global",code:"EPSG:3975"},{description:"WGS 84 / NSIDC Sea Ice Polar Stereographic South",code:"EPSG:3976"},{description:"NAD83 / Canada Atlas Lambert",code:"EPSG:3978"},{description:"NAD83(CSRS) / Canada Atlas Lambert",code:"EPSG:3979"},{description:"Katanga 1955 / Katanga Lambert",code:"EPSG:3985"},{description:"Katanga 1955 / Katanga Gauss zone A",code:"EPSG:3986"},{description:"Katanga 1955 / Katanga Gauss zone B",code:"EPSG:3987"},{description:"Katanga 1955 / Katanga Gauss zone C",code:"EPSG:3988"},{description:"Katanga 1955 / Katanga Gauss zone D",code:"EPSG:3989"},{description:"Puerto Rico State Plane CS of 1927",code:"EPSG:3991"},{description:"Puerto Rico / St. Croix",code:"EPSG:3992"},{description:"Guam 1963 / Guam SPCS",code:"EPSG:3993"},{description:"WGS 84 / Mercator 41",code:"EPSG:3994"},{description:"WGS 84 / Arctic Polar Stereographic",code:"EPSG:3995"},{description:"WGS 84 / IBCAO Polar Stereographic",code:"EPSG:3996"},{description:"WGS 84 / Dubai Local TM",code:"EPSG:3997"},{description:"MOLDREF99 / Moldova TM",code:"EPSG:4026"},{description:"WGS 84 / TMzn35N",code:"EPSG:4037"},{description:"WGS 84 / TMzn36N",code:"EPSG:4038"},{description:"RGRDC 2005 / Congo TM zone 12",code:"EPSG:4048"},{description:"RGRDC 2005 / Congo TM zone 14",code:"EPSG:4049"},{description:"RGRDC 2005 / Congo TM zone 16",code:"EPSG:4050"},{description:"RGRDC 2005 / Congo TM zone 18",code:"EPSG:4051"},{description:"RGRDC 2005 / Congo TM zone 20",code:"EPSG:4056"},{description:"RGRDC 2005 / Congo TM zone 22",code:"EPSG:4057"},{description:"RGRDC 2005 / Congo TM zone 24",code:"EPSG:4058"},{description:"RGRDC 2005 / Congo TM zone 26",code:"EPSG:4059"},{description:"RGRDC 2005 / Congo TM zone 28",code:"EPSG:4060"},{description:"RGRDC 2005 / UTM zone 33S",code:"EPSG:4061"},{description:"RGRDC 2005 / UTM zone 34S",code:"EPSG:4062"},{description:"RGRDC 2005 / UTM zone 35S",code:"EPSG:4063"},{description:"Chua / UTM zone 23S",code:"EPSG:4071"},{description:"REGCAN95 / UTM zone 27N",code:"EPSG:4082"},{description:"REGCAN95 / UTM zone 28N",code:"EPSG:4083"},{description:"WGS 84 / World Equidistant Cylindrical",code:"EPSG:4087"},{description:"World Equidistant Cylindrical (Sphere)",code:"EPSG:4088"},{description:"EPSG topocentric example A",code:"EPSG:5819"},{description:"EPSG topocentric example B",code:"EPSG:5820"},{description:"EPSG vertical perspective example",code:"EPSG:5821"},{description:"Pulkovo 1995 / Gauss-Kruger zone 4",code:"EPSG:20004"},{description:"Pulkovo 1995 / Gauss-Kruger zone 5",code:"EPSG:20005"},{description:"Pulkovo 1995 / Gauss-Kruger zone 6",code:"EPSG:20006"},{description:"Pulkovo 1995 / Gauss-Kruger zone 7",code:"EPSG:20007"},{description:"Pulkovo 1995 / Gauss-Kruger zone 8",code:"EPSG:20008"},{description:"Pulkovo 1995 / Gauss-Kruger zone 9",code:"EPSG:20009"},{description:"Pulkovo 1995 / Gauss-Kruger zone 10",code:"EPSG:20010"},{description:"Pulkovo 1995 / Gauss-Kruger zone 11",code:"EPSG:20011"},{description:"Pulkovo 1995 / Gauss-Kruger zone 12",code:"EPSG:20012"},{description:"Pulkovo 1995 / Gauss-Kruger zone 13",code:"EPSG:20013"},{description:"Pulkovo 1995 / Gauss-Kruger zone 14",code:"EPSG:20014"},{description:"Pulkovo 1995 / Gauss-Kruger zone 15",code:"EPSG:20015"},{description:"Pulkovo 1995 / Gauss-Kruger zone 16",code:"EPSG:20016"},{description:"Pulkovo 1995 / Gauss-Kruger zone 17",code:"EPSG:20017"},{description:"Pulkovo 1995 / Gauss-Kruger zone 18",code:"EPSG:20018"},{description:"Pulkovo 1995 / Gauss-Kruger zone 19",code:"EPSG:20019"},{description:"Pulkovo 1995 / Gauss-Kruger zone 20",code:"EPSG:20020"},{description:"Pulkovo 1995 / Gauss-Kruger zone 21",code:"EPSG:20021"},{description:"Pulkovo 1995 / Gauss-Kruger zone 22",code:"EPSG:20022"},{description:"Pulkovo 1995 / Gauss-Kruger zone 23",code:"EPSG:20023"},{description:"Pulkovo 1995 / Gauss-Kruger zone 24",code:"EPSG:20024"},{description:"Pulkovo 1995 / Gauss-Kruger zone 25",code:"EPSG:20025"},{description:"Pulkovo 1995 / Gauss-Kruger zone 26",code:"EPSG:20026"},{description:"Pulkovo 1995 / Gauss-Kruger zone 27",code:"EPSG:20027"},{description:"Pulkovo 1995 / Gauss-Kruger zone 28",code:"EPSG:20028"},{description:"Pulkovo 1995 / Gauss-Kruger zone 29",code:"EPSG:20029"},{description:"Pulkovo 1995 / Gauss-Kruger zone 30",code:"EPSG:20030"},{description:"Pulkovo 1995 / Gauss-Kruger zone 31",code:"EPSG:20031"},{description:"Pulkovo 1995 / Gauss-Kruger zone 32",code:"EPSG:20032"},{description:"Pulkovo 1995 / Gauss-Kruger 4N",code:"EPSG:20064"},{description:"Pulkovo 1995 / Gauss-Kruger 5N",code:"EPSG:20065"},{description:"Pulkovo 1995 / Gauss-Kruger 6N",code:"EPSG:20066"},{description:"Pulkovo 1995 / Gauss-Kruger 7N",code:"EPSG:20067"},{description:"Pulkovo 1995 / Gauss-Kruger 8N",code:"EPSG:20068"},{description:"Pulkovo 1995 / Gauss-Kruger 9N",code:"EPSG:20069"},{description:"Pulkovo 1995 / Gauss-Kruger 10N",code:"EPSG:20070"},{description:"Pulkovo 1995 / Gauss-Kruger 11N",code:"EPSG:20071"},{description:"Pulkovo 1995 / Gauss-Kruger 12N",code:"EPSG:20072"},{description:"Pulkovo 1995 / Gauss-Kruger 13N",code:"EPSG:20073"},{description:"Pulkovo 1995 / Gauss-Kruger 14N",code:"EPSG:20074"},{description:"Pulkovo 1995 / Gauss-Kruger 15N",code:"EPSG:20075"},{description:"Pulkovo 1995 / Gauss-Kruger 16N",code:"EPSG:20076"},{description:"Pulkovo 1995 / Gauss-Kruger 17N",code:"EPSG:20077"},{description:"Pulkovo 1995 / Gauss-Kruger 18N",code:"EPSG:20078"},{description:"Pulkovo 1995 / Gauss-Kruger 19N",code:"EPSG:20079"},{description:"Pulkovo 1995 / Gauss-Kruger 20N",code:"EPSG:20080"},{description:"Pulkovo 1995 / Gauss-Kruger 21N",code:"EPSG:20081"},{description:"Pulkovo 1995 / Gauss-Kruger 22N",code:"EPSG:20082"},{description:"Pulkovo 1995 / Gauss-Kruger 23N",code:"EPSG:20083"},{description:"Pulkovo 1995 / Gauss-Kruger 24N",code:"EPSG:20084"},{description:"Pulkovo 1995 / Gauss-Kruger 25N",code:"EPSG:20085"},{description:"Pulkovo 1995 / Gauss-Kruger 26N",code:"EPSG:20086"},{description:"Pulkovo 1995 / Gauss-Kruger 27N",code:"EPSG:20087"},{description:"Pulkovo 1995 / Gauss-Kruger 28N",code:"EPSG:20088"},{description:"Pulkovo 1995 / Gauss-Kruger 29N",code:"EPSG:20089"},{description:"Pulkovo 1995 / Gauss-Kruger 30N",code:"EPSG:20090"},{description:"Pulkovo 1995 / Gauss-Kruger 31N",code:"EPSG:20091"},{description:"Pulkovo 1995 / Gauss-Kruger 32N",code:"EPSG:20092"},{description:"Adindan / UTM zone 35N",code:"EPSG:20135"},{description:"Adindan / UTM zone 36N",code:"EPSG:20136"},{description:"Adindan / UTM zone 37N",code:"EPSG:20137"},{description:"Adindan / UTM zone 38N",code:"EPSG:20138"},{description:"AGD66 / AMG zone 48",code:"EPSG:20248"},{description:"AGD66 / AMG zone 49",code:"EPSG:20249"},{description:"AGD66 / AMG zone 50",code:"EPSG:20250"},{description:"AGD66 / AMG zone 51",code:"EPSG:20251"},{description:"AGD66 / AMG zone 52",code:"EPSG:20252"},{description:"AGD66 / AMG zone 53",code:"EPSG:20253"},{description:"AGD66 / AMG zone 54",code:"EPSG:20254"},{description:"AGD66 / AMG zone 55",code:"EPSG:20255"},{description:"AGD66 / AMG zone 56",code:"EPSG:20256"},{description:"AGD66 / AMG zone 57",code:"EPSG:20257"},{description:"AGD66 / AMG zone 58",code:"EPSG:20258"},{description:"AGD84 / AMG zone 48",code:"EPSG:20348"},{description:"AGD84 / AMG zone 49",code:"EPSG:20349"},{description:"AGD84 / AMG zone 50",code:"EPSG:20350"},{description:"AGD84 / AMG zone 51",code:"EPSG:20351"},{description:"AGD84 / AMG zone 52",code:"EPSG:20352"},{description:"AGD84 / AMG zone 53",code:"EPSG:20353"},{description:"AGD84 / AMG zone 54",code:"EPSG:20354"},{description:"AGD84 / AMG zone 55",code:"EPSG:20355"},{description:"AGD84 / AMG zone 56",code:"EPSG:20356"},{description:"AGD84 / AMG zone 57",code:"EPSG:20357"},{description:"AGD84 / AMG zone 58",code:"EPSG:20358"},{description:"Ain el Abd / UTM zone 36N",code:"EPSG:20436"},{description:"Ain el Abd / UTM zone 37N",code:"EPSG:20437"},{description:"Ain el Abd / UTM zone 38N",code:"EPSG:20438"},{description:"Ain el Abd / UTM zone 39N",code:"EPSG:20439"},{description:"Ain el Abd / UTM zone 40N",code:"EPSG:20440"},{description:"Ain el Abd / Bahrain Grid",code:"EPSG:20499"},{description:"Afgooye / UTM zone 38N",code:"EPSG:20538"},{description:"Afgooye / UTM zone 39N",code:"EPSG:20539"},{description:"Lisbon (Lisbon) / Portuguese National Grid",code:"EPSG:20790"},{description:"Lisbon (Lisbon) / Portuguese Grid",code:"EPSG:20791"},{description:"Aratu / UTM zone 22S",code:"EPSG:20822"},{description:"Aratu / UTM zone 23S",code:"EPSG:20823"},{description:"Aratu / UTM zone 24S",code:"EPSG:20824"},{description:"Arc 1950 / UTM zone 34S",code:"EPSG:20934"},{description:"Arc 1950 / UTM zone 35S",code:"EPSG:20935"},{description:"Arc 1950 / UTM zone 36S",code:"EPSG:20936"},{description:"Arc 1960 / UTM zone 35S",code:"EPSG:21035"},{description:"Arc 1960 / UTM zone 36S",code:"EPSG:21036"},{description:"Arc 1960 / UTM zone 37S",code:"EPSG:21037"},{description:"Arc 1960 / UTM zone 35N",code:"EPSG:21095"},{description:"Arc 1960 / UTM zone 36N",code:"EPSG:21096"},{description:"Arc 1960 / UTM zone 37N",code:"EPSG:21097"},{description:"Batavia (Jakarta) / NEIEZ",code:"EPSG:21100"},{description:"Batavia / UTM zone 48S",code:"EPSG:21148"},{description:"Batavia / UTM zone 49S",code:"EPSG:21149"},{description:"Batavia / UTM zone 50S",code:"EPSG:21150"},{description:"Barbados 1938 / British West Indies Grid",code:"EPSG:21291"},{description:"Barbados 1938 / Barbados National Grid",code:"EPSG:21292"},{description:"Beijing 1954 / Gauss-Kruger zone 13",code:"EPSG:21413"},{description:"Beijing 1954 / Gauss-Kruger zone 14",code:"EPSG:21414"},{description:"Beijing 1954 / Gauss-Kruger zone 15",code:"EPSG:21415"},{description:"Beijing 1954 / Gauss-Kruger zone 16",code:"EPSG:21416"},{description:"Beijing 1954 / Gauss-Kruger zone 17",code:"EPSG:21417"},{description:"Beijing 1954 / Gauss-Kruger zone 18",code:"EPSG:21418"},{description:"Beijing 1954 / Gauss-Kruger zone 19",code:"EPSG:21419"},{description:"Beijing 1954 / Gauss-Kruger zone 20",code:"EPSG:21420"},{description:"Beijing 1954 / Gauss-Kruger zone 21",code:"EPSG:21421"},{description:"Beijing 1954 / Gauss-Kruger zone 22",code:"EPSG:21422"},{description:"Beijing 1954 / Gauss-Kruger zone 23",code:"EPSG:21423"},{description:"Beijing 1954 / Gauss-Kruger CM 75E",code:"EPSG:21453"},{description:"Beijing 1954 / Gauss-Kruger CM 81E",code:"EPSG:21454"},{description:"Beijing 1954 / Gauss-Kruger CM 87E",code:"EPSG:21455"},{description:"Beijing 1954 / Gauss-Kruger CM 93E",code:"EPSG:21456"},{description:"Beijing 1954 / Gauss-Kruger CM 99E",code:"EPSG:21457"},{description:"Beijing 1954 / Gauss-Kruger CM 105E",code:"EPSG:21458"},{description:"Beijing 1954 / Gauss-Kruger CM 111E",code:"EPSG:21459"},{description:"Beijing 1954 / Gauss-Kruger CM 117E",code:"EPSG:21460"},{description:"Beijing 1954 / Gauss-Kruger CM 123E",code:"EPSG:21461"},{description:"Beijing 1954 / Gauss-Kruger CM 129E",code:"EPSG:21462"},{description:"Beijing 1954 / Gauss-Kruger CM 135E",code:"EPSG:21463"},{description:"Beijing 1954 / Gauss-Kruger 13N",code:"EPSG:21473"},{description:"Beijing 1954 / Gauss-Kruger 14N",code:"EPSG:21474"},{description:"Beijing 1954 / Gauss-Kruger 15N",code:"EPSG:21475"},{description:"Beijing 1954 / Gauss-Kruger 16N",code:"EPSG:21476"},{description:"Beijing 1954 / Gauss-Kruger 17N",code:"EPSG:21477"},{description:"Beijing 1954 / Gauss-Kruger 18N",code:"EPSG:21478"},{description:"Beijing 1954 / Gauss-Kruger 19N",code:"EPSG:21479"},{description:"Beijing 1954 / Gauss-Kruger 20N",code:"EPSG:21480"},{description:"Beijing 1954 / Gauss-Kruger 21N",code:"EPSG:21481"},{description:"Beijing 1954 / Gauss-Kruger 22N",code:"EPSG:21482"},{description:"Beijing 1954 / Gauss-Kruger 23N",code:"EPSG:21483"},{description:"Belge 1950 (Brussels) / Belge Lambert 50",code:"EPSG:21500"},{description:"Bern 1898 (Bern) / LV03C",code:"EPSG:21780"},{description:"CH1903 / LV03",code:"EPSG:21781"},{description:"CH1903 / LV03C-G",code:"EPSG:21782"},{description:"Bogota 1975 / UTM zone 17N",code:"EPSG:21817"},{description:"Bogota 1975 / UTM zone 18N",code:"EPSG:21818"},{description:"Bogota 1975 / Colombia West zone",code:"EPSG:21891"},{description:"Bogota 1975 / Colombia Bogota zone",code:"EPSG:21892"},{description:"Bogota 1975 / Colombia East Central zone",code:"EPSG:21893"},{description:"Bogota 1975 / Colombia East",code:"EPSG:21894"},{description:"Bogota 1975 / Colombia West zone",code:"EPSG:21896"},{description:"Bogota 1975 / Colombia Bogota zone",code:"EPSG:21897"},{description:"Bogota 1975 / Colombia East Central zone",code:"EPSG:21898"},{description:"Bogota 1975 / Colombia East",code:"EPSG:21899"},{description:"Camacupa / UTM zone 32S",code:"EPSG:22032"},{description:"Camacupa / UTM zone 33S",code:"EPSG:22033"},{description:"Camacupa / TM 11.30 SE",code:"EPSG:22091"},{description:"Camacupa / TM 12 SE",code:"EPSG:22092"},{description:"POSGAR 98 / Argentina 1",code:"EPSG:22171"},{description:"POSGAR 98 / Argentina 2",code:"EPSG:22172"},{description:"POSGAR 98 / Argentina 3",code:"EPSG:22173"},{description:"POSGAR 98 / Argentina 4",code:"EPSG:22174"},{description:"POSGAR 98 / Argentina 5",code:"EPSG:22175"},{description:"POSGAR 98 / Argentina 6",code:"EPSG:22176"},{description:"POSGAR 98 / Argentina 7",code:"EPSG:22177"},{description:"POSGAR 94 / Argentina 1",code:"EPSG:22181"},{description:"POSGAR 94 / Argentina 2",code:"EPSG:22182"},{description:"POSGAR 94 / Argentina 3",code:"EPSG:22183"},{description:"POSGAR 94 / Argentina 4",code:"EPSG:22184"},{description:"POSGAR 94 / Argentina 5",code:"EPSG:22185"},{description:"POSGAR 94 / Argentina 6",code:"EPSG:22186"},{description:"POSGAR 94 / Argentina 7",code:"EPSG:22187"},{description:"Campo Inchauspe / Argentina 1",code:"EPSG:22191"},{description:"Campo Inchauspe / Argentina 2",code:"EPSG:22192"},{description:"Campo Inchauspe / Argentina 3",code:"EPSG:22193"},{description:"Campo Inchauspe / Argentina 4",code:"EPSG:22194"},{description:"Campo Inchauspe / Argentina 5",code:"EPSG:22195"},{description:"Campo Inchauspe / Argentina 6",code:"EPSG:22196"},{description:"Campo Inchauspe / Argentina 7",code:"EPSG:22197"},{description:"Cape / UTM zone 34S",code:"EPSG:22234"},{description:"Cape / UTM zone 35S",code:"EPSG:22235"},{description:"Cape / UTM zone 36S",code:"EPSG:22236"},{description:"Cape / Lo15",code:"EPSG:22275"},{description:"Cape / Lo17",code:"EPSG:22277"},{description:"Cape / Lo19",code:"EPSG:22279"},{description:"Cape / Lo21",code:"EPSG:22281"},{description:"Cape / Lo23",code:"EPSG:22283"},{description:"Cape / Lo25",code:"EPSG:22285"},{description:"Cape / Lo27",code:"EPSG:22287"},{description:"Cape / Lo29",code:"EPSG:22289"},{description:"Cape / Lo31",code:"EPSG:22291"},{description:"Cape / Lo33",code:"EPSG:22293"},{description:"Carthage (Paris) / Tunisia Mining Grid",code:"EPSG:22300"},{description:"Carthage / UTM zone 32N",code:"EPSG:22332"},{description:"Carthage / Nord Tunisie",code:"EPSG:22391"},{description:"Carthage / Sud Tunisie",code:"EPSG:22392"},{description:"Corrego Alegre / UTM zone 21S",code:"EPSG:22521"},{description:"Corrego Alegre / UTM zone 22S",code:"EPSG:22522"},{description:"Corrego Alegre / UTM zone 23S",code:"EPSG:22523"},{description:"Corrego Alegre / UTM zone 24S",code:"EPSG:22524"},{description:"Corrego Alegre / UTM zone 25S",code:"EPSG:22525"},{description:"Deir ez Zor / Levant Zone",code:"EPSG:22700"},{description:"Deir ez Zor / Syria Lambert",code:"EPSG:22770"},{description:"Deir ez Zor / Levant Stereographic",code:"EPSG:22780"},{description:"Douala / UTM zone 32N",code:"EPSG:22832"},{description:"Egypt 1907 / Blue Belt",code:"EPSG:22991"},{description:"Egypt 1907 / Red Belt",code:"EPSG:22992"},{description:"Egypt 1907 / Purple Belt",code:"EPSG:22993"},{description:"Egypt 1907 / Extended Purple Belt",code:"EPSG:22994"},{description:"ED50 / UTM zone 28N",code:"EPSG:23028"},{description:"ED50 / UTM zone 29N",code:"EPSG:23029"},{description:"ED50 / UTM zone 30N",code:"EPSG:23030"},{description:"ED50 / UTM zone 31N",code:"EPSG:23031"},{description:"ED50 / UTM zone 32N",code:"EPSG:23032"},{description:"ED50 / UTM zone 33N",code:"EPSG:23033"},{description:"ED50 / UTM zone 34N",code:"EPSG:23034"},{description:"ED50 / UTM zone 35N",code:"EPSG:23035"},{description:"ED50 / UTM zone 36N",code:"EPSG:23036"},{description:"ED50 / UTM zone 37N",code:"EPSG:23037"},{description:"ED50 / UTM zone 38N",code:"EPSG:23038"},{description:"ED50 / TM 0 N",code:"EPSG:23090"},{description:"ED50 / TM 5 NE",code:"EPSG:23095"},{description:"Fahud / UTM zone 39N",code:"EPSG:23239"},{description:"Fahud / UTM zone 40N",code:"EPSG:23240"},{description:"Garoua / UTM zone 33N",code:"EPSG:23433"},{description:"HD72 / EOV",code:"EPSG:23700"},{description:"DGN95 / Indonesia TM-3 zone 46.2",code:"EPSG:23830"},{description:"DGN95 / Indonesia TM-3 zone 47.1",code:"EPSG:23831"},{description:"DGN95 / Indonesia TM-3 zone 47.2",code:"EPSG:23832"},{description:"DGN95 / Indonesia TM-3 zone 48.1",code:"EPSG:23833"},{description:"DGN95 / Indonesia TM-3 zone 48.2",code:"EPSG:23834"},{description:"DGN95 / Indonesia TM-3 zone 49.1",code:"EPSG:23835"},{description:"DGN95 / Indonesia TM-3 zone 49.2",code:"EPSG:23836"},{description:"DGN95 / Indonesia TM-3 zone 50.1",code:"EPSG:23837"},{description:"DGN95 / Indonesia TM-3 zone 50.2",code:"EPSG:23838"},{description:"DGN95 / Indonesia TM-3 zone 51.1",code:"EPSG:23839"},{description:"DGN95 / Indonesia TM-3 zone 51.2",code:"EPSG:23840"},{description:"DGN95 / Indonesia TM-3 zone 52.1",code:"EPSG:23841"},{description:"DGN95 / Indonesia TM-3 zone 52.2",code:"EPSG:23842"},{description:"DGN95 / Indonesia TM-3 zone 53.1",code:"EPSG:23843"},{description:"DGN95 / Indonesia TM-3 zone 53.2",code:"EPSG:23844"},{description:"DGN95 / Indonesia TM-3 zone 54.1",code:"EPSG:23845"},{description:"ID74 / UTM zone 46N",code:"EPSG:23846"},{description:"ID74 / UTM zone 47N",code:"EPSG:23847"},{description:"ID74 / UTM zone 48N",code:"EPSG:23848"},{description:"ID74 / UTM zone 49N",code:"EPSG:23849"},{description:"ID74 / UTM zone 50N",code:"EPSG:23850"},{description:"ID74 / UTM zone 51N",code:"EPSG:23851"},{description:"ID74 / UTM zone 52N",code:"EPSG:23852"},{description:"ID74 / UTM zone 53N",code:"EPSG:23853"},{description:"DGN95 / UTM zone 46N",code:"EPSG:23866"},{description:"DGN95 / UTM zone 47N",code:"EPSG:23867"},{description:"DGN95 / UTM zone 48N",code:"EPSG:23868"},{description:"DGN95 / UTM zone 49N",code:"EPSG:23869"},{description:"DGN95 / UTM zone 50N",code:"EPSG:23870"},{description:"DGN95 / UTM zone 51N",code:"EPSG:23871"},{description:"DGN95 / UTM zone 52N",code:"EPSG:23872"},{description:"DGN95 / UTM zone 47S",code:"EPSG:23877"},{description:"DGN95 / UTM zone 48S",code:"EPSG:23878"},{description:"DGN95 / UTM zone 49S",code:"EPSG:23879"},{description:"DGN95 / UTM zone 50S",code:"EPSG:23880"},{description:"DGN95 / UTM zone 51S",code:"EPSG:23881"},{description:"DGN95 / UTM zone 52S",code:"EPSG:23882"},{description:"DGN95 / UTM zone 53S",code:"EPSG:23883"},{description:"DGN95 / UTM zone 54S",code:"EPSG:23884"},{description:"ID74 / UTM zone 46S",code:"EPSG:23886"},{description:"ID74 / UTM zone 47S",code:"EPSG:23887"},{description:"ID74 / UTM zone 48S",code:"EPSG:23888"},{description:"ID74 / UTM zone 49S",code:"EPSG:23889"},{description:"ID74 / UTM zone 50S",code:"EPSG:23890"},{description:"ID74 / UTM zone 51S",code:"EPSG:23891"},{description:"ID74 / UTM zone 52S",code:"EPSG:23892"},{description:"ID74 / UTM zone 53S",code:"EPSG:23893"},{description:"ID74 / UTM zone 54S",code:"EPSG:23894"},{description:"Indian 1954 / UTM zone 46N",code:"EPSG:23946"},{description:"Indian 1954 / UTM zone 47N",code:"EPSG:23947"},{description:"Indian 1954 / UTM zone 48N",code:"EPSG:23948"},{description:"Indian 1975 / UTM zone 47N",code:"EPSG:24047"},{description:"Indian 1975 / UTM zone 48N",code:"EPSG:24048"},{description:"Jamaica 1875 / Jamaica (Old Grid)",code:"EPSG:24100"},{description:"JAD69 / Jamaica National Grid",code:"EPSG:24200"},{description:"Kalianpur 1937 / UTM zone 45N",code:"EPSG:24305"},{description:"Kalianpur 1937 / UTM zone 46N",code:"EPSG:24306"},{description:"Kalianpur 1962 / UTM zone 41N",code:"EPSG:24311"},{description:"Kalianpur 1962 / UTM zone 42N",code:"EPSG:24312"},{description:"Kalianpur 1962 / UTM zone 43N",code:"EPSG:24313"},{description:"Kalianpur 1975 / UTM zone 42N",code:"EPSG:24342"},{description:"Kalianpur 1975 / UTM zone 43N",code:"EPSG:24343"},{description:"Kalianpur 1975 / UTM zone 44N",code:"EPSG:24344"},{description:"Kalianpur 1975 / UTM zone 45N",code:"EPSG:24345"},{description:"Kalianpur 1975 / UTM zone 46N",code:"EPSG:24346"},{description:"Kalianpur 1975 / UTM zone 47N",code:"EPSG:24347"},{description:"Kalianpur 1880 / India zone 0",code:"EPSG:24370"},{description:"Kalianpur 1880 / India zone I",code:"EPSG:24371"},{description:"Kalianpur 1880 / India zone IIa",code:"EPSG:24372"},{description:"Kalianpur 1880 / India zone III",code:"EPSG:24373"},{description:"Kalianpur 1880 / India zone IV",code:"EPSG:24374"},{description:"Kalianpur 1937 / India zone IIb",code:"EPSG:24375"},{description:"Kalianpur 1962 / India zone I",code:"EPSG:24376"},{description:"Kalianpur 1962 / India zone IIa",code:"EPSG:24377"},{description:"Kalianpur 1975 / India zone I",code:"EPSG:24378"},{description:"Kalianpur 1975 / India zone IIa",code:"EPSG:24379"},{description:"Kalianpur 1975 / India zone IIb",code:"EPSG:24380"},{description:"Kalianpur 1975 / India zone III",code:"EPSG:24381"},{description:"Kalianpur 1880 / India zone IIb",code:"EPSG:24382"},{description:"Kalianpur 1975 / India zone IV",code:"EPSG:24383"},{description:"Kertau 1968 / Singapore Grid",code:"EPSG:24500"},{description:"Kertau 1968 / UTM zone 47N",code:"EPSG:24547"},{description:"Kertau 1968 / UTM zone 48N",code:"EPSG:24548"},{description:"Kertau / R.S.O. Malaya (ch)",code:"EPSG:24571"},{description:"KOC Lambert",code:"EPSG:24600"},{description:"La Canoa / UTM zone 18N",code:"EPSG:24718"},{description:"La Canoa / UTM zone 19N",code:"EPSG:24719"},{description:"La Canoa / UTM zone 20N",code:"EPSG:24720"},{description:"PSAD56 / UTM zone 17N",code:"EPSG:24817"},{description:"PSAD56 / UTM zone 18N",code:"EPSG:24818"},{description:"PSAD56 / UTM zone 19N",code:"EPSG:24819"},{description:"PSAD56 / UTM zone 20N",code:"EPSG:24820"},{description:"PSAD56 / UTM zone 21N",code:"EPSG:24821"},{description:"PSAD56 / UTM zone 17S",code:"EPSG:24877"},{description:"PSAD56 / UTM zone 18S",code:"EPSG:24878"},{description:"PSAD56 / UTM zone 19S",code:"EPSG:24879"},{description:"PSAD56 / UTM zone 20S",code:"EPSG:24880"},{description:"PSAD56 / UTM zone 21S",code:"EPSG:24881"},{description:"PSAD56 / UTM zone 22S",code:"EPSG:24882"},{description:"PSAD56 / Peru west zone",code:"EPSG:24891"},{description:"PSAD56 / Peru central zone",code:"EPSG:24892"},{description:"PSAD56 / Peru east zone",code:"EPSG:24893"},{description:"Leigon / Ghana Metre Grid",code:"EPSG:25000"},{description:"Lome / UTM zone 31N",code:"EPSG:25231"},{description:"Luzon 1911 / Philippines zone I",code:"EPSG:25391"},{description:"Luzon 1911 / Philippines zone II",code:"EPSG:25392"},{description:"Luzon 1911 / Philippines zone III",code:"EPSG:25393"},{description:"Luzon 1911 / Philippines zone IV",code:"EPSG:25394"},{description:"Luzon 1911 / Philippines zone V",code:"EPSG:25395"},{description:"Makassar (Jakarta) / NEIEZ",code:"EPSG:25700"},{description:"ETRS89 / UTM zone 28N",code:"EPSG:25828"},{description:"ETRS89 / UTM zone 29N",code:"EPSG:25829"},{description:"ETRS89 / UTM zone 30N",code:"EPSG:25830"},{description:"ETRS89 / UTM zone 31N",code:"EPSG:25831"},{description:"ETRS89 / UTM zone 32N",code:"EPSG:25832"},{description:"ETRS89 / UTM zone 33N",code:"EPSG:25833"},{description:"ETRS89 / UTM zone 34N",code:"EPSG:25834"},{description:"ETRS89 / UTM zone 35N",code:"EPSG:25835"},{description:"ETRS89 / UTM zone 36N",code:"EPSG:25836"},{description:"ETRS89 / UTM zone 37N",code:"EPSG:25837"},{description:"ETRS89 / UTM zone 38N",code:"EPSG:25838"},{description:"ETRS89 / TM Baltic93",code:"EPSG:25884"},{description:"Malongo 1987 / UTM zone 32S",code:"EPSG:25932"},{description:"Merchich / Nord Maroc",code:"EPSG:26191"},{description:"Merchich / Sud Maroc",code:"EPSG:26192"},{description:"Merchich / Sahara",code:"EPSG:26193"},{description:"Merchich / Sahara Nord",code:"EPSG:26194"},{description:"Merchich / Sahara Sud",code:"EPSG:26195"},{description:"Massawa / UTM zone 37N",code:"EPSG:26237"},{description:"Minna / UTM zone 31N",code:"EPSG:26331"},{description:"Minna / UTM zone 32N",code:"EPSG:26332"},{description:"Minna / Nigeria West Belt",code:"EPSG:26391"},{description:"Minna / Nigeria Mid Belt",code:"EPSG:26392"},{description:"Minna / Nigeria East Belt",code:"EPSG:26393"},{description:"Mhast / UTM zone 32S",code:"EPSG:26432"},{description:"Monte Mario (Rome) / Italy zone 1",code:"EPSG:26591"},{description:"Monte Mario (Rome) / Italy zone 2",code:"EPSG:26592"},{description:"M'poraloko / UTM zone 32N",code:"EPSG:26632"},{description:"M'poraloko / UTM zone 32S",code:"EPSG:26692"},{description:"NAD27 / UTM zone 1N",code:"EPSG:26701"},{description:"NAD27 / UTM zone 2N",code:"EPSG:26702"},{description:"NAD27 / UTM zone 3N",code:"EPSG:26703"},{description:"NAD27 / UTM zone 4N",code:"EPSG:26704"},{description:"NAD27 / UTM zone 5N",code:"EPSG:26705"},{description:"NAD27 / UTM zone 6N",code:"EPSG:26706"},{description:"NAD27 / UTM zone 7N",code:"EPSG:26707"},{description:"NAD27 / UTM zone 8N",code:"EPSG:26708"},{description:"NAD27 / UTM zone 9N",code:"EPSG:26709"},{description:"NAD27 / UTM zone 10N",code:"EPSG:26710"},{description:"NAD27 / UTM zone 11N",code:"EPSG:26711"},{description:"NAD27 / UTM zone 12N",code:"EPSG:26712"},{description:"NAD27 / UTM zone 13N",code:"EPSG:26713"},{description:"NAD27 / UTM zone 14N",code:"EPSG:26714"},{description:"NAD27 / UTM zone 15N",code:"EPSG:26715"},{description:"NAD27 / UTM zone 16N",code:"EPSG:26716"},{description:"NAD27 / UTM zone 17N",code:"EPSG:26717"},{description:"NAD27 / UTM zone 18N",code:"EPSG:26718"},{description:"NAD27 / UTM zone 19N",code:"EPSG:26719"},{description:"NAD27 / UTM zone 20N",code:"EPSG:26720"},{description:"NAD27 / UTM zone 21N",code:"EPSG:26721"},{description:"NAD27 / UTM zone 22N",code:"EPSG:26722"},{description:"NAD27 / Alabama East",code:"EPSG:26729"},{description:"NAD27 / Alabama West",code:"EPSG:26730"},{description:"NAD27 / Alaska zone 1",code:"EPSG:26731"},{description:"NAD27 / Alaska zone 2",code:"EPSG:26732"},{description:"NAD27 / Alaska zone 3",code:"EPSG:26733"},{description:"NAD27 / Alaska zone 4",code:"EPSG:26734"},{description:"NAD27 / Alaska zone 5",code:"EPSG:26735"},{description:"NAD27 / Alaska zone 6",code:"EPSG:26736"},{description:"NAD27 / Alaska zone 7",code:"EPSG:26737"},{description:"NAD27 / Alaska zone 8",code:"EPSG:26738"},{description:"NAD27 / Alaska zone 9",code:"EPSG:26739"},{description:"NAD27 / Alaska zone 10",code:"EPSG:26740"},{description:"NAD27 / California zone I",code:"EPSG:26741"},{description:"NAD27 / California zone II",code:"EPSG:26742"},{description:"NAD27 / California zone III",code:"EPSG:26743"},{description:"NAD27 / California zone IV",code:"EPSG:26744"},{description:"NAD27 / California zone V",code:"EPSG:26745"},{description:"NAD27 / California zone VI",code:"EPSG:26746"},{description:"NAD27 / California zone VII",code:"EPSG:26747"},{description:"NAD27 / Arizona East",code:"EPSG:26748"},{description:"NAD27 / Arizona Central",code:"EPSG:26749"},{description:"NAD27 / Arizona West",code:"EPSG:26750"},{description:"NAD27 / Arkansas North",code:"EPSG:26751"},{description:"NAD27 / Arkansas South",code:"EPSG:26752"},{description:"NAD27 / Colorado North",code:"EPSG:26753"},{description:"NAD27 / Colorado Central",code:"EPSG:26754"},{description:"NAD27 / Colorado South",code:"EPSG:26755"},{description:"NAD27 / Connecticut",code:"EPSG:26756"},{description:"NAD27 / Delaware",code:"EPSG:26757"},{description:"NAD27 / Florida East",code:"EPSG:26758"},{description:"NAD27 / Florida West",code:"EPSG:26759"},{description:"NAD27 / Florida North",code:"EPSG:26760"},{description:"NAD27 / Georgia East",code:"EPSG:26766"},{description:"NAD27 / Georgia West",code:"EPSG:26767"},{description:"NAD27 / Idaho East",code:"EPSG:26768"},{description:"NAD27 / Idaho Central",code:"EPSG:26769"},{description:"NAD27 / Idaho West",code:"EPSG:26770"},{description:"NAD27 / Illinois East",code:"EPSG:26771"},{description:"NAD27 / Illinois West",code:"EPSG:26772"},{description:"NAD27 / Indiana East",code:"EPSG:26773"},{description:"NAD27 / Indiana West",code:"EPSG:26774"},{description:"NAD27 / Iowa North",code:"EPSG:26775"},{description:"NAD27 / Iowa South",code:"EPSG:26776"},{description:"NAD27 / Kansas North",code:"EPSG:26777"},{description:"NAD27 / Kansas South",code:"EPSG:26778"},{description:"NAD27 / Kentucky North",code:"EPSG:26779"},{description:"NAD27 / Kentucky South",code:"EPSG:26780"},{description:"NAD27 / Louisiana North",code:"EPSG:26781"},{description:"NAD27 / Louisiana South",code:"EPSG:26782"},{description:"NAD27 / Maine East",code:"EPSG:26783"},{description:"NAD27 / Maine West",code:"EPSG:26784"},{description:"NAD27 / Maryland",code:"EPSG:26785"},{description:"NAD27 / Massachusetts Mainland",code:"EPSG:26786"},{description:"NAD27 / Massachusetts Island",code:"EPSG:26787"},{description:"NAD27 / Minnesota North",code:"EPSG:26791"},{description:"NAD27 / Minnesota Central",code:"EPSG:26792"},{description:"NAD27 / Minnesota South",code:"EPSG:26793"},{description:"NAD27 / Mississippi East",code:"EPSG:26794"},{description:"NAD27 / Mississippi West",code:"EPSG:26795"},{description:"NAD27 / Missouri East",code:"EPSG:26796"},{description:"NAD27 / Missouri Central",code:"EPSG:26797"},{description:"NAD27 / Missouri West",code:"EPSG:26798"},{description:"NAD27 / California zone VII",code:"EPSG:26799"},{description:"NAD Michigan / Michigan East",code:"EPSG:26801"},{description:"NAD Michigan / Michigan Old Central",code:"EPSG:26802"},{description:"NAD Michigan / Michigan West",code:"EPSG:26803"},{description:"NAD Michigan / Michigan North",code:"EPSG:26811"},{description:"NAD Michigan / Michigan Central",code:"EPSG:26812"},{description:"NAD Michigan / Michigan South",code:"EPSG:26813"},{description:"NAD83 / Maine East (ftUS)",code:"EPSG:26814"},{description:"NAD83 / Maine West (ftUS)",code:"EPSG:26815"},{description:"NAD83 / Minnesota North (ftUS)",code:"EPSG:26819"},{description:"NAD83 / Minnesota Central (ftUS)",code:"EPSG:26820"},{description:"NAD83 / Minnesota South (ftUS)",code:"EPSG:26821"},{description:"NAD83 / Nebraska (ftUS)",code:"EPSG:26822"},{description:"NAD83 / West Virginia North (ftUS)",code:"EPSG:26823"},{description:"NAD83 / West Virginia South (ftUS)",code:"EPSG:26824"},{description:"NAD83(HARN) / Maine East (ftUS)",code:"EPSG:26825"},{description:"NAD83(HARN) / Maine West (ftUS)",code:"EPSG:26826"},{description:"NAD83(HARN) / Minnesota North (ftUS)",code:"EPSG:26830"},{description:"NAD83(HARN) / Minnesota Central (ftUS)",code:"EPSG:26831"},{description:"NAD83(HARN) / Minnesota South (ftUS)",code:"EPSG:26832"},{description:"NAD83(HARN) / Nebraska (ftUS)",code:"EPSG:26833"},{description:"NAD83(HARN) / West Virginia North (ftUS)",code:"EPSG:26834"},{description:"NAD83(HARN) / West Virginia South (ftUS)",code:"EPSG:26835"},{description:"NAD83(NSRS2007) / Maine East (ftUS)",code:"EPSG:26836"},{description:"NAD83(NSRS2007) / Maine West (ftUS)",code:"EPSG:26837"},{description:"NAD83(NSRS2007) / Minnesota North (ftUS)",code:"EPSG:26841"},{description:"NAD83(NSRS2007) / Minnesota Central (ftUS)",code:"EPSG:26842"},{description:"NAD83(NSRS2007) / Minnesota South (ftUS)",code:"EPSG:26843"},{description:"NAD83(NSRS2007) / Nebraska (ftUS)",code:"EPSG:26844"},{description:"NAD83(NSRS2007) / West Virginia North (ftUS)",code:"EPSG:26845"},{description:"NAD83(NSRS2007) / West Virginia South (ftUS)",code:"EPSG:26846"},{description:"NAD83 / Maine East (ftUS)",code:"EPSG:26847"},{description:"NAD83 / Maine West (ftUS)",code:"EPSG:26848"},{description:"NAD83 / Minnesota North (ftUS)",code:"EPSG:26849"},{description:"NAD83 / Minnesota Central (ftUS)",code:"EPSG:26850"},{description:"NAD83 / Minnesota South (ftUS)",code:"EPSG:26851"},{description:"NAD83 / Nebraska (ftUS)",code:"EPSG:26852"},{description:"NAD83 / West Virginia North (ftUS)",code:"EPSG:26853"},{description:"NAD83 / West Virginia South (ftUS)",code:"EPSG:26854"},{description:"NAD83(HARN) / Maine East (ftUS)",code:"EPSG:26855"},{description:"NAD83(HARN) / Maine West (ftUS)",code:"EPSG:26856"},{description:"NAD83(HARN) / Minnesota North (ftUS)",code:"EPSG:26857"},{description:"NAD83(HARN) / Minnesota Central (ftUS)",code:"EPSG:26858"},{description:"NAD83(HARN) / Minnesota South (ftUS)",code:"EPSG:26859"},{description:"NAD83(HARN) / Nebraska (ftUS)",code:"EPSG:26860"},{description:"NAD83(HARN) / West Virginia North (ftUS)",code:"EPSG:26861"},{description:"NAD83(HARN) / West Virginia South (ftUS)",code:"EPSG:26862"},{description:"NAD83(NSRS2007) / Maine East (ftUS)",code:"EPSG:26863"},{description:"NAD83(NSRS2007) / Maine West (ftUS)",code:"EPSG:26864"},{description:"NAD83(NSRS2007) / Minnesota North (ftUS)",code:"EPSG:26865"},{description:"NAD83(NSRS2007) / Minnesota Central (ftUS)",code:"EPSG:26866"},{description:"NAD83(NSRS2007) / Minnesota South (ftUS)",code:"EPSG:26867"},{description:"NAD83(NSRS2007) / Nebraska (ftUS)",code:"EPSG:26868"},{description:"NAD83(NSRS2007) / West Virginia North (ftUS)",code:"EPSG:26869"},{description:"NAD83(NSRS2007) / West Virginia South (ftUS)",code:"EPSG:26870"},{description:"NAD83(CSRS) / MTM zone 11",code:"EPSG:26891"},{description:"NAD83(CSRS) / MTM zone 12",code:"EPSG:26892"},{description:"NAD83(CSRS) / MTM zone 13",code:"EPSG:26893"},{description:"NAD83(CSRS) / MTM zone 14",code:"EPSG:26894"},{description:"NAD83(CSRS) / MTM zone 15",code:"EPSG:26895"},{description:"NAD83(CSRS) / MTM zone 16",code:"EPSG:26896"},{description:"NAD83(CSRS) / MTM zone 17",code:"EPSG:26897"},{description:"NAD83(CSRS) / MTM zone 1",code:"EPSG:26898"},{description:"NAD83(CSRS) / MTM zone 2",code:"EPSG:26899"},{description:"NAD83 / UTM zone 1N",code:"EPSG:26901"},{description:"NAD83 / UTM zone 2N",code:"EPSG:26902"},{description:"NAD83 / UTM zone 3N",code:"EPSG:26903"},{description:"NAD83 / UTM zone 4N",code:"EPSG:26904"},{description:"NAD83 / UTM zone 5N",code:"EPSG:26905"},{description:"NAD83 / UTM zone 6N",code:"EPSG:26906"},{description:"NAD83 / UTM zone 7N",code:"EPSG:26907"},{description:"NAD83 / UTM zone 8N",code:"EPSG:26908"},{description:"NAD83 / UTM zone 9N",code:"EPSG:26909"},{description:"NAD83 / UTM zone 10N",code:"EPSG:26910"},{description:"NAD83 / UTM zone 11N",code:"EPSG:26911"},{description:"NAD83 / UTM zone 12N",code:"EPSG:26912"},{description:"NAD83 / UTM zone 13N",code:"EPSG:26913"},{description:"NAD83 / UTM zone 14N",code:"EPSG:26914"},{description:"NAD83 / UTM zone 15N",code:"EPSG:26915"},{description:"NAD83 / UTM zone 16N",code:"EPSG:26916"},{description:"NAD83 / UTM zone 17N",code:"EPSG:26917"},{description:"NAD83 / UTM zone 18N",code:"EPSG:26918"},{description:"NAD83 / UTM zone 19N",code:"EPSG:26919"},{description:"NAD83 / UTM zone 20N",code:"EPSG:26920"},{description:"NAD83 / UTM zone 21N",code:"EPSG:26921"},{description:"NAD83 / UTM zone 22N",code:"EPSG:26922"},{description:"NAD83 / UTM zone 23N",code:"EPSG:26923"},{description:"NAD83 / Alabama East",code:"EPSG:26929"},{description:"NAD83 / Alabama West",code:"EPSG:26930"},{description:"NAD83 / Alaska zone 1",code:"EPSG:26931"},{description:"NAD83 / Alaska zone 2",code:"EPSG:26932"},{description:"NAD83 / Alaska zone 3",code:"EPSG:26933"},{description:"NAD83 / Alaska zone 4",code:"EPSG:26934"},{description:"NAD83 / Alaska zone 5",code:"EPSG:26935"},{description:"NAD83 / Alaska zone 6",code:"EPSG:26936"},{description:"NAD83 / Alaska zone 7",code:"EPSG:26937"},{description:"NAD83 / Alaska zone 8",code:"EPSG:26938"},{description:"NAD83 / Alaska zone 9",code:"EPSG:26939"},{description:"NAD83 / Alaska zone 10",code:"EPSG:26940"},{description:"NAD83 / California zone 1",code:"EPSG:26941"},{description:"NAD83 / California zone 2",code:"EPSG:26942"},{description:"NAD83 / California zone 3",code:"EPSG:26943"},{description:"NAD83 / California zone 4",code:"EPSG:26944"},{description:"NAD83 / California zone 5",code:"EPSG:26945"},{description:"NAD83 / California zone 6",code:"EPSG:26946"},{description:"NAD83 / Arizona East",code:"EPSG:26948"},{description:"NAD83 / Arizona Central",code:"EPSG:26949"},{description:"NAD83 / Arizona West",code:"EPSG:26950"},{description:"NAD83 / Arkansas North",code:"EPSG:26951"},{description:"NAD83 / Arkansas South",code:"EPSG:26952"},{description:"NAD83 / Colorado North",code:"EPSG:26953"},{description:"NAD83 / Colorado Central",code:"EPSG:26954"},{description:"NAD83 / Colorado South",code:"EPSG:26955"},{description:"NAD83 / Connecticut",code:"EPSG:26956"},{description:"NAD83 / Delaware",code:"EPSG:26957"},{description:"NAD83 / Florida East",code:"EPSG:26958"},{description:"NAD83 / Florida West",code:"EPSG:26959"},{description:"NAD83 / Florida North",code:"EPSG:26960"},{description:"NAD83 / Hawaii zone 1",code:"EPSG:26961"},{description:"NAD83 / Hawaii zone 2",code:"EPSG:26962"},{description:"NAD83 / Hawaii zone 3",code:"EPSG:26963"},{description:"NAD83 / Hawaii zone 4",code:"EPSG:26964"},{description:"NAD83 / Hawaii zone 5",code:"EPSG:26965"},{description:"NAD83 / Georgia East",code:"EPSG:26966"},{description:"NAD83 / Georgia West",code:"EPSG:26967"},{description:"NAD83 / Idaho East",code:"EPSG:26968"},{description:"NAD83 / Idaho Central",code:"EPSG:26969"},{description:"NAD83 / Idaho West",code:"EPSG:26970"},{description:"NAD83 / Illinois East",code:"EPSG:26971"},{description:"NAD83 / Illinois West",code:"EPSG:26972"},{description:"NAD83 / Indiana East",code:"EPSG:26973"},{description:"NAD83 / Indiana West",code:"EPSG:26974"},{description:"NAD83 / Iowa North",code:"EPSG:26975"},{description:"NAD83 / Iowa South",code:"EPSG:26976"},{description:"NAD83 / Kansas North",code:"EPSG:26977"},{description:"NAD83 / Kansas South",code:"EPSG:26978"},{description:"NAD83 / Kentucky North",code:"EPSG:26979"},{description:"NAD83 / Kentucky South",code:"EPSG:26980"},{description:"NAD83 / Louisiana North",code:"EPSG:26981"},{description:"NAD83 / Louisiana South",code:"EPSG:26982"},{description:"NAD83 / Maine East",code:"EPSG:26983"},{description:"NAD83 / Maine West",code:"EPSG:26984"},{description:"NAD83 / Maryland",code:"EPSG:26985"},{description:"NAD83 / Massachusetts Mainland",code:"EPSG:26986"},{description:"NAD83 / Massachusetts Island",code:"EPSG:26987"},{description:"NAD83 / Michigan North",code:"EPSG:26988"},{description:"NAD83 / Michigan Central",code:"EPSG:26989"},{description:"NAD83 / Michigan South",code:"EPSG:26990"},{description:"NAD83 / Minnesota North",code:"EPSG:26991"},{description:"NAD83 / Minnesota Central",code:"EPSG:26992"},{description:"NAD83 / Minnesota South",code:"EPSG:26993"},{description:"NAD83 / Mississippi East",code:"EPSG:26994"},{description:"NAD83 / Mississippi West",code:"EPSG:26995"},{description:"NAD83 / Missouri East",code:"EPSG:26996"},{description:"NAD83 / Missouri Central",code:"EPSG:26997"},{description:"NAD83 / Missouri West",code:"EPSG:26998"},{description:"Nahrwan 1967 / UTM zone 37N",code:"EPSG:27037"},{description:"Nahrwan 1967 / UTM zone 38N",code:"EPSG:27038"},{description:"Nahrwan 1967 / UTM zone 39N",code:"EPSG:27039"},{description:"Nahrwan 1967 / UTM zone 40N",code:"EPSG:27040"},{description:"Naparima 1972 / UTM zone 20N",code:"EPSG:27120"},{description:"NZGD49 / New Zealand Map Grid",code:"EPSG:27200"},{description:"NZGD49 / Mount Eden Circuit",code:"EPSG:27205"},{description:"NZGD49 / Bay of Plenty Circuit",code:"EPSG:27206"},{description:"NZGD49 / Poverty Bay Circuit",code:"EPSG:27207"},{description:"NZGD49 / Hawkes Bay Circuit",code:"EPSG:27208"},{description:"NZGD49 / Taranaki Circuit",code:"EPSG:27209"},{description:"NZGD49 / Tuhirangi Circuit",code:"EPSG:27210"},{description:"NZGD49 / Wanganui Circuit",code:"EPSG:27211"},{description:"NZGD49 / Wairarapa Circuit",code:"EPSG:27212"},{description:"NZGD49 / Wellington Circuit",code:"EPSG:27213"},{description:"NZGD49 / Collingwood Circuit",code:"EPSG:27214"},{description:"NZGD49 / Nelson Circuit",code:"EPSG:27215"},{description:"NZGD49 / Karamea Circuit",code:"EPSG:27216"},{description:"NZGD49 / Buller Circuit",code:"EPSG:27217"},{description:"NZGD49 / Grey Circuit",code:"EPSG:27218"},{description:"NZGD49 / Amuri Circuit",code:"EPSG:27219"},{description:"NZGD49 / Marlborough Circuit",code:"EPSG:27220"},{description:"NZGD49 / Hokitika Circuit",code:"EPSG:27221"},{description:"NZGD49 / Okarito Circuit",code:"EPSG:27222"},{description:"NZGD49 / Jacksons Bay Circuit",code:"EPSG:27223"},{description:"NZGD49 / Mount Pleasant Circuit",code:"EPSG:27224"},{description:"NZGD49 / Gawler Circuit",code:"EPSG:27225"},{description:"NZGD49 / Timaru Circuit",code:"EPSG:27226"},{description:"NZGD49 / Lindis Peak Circuit",code:"EPSG:27227"},{description:"NZGD49 / Mount Nicholas Circuit",code:"EPSG:27228"},{description:"NZGD49 / Mount York Circuit",code:"EPSG:27229"},{description:"NZGD49 / Observation Point Circuit",code:"EPSG:27230"},{description:"NZGD49 / North Taieri Circuit",code:"EPSG:27231"},{description:"NZGD49 / Bluff Circuit",code:"EPSG:27232"},{description:"NZGD49 / UTM zone 58S",code:"EPSG:27258"},{description:"NZGD49 / UTM zone 59S",code:"EPSG:27259"},{description:"NZGD49 / UTM zone 60S",code:"EPSG:27260"},{description:"NZGD49 / North Island Grid",code:"EPSG:27291"},{description:"NZGD49 / South Island Grid",code:"EPSG:27292"},{description:"NGO 1948 (Oslo) / NGO zone I",code:"EPSG:27391"},{description:"NGO 1948 (Oslo) / NGO zone II",code:"EPSG:27392"},{description:"NGO 1948 (Oslo) / NGO zone III",code:"EPSG:27393"},{description:"NGO 1948 (Oslo) / NGO zone IV",code:"EPSG:27394"},{description:"NGO 1948 (Oslo) / NGO zone V",code:"EPSG:27395"},{description:"NGO 1948 (Oslo) / NGO zone VI",code:"EPSG:27396"},{description:"NGO 1948 (Oslo) / NGO zone VII",code:"EPSG:27397"},{description:"NGO 1948 (Oslo) / NGO zone VIII",code:"EPSG:27398"},{description:"Datum 73 / UTM zone 29N",code:"EPSG:27429"},{description:"Datum 73 / Modified Portuguese Grid",code:"EPSG:27492"},{description:"Datum 73 / Modified Portuguese Grid",code:"EPSG:27493"},{description:"ATF (Paris) / Nord de Guerre",code:"EPSG:27500"},{description:"NTF (Paris) / Lambert Nord France",code:"EPSG:27561"},{description:"NTF (Paris) / Lambert Centre France",code:"EPSG:27562"},{description:"NTF (Paris) / Lambert Sud France",code:"EPSG:27563"},{description:"NTF (Paris) / Lambert Corse",code:"EPSG:27564"},{description:"NTF (Paris) / Lambert zone I",code:"EPSG:27571"},{description:"NTF (Paris) / Lambert zone II",code:"EPSG:27572"},{description:"NTF (Paris) / Lambert zone III",code:"EPSG:27573"},{description:"NTF (Paris) / Lambert zone IV",code:"EPSG:27574"},{description:"NTF (Paris) / France I",code:"EPSG:27581"},{description:"NTF (Paris) / France II",code:"EPSG:27582"},{description:"NTF (Paris) / France III",code:"EPSG:27583"},{description:"NTF (Paris) / France IV",code:"EPSG:27584"},{description:"NTF (Paris) / Nord France",code:"EPSG:27591"},{description:"NTF (Paris) / Centre France",code:"EPSG:27592"},{description:"NTF (Paris) / Sud France",code:"EPSG:27593"},{description:"NTF (Paris) / Corse",code:"EPSG:27594"},{description:"OSGB 1936 / British National Grid",code:"EPSG:27700"},{description:"Palestine 1923 / Palestine Grid",code:"EPSG:28191"},{description:"Palestine 1923 / Palestine Belt",code:"EPSG:28192"},{description:"Palestine 1923 / Israeli CS Grid",code:"EPSG:28193"},{description:"Pointe Noire / UTM zone 32S",code:"EPSG:28232"},{description:"GDA94 / MGA zone 48",code:"EPSG:28348"},{description:"GDA94 / MGA zone 49",code:"EPSG:28349"},{description:"GDA94 / MGA zone 50",code:"EPSG:28350"},{description:"GDA94 / MGA zone 51",code:"EPSG:28351"},{description:"GDA94 / MGA zone 52",code:"EPSG:28352"},{description:"GDA94 / MGA zone 53",code:"EPSG:28353"},{description:"GDA94 / MGA zone 54",code:"EPSG:28354"},{description:"GDA94 / MGA zone 55",code:"EPSG:28355"},{description:"GDA94 / MGA zone 56",code:"EPSG:28356"},{description:"GDA94 / MGA zone 57",code:"EPSG:28357"},{description:"GDA94 / MGA zone 58",code:"EPSG:28358"},{description:"Pulkovo 1942 / Gauss-Kruger zone 2",code:"EPSG:28402"},{description:"Pulkovo 1942 / Gauss-Kruger zone 3",code:"EPSG:28403"},{description:"Pulkovo 1942 / Gauss-Kruger zone 4",code:"EPSG:28404"},{description:"Pulkovo 1942 / Gauss-Kruger zone 5",code:"EPSG:28405"},{description:"Pulkovo 1942 / Gauss-Kruger zone 6",code:"EPSG:28406"},{description:"Pulkovo 1942 / Gauss-Kruger zone 7",code:"EPSG:28407"},{description:"Pulkovo 1942 / Gauss-Kruger zone 8",code:"EPSG:28408"},{description:"Pulkovo 1942 / Gauss-Kruger zone 9",code:"EPSG:28409"},{description:"Pulkovo 1942 / Gauss-Kruger zone 10",code:"EPSG:28410"},{description:"Pulkovo 1942 / Gauss-Kruger zone 11",code:"EPSG:28411"},{description:"Pulkovo 1942 / Gauss-Kruger zone 12",code:"EPSG:28412"},{description:"Pulkovo 1942 / Gauss-Kruger zone 13",code:"EPSG:28413"},{description:"Pulkovo 1942 / Gauss-Kruger zone 14",code:"EPSG:28414"},{description:"Pulkovo 1942 / Gauss-Kruger zone 15",code:"EPSG:28415"},{description:"Pulkovo 1942 / Gauss-Kruger zone 16",code:"EPSG:28416"},{description:"Pulkovo 1942 / Gauss-Kruger zone 17",code:"EPSG:28417"},{description:"Pulkovo 1942 / Gauss-Kruger zone 18",code:"EPSG:28418"},{description:"Pulkovo 1942 / Gauss-Kruger zone 19",code:"EPSG:28419"},{description:"Pulkovo 1942 / Gauss-Kruger zone 20",code:"EPSG:28420"},{description:"Pulkovo 1942 / Gauss-Kruger zone 21",code:"EPSG:28421"},{description:"Pulkovo 1942 / Gauss-Kruger zone 22",code:"EPSG:28422"},{description:"Pulkovo 1942 / Gauss-Kruger zone 23",code:"EPSG:28423"},{description:"Pulkovo 1942 / Gauss-Kruger zone 24",code:"EPSG:28424"},{description:"Pulkovo 1942 / Gauss-Kruger zone 25",code:"EPSG:28425"},{description:"Pulkovo 1942 / Gauss-Kruger zone 26",code:"EPSG:28426"},{description:"Pulkovo 1942 / Gauss-Kruger zone 27",code:"EPSG:28427"},{description:"Pulkovo 1942 / Gauss-Kruger zone 28",code:"EPSG:28428"},{description:"Pulkovo 1942 / Gauss-Kruger zone 29",code:"EPSG:28429"},{description:"Pulkovo 1942 / Gauss-Kruger zone 30",code:"EPSG:28430"},{description:"Pulkovo 1942 / Gauss-Kruger zone 31",code:"EPSG:28431"},{description:"Pulkovo 1942 / Gauss-Kruger zone 32",code:"EPSG:28432"},{description:"Pulkovo 1942 / Gauss-Kruger 2N",code:"EPSG:28462"},{description:"Pulkovo 1942 / Gauss-Kruger 3N",code:"EPSG:28463"},{description:"Pulkovo 1942 / Gauss-Kruger 4N",code:"EPSG:28464"},{description:"Pulkovo 1942 / Gauss-Kruger 5N",code:"EPSG:28465"},{description:"Pulkovo 1942 / Gauss-Kruger 6N",code:"EPSG:28466"},{description:"Pulkovo 1942 / Gauss-Kruger 7N",code:"EPSG:28467"},{description:"Pulkovo 1942 / Gauss-Kruger 8N",code:"EPSG:28468"},{description:"Pulkovo 1942 / Gauss-Kruger 9N",code:"EPSG:28469"},{description:"Pulkovo 1942 / Gauss-Kruger 10N",code:"EPSG:28470"},{description:"Pulkovo 1942 / Gauss-Kruger 11N",code:"EPSG:28471"},{description:"Pulkovo 1942 / Gauss-Kruger 12N",code:"EPSG:28472"},{description:"Pulkovo 1942 / Gauss-Kruger 13N",code:"EPSG:28473"},{description:"Pulkovo 1942 / Gauss-Kruger 14N",code:"EPSG:28474"},{description:"Pulkovo 1942 / Gauss-Kruger 15N",code:"EPSG:28475"},{description:"Pulkovo 1942 / Gauss-Kruger 16N",code:"EPSG:28476"},{description:"Pulkovo 1942 / Gauss-Kruger 17N",code:"EPSG:28477"},{description:"Pulkovo 1942 / Gauss-Kruger 18N",code:"EPSG:28478"},{description:"Pulkovo 1942 / Gauss-Kruger 19N",code:"EPSG:28479"},{description:"Pulkovo 1942 / Gauss-Kruger 20N",code:"EPSG:28480"},{description:"Pulkovo 1942 / Gauss-Kruger 21N",code:"EPSG:28481"},{description:"Pulkovo 1942 / Gauss-Kruger 22N",code:"EPSG:28482"},{description:"Pulkovo 1942 / Gauss-Kruger 23N",code:"EPSG:28483"},{description:"Pulkovo 1942 / Gauss-Kruger 24N",code:"EPSG:28484"},{description:"Pulkovo 1942 / Gauss-Kruger 25N",code:"EPSG:28485"},{description:"Pulkovo 1942 / Gauss-Kruger 26N",code:"EPSG:28486"},{description:"Pulkovo 1942 / Gauss-Kruger 27N",code:"EPSG:28487"},{description:"Pulkovo 1942 / Gauss-Kruger 28N",code:"EPSG:28488"},{description:"Pulkovo 1942 / Gauss-Kruger 29N",code:"EPSG:28489"},{description:"Pulkovo 1942 / Gauss-Kruger 30N",code:"EPSG:28490"},{description:"Pulkovo 1942 / Gauss-Kruger 31N",code:"EPSG:28491"},{description:"Pulkovo 1942 / Gauss-Kruger 32N",code:"EPSG:28492"},{description:"Qatar 1974 / Qatar National Grid",code:"EPSG:28600"},{description:"Amersfoort / RD Old",code:"EPSG:28991"},{description:"Amersfoort / RD New",code:"EPSG:28992"},{description:"SAD69 / Brazil Polyconic",code:"EPSG:29100"},{description:"SAD69 / Brazil Polyconic",code:"EPSG:29101"},{description:"SAD69 / UTM zone 18N",code:"EPSG:29118"},{description:"SAD69 / UTM zone 19N",code:"EPSG:29119"},{description:"SAD69 / UTM zone 20N",code:"EPSG:29120"},{description:"SAD69 / UTM zone 21N",code:"EPSG:29121"},{description:"SAD69 / UTM zone 22N",code:"EPSG:29122"},{description:"SAD69 / UTM zone 18N",code:"EPSG:29168"},{description:"SAD69 / UTM zone 19N",code:"EPSG:29169"},{description:"SAD69 / UTM zone 20N",code:"EPSG:29170"},{description:"SAD69 / UTM zone 21N",code:"EPSG:29171"},{description:"SAD69 / UTM zone 22N",code:"EPSG:29172"},{description:"SAD69 / UTM zone 17S",code:"EPSG:29177"},{description:"SAD69 / UTM zone 18S",code:"EPSG:29178"},{description:"SAD69 / UTM zone 19S",code:"EPSG:29179"},{description:"SAD69 / UTM zone 20S",code:"EPSG:29180"},{description:"SAD69 / UTM zone 21S",code:"EPSG:29181"},{description:"SAD69 / UTM zone 22S",code:"EPSG:29182"},{description:"SAD69 / UTM zone 23S",code:"EPSG:29183"},{description:"SAD69 / UTM zone 24S",code:"EPSG:29184"},{description:"SAD69 / UTM zone 25S",code:"EPSG:29185"},{description:"SAD69 / UTM zone 17S",code:"EPSG:29187"},{description:"SAD69 / UTM zone 18S",code:"EPSG:29188"},{description:"SAD69 / UTM zone 19S",code:"EPSG:29189"},{description:"SAD69 / UTM zone 20S",code:"EPSG:29190"},{description:"SAD69 / UTM zone 21S",code:"EPSG:29191"},{description:"SAD69 / UTM zone 22S",code:"EPSG:29192"},{description:"SAD69 / UTM zone 23S",code:"EPSG:29193"},{description:"SAD69 / UTM zone 24S",code:"EPSG:29194"},{description:"SAD69 / UTM zone 25S",code:"EPSG:29195"},{description:"Sapper Hill 1943 / UTM zone 20S",code:"EPSG:29220"},{description:"Sapper Hill 1943 / UTM zone 21S",code:"EPSG:29221"},{description:"Schwarzeck / UTM zone 33S",code:"EPSG:29333"},{description:"Schwarzeck / Lo22/11",code:"EPSG:29371"},{description:"Schwarzeck / Lo22/13",code:"EPSG:29373"},{description:"Schwarzeck / Lo22/15",code:"EPSG:29375"},{description:"Schwarzeck / Lo22/17",code:"EPSG:29377"},{description:"Schwarzeck / Lo22/19",code:"EPSG:29379"},{description:"Schwarzeck / Lo22/21",code:"EPSG:29381"},{description:"Schwarzeck / Lo22/23",code:"EPSG:29383"},{description:"Schwarzeck / Lo22/25",code:"EPSG:29385"},{description:"Sudan / UTM zone 35N",code:"EPSG:29635"},{description:"Sudan / UTM zone 36N",code:"EPSG:29636"},{description:"Tananarive (Paris) / Laborde Grid",code:"EPSG:29700"},{description:"Tananarive (Paris) / Laborde Grid",code:"EPSG:29701"},{description:"Tananarive (Paris) / Laborde Grid approximation",code:"EPSG:29702"},{description:"Tananarive / UTM zone 38S",code:"EPSG:29738"},{description:"Tananarive / UTM zone 39S",code:"EPSG:29739"},{description:"Timbalai 1948 / UTM zone 49N",code:"EPSG:29849"},{description:"Timbalai 1948 / UTM zone 50N",code:"EPSG:29850"},{description:"Timbalai 1948 / RSO Borneo (ch)",code:"EPSG:29871"},{description:"Timbalai 1948 / RSO Borneo (ft)",code:"EPSG:29872"},{description:"Timbalai 1948 / RSO Borneo (m)",code:"EPSG:29873"},{description:"TM65 / Irish National Grid",code:"EPSG:29900"},{description:"OSNI 1952 / Irish National Grid",code:"EPSG:29901"},{description:"TM65 / Irish Grid",code:"EPSG:29902"},{description:"TM75 / Irish Grid",code:"EPSG:29903"},{description:"Tokyo / Japan Plane Rectangular CS I",code:"EPSG:30161"},{description:"Tokyo / Japan Plane Rectangular CS II",code:"EPSG:30162"},{description:"Tokyo / Japan Plane Rectangular CS III",code:"EPSG:30163"},{description:"Tokyo / Japan Plane Rectangular CS IV",code:"EPSG:30164"},{description:"Tokyo / Japan Plane Rectangular CS V",code:"EPSG:30165"},{description:"Tokyo / Japan Plane Rectangular CS VI",code:"EPSG:30166"},{description:"Tokyo / Japan Plane Rectangular CS VII",code:"EPSG:30167"},{description:"Tokyo / Japan Plane Rectangular CS VIII",code:"EPSG:30168"},{description:"Tokyo / Japan Plane Rectangular CS IX",code:"EPSG:30169"},{description:"Tokyo / Japan Plane Rectangular CS X",code:"EPSG:30170"},{description:"Tokyo / Japan Plane Rectangular CS XI",code:"EPSG:30171"},{description:"Tokyo / Japan Plane Rectangular CS XII",code:"EPSG:30172"},{description:"Tokyo / Japan Plane Rectangular CS XIII",code:"EPSG:30173"},{description:"Tokyo / Japan Plane Rectangular CS XIV",code:"EPSG:30174"},{description:"Tokyo / Japan Plane Rectangular CS XV",code:"EPSG:30175"},{description:"Tokyo / Japan Plane Rectangular CS XVI",code:"EPSG:30176"},{description:"Tokyo / Japan Plane Rectangular CS XVII",code:"EPSG:30177"},{description:"Tokyo / Japan Plane Rectangular CS XVIII",code:"EPSG:30178"},{description:"Tokyo / Japan Plane Rectangular CS XIX",code:"EPSG:30179"},{description:"Trinidad 1903 / Trinidad Grid",code:"EPSG:30200"},{description:"TC(1948) / UTM zone 39N",code:"EPSG:30339"},{description:"TC(1948) / UTM zone 40N",code:"EPSG:30340"},{description:"Voirol 1875 / Nord Algerie (ancienne)",code:"EPSG:30491"},{description:"Voirol 1875 / Sud Algerie (ancienne)",code:"EPSG:30492"},{description:"Voirol 1879 / Nord Algerie (ancienne)",code:"EPSG:30493"},{description:"Voirol 1879 / Sud Algerie (ancienne)",code:"EPSG:30494"},{description:"Nord Sahara 1959 / UTM zone 29N",code:"EPSG:30729"},{description:"Nord Sahara 1959 / UTM zone 30N",code:"EPSG:30730"},{description:"Nord Sahara 1959 / UTM zone 31N",code:"EPSG:30731"},{description:"Nord Sahara 1959 / UTM zone 32N",code:"EPSG:30732"},{description:"Nord Sahara 1959 / Voirol Unifie Nord",code:"EPSG:30791"},{description:"Nord Sahara 1959 / Voirol Unifie Sud",code:"EPSG:30792"},{description:"RT38 2.5 gon W",code:"EPSG:30800"},{description:"Yoff / UTM zone 28N",code:"EPSG:31028"},{description:"Zanderij / UTM zone 21N",code:"EPSG:31121"},{description:"Zanderij / TM 54 NW",code:"EPSG:31154"},{description:"Zanderij / Suriname Old TM",code:"EPSG:31170"},{description:"Zanderij / Suriname TM",code:"EPSG:31171"},{description:"MGI (Ferro) / Austria GK West Zone",code:"EPSG:31251"},{description:"MGI (Ferro) / Austria GK Central Zone",code:"EPSG:31252"},{description:"MGI (Ferro) / Austria GK East Zone",code:"EPSG:31253"},{description:"MGI / Austria GK West",code:"EPSG:31254"},{description:"MGI / Austria GK Central",code:"EPSG:31255"},{description:"MGI / Austria GK East",code:"EPSG:31256"},{description:"MGI / Austria GK M28",code:"EPSG:31257"},{description:"MGI / Austria GK M31",code:"EPSG:31258"},{description:"MGI / Austria GK M34",code:"EPSG:31259"},{description:"MGI / 3-degree Gauss zone 5",code:"EPSG:31265"},{description:"MGI / 3-degree Gauss zone 6",code:"EPSG:31266"},{description:"MGI / 3-degree Gauss zone 7",code:"EPSG:31267"},{description:"MGI / 3-degree Gauss zone 8",code:"EPSG:31268"},{description:"MGI / Balkans zone 5",code:"EPSG:31275"},{description:"MGI / Balkans zone 6",code:"EPSG:31276"},{description:"MGI / Balkans zone 7",code:"EPSG:31277"},{description:"MGI / Balkans zone 8",code:"EPSG:31278"},{description:"MGI / Balkans zone 8",code:"EPSG:31279"},{description:"MGI (Ferro) / Austria West Zone",code:"EPSG:31281"},{description:"MGI (Ferro) / Austria Central Zone",code:"EPSG:31282"},{description:"MGI (Ferro) / Austria East Zone",code:"EPSG:31283"},{description:"MGI / Austria M28",code:"EPSG:31284"},{description:"MGI / Austria M31",code:"EPSG:31285"},{description:"MGI / Austria M34",code:"EPSG:31286"},{description:"MGI / Austria Lambert",code:"EPSG:31287"},{description:"MGI (Ferro) / M28",code:"EPSG:31288"},{description:"MGI (Ferro) / M31",code:"EPSG:31289"},{description:"MGI (Ferro) / M34",code:"EPSG:31290"},{description:"MGI (Ferro) / Austria West Zone",code:"EPSG:31291"},{description:"MGI (Ferro) / Austria Central Zone",code:"EPSG:31292"},{description:"MGI (Ferro) / Austria East Zone",code:"EPSG:31293"},{description:"MGI / M28",code:"EPSG:31294"},{description:"MGI / M31",code:"EPSG:31295"},{description:"MGI / M34",code:"EPSG:31296"},{description:"MGI / Austria Lambert",code:"EPSG:31297"},{description:"Belge 1972 / Belge Lambert 72",code:"EPSG:31300"},{description:"Belge 1972 / Belgian Lambert 72",code:"EPSG:31370"},{description:"DHDN / 3-degree Gauss zone 1",code:"EPSG:31461"},{description:"DHDN / 3-degree Gauss zone 2",code:"EPSG:31462"},{description:"DHDN / 3-degree Gauss zone 3",code:"EPSG:31463"},{description:"DHDN / 3-degree Gauss zone 4",code:"EPSG:31464"},{description:"DHDN / 3-degree Gauss zone 5",code:"EPSG:31465"},{description:"DHDN / 3-degree Gauss-Kruger zone 2",code:"EPSG:31466"},{description:"DHDN / 3-degree Gauss-Kruger zone 3",code:"EPSG:31467"},{description:"DHDN / 3-degree Gauss-Kruger zone 4",code:"EPSG:31468"},{description:"DHDN / 3-degree Gauss-Kruger zone 5",code:"EPSG:31469"},{description:"Conakry 1905 / UTM zone 28N",code:"EPSG:31528"},{description:"Conakry 1905 / UTM zone 29N",code:"EPSG:31529"},{description:"Dealul Piscului 1930 / Stereo 33",code:"EPSG:31600"},{description:"Dealul Piscului 1970/ Stereo 70",code:"EPSG:31700"},{description:"NGN / UTM zone 38N",code:"EPSG:31838"},{description:"NGN / UTM zone 39N",code:"EPSG:31839"},{description:"KUDAMS / KTM",code:"EPSG:31900"},{description:"KUDAMS / KTM",code:"EPSG:31901"},{description:"SIRGAS 2000 / UTM zone 11N",code:"EPSG:31965"},{description:"SIRGAS 2000 / UTM zone 12N",code:"EPSG:31966"},{description:"SIRGAS 2000 / UTM zone 13N",code:"EPSG:31967"},{description:"SIRGAS 2000 / UTM zone 14N",code:"EPSG:31968"},{description:"SIRGAS 2000 / UTM zone 15N",code:"EPSG:31969"},{description:"SIRGAS 2000 / UTM zone 16N",code:"EPSG:31970"},{description:"SIRGAS 2000 / UTM zone 17N",code:"EPSG:31971"},{description:"SIRGAS 2000 / UTM zone 18N",code:"EPSG:31972"},{description:"SIRGAS 2000 / UTM zone 19N",code:"EPSG:31973"},{description:"SIRGAS 2000 / UTM zone 20N",code:"EPSG:31974"},{description:"SIRGAS 2000 / UTM zone 21N",code:"EPSG:31975"},{description:"SIRGAS 2000 / UTM zone 22N",code:"EPSG:31976"},{description:"SIRGAS 2000 / UTM zone 17S",code:"EPSG:31977"},{description:"SIRGAS 2000 / UTM zone 18S",code:"EPSG:31978"},{description:"SIRGAS 2000 / UTM zone 19S",code:"EPSG:31979"},{description:"SIRGAS 2000 / UTM zone 20S",code:"EPSG:31980"},{description:"SIRGAS 2000 / UTM zone 21S",code:"EPSG:31981"},{description:"SIRGAS 2000 / UTM zone 22S",code:"EPSG:31982"},{description:"SIRGAS 2000 / UTM zone 23S",code:"EPSG:31983"},{description:"SIRGAS 2000 / UTM zone 24S",code:"EPSG:31984"},{description:"SIRGAS 2000 / UTM zone 25S",code:"EPSG:31985"},{description:"SIRGAS 1995 / UTM zone 17N",code:"EPSG:31986"},{description:"SIRGAS 1995 / UTM zone 18N",code:"EPSG:31987"},{description:"SIRGAS 1995 / UTM zone 19N",code:"EPSG:31988"},{description:"SIRGAS 1995 / UTM zone 20N",code:"EPSG:31989"},{description:"SIRGAS 1995 / UTM zone 21N",code:"EPSG:31990"},{description:"SIRGAS 1995 / UTM zone 22N",code:"EPSG:31991"},{description:"SIRGAS 1995 / UTM zone 17S",code:"EPSG:31992"},{description:"SIRGAS 1995 / UTM zone 18S",code:"EPSG:31993"},{description:"SIRGAS 1995 / UTM zone 19S",code:"EPSG:31994"},{description:"SIRGAS 1995 / UTM zone 20S",code:"EPSG:31995"},{description:"SIRGAS 1995 / UTM zone 21S",code:"EPSG:31996"},{description:"SIRGAS 1995 / UTM zone 22S",code:"EPSG:31997"},{description:"SIRGAS 1995 / UTM zone 23S",code:"EPSG:31998"},{description:"SIRGAS 1995 / UTM zone 24S",code:"EPSG:31999"},{description:"SIRGAS 1995 / UTM zone 25S",code:"EPSG:32000"},{description:"NAD27 / Montana North",code:"EPSG:32001"},{description:"NAD27 / Montana Central",code:"EPSG:32002"},{description:"NAD27 / Montana South",code:"EPSG:32003"},{description:"NAD27 / Nebraska North",code:"EPSG:32005"},{description:"NAD27 / Nebraska South",code:"EPSG:32006"},{description:"NAD27 / Nevada East",code:"EPSG:32007"},{description:"NAD27 / Nevada Central",code:"EPSG:32008"},{description:"NAD27 / Nevada West",code:"EPSG:32009"},{description:"NAD27 / New Hampshire",code:"EPSG:32010"},{description:"NAD27 / New Jersey",code:"EPSG:32011"},{description:"NAD27 / New Mexico East",code:"EPSG:32012"},{description:"NAD27 / New Mexico Central",code:"EPSG:32013"},{description:"NAD27 / New Mexico West",code:"EPSG:32014"},{description:"NAD27 / New York East",code:"EPSG:32015"},{description:"NAD27 / New York Central",code:"EPSG:32016"},{description:"NAD27 / New York West",code:"EPSG:32017"},{description:"NAD27 / New York Long Island",code:"EPSG:32018"},{description:"NAD27 / North Carolina",code:"EPSG:32019"},{description:"NAD27 / North Dakota North",code:"EPSG:32020"},{description:"NAD27 / North Dakota South",code:"EPSG:32021"},{description:"NAD27 / Ohio North",code:"EPSG:32022"},{description:"NAD27 / Ohio South",code:"EPSG:32023"},{description:"NAD27 / Oklahoma North",code:"EPSG:32024"},{description:"NAD27 / Oklahoma South",code:"EPSG:32025"},{description:"NAD27 / Oregon North",code:"EPSG:32026"},{description:"NAD27 / Oregon South",code:"EPSG:32027"},{description:"NAD27 / Pennsylvania North",code:"EPSG:32028"},{description:"NAD27 / Pennsylvania South",code:"EPSG:32029"},{description:"NAD27 / Rhode Island",code:"EPSG:32030"},{description:"NAD27 / South Carolina North",code:"EPSG:32031"},{description:"NAD27 / South Carolina South",code:"EPSG:32033"},{description:"NAD27 / South Dakota North",code:"EPSG:32034"},{description:"NAD27 / South Dakota South",code:"EPSG:32035"},{description:"NAD27 / Tennessee",code:"EPSG:32036"},{description:"NAD27 / Texas North",code:"EPSG:32037"},{description:"NAD27 / Texas North Central",code:"EPSG:32038"},{description:"NAD27 / Texas Central",code:"EPSG:32039"},{description:"NAD27 / Texas South Central",code:"EPSG:32040"},{description:"NAD27 / Texas South",code:"EPSG:32041"},{description:"NAD27 / Utah North",code:"EPSG:32042"},{description:"NAD27 / Utah Central",code:"EPSG:32043"},{description:"NAD27 / Utah South",code:"EPSG:32044"},{description:"NAD27 / Vermont",code:"EPSG:32045"},{description:"NAD27 / Virginia North",code:"EPSG:32046"},{description:"NAD27 / Virginia South",code:"EPSG:32047"},{description:"NAD27 / Washington North",code:"EPSG:32048"},{description:"NAD27 / Washington South",code:"EPSG:32049"},{description:"NAD27 / West Virginia North",code:"EPSG:32050"},{description:"NAD27 / West Virginia South",code:"EPSG:32051"},{description:"NAD27 / Wisconsin North",code:"EPSG:32052"},{description:"NAD27 / Wisconsin Central",code:"EPSG:32053"},{description:"NAD27 / Wisconsin South",code:"EPSG:32054"},{description:"NAD27 / Wyoming East",code:"EPSG:32055"},{description:"NAD27 / Wyoming East Central",code:"EPSG:32056"},{description:"NAD27 / Wyoming West Central",code:"EPSG:32057"},{description:"NAD27 / Wyoming West",code:"EPSG:32058"},{description:"NAD27 / Guatemala Norte",code:"EPSG:32061"},{description:"NAD27 / Guatemala Sur",code:"EPSG:32062"},{description:"NAD27 / BLM 14N (ftUS)",code:"EPSG:32064"},{description:"NAD27 / BLM 15N (ftUS)",code:"EPSG:32065"},{description:"NAD27 / BLM 16N (ftUS)",code:"EPSG:32066"},{description:"NAD27 / BLM 17N (ftUS)",code:"EPSG:32067"},{description:"NAD27 / BLM 14N (feet)",code:"EPSG:32074"},{description:"NAD27 / BLM 15N (feet)",code:"EPSG:32075"},{description:"NAD27 / BLM 16N (feet)",code:"EPSG:32076"},{description:"NAD27 / BLM 17N (feet)",code:"EPSG:32077"},{description:"NAD27 / MTM zone 1",code:"EPSG:32081"},{description:"NAD27 / MTM zone 2",code:"EPSG:32082"},{description:"NAD27 / MTM zone 3",code:"EPSG:32083"},{description:"NAD27 / MTM zone 4",code:"EPSG:32084"},{description:"NAD27 / MTM zone 5",code:"EPSG:32085"},{description:"NAD27 / MTM zone 6",code:"EPSG:32086"},{description:"NAD27 / Quebec Lambert",code:"EPSG:32098"},{description:"NAD27 / Louisiana Offshore",code:"EPSG:32099"},{description:"NAD83 / Montana",code:"EPSG:32100"},{description:"NAD83 / Nebraska",code:"EPSG:32104"},{description:"NAD83 / Nevada East",code:"EPSG:32107"},{description:"NAD83 / Nevada Central",code:"EPSG:32108"},{description:"NAD83 / Nevada West",code:"EPSG:32109"},{description:"NAD83 / New Hampshire",code:"EPSG:32110"},{description:"NAD83 / New Jersey",code:"EPSG:32111"},{description:"NAD83 / New Mexico East",code:"EPSG:32112"},{description:"NAD83 / New Mexico Central",code:"EPSG:32113"},{description:"NAD83 / New Mexico West",code:"EPSG:32114"},{description:"NAD83 / New York East",code:"EPSG:32115"},{description:"NAD83 / New York Central",code:"EPSG:32116"},{description:"NAD83 / New York West",code:"EPSG:32117"},{description:"NAD83 / New York Long Island",code:"EPSG:32118"},{description:"NAD83 / North Carolina",code:"EPSG:32119"},{description:"NAD83 / North Dakota North",code:"EPSG:32120"},{description:"NAD83 / North Dakota South",code:"EPSG:32121"},{description:"NAD83 / Ohio North",code:"EPSG:32122"},{description:"NAD83 / Ohio South",code:"EPSG:32123"},{description:"NAD83 / Oklahoma North",code:"EPSG:32124"},{description:"NAD83 / Oklahoma South",code:"EPSG:32125"},{description:"NAD83 / Oregon North",code:"EPSG:32126"},{description:"NAD83 / Oregon South",code:"EPSG:32127"},{description:"NAD83 / Pennsylvania North",code:"EPSG:32128"},{description:"NAD83 / Pennsylvania South",code:"EPSG:32129"},{description:"NAD83 / Rhode Island",code:"EPSG:32130"},{description:"NAD83 / South Carolina",code:"EPSG:32133"},{description:"NAD83 / South Dakota North",code:"EPSG:32134"},{description:"NAD83 / South Dakota South",code:"EPSG:32135"},{description:"NAD83 / Tennessee",code:"EPSG:32136"},{description:"NAD83 / Texas North",code:"EPSG:32137"},{description:"NAD83 / Texas North Central",code:"EPSG:32138"},{description:"NAD83 / Texas Central",code:"EPSG:32139"},{description:"NAD83 / Texas South Central",code:"EPSG:32140"},{description:"NAD83 / Texas South",code:"EPSG:32141"},{description:"NAD83 / Utah North",code:"EPSG:32142"},{description:"NAD83 / Utah Central",code:"EPSG:32143"},{description:"NAD83 / Utah South",code:"EPSG:32144"},{description:"NAD83 / Vermont",code:"EPSG:32145"},{description:"NAD83 / Virginia North",code:"EPSG:32146"},{description:"NAD83 / Virginia South",code:"EPSG:32147"},{description:"NAD83 / Washington North",code:"EPSG:32148"},{description:"NAD83 / Washington South",code:"EPSG:32149"},{description:"NAD83 / West Virginia North",code:"EPSG:32150"},{description:"NAD83 / West Virginia South",code:"EPSG:32151"},{description:"NAD83 / Wisconsin North",code:"EPSG:32152"},{description:"NAD83 / Wisconsin Central",code:"EPSG:32153"},{description:"NAD83 / Wisconsin South",code:"EPSG:32154"},{description:"NAD83 / Wyoming East",code:"EPSG:32155"},{description:"NAD83 / Wyoming East Central",code:"EPSG:32156"},{description:"NAD83 / Wyoming West Central",code:"EPSG:32157"},{description:"NAD83 / Wyoming West",code:"EPSG:32158"},{description:"NAD83 / Puerto Rico \u0026 Virgin Is.",code:"EPSG:32161"},{description:"NAD83 / BLM 14N (ftUS)",code:"EPSG:32164"},{description:"NAD83 / BLM 15N (ftUS)",code:"EPSG:32165"},{description:"NAD83 / BLM 16N (ftUS)",code:"EPSG:32166"},{description:"NAD83 / BLM 17N (ftUS)",code:"EPSG:32167"},{description:"NAD83 / SCoPQ zone 2",code:"EPSG:32180"},{description:"NAD83 / MTM zone 1",code:"EPSG:32181"},{description:"NAD83 / MTM zone 2",code:"EPSG:32182"},{description:"NAD83 / MTM zone 3",code:"EPSG:32183"},{description:"NAD83 / MTM zone 4",code:"EPSG:32184"},{description:"NAD83 / MTM zone 5",code:"EPSG:32185"},{description:"NAD83 / MTM zone 6",code:"EPSG:32186"},{description:"NAD83 / MTM zone 7",code:"EPSG:32187"},{description:"NAD83 / MTM zone 8",code:"EPSG:32188"},{description:"NAD83 / MTM zone 9",code:"EPSG:32189"},{description:"NAD83 / MTM zone 10",code:"EPSG:32190"},{description:"NAD83 / MTM zone 11",code:"EPSG:32191"},{description:"NAD83 / MTM zone 12",code:"EPSG:32192"},{description:"NAD83 / MTM zone 13",code:"EPSG:32193"},{description:"NAD83 / MTM zone 14",code:"EPSG:32194"},{description:"NAD83 / MTM zone 15",code:"EPSG:32195"},{description:"NAD83 / MTM zone 16",code:"EPSG:32196"},{description:"NAD83 / MTM zone 17",code:"EPSG:32197"},{description:"NAD83 / Quebec Lambert",code:"EPSG:32198"},{description:"NAD83 / Louisiana Offshore",code:"EPSG:32199"},{description:"WGS 72 / UTM zone 1N",code:"EPSG:32201"},{description:"WGS 72 / UTM zone 2N",code:"EPSG:32202"},{description:"WGS 72 / UTM zone 3N",code:"EPSG:32203"},{description:"WGS 72 / UTM zone 4N",code:"EPSG:32204"},{description:"WGS 72 / UTM zone 5N",code:"EPSG:32205"},{description:"WGS 72 / UTM zone 6N",code:"EPSG:32206"},{description:"WGS 72 / UTM zone 7N",code:"EPSG:32207"},{description:"WGS 72 / UTM zone 8N",code:"EPSG:32208"},{description:"WGS 72 / UTM zone 9N",code:"EPSG:32209"},{description:"WGS 72 / UTM zone 10N",code:"EPSG:32210"},{description:"WGS 72 / UTM zone 11N",code:"EPSG:32211"},{description:"WGS 72 / UTM zone 12N",code:"EPSG:32212"},{description:"WGS 72 / UTM zone 13N",code:"EPSG:32213"},{description:"WGS 72 / UTM zone 14N",code:"EPSG:32214"},{description:"WGS 72 / UTM zone 15N",code:"EPSG:32215"},{description:"WGS 72 / UTM zone 16N",code:"EPSG:32216"},{description:"WGS 72 / UTM zone 17N",code:"EPSG:32217"},{description:"WGS 72 / UTM zone 18N",code:"EPSG:32218"},{description:"WGS 72 / UTM zone 19N",code:"EPSG:32219"},{description:"WGS 72 / UTM zone 20N",code:"EPSG:32220"},{description:"WGS 72 / UTM zone 21N",code:"EPSG:32221"},{description:"WGS 72 / UTM zone 22N",code:"EPSG:32222"},{description:"WGS 72 / UTM zone 23N",code:"EPSG:32223"},{description:"WGS 72 / UTM zone 24N",code:"EPSG:32224"},{description:"WGS 72 / UTM zone 25N",code:"EPSG:32225"},{description:"WGS 72 / UTM zone 26N",code:"EPSG:32226"},{description:"WGS 72 / UTM zone 27N",code:"EPSG:32227"},{description:"WGS 72 / UTM zone 28N",code:"EPSG:32228"},{description:"WGS 72 / UTM zone 29N",code:"EPSG:32229"},{description:"WGS 72 / UTM zone 30N",code:"EPSG:32230"},{description:"WGS 72 / UTM zone 31N",code:"EPSG:32231"},{description:"WGS 72 / UTM zone 32N",code:"EPSG:32232"},{description:"WGS 72 / UTM zone 33N",code:"EPSG:32233"},{description:"WGS 72 / UTM zone 34N",code:"EPSG:32234"},{description:"WGS 72 / UTM zone 35N",code:"EPSG:32235"},{description:"WGS 72 / UTM zone 36N",code:"EPSG:32236"},{description:"WGS 72 / UTM zone 37N",code:"EPSG:32237"},{description:"WGS 72 / UTM zone 38N",code:"EPSG:32238"},{description:"WGS 72 / UTM zone 39N",code:"EPSG:32239"},{description:"WGS 72 / UTM zone 40N",code:"EPSG:32240"},{description:"WGS 72 / UTM zone 41N",code:"EPSG:32241"},{description:"WGS 72 / UTM zone 42N",code:"EPSG:32242"},{description:"WGS 72 / UTM zone 43N",code:"EPSG:32243"},{description:"WGS 72 / UTM zone 44N",code:"EPSG:32244"},{description:"WGS 72 / UTM zone 45N",code:"EPSG:32245"},{description:"WGS 72 / UTM zone 46N",code:"EPSG:32246"},{description:"WGS 72 / UTM zone 47N",code:"EPSG:32247"},{description:"WGS 72 / UTM zone 48N",code:"EPSG:32248"},{description:"WGS 72 / UTM zone 49N",code:"EPSG:32249"},{description:"WGS 72 / UTM zone 50N",code:"EPSG:32250"},{description:"WGS 72 / UTM zone 51N",code:"EPSG:32251"},{description:"WGS 72 / UTM zone 52N",code:"EPSG:32252"},{description:"WGS 72 / UTM zone 53N",code:"EPSG:32253"},{description:"WGS 72 / UTM zone 54N",code:"EPSG:32254"},{description:"WGS 72 / UTM zone 55N",code:"EPSG:32255"},{description:"WGS 72 / UTM zone 56N",code:"EPSG:32256"},{description:"WGS 72 / UTM zone 57N",code:"EPSG:32257"},{description:"WGS 72 / UTM zone 58N",code:"EPSG:32258"},{description:"WGS 72 / UTM zone 59N",code:"EPSG:32259"},{description:"WGS 72 / UTM zone 60N",code:"EPSG:32260"},{description:"WGS 72 / UTM zone 1S",code:"EPSG:32301"},{description:"WGS 72 / UTM zone 2S",code:"EPSG:32302"},{description:"WGS 72 / UTM zone 3S",code:"EPSG:32303"},{description:"WGS 72 / UTM zone 4S",code:"EPSG:32304"},{description:"WGS 72 / UTM zone 5S",code:"EPSG:32305"},{description:"WGS 72 / UTM zone 6S",code:"EPSG:32306"},{description:"WGS 72 / UTM zone 7S",code:"EPSG:32307"},{description:"WGS 72 / UTM zone 8S",code:"EPSG:32308"},{description:"WGS 72 / UTM zone 9S",code:"EPSG:32309"},{description:"WGS 72 / UTM zone 10S",code:"EPSG:32310"},{description:"WGS 72 / UTM zone 11S",code:"EPSG:32311"},{description:"WGS 72 / UTM zone 12S",code:"EPSG:32312"},{description:"WGS 72 / UTM zone 13S",code:"EPSG:32313"},{description:"WGS 72 / UTM zone 14S",code:"EPSG:32314"},{description:"WGS 72 / UTM zone 15S",code:"EPSG:32315"},{description:"WGS 72 / UTM zone 16S",code:"EPSG:32316"},{description:"WGS 72 / UTM zone 17S",code:"EPSG:32317"},{description:"WGS 72 / UTM zone 18S",code:"EPSG:32318"},{description:"WGS 72 / UTM zone 19S",code:"EPSG:32319"},{description:"WGS 72 / UTM zone 20S",code:"EPSG:32320"},{description:"WGS 72 / UTM zone 21S",code:"EPSG:32321"},{description:"WGS 72 / UTM zone 22S",code:"EPSG:32322"},{description:"WGS 72 / UTM zone 23S",code:"EPSG:32323"},{description:"WGS 72 / UTM zone 24S",code:"EPSG:32324"},{description:"WGS 72 / UTM zone 25S",code:"EPSG:32325"},{description:"WGS 72 / UTM zone 26S",code:"EPSG:32326"},{description:"WGS 72 / UTM zone 27S",code:"EPSG:32327"},{description:"WGS 72 / UTM zone 28S",code:"EPSG:32328"},{description:"WGS 72 / UTM zone 29S",code:"EPSG:32329"},{description:"WGS 72 / UTM zone 30S",code:"EPSG:32330"},{description:"WGS 72 / UTM zone 31S",code:"EPSG:32331"},{description:"WGS 72 / UTM zone 32S",code:"EPSG:32332"},{description:"WGS 72 / UTM zone 33S",code:"EPSG:32333"},{description:"WGS 72 / UTM zone 34S",code:"EPSG:32334"},{description:"WGS 72 / UTM zone 35S",code:"EPSG:32335"},{description:"WGS 72 / UTM zone 36S",code:"EPSG:32336"},{description:"WGS 72 / UTM zone 37S",code:"EPSG:32337"},{description:"WGS 72 / UTM zone 38S",code:"EPSG:32338"},{description:"WGS 72 / UTM zone 39S",code:"EPSG:32339"},{description:"WGS 72 / UTM zone 40S",code:"EPSG:32340"},{description:"WGS 72 / UTM zone 41S",code:"EPSG:32341"},{description:"WGS 72 / UTM zone 42S",code:"EPSG:32342"},{description:"WGS 72 / UTM zone 43S",code:"EPSG:32343"},{description:"WGS 72 / UTM zone 44S",code:"EPSG:32344"},{description:"WGS 72 / UTM zone 45S",code:"EPSG:32345"},{description:"WGS 72 / UTM zone 46S",code:"EPSG:32346"},{description:"WGS 72 / UTM zone 47S",code:"EPSG:32347"},{description:"WGS 72 / UTM zone 48S",code:"EPSG:32348"},{description:"WGS 72 / UTM zone 49S",code:"EPSG:32349"},{description:"WGS 72 / UTM zone 50S",code:"EPSG:32350"},{description:"WGS 72 / UTM zone 51S",code:"EPSG:32351"},{description:"WGS 72 / UTM zone 52S",code:"EPSG:32352"},{description:"WGS 72 / UTM zone 53S",code:"EPSG:32353"},{description:"WGS 72 / UTM zone 54S",code:"EPSG:32354"},{description:"WGS 72 / UTM zone 55S",code:"EPSG:32355"},{description:"WGS 72 / UTM zone 56S",code:"EPSG:32356"},{description:"WGS 72 / UTM zone 57S",code:"EPSG:32357"},{description:"WGS 72 / UTM zone 58S",code:"EPSG:32358"},{description:"WGS 72 / UTM zone 59S",code:"EPSG:32359"},{description:"WGS 72 / UTM zone 60S",code:"EPSG:32360"},{description:"WGS 72BE / UTM zone 1N",code:"EPSG:32401"},{description:"WGS 72BE / UTM zone 2N",code:"EPSG:32402"},{description:"WGS 72BE / UTM zone 3N",code:"EPSG:32403"},{description:"WGS 72BE / UTM zone 4N",code:"EPSG:32404"},{description:"WGS 72BE / UTM zone 5N",code:"EPSG:32405"},{description:"WGS 72BE / UTM zone 6N",code:"EPSG:32406"},{description:"WGS 72BE / UTM zone 7N",code:"EPSG:32407"},{description:"WGS 72BE / UTM zone 8N",code:"EPSG:32408"},{description:"WGS 72BE / UTM zone 9N",code:"EPSG:32409"},{description:"WGS 72BE / UTM zone 10N",code:"EPSG:32410"},{description:"WGS 72BE / UTM zone 11N",code:"EPSG:32411"},{description:"WGS 72BE / UTM zone 12N",code:"EPSG:32412"},{description:"WGS 72BE / UTM zone 13N",code:"EPSG:32413"},{description:"WGS 72BE / UTM zone 14N",code:"EPSG:32414"},{description:"WGS 72BE / UTM zone 15N",code:"EPSG:32415"},{description:"WGS 72BE / UTM zone 16N",code:"EPSG:32416"},{description:"WGS 72BE / UTM zone 17N",code:"EPSG:32417"},{description:"WGS 72BE / UTM zone 18N",code:"EPSG:32418"},{description:"WGS 72BE / UTM zone 19N",code:"EPSG:32419"},{description:"WGS 72BE / UTM zone 20N",code:"EPSG:32420"},{description:"WGS 72BE / UTM zone 21N",code:"EPSG:32421"},{description:"WGS 72BE / UTM zone 22N",code:"EPSG:32422"},{description:"WGS 72BE / UTM zone 23N",code:"EPSG:32423"},{description:"WGS 72BE / UTM zone 24N",code:"EPSG:32424"},{description:"WGS 72BE / UTM zone 25N",code:"EPSG:32425"},{description:"WGS 72BE / UTM zone 26N",code:"EPSG:32426"},{description:"WGS 72BE / UTM zone 27N",code:"EPSG:32427"},{description:"WGS 72BE / UTM zone 28N",code:"EPSG:32428"},{description:"WGS 72BE / UTM zone 29N",code:"EPSG:32429"},{description:"WGS 72BE / UTM zone 30N",code:"EPSG:32430"},{description:"WGS 72BE / UTM zone 31N",code:"EPSG:32431"},{description:"WGS 72BE / UTM zone 32N",code:"EPSG:32432"},{description:"WGS 72BE / UTM zone 33N",code:"EPSG:32433"},{description:"WGS 72BE / UTM zone 34N",code:"EPSG:32434"},{description:"WGS 72BE / UTM zone 35N",code:"EPSG:32435"},{description:"WGS 72BE / UTM zone 36N",code:"EPSG:32436"},{description:"WGS 72BE / UTM zone 37N",code:"EPSG:32437"},{description:"WGS 72BE / UTM zone 38N",code:"EPSG:32438"},{description:"WGS 72BE / UTM zone 39N",code:"EPSG:32439"},{description:"WGS 72BE / UTM zone 40N",code:"EPSG:32440"},{description:"WGS 72BE / UTM zone 41N",code:"EPSG:32441"},{description:"WGS 72BE / UTM zone 42N",code:"EPSG:32442"},{description:"WGS 72BE / UTM zone 43N",code:"EPSG:32443"},{description:"WGS 72BE / UTM zone 44N",code:"EPSG:32444"},{description:"WGS 72BE / UTM zone 45N",code:"EPSG:32445"},{description:"WGS 72BE / UTM zone 46N",code:"EPSG:32446"},{description:"WGS 72BE / UTM zone 47N",code:"EPSG:32447"},{description:"WGS 72BE / UTM zone 48N",code:"EPSG:32448"},{description:"WGS 72BE / UTM zone 49N",code:"EPSG:32449"},{description:"WGS 72BE / UTM zone 50N",code:"EPSG:32450"},{description:"WGS 72BE / UTM zone 51N",code:"EPSG:32451"},{description:"WGS 72BE / UTM zone 52N",code:"EPSG:32452"},{description:"WGS 72BE / UTM zone 53N",code:"EPSG:32453"},{description:"WGS 72BE / UTM zone 54N",code:"EPSG:32454"},{description:"WGS 72BE / UTM zone 55N",code:"EPSG:32455"},{description:"WGS 72BE / UTM zone 56N",code:"EPSG:32456"},{description:"WGS 72BE / UTM zone 57N",code:"EPSG:32457"},{description:"WGS 72BE / UTM zone 58N",code:"EPSG:32458"},{description:"WGS 72BE / UTM zone 59N",code:"EPSG:32459"},{description:"WGS 72BE / UTM zone 60N",code:"EPSG:32460"},{description:"WGS 72BE / UTM zone 1S",code:"EPSG:32501"},{description:"WGS 72BE / UTM zone 2S",code:"EPSG:32502"},{description:"WGS 72BE / UTM zone 3S",code:"EPSG:32503"},{description:"WGS 72BE / UTM zone 4S",code:"EPSG:32504"},{description:"WGS 72BE / UTM zone 5S",code:"EPSG:32505"},{description:"WGS 72BE / UTM zone 6S",code:"EPSG:32506"},{description:"WGS 72BE / UTM zone 7S",code:"EPSG:32507"},{description:"WGS 72BE / UTM zone 8S",code:"EPSG:32508"},{description:"WGS 72BE / UTM zone 9S",code:"EPSG:32509"},{description:"WGS 72BE / UTM zone 10S",code:"EPSG:32510"},{description:"WGS 72BE / UTM zone 11S",code:"EPSG:32511"},{description:"WGS 72BE / UTM zone 12S",code:"EPSG:32512"},{description:"WGS 72BE / UTM zone 13S",code:"EPSG:32513"},{description:"WGS 72BE / UTM zone 14S",code:"EPSG:32514"},{description:"WGS 72BE / UTM zone 15S",code:"EPSG:32515"},{description:"WGS 72BE / UTM zone 16S",code:"EPSG:32516"},{description:"WGS 72BE / UTM zone 17S",code:"EPSG:32517"},{description:"WGS 72BE / UTM zone 18S",code:"EPSG:32518"},{description:"WGS 72BE / UTM zone 19S",code:"EPSG:32519"},{description:"WGS 72BE / UTM zone 20S",code:"EPSG:32520"},{description:"WGS 72BE / UTM zone 21S",code:"EPSG:32521"},{description:"WGS 72BE / UTM zone 22S",code:"EPSG:32522"},{description:"WGS 72BE / UTM zone 23S",code:"EPSG:32523"},{description:"WGS 72BE / UTM zone 24S",code:"EPSG:32524"},{description:"WGS 72BE / UTM zone 25S",code:"EPSG:32525"},{description:"WGS 72BE / UTM zone 26S",code:"EPSG:32526"},{description:"WGS 72BE / UTM zone 27S",code:"EPSG:32527"},{description:"WGS 72BE / UTM zone 28S",code:"EPSG:32528"},{description:"WGS 72BE / UTM zone 29S",code:"EPSG:32529"},{description:"WGS 72BE / UTM zone 30S",code:"EPSG:32530"},{description:"WGS 72BE / UTM zone 31S",code:"EPSG:32531"},{description:"WGS 72BE / UTM zone 32S",code:"EPSG:32532"},{description:"WGS 72BE / UTM zone 33S",code:"EPSG:32533"},{description:"WGS 72BE / UTM zone 34S",code:"EPSG:32534"},{description:"WGS 72BE / UTM zone 35S",code:"EPSG:32535"},{description:"WGS 72BE / UTM zone 36S",code:"EPSG:32536"},{description:"WGS 72BE / UTM zone 37S",code:"EPSG:32537"},{description:"WGS 72BE / UTM zone 38S",code:"EPSG:32538"},{description:"WGS 72BE / UTM zone 39S",code:"EPSG:32539"},{description:"WGS 72BE / UTM zone 40S",code:"EPSG:32540"},{description:"WGS 72BE / UTM zone 41S",code:"EPSG:32541"},{description:"WGS 72BE / UTM zone 42S",code:"EPSG:32542"},{description:"WGS 72BE / UTM zone 43S",code:"EPSG:32543"},{description:"WGS 72BE / UTM zone 44S",code:"EPSG:32544"},{description:"WGS 72BE / UTM zone 45S",code:"EPSG:32545"},{description:"WGS 72BE / UTM zone 46S",code:"EPSG:32546"},{description:"WGS 72BE / UTM zone 47S",code:"EPSG:32547"},{description:"WGS 72BE / UTM zone 48S",code:"EPSG:32548"},{description:"WGS 72BE / UTM zone 49S",code:"EPSG:32549"},{description:"WGS 72BE / UTM zone 50S",code:"EPSG:32550"},{description:"WGS 72BE / UTM zone 51S",code:"EPSG:32551"},{description:"WGS 72BE / UTM zone 52S",code:"EPSG:32552"},{description:"WGS 72BE / UTM zone 53S",code:"EPSG:32553"},{description:"WGS 72BE / UTM zone 54S",code:"EPSG:32554"},{description:"WGS 72BE / UTM zone 55S",code:"EPSG:32555"},{description:"WGS 72BE / UTM zone 56S",code:"EPSG:32556"},{description:"WGS 72BE / UTM zone 57S",code:"EPSG:32557"},{description:"WGS 72BE / UTM zone 58S",code:"EPSG:32558"},{description:"WGS 72BE / UTM zone 59S",code:"EPSG:32559"},{description:"WGS 72BE / UTM zone 60S",code:"EPSG:32560"},{description:"WGS 84 / UTM grid system (northern hemisphere)",code:"EPSG:32600"},{description:"WGS 84 / UTM zone 1N",code:"EPSG:32601"},{description:"WGS 84 / UTM zone 2N",code:"EPSG:32602"},{description:"WGS 84 / UTM zone 3N",code:"EPSG:32603"},{description:"WGS 84 / UTM zone 4N",code:"EPSG:32604"},{description:"WGS 84 / UTM zone 5N",code:"EPSG:32605"},{description:"WGS 84 / UTM zone 6N",code:"EPSG:32606"},{description:"WGS 84 / UTM zone 7N",code:"EPSG:32607"},{description:"WGS 84 / UTM zone 8N",code:"EPSG:32608"},{description:"WGS 84 / UTM zone 9N",code:"EPSG:32609"},{description:"WGS 84 / UTM zone 10N",code:"EPSG:32610"},{description:"WGS 84 / UTM zone 11N",code:"EPSG:32611"},{description:"WGS 84 / UTM zone 12N",code:"EPSG:32612"},{description:"WGS 84 / UTM zone 13N",code:"EPSG:32613"},{description:"WGS 84 / UTM zone 14N",code:"EPSG:32614"},{description:"WGS 84 / UTM zone 15N",code:"EPSG:32615"},{description:"WGS 84 / UTM zone 16N",code:"EPSG:32616"},{description:"WGS 84 / UTM zone 17N",code:"EPSG:32617"},{description:"WGS 84 / UTM zone 18N",code:"EPSG:32618"},{description:"WGS 84 / UTM zone 19N",code:"EPSG:32619"},{description:"WGS 84 / UTM zone 20N",code:"EPSG:32620"},{description:"WGS 84 / UTM zone 21N",code:"EPSG:32621"},{description:"WGS 84 / UTM zone 22N",code:"EPSG:32622"},{description:"WGS 84 / UTM zone 23N",code:"EPSG:32623"},{description:"WGS 84 / UTM zone 24N",code:"EPSG:32624"},{description:"WGS 84 / UTM zone 25N",code:"EPSG:32625"},{description:"WGS 84 / UTM zone 26N",code:"EPSG:32626"},{description:"WGS 84 / UTM zone 27N",code:"EPSG:32627"},{description:"WGS 84 / UTM zone 28N",code:"EPSG:32628"},{description:"WGS 84 / UTM zone 29N",code:"EPSG:32629"},{description:"WGS 84 / UTM zone 30N",code:"EPSG:32630"},{description:"WGS 84 / UTM zone 31N",code:"EPSG:32631"},{description:"WGS 84 / UTM zone 32N",code:"EPSG:32632"},{description:"WGS 84 / UTM zone 33N",code:"EPSG:32633"},{description:"WGS 84 / UTM zone 34N",code:"EPSG:32634"},{description:"WGS 84 / UTM zone 35N",code:"EPSG:32635"},{description:"WGS 84 / UTM zone 36N",code:"EPSG:32636"},{description:"WGS 84 / UTM zone 37N",code:"EPSG:32637"},{description:"WGS 84 / UTM zone 38N",code:"EPSG:32638"},{description:"WGS 84 / UTM zone 39N",code:"EPSG:32639"},{description:"WGS 84 / UTM zone 40N",code:"EPSG:32640"},{description:"WGS 84 / UTM zone 41N",code:"EPSG:32641"},{description:"WGS 84 / UTM zone 42N",code:"EPSG:32642"},{description:"WGS 84 / UTM zone 43N",code:"EPSG:32643"},{description:"WGS 84 / UTM zone 44N",code:"EPSG:32644"},{description:"WGS 84 / UTM zone 45N",code:"EPSG:32645"},{description:"WGS 84 / UTM zone 46N",code:"EPSG:32646"},{description:"WGS 84 / UTM zone 47N",code:"EPSG:32647"},{description:"WGS 84 / UTM zone 48N",code:"EPSG:32648"},{description:"WGS 84 / UTM zone 49N",code:"EPSG:32649"},{description:"WGS 84 / UTM zone 50N",code:"EPSG:32650"},{description:"WGS 84 / UTM zone 51N",code:"EPSG:32651"},{description:"WGS 84 / UTM zone 52N",code:"EPSG:32652"},{description:"WGS 84 / UTM zone 53N",code:"EPSG:32653"},{description:"WGS 84 / UTM zone 54N",code:"EPSG:32654"},{description:"WGS 84 / UTM zone 55N",code:"EPSG:32655"},{description:"WGS 84 / UTM zone 56N",code:"EPSG:32656"},{description:"WGS 84 / UTM zone 57N",code:"EPSG:32657"},{description:"WGS 84 / UTM zone 58N",code:"EPSG:32658"},{description:"WGS 84 / UTM zone 59N",code:"EPSG:32659"},{description:"WGS 84 / UTM zone 60N",code:"EPSG:32660"},{description:"WGS 84 / UPS North",code:"EPSG:32661"},{description:"WGS 84 / Plate Carree",code:"EPSG:32662"},{description:"WGS 84 / World Equidistant Cylindrical",code:"EPSG:32663"},{description:"WGS 84 / BLM 14N (ftUS)",code:"EPSG:32664"},{description:"WGS 84 / BLM 15N (ftUS)",code:"EPSG:32665"},{description:"WGS 84 / BLM 16N (ftUS)",code:"EPSG:32666"},{description:"WGS 84 / BLM 17N (ftUS)",code:"EPSG:32667"},{description:"WGS 84 / UTM grid system (southern hemisphere)",code:"EPSG:32700"},{description:"WGS 84 / UTM zone 1S",code:"EPSG:32701"},{description:"WGS 84 / UTM zone 2S",code:"EPSG:32702"},{description:"WGS 84 / UTM zone 3S",code:"EPSG:32703"},{description:"WGS 84 / UTM zone 4S",code:"EPSG:32704"},{description:"WGS 84 / UTM zone 5S",code:"EPSG:32705"},{description:"WGS 84 / UTM zone 6S",code:"EPSG:32706"},{description:"WGS 84 / UTM zone 7S",code:"EPSG:32707"},{description:"WGS 84 / UTM zone 8S",code:"EPSG:32708"},{description:"WGS 84 / UTM zone 9S",code:"EPSG:32709"},{description:"WGS 84 / UTM zone 10S",code:"EPSG:32710"},{description:"WGS 84 / UTM zone 11S",code:"EPSG:32711"},{description:"WGS 84 / UTM zone 12S",code:"EPSG:32712"},{description:"WGS 84 / UTM zone 13S",code:"EPSG:32713"},{description:"WGS 84 / UTM zone 14S",code:"EPSG:32714"},{description:"WGS 84 / UTM zone 15S",code:"EPSG:32715"},{description:"WGS 84 / UTM zone 16S",code:"EPSG:32716"},{description:"WGS 84 / UTM zone 17S",code:"EPSG:32717"},{description:"WGS 84 / UTM zone 18S",code:"EPSG:32718"},{description:"WGS 84 / UTM zone 19S",code:"EPSG:32719"},{description:"WGS 84 / UTM zone 20S",code:"EPSG:32720"},{description:"WGS 84 / UTM zone 21S",code:"EPSG:32721"},{description:"WGS 84 / UTM zone 22S",code:"EPSG:32722"},{description:"WGS 84 / UTM zone 23S",code:"EPSG:32723"},{description:"WGS 84 / UTM zone 24S",code:"EPSG:32724"},{description:"WGS 84 / UTM zone 25S",code:"EPSG:32725"},{description:"WGS 84 / UTM zone 26S",code:"EPSG:32726"},{description:"WGS 84 / UTM zone 27S",code:"EPSG:32727"},{description:"WGS 84 / UTM zone 28S",code:"EPSG:32728"},{description:"WGS 84 / UTM zone 29S",code:"EPSG:32729"},{description:"WGS 84 / UTM zone 30S",code:"EPSG:32730"},{description:"WGS 84 / UTM zone 31S",code:"EPSG:32731"},{description:"WGS 84 / UTM zone 32S",code:"EPSG:32732"},{description:"WGS 84 / UTM zone 33S",code:"EPSG:32733"},{description:"WGS 84 / UTM zone 34S",code:"EPSG:32734"},{description:"WGS 84 / UTM zone 35S",code:"EPSG:32735"},{description:"WGS 84 / UTM zone 36S",code:"EPSG:32736"},{description:"WGS 84 / UTM zone 37S",code:"EPSG:32737"},{description:"WGS 84 / UTM zone 38S",code:"EPSG:32738"},{description:"WGS 84 / UTM zone 39S",code:"EPSG:32739"},{description:"WGS 84 / UTM zone 40S",code:"EPSG:32740"},{description:"WGS 84 / UTM zone 41S",code:"EPSG:32741"},{description:"WGS 84 / UTM zone 42S",code:"EPSG:32742"},{description:"WGS 84 / UTM zone 43S",code:"EPSG:32743"},{description:"WGS 84 / UTM zone 44S",code:"EPSG:32744"},{description:"WGS 84 / UTM zone 45S",code:"EPSG:32745"},{description:"WGS 84 / UTM zone 46S",code:"EPSG:32746"},{description:"WGS 84 / UTM zone 47S",code:"EPSG:32747"},{description:"WGS 84 / UTM zone 48S",code:"EPSG:32748"},{description:"WGS 84 / UTM zone 49S",code:"EPSG:32749"},{description:"WGS 84 / UTM zone 50S",code:"EPSG:32750"},{description:"WGS 84 / UTM zone 51S",code:"EPSG:32751"},{description:"WGS 84 / UTM zone 52S",code:"EPSG:32752"},{description:"WGS 84 / UTM zone 53S",code:"EPSG:32753"},{description:"WGS 84 / UTM zone 54S",code:"EPSG:32754"},{description:"WGS 84 / UTM zone 55S",code:"EPSG:32755"},{description:"WGS 84 / UTM zone 56S",code:"EPSG:32756"},{description:"WGS 84 / UTM zone 57S",code:"EPSG:32757"},{description:"WGS 84 / UTM zone 58S",code:"EPSG:32758"},{description:"WGS 84 / UTM zone 59S",code:"EPSG:32759"},{description:"WGS 84 / UTM zone 60S",code:"EPSG:32760"},{description:"WGS 84 / UPS South",code:"EPSG:32761"},{description:"WGS 84 / TM 36 SE",code:"EPSG:32766"}],getReference:function(a){if(this.isUrn(a)){a=oscar.Util.EpsgConversion.urnToEpsg(a)
}for(var c in this.coords){var b=this.coords[c];
if(b.code==a){b.urn=oscar.Util.EpsgConversion.epsgToUrn(a);
return b
}}return{code:a,urn:oscar.Util.EpsgConversion.epsgToUrn(a),description:a}
},isUrn:function(a){if(a.indexOf("::")==-1){return false
}else{return true
}}};
oscar.Util.Transform={transform:function(a,c){try{var d=new XSLTProcessor();
d.importStylesheet(c);
var b=d.transformToFragment(a,document);
return b
}catch(e){var b=a.transformNode(c);
return b
}}};
oscar.Util.Help=oscar.BaseClass({baseUrl:oscar._getScriptLocation(),helpDir:"help/",helpFile:"help_{local}.xml",helpStyle:"help.xsl",dialog:null,initialize:function(b,a){if(a){OpenLayers.Util.extend(this,a)
}this.helpReference=b;
this.help()
},help:function(){var a=this.baseUrl+this.helpDir+this.helpFile;
a=a.replaceAll("{local}",OpenLayers.Lang.getCode());
OpenLayers.Request.GET({url:a,async:false,success:function(b){this.xmlDocument=b.responseXML
},failure:function(b){new oscar.Gui.AlertDialog(oscar.i18n("Error"),oscar.i18n("FileNotFound"),{width:300,height:100,draggable:true})
},scope:this});
if(!this.xmlDocument){return
}OpenLayers.Request.GET({url:this.baseUrl+this.helpDir+this.helpStyle,async:false,success:function(b){this.xslDocument=b.responseXML
},failure:function(b){alert("Unable to retrive help document")
},scope:this});
if(!this.xslDocument){return
}this.createDialog()
},render:function(){if(this.xmlDocument&&this.xslDocument){oscar.jQuery(this.div).hide();
if((helpNode=this.getHelpNode())){var a=oscar.Util.Transform.transform(helpNode,this.xslDocument);
if(typeof a=="string"){this.div.innerHTML=a
}else{this.div.appendChild(a)
}}oscar.jQuery(this.div).fadeIn()
}},getHelpNode:function(){var d=this.xmlDocument.documentElement.childNodes;
var c,f;
for(var b=0;
b<d.length;
++b){c=d[b];
if(c.nodeType==1){var e={};
for(var a=0;
a<c.attributes.length;
a++){var g=c.attributes[a];
if(g.nodeName=="id"&&g.nodeValue==this.helpReference){return c
}}}}return false
},createDialog:function(){this.dialog=new oscar.Gui.Dialog("Help",{draggable:true,modal:false,width:350,height:350,zIndex:2000});
var b=oscar.i18n("Help");
this.dialog.setHeader(b);
this.div=document.createElement("div");
this.div.setAttribute("class","help");
this.dialog.setContent(this.div);
var a=function(c){return function(){c.dialog.destroy();
c.dialog=null
}
};
this.dialog.createButton(oscar.i18n("Close"),a(this));
this.dialog.show();
this.render()
},CLASS_NAME:"oscar.Util.Help"});
oscar.Lang={addTranslation:function(c,b,d){var a=oscar.Lang.getDictionary(c);
if(b&&d){a[b]=d
}return a
},getDictionary:function(a){var b=OpenLayers.Lang[a];
if(!b){OpenLayers.Lang[a]={}
}return OpenLayers.Lang[a]
},CLASS_NAME:"oscar.Lang"};
oscar.addi18n=oscar.Lang.addTranslation;
oscar.i18n=OpenLayers.i18n;
OpenLayers.Util.applyDefaults(oscar.Lang.getDictionary("en"),{alertBoxHeader:"Warning!",confirmBoxHeader:"Warning!",yesButtonLabel:"Yes",cancelButtonLabel:"Cancel",okayButtonLabel:"Okay",confirmDeleteMessage:"Are you sure you want to delete this item?",confirmRemoveMessage:"Are you sure you want to remove this item?",oneChecked:"At least one item must be checked.",nameColumnLabel:"Name",statusColumnLabel:"Status",typeColumnLabel:"Type",valueColumnLabel:"Value",resetColumnLabel:"Reset",modified:"Modified","default":"Default",confirmReset:"Reset value to default?",saveButtonLabel:"Save",Themes:"&nbsp;",Basic:"Basic",Advanced:"Advanced",ExtractDataDlgHeader:"Extract Data",Coverages:"Coverages",Custom:"Custom","Current View":"Current View",Features:"Features",Fields:"Fields","Format Type":"Format Type",Layers:"Layers",Data:"Data",Download:"Download",Format:"Format",Help:"Help",Close:"Close",Loading:"Loading",Capabilities:"Capabilities",Output:"Output","Please Wait":"Please wait ...","Retrieving Features":"Retrieving Features",Service:"Service",Title:"Title",Units:"Units",english:"Imperial",metric:"Metric",geographic:"Geographic",Area:"Area",Distance:"Distance",Range:"Range",Point:"Point",MeasurementToole:"Measurement Tool",srsCodeColumnLabel:"Coordinate System",srsDescriptionColumnLabel:"Description",first:"&lt;&lt;",last:"&gt;&gt;",previous:"&lt;",next:"&gt;",MapInformationDlgHeader:"Map Information",servicepanel_info_header:"Service Information",servicepanel_content_header:"Service Contents",md_abstract_label:"Abstract",md_keywords_label:"Keywords",md_resources_label:"Resources",md_service_info:"Service Information",md_service_Info:"Service Information",md_service_contactInfo:"Contact Information",md_service_ContactInfo:"Contact Information",md_contact_caption:"Contact Information",md_contact_Caption:"Contact Information",md_contact_providerName:"Provider Name",md_contact_ProviderName:"Provider Name",md_contact_providerSite:"Provider Site",md_contact_ProviderSite:"Provider Site",md_contact_individualName:"Individual Name",md_contact_IndividualName:"Individual Name",md_contact_person:"Individual Name",md_contact_Person:"Individual Name",md_contact_organization:"Organization",md_contact_Organization:"Organization",md_contact_positionName:"Position Name",md_contact_PositionName:"Position Name",md_contact_position:"Position Name",md_contact_Position:"Position Name",md_contact_type:"Type",md_contact_Type:"Type",md_contact_address:"Address",md_contact_Address:"Address",md_contact_deliveryPoint:"Address",md_contact_DeliveryPoint:"Address",md_contact_city:"City",md_contact_City:"City",md_contact_stateOrProvince:"Province/State",md_contact_StateOrProvince:"Province/State",md_contact_administrativeArea:"Province/State",md_contact_AdministrativeArea:"Province/State",md_contact_postcode:"Zip / Postal Code",md_contact_Postcode:"Zip / Postal Code",md_contact_postalCode:"Zip / Postal Code",md_contact_PostalCode:"Zip / Postal Code",md_contact_country:"Country",md_contact_Country:"Country",md_contact_phone:"Phone",md_contact_Phone:"Phone",md_contact_voice:"Phone",md_contact_Voice:"Phone",md_contact_facsimile:"Fax",md_contact_Facsimile:"Fax",md_contact_fax:"Fax",md_contact_Fax:"Fax",md_contact_email:"Email",md_contact_Email:"Email",md_contact_electronicMailAddress:"Email",md_contact_ElectronicMailAddress:"Email",md_contact_info_unavailable:"Contact information unavailable",md_contact_Info_Unavailable:"Contact information unavailable",md_contact_onlineResource:"Online Resource",md_legend_graphic:"Legend",md_request_failed:"Service Unavailable","map.information.url.column.type":"Type","map.information.url.column.format":"Format","map.information.url.column.onlineresource":"Online Resource","map.information.no.records.found":"No records found.",mict_clearFilter_icon:"Clear Filter",mict_reset_icon:"Reset",mict_autocomplete_label:"Search",mict_checkAll_label:"Select All",mdec_coverage_type:"Coverages",mdec_feature_type:"Feature Types",mdec_data_connections:"Data Connections",mdec_data_connection_none:"None",oscar_control_select:"Select areas of interest.",openlayers_control_navigation:"Use the SHIFT key for zoom activation.",oscar_control_extractor:"Download areas of interest.",NoThemesAvailable:"No Themes Available",NotAvailable:"Not Available","tooltip_oscar.control.previousview":"Previous View","tooltip_oscar.control.measure":"Measurement Tools","tooltip_oscar.control.select":"Selection Tools","tooltip_oscar.control.dataextractor":"Data Download Tool",MICT_MSG_EMPTY:"No records found.",MICT_MSG_ERROR:"Data error.",MICT_MSG_LOADING:"Loading...",MICT_MSG_SORTASC:"Click to sort ascending",MICT_MSG_SORTDESC:"Click to sort descending",LayerToggleToolTip:"Turn layers on or off",LayerToggleTitle:"Layers",ThemeSwitcherToolTip:"Switch between themes",ThemeSwitcherTitle:"Themes",SelectionError:"Selection Error",ProcessingInfo:"Processing ...",metadataKeywordLabel:"Keyword",metadataVocabularyLabel:"Vocabulary",DataDiscoverySearchToolTip:"Search for data in the map",DataDiscoverySearchTitle:"Download",Search:"Search",DownloadOptions:"Options",DownloadQueue:"Queue",Crop:"Crop",AddToQueue:"Queue"});
OpenLayers.Util.applyDefaults(oscar.Lang.getDictionary("es"),{alertBoxHeader:"Advertencia!",confirmBoxHeader:"Advertencia!",yesButtonLabel:"S\u00ed",cancelButtonLabel:"Cancelar",okayButtonLabel:"Aceptar",confirmDeleteMessage:"\u017cEst\u00e1 seguro que quiere suprimir este elemento?",confirmRemoveMessage:"\u017cEst\u00e1 seguro que quiere eliminar este elemento?",oneChecked:"Al menos un elemento debe ser comprobado.",nameColumnLabel:"Nombre",statusColumnLabel:"Estado",typeColumnLabel:"Tipo",valueColumnLabel:"Valor",resetColumnLabel:"Restituir",modified:"Modificado","default":"Por defecto",confirmReset:"\u00bfRestablecer el valor por defecto?",saveButtonLabel:"Guardar",Themes:"&nbsp;",Basic:"B\u00e1sico",Advanced:"Avanzado",Coverages:"Coberturas",ExtractDataDlgHeader:"Extracci\u00f3n de datos",Data:"datos",Custom:"Personalizar","Current View":"Vista actual",Features:"Objetos",Fields:"Campos","Format Type":"Tipo de formato",Layers:"Capas",Download:"Descargar",Format:"Formato",Help:"Ayuda",Close:"Cerrar",Loading:"Carga",Capabilities:"Capacidades",Output:"Salida","Please Wait":"Espere por favor...","Retrieving Features":"Recuperaci\u00f3n de objetos ",Service:"Servicio",Units:"Unidades",english:"Imperial",metric:"M\u00e9trico",geographic:"Geogr\u00e1fico",Area:"\u00c1rea",Title:"T\u00edtulo",Distance:"Distancia",Range:"Rango",Point:"Punto",MeasurementToole:"Herramienta de medici\u00f3n",srsCodeColumnLabel:"Sistema de coordenadas",srsDescriptionColumnLabel:"Descripci\u00f3n",first:"&lt;&lt;",last:"&gt;&gt;",previous:"&lt;",next:"&gt;",MapInformationDlgHeader:"Informati\u00f3n de la carta",servicepanel_info_header:"Informaci\u00f3n del Servicio",servicepanel_content_header:"Contenido del Servicio",md_abstract_label:"Resumen",md_keywords_label:"Palabras claves",md_resources_label:"Recursos",md_service_info:"Informaci\u00f3n del Servicio",md_service_Info:"Informaci\u00f3n del Servicio",md_service_contactInfo:"Informaci\u00f3n de Contacto",md_service_ContactInfo:"Informaci\u00f3n de Contacto",md_contact_caption:"Informaci\u00f3n de Contacto",md_contact_Caption:"Informaci\u00f3n de Contacto",md_contact_providerName:"Nombre del proveedor",md_contact_ProviderName:"Nombre del proveedor",md_contact_providerSite:"Proveedor del Sitio",md_contact_ProviderSite:"Proveedor del Sitio",md_contact_individualName:"Nombre de la persona",md_contact_IndividualName:"Nombre de la persona",md_contact_person:"Nombre de la persona",md_contact_Person:"Nombre de la persona",md_contact_organization:"Organizaci\u00f3n",md_contact_Organization:"Organizaci\u00f3n",md_contact_positionName:"Nombre de Posici\u00f3n",md_contact_PositionName:"Nombre de Posici\u00f3n",md_contact_position:"Nombre de Posici\u00f3n",md_contact_Position:"Nombre de Posici\u00f3n",md_contact_type:"Tipo",md_contact_Type:"Tipo",md_contact_address:"Domicilio",md_contact_Address:"Domicilio",md_contact_deliveryPoint:"Domicilio",md_contact_DeliveryPoint:"Domicilio",md_contact_city:"Ciudad",md_contact_City:"Ciudad",md_contact_stateOrProvince:"Provincia o Estado",md_contact_StateOrProvince:"Provincia o Estado",md_contact_administrativeArea:"Provincia o Estado",md_contact_AdministrativeArea:"Provincia o Estado",md_contact_postcode:"C\u00f3digo postal o zip",md_contact_Postcode:"C\u00f3digo postal o zip",md_contact_postalCode:"C\u00f3digo postal o zip",md_contact_PostalCode:"C\u00f3digo postal o zip",md_contact_country:"Pa\u00eds",md_contact_Country:"Pa\u00eds",md_contact_phone:"Tel\u00e9fono",md_contact_Phone:"Tel\u00e9fono",md_contact_voice:"Tel\u00e9fono",md_contact_Voice:"Tel\u00e9fono",md_contact_fax:"Fax",md_contact_Fax:"Fax",md_contact_facsimile:"Fax",md_contact_Facsimile:"Fax",md_contact_email:"Correo electr\u00f3nico",md_contact_Email:"Correo electr\u00f3nico",md_contact_electronicMailAddress:"Correo electr\u00f3nico",md_contact_ElectronicMailAddress:"Correo electr\u00f3nico",md_contact_info_unavailable:"Informaci\u00f3n de contacto no disponible",md_contact_Info_Unavailable:"Informaci\u00f3n de contacto no disponible",md_contact_onlineResource:"Recurso en L\u00ednea",md_legend_graphic:"Leyenda",md_request_failed:"Service Unavailable","map.information.url.column.type":"Tipo","map.information.url.column.format":"Formato","map.information.url.column.onlineresource":"Recursos en l\u00ednea","map.information.no.records.found":"No se encontraron registros.",mict_clearFilter_icon:"Borrar filtro",mict_reset_icon:"Restituir",mict_autocomplete_label:"Buscar",mict_checkAll_label:"Seleccionar todo",mdec_coverage_type:"Coberturas",mdec_feature_type:"Tipos de Objetos",mdec_data_connections:"Conexi\u00f3n de datos",mdec_data_connection_none:"Ninguno",oscar_control_select:"Selecionar \u00e1reas de inter\u00e9s",openlayers_control_navigation:"{translate} - Use the SHIFT key for zoom activation.",oscar_control_extractor:"Descargar \u00e1reas de inter\u00e9s",NoThemesAvailable:"No hay temas disponibles",NotAvailable:"No disponible","tooltip_oscar.control.previousview":"Vista Anterior","tooltip_oscar.control.measure":"Herramientas de Medici\u00f3n","tooltip_oscar.control.select":"Herramientas de Selecci\u00f3n","tooltip_oscar.control.dataextractor":"Herramienta de Descarga de Datos",MICT_MSG_EMPTY:"No se encontraron registros.",MICT_MSG_ERROR:"Error de datos.",MICT_MSG_LOADING:"Cargando ...",MICT_MSG_SORTASC:"Haga clic para para organizar orden ascendente",MICT_MSG_SORTDESC:"Haga clic para organizar en orden descendente",LayerToggleToolTip:"Capas Activar o desactivar",LayerToggleTitle:"Capas",ThemeSwitcherToolTip:"Cambiar de un tema a otro",ThemeSwitcherTitle:"Temas",SelectionError:"Error en Selecci\u00f3n",ProcessingInfo:"Procesando ...",DownloadManagerTitle:"Administrador de descargas",DownloadManagerToolTip:"Realiza un seguimiento de las descargas de wcs.",metadataKeywordLabel:"Palabra Clave",metadataVocabularyLabel:"Vocabulario",DataDiscoverySearchToolTip:"Buscar datos en el mapa",DataDiscoverySearchTitle:"Descarga de datos",Search:"Buscar",DownloadOptions:"Opciones de descarga",DownloadQueue:"Cola de descarga",Crop:"Recortar",AddToQueue:"Cola de descarga"});
OpenLayers.Util.applyDefaults(oscar.Lang.getDictionary("fr"),{alertBoxHeader:"Attention!",confirmBoxHeader:"Attention!",yesButtonLabel:"Oui",cancelButtonLabel:"Annuler",okayButtonLabel:"Okay",confirmDeleteMessage:"\u0118tes-vous s\u0171r de vouloir supprimer cet \u00e9l\u00e9ment ?",confirmRemoveMessage:"\u0118tes-vous s\u0171r de vouloir \u00e9liminer cet \u00e9l\u00e9ment ?",oneChecked:"Au moins un \u00e9l\u00e9ment doit \u0119tre v\u00e9rifi\u00e9.",nameColumnLabel:"Nom",statusColumnLabel:"\u00c9tat",typeColumnLabel:"Type",valueColumnLabel:"Valeur",resetColumnLabel:"R\u00e9tablir",modified:"Modifi\u00e9","default":"Par d\u00e9faut",confirmReset:"R\u00e9tablir la valeur par d\u00e9faut ?",saveButtonLabel:"Sauvegarder",Themes:"&nbsp;",Basic:"Base",Advanced:"Avanc\u00e9",Coverages:"Couvertures",ExtractDataDlgHeader:"Extraction de donn\u00e9es",Custom:"Personnaliser","Current View":"Vue en cours",Features:"Objets",Fields:"Champs","Format Type":"Type de format",Layers:"Couches",Data:"Donn\u00e9es",Download:"T\u00e9l\u00e9charger",Format:"Format",Help:"Aide",Close:"Fermer",Loading:"Chargement",Capabilities:"Capacit\u00e9s",Output:"Sortie","Please Wait":"Attendez s'il vous pla\u00eet...","Retrieving Features":"R\u00e9cup\u00e9ration des objets",Service:"Service",Units:"Unit\u00e9s",english:"Imp\u00e9riale",metric:"M\u00e9trique",geographic:"G\u00e9ographique",Area:"Aire",Distance:"Distance",Range:"P\u00e9rim\u00e8tre",Point:"Point",Title:"Titre",MeasurementToole:"Outil de mesure",srsCodeColumnLabel:"Syst\u00e8me de coordonn\u00e9es",srsDescriptionColumnLabel:"Description",first:"&lt;&lt;",last:"&gt;&gt;",previous:"&lt;",next:"&gt;",MapInformationDlgHeader:"Informations de carte",servicepanel_info_header:"Information de Service",servicepanel_content_header:"Contenu du Service",md_abstract_label:"R\u00e9sum\u00e9",md_keywords_label:"Mots-cl\u00e9s",md_resources_label:"Ressources",md_service_info:"Information de Service",md_service_Info:"Information de Service",md_service_contactInfo:"Coordonn\u00e9es",md_service_ContactInfo:"Coordonn\u00e9es",md_contact_caption:"Coordonn\u00e9es",md_contact_Caption:"Coordonn\u00e9es",md_contact_providerName:"Nom du fournisseur",md_contact_ProviderName:"Nom du fournisseur",md_contact_providerSite:"Fournisseur de site",md_contact_ProviderSite:"Fournisseur de site",md_contact_individualName:"Nom de la personne",md_contact_IndividualName:"Nom de la personne",md_contact_person:"Nom de la personne",md_contact_Person:"Nom de la personne",md_contact_organization:"Organisation",md_contact_Organization:"Organisation",md_contact_positionName:"Nom de Poste",md_contact_PositionName:"Nom de Poste",md_contact_position:"Poste",md_contact_Position:"Poste",md_contact_type:"Type",md_contact_Type:"Type",md_contact_address:"Adresse",md_contact_Address:"Adresse",md_contact_deliveryPoint:"Adresse",md_contact_DeliveryPoint:"Adresse",md_contact_city:"Ville",md_contact_City:"Ville",md_contact_stateOrProvince:"Province ou \u00c9tat",md_contact_StateOrProvince:"Province ou \u00c9tat",md_contact_administrativeArea:"Province ou \u00c9tat",md_contact_AdministrativeArea:"Province ou \u00c9tat",md_contact_postcode:"Code postal ou zip",md_contact_Postcode:"Code postal ou zip",md_contact_postalCode:"Code postal ou zip",md_contact_PostalCode:"Code postal ou zip",md_contact_country:"Pays",md_contact_Country:"Pays",md_contact_phone:"Num\u00e9ro de t\u00e9l\u00e9phone",md_contact_Phone:"Num\u00e9ro de t\u00e9l\u00e9phone",md_contact_voice:"Num\u00e9ro de t\u00e9l\u00e9phone",md_contact_Voice:"Num\u00e9ro de t\u00e9l\u00e9phone",md_contact_fax:"Fax",md_contact_Fax:"Fax",md_contact_facsimile:"Fax",md_contact_Facsimile:"Fax",md_contact_email:"Courrier \u00e9lectronique",md_contact_Email:"Courrier \u00e9lectronique",md_contact_electronicMailAddress:"Courrier \u00e9lectronique",md_contact_ElectronicMailAddress:"Courrier \u00e9lectronique",md_contact_info_unavailable:"Information n'est pas disponible",md_contact_Info_Unavailable:"Information n'est pas disponible",md_contact_onlineResource:"Ressource en Ligne",md_legend_graphic:"L\u00e9gende",md_request_failed:"Service Unavailable","map.information.url.column.type":"Type","map.information.url.column.format":"Format","map.information.url.column.onlineresource":"Ressources en ligne","map.information.no.records.found":"Aucun document n'a \u00e9t\u00e9 trouv\u00e9.",mict_clearFilter_icon:"Effacer le filtre",mict_reset_icon:"R\u00e9tablir",mict_autocomplete_label:"Chercher",mict_checkAll_label:"S\u00e9lectionner Tout",mdec_coverage_type:"Couvertures",mdec_feature_type:"Types d\u2019Objets",mdec_data_connections:"Connexions de donn\u00e9e",mdec_data_connection_none:"Aucun",oscar_control_select:"S\u00e9lectionner les zones d'int\u00e9r\u00eat",openlayers_control_navigation:"{translate} - Use the SHIFT key for zoom activation.",oscar_control_extractor:"T\u00e9l\u00e9charger les zones d'int\u00e9r\u00eat",NoThemesAvailable:"Aucun th\u00e8me disponible",NotAvailable:"Non disponible","tooltip_oscar.control.previousview":"Affichage Pr\u00e9c\u00e9dent","tooltip_oscar.control.measure":"Outils de Mesure","tooltip_oscar.control.select":"Outils de S\u00e9lection","tooltip_oscar.control.dataextractor":"Outil de T\u00e9l\u00e9chargement de Donn\u00e9es",MICT_MSG_EMPTY:"Aucun r\u00e9sultat trouv\u00e9.",MICT_MSG_ERROR:"Erreur de donn\u00e9es.",MICT_MSG_LOADING:"Chargement en cours ...",MICT_MSG_SORTASC:"Cliquez ici pour organiser en ordre croissant",MICT_MSG_SORTDESC:"Cliquez ici pour organiser en ordre d\u00e9croissant",LayerToggleToolTip:"Couches Activer ou d\u00e9sactiver",LayerToggleTitle:"Couches",ThemeSwitcherToolTip:"Basculer entre les th\u00e8mes",ThemeSwitcherTitle:"Th\u00e8mes",SelectionError:"Erreur dans la S\u00e9lection",ProcessingInfo:"Traitement en cours ...",DownloadManagerTitle:"Gestionnaire de t\u00e9l\u00e9chargement",DownloadManagerToolTip:"Recherche de données dans la carte",metadataKeywordLabel:"Mot-cl\u00e9",metadataVocabularyLabel:"Vocabulaire",DataDiscoverySearchToolTip:"Recherche de donn\u00e9es dans la carte",DataDiscoverySearchTitle:"T\u00e9l\u00e9chargement des donn\u00e9es",Search:"Chercher",DownloadOptions:"Options de t\u00e9l\u00e9chargement",DownloadQueue:"File d'attente de t\u00e9l\u00e9chargement",Crop:"Rognage",AddToQueue:"File d'attente de t\u00e9l\u00e9chargement"});
oscar.FramedCloud=oscar.BaseClass(OpenLayers.Popup.FramedCloud,{positionBlocks:{tl:{offset:new OpenLayers.Pixel(51,4),padding:new OpenLayers.Bounds(8,40,8,9),blocks:[{size:new OpenLayers.Size("auto","auto"),anchor:new OpenLayers.Bounds(0,51,22,0),position:new OpenLayers.Pixel(0,0)},{size:new OpenLayers.Size(22,"auto"),anchor:new OpenLayers.Bounds(null,50,0,0),position:new OpenLayers.Pixel(-638,0)},{size:new OpenLayers.Size("auto",19),anchor:new OpenLayers.Bounds(0,32,22,null),position:new OpenLayers.Pixel(0,-631)},{size:new OpenLayers.Size(22,18),anchor:new OpenLayers.Bounds(null,32,0,null),position:new OpenLayers.Pixel(-638,-632)},{size:new OpenLayers.Size(80,40),anchor:new OpenLayers.Bounds(null,0,0,null),position:new OpenLayers.Pixel(0,-681)}]},tr:{offset:new OpenLayers.Pixel(-54,4),padding:new OpenLayers.Bounds(8,40,8,9),blocks:[{size:new OpenLayers.Size("auto","auto"),anchor:new OpenLayers.Bounds(0,51,22,0),position:new OpenLayers.Pixel(0,0)},{size:new OpenLayers.Size(22,"auto"),anchor:new OpenLayers.Bounds(null,50,0,0),position:new OpenLayers.Pixel(-638,0)},{size:new OpenLayers.Size("auto",19),anchor:new OpenLayers.Bounds(0,32,22,null),position:new OpenLayers.Pixel(0,-631)},{size:new OpenLayers.Size(22,19),anchor:new OpenLayers.Bounds(null,32,0,null),position:new OpenLayers.Pixel(-638,-631)},{size:new OpenLayers.Size(80,40),anchor:new OpenLayers.Bounds(0,0,null,null),position:new OpenLayers.Pixel(-215,-681)}]},bl:{offset:new OpenLayers.Pixel(41,-24),padding:new OpenLayers.Bounds(8,9,8,40),blocks:[{size:new OpenLayers.Size("auto","auto"),anchor:new OpenLayers.Bounds(0,21,22,32),position:new OpenLayers.Pixel(0,0)},{size:new OpenLayers.Size(22,"auto"),anchor:new OpenLayers.Bounds(null,21,0,32),position:new OpenLayers.Pixel(-638,0)},{size:new OpenLayers.Size("auto",21),anchor:new OpenLayers.Bounds(0,0,22,null),position:new OpenLayers.Pixel(0,-629)},{size:new OpenLayers.Size(22,21),anchor:new OpenLayers.Bounds(null,0,0,null),position:new OpenLayers.Pixel(-638,-629)},{size:new OpenLayers.Size(80,40),anchor:new OpenLayers.Bounds(null,null,0,0),position:new OpenLayers.Pixel(-100,-674)}]},br:{offset:new OpenLayers.Pixel(-61,-24),padding:new OpenLayers.Bounds(8,9,8,40),blocks:[{size:new OpenLayers.Size("auto","auto"),anchor:new OpenLayers.Bounds(0,21,22,32),position:new OpenLayers.Pixel(0,0)},{size:new OpenLayers.Size(22,"auto"),anchor:new OpenLayers.Bounds(null,21,0,32),position:new OpenLayers.Pixel(-638,0)},{size:new OpenLayers.Size("auto",21),anchor:new OpenLayers.Bounds(0,0,22,null),position:new OpenLayers.Pixel(0,-629)},{size:new OpenLayers.Size(22,21),anchor:new OpenLayers.Bounds(null,0,0,null),position:new OpenLayers.Pixel(-638,-629)},{size:new OpenLayers.Size(80,40),anchor:new OpenLayers.Bounds(0,null,null,0),position:new OpenLayers.Pixel(-310,-674)}]}},imageSize:new OpenLayers.Size(676,736),initialize:function(g,c,f,b,a,e,d){OpenLayers.Popup.FramedCloud.prototype.initialize.apply(this,arguments);
this.imageSrc=oscar.getImagePath()+"cloud_popup_relative_outlined_a.png"
},destroy:function(){OpenLayers.Popup.FramedCloud.prototype.destroy.apply(this,arguments)
},CLASS_NAME:"oscar.Popup.FramedCloud"});
oscar.Map=oscar.BaseClass(OpenLayers.Map,{defaultControls:{Navigation:OpenLayers.Control.Navigation,SelectFeature:oscar.Control.SelectFeature},initialize:function(c,b){var a=[];
if(b==null){b={}
}b.theme=oscar._getScriptLocation()+"theme/default/style.css";
a.push(c,b);
OpenLayers.Map.prototype.initialize.apply(this,a);
this.addControl(new this.defaultControls.Navigation({mouseWheelOptions:{interval:500}}));
this.addControl(new this.defaultControls.SelectFeature())
},CLASS_NAME:"oscar.Map"});
OpenLayers.Format.GML.v3.prototype.readers.gml.outerBoundaryIs=function(a,b){this.readChildNodes(a,b);
b.outer=b.components[0]
};
