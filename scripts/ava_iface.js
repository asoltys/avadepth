/*TODO: No longer needing following Javascript Files:
Survey Drawings: sdb-bds.js
Predicted Water Levels: pwl-nep.js, pwlk-nepk.js, pwlt-ptnd.js
Daily Depths: ad-pd.js, advr-drvp.js
Transit Window: tw-ft.js
Current Conditions: cc-ca.js, soundings-sondages.js
*/
// console.log('');

// Load def JS File
var loadJS = function(name, callback) {
    $.getScript('scripts/' + name + '.js', callback);
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
        addContent: function(content) {
            if (content.length > 0) {
                var detCont = [{
                    tag: 'div',
                    attr: {
                        id: 'detail_content'
                    },
                    child: [{
                        tag: 'div',
                        attr: {
                            className: 'print_holder'
                        },
                        child: [{
                            tag: 'button',
                            attr: {
                                name: 'print',
                                className: 'button button-accent print_button print_hide'
                            },
                            child: ['Print']
                        }]
                    }, {
                        tag: 'div',
                        child: [$.extend({}, content[0])]
                    }, {
                        tag: 'div',
                        attr: {
                            className: 'page-break'
                        }
                    }, {
                        tag: 'div',
                        attr: {
                            className: 'print_holder'
                        },
                        child: [{
                            tag: 'button',
                            attr: {
                                name: 'print',
                                className: 'button button-accent print_button print_hide'
                            },
                            child: ['Print']
                        }]
                    }]
                }];
            }
            avaIFaceJS.detailWindow.detailContent = avaIFaceJS.getElements(detCont);
        },

        // Load Detail layout with empty template
        loadLayout: function() {
            $('#rep_detail_info').html('').append(avaIFaceJS.detailWindow.detailContent).show();

            $('#cboxClose').unbind('click').click(avaIFaceJS.detailWindow.hide);
            $('button[name="print"]').unbind('click').click(function() {
                window.print()
            });
        },

        // Displays Detail Window
        show: function() {
            var repDet = $('#report_detail');

            // PWL detail map removal
            /*if (avaIFaceJS.detailWindow.useMap) {
        $('#rep_detail_map').hide().show().css('width','100%');
        avaIFaceJS.detailWindow.mapJS.renderMap();
      } else {
        $('#rep_detail_map').hide();
      }*/
            $('#rep_detail_map').hide();
            $('#report_map').css('width', '100%');

            // detail report position parameters
            repDet.show().css('left', ($( document ).width() - repDet.width()) / 2);
            repDet.show().css('top', ($('#gcwu-gcnb-in').height() + $('#cboxClose').height() + 50));
            repDet.show().css('position', 'fixed');

            /* 
             * set dynamic detail report size
             */
            // detail report size parameters
            var dataHeight = $('#rep_detail_map').height() + $('#rep_detail_info').height();
            var windowHeight = window.innerHeight - ($('#gcwu-gcnb-in').height() + $('#cboxClose').height() + 80);

            if ((avaIFaceJS.currentPage == 'ccc') || (dataHeight >= windowHeight)) { // amount of data in detail report is greater than length of screen, or special case for current channel conditions
                $('#cboxLoadedContent').css('height', windowHeight);
            } else {
                $('#cboxLoadedContent').css('height', dataHeight);
            }
            $('#cboxLoadedContent').css('width', '103%'); // prevents needless horizontal scroll bar

            $('#report_det_cover').show().css('height', (repDet.height() + repDet.offset().top + 50 < $(document).height() ? $(document).height() : repDet.height() + repDet.offset().top + 50));

            /*
             * generates detial_print div html and css from current detail display window
             */
            $('<style>@media print { #report_body { display: none; } }</style>').appendTo('head');

            var printReport = $("#detail_content").clone();
            printReport.find("#print_remove").remove(); // specific to handle ccc radio buttons
            $("#detail_print").html(printReport);
            // see pwl_func.js goToGraph function for canvas printing fix
        },

        // Hides Detail Window
        hide: function() {
            if (avaIFaceJS.detailWindow.useMap) {
                $('#rep_detail_map').hide();
                avaIFaceJS.detailWindow.useMap = false;
            }
            $('#report_det_cover').hide();
            $('#report_detail').hide();

            // hide report window printing div from print css
            $('<style>@media print { #report_body { display: block; } }</style>').appendTo('head');
            $("#detail_print").html("");
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
        disclaimerBox: "",

        // Initiate Report Window
        init: function() {
            avaIFaceJS.reportWindow.isInit = true;
            avaIFaceJS.reportWindow.reset();
            avaIFaceJS.reportWindow.hide();
            avaIFaceJS.reportWindow.clear();
        },

        // Error Reporting Window
        showError: function(message) {
            $('#errorContent p').text(message);
            $('#reportTitleDiv').hide();
            $('#errorContent').show();
            $('#report_content').hide();
        },

        reset: function() {
            avaIFaceJS.reportWindow.disclaimerBox = "";
            avaIFaceJS.reportWindow.title1 = "";
            avaIFaceJS.reportWindow.title2 = "";
            avaIFaceJS.reportWindow.subTitle1 = "";
            avaIFaceJS.reportWindow.subTitle2 = "";
        },

        addAutoDeskDisclaimer: function() {
            if (window.location.href.indexOf("sdb") > -1) {
                return {
                    tag:'table',
                    attr:{
                        className:'align-center',
                        style:'margin-top: 10px auto; width: 930px;'},
                        child:[{
                            tag:'tr',
                            child:[{
                                tag:'td',
                                attr:{
                                    className:'align-left',
                                    style:'white-space: pre-line;'
                                },
                                child:["Users will need to download an Autodesk DWF viewer to view and display the Reference Plan.\n", {
                                    tag:'a',
                                    attr:{
                                        href:'http://usa.autodesk.com/design-review/',
                                        target:'_blank'
                                    },
                                    child:['Download Autodesk viewer']
                                }
                            ]}
                        ]}
                ]};
            } else return;
        },

        // Adds report layout. Used for Javascript event handling and dynamic element modification
        loadReport: function() {
            //Report Title Template
            var repResultsTemp = [{
                tag: 'div',
                child: [avaIFaceJS.reportWindow.addAutoDeskDisclaimer(), {
                    tag: 'div',
                    attr: {
                        className: 'print_holder'
                    },
                    child: [{
                        tag: 'button',
                        attr: {
                            name: 'print',
                            className: 'button button-accent print_button print_hide'
                        },
                        child: ['Print']
                    }]
                }, {
                    tag: 'div',
                    attr: {
                        id: 'errorContent'
                    },
                    child: [{
                        tag: 'p'
                    }]
                }, {
                    tag: 'div',
                    attr: {
                        id: 'reportTitleDiv'
                    },
                    child: [{
                        tag: 'h2',
                        attr: {
                            id: 'reportTitle1',
                            style: 'margin:3px 0 0 0'
                        }
                    }, {
                        tag: 'h3',
                        attr: {
                            id: 'reportTitle2',
                            style: 'margin:3px 0 0 0'
                        }
                    }, {
                        tag: 'p',
                        attr: {
                            id: 'reportSubTitle',
                            style: 'font-size:16px'
                        },
                        child: [{
                            tag: 'span',
                            attr: {
                                id: 'reportSubT1'
                            }
                        }, {
                            tag: 'br'
                        }, {
                            tag: 'span',
                            attr: {
                                id: 'reportSubT2'
                            }
                        }]
                    }]
                }]
            }];
            repResultsTemp.push({
                tag: 'div',
                attr: {
                    id: 'report_content'
                },
                child: [avaIFaceJS.reportWindow.repContent[0]]
            });
            repResultsTemp.push({
                tag: 'div',
                attr: {
                    className: 'page-break'
                }
            });
            if (avaIFaceJS.reportWindow.isLong) {
                repResultsTemp.push({
                    tag: 'div',
                    attr: {
                        className: 'print_holder'
                    },
                    child: [{
                        tag: 'button',
                        attr: {
                            name: 'print',
                            className: 'button button-accent print_button print_hide'
                        },
                        child: ['Print']
                    }]
                });
            }
            repResultsTemp = [{
                'tag': 'div',
                attr: {
                    className: (avaIFaceJS.reportWindow.isLandscape ? 'landscape' : 'portrait')
                },
                'child': repResultsTemp
            }];
            avaIFaceJS.reportWindow.repBodyElem.html(avaIFaceJS.getElements(repResultsTemp));
            avaIFaceJS.reportWindow.setTitle();

            $('button[name="print"]').unbind('click').click(function() {
                window.print()
            });
        },

        // Adds strings to fit into Report Title Template
        addTitle: function(repTitle1, repTitle2, subT1, subT2) {
            if (!avaIFaceJS.reportWindow.isInit) {
                avaIFaceJS.reportWindow.init()
            }
            if (repTitle1 != undefined) {
                avaIFaceJS.reportWindow.title1 = repTitle1;
            }
            if (repTitle2 != undefined) {
                avaIFaceJS.reportWindow.title2 = repTitle2;
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
        setTitle: function() {
            $('#reportTitle1').text(avaIFaceJS.reportWindow.title1);
            $('#reportTitle2').text(avaIFaceJS.reportWindow.title2);
            $('#reportSubT1').text(avaIFaceJS.reportWindow.subTitle1);
            $('#reportSubT2').text(avaIFaceJS.reportWindow.subTitle2);
        },

        // Applies report layout to report window
        addContent: function(content) {
            if (!avaIFaceJS.reportWindow.isInit) {
                avaIFaceJS.reportWindow.init()
            }
            avaIFaceJS.reportWindow.repContent = $.extend([], content);
        },

        // Displays Report Window
        show: function() {
            $('#errorContent p').text(''); // reset from showError
            $('#reportTitleDiv').show();
            $('#errorContent').hide();
            $('#report_content').show();

            if (!avaIFaceJS.reportWindow.isInit) {
                avaIFaceJS.reportWindow.init()
            }

            avaIFaceJS.reportWindow.repWrapper.trigger('resize').show();
            avaIFaceJS.reportWindow.repBodyElem.trigger('resize').show();
        },

        // Hides Report Window
        hide: function() {
            avaIFaceJS.reportWindow.repBodyElem.hide();
            avaIFaceJS.reportWindow.repWrapper.hide();
        },

        // Removes all elements from Report Window
        clear: function() {
            avaIFaceJS.reportWindow.repBodyElem.innerHTML = "";
        }
    },

    // Internal Object for Parameters Window
    paramWindow: {
        linkBtn: null,
        paramForm: null,
        isInit: false,
        hasAnimate: false,
        init: function() {
            avaIFaceJS.paramWindow.linkBtn = $('#paramButton');
            avaIFaceJS.paramWindow.paramForm = $('#map_parameters');
            avaIFaceJS.paramWindow.slideWrap = $('#map_param_wrap');
            avaIFaceJS.paramWindow.isInit = true;
        },

        useParam: function(state) {
            if (!avaIFaceJS.paramWindow.isInit) {
                avaIFaceJS.paramWindow.init()
            }
            if (state) {
                avaIFaceJS.paramWindow.show();
            } else {
                avaIFaceJS.paramWindow.hide();
            }
            avaIFaceJS.paramWindow.toggle(state);
        },

        toggle: function(state) {
            if (state) {
                avaIFaceJS.paramWindow.linkBtn.show();
                //avaIFaceJS.paramWindow.slideWrap.show();
                avaIFaceJS.paramWindow.slideWrap.css('display', 'block');
            } else {
                avaIFaceJS.paramWindow.linkBtn.hide();
                avaIFaceJS.paramWindow.slideWrap.css('display', 'none');
                //avaIFaceJS.paramWindow.slideWrap.hide();
            }
        },

        show: function() {
            avaIFaceJS.paramWindow.toggle(true);
            if (!avaIFaceJS.paramWindow.isOpen()) {
                avaIFaceJS.paramWindow.linkBtn.click();
            }
        },

        hide: function() {
            if (avaIFaceJS.paramWindow.isOpen()) {
                avaIFaceJS.paramWindow.linkBtn.click();
            }
        },

        addForm: function(content) {
            if (!avaIFaceJS.paramWindow.isInit) {
                avaIFaceJS.paramWindow.init()
            }
            var pgParam = $.extend([], content);
            if (window.location.href.indexOf("fra") > -1) {
                //If url contains 'fra'	use 
                pgParam.push({
                    tag: 'button',
                    attr: {
                        id: 'submit',
                        type: 'button',
                        className: 'button button-accent',
                        name: 'submit'
                    },
                    'child': ['Appliquer']
                });
            } else {
                //If url does not contain 'fra' use
                pgParam.push({
                    tag: 'button',
                    attr: {
                        id: 'submit',
                        type: 'button',
                        className: 'button button-accent',
                        name: 'submit'
                    },
                    'child': ['Apply']
                });
            }
            if (avaIFaceJS.paramWindow.hasAnimate) {
                pgParam.push({
                    tag: 'button',
                    attr: {
                        id: 'replay',
                        type: 'button',
                        className: 'button button-accent',
                        name: 'replay',
                        style: 'font-style: normal; margin-left: 5px'
                    },
                    'child': ['Replay']
                });
                pgParam.push({
                    tag: 'div',
                    attr: {
                        id: 'loading',
                        style: 'padding: 1em; display: none;'
                    },
                    'child': [{
                        tag: 'div',
                        attr: {
                            style: 'width: 300px;height: 30px; float: left'
                        },
                        'child': [{
                                tag: 'img',
                                attr: {
                                    className: 'spinner',
                                    src: 'images/spinner.gif'
                                }
                            },
                            ' Processing...', {
                                tag: 'span',
                                attr: {
                                    id: 'frame_count',
                                    style: 'font-weight: bold'
                                },
                                'child': ['(Frames: ', {
                                    tag: 'span',
                                    attr: {
                                        id: 'frames_retrieved'
                                    },
                                }, {
                                    tag: 'span',
                                    attr: {
                                        id: 'number_of_frames'
                                    },
                                }]
                            }
                        ]
                    }]
                });
            } else {
                pgParam.push({
                    tag: 'img',
                    attr: {
                        className: 'spinner',
                        src: 'images/spinner.gif'
                    }
                });
            }
            var v = avaIFaceJS.getElements([{
                'tag': 'form',
                attr: {
                    id: 'frm_map_parameters'
                },
                child: pgParam
            }]);
            avaIFaceJS.paramWindow.paramForm.html('').append(v[0][0]);

        },

        isOpen: function() {
            if (!avaIFaceJS.paramWindow.isInit) {
                avaIFaceJS.paramWindow.init()
            }
            // return (!(document.getElementById('paramButton').innerText == "Parameters"))
        }
    },

    // Initiate avaIFaceJS Object/add Event Triggers and load page elements
    init: function() {
        // console.clear();
        // Clear and nullify objects
        avaIFaceJS.mapJS = null;
        avaIFaceJS.detailWindow.map = null;
        avaIFaceJS.paramWindow.useParam(false);
        if (!avaIFaceJS.mapJS) {
            avaIFaceJS.mapJS = $('#embed_map')[0].contentWindow.avaMapJS;
            avaIFaceJS.detailWindow.mapJS = $('#report_map')[0].contentWindow.avaMapDetJS;

            // create trigger on window resize
            $(window).unbind('resize').resize(function() {
                var hgt = $('#wb-core').width() * 8.5 / 15;
                if (hgt < 680) {
                    hgt = 680
                }
                $('#embed_map').height(hgt);
            });
            $('#ref_map_link').click(function() {
                var hgt = $('#wb-core').width() * 8.5 / 15;
                if (hgt < 680) {
                    hgt = 680
                }
                $('#embed_map').height(hgt);
            })
        }
        // avaIFaceJS.setMapOpen(avaIFaceJS.MapState.Open);

        // Check request for start page
        if (querystring('page').length > 0) {
            avaIFaceJS.loadPage(querystring('page'));
        }
    },

    /*** General Functions ***/
    // Change page for new report
    loadPage: function(page_name) {

        // Load Embedded Map
        avaIFaceJS.mapJS.map.updateSize();

        // Retrieve Page Definition
        avaIFaceJS.currentPage = page_name;
        if (!avaIFaceJS[page_name + '_func']) {
            loadJS(page_name + '_func', avaIFaceJS.getPage);
        } else {
            avaIFaceJS.getPage();
        }
    },

    getPage: function() {
        var pg_entry = incl_ava_defs.avaPages[avaIFaceJS.currentPage];

        // Set Title
        if (window.location.href.indexOf("fra") > -1) {
            //If url contains 'fra'	show the French title
            $('#ava_map_ttl').text(pg_entry.title_f);
        } else {
            //If url does not contain 'fra' show the English title
            $('#ava_map_ttl').text(pg_entry.title_e);
        }

        // Page Form Parameters
        avaIFaceJS.paramWindow.hasAnimate = pg_entry.hasAnimate;
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
        avaIFaceJS.setMapOpen(pg_entry.mapInitState,
            avaIFaceJS.paramWindow.show,
            pg_entry.hasParameters);

        // Close Report Window
        avaIFaceJS.reportWindow.hide();

    },

    // Open/Close Map when needed
    MapState: {
        Close: false,
        Open: true
    },
    setMapOpen: function(state, callback, arg) {
        // console.log("state: " + state + ", arg: " + arg 
        //             + ", isMapOpen: " + this.isMapOpen());
        var mapLink = $('#ref_map_link');
        if (!(state == this.isMapOpen())) {
            mapLink.click().delay(500).promise().done(function() {
                if (arg) {
                    callback();
                }
            });
        }
        $('#map').trigger('resize');
        var embedMap = $('#embed_map');
        var hgt = $('#wb-core').width() * 8.5 / 15;
        if (hgt < 680) {
            hgt = 680
        }
        embedMap.height(hgt);
        $('#map').height(hgt);
        var ifr = $('iframe');
        var mp = $('#ava_map_ref', ifr.contents());
        mp.height(hgt);
        (this.isMapOpen() ? $('#map_wrapper').className = "print_show" : $('#map_wrapper').className = "print_hide");
    },

    isMapOpen: function() {
        return document.getElementById('ref_map_det').clientHeight > 50;
    },

    // Parse incoming JSON struct to DOM for Form, Report, and Detail layouts
    getElements: function(arr) {
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
                            var v = {
                                tag: tagUsed,
                                attr: {},
                                child: [oArr[k].value]
                            };
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
if (window.location.href.indexOf("fra") > -1) {
    //If url contains 'fra'	use 
    loadJS('incl_ava_defs-fra', function() {});
} else {
    //If url does not contain 'fra' use
    loadJS('incl_ava_defs-eng', function() {});
}

// moves param window if the page is resized
window.onresize = function() {
    var pBarLeft = $('#wb-main').css("width");
    pBarLeft = pBarLeft.slice(0, -2);
    pBarLeft = pBarLeft - (310 - 5) + "px";
    $("#pBarContainer").css({
        left: pBarLeft
    });

    // var pBarTop = $('#ref_map_det').position().top;
    // pBarTop = pBarTop + 2 + "px";
    // $("#pBarContainer").css({
    //     top: pBarTop
    // });
    //alert($('#wb-main').css( "width" ));
};

// toggles param window when clicked
document.getElementById('pBarHeaderContainer').onclick = function() {
    pBarToggle();
};

// param toggle code
function pBarToggle() {
    if (document.getElementById('pBarButton').innerText == "-") {
        document.getElementById('map_parameters').style.display = 'none';
        //document.getElementById('pBarContainer').style.opacity = '0.8';
        //document.getElementById('pBarContainer').style.filter = 'Alpha(opacity=80)';
        document.getElementById('pBarButton').innerText = "+"
    } else {
        document.getElementById('map_parameters').style.display = 'block';
        //document.getElementById('pBarContainer').style.opacity = '1';
        //document.getElementById('pBarContainer').style.filter = 'Alpha(opacity=100)';
        document.getElementById('pBarButton').innerText = "-"
    }
};