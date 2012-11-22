var hostUtility=function(c){var j={location:null,parameters:{devMode:false}};
var e=document.getElementsByTagName("script");
for(var f=0,h=e.length;
f<h;
f++){var a=e[f].getAttribute("src");
if(a){var g=a.indexOf(c);
if(g>-1){if(a.indexOf("?")>-1){var d=a.split("?").pop().split("&");
for(var f=0;
f<d.length;
f++){var b=d[f].split("=");
j.parameters[b[0]]=b[1]
}}j.location=a.substring(0,g);
break
}}}return j
};
var scriptName="Loader.js";
var host=hostUtility(scriptName);
var OscarLoader=function(a){this.jsResources=[];
this.cssResources=[];
this.base=a;
this.header=null;
this.callbacks=[];
this.loadJS=function(e){var c=new Date();
var d=document.createElement("script");
var b=this;
d.onload=function(){b.loadJSResources()
};
if(/MSIE/.test(navigator.userAgent)){d.onreadystatechange=this.checkReadyState
}d.src=this.base+e.location;
this.appendResource(d)
};
this.loadCSS=function(d){var b=new Date();
var c=document.createElement("link");
c.rel="stylesheet";
c.type="text/css";
c.href=this.base+d.location;
this.appendResource(c)
};
this.loadResource=function(b){switch(b.type){case"js":this.loadJS(b);
break;
case"css":this.loadCSS(b);
break
}};
this.appendResource=function(c){if(this.header==null){var d=document.getElementsByTagName("head").length?document.getElementsByTagName("head")[0]:document.body
}var b=this;
d.appendChild(c)
};
this.addResource=function(b){switch(b.type){case"js":this.jsResources.push(b);
break;
case"css":this.cssResources.push(b);
break
}};
this.load=function(){for(var b=0;
b<this.cssResources.length;
b++){this.loadResource(this.cssResources[b])
}this.loadJSResources()
};
this.loadJSResources=function(){var d=this.jsResources.shift();
if(d!=null){this.loadResource(d)
}else{for(var c=0;
c<this.callbacks.length;
c++){var b=this.callbacks[c];
b.call()
}}};
this.checkReadyState=function(){if(this.readyState=="loaded"||this.readyState=="complete"){this.onload()
}};
this.onReady=function(b){if(this.jsResources.length==0){if(typeof b=="object"){for(var c=0;
c<b.length;
c++){b[c].call()
}}else{b.call()
}return
}if(typeof b=="object"){for(var c=0;
c<b.length;
c++){this.callbacks.push(b[c])
}}else{this.callbacks.push(b)
}}
};
var _OscarLoader=new OscarLoader(host.location);
_OscarLoader.addResource({location:"../jquery/css/smoothness/jquery-ui-1.8.16.custom.css",type:"css"});
_OscarLoader.addResource({location:"../jquery/js/jquery-1.6.2.min.js",type:"js"});
_OscarLoader.addResource({location:"../jquery/js/jquery-ui-1.8.16.custom.min.js",type:"js"});
_OscarLoader.addResource({location:"../proj4js/lib/proj4js.js",type:"js"});
_OscarLoader.addResource({location:"../openlayers/OpenLayers.js",type:"js"});
_OscarLoader.addResource({location:"../yui/build/yahoo-dom-event/yahoo-dom-event.js",type:"js"});
_OscarLoader.addResource({location:"../yui/build/element/element-min.js",type:"js"});
_OscarLoader.addResource({location:"../yui/build/button/button-min.js",type:"js"});
_OscarLoader.addResource({location:"../yui/build/container/container-min.js",type:"js"});
_OscarLoader.addResource({location:"../yui/build/datasource/datasource.js",type:"js"});
_OscarLoader.addResource({location:"../yui/build/json/json.js",type:"js"});
_OscarLoader.addResource({location:"../yui/build/dragdrop/dragdrop.js",type:"js"});
_OscarLoader.addResource({location:"../yui/build/treeview/treeview.js",type:"js"});
_OscarLoader.addResource({location:"../yui/build/animation/animation.js",type:"js"});
_OscarLoader.addResource({location:"../yui/build/autocomplete/autocomplete.js",type:"js"});
_OscarLoader.addResource({location:"../yui/build/connection/connection.js",type:"js"});
_OscarLoader.addResource({location:"../yui/build/datatable/datatable.js",type:"js"});
_OscarLoader.addResource({location:"../yui/build/paginator/paginator-min.js",type:"js"});
_OscarLoader.addResource({location:"../yui/build/resize/resize.js",type:"js"});
_OscarLoader.addResource({location:"../yui/build/layout/layout-min.js",type:"js"});
_OscarLoader.addResource({location:"../yui/build/connection/connection.js",type:"js"});
_OscarLoader.addResource({location:"../yui/build/resize/resize-min.js",type:"js"});
_OscarLoader.addResource({location:"../yui/build/tabview/tabview-min.js",type:"js"});
_OscarLoader.addResource({location:"../yui/build/fonts/fonts-min.css",type:"css"});
_OscarLoader.addResource({location:"../yui/build/button/assets/skins/sam/button.css",type:"css"});
_OscarLoader.addResource({location:"../yui/build/autocomplete/assets/skins/sam/autocomplete.css",type:"css"});
_OscarLoader.addResource({location:"../yui/build/container/assets/skins/sam/container.css",type:"css"});
_OscarLoader.addResource({location:"../yui/build/paginator/assets/skins/sam/paginator.css",type:"css"});
_OscarLoader.addResource({location:"../yui/build/datatable/assets/skins/sam/datatable.css",type:"css"});
_OscarLoader.addResource({location:"../yui/build/datatable/assets/skins/sam/datatable-skin.css",type:"css"});
_OscarLoader.addResource({location:"../yui/build/layout/assets/skins/sam/layout.css",type:"css"});
_OscarLoader.addResource({location:"../yui/build/resize/assets/skins/sam/resize.css",type:"css"});
_OscarLoader.addResource({location:"../yui/build/tabview/assets/skins/sam/tabview.css",type:"css"});
_OscarLoader.addResource({location:"theme/default/style.css",type:"css"});
_OscarLoader.addResource({location:"oscar.js",type:"js"});
_OscarLoader.load();