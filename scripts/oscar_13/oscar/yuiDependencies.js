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
case"WFS":this.loadWFSCapabilities(f.url,f.version);
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
OpenLayers.Request.GET({url:c,params:d,success:e,fail:a,scope:this})
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
OpenLayers.Request.GET({url:c,params:d,success:e,fail:a,scope:this})
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
OpenLayers.Request.GET({url:c,params:d,success:e,fail:a,scope:this})
},loadWFSCapabilities:function(d,c){var b=this.getLoadingDiv();
var f=function(k){try{var h=new OpenLayers.Format.WFSCapabilities();
var j=k.responseXML;
var g=h.read(j);
oscar.jQuery(b).removeClass("md_loadingActive");
this.renderService(b,g)
}catch(i){console.log(i);
a()
}};
var a=function(g){oscar.jQuery(b).removeClass("md_loadingActive");
oscar.jQuery(b).addClass("md_loadingFailed");
b.innerHTML=oscar.i18n("md_request_failed");
b.innerHTML+="<br>Url: "+d
};
var e={service:"WFS",version:c,request:"GetCapabilities"};
OpenLayers.Request.GET({url:d,params:e,success:f,fail:a,scope:this})
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
},buildServiceContent:function(d){var h=document.createElement("div");
var l=oscar.Util.Metadata.getServiceType(d);
var m=null;
var c=null;
var j=[];
switch(l){case oscar.Util.Metadata.WCS:m=oscar.Util.Metadata.getCoverages(d);
p=oscar.Util.Metadata.getOperationHref(d,"GetCoverage");
var n=this.theme.getExtractionService();
for(var o=0;
o<n.length;
o++){var r=n[o].url;
if(this.checkUrls(p,r)){j.concat(m)
}}break;
case oscar.Util.Metadata.WFS:m=oscar.Util.Metadata.getFeatureTypes(d);
var p=oscar.Util.Metadata.getOperationHref(d,"GetFeature");
var w=null;
var a=new Array();
if((w=this.theme.getSelectionService())){a=a.concat(w)
}if((w=this.theme.getExtractionService())){a=a.concat(w)
}for(var o=0;
o<a.length;
o++){var r=a[o].url;
if(this.checkUrls(p,r)){j.push(m)
}}break;
case oscar.Util.Metadata.WMS:m=oscar.Util.Metadata.getLayers(d);
var p=oscar.Util.Metadata.getOperationHref(d,"GetMap");
for(var o=0;
o<this.theme.layers.length;
o++){var g=this.theme.layers[o].urls[0];
if(this.checkUrls(p,g)){for(var t in this.theme.layers[o].dataLayers){j.push(this.theme.layers[o].dataLayers[t].layerName)
}}}break;
case oscar.Util.Metadata.WMTS:m=oscar.Util.Metadata.getContent(d);
var p=oscar.Util.Metadata.getOperationHref(d,"GetTile");
for(var o=0;
o<this.theme.layers.length;
o++){var e=this.theme.layers[o].urls[0];
e=e.split("/1.0.0")[0];
if(this.checkUrls(p,e)){for(var t in this.theme.layers[o].dataLayers){j.push(this.theme.layers[o].dataLayers[t].layerName)
}}}break
}var b=document.createElement("div");
oscar.jQuery(b).addClass("idContainer");
for(var o=0;
o<m.length;
o++){var f=document.createElement("div");
oscar.jQuery(f).css("height","30px");
var k=m[o];
var v=null;
if(typeof k.title=="object"){v=k.title[OpenLayers.Lang.getCode()];
if(v==null){for(var u in k.title){v=k.title[u];
break
}}}var q=v||k.title||k.name||k.Title;
var s=new oscar.Gui.ClickableLabel(q,{style:"block",ref:k});
s.applyClass("identifier");
s.events.on({labelClicked:this.identifierClicked,scope:this});
s.appendTo(b)
}h.appendChild(b);
return h
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
},checkUrls:function(c,b){try{return c.toLowerCase().indexOf(b.toLowerCase()>-1)
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
if(this.$panel){this.$panel.hide()
}},draw:function(){OpenLayers.Control.Permalink.prototype.draw.apply(this);
var a=this;
var b=function(){a._showPermalink()
};
this.element.onclick=function(){return false
};
OpenLayers.Event.observe(this.element,"mouseup",OpenLayers.Function.bindAsEventListener(b));
return this.div
},_showPermalink:function(){var b=$$(this.element).parent();
if(this.$panel==null){this.$panel=$$("<div></div>");
this.$closePanel=$$("<div></div>");
this.$closePanel.addClass("closeBox");
var a=this;
this.$closePanel.click(function(){a.$panel.hide()
});
this.$panel.append(this.$closePanel);
this.$panel.attr("id","permalinkPanel");
var c=$$("<div></div>").html(this.panelTitle);
c.css("text-align","left");
this.$panel.append(c);
this.$input=$$("<input type='text'>");
this.$input.css("width","98%");
this.$panel.append(this.$input);
$$("body").append(this.$panel);
this.$panel.css({position:"absolute",zIndex:1500,width:600,height:80,backgroundColor:"#bbb"});
this.$panel.position({of:$$(this.element),at:"right bottom",my:"right top"})
}this.$input.val(this.element.href);
this.$panel.show()
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
