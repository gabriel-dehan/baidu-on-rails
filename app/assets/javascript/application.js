/*
 * Manifest file, etc...
 */

function baiduMap(elId, lat, lng) {
  var map = new BMap.Map(elId);

  // Latitude, Longitude, Zoom
  map.centerAndZoom(new BMap.Point(lat, lng), 22); 

  map.addControl(new BMap.NavigationControl());
  map.addControl(new BMap.ScaleControl());
  map.addControl(new BMap.OverviewMapControl());
  map.addControl(new BMap.MapTypeControl());

  map.createMarker = function(point) {
    var icon = new BMap.Icon('<%= asset_path("marker.png") %>', new BMap.Size(26, 26));
    var marker = new BMap.Marker(point, { icon: icon });
    return marker;  
  }

  map.addMarker = function(lat, lng) {
  	var marker = this.createMarker(new BMap.Point(lat, lng))
  	this.addOverlay(marker);
  	return marker;
  }

  return map;
}