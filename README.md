# Leaflet Lumap

## How to usage
#### Install / Include Bootsrap 5 
If it's already installed, you can just skip it
```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
```

```html wrap
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM" crossorigin="anonymous"></script>
```
for full documentation can visit to : https://getbootstrap.com/docs/5.3/getting-started/introduction/

#### Install / Include Bootsrap Icon 
if already installed or not using the icon can be skipped

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.3/font/bootstrap-icons.css">
```
for full documentation can visit to : https://icons.getbootstrap.com/

#### Activate plugins
to use plugins please load using this method
- Config variabel Map
```js
let map = L.map('map').setView([39.73, -104.99], 13);
```
- Config as Base Maps

```js
let baseMaps = {
	id:'basemap',
	title : 'BaseMaps',
	type : 'single',
	child : [
		{
			title : "OpenStreetMap",
			iconHtml : `<img src="https://cdn-icons-png.flaticon.com/512/5088/5088218.png">`,
			layer : osm
		},
		{
			title : 'Satellite',
			iconHtml : `<img src="https://cdn-icons-png.flaticon.com/512/5088/5088218.png">`,
		    layer : satellite
		}
	]
}
```

- Config as Overlay Maps

```js
let littleton = L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.');
let denver    = L.marker([39.74, -104.99]).bindPopup('This is Denver, CO.');
let aurora    = L.marker([39.73, -104.8]).bindPopup('This is Aurora, CO.');
let golden    = L.marker([39.77, -105.23]).bindPopup('This is Golden, CO.');
let cities = L.layerGroup([littleton, denver, aurora, golden]);
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
- Load plugins
```js
let lumap = new Lumap(map,elLumap,[baseMaps,overlayMaps]);
```