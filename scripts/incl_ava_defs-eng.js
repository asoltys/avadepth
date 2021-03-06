﻿/**
 * Created by wsiddall on 14/07/2014.
 */

var padZero = function(num){
  var s = "000" + num;
  return s.substr(s.length-2);
};

function getAPI(extURL, intURL){
    // console.log(extURL);
  if(document.URL.split("/")[2].split(":")[0] === "localhost") {
    return intURL;
  } else {
    return extURL;
  }
}

var currentDate = new Date();

incl_ava_defs={
    locDefs: {
        "CWC" : {
            "Form" : {
                "Title" : "Coastal Waterway, BC",
                "Order" : 0
            },
            "Coords" : {
                "Lat" : {
                    "min" : 6197437,
                    "max" : 7470050
                },
                "Lon" : {
                    "min" : -15055722,
                    "max" : -12980383
                }
            },
            "Sections" : {
                "BC_CB" : {
                    "Form" : {
                        "Title" : "Campbell River",
                        "Key" : "BC_CB"
                    },
                    "Names" : "",
                    "Coords" : {
                        "Lat" : {
                            "min" : 6448640,
                            "max" : 6459951
                        },
                        "Lon" : {
                            "min" : -13947812,
                            "max" : -13939713
                        }
                    }
                },
                "BC_CR" : {
                    "Form" : {
                        "Title" : "Courtenay River",
                        "Key" : "BC_CR"
                    },
                    "Names" : "",
                    "Coords" : {
                        "Lat" : {
                            "min" : 6383982,
                            "max" : 6395830
                        },
                        "Lon" : {
                            "min" : -13916202,
                            "max" : -13905364
                        }
                    }
                },
                "BC_FC" : {
                    "Form" : {
                        "Title" : "French Creek",
                        "Key" : "BC_FC"
                    },
                    "Names" : "",
                    "Coords" : {
                        "Lat" : {
                            "min" : 6330313,
                            "max" : 6341037
                        },
                        "Lon" : {
                            "min" : -13851357,
                            "max" : -13839841
                        }
                    }
                },
                "BC_NAN" : {
                    "Form" : {
                        "Title" : "Nanaimo",
                        "Key" : "BC_NAN"
                    },
                    "Names" : "",
                    "Coords" : {
                        "Lat" : {
                            "min" : 6298553,
                            "max" : 6311508
                        },
                        "Lon" : {
                            "min" : -13800874,
                            "max" : -13790918
                        }
                    }
                },
                "BC_QCI" : {
                    "Form" : {
                        "Title" : "Queen Charlotte Islands",
                        "Key" : "BC_QCI"
                    },
                    "Names" : "",
                    "Coords" : {
                        "Lat" : {
                            "min" : 6993882,
                            "max" : 7030414
                        },
                        "Lon" : {
                            "min" : -14742057,
                            "max" : -14687672
                        }
                    }
                },
                "BC_SQ" : {
                    "Form" : {
                        "Title" : "Squamish",
                        "Key" : "BC_SQ"
                    },
                    "Names" : "",
                    "Coords" : {
                        "Lat" : {
                            "min" : 6386861,
                            "max" : 6398793
                        },
                        "Lon" : {
                            "min" : -13713592,
                            "max" : -13705832
                        }
                    }
                },
                "BC_TOF" : {
                    "Form" : {
                        "Title" : "Tofino Harbour",
                        "Key" : "BC_TOF"
                    },
                    "Names" : "",
                    "Coords" : {
                        "Lat" : {
                            "min" : 6286458,
                            "max" : 6311312
                        },
                        "Lon" : {
                            "min" : -14027881,
                            "max" : -14001452
                        }
                    }
                }
            }
        },
        "IW" : {
            "Form": {
                "Title" : "Interior Waterway, BC",
                "Order" : 1
            },
            "Coords" : {
                "Lat" : {
                    "min" : 6586478,
                    "max" : 6596334
                },
                "Lon" : {
                    "min" : -13249719,
                    "max" : -13242435
                }
            },
            // add tile
            "Sections" : {
                "BC_INT" : {
                    "Form" : {
                        "Title" : "Sicamous",
                        "Key" : "BC_INT"
                    },
                    "Names" : "",
                    "Coords" : {
                        "Lat" : {
                            "min" : 6586478,
                            "max" : 6596334
                        },
                        "Lon" : {
                            "min" : -13249719,
                            "max" : -13242435
                        }
                    }
                }
            }
        },
        "FR" : {
            "Form" : {
                "Title" : "Fraser River, BC",
                "Order" : 2
            },
            "Coords" : {
                "Lat" : {
                    "min" : 6287000,
                    "max" : 6352933
                },
                "Lon" : {
                    "min" : -13730400,
                    "max" : -13510906
                }
            },
            "Sections" : {
                "FRMA" : {
                    "Form" : {
                        "Title" : "Main Arm",
                        "Key" : "FRMA"
                    },
                    "Names" : [
                        "Channel Overview",
                        "Queens Reach",
                        "Douglas Island",
                        "Bishops Reach",
                        "Derby Reach",
                        "Russel Reach & Langley Bar",
                        "Plumper Reach",
                        "Matsqui Island"
                    ],
                    "Coords" : {
                        "Lat" : {
                            "min" : 6294031,
                            "max" : 6317201
                        },
                        "Lon" : {
                            "min" : -13683886,
                            "max" : -13614552
                        }
                    },
                    "pwl" : {
                        "key" : "Main Arm"
                    }
                },
                "FRMA_SC" : {
                    "Form" : {
                        "Title" : "Main Arm - Side Channel",
                        "Key" : "FRMA_SC"
                    },
                    "Names" : [
                        "Sapperton Channel",
                        "Essondale Channel",
                        "Douglas Island North",
                        "Parsons Channel",
                        "Bedford Channel",
                        "Enterprise Channel"
                    ],
                    "Coords" : {
                        "Lat" : {
                            "min" : 6294031,
                            "max" : 6317201
                        },
                        "Lon" : {
                            "min" : -13683886,
                            "max" : -13614552
                        }
                    }
                },
                "FRNA" : {
                    "Form" : {
                        "Title" : "North Arm",
                        "Key" : "FRNA"
                    },
                    "Names" : [
                        "Channel Overview",
                        "Point Grey",
                        "Iona",
                        "Musqueam",
                        "Sea Island",
                        "Marpole Basin",
                        "Mitchell Island",
                        "Mac-Blo",
                        "Byrne Road",
                        "Big Bend - Queens",
                        "Poplar Island"
                    ],
                    "Coords" : {
                        "Lat" : {
                            "min" : 6299514,
                            "max" : 6324716
                        },
                        "Lon" : {
                            "min" : -13728049,
                            "max" : -13682776
                        }
                    },
                    "pwl" : {
                        "key" : "North Arm"
                    }
                },
                "FRNA_SC" : {
                    "Form" : {
                        "Title" : "North Arm - Side Channel",
                        "Key" : "FRNA_SC"
                    },
                    "Names" : [
                        "Cowards Cove",
                        "Point Grey Scow Moorage",
                        "Deering Channel",
                        "MacDonald Slough",
                        "Morey Channel",
                        "Swishwash Island South",
                        "Mitchell Island North",
                        "Tree Island"
                    ],
                    "Coords" : {
                        "Lat" : {
                            "min" : 6299514,
                            "max" : 6324716
                        },
                        "Lon" : {
                            "min" : -13728049,
                            "max" : -13682776
                        }
                    }
                },
                "FRPR" : {
                    "Form" : {
                        "Title" : "Pitt River",
                        "Key" : "FRPR"
                    },
                    "Names" : "",
                    "Coords" : {
                        "Lat" : {
                            "min" : 6310322,
                            "max" : 6348569
                        },
                        "Lon" : {
                            "min" : -13671262,
                            "max" : -13639325
                        }
                    }
                },
                "FRSA" : {
                    "Form" : {
                        "Title" : "South Arm",
                        "Key" : "FRSA"
                    },
                    "Names" : [
                        "Channel Overview",
                        "Sand Heads Entrance",
                        "Sand Heads Reach",
                        "Steveston Bend",
                        "Steveston Cut",
                        "Woodward Reach",
                        "Gravesend Reach",
                        "City Reach",
                        "Annieville - New West",
                        "Fraser Surrey Docks"
                    ],
                    "Coords" : {
                        "Lat" : {
                            "min" : 6282692,
                            "max" : 6314133
                        },
                        "Lon" : {
                            "min" : -13730138,
                            "max" : -13677350
                        }
                    },
                    "pwl" : {
                        "key" : "South Arm"
                    }
                },
                "FRSA_SC" : {
                    "Form" : {
                        "Title" : "South Arm - Side Channel",
                        "Key" : "FRSA_SC"
                    },
                    "Names" : [
                        "Shoal Point - New West",
                        "Annacis Channel",
                        "Gundersen Slough",
                        "Burr Landing Channel",
                        "Cannery Channel",
                        "Ladner Sea Reach Overview",
                        "Deas Slough",
                        "Ladner Reach",
                        "Ladner Harbour",
                        "Canoe Pass",
                        "Sea Reach"
                    ],
                    "Coords" : {
                        "Lat" : {
                            "min" : 6282692,
                            "max" : 6314133
                        },
                        "Lon" : {
                            "min" : -13730138,
                            "max" : -13677350
                        }
                    }
                },
                "FRUR" : {
                    "Form" : {
                        "Title" : "Mission to Hope",
                        "Key" : "FRUR"
                    },
                    "Names" : "",
                    "Coords" : {
                        "Lat" : {
                            "min" : 6293247,
                            "max" : 6349886
                        },
                        "Lon" : {
                            "min" : -13625920,
                            "max" : -13510906
                        }
                    }
                }
            }
        },
        "VH" : {
            "Form" : {
                "Title" : "Vancouver Harbour, BC",
                "Order" : 3
            },
            "Coords" : {
                "Lat" : {
                    "min" : 6316237,
                    "max" : 6337717
                },
                "Lon" : {
                    "min" : -13722084,
                    "max" : -13670754
                }
            },
            // TODO
            "Sections" : {
                "PMV" : {
                    "Form" : {
                        "Title" : "Burrard Inlet",
                        "Key" : "PMV"
                    },
                    "Names" : "",
                    "Coords" : {
                        "Lat" : {
                            "min" : 6311123,
                            "max" : 6342847
                        },
                        "Lon" : {
                            "min" : -13725424,
                            "max" : -13667414
                        }
                    }
                },
                "PMV-BI" : {
                    "Form" : {
                        "Title" : "Burrard Inlet - Terminal",
                        "Key" : "PMV-BI"
                    },
                    "Names" : "",
                    "Coords" : {
                        "Lat" : {
                            "min" : 6311123,
                            "max" : 6342847
                        },
                        "Lon" : {
                            "min" : -13725424,
                            "max" : -13667414
                        }
                    }
                }
            }
        },
        "WS" : {
            "Form" : {
                "Title" : "Waterway Structure",
                "Order" : 4
            },
            "Coords" : {
                "Lat" : {
                    "min" : 6289181,
                    "max" : 6325119
                },
                "Lon" : {
                    "min" : -13728265,
                    "max" : -13569386
                }
            },
            "Sections" : {
                "WS_NA" : {
                    "Form" : {
                        "Title" : "Fraser - North Arm",
                        "Key" : "WS_NA"
                    },
                    "Names" : [
                        "North Arm Breakwater",
                        "North Arm Jetty"
                    ],
                    "Coords" : {
                        "Lat" : {
                            "min" : 6309661,
                            "max" : 6322555
                        },
                        "Lon" : {
                            "min" : -13725650,
                            "max" : -13714402
                        }
                    }
                },
                "WS_SA" : {
                    "Form" : {
                        "Title" : "Fraser - South Arm",
                        "Key" : "WS_SA"
                    },
                    "Names" : [
                        "Steveston North Jetty",
                        "Steveston South Jetty No. 2",
                        "Albion Dyke No. 2",
                        "Steveston Island Wingdams No. 2 & 3",
                        "Steveston Island Shearboom",
                        "Woodward Island Training Wall",
                        "Deas & Kirkland Island Bank Protection",
                        "Trifurcation Phase I Training Wall",
                        "Trifurcation Phase II Training Wall",
                        "Trifurcation Phase III Training Wall"
                    ],
                    "Coords" : {
                        "Lat" : {
                            "min" : 6289181,
                            "max" : 6312251
                        },
                        "Lon" : {
                            "min" : -13728265,
                            "max" : -13678949
                        }
                    }
                },
                "WS_MA" : {
                    "Form" : {
                        "Title" : "Fraser - Main Arm",
                        "Key" : "WS_MA"
                    },
                    "Names" : [
                        "Sapperton Wingdams 2 & 3",
                        "Sapperton V-Dyke"
                    ],
                    "Coords" : {
                        "Lat" : {
                            "min" : 6308005,
                            "max" : 6315807
                        },
                        "Lon" : {
                            "min" : -13681802,
                            "max" : -13673052
                        }
                    }
                },
                "WS_MH" : {
                    "Form" : {
                        "Title" : "Fraser - Mission to Hope",
                        "Key" : "WS_MH"
                    },
                    "Names" : "Big & Middle Eddy Groyne",
                    "Coords" : {
                        "Lat" : {
                            "min" : 6295882,
                            "max" : 6302924
                        },
                        "Lon" : {
                            "min" : -13593487,
                            "max" : -13588166
                        }
                    }
                },
                "WS_HR" : {
                    "Form" : {
                        "Title" : "Fraser - Harrison River, BC",
                        "Key" : "WS_HR"
                    },
                    "Names" : [
                        "Harrison Mills (CPR Bridge) Shearboom",
                        "Harrison River Dykes V, R, W, P",
                        "Harrison Hwy No.7 Bridge Shearboom",
                        "Harrison Rapids Shearboom"
                    ],
                    "Coords" : {
                        "Lat" : {
                            "min" : 6311285,
                            "max" : 6325119
                        },
                        "Lon" : {
                            "min" : -13579382,
                            "max" : -13569386
                        }
                    }
                }
            }
        }
    },

  avaPages:{
    'acv':{
      'title_e': "Animated Currents and Velocities for Fraser River South Arm",
      'title_f': "Animation et vélocités du courant",
      'mapInitState':true,
      'hasParameters':true,
      'hasAnimate':true,
      'longReport':false,
      'landscapeReport':false,
      'formParam':[
        {tag:'div',attr:{className:'span-3'},child:[
          {tag:'label',attr:{for:'date', style: 'font-weight: bold'},child:["Date:"]},
          {tag:'input',attr:{id:'date',type:'text',name:'date',className:'datepicker'}},
          {tag:'input',attr:{id:'alt-date',type:'hidden'}},
          {tag:'br'},
          {tag:'strong',child:["River Discharge @ Hope:"]},
          {tag:'br'},
          {tag:'input',attr:{id:'actual_radio',type:'radio',name:'discharge',disabled:'true',value:'Actual'}},
          {tag:'label',attr:{for:'actual_radio',style:'font-weight:normal; margin-left: 5px'},child:[
            "Actual (",
            {tag:'span',attr:{id:'actual_discharge'}},
            " m\u00B3/s)"
          ]},
          {tag:'br'},
          {tag:'input',attr:{id:'selected_radio',type:'radio',name:'discharge',value:'Selected',checked:'checked'}},
          {tag:'label',attr:{for:'selected_radio',style:'font-weight:normal; margin-left: 5px'},child:["Selected"]},
          //{tag:'label',attr:{for:'selected_discharge',style:'font-weight:normal; margin-left: 5px; display:inline-block'},child:[" "]},
          {tag:'select',attr:{id:'selected_discharge', style:'margin-left: 5px'}},
          {tag:'label',attr:{for:'selected_discharge',style:'font-weight:normal; margin-left: 5px; display:inline-block'},child:[" m\u00B3/s"]},
          //" m\u00B3/s",
          {tag:'br'},
          {tag:'input',attr:{id:'defined_radio',type:'radio',name:'discharge',value:'Defined'}},
          {tag:'label',attr:{for:'defined_radio',style:'font-weight:normal; margin-left: 5px'},child:["User-defined"]},
          //{tag:'label',attr:{for:'defined_discharge',style:'font-weight:normal; margin-left:5px; display:inline-block'},child:[" "]},
          //{tag:'label',attr:{for:'defined_discharge',style:'font-weight:normal; margin-left:5px; display:inline-block'},child:[" "]},
          {tag:'input',attr:{id:'defined_discharge',type:'text',name:'defined_discharge',style:'width:60px; margin-left: 5px'}},
          {tag:'label',attr:{for:'defined_discharge',style:'font-weight:normal; margin-left:5px; display:inline-block'},child:[" m\u00B3/s"]},
          //" m\u00B3/s",
          {tag:'input',attr:{type:'hidden',name:'flowRate',id:'flowRate',value:'0'}},
          {tag:'input',attr:{type:'hidden',name:'flowType',id:'flowType',value:'0'}},
          {tag:'br'},
          //{tag:'label',attr:{for:'static_rd', style: 'font-weight: bold'},child:["Display Type:"]},
          {tag:'strong',child:["Display Type:"]},
          {tag:'br'},
          {tag:'input',attr:{type:'radio',name:'type',id:'static_rd',value:0}},
          {tag:'label',attr:{for:'static_rd',style:'margin-left: 5px'}, child:["Static Image"]},
          {tag:'br'},
          {tag:'input',attr:{type:'radio',name:'type',id:'animated_rd',value:1}},
          {tag:'label',attr:{for:'animated_rd',style:'margin-left: 5px'}, child:["Animated Series"]},
          {tag:'div',child:[
            {tag:'div',attr:{className:'inline-block',style:'margin:0 0 0 0'},child:[
              {tag:'label',attr:{for:'interval', style: 'font-weight: bold'},child:["Interval:"]},
              {tag:'select',attr:{name:'interval',id:'interval'},ref:{tag:'option',values:[
                {key:4,value:'4 hour'},
                {key:2,value:'2 hour'},
                {key:1,value:'1 hour',select:'selected'},
                {key:0.5,value:'30 minute'},
                {key:0.25,value:'15 minute'}
              ]}}
            ]}
          ]},
          {tag:'div',attr:{className:'inline-block'},child:[
            {tag:'label',attr:{for:'from' , style: 'font-weight: bold'},child:["From:"]},
            {tag:'select',attr:{name:'from',id:'from'},ref:{tag:'option',values:function(){
              var res=[];
              for(var i=0.00;i<24;i=i+0.25){
                var hr=parseInt(i);
                var time = (hr)+":"+padZero((i-hr)*60);
                res.push({key:time,value:time});
                if (i==17){
                  res[res.length-1].select="selected";
                }
              }
              return res;
            }}}
          ]},
          {tag:'div',attr:{id:'to_params',className:'inline-block',style:'display:none'},child:[
            {tag:'label',attr:{for:'to', style: 'font-weight: bold'},child:["To:"]},
            {tag:'select',attr:{name:'to',id:'to'},ref:{tag:'option',values:[
              {key:18,select:'selected',value:'18:00'},
              {key:19,value:'19:00'},
              {key:20,value:'20:00'},
              {key:21,value:'21:00'},
              {key:22,value:'22:00'},
              {key:23,value:'23:00'},
              {key:24,value:'24:00'}
            ]}}
          ]},
		   {tag:'div',child:[
            {tag:'div',attr:{className:'inline-block',style:'margin:0 0 0 0'},child:[
              {tag:'label',attr:{for:'zone', style: 'font-weight: bold'},child:["Zone:"]},
			  {tag:'select',attr:{name:'zone',id:'zone',style:'width:60px'},ref:{tag:'option',values:function(){
                var s=[],c=true;
                for(var i=1;i<=11;i++){
                  var t={key:i,value:i};
                  if(c){t.select=true;c=false;}
                  s.push(t);
                }
                return s;
              }}}
            ]}
          ]},
          {tag:'label',attr:{for:'legend_scale', style: 'font-weight: bold'},child:["Velocity Legend"]},
          {tag:'input',attr:{id:'zero_to_two',type:'radio',name:'legend_scale',value:0,checked:'checked'}},
          {tag:'label',attr:{for:'zero_to_two',style:'font-weight:normal;margin-left:5px'},child:["0 to 2 m/s (Interval 0.25 ms)"]},
          {tag:'br'},
          {tag:'input',attr:{id:'zero_to_four',type:'radio',name:'legend_scale',className:'rd_actual',value:1}},
          {tag:'label',attr:{for:'zero_to_four',style:'font-weight:normal;margin-left:5px'},child:["0 to 4 m/s (Interval 0.5 ms)"]}
        ]}
      ],
      'reportBody':[
        {tag:'div',child:[
          {tag:'div',attr:{id:'nodata',style:'padding:1em 1em;display:none'},child:["No images were found"]},
          {tag:'div',attr:{style:'width: 100%; margin-auto; text-align: center'},child:[
            {tag:'img',attr:{id:'animated',src:'images/nodata.jpg',style:'width:550px;height:550px;display:block',alt:'no data image'}},
            {tag:'img',attr:{id:'animated_legend',src:'images/nodata.jpg',style:'width: 325px; height: 67px; display: block;',alt:'no data image'}}
          ]}
        ]}
      ],
      'reportDetail':[]
    },
    'dd': {
      'title_e': "Available Depth Report for Fraser River South Arm",
      'title_f': "Rapport sur les profondeurs disponibles",
      'mapInitState':true,
      'hasParameters':true,
      'hasAnimate':false,
      'longReport':false,
      'landscapeReport':false,
      'formParam': [
        {tag:'div',attr:{className:'span-4'},child:[
          {tag:'label',attr:{for:'date',style:'font-weight:bold'},child:['Date:']},
          {tag:'input',attr:{id:'date',type:'text',name:'date',className:'datepicker',value:function(){
			var now = new Date();
			var strDate = now.getFullYear() + '-' + (now.getMonth()+1) + '-' + now.getDate();
            return strDate;
          }}},
          {tag:'div',child:[
            {tag:'strong',child:['River Discharge @ Hope:']},
            {tag:'br'},
            {tag:'input',attr:{id:'actual_radio',type:'radio',name:'discharge',disabled:'true',className:'rd_actual',value:'Actual'}},
            {tag:'label',attr:{for:'actual_radio',style:'font-weight:normal; margin-left:5px;'},child:[
              "Actual (",
              {tag:'span',attr:{id:'actual_discharge'},child:["0"]},
              " m\u00B3/s)"
            ]},
            {tag:'br'},
            {tag:'input',attr:{id:'selected_radio',type:'radio',name:'discharge',value:'Selected',checked:'checked'}},
            {tag:'label',attr:{for:'selected_radio',style:'font-weight:normal; margin-left:5px; margin-right:5px;'},child:["Selected"]},
            //{tag:'label',attr:{for:'selected_discharge',style:'font-weight:normal; margin-left:5px; display:inline-block'},child:[" "]},
            {tag:'select',attr:{id:'selected_discharge'}},
            {tag:'label',attr:{for:'selected_discharge',style:'font-weight:normal; margin-left:5px; display:inline-block'},child:[" m\u00B3/s"]},
            //" m\u00B3/s",
            {tag:'br'},
            {tag:'input',attr:{id:'defined_radio',type:'radio',name:'discharge',value:'Defined'}},
            {tag:'label',attr:{for:'defined_radio',style:'font-weight:normal; margin-left:5px; margin-right:5px;'},child:["User-defined"]},
            //{tag:'label',attr:{for:'defined_discharge',style:'font-weight:normal; margin-left:5px; display:inline-block'},child:[" "]},
            {tag:'input',attr:{id:'defined_discharge',type:'text',name:'defined_discharge',style:'width:5em'}},
            {tag:'label',attr:{for:'defined_discharge',style:'font-weight:normal; margin-left:5px; display:inline-block'},child:[" m\u00B3/s"]},
            //" m\u00B3/s",
            {tag:'input',attr:{type:'hidden',name:'flowRate',id:'flowRate',value:"0"}},
            {tag:'input',attr:{type:'hidden',name:'flowType',id:'flowType',value:'0'}}
          ]},
          {tag:'label',attr:{for:'chainage'},child:[{tag:'strong',child:['Chainage:']}]},
          "1 to ",
          {tag:'select',attr:{id:'chainage'},ref:{tag:'option',values:function(){
            var ref=[];
            for(var c=6;c<35;c++){
              ref.push({key:c,value:c});
            }
            ref.push({key:35,value:35,select:true});
            return ref;
          }}},
        " km",
        {tag:'div',child:[
          {tag:'strong',child:["Channel Condition:"]},
          //{tag:'label',attr:{for:'condition'},child:[{tag:'strong',child:["Channel Condition:"]}]},
          {tag:'br'},
          {tag:'input',attr:{id:'condition',type:'radio',name:'condition',checked:'checked',value:'0'}},
          " ",
   		  {tag:'label',attr:{for:'condition'},child:["Current Soundings"]},
          //{tag:'span',child:["Current Soundings"]},
          {tag:'br'},
          {tag:'input',attr:{id:'condition_dg',type:'radio',name:'condition_dg',value:'1'}},
          " ",
          {tag:'label',attr:{for:'condition_dg'},child:["Design Grade"]},
          //{tag:'span',child:["Design Grade"]}
        ]},
        {tag:'div',attr:{style:'margin-top:10px;'},child:[
          //{tag:'label',attr:{for:'channel'},child:[{tag:'strong',child:["Navigation Channel:"]}]},
          {tag:'strong',child:["Navigation Channel:"]},
          {tag:'br'},
          {tag:'input',attr:{type:'radio',id:'inner_channel',name:'channel',checked:'checked',value:'0'}},
          " ",
          {tag:'label',attr:{for: 'inner_channel'},child:["Inner Limit"]},
          //" Inner Limit",
		  {tag:'br'},
          {tag:'input',attr:{type:'radio',id:'outer_channel',name:'channel',value:'1'}},
          " ",
          {tag:'label',attr:{for:'outer_channel'},child:["Outer Limit"]},
          //" Outer Limit"
        ]},
        {tag:'div',child:[
          {tag:'label',attr:{for:'width',style:'font-weight:bold; margin-top:10px;'},child:["Available Width:"]},
          {tag:'select',attr:{id:'width'},ref:{tag:'option',values:function(){
            var res=[];
            for(var c=100;c>59;c=c-5){
              if(c==100){
                res.push({key:c,value:c,select:true})
              } else {
                res.push({key:c,value:c})
              }
            }
            return res;
          }}},
          " %"
        ]}
      ]}
      ],
      'reportBody':[
        {tag:'div',child:[
          {tag:'div',attr:{className:'span-12'},child:[
		    {tag:'section',attr:{'style':'padding-left:20%; padding-right:20%'},child:[
				{tag:'table',attr:{id:'depths',style:"text-align:center"},child:[
				  {tag:'thead',child:[
					{tag:'tr',child:[
					  {tag:'th',attr:{className:'verify'},child:["Time (pst)"]},
					  {tag:'th',child:["Chainage (km)"]},
					  {tag:'th',child:["Available Depth (m)"]},
					  {tag:'th',child:["Location of Control Point"]},
					  {tag:'th',child:["num"]}
					]}
				  ]},
				  {tag:'tbody'}
				]},
                {tag:'p',attr:{id:'subnote',style:"text-align:center"},child:["Click on a specific time to verify the control point and available depth"]},
                {tag:'hr',attr:{'style':'border: 0; height: 0; border-top: 1px solid rgba(0, 0, 0, 0.1); border-bottom: 1px solid rgba(255, 255, 255, 0.3); margin-left:7%; margin-right:7%'}}
          ]},
		  {tag:'section',child:[
		    {tag:'div',attr:{style:'margin-top:15px;;margin-left:auto; margin-right:auto',id:'depth_chart',className:'demo-placeholder'}}
		  ]}
        ]}
      ]}],
      'reportDetail':[
        {tag:'div',child:[
          {tag:'div',child:[
            {tag:'h2',attr:{style:'padding: 0; margin:0; text-align: center;'},child:[
              "Available Depth Verification @ ",
              {tag:'span',attr:{id:'static-time'},child:["00"]},
              " hrs."
            ]},
            {tag:'span',attr:{className:'span-12',style:'display: block; text-align: center; margin: 0 0 10px 0; width: 100%;'},child:[
              {tag:'div',attr:{style:'display: inline-block;'},child:["for&nbsp;"]},
              {tag:'div',attr:{style:'display: inline-block; padding: 0 0 0 0; margin: 0 0 0 0;',id:'date-display'}}
            ]},
            {tag:'table',attr:{style:'width: 600px; margin-left: auto; margin-right: auto;'},child:[
             {tag:'thead',child:[
              {tag:'tr',child:[
                {tag:'th',attr:{style:'padding: 2px;'},child:[
                  {tag:'span',child:[
                    "Navigation Channel: Fraser River - ",
                    {tag:'span',attr:{id:'static-limit'}}
                  ]}
                ]}
              ]}
             ]},
              {tag:'tr',child:[
                {tag:'td',attr:{style:'padding: 2px;'},child:[
                  "Channel Condition: ",
                  {tag:'span',attr:{id:'static-type'},child:["Current Soundings"]},
                  " for Km 1 to ",
                  {tag:'span',attr:{id:'static-chainage'},child:["35"]},
                  " at ",
                  {tag:'span',attr:{id:'static-width'},child:["100"]},
                  "% Available Width"
                ]}
              ]},
              {tag:'tr',child:[
                {tag:'td',attr:{style:'padding: 2px;'},child:[
                  {tag:'p',attr:{style:'margin:0;'},child:[
                    "River Discharge @ Hope ",
                    {tag:'span',attr:{id:'static-discharge'}},
                    " m\u00B3/s (",
                    {tag:'span',attr:{id:'static-discharge-eval'}},
                    ")",
                    {tag:'br'}
                  ]}
                ]}
              ]}
            ]}
          ]},
          {tag:'div',attr:{className:'span-8'},child:[
            {tag:'table',attr:{id:'verify',style:'text-align:center; table-layout: fixed; width: 600px;',className:'dataTable zebra-striped'},child:[
              {tag:'thead',child:[
                {tag:'tr',child:[
                  {tag:'th',child:['Location']},
                  {tag:'th',child:['Design Grade']},
                  {tag:'th',child:['Least Sounding']},
                  {tag:'th',attr:{colspan:'2'},child:['Available Width']},
                  {tag:'th',child:['Tidal Aid']},
                  {tag:'th',child:['Depth']},
                  {tag:'th',child:['Number']}
                ]},
                {tag:'tr',attr:{style:'background-color: #EEEEEE;'},child:[
                  {tag:'th',child:['(km)']},
                  {tag:'th',child:['(m)']},
                  {tag:'th',child:['(m)']},
                  {tag:'th',child:['(m)']},
                  {tag:'th',child:['%']},
                  {tag:'th',child:['(m)']},
                  {tag:'th',child:['(m)']},
                  {tag:'th',child:['(m)']}
                ]}
              ]},
              {tag:'tbody'}
            ]}
          ]}
        ]}
      ]
    },
    'tw':{
      'title_e':"Transit Window Report for Fraser River South Arm",
      'title_f':"Fenêtre de circulation",
      'mapInitState':true,
      'hasParameters':true,
      'hasAnimate':false,
      'longReport':false,
      'landscapeReport':false,
      'formParam':[
        {tag:'div',child:[
          {tag:'div',attr:{className:'span-4'},child:[
            {tag:'label',attr:{for:'date'},child:[
              {tag:'strong',child:["Date:"]}
            ]},
            {tag:'input',attr:{id:'date',type:'text',name:'date',className:'datepicker'}},
            {tag:'div',child:[
              {tag:'strong',child:["River Discharge @ Hope:"]},
              {tag:'br'},
              {tag:'input',attr:{id:'actual_radio',type:'radio',name:'discharge',value:'Actual'}},
              {tag:'label',attr:{for:'actual_radio',style:'margin-left:5px;'},child:[
                "Actual (",
                {tag:'span',attr:{id:'actual_discharge'}},
                " m\u00B3/s)"
              ]},
              {tag:'br'},
              {tag:'input',attr:{id:'selected_radio',type:'radio',name:'discharge',value:'Selected'}},
              {tag:'label',attr:{for:'selected_radio',style:'margin-left:5px; margin-right:5px;'},child:['Selected']},
              //{tag:'label',attr:{for:'selected_discharge',style:'font-weight:normal; margin-left:5px; display:inline-block'},child:[" "]},
              {tag:'select',attr:{id:'selected_discharge'}},
              {tag:'label',attr:{for:'selected_discharge',style:'font-weight:normal; margin-left:5px; display:inline-block'},child:[" m\u00B3/s"]},
              //" m\u00B3/s",
              {tag:'br'},
              {tag:'input',attr:{id:'defined_radio',type:'radio',name:'discharge',value:'Defined'}},
              {tag:'label',attr:{for:'defined_radio',style:'margin-left:5px; margin-right:5px;'},child:['User-defined']},
              //{tag:'label',attr:{for:'defined_discharge',style:'font-weight:normal; margin-left:5px; display:inline-block'},child:[" "]},
              //{tag:'label',attr:{for:'defined_discharge',style:'font-weight:normal; margin-left:5px; display:inline-block'},child:[" "]},
              {tag:'input',attr:{id:'defined_discharge',type:'text',style:'width:5em'}},
              {tag:'label',attr:{for:'defined_discharge',style:'font-weight:normal; margin-left:5px; display:inline-block'},child:[" m\u00B3/s"]},
              //" m\u00B3/s",
              {tag:'input',attr:{type:'hidden',name:'flowRate',id:'flowRate',value:'0'}},
              {tag:'input',attr:{type:'hidden',name:'flowType',id:'flowType',value:'0'}}
            ]},
            {tag:'label',attr:{for:'chainage'},child:[
              {tag:'strong',child:["Chainage:"]}
            ]},
            "1 to ",
            {tag:'select',attr:{id:'chainage'},ref:{tag:'option',values:function(){
              var s=[];
              for(var i=6;i<35;i++){
                s.push({key:i,value:i});
              }
              s.push({key:35,value:35,select:true});
              return s
            }}},
			" km",
            {tag:'div',child:[
              {tag:'strong',child:["Channel Condition:"]},
          	  //{tag:'label',attr:{for:'condition'},child:[{tag:'strong',child:["Channel Condition:"]}]},
          	  {tag:'br'},
         	  {tag:'input',attr:{id:'condition',type:'radio',name:'condition',checked:'checked',value:'0'}},
         	  " ",
   		  	  {tag:'label',attr:{for:'condition'},child:["Current Soundings"]},
         	  //{tag:'span',child:["Current Soundings"]},
          	  {tag:'br'},
         	  {tag:'input',attr:{id:'condition_dg',type:'radio',name:'condition_dg',value:'1'}},
         	  " ",
         	  {tag:'label',attr:{for:'condition_dg'},child:["Design Grade"]},
         	  //{tag:'span',child:["Design Grade"]}
            ]},
            {tag:'div',attr:{style:'margin-top:10px;'},child:[
          		//{tag:'label',attr:{for:'channel'},child:[{tag:'strong',child:["Navigation Channel:"]}]},
          		{tag:'strong',child:["Navigation Channel:"]},
          		{tag:'br'},
          		{tag:'input',attr:{type:'radio',id:'inner_channel',name:'channel',checked:'checked',value:'0'}},
          		" ",
          		{tag:'label',attr:{for: 'inner_channel'},child:["Inner Limit"]},
         		//" Inner Limit",
		 		{tag:'br'},
          		{tag:'input',attr:{type:'radio',id:'outer_channel',name:'channel',value:'1'}},
          		" ",
          		{tag:'label',attr:{for:'outer_channel'},child:["Outer Limit"]},
          		//" Outer Limit"
        	]},
            {tag:'div',child:[
              {tag:'label',attr:{for:'width',style:"display:inline-block;"},child:["Available Width:"]},
              {tag:'select',attr:{id:'width',style:'margin-top:10px'},ref:{tag:'option',values:function(){
                var s=[],c=true;
                for(var i=100;i>45;i=i-5){
                  var t={key:i,value:i};
                  if(c){t.select=true;c=false;}
                  s.push(t);
                }
                return s;
              }}},
              " %"
            ]},
            {tag:'div',child:[
              {tag:'label',attr:{for:'channel'},child:[{tag:'strong',child:["Transit Calculation:"]}]},
              {tag:'div',child:[
                {tag:'label',attr:{for:'period',style:'display:inline'},child:["Period:"]},
                {tag:'select',attr:{id:'period'},ref:{tag:'option',values:[{key:0,value:"Day"},{key:1,value:'Week'},{key:2,value:'Month'}]}},
                {tag:'input',attr:{id:'window',type:'hidden',name:'window',value:2}},
                {tag:'input',attr:{id:'cmp',type:'hidden',name:'cmp',value:0}},
                {tag:'br'},
                {tag:'input',attr:{id:'max_depth_radio',type:'radio',name:'window_radio',checked:'checked',value:'Maximum Depth'}},
                {tag:'label',attr:{for:'max_depth_radio',style:'margin-left:5px'},child:[{tag:'strong',child:["Maximum Depth:"]}]},
                {tag:'br'},
                {tag:'label',attr:{for:'minimum_window',style:'display:inline-block;margin-left:30px'},child:["Min. Window:"]},
                {tag:'select',attr:{id:'minimum_window',name:'minimum_window',style:'display:inline-block'},ref:{tag:'option',values:[{key:1,value:'1 hr'},{key:2,value:'2 hrs',select:true},{key:3,value:'3 hrs'},{key:4,value:'4 hrs'}]}},
                {tag:'br'},
                {tag:'input',attr:{id:'min_win_radio',type:'radio',name:'window_radio',value:'Min Window'}},
                {tag:'label',attr:{for:'min_win_radio',style:'margin-left:5px'},child:[{tag:'strong',child:["Available Windows:"]}]},
                {tag:'br'},
                {tag:'label',attr:{for:'depth',style:'display:inline-block;margin-left:30px'},child:["Depth:"]},
                {tag:'input',attr:{id:'depth',type:'text',name:'depth',value:10,style:"width:3em;diplay:inline-block"}},
                " ",
                {tag:'span',attr:{style:'margin: 0px 0 0 0; padding: 0 0 0 0;'},child:["m"]}
              ]}
            ]}
          ]},
        ]}
      ],
      'reportBody':[
        {tag:'div',child:[
          {tag:'table',attr:{id:'header_table',style:'width:75%;margin:5px auto'}},
          {tag:'div',attr:{className:'clear'}},
          


          {
            tag: 'section',
            attr: {
              style:'padding-top: 20px;margin:1em auto;width:75%'
            },
            child: [{
              tag: 'table',
              attr: {
                id: 'transit-window',
                className: 'zebra-striped'
              },
              child: [{
                tag: 'thead',
                child: [{
                  tag: 'tr',
                  child: [{
                    tag: 'th',
                    child: ["From"]
                  },{
                    tag: 'th',
                    child: ["To"]
                  },{
                    tag: 'th',
                    attr: {
                      id: 'transit-window-last-col'
                    },
                    child: ["Maximum Depth (m)"]
                  }]
                }]
              },{
                tag: 'tbody',
                child: [{
                  tag: 'tr',
                  child: [{
                    tag: 'td',
                    child: [0]
                  },{
                    tag: 'td',
                    child: [0]
                  },{
                    tag: 'td',
                    child: [0]
                  }]
                }]
              }]
            },{
              tag:'div',attr:{style:'text-align:left;margin-top:1em'},child:["* Depths are relative to local low water level"]
            }]
          }
        ]}
      ],
      'reportDetail':[

      ]
    },
    'pwl':{
      'title_e':"Predicted Water Levels & Velocities",
      'title_f':"Vélocités et niveaux prévus de l’eau",
      'mapInitState':true,
      'hasParameters':true,
      'hasAnimate':false,
      'longReport':true,
      'formParam':
        [
          {tag:'div',child:[
            {tag:'label',attr:{for:'pwl_date', style:'font-weight:bold'},child:['Date:']},
            {tag:'input',attr:{id:'pwl_date',type:'text',name:'pwl_date',className:'datepicker'}},
            {tag:'input',attr:{id:'alt-date',type:'hidden'}}
          ]},
          {tag:'div',child:[
            {tag:'label',attr:{for:'fraser_river', style:'font-weight:bold'},child:['Fraser River:']},
            {tag:'select',attr:{id:'fraser_river',name:'fraser_river'},
              ref:{
                tag:'option',values:[
                  {key:'South Arm',value:'South Arm (km 0-40)'},
                  {key:'North Arm',value:'North Arm (km 0-30)'},
                  {key:'Main Arm',value:'Main Arm (km 40-92)'}]
              }
            },
            {tag:'input',attr:{type:'hidden',name:'pwl_waterway',id:'pwl_waterway',value:"0"}}
          ]},
          {tag:'strong',child:['River Discharge @ Hope:']},
          {tag:'br'},
          {tag:'input',attr:{id:'actual_radio',type:'radio',name:'discharge',className:'rd_actual',value:'Actual',disabled:'true'}},
          {tag:'label',attr:{for:'actual_radio',style:'font-weight:normal; margin-left: 5px'},child:[
            "Actual (",
            {tag:'span',attr:{id:'actual_discharge'}},
            " m\u00B3/s)"
          ]},
          {tag:'br'},
          {tag:'input',attr:{id:'selected_radio',type:'radio',name:'discharge',value:'Selected'}},
          {tag:'label',attr:{for:'selected_radio','style':'font-weight:normal; margin-left: 5px'},child:["Selected"]},
          //{tag:'label',attr:{for:'selected_discharge',style:'font-weight:normal; margin-left: 5px; display:inline-block'}, child:[" m\u00B3/s"]},
          {tag:'select',attr:{id:'selected_discharge', 'style':'margin-left: 5px'}},
          {tag:'label',attr:{for:'selected_discharge',style:'font-weight:normal; margin-left: 5px; display:inline-block'}, child:[" m\u00B3/s"]},
          //" m\u00B3/s",
          {tag:'br'},
          {tag:'input',attr:{id:'defined_radio',type:'radio',name:'discharge',value:'Defined'}},
          {tag:'label',attr:{for:'defined_radio','style':'font-weight:normal; margin-left: 5px'},child:['User-defined']},
          //{tag:'label',attr:{for:'defined_discharge',style:'font-weight:normal; margin-left:5px; display:inline-block'},child:[" "]},
          {tag:'input',attr:{id:'defined_discharge',name:'defined_discharge',type:'text',style:'width:5em; margin-left: 5px'}},
          {tag:'label',attr:{for:'defined_discharge',style:'font-weight:normal; margin-left:5px; display:inline-block'},child:[" m\u00B3/s"]},
          {tag:'input',attr:{type:'hidden',name:'flowRate',id:'flowRate',value:'0'}},
          {tag:'input',attr:{type:'hidden',name:'flowType',id:'flowType',value:'0'}},
		  {tag:'br'},
          {tag:'div',child:[
            {tag:'label',attr:{for:'interval', style:'font-weight:bold'},child:['Interval:']},
            {tag:'select',attr:{id:'interval'},ref:{tag:'option',values:[
			  {key:'120',value:'2 hour'},
              {key:'60',value:'1 hour','select':true},
			  {key:'30',value:'30 minute'},
              {key:'15',value:'15 minute'}
            ]}}
          ]},
          {tag:'div',child:[
            {tag:'strong',child:['Report: ']},
            {tag:'br'},
            {tag:'input',attr:{id:'report_wl',type:'radio',name:'report',checked:'checked',value:'0'}},
            ' ',
            {tag:'label',attr:{for:'report_wl', style:'font-weight:normal'},child:['Water Levels']},
            //" Water Levels",
            {tag:'br'},
            {tag:'input',attr:{id:'report_v',type:'radio',name:'report',value:'1'}},
            ' ',
            {tag:'label',attr:{for:'report_v', style:'font-weight:normal'},child:['Velocities']},
            //" Velocities",
            {tag:'br'},
            {tag:'br'}
          ]}
        ],
      'reportBody':
        [{tag:"div",child:[
          {tag:'div',attr:{className:'span-12'},child:[
            {tag:'section',attr:{'style':'padding:0 20px 0 20px'},child:[
              {tag:'table',attr:{id:'water-levels',className:'table-condensed align-center print-table-fixed'},child:[
                {tag:'thead',child:[
                  {tag:'tr',child:[
                    {tag:'td',attr:{style:'background-color:rgb(238, 238, 238); border-bottom: 1px solid black; font-weight:bold;',rowspan:'2'},child:["Time (PST)"]},
                    {tag:'td',attr:{style:'background-color:rgb(238, 238, 238); border-bottom: 1px solid black; font-weight:bold;',colspan:'21',id:'location'},child:[
                      {tag:'span',attr:{id:'river-section'}}
                    ]}
                  ]},
                  {tag:'tr',attr:{id:'headerkm'}}
                ]},
                {tag:'tbody'}
              ]}
            ]},
            {tag:'ul',attr:{style:'text-align:left'},child:[
              {tag:'li',attr:{id:'note-at-bottom'},child:[
                "Water level is referenced to Chart Datum which is relative to Local Low Water.",
                {tag:'br'},
                "Click on a time or location to display a graph."
              ]}
            ]}
          ]}
        ]}],
      'reportDetail':
        [
          {tag:'div',attr:{className:"grid-12"},child:[
            {tag:'div',attr:{className:'span-6 align-center'},child:[
			  {tag:'h2',child:["Predicted Water Levels",
			    {tag:'br'},
                "Fraser River - ",
                {tag:'span',attr:{id:'det_river-section'}},
                " at ",
				{tag:'span',attr:{id:'det_km_time-suff'}},
                {tag:'span',attr:{id:'det_km_time'}}
                
              ]},
              {tag:'p',child:[
                {tag:'span',attr:{id:'det_static-date'}},
                " at ",
                {tag:'span',attr:{id:'det_static-interval'}},
                " Intervals",
                {tag:'br'},
                "River Discharge @ Hope ",
                {tag:'span',attr:{id:'det_static-discharge'}},
                " m\u00B3/s (",
                {tag:'span',attr:{id:'det_static-discharge-eval'}},
                ')'
              ]},
              {tag:'div',attr:{id:'det_placeholder',className:'demo-placeholder',style:'height:450px;width:800px;'}}
			  
			  
            ]}
          ]}
        ]
    },
    'frh':{
      'title_e':"Fraser River Hydrograph",
      'title_f':"Hydrographie du fleuve Fraser",
      'mapInitState':true,
      'hasParameters':true,
      'hasAnimate':false,
      'longReport':false,
      'landscapeReport':true,
      'formParam':[
        {tag:'div',child:[
          {tag:'label',attr:{for:'date', style:'font-weight: bold;'},child:["Date:"]},
          {tag:'input',attr:{id:'date',type:'text',name:'date',className:'datepicker'}},
          {tag:'input',attr:{id:'alt-date',type:'hidden'}},
          {tag:'label',attr:{for:'period', style:'font-weight: bold;'},child:["Period:"]},
          {tag:'select',attr:{id:'period'},ref:{tag:'option',values:[{key:3,value:"12 Months"},{key:2,value:'6 Months'},{key:1,value:'2 Months'},{key:0,value:'1 Month'}]}},
          {tag:'label',attr:{for:'plot', style:'font-weight: bold;'},child:["Plot:"]},
          {tag:'input',attr:{id:'actual',type:'checkbox',name:'actual',checked:'checked'}},
          {tag:'label',attr:{for:'actual',style:'font-weight:normal'},child:[" Actual"]},
          //" Actual",
          {tag:'br'},
          {tag:'input',attr:{id:'predicted',type:'checkbox',name:'predicted',checked:'checked'}},
          {tag:'label',attr:{for:'predicted',style:'font-weight:normal'},child:[" Predicted"]},
          //" Predicted",
          {tag:'br'},{tag:'br'}
        ]}
      ],
      'reportBody':[
        {tag:'div',attr:{id:'hydrograph_report',style:'margin:0 auto'},child:[
          {tag:'div',attr:{id:'loading',style:'margin-left: 10px;'},child:[
            {tag:'span',attr:{className:'float:left;'},child:['Please wait while we fetch your results...']}
          ]},
          {tag:'div',attr:{id:'legend_container'}},
          {tag:'div',attr:{id:'hydrograph_chart',style:'width:100%;height:500px;text-align:center;'}}
        ]}
      ],
      'reportDetail':[

      ]
    },
    'ccc':{
      'title_e':"Current Channel Conditions for Fraser River – South Arm",
      'title_f':"Conditions actuelles du chenal – bras sud du fleuve Fraser",
      'mapInitState':false,
      'hasParameters':false,
      'hasAnimate':false,
      'longReport':true,
      'landscapeReport':false,
      'formParam':[

      ],
      reportBody:[
        {tag:'div',attr:{id:'conditions'},child:[
          {tag:'div',attr:{id:'soundings-header'},child:[
            {tag:'table',attr:{className:'print-margin-0',style:'margin: 0 auto; width: 950px;'},child:[
             {tag:'thead',child:[
              {tag:'tr',child:[
                {tag:'th',attr:{className:'align-left'},child:["Note:  All soundings / depths are relative to local low water level"]}
              ]}
              ]},
              {tag:'tr',child:[
                {tag:'td',attr:{className:'align-left'},child:[
                  "Least depths highlighted in ",
                  {tag:'span',attr:{className:'red'},child:["RED"]},
                  " and marked with * denote high spots and shoal areas within the navigation channel limits."
                ]}
              ]},
              {tag:'tr',attr:{className:'print_hide'},child:[
                {tag:'td',attr:{className:'align-left', style:'white-space: pre-line;'},child:[
                  "Users will need to download an Autodesk DWF viewer to view and display the Reference Plan.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;",
                  {tag:'a',attr:{href:'http://usa.autodesk.com/design-review/',target:'_blank'},child:['Download Autodesk viewer']}
                ]}
              ]}
            ]}
          ]},
          {tag:'div',attr:{className:'clear'}},
          {tag:'br'},
          {tag:'table',attr:{id:'soundings',className:'align-center print-align-center print-margin-0', style:'width: 800px'},child:[
            {tag:'thead',child:[
              {tag:'tr',attr:{className:'first-row'},child:[
                {tag:'th',attr:{colspan:3,style:'background-color: white;'}},
                {tag:'th',attr:{colspan:4,style:'background-color: white;'},child:["Inner Channel Limit"]},
                {tag:'th',attr:{colspan:4,style:'background-color: white;'},child:["Outer Channel Limit"]}
              ]},
              {tag:'tr',attr:{style:'white-space:nowrap;'},child:[
                {tag:'th',child:["Km"]},
                {tag:'th',child:["Survey Date"]},
                {tag:'th',child:["Reference Plan"]},
                {tag:'th',child:["Design Grade"]},
                {tag:'th',child:["Least Depth"]},
                {tag:'th',attr:{colspan:2},child:["Available Width"]},
                {tag:'th',child:["Design Grade"]},
                {tag:'th',child:["Least Depth"]},
                {tag:'th',attr:{colspan:2},child:["Available Width"]}
              ]},
              {tag:'tr',child:[
                {tag:'th',attr:{colspan:3}},
                {tag:'th',child:["(m)"]},
                {tag:'th',child:["(m)"]},
                {tag:'th',child:["(m)"]},
                {tag:'th',child:["(%)"]},
                {tag:'th',child:["(m)"]},
                {tag:'th',child:["(m)"]},
                {tag:'th',child:["(m)"]},
                {tag:'th',child:["(%)"]}
              ]}
            ]},
            {tag:'tbody'}
          ]},
          {tag:'div',attr:{style:'clear:both'}}
        ]}
      ],
      reportDetail:[
        {tag:'div',child:[
          {tag:'div',attr:{className:'grid-12'},child:[
            {tag:'div',attr:{className:'align-center print-align-center print-margin-0'},child:[
              {tag:'h3',attr:{style:'margin:0'},child:["Least Soundings and Available Widths"]},
              {tag:'h3',attr:{style:'margin:0'},child:[
                {tag:'span',child:["for Fraser River – South Arm"]},
                {tag:'span',child:[", "]},
                {tag:'span',attr:{id:'heading'}}
              ]},
              {tag:'h3',attr:{style:"margin:0"},child:[
                {tag:'span',attr:{id:'segment',className:'print_show_inline'},child:["Inner Channel"]}
              ]}
            ]},
            {tag:'table',attr:{id:'survey-header',className:'styled align-center',style:'margin-left: auto; margin-right: auto; width: 550px;'},child:[
              {tag:'thead',child:[
              {tag:'tr',child:[
                {tag:'td',child:["Note:  All soundings / depths are relative to local low water level"]}
              ]}
              ]},
              {tag:'tr',attr:{className:'print_hide'},child:[
                {tag:'td',child:[
                  "Users will need to download an Autodesk DWF viewer to view and display the Reference Plan. ",
                  {tag:'a',attr:{href:'http://usa.autodesk.com/design-review/',target:'_blank'},child:['Download Autodesk viewer']}
                ]}
              ]}
            ]},
            {tag:'div',attr:{id:'print_remove', className:'print_hide'},child:[
              {tag:'strong',child:['Channel Select']},
              {tag:'br'},
              {tag:'input',attr:{id:'inner_select',type:'radio',name:'channel_select',style:'display:inline',checked:'checked',value:'1'}},
              {tag:'label',attr:{for:'inner_select',style:'display:inline'},child:["Inner Channel"]},
              "  ",
              {tag:'input',attr:{id:'outer_select',type:'radio',name:'channel_select',style:'display:inline',value:'2'}},
              {tag:'label',attr:{for:'outer_select',style:'display:inline'},child:["Outer Channel"]},
              {tag:'br'}
            ]}
          ]},
          {tag:'div',attr:{className:'grid-12'},child:[
            {tag:'table',attr:{id:'surveys',className:'styled align-center',style:'margin-left: auto; margin-right: auto; width: 550px'},child:[
              {tag:'thead',child:[
                {tag:'tr',child:[
                  {tag:'th',attr:{rowspan:2},child:["Date of Survey"]},
                  {tag:'th',attr:{rowspan:2},child:["Reference Plan"]},
                  {tag:'th',attr:{style:"width:55px"},child:["Design Grade"]},
                  {tag:'th',attr:{style:"width:55px"},child:["Least Soundings"]},
                  {tag:'th',attr:{colspan:2},child:["Available Width"]}
                ]},
                {tag:'tr',child:[
                  {tag:'th',child:["(m)"]},
                  {tag:'th',child:["(m)"]},
                  {tag:'th',child:["(m)"]},
                  {tag:'th',child:["(%)"]}
                ]}
              ]},
              {tag:'tbody',child:[

              ]}
            ]}
          ]}
        ]}
      ]

    },
    'sdb':{
      'title_e':"Survey Drawings",
      'title_f':"Dessins d'arpentage",
      'mapInitState':true,
      'hasParameters':true,
      'hasAnimate':false,
      'longReport':true,
      'landscapeReport':false,
      'formParam':
        [
          {tag:'label',attr:{for:'sdb_waterway', style:'font-weight: bold;'},child:['Waterway:']},
          {tag:'select',attr:{id:'sdb_waterway'},ref:{tag:'option',values:
            function(){
              var oArr=[];
              for(var k in incl_ava_defs.locDefs){
                var v=incl_ava_defs.locDefs[k].Form;
                oArr[v.Order]={key:k, value:v.Title};
              }
              return oArr;
            }
          }},
          {tag:'label',attr:{for:'channel', style:'font-weight: bold;'},child:['Channel:']},
          {tag:'select',attr:{id:'channel'}},
          {tag:'label',attr:{for:'location', style:'font-weight: bold;'},child:['Location:']},
          {tag:'select',attr:{id:'location'}},
          {tag:'label',attr:{for:'type', style:'font-weight: bold;'},child:['Type:']},
          {tag:'div',child:[
            {tag:'select',attr:{id:'type',name:'type'},ref:{tag:'option',values:
              function() {
                var res = [];
                var oArr = ["",
                            "Recon", "Monitor", "Annual", "Investigation", "Composite",
                            "Dredging", "Design", "Photograph"];
                for (var k in oArr) {
                  res.push({key: oArr[k], value: oArr[k]});
                }
                return res;
              }
            }}
          ]}
        ],
      'reportBody':
        [
          {tag:'section',attr:{'style':'padding:0 20px 0 20px;'},child:[
            {tag:'table',attr:{id:'report_tbl',className:"styled width-80"},child:[
              {tag:'thead',child:[
                {tag:'tr',child:[
                  {tag:'th',child:['Date']},
                  {tag:'th',child:['Drawing']},
                  {tag:'th',child:['Location (km)']},
                  {tag:'th',child:['Type']},
                  {tag:'th',child:['Km Start']},
                  {tag:'th',child:['Km End']}
                ]}
              ]},
              {tag:'tbody'}
            ]}
          ]}
        ],
      'reportDetail':
        [{tag:'p',child:['This tool does not support detailed search items']}]
    }
  }


};

