//######################################################################################################## 
//#                                                                                                    #\\
//#                               PM_2.5_Explorer: A visualization web app                             #\\
//#                                                                                                    #\\
//########################################################################################################


// date: 2019-2-15
// authors: TC Chakraborty | tc.chakraborty@yale.edu
// website: https://tirthankarchakraborty.users.earthengine.app/view/pmexplorer


// Create default map for the app
var map = ui.Map()
// Set visibility options to remove geometry creator and layer list
map.setControlVisibility({all: false, layerList: false, zoomControl: true, scaleControl: true, mapTypeControl: true, fullscreenControl: false})
//map.setControlVisibility({maxZoom: 5});
ui.root.clear()
//Add custom map 
ui.root.add(map)
//Load Landscan dataset
var urb=ee.FeatureCollection('users/tirthankarchakraborty/urban_Schneider_final_paper');


//Create basemap
var GRAY = [
  {   // Dial down the map saturation. 
    stylers: [ { saturation: -100 } ]
  },{ // Dial down the label darkness.
    elementType: 'labels',
    stylers: [ { lightness: 0 } ]
  },{ // Simplify the road geometries.
    featureType: 'road',
    elementType: 'geometry',
    stylers: [ { visibility: 'simplified' } ]
  },{ // Turn off road labels.
    featureType: 'road',
    elementType: 'labels',
    stylers: [ { visibility: 'off' } ]
  },{ // Turn off all icons.
    elementType: 'labels.icon',
    stylers: [ { visibility: 'off' } ]
  },{ // Turn off all POIs.
    featureType: 'poi',
    elementType: 'all',
    stylers: [ { visibility: 'off' }]
  }
];

//Change base map
map.setOptions('Base', {'Base': GRAY});
/*Import MODIS land use and land cover data for 2013 and select the 1st land cover classification type (International Geosphere‑Biosphere Programme classification)*/
var landcover2013=ee.Image('MODIS/051/MCD12Q1/2013_01_01').select('Land_Cover_Type_1');

/*select all image pixels which represent urban and built up land cover*/
var urbanurban=landcover2013.eq(13);

// Color labels and palette
var colors = ['#a50026','#d73027','#f46d43','#fdae61','#fee090','#74add1','#4575b4','#313695'].reverse()
 var Name=["<5","5 to 20","20 to 35", "35 to 50", "50 to 65", "65 to 80", "80 to 95", ">95"];
    
    var PM=ee.Image('users/tirthankar25/YearlyPM_urban');
//Map.addLayer(PM)
    
//Keep the band names same to get a line chart; otherwise, you will get separate points 
var PM1998 = PM.select(['Y1998'],['PM']).set( 'system:time_start','1998','system:time_end','1998')
var PM1999 = PM.select(['Y1999'],['PM']).set( 'system:time_start','1999','system:time_end','1999')
var PM2000 = PM.select(['Y2000'],['PM']).set( 'system:time_start','2000','system:time_end','2000')
var PM2001 = PM.select(['Y2001'],['PM']).set( 'system:time_start','2001','system:time_end','2001')
var PM2002 = PM.select(['Y2002'],['PM']).set( 'system:time_start','2002','system:time_end','2002')
var PM2003 = PM.select(['Y2003'],['PM']).set( 'system:time_start','2003','system:time_end','2003')
var PM2004 = PM.select(['Y2004'],['PM']).set( 'system:time_start','2004','system:time_end','2004')
var PM2005 = PM.select(['Y2005'],['PM']).set( 'system:time_start','2005','system:time_end','2005')
var PM2006 = PM.select(['Y2006'],['PM']).set( 'system:time_start','2006','system:time_end','2006')
var PM2007 = PM.select(['Y2007'],['PM']).set( 'system:time_start','2007','system:time_end','2007')
var PM2008 = PM.select(['Y2008'],['PM']).set( 'system:time_start','2008','system:time_end','2008')
var PM2009 = PM.select(['Y2009'],['PM']).set( 'system:time_start','2009','system:time_end','2009')
var PM2010 = PM.select(['Y2010'],['PM']).set( 'system:time_start','2010','system:time_end','2010')
var PM2011 = PM.select(['Y2011'],['PM']).set( 'system:time_start','2011','system:time_end','2011')
var PM2012 = PM.select(['Y2012'],['PM']).set( 'system:time_start','2012','system:time_end','2012')
var PM2013 = PM.select(['Y2013'],['PM']).set( 'system:time_start','2013','system:time_end','2013')
var PM2014 = PM.select(['Y2014'],['PM']).set( 'system:time_start','2014','system:time_end','2014')
var PM2015 = PM.select(['Y2015'],['PM']).set( 'system:time_start','2015','system:time_end','2015')
var PM2016 = PM.select(['Y2016'],['PM']).set( 'system:time_start','2016','system:time_end','2016')


