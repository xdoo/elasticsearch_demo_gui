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
import { L } from 'vue2-leaflet'
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      zoom: 12,
      url:'https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png',
      attribution:'&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
      center: L.latLng(48.1371181, 11.5755711), // Marienplatz
      hits: []
    }
  },
  computed: {
    ...mapGetters(['query'])
  },
  methods: {
    /**
     * 'lon' ist der Standard Elasticsearch Wert. Dieser
     * führt zu Fehlermeldungen. Deshalb wird die Elasticsearch
     * Struktur zu einem Array umgeandelt. 
     */
    formatLatLng (hit) {
      return [
        hit._source.address.location.lat,
        hit._source.address.location.lon
      ]
    }
  },
  /**
   * Veränderungen im Suchfeld werden hier überwacht. Jede
   * Eingabe erzeugt eine neue Suchanfrage. 
   */
  watch: {
    query: function (val) {
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
      })
    }
  }
}
</script>