var mapStyle = {

  // Default Styles and map constants
  col1: '#dd0000',
  col2: '#aaaaaa',
  sel1: '#00ffff',
  black: '#000000',
  white: '#ffffff',
  op1: 0.2,
  op2: 0.1,
  op_sel: 0.5,
  callback_function:undefined,
  cl:function (feat, c1, c2) {return (mapStyle.callback_function(feat) ? c1 : c2)},
  context:{
    getColor: function (feat) {
      return mapStyle.cl(feat, mapStyle.col1, mapStyle.col2)
    },
    getOpacity: function (feat) {
      return mapStyle.cl(feat, mapStyle.op1, mapStyle.op2)
    }
  },
  pt_hover_lbl: function(lbl) {
    return {fillColor: "${getColor}", fillOpacity: "${getOpacity}", pointRadius: 4,
      label: lbl, fontSize: 15, fontWeight: "bold", labelYOffset: 15,
      strokeColor: "${getColor}", labelOutlineOpacity: 0, fontColor: mapStyle.col1}
  },
  pt_select_lbl: function(lbl){
    return {fillColor: mapStyle.sel1,fillOpacity: mapStyle.op_sel,pointRadius: 4,
        label: lbl, fontSize: 15, fontWeight: "bold", labelYOffset: 15,
        strokeColor: mapStyle.sel1, labelOutlineOpacity: 0, fontColor: mapStyle.sel1}
  },
  pt_default_lbl: function(lbl){
    return {fillColor: "${getColor}", fillOpacity: "${getOpacity}", strokeColor: "${getColor}", pointRadius: 2.5,
          label:lbl, fontColor: "${getColor}", fontSize: 15, fontWeight: "bold", labelYOffset: 15}
  },
  area_default: function(){
    return {fillColor: "${getColor}", fillOpacity: "${getOpacity}", strokeColor: "${getColor}", strokeWidth: 2.0}
  },
  area_select:function(){
    return {fillColor: mapStyle.sel1, strokeColor: mapStyle.sel1}
  },
  area_hover:function(){
    return {fillColor: '${getColor}', strokeColor: '${getColor}', fillOpacity: mapStyle.op_sel}
  },
  area_default_lbl: function(lbl){
    return {fillColor: "${getColor}", fillOpacity: "${getOpacity}", strokeColor: "${getColor}", strokeWidth: 2.0,
        label:lbl, fontColor: mapStyle.black, fontSize: 15, fontWeight: "bold", labelYOffset: 15}
  },
  area_select_lbl: function(lbl){
    return {fillColor: mapStyle.sel1, strokeColor: mapStyle.sel1,
        label: lbl, fontSize: 15, fontWeight: "bold", fontColor: "black",
        labelOutlineColor: mapStyle.sel1, labelOutlineWidth: 2
      }
  },
  area_hover_lbl: function(lbl){
    return {fillColor: '${getColor}', strokeColor: '${getColor}',
          label: lbl, fontSize: 15, fontWeight: "bold", fontColor: "black",
          labelOutlineColor: "${getColor}", labelOutlineWidth: 2, fillOpacity: mapStyle.op_sel
        }
  },
  point_with_label: function (label_value) {
    return new OpenLayers.StyleMap({
      'default': new OpenLayers.Style(mapStyle.pt_default_lbl(label_value),{context:mapStyle.context}),
      'temporary': new OpenLayers.Style(mapStyle.pt_hover_lbl(label_value),{context:mapStyle.context}),
      'select': new OpenLayers.Style(mapStyle.pt_select_lbl(label_value))
    })
  },
  area_no_label: function () {
    return new OpenLayers.StyleMap({
      'default': new OpenLayers.Style(mapStyle.area_default(),{context:mapStyle.context}),
      'select': new OpenLayers.Style(mapStyle.area_select()),
      'temporary': new OpenLayers.Style(mapStyle.area_hover(),{context:mapStyle.context})
    })
  },
  area_with_label: function (lbl) {
    return new OpenLayers.StyleMap({
      'default':new OpenLayers.Style(mapStyle.area_default(),{context:mapStyle.context}),
      'select': new OpenLayers.Style(mapStyle.area_select_lbl(lbl)),
      'temporary': new OpenLayers.Style(mapStyle.area_hover_lbl(lbl),{context:mapStyle.context})
    })
  }
};

//# sourceURL=incl_ava_defs-eng.js
