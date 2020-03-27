<template>
  <l-map
    ref="lMap"
    style="height: 80%; width: 100%"
    :zoom="zoom"
    :center="center"
    @update:zoom="zoomUpdated"
    @update:center="centerUpdated"
    @update:bounds="boundsUpdated"
  >
    <l-tile-layer :url="tileProvider.url"></l-tile-layer>
  </l-map>

</template>

<script src="./map-app.js"></script>

<style src="./map-app.css"></style>