//Create  Image collection of annual means
var PMtime=ee.ImageCollection([PM1998,PM1999,PM2000,PM2001,PM2002,PM2003,PM2004,PM2005,
PM2006,PM2007,PM2008,PM2009,PM2010,PM2011,PM2012,PM2013,PM2014,PM2015,PM2016]);
// Multi-iyear mean
var PMtime_mean=PMtime.mean();


 var PM_Cluster=ee.Image('users/tirthankarchakraborty/YearlyPM_urbancluster');
//Map.addLayer(PM)
//Keep the band names same to get a line chart; otherwise, you will get separate points 
var Cluster_PM1998 = PM_Cluster.select(['first'],['Cluster_PM']).set( 'system:time_start','1998','system:time_end','1998')
var Cluster_PM1999 = PM_Cluster.select(['first_1'],['Cluster_PM']).set( 'system:time_start','1999','system:time_end','1999')
var Cluster_PM2000 = PM_Cluster.select(['first_2'],['Cluster_PM']).set( 'system:time_start','2000','system:time_end','2000')
var Cluster_PM2001 = PM_Cluster.select(['first_3'],['Cluster_PM']).set( 'system:time_start','2001','system:time_end','2001')
var Cluster_PM2002 = PM_Cluster.select(['first_4'],['Cluster_PM']).set( 'system:time_start','2002','system:time_end','2002')
var Cluster_PM2003 = PM_Cluster.select(['first_5'],['Cluster_PM']).set( 'system:time_start','2003','system:time_end','2003')
var Cluster_PM2004 = PM_Cluster.select(['first_6'],['Cluster_PM']).set( 'system:time_start','2004','system:time_end','2004')
var Cluster_PM2005 = PM_Cluster.select(['first_7'],['Cluster_PM']).set( 'system:time_start','2005','system:time_end','2005')
var Cluster_PM2006 = PM_Cluster.select(['first_8'],['Cluster_PM']).set( 'system:time_start','2006','system:time_end','2006')
var Cluster_PM2007 = PM_Cluster.select(['first_9'],['Cluster_PM']).set( 'system:time_start','2007','system:time_end','2007')
var Cluster_PM2008 = PM_Cluster.select(['first_10'],['Cluster_PM']).set( 'system:time_start','2008','system:time_end','2008')
var Cluster_PM2009 = PM_Cluster.select(['first_11'],['Cluster_PM']).set( 'system:time_start','2009','system:time_end','2009')
var Cluster_PM2010 = PM_Cluster.select(['first_12'],['Cluster_PM']).set( 'system:time_start','2010','system:time_end','2010')
var Cluster_PM2011 = PM_Cluster.select(['first_13'],['Cluster_PM']).set( 'system:time_start','2011','system:time_end','2011')
var Cluster_PM2012 = PM_Cluster.select(['first_14'],['Cluster_PM']).set( 'system:time_start','2012','system:time_end','2012')
var Cluster_PM2013 = PM_Cluster.select(['first_15'],['Cluster_PM']).set( 'system:time_start','2013','system:time_end','2013')
var Cluster_PM2014 = PM_Cluster.select(['first_16'],['Cluster_PM']).set( 'system:time_start','2014','system:time_end','2014')
var Cluster_PM2015 = PM_Cluster.select(['first_17'],['Cluster_PM']).set( 'system:time_start','2015','system:time_end','2015')
var Cluster_PM2016 = PM_Cluster.select(['first_18'],['Cluster_PM']).set( 'system:time_start','2016','system:time_end','2016')



