<template>
  <div class="container">
    <l-map
      ref="map"
      :style="{position: 'absolute', height: '100vh', width: '80vw'}"
      :zoom="zoom"
      :center="center"
      :maxZoom="18"
      @update:zoom="zoomUpdated"
      @update:center="centerUpdated"
      @update:bounds="boundsUpdated"
    >
      <l-tile-layer
        :url="tileProvider.url"
        :attribution="tileProvider.attribution"
      />
      <l-poly-line
        v-for="line in Object.values(ways)"
        :key="line.id"
        :lat-lngs="line.geometry"
        :color="color(line)"
        :weight="4"
        :visible="visible"
      >
        <l-popup :content="popupContent(line)">
        </l-popup>
      </l-poly-line>
      <l-circle-marker v-for="point in Object.values(nodes)"
                       :key="point.id"
                       :lat-lng="[point.lat, point.lon]"
                       :radius="1"
                       :color="'blue'"
                       v-if="showNodes"
      >
      </l-circle-marker>
    </l-map>
    <div class="sidebar">
      <div class="top">
        <h4 class="title">Openstreetmap Data Inspector</h4>
        <p class="description">Zoom in to search for OSM tags.
          <br>
          <br>Features are requested when zooming in and upon moving the map.
          <br>
          <br>The search is limited to zoom levels 17 and 18.
          <br>
          <br> Current zoom level: {{this.zoom}}
        </p>
        <label>
          Search for osm way tags:
          <input type="text" v-model="tags">
        </label>
        <br><br>
        <label>
          Highlight ways with tag,value:
          <input type="text" v-model="highlightTag" >
        </label>
        <label class="nodes-label">
          Show nodes
          <input class="nodes-checkbox" type="checkbox" v-model="showNodes">
        </label>
        <div class="legend">
          <b>Legend:</b>
          <br><br>
          <div v-for="entry of legend">
            <span class="box" :style="{background: entry.color}"/>
            <span class="label">{{entry.label}}</span>
          </div>
        </div>
        <button
          class="clear-button"
          @click="clearMap()"
        >Clear Map</button>
      </div>
      <div class="bottom">
        <h5 class="title">Overpass request status</h5>
        <div v-if="loading" style="font-size: x-small">Loading ...</div>
        <div v-if="Object.entries(status).length !== 0">
          <div v-if="status.msg">{{status.msg}}</div>
          <div>{{status.code}}: {{status.text}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./app.js"></script>

<style src="./app.css"/>
