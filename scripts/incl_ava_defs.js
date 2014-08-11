/**
 * Created by wsiddall on 14/07/2014.
 */
incl_ava_defs={

  locDefs: {
    'BR': {
      'Form':{'Title': "Campbell River, BC",'Order':5},
      'Names': {'Main': ['Marina', 'Channel'],'Secondary': [],'Other': []},
      'Coords':{'Lat':{'min':6450273,'max':6458623},'Lon':{'min':-13948221,'max':-13941007}}
    },
    'CR': {
      'Form':{'Title': "Courtenay River, BC",'Order':6},
      'Names': {'Main': ['Channel'],'Secondary': [],'Other': []},
      'Coords':{'Lat':{'min':6386978,'max':6394557},'Lon':{'min':-13918640,'max':-13904727}}
    },
    'FRMA': {
      'Form':{'Title': "Fraser - Main Arm",'Order':2},
      'Names': {'Main': ['Channel km35to61', 'Channel km60to85', 'Annieville Channel', 'Queens Reach', 'Douglas Island', 'Bishops Reach', 'Derby Reach', 'Russel Reach', 'Langley Bar', 'Plumper Reach', 'Matsqui Island', 'Gravel Reach'], 'Secondary': ['Sapperton Channel', 'Essondale Channel', 'Douglas Island North', 'Parsons Channel', 'Bedford Channel', 'Enterprise Channel'],'Other': []},
      'Coords': {'Lat': {'min':6290650,'max':6315727},'Lon':{'min':-13685417,'max':-13610377}},
      'pwl':{'key':'Main Arm'}
    },
    'FRSA': {
      'Form':{'Title': "Fraser - South Arm",'Order':0},
      'Names': {'Main': ['Channel', 'Sand Heads Entrance', 'Sand Heads Reach', 'Steveston Bend', 'Steveston Cut', 'Woodward Reach', 'Gravesend Reach', 'City Reach', 'Annieville Channel', 'Shoal Point - New  West'],'Secondary': ['Ladner_SeaReach', 'Cannery Channel', 'Sea Reach', 'Canoe Pass', 'Ladner Reach', 'Ladner Harbour', 'Deas Slough', 'Burr Landing Channel', 'Gundersen Slough', 'Annacis Channel', 'Roberts Bank'],'Other': []},
      'Coords':{'Lat': {'min':6287000,'max':6317590},'Lon':{'min':-13730400,'max':-13669354}},
      'pwl':{'key':"South Arm"}
    },
    'FRNA': {
      'Form':{'Title': "Fraser - North Arm",'Order':1},
      'Names': {'Main': ['Channel', 'Point Grey', 'Iona', 'Musqueam', 'Sea Island', 'Marpole Basin', 'Mitchell Island', 'Mac-Blo', 'Byrne Road', 'Big Bend - Queens', 'Poplar Island', 'Morey Channel', 'Swishwash Island South'],'Secondary': ['Cowards Cove', 'Point Grey Scow Moorage', 'MacDonald Slough', 'Deering Channel', 'Mitchell Island North', 'Tree Island'],'Other': []},
      'Coords':{'Lat':{'min':6302401,'max':6318147},'Lon':{'min':-13724567,'max':-13679776}},
      'pwl':{'key':"North Arm"}
    },
    'FRUR': {
      'Form':{'Title': "Fraser - Mission to Hope",'Order':3},
      'Names': {'Main': ['Big Eddy', 'Cattermole', 'Chilliwack Rock', 'Carey Point', 'CPR Tunnels', 'Cheam View'],'Secondary': [],'Other': []},
      'Coords':{'Lat':{'min':6293247,'max':6349886},'Lon':{'min':-13625920,'max':-13510906}}
    },
    'PR': {
      'Form':{'Title': "Pitt River",'Order':4},
      'Names': {'Main': ['Channel', 'Chatham Reach', 'Fox Reach', 'Grant Channel'],'Secondary': [],'Other': []},
      'Coords':{'Lat':{'min':6312424,'max':6352933},'Lon':{'min':-13669210,'max':-13633754}}
    },
    'SQ': {
      'Form':{'Title': "Squamish, BC",'Order':7},
      'Names': {'Main': ['Mamquam Blind Channel'],'Secondary': [],'Other': []},
      'Coords':{'Lat':{'min':6389408,'max':6397810},'Lon':{'min':-13712876,'max':-13706003}}
    },
    'PMV': {
      'Form':{'Title': "Port of Metro Vancouver",'Order':8},
      'Names': {'Main': [],'Secondary': [],'Other': []},
      'Coords':{'Lat':{'min':6283000,'max':6319590},'Lon':{'min':-13730400,'max':-13669354}}
    },
    'FPORT': {
      'Form':{'Title': "Fraser Surrey Docks",'Order':9},
      'Names': {'Main': [],'Secondary': [],'Other': []},
      'Coords':{'Lat':{'min':6305047,'max':6308238},'Lon':{'min':-13684111,'max':-13680844}}
    }
  },

  avaPages:{
    'dd': {
      'title_e': "Available Depth Report",
      'mapInitState':0,
      'formParam': [
        {tag:'div',attr:{className:'span-4'},child:[
          {tag:'label',attr:{htmlFor:'date'},child:['Date:']},
          {tag:'input',attr:{id:'date',type:'text',name:'date',className:'datepicker'}},
          {tag:'div',child:[
            {tag:'strong',child:['River Discharge @ Hope:']},
            {tag:'br'},
            {tag:'input',attr:{id:'predicted_radio',type:'radio',name:'discharge',className:'rd_predicted',value:'Predicted',checked:'checked'}},
            {tag:'label',attr:{htmlFor:'predicted_radio',style:'font-weight:normal'},child:[
              "Predicted (",
              {tag:'span',attr:{id:'predicted_discharge'},child:["0"]},
              "m\u00B3/s)"
            ]},
            {tag:'br'},
            {tag:'input',attr:{id:'actual_radio',type:'radio',name:'discharge',disabled:'true',className:'rd_actual',value:'Actual'}},
            {tag:'label',attr:{htmlFor:'actual_radio',style:'font-weight:normal'},child:[
              "Actual (",
              {tag:'span',attr:{id:'actual_discharge'},child:["0"]},
              "m\u00B3/s)"
            ]},
            {tag:'br'},
            {tag:'input',attr:{id:"selected_radio",type:'radio',name:'discharge',value:'Selected'}},
            {tag:'label',attr:{htmlFor:'discharge_radio',style:'font-weight:normal'},child:["Selected"]},
            {tag:'select',attr:{id:'selected_discharge'}},
            " m\u00B3/s",
            {tag:'br'},
            {tag:'input',attr:{id:'defined_radio',type:'radio',name:'discharge',value:'Discharge'}},
            {tag:'label',attr:{htmlFor:'defined_radio',style:'font-weight:normal'},child:["User-defined"]},
            {tag:'input',attr:{id:'defined_discharge',type:'text',name:'defined_discharge',style:'width:5em'}},
            " m\u00B3/s",
            {tag:'input',attr:{type:'hidden',name:'flowRate',id:'flowRate',value:"0"}},
            {tag:'input',attr:{type:'hidden',name:'flowType',id:'flowType',value:'0'}}
          ]}
        ]},
        {tag:'div',attr:{className:'span-4'},child:[
          {tag:'label',attr:{htmlFor:'chainage'},child:[{tag:'strong',child:['Chainage:']}]},
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
          {tag:'label',attr:{htmlFor:'condition'},child:[{tag:'strong',child:["Channel Condition:"]}]},
          {tag:'input',attr:{id:'condition',type:'radio',name:'condition',checked:'checked',value:'0'}},
          " ",
          {tag:'span',child:["Current Soundings"]},
          {tag:'br'},
          {tag:'input',attr:{type:'radio',name:'condition',value:'1'}},
          " ",
          {tag:'span',child:["Design Grade"]}
        ]},
        {tag:'div',child:[
          {tag:'label',attr:{htmlFor:'channel'},child:[{tag:'strong',child:["Navigation Channel:"]}]},
          {tag:'input',attr:{type:'radio',id:'inner_channel',name:'channel',checked:'checked',value:'0'}},
          " Inner Limit",
          {tag:'input',attr:{type:'radio',id:'outter_channel',name:'channel',value:'1'}},
          " Outer Limit"
        ]}
      ]},
      {tag:'div',attr:{className:'span-3'},child:[
        {tag:'div',child:[
          {tag:'label',attr:{htmlFor:'width'},child:["Available Width:"]},
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
          {tag:'div',attr:{className:'span-6'},child:[
            {tag:'table',attr:{id:'depths',style:"text-align:center"},child:[
              {tag:'thead',child:[
                {tag:'tr',child:[
                  {tag:'th',attr:{style:'width:5em',className:'verify'},child:["Time (pst)"]},
                  {tag:'th',attr:{style:'width:5em'},child:["Chainage (km)"]},
                  {tag:'th',attr:{style:'width:6em'},child:["Available Depth (m)"]},
                  {tag:'th',child:["Location of Control Point"]}
                ]}
              ]},
              {tag:'tbody'}
            ]}
          ]},
          {tag:'div',attr:{className:'page-break'}},
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
                  {tag:'th',child:['Location']},
                  {tag:'th',child:['Design Grade']},
                  {tag:'th',child:['Least Sounding']},
                  {tag:'th',attr:{colspan:'2'},child:['Available Width']},
                  {tag:'th',child:['Tidal Aid']},
                  {tag:'th',child:['Depth']}
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
      'title_e':"Transit Window Report"
    },
    'pwl':{
      'title_e':"Predicted Water Levels & Velocities",
      'mapInitState':1,
      'formParam':
        [
          {tag:'div',child:[
            {tag:'label',attr:{htmlFor:'pwl_date'},child:['Date:']},
            {tag:'input',attr:{id:'pwl_date',type:'text',name:'pwl_date',className:'datepicker'}},
            {tag:'input',attr:{id:'alt-date',type:'hidden'}}
          ]},
          {tag:'div',child:[
            {tag:'label',attr:{htmlFor:'fraser_river'},child:['Fraser River:']},
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
          {tag:'input',attr:{id:'predicted_radio',type:'radio',name:'discharge',className:'rd_predicted',value:'Predicted',checked:'checked'}},
          {tag:'label',attr:{htmlFor:'predicted_radio',style:'font-weight:normal'},child:[
            "Predicted (",
            {tag:'span',attr:{id:'predicted_discharge'}},
            "m\u00B3/s)"
          ]},
          {tag:'br'},
          {tag:'input',attr:{id:'actual_radio',type:'radio',name:'discharge',className:'rd_actual',value:'Actual',disabled:'true'}},
          {tag:'label',attr:{htmlFor:'actual_radio',style:'font-weight:normal'},child:[
            "Actual (",
            {tag:'span',attr:{id:'actual_discharge'}},
            "m\u00B3/s)"
          ]},
          {tag:'br'},
          {tag:'input',attr:{id:'discharge_radio',type:'radio',name:'discharge',value:'Selected'}},
          {tag:'label',attr:{htmlFor:'discharge_radio','style':'font-weight:normal'},child:["Selected"]},
          {tag:'select',attr:{id:'selected_discharge'}},
          "m\u00B3/s",
          {tag:'br'},
          {tag:'input',attr:{id:'defined_radio',type:'radio',name:'discharge',value:'Defined'}},
          {tag:'label',attr:{htmlFor:'defined_radio','style':'font-weight:normal'},child:['User Defined']},
          {tag:'input',attr:{id:'defined_discharge',type:'text',name:'discharge',style:'width:5em'}},
          {tag:'input',attr:{type:'hidden',name:'flowRate',id:'flowRate',value:'0'}},
          {tag:'input',attr:{type:'hidden',name:'flowType',id:'flowType',value:'0'}},
          {tag:'div',child:[
            {tag:'label',attr:{htmlFor:'interval'},child:['Interval:']},
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
            " Water Levels",
            {tag:'input',attr:{id:'report',type:'radio',name:'report',value:'1'}},
            " Velocities"
          ]}
        ],
      'reportBody':
        [{tag:"div",child:[
          {tag:'div',attr:{className:'span-8'},child:[
            {tag:'section',attr:{'style':'padding:20px'},child:[
              {tag:'table',attr:{id:'water-levels',className:'table-condensed align-center print-table-fixed'},child:[
                {tag:'thead',child:[
                  {tag:'tr',child:[
                    {tag:'th',attr:{rowspan:'2'},child:["Time (PST)"]},
                    {tag:'th',attr:{colspan:'21',id:'location'},child:[
                      {tag:'span',attr:{id:'river-section'}}
                    ]}
                  ]},
                  {tag:'tr',attr:{id:'headerkm'}}
                ]},
                {tag:'tbody'}
              ]}
            ]},
            {tag:'ul',child:[
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
              {tag:'div',attr:{id:'det_placeholder',className:'demo-placeholder',style:'height:500px;width:600px;float:left;'}}
            ]}
          ]}
        ]
    },
    'acv':{
      'title_e':"Animated Currents and Velocities"
    },
    'frh':{
      'title_e':"Fraser River Hydrograph"
    },
    'ccc':{
      'title_e':"Current Channel Conditions - Fraser River - South Arm"
    },
    'sdb':{
      'title_e':"Survey Drawings",
      'mapInitState':1,
      'formParam':
        [
          {tag:'label',attr:{htmlFor:'sdb_waterway'},child:['Waterway:']},
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
          {tag:'label',attr:{htmlFor:'channel'},child:['Channel:']},
          {tag:'select',attr:{id:'channel'},ref:{tag:'option',values:[{value:"Main",'select':true},{value:'Secondary'},{value:'Other'}]}},
          {tag:'label',attr:{htmlFor:'location'},child:['Location:']},
          {tag:'select',attr:{id:'location'}},
          {tag:'label',attr:{htmlFor:'type'},child:['Type:']},
          {tag:'div',child:[
            {tag:'select',attr:{id:'type',name:'type'},ref:{tag:'option',values:
              function() {
                var res = [];
                var oArr = ["", "Construction", "Annual", "Dredging", "Monitor", "Recon", "Investigation", "Structure", "Key Map", "Overview"];
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
          {tag:'section',attr:{'style':'padding:20px'},child:[
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
