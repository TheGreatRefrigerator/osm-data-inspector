import {LMap, LTileLayer, LPolyline, LCircleMarker, LPopup} from "vue2-leaflet"
import axios from "axios"

export default {
  data: () => ({
    map: null,
    url: 'http://{s}.tile.osm.org/{z}/{x}/{y}.png',
    tileProvider: {
      name: 'Open Street Maps',
      attribution: '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
    },
    zoom: 16,
    center: [49.41272618722874,8.680272102355959],
    bounds: null,
    ways: {},
    nodes: {},
    showNodes: false,
    tags: "bicycle,cycleway",
    highlightTag: "surface,paved",
    visible: true,
    loading: false,
    status: {},
    legend: [
      {
        color: '#33ffff',
        label: 'ways with requested tags'
      },
      {
        color: '#ffaa00',
        label: 'key match (no value match)'
      },
      {
        color: '#00bb11',
        label: 'exact match'
      }
    ]
  }),
  components: {
    'l-map': LMap,
    'l-tile-layer': LTileLayer,
    'l-poly-line': LPolyline,
    'l-circle-marker': LCircleMarker,
    'l-popup': LPopup
  },
  computed: {
    bbox() {
      if (!this.bounds) {
        return []
      }
      let sw = this.bounds._southWest
      let ne = this.bounds._northEast
      return [sw.lng, sw.lat, ne.lng, ne.lat].join(',')
    }
  },
  methods: {
    clearMap() {
      this.nodes = {}
      this.ways = {}
    },
    color (line) {
      // define color by comparison with highlight input
      let [key, value] = this.highlightTag.split(',')
      if (Object.keys(line.tags).includes(key)) {
        if (value) {
          if (line.tags[key] !== value) {
            return '#ffaa00'
          }
        }
        return '#00bb11'
      }
      return '#33ffff'
    },
    zoomUpdated (zoom) {
      this.zoom = zoom;
    },
    centerUpdated (center) {
      this.center = center;
    },
    boundsUpdated (bounds) {
      // extract bounding box from map
      this.bounds = bounds;
      let sw = this.bounds._southWest
      let ne = this.bounds._northEast
      let bbox = [sw.lat, sw.lng, ne.lat, ne.lng].join(',')
      // construct query
      let query = `https://overpass-api.de/api/interpreter?&data=[out:json][timeout:25];nwr(${bbox});(`
      for (let tag of this.tags.split(',')) {
        query +=`way[${tag}](${bbox});`
      }
      query += `);out geom;>;out skel qt;`
      // only call for high zoom levels
      if (this.zoom > 16) {
          this.loading = true;
          this.status = {}
          axios.get( query)
          .then((response) => {
              // extract response
              for (let el of response.data.elements) {
              if (el.type === "way") {
                this.ways[el.id] = el
              } else if (el.type === "node") {
                this.nodes[el.id] = el
              }
            }
            // workaround to let geometries show after request is finished
            this.visible = false;
            this.visible = true;
            // overpass request status
            this.loading = false;
            this.status = {
              code: response.status,
              text: response.statusText
            }
          })
          .catch(function (error) {
            // show errors
            this.status = {
              code: error.response.status,
              msg: error.message,
              text: error.response.statusText
            }
          })

      }
    },
    popupContent(line) {
      // tag value list
      let content = ""
      for (let [key, val] of Object.entries(line.tags)) {
        content += `<p style="font-size: smaller">${key}: ${val}</p>`
      }
      // link to edit osm way
      content += `<a href="https://www.openstreetmap.org/edit?${line.type}=${line.id}" target="_blank">edit on OSM</a>`
      return content
    }
  }
}