//Create  Image collection of annual means
var PMtime_cluster=ee.ImageCollection([Cluster_PM1998,Cluster_PM1999,Cluster_PM2000,Cluster_PM2001,Cluster_PM2002,Cluster_PM2003,Cluster_PM2004,Cluster_PM2005,
Cluster_PM2006,Cluster_PM2007,Cluster_PM2008,Cluster_PM2009,Cluster_PM2010,Cluster_PM2011,Cluster_PM2012,Cluster_PM2013,Cluster_PM2014,Cluster_PM2015,Cluster_PM2016]);

var PMtime_mean_cluster=PMtime_cluster.mean();


var PMtime_total=ee.ImageCollection([PM1998.addBands(Cluster_PM1998),PM1999.addBands(Cluster_PM1999),PM2000.addBands(Cluster_PM2000),
PM2001.addBands(Cluster_PM2001),PM2002.addBands(Cluster_PM2002),PM2003.addBands(Cluster_PM2003),PM2004.addBands(Cluster_PM2004),
PM2005.addBands(Cluster_PM2005),PM2006.addBands(Cluster_PM2006),PM2007.addBands(Cluster_PM2007),PM2008.addBands(Cluster_PM2008),
PM2009.addBands(Cluster_PM2009),PM2010.addBands(Cluster_PM2010),PM2011.addBands(Cluster_PM2011),PM2012.addBands(Cluster_PM2012),
PM2013.addBands(Cluster_PM2013),PM2014.addBands(Cluster_PM2014),PM2015.addBands(Cluster_PM2015),PM2016.addBands(Cluster_PM2016)]);


var PMtime_final=PMtime_mean.addBands(PMtime_mean_cluster)
//Create function to create a panel
function panelcreate() {

// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Urban PM Explorer',
    style: {fontSize: '1.4pw', fontWeight: 'bold'}
  }),
  ui.Label({
    value:'Displayes PM₂.₅ values for all urban areas on Earth', style: {fontSize: '.9vw', fontWeight: 'normal', textAlign: 'left'}
})
]);

panel.add(intro);
}



// Create an inspector panel with a horizontal layout.
var inspector = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical')
});

// Add a label to the panel.
inspector.add(ui.Label({value: 'Click on an urban cluster to extract PM concentration for the cluster and the pixel',
style: {fontSize: '1.7vmin', fontWeight: 'normal', textAlign: 'center', margin: '0px 0px 0px 0px'}}));

// Add the panel to the default map.
map.add(inspector);

// Set the default map's cursor to a "crosshair".
map.style().set('cursor', 'crosshair');

// Create a panel to hold our widgets.
var panel = ui.Panel();

panel.style().set({width: '25%', fontSize: '1vw', fontWeight: 'bold'});

//Call funtion to create panel
panelcreate()
//Create label for paper reference
//referencecreate()

