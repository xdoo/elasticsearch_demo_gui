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
                  <case-actions :case="hit"></case-actions>
                </v-flex>
              </v-layout>
            </v-card-title>
          </v-card>
        </v-flex>
        <v-flex
          v-if="hits.length < 1"
        >
          <div class="title font-weight-light text-md-center">Keine Treffer zu Ihrer Suchanfrage.</div>
        </v-flex>
      </v-layout>
    </v-container>  
</template>
<script>
import { mapGetters } from 'vuex'
import CaseActions from '@/components/CaseActions'

export default {
    components: {
      CaseActions
    },
    data () {
      return {
        bottom: false,
        from: 0,
        size: 9,
        totalSize: 0,
        hits: []
      }
    },
    computed: {
      ...mapGetters(['query'])
    },
    /**
     * Veränderungen im Suchfeld werden hier überwacht. Jede
     * Eingabe erzeugt eine neue Suchanfrage. 
     */
    watch: {
      query: function (val) {
        // reset infinite scroll
        this.bottom = false
        this.from = 0
        this.totalSize = 0
        // nach oben scrollen
        this.$vuetify.goTo(0)
        // suchen
        this.search(val)
      },
      bottom: function (val) {
        if (this.bottomVisible()) {
          this.from = this.from + this.size
          this.search(this.query)
        }
      }
    },
    /**
     * Damit bei einem Wechsel der Ansicht das selbe Trefferbild stehen bleibt,
     * muss die Suche initial nochmal ausgeführt werden.
     */
    created: function () {
      // Vorbereitung für infinite scroll
      window.addEventListener('scroll', () => {
        this.bottom = this.bottomVisible()
      })
      // initiale Suche ausführen
      this.search(this.query)
    },
    methods: {
      /**
       * Suche wird ausgeführt.
       */
      search (val) {
        // es wird erst ab 2 Buchstaben gesucht
        if (val.length > 2) {
          // wildcard search
          let query = val.replace(' ', '* ')
          query = query + '*'
          this.$search.search({
            index: 'cases',
              body: {
                from: this.from,
                size: this.size,
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
              this.totalSize = result.hits.total
              if(this.from < 1 &&  !this.bottom) {
                // initiale suche
                this.hits = result.hits.hits
              } else {
                // infinite scroll
                result.hits.hits.forEach((hit) => {
                  this.hits.push(hit)
                })
              }
            })
          }
      },
      bottomVisible() {
        const scrollY = window.scrollY
        const visible = document.documentElement.clientHeight
        const pageHeight = document.documentElement.scrollHeight
        const bottomOfPage = visible + scrollY >= pageHeight
        return bottomOfPage || pageHeight < visible
      }
    }
}
</script>
