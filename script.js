mapboxgl.accessToken = 'pk.eyJ1IjoiZnJlZWFjY291bnQyIiwiYSI6ImNpZmFsdmdmbjJoYjRzNG03ZGh4YzU0ZjQifQ.cA_xYJl1bkaboq_5kB8wHw';

var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/freeaccount2/ckp4vtvfc0hsb17o7w7g8gdsm',
center: [118.781,-32.763],
zoom: 7.5
});


// When a click event occurs on a feature in the places layer, open a popup at the
// location of the feature, with description HTML from its properties.
var data_layer = 'drought-relief-bore-data-join-054bxa'

map.on('click', data_layer, function (e) {
var coordinates = e.features[0].geometry.coordinates.slice();
var id = e.features[0].properties['SITE REF'];
var NaCl = e.features[0].properties['NaCl'];
var TDS_cond_mgL = e.features[0].properties['TDS_cond_mgL'];
var TDS_mgL = e.features[0].properties['TDS_mgL'];
var flow = e.features[0].properties['Flow'];
var swl = e.features[0].properties['SWL'];
var drill_depth = e.features[0].properties['DRILLED DEPTH MBGL']

var SITE_COMMENT = e.features[0].properties['SITE COMMENT'] 

  

// Ensure that if the map is zoomed out such that multiple
// copies of the feature are visible, the popup appears
// over the copy being pointed to.
while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
}

new mapboxgl.Popup()
.setLngLat(coordinates)
.setHTML("<table><tr><td>Bore ID</td><td>"+id+"</td></tr><tr><td>TDS cond<td>"+TDS_cond_mgL+" mg/L</td></tr><tr><td>TDS</td><td>"+TDS_mgL+" mg/L</td></tr><tr><td>NaCl</td><td>"+NaCl+" ug/L</td></tr><tr><td>Flow</td><td>"+flow+" m³/day</td></tr></tr><td>SWL</td><td>"+swl+" MBGL</td></tr></tr><td>Drill depth</td><td>"+drill_depth+" m</td></tr></table>"+SITE_COMMENT
)
.addTo(map);
});


// Change the cursor to a pointer when the mouse is over the places layer.
map.on('mouseenter', 'places', function () {
map.getCanvas().style.cursor = 'pointer';
});

// Change it back to a pointer when it leaves.
map.on('mouseleave', 'places', function () {
map.getCanvas().style.cursor = '';

});

document.getElementById("display").onchange = changeListener;

var data_table = document.getElementById("data_table");
var tds_table = document.getElementById("tds_table");
var flow_table = document.getElementById("flow_table");
var depth_table = document.getElementById("depth_table");

tds_table.style.display = "none";
    flow_table.style.display = "none";
depth_table.style.display = "none";
    data_table.style.display = "block";


function changeListener(){
  
  var layer = document.getElementById('display');
  

  if (layer.value == "Data"){
    map.setPaintProperty(data_layer, 'circle-color',[
  "interpolate",
  ["linear"],
  ["get", "missing_data"],
  1,
  "#000000",
  2,
  "hsl(245, 100%, 63%)",
  3,
  "hsl(115, 100%, 52%)",
  4,
  "hsl(59, 100%, 51%)",
  5,
  "hsl(0, 100%, 56%)"
] );
    tds_table.style.display = "none";
    flow_table.style.display = "none";
    depth_table.style.display = "none";
    data_table.style.display = "block";


    
  }
  
  if (layer.value == "Flow"){
    map.setPaintProperty(data_layer, 'circle-color', [
  "interpolate",
  ["linear"],
  ["get", "Flow_int"],
  -1,
  "#000000",
  0,
  "#ff1f1f",
  5,
  "#fffb05",
  20,
  "#1fff0a",
  35,
  "#5242ff"
]);
    tds_table.style.display = "none";
    flow_table.style.display = "block";
    depth_table.style.display = "none";
    data_table.style.display = "none";
    
  }
  
  if (layer.value == "TDS"){
    map.setPaintProperty(data_layer, 'circle-color', 
                        [
  "interpolate",
  ["linear"],
  ["get", "TDS_mgL_int"],
  0,
  "#000000",
  100,
  "#5242ff",
  1000,
  "#1fff0a",
  5000,
  "hsl(59, 100%, 51%)",
  16000,
  "hsl(0, 100%, 56%)",
  16001,
  "#FFFFFF"
]);
    tds_table.style.display = "block";
    flow_table.style.display = "none";
    depth_table.style.display = "none";
    data_table.style.display = "none";
  }
  
    if (layer.value == "Depth"){
    map.setPaintProperty(data_layer, 'circle-color', 
[
  "interpolate",
  ["linear"],
  ["get", "drill_depth_int"],
  0,
  "#000000",
  1,
  "#5242ff",
      10,
  "#5242ff",
  20,
  "#1fff0a",
  40,
  "hsl(59, 100%, 51%)",
  50,
  "hsl(0, 100%, 56%)"
]);
  
    tds_table.style.display = "none";
    flow_table.style.display = "none";
    depth_table.style.display = "block";
    data_table.style.display = "none";
  }

}