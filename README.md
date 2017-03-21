** /!\ Disclaimer /!\ **

The code in this repository, only shows how to display a Baidu map in a rails application and add new markers. Geocoder is there to allow you to retrieve a set of coordinates (latitude & longitude) from a given address. Baidu needs only a set of coordinates, so you should be able to easily make the link.

If you don't know how to use Geocoder, here is the [README](https://github.com/alexreisner/geocoder#baidu-baidu).

# Configuring Geocoder for Baidu

You need to configure `Geocoder` to use Baidu. By default it uses **Google** to do the *Geocoding*.

In `config/initializers/geocoder.rb`

```ruby
Geocoder.configure({
  :lookup  => :baidu, # could be :google
  :api_key => "YOUR_SERVER_BAIDU_API_KEY",
  :units   => :km,
  # [...]
})
```

Reference : [Geocoder gem](https://github.com/alexreisner/geocoder#baidu-baidu).

# Displaying the Baidu Map 

## HTML 

Use whatever size you want for the `width` & `height`, Baidu will adapt.

```html
<div id="map-container">
  <div id="map-canvas"  style="width: 500px; height: 500px;"></div>
</div>

<!-- After all the JS has loaded we load the Baidu API -->
<script src="http://api.map.baidu.com/api?v=2.0&ak=YOUR_CLIENT_BAIDU_API_KEY"></script>

<script type="text/javascript">
  // HERE YOU SHOULD PUT THE SCRIPT USING baiduMap(), etc...
</script>
```

## Javascript

### Mini-library

```javascript
// After jQuery has loaded 

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
```

### Example

```javascript
// After having loaded the Baidu API

$(function() {
	// This will create a map and center it on this (latitude, longitude)
	var map = baiduMap("map-canvas", 121.4737, 31.2304);
	// Creates two markers on the map for the given (latitudes, longitudes)
	map.addMarker(121.4737, 31.2304);
	map.addMarker(121.4737, 31.2306);
});
```

## CSS 

```css
.BMap_Marker img {
  width: 26px !important;
  height: 26px !important;
}
```