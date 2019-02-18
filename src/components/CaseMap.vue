<template>
  <div style="height: 100%; width: 100%; margin: 0">
    <l-map :zoom="zoom" :center="center" style="z-index: 1">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker
        v-for="hit in hits"
        v-bind:key="hit._id"
        :lat-lng="formatLatLng(hit)">
        <l-popup>
          <div>
            I am a popup
          </div>
        </l-popup>
      </l-marker>
    </l-map>
  </div>
</template>
<script>
//import { LMap, LTileLayer, LMarker, LPopup, LTooltip } from 'vue2-leaflet';
import { L } from 'vue2-leaflet'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      zoom: 12,
      url:'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png',
      attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      center: L.latLng(48.1371181, 11.5755711),
      hits: [],
      marker: L.latLng(48.12484573, 11.5256366)
    }
  },
  computed: {
    ...mapGetters(['query'])
  },
  methods: {
    formatLatLng (hit) {
      return [
        hit._source.address.location.lat,
        hit._source.address.location.lon
      ]
    }
  },
  watch: {
    query: function (val) {
      console.log('Wert: ' + val)
      this.$search.search({
        index: 'cases',
        body: {
          query: {
            multi_match: {
              query: val,
              type: 'phrase_prefix',
              fields: ['owner.firstname^2', 'owner.lastname^3', 'address.street^2', 'address.postalcode', 'address.sublocality']
            }
          }
        }
      })
      .then(result => {
        this.hits = result.hits.hits
        //console.log('hits -> ' + JSON.stringify(this.hits))
      })
    }
  }
}
</script>


