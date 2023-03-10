# Leaflet Lumap
Luar Map (Outside the Map)

Alternative leaflet control, easy to customize
![Leaflet Lumap - Luar Map](lumap-thumbnail.jpg)
[Link Demo](https://as-shiddiq.github.io/leaflet-lumap/)
## How to install 
```
npm i leaflet-lumap
```
or download this repository direcly and save to your project

## How to usage
- install leaflet : https://leafletjs.com/
- include the stylesheet 
```html
<link rel="stylesheet" href="css/leaflet.lumap.css"/>
```
- include the javascript 
```html
<script src="js/leaflet.lumap.js"></script>
```
to use plugins please load using this method
- Config variabel Map
```js
let map = L.map('map').setView([39.73, -104.99], 13);
```
- Describe selector/element 
```js
let elLumap = document.querySelector('#lumap');
```

- Config as Base Maps

describe varibel basemap
```js
let mapboxD =  L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
							attribution: 'Map data &copy; <a href=\\\"https://www.openstreetmap.org/\\\">OpenStreetMap</a> contributors,<a href=\\\"https://creativecommons.org/licenses/by-sa/2.0/\\\">CC-BY-SA</a>,Imagery © <a href=\\\"https://www.mapbox.com/\\\">Mapbox</a>',
						});
let mapboxL =  L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
						attribution: 'Map data &copy; <a href=\\\"https://www.openstreetmap.org/\\\">OpenStreetMap</a> contributors,<a href=\\\"https://creativecommons.org/licenses/by-sa/2.0/\\\">CC-BY-SA</a>,Imagery © <a href=\\\"https://www.mapbox.com/\\\">Mapbox</a>',
					});
```

group the basemap in baseMaps variabel
```js
let baseMaps = {
	id:'basemap',
	title : 'BaseMaps',
	type : 'single',
	child : [
		{
			title : "Mapbox Dark",
			iconHtml : `<img src="https://cdn-icons-png.flaticon.com/512/5088/5088218.png">`,
			layer : mapboxD
		},
		{
			title : "Mapbox Light",
			iconHtml : `<img src="https://cdn-icons-png.flaticon.com/512/5088/5088218.png">`,
		    layer : mapboxL
		}
	]
}
```

- Config as Overlay Maps

describe varibel layers or make as group

```js
let littleton = L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.');
let denver    = L.marker([39.74, -104.99]).bindPopup('This is Denver, CO.');
let aurora    = L.marker([39.73, -104.8]).bindPopup('This is Aurora, CO.');
let golden    = L.marker([39.77, -105.23]).bindPopup('This is Golden, CO.');
let cities = L.layerGroup([littleton, denver, aurora, golden]);
```
group the layers in overlayMaps
```js
var overlayMaps = {
		id:'layers',
		title : 'Layers',
		child : [
				{
				    title: "Cities",
				    icon:'house',
				    style:'background:#9c89b8;color:#fff',
				    layer:cities
				}
			]
	};
```
- Create the Lumap instance
```js
let lumap = new Lumap(map,elLumap,[baseMaps,overlayMaps],configs={});
```

### Configuration
this is the default configuration the lumap, if you want to change please overwrite it with the desired value

```js
{
	bootstrapIcon : false //true if you has been loaded bootstrap icon,
	responsive: {
	    triggerButton : 'bottom-right' //bottom-right || bottom-left || top-right || top-left
	}
}
```