map.onClick(function(coords) {
//Clear panel
panel.clear()

// Call the panel creation function again
panelcreate()

// Create panels to hold lon/lat and PM values.
var lat = ui.Label();
var lon = ui.Label();
var Pixel=ui.Label();
var Mean=ui.Label();
//Add panel
panel.add(ui.Panel([lat, lon], ui.Panel.Layout.flow('horizontal')))
panel.add(ui.Panel([Pixel], ui.Panel.Layout.flow('horizontal')))
panel.add(ui.Panel([Mean], ui.Panel.Layout.flow('horizontal')))
// Register a callback on the default map to be invoked when the map is clicked.
  // Add a red dot for the point clicked on.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var dot = ui.Map.Layer(point, {color: 'FF0000'});
  map.layers().set(1, dot);
//Clear inspector
  inspector.clear()
  inspector.style().set('shown', true);
   inspector.add(ui.Label({value:'Loading...', style: {color: 'gray',fontSize: '1.7vmin', fontWeight: 'normal', textAlign: 'center', margin: '0px 0px 0px 0px'}}));
//Calculate the PM values at the points from the images
  var sample = ee.Image(PMtime_final).unmask(0).sample(point, 30).first().toDictionary();
  sample.evaluate(function(values) {

    // Add a label with the results from the server.
  // Update the lon/lat panel with values from the click event.
  lat.setValue('Lat: ' + coords.lat.toFixed(2)),
  lon.setValue('Lon: ' + coords.lon.toFixed(2));
  Pixel.setValue('PM₂.₅ concentration of pixel: ' + values.PM.toFixed(2) + ' µg/m3');
  Mean.setValue('PM₂.₅ concentration of cluster: ' + values.Cluster_PM.toFixed(2) + ' µg/m3');
  // Add the reference again under all the charts.
  //referencecreate()

  // Clear inspector again and display a new label
  inspector.clear();

  inspector.style().set('shown', true);
  inspector.add(ui.Label({value:'Click on another urban cluster/pixel...',
style: {fontSize: '1.7vmin', fontWeight: 'normal', textAlign: 'center', margin: '0px 0px 0px 0px'}}));

  });
  
  
    var PMChart = ui.Chart.image.series(PMtime_total, point).setChartType('LineChart');
  PMChart.setOptions({
    title: 'Long-term change in  PM₂.₅ concentration',
      vAxes: {
        0: {
          title: 'PM₂.₅ concentration of pixel (µg/m3)', format: '#.##',  titleTextStyle: {bold: true, color: '#993333', italic: false}
        },
        1: {
          title: 'PM₂.₅ concentration of cluster (µg/m3)', format: '#.##',  titleTextStyle: {bold: true, color: '#6600ff', italic: false}
        }
      },
    hAxis: {title: 'Year', format: 'yyyy', gridlines: {count: 17}, titleTextStyle: {bold: true, italic: false}},
     curveType: 'function',
        colors: ["#993333","#6600ff"],
        lineWidth:3,
  pointSize: 5,
  legend: 'none',
        //chartArea: {height: '58%'},
       'tooltip' : {
  trigger: 'none'
},
        series: {
        0: {targetAxisIndex: 0},
        1: {targetAxisIndex: 1}
      }
  });
  

  panel.widgets().set(5, PMChart);
  
});  
// Add the panel to the ui.root.
ui.root.insert(1, panel);

var legend = ui.Panel({style: {position: 'bottom-left',width: '140px'}});
function legendcreate()
{
legend.add(ui.Label({ 
  value: "PM₂.₅ concentration (µg/m3)",
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '4px 0px 4px 0px',
    padding: '5px'
  }
  }))};
  //Call legend creation function
  legendcreate()

// Define some constants.
var PM_1km = 'Annual';
var none= "Remove layers"
/*Add PM layers to map to display the 16-year daytime and nightime urban heat islands of the world's 4999 largest cities*/
var PMVis = PMtime_mean.clip(urb).select('PM').visualize({min:5, max:95,palette:colors ,opacity:1})
// Create a layer selector that dictates which layer is visible on the map.
var select = ui.Select({
  items: [PM_1km, none],
  value: PM_1km,
  onChange: redraw,
});
legend.add(ui.Label('Choose layer to display:')).add(select);

// Create a function to render a map layer configured by the user inputs.
function redraw() {
  map.layers().reset();
  //Clear legend and create new legend 
  legend.clear()
  legendcreate()
  //Change legend label based on map displayed
legend.add(ui.Label('Choose layer to display:')).add(select);
  //var Name=custom_leg
  var layer = select.getValue();
  var image;
  if (layer == PM_1km) {
  var Name=["<5","5 to 20","20 to 35", "35 to 50", "50 to 65", "65 to 80", "80 to 95", ">95"];
     image = PMVis;
  } 
  map.addLayer(image, {}, layer);
  // Create legend color blocks for each range
  var entry
for (var x = 0; x<8; x++){
  entry = [
    ui.Label({style:{color:colors[x], margin: '0 0 4px 0'}, value: '████ '}),
    ui.Label({
      value: Name[x],
      style: {
        margin: '0 0 4px 4px'
      }
    })
  ];
  //entry.setValue(entry)
  legend.add(ui.Panel(entry, ui.Panel.Layout.Flow('horizontal')));
  if (layer==none)
   {
     map.layers().reset();
   }
}
  
}
// Invoke the redraw function once at start up to initialize the map.
redraw();

map.add(legend);
//var outline = ee.Image().paint(urb, 0, 2)
//Map.addLayer(outline,null)
