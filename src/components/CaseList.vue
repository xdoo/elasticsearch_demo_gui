<template>
    <v-container grid-list-sm>
      <v-layout align-start justify-start row wrap>
        <v-flex 
          xs12 
          v-for="hit in hits"
          v-bind:key="hit._id" 
        >
          <v-card
            flat
          >
            <v-card-title primary-title>
              <v-layout>
                <v-flex xs10>
                  <div>
                    <div class="title">{{hit._source.owner.firstname}} {{hit._source.owner.lastname}} <span class="font-weight-light">(Sachbearbeiter: {{hit._source.advisor.shorthandSymbol}})</span></div>
                    <div>
                      {{hit._source.address.street}} {{hit._source.address.streetNumber}}, {{hit._source.address.postalCode}} {{hit._source.address.city}} {{hit._source.address.sublocality}}
                    </div>
                  </div>
                </v-flex>
                <v-flex xs2>
                  <v-spacer></v-spacer>
                  <v-btn icon>
                    <v-icon>mdi-folder-open</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>mdi-timelapse</v-icon>
                  </v-btn>
                  <v-btn icon>
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-card-title>
          </v-card>
        </v-flex>
        <v-flex
          v-if="hits.length < 1"
        >
          <div class="title font-weight-light">Keine Treffer zu Ihrer Suchanfrage.</div>
        </v-flex>
      </v-layout>
    </v-container>  
</template>
<script>
import { mapGetters } from 'vuex'

export default {
    data () {
      return {
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
        // es wird erst ab 2 Buchstaben gesucht
        if (val.length > 2) {
          // wildcard search
          let query = val.replace(' ', '* ')
          query = query + '*'
          this.$search.search({
            index: 'cases',
            body: {
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
        }
      }
    } 
}
</script>
