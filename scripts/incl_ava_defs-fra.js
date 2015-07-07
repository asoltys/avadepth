/**
 * Created by wsiddall on 14/07/2014.
 */

var padZero = function(num){
  var s = "000" + num;
  return s.substr(s.length-2);
};

function getAPI(extURL, intURL){
  if(document.URL.split("/")[2].split(":")[0] === "localhost") {
    return intURL;
  } else {
    return extURL;
  }
}

var currentDate = new Date();

incl_ava_defs={

  locDefs: {
    /*'BR': {
      'Form':{'Title': "Campbell River, BC",'Order':5},
      'Names': {'Main': ['Marina', 'Channel'],'Secondary': [],'Other': []},
      'Coords':{'Lat':{'min':6450273,'max':6458623},'Lon':{'min':-13948221,'max':-13941007}}
    },
    'CR': {
      'Form':{'Title': "Courtenay River, BC",'Order':6},
      'Names': {'Main': ['Channel'],'Secondary': [],'Other': []},
      'Coords':{'Lat':{'min':6386978,'max':6394557},'Lon':{'min':-13918640,'max':-13904727}}
    },*/
	
  "FR": {
    'Form':{'Title':'Fraser River, BC', 'Order':0},
    'Coords':{'Lat':{'min':6287000,'max':6352933},'Lon':{'min':-13730400,'max':-13510906}},
    'Sections':{
      'FRMA': {
        'Form': {'Title': "Main Arm", 'Order': 4, 'Key': "FRMA"},
        'Names': ['Channel Overview', 'Queens Reach', 'Douglas Island', 'Bishops Reach', 'Derby Reach', 'Russel Reach', 'Plumper Reach', 'Matsqui Island'],
        'Coords': {'Lat': {'min': 6290650, 'max': 6315727}, 'Lon': {'min': -13685417, 'max': -13610377}},
        'pwl': {'key': 'Main Arm'}
      },
	  'FRMA_SC': {
        'Form': {'Title': "Main Arm - Side Channel", 'Order': 5, 'Key': "FRMA_SC"},
        'Names': ['Sapperton Channel', 'Essondale Channel', 'Douglas Island North', 'Parsons Channel', 'Bedford Channel', 'Enterprise Channel'],
        'Coords': {'Lat': {'min': 6290650, 'max': 6315727}, 'Lon': {'min': -13685417, 'max': -13610377}}
      },
      'FRSA': {
        'Form': {'Title': "South Arm", 'Order': 0, 'Key': "FRSA"},
        'Names': ['Channel Overview', 'Sand Heads Entrance', 'Sand Heads Reach', 'Steveston Bend', 'Steveston Cut', 'Woodward Reach', 'Gravesend Reach', 'City Reach', 'Annieville - New West', 'Fraser Surrey Docks'],
        'Coords': {'Lat': {'min': 6287000, 'max': 6317590}, 'Lon': {'min': -13730400, 'max': -13669354}},
        'pwl': {'key': "South Arm"}
      },
      'FRSA_SC': {
        'Form': {'Title': "South Arm - Side Channel", 'Order': 1, 'Key': "FRSA_SC"},
        'Names': ['Ladner Sea Reach','Cannery Channel','Burr Landing Channel','Gundersen Slough','Annacis Channel','Shoal Point - New West'],
        'Coords': {'Lat': {'min': 6287000, 'max': 6317590}, 'Lon': {'min': -13730400, 'max': -13669354}}
      },
      'FRNA': {
        'Form': {'Title': "North Arm", 'Order': 2, 'Key': "FRNA"},
        'Names': ['Channel Overview', 'Point Grey', 'Iona', 'Musqueam', 'Sea Island', 'Marpole Basin', 'Mitchell Island', 'Mac-Blo', 'Byrne Road', 'Big Bend - Queens', 'Poplar Island'],
        'Coords': {'Lat': {'min': 6302401, 'max': 6318147}, 'Lon': {'min': -13724567, 'max': -13679776}},
        'pwl': {'key': "North Arm"}
      },
      'FRNA_SC': {
        'Form': {'Title': "North Arm - Side Channel", 'Order': 3, 'Key': "FRNA_SC"},
        'Names': ['Morey Channel', 'Cowards Cove', 'Point Grey Scow Moorage', 'MacDonald Slough', 'Deering Channel', 'Tree Island'],
        'Coords': {'Lat': {'min': 6302401, 'max': 6318147}, 'Lon': {'min': -13724567, 'max': -13679776}}
      },
      'FRUR': {
        'Form': {'Title': "Mission to Hope", 'Order': 6, 'Key': "FRUR"},
        'Names': [''],
        'Coords': {'Lat': {'min': 6293247, 'max': 6349886}, 'Lon': {'min': -13625920, 'max': -13510906}}
      },
      'FRPR': {
        'Form':{'Title': "Pitt River",'Order': 7, 'Key': "FRPR"},
        'Names': [''],
        'Coords':{'Lat':{'min':6312424,'max':6352933},'Lon':{'min':-13669210,'max':-13633754}}
      }
    }
  },

  "VH": {
    'Form':{'Title':'Vancouver Harbour, BC', 'Order':1},
    'Coords':{'Lat':{'min':6283000,'max':6319590},'Lon':{'min':-13730400,'max':-13669354}},
    'Sections':{ 
      'PMV': {
        'Form':{'Title': "Burrard Inlet",'Order':0, 'Key': "PMV"},
        'Names': ['1st Narrows', '2nd Narrows', 'Port Moody'],
        'Coords':{'Lat':{'min':6283000,'max':6319590},'Lon':{'min':-13730400,'max':-13669354}}
        },
      'PMV-FC': {
        'Form':{'Title': "False Creek",'Order': 1, 'Key': "PMV-FC"},
        'Names': [''],
        'Coords':{'Lat':{'min':6283000,'max':6319590},'Lon':{'min':-13730400,'max':-13669354}}
      },
      'PMV-BI': {
        'Form':{'Title': "Burrard Inlet - Terminals",'Order': 2, 'Key': "PMV-BI"},
        'Names': [''],
        'Coords':{'Lat':{'min':6283000,'max':6319590},'Lon':{'min':-13730400,'max':-13669354}}
      },
      'PMV-DP': {
        'Form':{'Title': "Delta Port",'Order': 3, 'Key': "PMV-DP"},
        'Names': ['Approach Channel and Berths'],
      'Coords':{'Lat':{'min':6283000,'max':6319590},'Lon':{'min':-13730400,'max':-13669354}}
      },
      'PMV-FSD': {
        'Form':{'Title': "Fraser Surrey Docks",'Order': 4, 'Key': "PMV-FSD"},
        'Names': ['Approach Channel and Berths'],
      'Coords': {'Lat': {'min': 6287000, 'max': 6317590}, 'Lon': {'min': -13730400, 'max': -13669354}}
      }
    }
  },
  
  "CWC": {
    'Form':{'Title':'Coastal Waterway, BC', 'Order':2},
    'Coords':{'Lat':{'min':6197437,'max':7470050},'Lon':{'min':-15055722,'max':-12980383}},
    'Sections':{ 
      'CWC1': {
      'Form':{'Title': "Campbell River",'Order':0, 'Key': "CWC1"},
      'Names': [''],
      'Coords':{'Lat':{'min':6448024,'max':6457036},'Lon':{'min':-13948839,'max':-13939513}}
      },
       'CWC2': {
        'Form':{'Title': "Courtenay River",'Order':1, 'Key': "CWC2"},
        'Names': [''],
        'Coords':{'Lat':{'min':6386746,'max':6394750},'Lon':{'min':-13918066,'max':-13902404}}
        },
       'CWC3': {
        'Form':{'Title': "Squamish",'Order':2, 'Key': "CWC3"},
        'Names': [''],
        'Coords':{'Lat':{'min':6389408,'max':6397810},'Lon':{'min':-13712876,'max':-13706003}}
        },
       'CWC4': {
        'Form':{'Title': "Nanaimo",'Order':3, 'Key': "CWC4"},
        'Names': [''],
        'Coords':{'Lat':{'min':6300184,'max':6310614},'Lon':{'min':-13801517,'max':-13790703}}
        },
       'CWC5': {
        'Form':{'Title': "Prince Rupert",'Order':4, 'Key': "CWC5"},
        'Names': [''],
        'Coords':{'Lat':{'min':7194359,'max':7240989},'Lon':{'min':-14539724,'max':-14494798}}
        },
       'CWC6': {
        'Form':{'Title': "Tofino Harbour",'Order':5, 'Key': "CWC6"},
        'Names': [''],
        'Coords':{'Lat':{'min':6264828,'max':6309876},'Lon':{'min':-14040703,'max':-13969259}}
        },
       'CWC7': {
        'Form':{'Title': "French Creek",'Order':6, 'Key': "CWC7"},
        'Names': [''],
        'Coords':{'Lat':{'min':6329755,'max':6341821},'Lon':{'min':-13856419,'max':-13835752}}
        },
       'CWC8': {
        'Form':{'Title': "Queen Charlotte Islands",'Order':7, 'Key': "CWC8"},
        'Names': [''],
        'Coords':{'Lat':{'min':6978612,'max':7082344},'Lon':{'min':-14760436,'max':-14677682}}
      }
    }
  }
  /*
  
  ,
    "WCS": {
    'Form':{'Title':'Waterway Control Structures', 'Order':3},
    'Coords':{'Lat':{'min':6287000,'max':6352933},'Lon':{'min':-13730400,'max':-13510906}},
    'Sections':{
      'FRMA': {
        'Form': {'Title': "Fraser - Main Arm", 'Order': 2, 'Key': "FRMA"},
        'Names': ['Sapperton Wingdams 2 & 3', 'Sapperton V-Dyke'],
        'Coords': {'Lat': {'min': 6290650, 'max': 6315727}, 'Lon': {'min': -13685417, 'max': -13610377}},
        'pwl': {'key': 'Main Arm'}
      },
      'FRSA': {
        'Form': {'Title': "Fraser - South Arm", 'Order': 1, 'Key': "FRSA"},
        'Names': ['Steveston North Jetty', 'Steveston South Jetty No. 2', 'Albion Dyke No. 2', 'Steveston Island Wingdams  No. 2 & 3', 'Steveston Island Shearboom', 'Woodward Island Training Wall', 'Deas & Kirkland Island Bank Protection', 'Trifurcation Phase I Training Wall', 'Trifurcation Phase II Training Wall', 'Trifurcation Phase III Training Wall'],
        'Coords': {'Lat': {'min': 6287000, 'max': 6317590}, 'Lon': {'min': -13730400, 'max': -13669354}},
        'pwl': {'key': "South Arm"}
      },
      'FRNA': {
        'Form': {'Title': "Fraser - North Arm", 'Order': 0, 'Key': "FRNA"},
        'Names': ['North Arm', 'North Arm Jetty'],
        'Coords': {'Lat': {'min': 6302401, 'max': 6318147}, 'Lon': {'min': -13724567, 'max': -13679776}},
        'pwl': {'key': "North Arm"}
      },
      'FRUR': {
        'Form': {'Title': "Fraser - Mission to Hope", 'Order': 3, 'Key': "FRUR"},
        'Names': ['Big & Middle Eddy Groyne'],
        'Coords': {'Lat': {'min': 6293247, 'max': 6349886}, 'Lon': {'min': -13625920, 'max': -13510906}}
      },
	  'HR': {
      'Form':{'Title': "Harrison River, BC",'Order':4, 'Key': "HR"},
      'Names': ['Harrison Mills (CPR Bridge) Shearboom', 'Harrison River Dykes V, R, W, P', 'Harrison Hwy No.7 Bridge Shearboom', 'Harrison Rapids Shearboom'],
      'Coords':{'Lat':{'min':6312424,'max':6352933},'Lon':{'min':-13669210,'max':-13633754}}
	  }
    }
  }  
  ,
    
    'SQ': {
      'Form':{'Title': "Squamish, BC",'Order':7},
      'Names': {'Main': ['Mamquam Blind Channel'],'Secondary': [],'Other': []},
      'Coords':{'Lat':{'min':6389408,'max':6397810},'Lon':{'min':-13712876,'max':-13706003}}
    },
    
    'FPORT': {
      'Form':{'Title': "Fraser Surrey Docks",'Order':9},
      'Names': {'Main': [],'Secondary': [],'Other': []},
      'Coords':{'Lat':{'min':6305047,'max':6308238},'Lon':{'min':-13684111,'max':-13680844}}
    }*/
  },

  avaPages:{
    'acv':{
      'title_e': "Animated Currents and Velocities",
      'title_f': "Animation et vélocités du courant",
      'mapInitState':true,
      'hasParameters':true,
      'hasAnimate':true,
      'longReport':false,
      'landscapeReport':false,
      'formParam':[
        {tag:'div',attr:{className:'span-3'},child:[
          {tag:'label',attr:{htmlFor:'date'},child:["Date :"]},
          {tag:'input',attr:{id:'date',type:'text',name:'date',className:'datepicker'}},
          {tag:'input',attr:{id:'alt-date',type:'hidden'}},
          {tag:'br'},
          {tag:'strong',child:["Débit fluvial à Hope :"]},
          {tag:'br'},
          {tag:'input',attr:{id:'actual_radio',type:'radio',name:'discharge',disabled:'true',value:'Actual'}},
          {tag:'label',attr:{htmlFor:'actual_radio',style:'font-weight:normal'},child:[
            "Réel (",
            {tag:'span',attr:{id:'actual_discharge'}},
            "m\u00B3/s)"
          ]},
          {tag:'br'},
          {tag:'input',attr:{id:'discharge_radio',type:'radio',name:'discharge',value:'Selected'}},
          {tag:'label',attr:{htmlFor:'discharge_radio',style:'font-weight:normal'},child:["Choisi"]},
          {tag:'select',attr:{id:'selected_discharge'}},
          " m\u00B3/s",
          {tag:'br'},
          {tag:'input',attr:{id:'defined_radio',type:'radio',name:'discharge',value:'Defined'}},
          {tag:'label',attr:{htmlFor:'defined_radio',style:'font-weight:normal'},child:["Défini par l’utilisateur"]},
          {tag:'input',attr:{id:'defined_discharge',type:'text',name:'discharge',style:'width:60px'}},
          " m\u00B3/s",
          {tag:'input',attr:{type:'hidden',name:'flowRate',id:'flowRate',value:'0'}},
          {tag:'input',attr:{type:'hidden',name:'flowType',id:'flowType',value:'0'}},
          {tag:'label',attr:{htmlFor:'static_rd'},child:["Type d’affichage :"]},
          {tag:'input',attr:{type:'radio',name:'type',id:'static_rd',value:0}},
          "Image statique",
          {tag:'br'},
          {tag:'input',attr:{type:'radio',name:'type',id:'animated_rd',value:1}},
          "Séries animées",
          {tag:'div',attr:{className:'clear'}},
          {tag:'div',attr:{className:'inline-block'},child:[
            {tag:'label',attr:{htmlFor:'from'},child:["De :"]},
            {tag:'select',attr:{name:'from',id:'from'},ref:{tag:'option',values:function(){
              var res=[];
              for(var i=0.00;i<24;i=i+0.25){
                var hr=parseInt(i);
                res.push({key:i,value:(hr)+":"+padZero((i-hr)*60)});
                if (i==17){
                  res[res.length-1].select="selected";
                }
              }
              return res;
            }}}
          ]},
          {tag:'div',attr:{id:'to_params',className:'inline-block',style:'display:none'},child:[
            {tag:'label',attr:{htmlFor:'to'},child:["To:"]},
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
              {tag:'label',attr:{htmlFor:'interval'},child:["Intervalle :"]},
              {tag:'select',attr:{name:'interval',id:'interval'},ref:{tag:'option',values:[
                {key:4,value:'4 hr'},
                {key:2,value:'2 hr'},
                {key:1,value:'1 hr',select:'selected'},
                {key:0.5,value:'30 min.'},
                {key:0.25,value:'15 min.'}
              ]}}
            ]}
          ]},
		   {tag:'div',child:[
            {tag:'div',attr:{className:'inline-block',style:'margin:0 0 0 0'},child:[
              {tag:'label',attr:{htmlFor:'zone'},child:["Zone:"]},
			  {tag:'input',attr:{type:'text',name:'zone',id:'zone',value:'',readonly:'readonly',style:'width:60px'}}
            ]}
          ]},
          {tag:'label',attr:{htmlFor:'legend_scale'},child:["Légende de la vélocité"]},
          {tag:'input',attr:{id:'zero_to_two',type:'radio',name:'legend_scale',value:0,checked:'checked'}},
          {tag:'label',attr:{htmlFor:'zero_to_two',style:'font-weight:norma'},child:["0 à 2 m/s (Intervalle 0,25 ms)"]},
          {tag:'br'},
          {tag:'input',attr:{id:'zero_to_four',type:'radio',name:'legend_scale',className:'rd_actual',value:1}},
          {tag:'label',attr:{htmlFor:'zero_to_four',style:'font-weight:normal'},child:["0 à 4 m/s (Intervalle 0,5 ms)"]}
        ]}
      ],
      'reportBody':[
        {tag:'div',child:[
          {tag:'div',attr:{id:'loading',style:'padding:1em 1em;display:none'},child:[
            {tag:'div',attr:{style:'width: 35px;height: 30px; float: left;'}},
            "Processing... ",
            {tag:'span',attr:{id:'frame_count'},child:[
              "(Frames retrieved: ",
              {tag:'span',attr:{id:'frames_retrieved'}},
              " / ",
              {tag:'span',attr:{id:'number_of_frames'}},
              ")"
            ]}
          ]},
          {tag:'div',attr:{id:'nodata',style:'padding:1em 1em;display:none'},child:["No images were found"]},
          {tag:'div',attr:{style:'width: 100%; margin-auto; text-align: center'},child:[
            {tag:'img',attr:{id:'animated',src:'images/nodata.jpg',style:'width:550px;height:550px;display:block'}},
            {tag:'img',attr:{id:'animated_legend',src:'images/nodata.jpg',style:'width: 325px; height: 67px; display: block;'}}
          ]}
        ]}
      ],
      'reportDetail':[]
    },
    'dd': {
      'title_e': "Available Depth Report for Fraser River South Arm",
      'title_f': "Rapport sur les profondeurs disponibles",
      'mapInitState':false,
      'hasParameters':true,
      'hasAnimate':false,
      'longReport':false,
      'landscapeReport':false,
      'formParam': [
        {tag:'div',attr:{className:'span-4'},child:[
          {tag:'label',attr:{htmlFor:'date'},child:['Date :']},
          {tag:'input',attr:{id:'date',type:'text',name:'date',className:'datepicker',value:function(){
			var now = new Date();
			var strDate = now.getFullYear() + '-' + (now.getMonth()+1) + '-' + now.getDate();
            return strDate;
          }}},
          {tag:'div',child:[
            {tag:'strong',child:['Débit fluvial à Hope :']},
            {tag:'br'},
            {tag:'input',attr:{id:'actual_radio',type:'radio',name:'discharge',disabled:'true',className:'rd_actual',value:'Actual'}},
            {tag:'label',attr:{htmlFor:'actual_radio',style:'font-weight:normal'},child:[
              "Réel (",
              {tag:'span',attr:{id:'actual_discharge'},child:["0"]},
              "m\u00B3/s)"
            ]},
            {tag:'br'},
            {tag:'input',attr:{id:"selected_radio",type:'radio',name:'discharge',value:'Selected'}},
            {tag:'label',attr:{htmlFor:'discharge_radio',style:'font-weight:normal'},child:["Choisi"]},
            {tag:'select',attr:{id:'selected_discharge'}},
            " m\u00B3/s",
            {tag:'br'},
            {tag:'input',attr:{id:'defined_radio',type:'radio',name:'discharge',value:'Discharge'}},
            {tag:'label',attr:{htmlFor:'defined_radio',style:'font-weight:normal'},child:["Défini par l’utilisateur"]},
            {tag:'input',attr:{id:'defined_discharge',type:'text',name:'defined_discharge',style:'width:5em'}},
            " m\u00B3/s",
            {tag:'input',attr:{type:'hidden',name:'flowRate',id:'flowRate',value:"0"}},
            {tag:'input',attr:{type:'hidden',name:'flowType',id:'flowType',value:'0'}}
          ]}
        ]},
        {tag:'div',attr:{className:'span-4'},child:[
          {tag:'label',attr:{htmlFor:'chainage'},child:[{tag:'strong',child:['Chaînage :']}]},
          "1 à ",
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
          {tag:'label',attr:{htmlFor:'condition'},child:[{tag:'strong',child:["Condition du chenal :"]}]},
          {tag:'input',attr:{id:'condition',type:'radio',name:'condition',checked:'checked',value:'0'}},
          " ",
          {tag:'span',child:["Profondeur actuelle sondée"]},
          {tag:'br'},
          {tag:'input',attr:{type:'radio',name:'condition',value:'1'}},
          " ",
          {tag:'span',child:["Pente d’origine"]}
        ]},
        {tag:'div',child:[
          {tag:'label',attr:{htmlFor:'channel'},child:[{tag:'strong',child:["Chenal de navigation :"]}]},
          {tag:'input',attr:{type:'radio',id:'inner_channel',name:'channel',checked:'checked',value:'0'}},
          " Limite intérieure",
          {tag:'input',attr:{type:'radio',id:'outter_channel',name:'channel',value:'1'}},
          " Limite extérieure"
        ]}
      ]},
      {tag:'div',attr:{className:'span-3'},child:[
        {tag:'div',child:[
          {tag:'label',attr:{htmlFor:'width'},child:["Largeur disponible :"]},
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
        {tag:'div',attr:{style:'width:60%;margin:0 auto;'},child:[
          {tag:'div',attr:{className:'span-7'},child:[
            {tag:'table',attr:{id:'depths',style:"text-align:center"},child:[
              {tag:'thead',child:[
                {tag:'tr',child:[
                  {tag:'th',attr:{className:'verify'},child:["Heure (HNP)"]},
                  {tag:'th',child:["Chaînage (km)"]},
                  {tag:'th',child:["Profondeur disponible (m)"]},
                  {tag:'th',child:["Emplacement"]}
                ]}
              ]},
              {tag:'tbody'}
            ]}
          ]},
          {tag:'div',attr:{id:'depth_chart',className:'demo-placeholder span-6'}}
        ]}
      ],
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
              {tag:'tr',child:[
                {tag:'td',attr:{style:'padding: 2px;'},child:[
                  {tag:'span',child:[
                    "Navigation Channel: Fraser River - ",
                    {tag:'span',attr:{id:'static-limit'}}
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
                {tag:'td',attr:{style:'padding: 2px; '},child:[
                  {tag:'p',attr:{style:'margin:0;'},child:[
                    "Hope Discharge ",
                    {tag:'span',attr:{id:'static-discharge'}},
                    "m\u00B3/s (",
                    {tag:'span',attr:{id:'static-discharge-eval'},child:["Predicted"]},
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
                  {tag:'th',child:['Emplacement']},
                  {tag:'th',child:['Pente d’origine']},
                  {tag:'th',child:['Profondeur minimum sondée']},
                  {tag:'th',attr:{colspan:'2'},child:['Largeur disponible']},
                  {tag:'th',child:['Tidal Aid']},
                  {tag:'th',child:['Profondeur']}
                ]},
                {tag:'tr',attr:{style:'background-color: #EEEEEE;'},child:[
                  {tag:'th',child:['(km)']},
                  {tag:'th',child:['(m)']},
                  {tag:'th',child:['(m)']},
                  {tag:'th',child:['(m)']},
                  {tag:'th',child:['%']},
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
      'title_e':"Transit Window Report",
      'title_f':"Fenêtre de circulation",
      'mapInitState':false,
      'hasParameters':true,
      'hasAnimate':false,
      'longReport':false,
      'landscapeReport':false,
      'formParam':[
        {tag:'div',child:[
          {tag:'div',attr:{className:'span-4'},child:[
            {tag:'label',attr:{htmlFor:'date'},child:[
              {tag:'strong',child:["Date :"]}
            ]},
            {tag:'input',attr:{id:'date',type:'text',name:'date',className:'datepicker'}},
            {tag:'div',child:[
              {tag:'strong',child:["Débit fluvial :"]},
              {tag:'br'},
              {tag:'input',attr:{id:'actual_radio',type:'radio',name:'discharge',value:'Actual'}},
              {tag:'label',attr:{htmlFor:'actual_radio'},child:[
                "Réel (",
                {tag:'span',attr:{id:'actual_discharge'}},
                "m\u00B3/s)"
              ]},
              {tag:'br'},
              {tag:'input',attr:{id:'selected_radio',type:'radio',name:'discharge',value:'Selected'}},
              {tag:'label',attr:{htmlFor:'selected_radio'},child:['Choisi']},
              {tag:'select',attr:{id:'selected_discharge'}},
              " m\u00B3/s",
              {tag:'br'},
              {tag:'input',attr:{id:'defined_radio',type:'radio',name:'discharge',value:'Defined'}},
              {tag:'label',attr:{htmlFor:'defined_radio'},child:['Défini par l’utilisateur']},
              {tag:'input',attr:{id:'defined_discharge',type:'text',style:'width:5em'}},
              " m\u00B3/s",
              {tag:'input',attr:{type:'hidden',name:'flowRate',id:'flowRate',value:'0'}},
              {tag:'input',attr:{type:'hidden',name:'flowType',id:'flowType',value:'0'}}
            ]}
          ]},
          {tag:'div',attr:{className:'span-3'},child:[
            {tag:'label',attr:{htmlFor:'chainage'},child:[
              {tag:'strong',child:["Chaînage :"]}
            ]},
            "1 à ",
            {tag:'select',attr:{id:'chainage'},ref:{tag:'option',values:function(){
              var s=[];
              for(var i=6;i<35;i++){
                s.push({key:i,value:i});
              }
              s.push({key:35,value:35,select:true});
              return s
            }}},
            {tag:'div',child:[
              {tag:'label',attr:{htmlFor:"sounding"},child:[{tag:'strong',child:["Condition du chenal :"]}]},
              {tag:'input',attr:{type:'radio',name:'sounding',checked:'checked',value:'0'}},
              " ",
              {tag:'span',child:["Profondeur actuelle sondée"]},
              {tag:'br'},
              {tag:'input',attr:{type:'radio',name:'sounding',value:'1'}},
              " ",
              {tag:'span',child:["Pente d’origine"]}
            ]},
            {tag:'div',child:[
              {tag:'label',attr:{htmlFor:'channel'},child:[{tag:'strong',child:["Chenal de navigation :"]}]},
              {tag:'input',attr:{type:'radio',id:'channel',name:'channel',checked:'checked',value:'1'}},
              " ",
              {tag:'span',attr:{style:'margin-right:1em'},child:["Limite intérieure"]},
              {tag:'input',attr:{type:'radio',name:'channel',value:'2'}},
              " ",
              {tag:'span',child:["Limite extérieure"]}
            ]},
            {tag:'div',child:[
              {tag:'label',attr:{htmlFor:'width',style:"display:inline-block;"},child:["Largeur disponible :"]},
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
            ]}
          ]},
          {tag:'div',attr:{className:'span-4'},child:[
            {tag:'div',child:[
              {tag:'label',attr:{htmlFor:'channel'},child:[{tag:'strong',child:["Calcul de la circulation :"]}]},
              {tag:'div',child:[
                {tag:'label',attr:{htmlFor:'period',style:'display:inline'},child:["Période :"]},
                {tag:'select',attr:{id:'period'},ref:{tag:'option',values:[{key:0,value:"Day"},{key:1,value:'Week'},{key:2,value:'Month'}]}}
              ]},
              {tag:'div',child:[
                {tag:'input',attr:{id:'window',type:'hidden',name:'window',value:2}},
                {tag:'input',attr:{id:'cmp',type:'hidden',name:'cmp',value:0}},
                {tag:'br'},
                {tag:'input',attr:{id:'max_depth_radio',type:'radio',name:'window_radio',checked:'checked',value:'Maximum Depth'}},
                {tag:'label',attr:{htmlFor:'max_depth_radio',style:'margin-bottom:0'},child:['Profondeur maximum :']},
                {tag:'br'},
                {tag:'label',attr:{style:'display:inline-block;margin-left:30px'},child:["Fenêtre minimum :"]},
                {tag:'select',attr:{id:'minimum_window',name:'minimum_window',style:'display:inline-block'},ref:{tag:'option',values:[{key:1,value:'1hr'},{key:2,value:'2hrs',select:true},{key:3,value:'3hrs'},{key:4,value:'4hrs'}]}},
                {tag:'br'},
                {tag:'input',attr:{id:'min_win_radio',type:'radio',name:'window_radio',value:'Min Window'}},
                {tag:'label',attr:{htmlFor:'min_win_radio',style:'margin-bottom:0'},child:["Fenêtres disponibles :"]},
                {tag:'br'},
                {tag:'label',attr:{style:'display:inline-block;margin-left:30px'},child:["Profondeur :"]},
                {tag:'input',attr:{id:'depth',type:'text',name:'depth',value:10,style:"width:3em;diplay:inline-block"}},
                " ",
                {tag:'span',attr:{style:'margin: 0px 0 0 0; padding: 0 0 0 0;'},child:["m"]}
              ]}
            ]}
          ]}
        ]}
      ],
      'reportBody':[
        {tag:'div',child:[
          {tag:'div',child:[
            {tag:'table',attr:{id:'maximum_depth_table',className:'print-width-70',style:'width:75%;margin:0 auto;'},child:[
              {tag:'tr',child:[
                {tag:'td',child:[
                  "Navigation Channel: Fraser River - ",
                  {tag:'span',attr:{id:'static-channel'},child:['Inner Channel Limit']}
                ]}
              ]},
              {tag:'tr',child:[
                {tag:'td',child:[
                  "Channel Condition: ",
                  {tag:'span',attr:{id:'static-sounding'},child:["Current Soundings"]},
                  " for Km 1 to Km ",
                  {tag:'span',attr:{id:'static-chainage'},child:["35"]},
                  " at ",
                  {tag:'span',attr:{id:'static-width'},child:["100"]},
                  "% Available Width"
                ]}
              ]},
              {tag:'tr',child:[
                {tag:'td',child:[
                  "Hope Discharge: ",
                  {tag:'span',attr:{id:'static-discharge'}},
                  " m\u00B3/s (",
                  {tag:'span',attr:{id:'static-discharge-eval'},child:["Predicted"]},
                  ")"
                ]}
              ]}
            ]},
            {tag:'table',attr:{id:'header_table',style:'width:75%;margin:5px auto'}}
          ]},
          {tag:'div',attr:{className:'clear'}},
          {tag:'section',attr:{style:'padding-top: 20px;margin:1em auto;width:75%'},child:[
            {tag:'table',attr:{id:'transit-window',className:'zebra-striped'},child:[
              {tag:'thead',child:[
                {tag:'tr',child:[
                  {tag:'th',attr:{colspan:2},child:["From"]},
                  {tag:'th',attr:{colspan:2},child:["To"]},
                  {tag:'th',child:["&nbsp;"]}
                ]},
                {tag:'tr',child:[
                  {tag:'th',child:["Date"]},
                  {tag:'th',child:["Time (PST)"]},
                  {tag:'th',child:["Date"]},
                  {tag:'th',child:["Time (PST)"]},
                  {tag:'th',attr:{id:'transit-window-last-col'},child:["Maximum Depth (m)"]}
                ]}
              ]},
              {tag:'tbody',child:[
                {tag:'tr',child:[{tag:'td',child:[0]},{tag:'td',child:[0]},{tag:'td',child:[0]},{tag:'td',child:[0]},{tag:'td',child:[0]}]}
              ]}
            ]},
            {tag:'div',attr:{style:'text-align:left;margin-top:1em'},child:["* Depths are relative to local low water level"]}
          ]}
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
            {tag:'label',attr:{htmlFor:'pwl_date'},child:['Date :']},
            {tag:'input',attr:{id:'pwl_date',type:'text',name:'pwl_date',className:'datepicker'}},
            {tag:'input',attr:{id:'alt-date',type:'hidden'}}
          ]},
          {tag:'div',child:[
            {tag:'label',attr:{htmlFor:'fraser_river'},child:['Fleuve Fraser :']},
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
          {tag:'strong',child:['Débit fluvial à Hope :']},
          {tag:'br'},
          {tag:'input',attr:{id:'actual_radio',type:'radio',name:'discharge',className:'rd_actual',value:'Actual',disabled:'true'}},
          {tag:'label',attr:{htmlFor:'actual_radio',style:'font-weight:normal'},child:[
            "Réel (",
            {tag:'span',attr:{id:'actual_discharge'}},
            "m\u00B3/s)"
          ]},
          {tag:'br'},
          {tag:'input',attr:{id:'discharge_radio',type:'radio',name:'discharge',value:'Selected'}},
          {tag:'label',attr:{htmlFor:'discharge_radio','style':'font-weight:normal'},child:["Choisi "]},
          {tag:'select',attr:{id:'selected_discharge'}},
          "m\u00B3/s",
          {tag:'br'},
          {tag:'input',attr:{id:'defined_radio',type:'radio',name:'discharge',value:'Defined'}},
          {tag:'label',attr:{htmlFor:'defined_radio','style':'font-weight:normal'},child:['Défini par l’utilisateur ']},
          {tag:'input',attr:{id:'defined_discharge',type:'text',name:'discharge',style:'width:5em'}},
          {tag:'input',attr:{type:'hidden',name:'flowRate',id:'flowRate',value:'0'}},
          {tag:'input',attr:{type:'hidden',name:'flowType',id:'flowType',value:'0'}},
          {tag:'div',child:[
            {tag:'label',attr:{htmlFor:'interval'},child:['Intervalle :']},
            {tag:'select',attr:{id:'interval'},ref:{tag:'option',values:[
              {key:'15',value:'15 Minute'},
              {key:'30',value:'30 Minute'},
              {key:'60',value:'1 Hour','select':true},
              {key:'120',value:'2 hour'}
            ]}}
          ]},
          {tag:'div',child:[
            {tag:'label',attr:{htmlFor:'report'},child:['Report:']},
            {tag:'input',attr:{id:'report',type:'radio',name:'report',checked:'checked',value:'0'}},
            " Niveaux d’eau",
            {tag:'input',attr:{id:'report',type:'radio',name:'report',value:'1'}},
            " Vélocités"
          ]}
        ],
      'reportBody':
        [{tag:"div",child:[
          {tag:'div',attr:{className:'span-12'},child:[
            {tag:'section',attr:{'style':'padding:20px'},child:[
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
            {tag:'ul',child:[
              {tag:'li',attr:{style:'text-align:left'},child:[
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
              {tag:'h2',child:[
                "Fraser River - ",
                {tag:'span',attr:{id:'det_river-section'}},
                " At ",
                {tag:'span',attr:{id:'det_km_time'}},
                {tag:'span',attr:{id:'det_km_time-suff'}}
              ]},
              {tag:'p',child:[
                {tag:'span',attr:{id:'det_static-date'}},
                " at ",
                {tag:'span',attr:{id:'det_static_interval'},child:["1 hour"]},
                " intervals",
                {tag:'br'},
                "Fraser River - ",
                {tag:'span',attr:{id:'det_static-arm'},child:['South Arm']},
                {tag:'br'},
                "Hope Discharge ",
                {tag:'span',attr:{id:'det_static-discharge'}},
                "m\u00B3/s (",
                {tag:'span',attr:{id:'det_static-discharge-eval'},child:['Predicted']},
                ')'
              ]},
              {tag:'div',attr:{id:'det_placeholder',className:'demo-placeholder',style:'height:450px;width:100%;'}}
            ]}
          ]}
        ]
    },
    'frh':{
      'title_e':"Fraser River Hydrograph",
      'title_f':"Hydrographie du fleuve Fraser",
      'mapInitState':false,
      'hasParameters':true,
      'hasAnimate':false,
      'longReport':false,
      'landscapeReport':true,
      'formParam':[
        {tag:'div',child:[
          {tag:'label',attr:{htmlFor:'date'},child:["Date:"]},
          {tag:'input',attr:{id:'date',type:'text',name:'date',className:'datepicker'}},
          {tag:'input',attr:{id:'alt-date',type:'hidden'}},
          {tag:'label',attr:{htmlFor:'period'},child:["Period:"]},
          {tag:'select',attr:{id:'period'},ref:{tag:'option',values:[{key:3,value:"12 Months"},{key:2,value:'6 Months'},{key:1,value:'2 Months'},{key:0,value:'1 Month'}]}},
          {tag:'label',attr:{htmlFor:'plot'},child:["Plot:"]},
          {tag:'input',attr:{id:'actual',type:'checkbox',name:'actual',checked:'checked'}},
          " Actual",
          {tag:'br'},
          {tag:'input',attr:{id:'predicted',type:'checkbox',name:'predicted',checked:'checked'}},
          " Predicted",
          {tag:'br'}
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
      'title_e':"Current Channel Conditions for Fraser River South Arm",
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
            {tag:'table',attr:{className:'align-center print-align-center print-margin-0',style:'table-layout: fixed; margin: 0 auto; width: 800px;'},child:[
              {tag:'tr',child:[
                {tag:'td',attr:{className:'align-left'},child:["Remarque : Toutes les profondeurs et tous les sondages sont relatifs au niveau d’eau basse local."]}
              ]},
              {tag:'tr',child:[
                {tag:'td',attr:{className:'align-left'},child:[
                  "Les profondeurs de sondage minimums en surbrillance ",
                  {tag:'span',attr:{style:'color: red;'},child:["ROUGE"]},
                  ", marquées d’un * dénotent les bas fonds et les hauts fonds à l’intérieur des limites du chenal de navigation."
                ]}
              ]}
            ]}
          ]},
          {tag:'div',attr:{className:'clear'}},
          {tag:'br'},
          {tag:'table',attr:{id:'soundings',className:'align-center print-align-center print-margin-0'},child:[
            {tag:'thead',child:[
              {tag:'tr',attr:{className:'first-row'},child:[
                {tag:'th',attr:{colspan:2,style:'background-color: white;'}},
                {tag:'th',attr:{colspan:4,style:'background-color: white;'},child:["Limite intérieure du chenal"]},
                {tag:'th',attr:{colspan:4,style:'background-color: white;'},child:["Limite extérieure du chenal"]}
              ]},
              {tag:'tr',child:[
                {tag:'th',child:["Km"]},
                {tag:'th',child:["Date du relevé"]},
                {tag:'th',child:["Pente d’origine"]},
                {tag:'th',attr:{style:'padding:0'},child:["Profondeur minimum sondée"]},
                {tag:'th',attr:{colspan:2},child:["Largeur disponible"]},
                {tag:'th',child:["Pente d’origine"]},
                {tag:'th',attr:{style:'padding:0'},child:["Profondeur minimum sondée"]},
                {tag:'th',attr:{colspan:2},child:["Largeur disponible"]}
              ]},
              {tag:'tr',child:[
                {tag:'th',attr:{colspan:2}},
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
              {tag:'h3',attr:{style:'margin:0'},child:["Fraser River Least Soundings & Available Widths"]},
              {tag:'h3',attr:{id:'heading-chainage',style:"margin:0"},child:[
                {tag:'span',attr:{id:'heading'}},
                {tag:'span',attr:{className:'print_show_inline'},child:[" - "]},
                {tag:'span',attr:{id:'segment',className:'print_show_inline'},child:["Inner Channel"]}
              ]}
            ]},
            {tag:'table',attr:{id:'survey-header',className:'styled align-center',style:'table-layout: fixed; margin-left: auto; margin-right: auto; width: 550px;'},child:[
              {tag:'tr',child:[
                {tag:'td',child:["Note:  All soundings / depths are relative to local low water level"]}
              ]},
              {tag:'tr',child:[
                {tag:'td',child:[
                  "Users will need to download an Autodesk DWF viewer to view and display the Reference Plan. ",
                  {tag:'a',attr:{href:'http://usa.autodesk.com/design-review/'},child:['Download Autodesk viewer']}
                ]}
              ]}
            ]},
            {tag:'div',attr:{className:'print_hide'},child:[
              {tag:'strong',child:['Channel Select']},
              {tag:'br'},
              {tag:'input',attr:{id:'inner_select',type:'radio',name:'channel_select',style:'display:inline',checked:'checked',value:'1'}},
              {tag:'label',attr:{htmlFor:'inner_select',style:'display:inline'},child:["Inner Channel"]},
              "  ",
              {tag:'input',attr:{id:'outer_select',type:'radio',name:'channel_select',style:'display:inline',value:'2'}},
              {tag:'label',attr:{htmlFor:'outer_select',style:'display:inline'},child:["Outer Channel"]},
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
          {tag:'label',attr:{htmlFor:'sdb_waterway'},child:['Voie navigable&nbsp;:']},
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
          {tag:'label',attr:{htmlFor:'channel'},child:['Chenal&nbsp;:']},
          {tag:'select',attr:{id:'channel'}},
          {tag:'label',attr:{htmlFor:'location'},child:['Emplacement&nbsp;:']},
          {tag:'select',attr:{id:'location'}},
          {tag:'label',attr:{htmlFor:'type'},child:['Type&nbsp;:']},
          {tag:'div',child:[
            {tag:'select',attr:{id:'type',name:'type'},ref:{tag:'option',values:
              function() {
                var res = [];
                var oArr = ["", "Composite", "Annual", "Monitor", "Recon", "Investigation", "Dredging", "Structure", "Photograph"];
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
          {tag:'section',attr:{'style':'padding:20px;'},child:[
            {tag:'table',attr:{id:'report_tbl',className:"styled width-80"},child:[
              {tag:'thead',child:[
                {tag:'tr',child:[
                  {tag:'th',child:['Date']},
                  {tag:'th',child:['Dessins']},
                  {tag:'th',child:['Emplacement (km)']},
                  {tag:'th',child:['Type']},
                  {tag:'th',child:['Km début']},
                  {tag:'th',child:['Km fin']}
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