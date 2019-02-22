<template>
  <div style="height: 100%; width: 100%; margin: 0">
    <l-map :zoom="zoom" :center="center" style="z-index: 1">
      <l-tile-layer :url="url" :attribution="attribution"></l-tile-layer>
      <l-marker
        v-for="hit in hits"
        v-bind:key="hit._id"
        :lat-lng="formatLatLng(hit)"
        style="width: 120px">
        <l-popup>
          <div>
            <span class="subheading">{{hit._source.owner.firstname}} {{hit._source.owner.lastname}} ({{hit._source.advisor.shorthandSymbol}})</span>
            <br>
            <span>
              {{hit._source.address.street}} {{hit._source.address.streetNumber}}<br>
              {{hit._source.address.sublocality}}<br>
              {{hit._source.address.postalCode}} {{hit._source.address.city}}<br>
            </span>
            <v-spacer></v-spacer><case-actions :case="hit"></case-actions>
          </div>
        </l-popup>
      </l-marker>
    </l-map>
  </div>
</template>
<script>
import { L } from 'vue2-leaflet'
import { mapGetters } from 'vuex'
import CaseActions from '@/components/CaseActions'

export default {
  components: {
    CaseActions
  },
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
    },
    search (val) {
      // es wird erst ab 2 Buchstaben gesucht
      if (val.length > 2) {
        // wildcard search
        let query = val.replace(' ', '* ')
        query = query + '*'
        this.$search.search({
          index: 'cases',
          body: {
            from: 0,
            size: 30,
            query: {
              query_string: {
                query: query,
                default_operator: 'AND',
                fields: ['owner.firstname^2', 'owner.lastname^3', 'address.street^2', 'address.postalcode', 'address.sublocality', 'advisor.shorthandSymbol']
              }
            }
          }
        })
        .then(result => {
          this.hits = result.hits.hits
        })
      } // end search
    }
  },
  /**
   * Veränderungen im Suchfeld werden hier überwacht. Jede
   * Eingabe erzeugt eine neue Suchanfrage. 
   */
  watch: {
    query: function (val) {
      this.search(val)
    }
  },
  /**
   * Damit bei einem Wechsel der Ansicht das selbe Trefferbild stehen bleibt,
   * muss die Suche initial nochmal ausgeführt werden.
   */
  created: function () {
    this.search(this.query)
  }
}
</script>


