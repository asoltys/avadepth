/*TODO: No longer needing following Javascript Files:
Survey Drawings: sdb-bds.js
Predicted Water Levels: pwl-nep.js, pwlk-nepk.js, pwlt-ptnd.js
Daily Depths: ad-pd.js, advr-drvp.js
Transit Window: tw-ft.js
Current Conditions: cc-ca.js, soundings-sondages.js
*/
// console.log('');

// Load def JS File
var loadJS = function(name,callback) {
  $.getScript('scripts/'+name+'.js', callback);
};

// Create global variables
var page_lang = $('html').attr('lang');

// Create avaIFace
var avaIFaceJS;
avaIFaceJS = {

  // Internal Object for handling the detail window
  detailWindow: {
    useMap: false,
    mapColorKey: null,
    detailContent: null,
    map: null,

    // Add inner content to Detail Window (uses JSON struct format for layout)
    addContent: function (content) {
      var detCont=[];
      if(content.length>0) {
        detCont = [
          {tag:'div',attr:{id:'detail_content'},child:[
            {tag: 'div', attr: {className: 'print_holder'}, child: [
              {tag: 'button', attr: {name: 'print', className: 'button button-accent print_button print_hide'}, child: ['Print']}
            ]},
            {tag:'div',child:[$.extend({}, content[0])]},
            {tag:'div',attr:{className:'page-break'}},
            {tag: 'div', attr: {className: 'print_holder'}, child: [
              {tag: 'button', attr: {name: 'print', className: 'button button-accent print_button print_hide'}, child: ['Print']}
            ]}
          ]}
        ];
      }
      avaIFaceJS.detailWindow.detailContent = avaIFaceJS.getElements(detCont);
    },

    // Load Detail layout with empty template
    loadLayout: function(){
      $('#rep_detail_info').html('').append(avaIFaceJS.detailWindow.detailContent).show();
      $('#cboxClose').unbind('click').click(avaIFaceJS.detailWindow.hide);
      $('button[name="print"]').unbind('click').click(function(){window.print()});
    },

    // Displays Detail Window
    show: function () {
      var repDet = $('#report_detail');
      if (avaIFaceJS.detailWindow.useMap) {
	    // PWL map removal
        $('#rep_detail_map').hide();//show().css('width','100%');
        avaIFaceJS.detailWindow.mapJS.renderMap();
      } else {
        $('#rep_detail_map').hide();
      }
      $('#report_map').css('width','100%');
      repDet.show().css('left', ($('#wb-core').width() - repDet.width()) / 2);
	  repDet.show().css('top', ($('#gcwu-gcnb-in').height() + $('#cboxClose').height() + 5));
	  repDet.show().css('position', 'fixed');
	  
	  // detail report height fit to window
	  $('#cboxLoadedContent').css('height', (window.innerHeight - ($('#gcwu-gcnb-in').height() + $('#cboxClose').height() + 30)));
	  $('#cboxLoadedContent').css('width', '101%');
	  
      $('#report_det_cover').show().css('height', (repDet.height() + repDet.offset().top + 50 < $(document).height() ? $(document).height() : repDet.height() + repDet.offset().top + 50));

    },

    // Hides Detail Window
    hide: function () {
      if (avaIFaceJS.detailWindow.useMap) {
        $('#rep_detail_map').hide();
        avaIFaceJS.detailWindow.useMap = false;
      }
      $('#report_det_cover').hide();
      $('#report_detail').hide();
    }
  },

  // Internal Object for handling the report window
  reportWindow: {
    isInit: false,
    title1: "",
    title2: "",
    subTitle1: "",
    subTitle2: "",
    repBodyElem: $('#report_body'),
    repWrapper: $('#report_panels'),
    repContent: "",
    errorMessage: "",
    isLong: true,
    isLandscape: false,

    // Initiate Report Window
    init: function () {
      avaIFaceJS.reportWindow.isInit = true;
      avaIFaceJS.reportWindow.reset();
      avaIFaceJS.reportWindow.hide();
      avaIFaceJS.reportWindow.clear();
    },

    // Error Reporting Window
    showError: function(message){
      avaIFaceJS.reportWindow.hide();
      avaIFaceJS.reportWindow.loadReport();
      $('#errorContent p').text(message);
      $('#reportTitleDiv').hide();
      $('#errorContent').show();
    },

    reset: function(){
      avaIFaceJS.reportWindow.title1="";
      avaIFaceJS.reportWindow.title2="";
      avaIFaceJS.reportWindow.subTitle1="";
      avaIFaceJS.reportWindow.subTitle2="";
    },

    // Adds report layout. Used for Javascript event handling and dynamic element modification
    loadReport: function () {

      //Report Title Template
      var repResultsTemp = [
        {tag:'div',child:[
          {tag: 'div',attr:{id:'errorContent'},child:[
            {tag:'p'}
          ]},
          {tag:'div',attr:{className:'print_holder'},child:[
            {tag: 'button', attr: {name: 'print', className: 'button button-accent print_button print_hide'}, child: ['Print']}
          ]},
          {tag: 'div', attr: {id: 'reportTitleDiv'}, child: [
            {tag: 'h2', attr: {id: 'reportTitle1', className: 'print_hide', style: 'margin:3px 0 0 0'}},
            {tag: 'h3', attr: {id: 'reportTitle2', style: 'margin:3px 0 0 0'}},
            {tag: 'p', attr: {id: 'reportSubTitle'}, child: [
              {tag: 'span', attr: {id: 'reportSubT1'}},
              {tag: 'br'},
              {tag: 'span', attr: {id: 'reportSubT2'}}
            ]}
          ]}
        ]}
      ];
      repResultsTemp.push({tag:'div',attr:{id:'report_content'},child:[avaIFaceJS.reportWindow.repContent[0]]});
      repResultsTemp.push({tag:'div',attr:{className:'page-break'}});
      if (avaIFaceJS.reportWindow.isLong){
        repResultsTemp.push({tag:'div',attr:{className:'print_holder'},child:[{tag: 'button', attr: {name: 'print', className: 'button button-accent print_button print_hide'}, child: ['Print']}]});
      }
      repResultsTemp = [
        {'tag': 'div',attr:{className:(avaIFaceJS.reportWindow.isLandscape ? 'landscape':'portrait')}, 'child': repResultsTemp}
      ];
      avaIFaceJS.reportWindow.repBodyElem.html(avaIFaceJS.getElements(repResultsTemp));
      avaIFaceJS.reportWindow.setTitle();

      $('button[name="print"]').unbind('click').click(function(){window.print()});
    },

    // Adds strings to fit into Report Title Template
    addTitle: function (reportTitle, reportLocation, subT1, subT2) {
      if (!avaIFaceJS.reportWindow.isInit) {
        avaIFaceJS.reportWindow.init()
      }
      if (reportTitle != undefined) {
        avaIFaceJS.reportWindow.title1 = reportTitle;
      }
      if (reportLocation != undefined) {
        avaIFaceJS.reportWindow.title2 = reportLocation;
      }
      if (subT1 != undefined) {
        avaIFaceJS.reportWindow.subTitle1 = subT1;
      }
      if (subT2 != undefined) {
        avaIFaceJS.reportWindow.subTitle2 = subT2;
      }

      avaIFaceJS.reportWindow.setTitle();
    },

    // Applies values to Report Title Template
    setTitle: function () {
      $('#reportTitle1').text(avaIFaceJS.reportWindow.title1);
      $('#reportTitle2').text(avaIFaceJS.reportWindow.title2);
      $('#reportSubT1').text(avaIFaceJS.reportWindow.subTitle1);
      $('#reportSubT2').text(avaIFaceJS.reportWindow.subTitle2);
    },

    // Applies report layout to report window
    addContent: function (content) {
      if (!avaIFaceJS.reportWindow.isInit) {
        avaIFaceJS.reportWindow.init()
      }
      avaIFaceJS.reportWindow.repContent = $.extend([],content);
    },

    // Displays Report Window
    show: function () {
      $('#errorContent').hide();
      $('#errorContent p').text('');
      if (!avaIFaceJS.reportWindow.isInit) {
        avaIFaceJS.reportWindow.init()
      }

      avaIFaceJS.reportWindow.repWrapper.trigger('resize').show();
      avaIFaceJS.reportWindow.repBodyElem.trigger('resize').show();
    },

    // Hides Report Window
    hide: function () {
      avaIFaceJS.reportWindow.repBodyElem.hide();
      avaIFaceJS.reportWindow.repWrapper.hide();
    },

    // Removes all elements from Report Window
    clear: function () {
      avaIFaceJS.reportWindow.repBodyElem.innerHTML = "";
    }
  },

  // Internal Object for Parameters Window
  paramWindow: {
    linkBtn: null,
    paramForm: null,
    isInit:false,
    hasAnimate:false,
    init: function(){
      avaIFaceJS.paramWindow.linkBtn=$('#toggleLink');
      avaIFaceJS.paramWindow.paramForm=$('#map_parameters');
      avaIFaceJS.paramWindow.slideWrap=$('#map_param_wrap');
      avaIFaceJS.paramWindow.isInit=true;
    },

    useParam: function(state){
      if(!avaIFaceJS.paramWindow.isInit){avaIFaceJS.paramWindow.init()}
      if(state) {
        avaIFaceJS.paramWindow.show();
      } else {
        avaIFaceJS.paramWindow.hide();
      }
      avaIFaceJS.paramWindow.toggle(state);
    },

    toggle: function(state){
      if(state){
        avaIFaceJS.paramWindow.linkBtn.show();
        //avaIFaceJS.paramWindow.slideWrap.show();
        avaIFaceJS.paramWindow.slideWrap.css('display','block');
      } else {
        avaIFaceJS.paramWindow.linkBtn.hide();
        avaIFaceJS.paramWindow.slideWrap.css('display','none');
        //avaIFaceJS.paramWindow.slideWrap.hide();
      }
    },

    show: function() {
      avaIFaceJS.paramWindow.toggle(true);
      if(!avaIFaceJS.paramWindow.isOpen()){
        avaIFaceJS.paramWindow.linkBtn.click();
      }
    },

    hide: function(){
      if(avaIFaceJS.paramWindow.isOpen()){
        avaIFaceJS.paramWindow.linkBtn.click();
      }
    },

    addForm: function(content){
      if(!avaIFaceJS.paramWindow.isInit){avaIFaceJS.paramWindow.init()}
      var pgParam = $.extend([], content);
	  if(window.location.href.indexOf("fra") > -1) {
		//If url contains 'fra'	use 
		pgParam.push({tag: 'button', attr: {id: 'submit', type: 'button', className: 'button button-accent', name: 'submit'}, 'child': ['Appliquer']});
		} else {
		//If url does not contain 'fra' use
		pgParam.push({tag: 'button', attr: {id: 'submit', type: 'button', className: 'button button-accent', name: 'submit'}, 'child': ['Apply']});
	  }
      if(avaIFaceJS.paramWindow.hasAnimate) {
        pgParam.push({tag:'button',attr:{id:'replay',className: "button button-accent",style:'display:none',name:'replay'},child:['Replay']});
      }
      pgParam.push({tag: 'img', attr: {className: 'spinner', src: 'images/spinner.gif'}});
      var v = avaIFaceJS.getElements([
        {'tag': 'form', attr: {id: 'frm_map_parameters'}, child: pgParam}
      ]);
      avaIFaceJS.paramWindow.paramForm.html('').append(v[0][0]);

    },

    isOpen: function(){
      if(!avaIFaceJS.paramWindow.isInit){avaIFaceJS.paramWindow.init()}
      return (!(document.getElementById('toggleLink').innerText == "Parameters"))
    }
  },

  // Initiate avaIFaceJS Object/add Event Triggers and load page elements
  init: function () {
    // console.clear();
    // Clear and nullify objects
    avaIFaceJS.mapJS = null;
    avaIFaceJS.detailWindow.map = null;
    avaIFaceJS.paramWindow.useParam(false);
    if (!avaIFaceJS.mapJS) {
      avaIFaceJS.mapJS = $('#embed_map')[0].contentWindow.avaMapJS;
      avaIFaceJS.detailWindow.mapJS = $('#report_map')[0].contentWindow.avaMapDetJS;

      // create trigger on window resize
      $(window).unbind('resize').resize(function(){
        var hgt=$('#wb-core').width()*8.5/15;
        if (hgt<680){hgt=680}
        $('#embed_map').height(hgt);
      });
      $('#ref_map_link').click(function(){
        var hgt=$('#wb-core').width()*8.5/15;
        if (hgt<680){hgt=680}
        $('#embed_map').height(hgt);
      })
    }
    avaIFaceJS.setMapOpen(avaIFaceJS.MapState.Open);

    // Check request for start page
    if(querystring('page').length>0){
      avaIFaceJS.loadPage(querystring('page'));
    }
  },

  /*** General Functions ***/
  // Change page for new report
  loadPage: function (page_name) {

    // Load Embedded Map
    avaIFaceJS.mapJS.map.updateSize();

    // Retrieve Page Definition
    avaIFaceJS.currentPage=page_name;
    if(!avaIFaceJS[page_name+'_func']){
      loadJS(page_name+'_func',avaIFaceJS.getPage);
    } else {
      avaIFaceJS.getPage();
    }
  },

  getPage: function(){
    var pg_entry = incl_ava_defs.avaPages[avaIFaceJS.currentPage];

    // Set Title
	if(window.location.href.indexOf("fra") > -1) {
		//If url contains 'fra'	show the French title
		$('#ava_map_ttl').text(pg_entry.title_f);
		} else {
		//If url does not contain 'fra' show the English title
		$('#ava_map_ttl').text(pg_entry.title_e);
    }

    // Page Form Parameters
    avaIFaceJS.paramWindow.hasAnimate=pg_entry.hasAnimate;
    avaIFaceJS.paramWindow.addForm(pg_entry.formParam);

    // Add Content layout for Detail Window
    avaIFaceJS.detailWindow.addContent(pg_entry.reportDetail);

    // Add Content layout for Report Window
    avaIFaceJS.reportWindow.reset();
    avaIFaceJS.reportWindow.isLong = pg_entry.longReport;
    avaIFaceJS.reportWindow.addContent(pg_entry.reportBody);
    avaIFaceJS.reportWindow.loadReport();

    // Retrieve Page Elements and initiate Page code
    avaIFaceJS.mapJS.setPageActivity(avaIFaceJS.currentPage);
    avaIFaceJS.detailWindow.mapJS.setPageActivity(avaIFaceJS.currentPage);
    avaIFaceJS[avaIFaceJS.currentPage + "_func"].init();

    // Open Parameters Tab, Map Window
    avaIFaceJS.paramWindow.useParam(pg_entry.hasParameters);
    avaIFaceJS.setMapOpen(pg_entry.mapInitState,avaIFaceJS.paramWindow.show,pg_entry.hasParameters);

    // Close Report Window
    avaIFaceJS.reportWindow.hide();

  },

  // Open/Close Map when needed
  MapState: {Close: false, Open: true},
  setMapOpen: function (state, callback, arg) {
    var mapLink=$('#ref_map_link');
    if (!(state == this.isMapOpen())) {
      mapLink.click().delay(500).promise().done(function(){
        if(arg) {
          callback();
        }
      });
    }
    $('#map').trigger('resize');
    var embedMap = $('#embed_map');
	var hgt=$('#wb-core').width()*8.5/15;
    if (hgt<680){hgt=680}
    embedMap.height(hgt);
    var ifr = $('iframe');
    var mp = $('#ava_map_ref',ifr.contents());
    mp.height(hgt);
    (this.isMapOpen()?$('#map_wrapper').className="print_show":$('#map_wrapper').className="print_hide");
  },

  isMapOpen: function(){
    return document.getElementById('ref_map_det').clientHeight>30;
  },

  // Parse incoming JSON struct to DOM for Form, Report, and Detail layouts
  getElements: function (arr) {
    var res = [];
    if ($.isArray(arr)) {
      for (var a = 0; a < arr.length; a++) {
        if ($.type(arr[a]) === 'object') {
          var t = $('<' + arr[a]['tag'] + '></' + arr[a]['tag'] + '>');
          if ('attr' in arr[a]) {
            if ('className' in arr[a].attr) {
              t.addClass(arr[a].attr.className);
              delete arr[a].attr.className;
            }
            t.attr(arr[a].attr)
          }
          if ('ref' in arr[a]) {
            var tagUsed = arr[a]['ref']['tag'];
            var oArr = arr[a]['ref']['values'];
            if (typeof oArr == 'function') {
              oArr = oArr()
            }
            var r = [];
            for (var k in oArr) {
              var v = {tag: tagUsed, attr: {}, child: [oArr[k].value]};
              if ('key' in oArr[k]) {
                v.attr.value = oArr[k].key
              }
              if ('select' in oArr[k]) {
                v.attr.selected = "selected"
              }
              r.push(v);
            }
            arr[a].child = r;
          }
          if ('child' in arr[a]) {
            t.append(avaIFaceJS.getElements(arr[a]['child']));
          }
          res.push(t);
        } else {
          res.push(arr[a]);
        }
      }
    }
    return res;
  }
};
if(window.location.href.indexOf("fra") > -1) {
	//If url contains 'fra'	use 
	loadJS('incl_ava_defs-fra', function(){});
	} else {
	//If url does not contain 'fra' use
		loadJS('incl_ava_defs-eng', function(){});
}
