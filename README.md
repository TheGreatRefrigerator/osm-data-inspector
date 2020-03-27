# Proof of performance for "Geokommunikation im Web - Möglichkeiten der Internetkartographie" SS 2018

With this website openstreetmap (osm) ways can be selectively requested
for the current map view by entering a comma separated list of osm tags.

The data can be inspected by clicking on the loaded ways.
A list of additional tag-value-pairs for this way is shown as well as a
direct link to edit this specific way.

The set of loaded ways can be further inspected by searching for an
additional tag or tag-value-pairs and highlight it in a different color.

The data is queried by using the
[overpass api](https://wiki.openstreetmap.org/wiki/Overpass_API).
The status of the api call is shown in the bottom right corner.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```
