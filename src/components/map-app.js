import {LMap, LTileLayer} from "vue2-leaflet"

export default {
  data: () => ({
    tileProvider: {
      name: 'Open Street Maps',
      attribution: '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    },
    zoom: 10,
    center: [49.449875, 8.669599],
    bounds: null
  }),
  components: {
    LMap,
    LTileLayer
  },
  created() {

  },
  methods: {
    zoomUpdated (zoom) {
      this.zoom = zoom;
    },
    centerUpdated (center) {
      this.center = center;
    },
    boundsUpdated (bounds) {
      this.bounds = bounds;
    }
  }
}
