<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex 
        v-bind="{ [`xs${flex}`]: true }" 
        v-for="hit in hits" 
        v-bind:key="hit._id"
      >
        <v-card>
          <v-sheet color="grey" height="150px">
            <v-container
              fill-height
              fluid
              pa-3
            >
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                  <span class="title white--text">{{hit._source.owner.firstname}} {{hit._source.owner.lastname}}</span><br>
                  <span class="font-weight-light white--text">(Sachbearbeiter: {{hit._source.advisor.shorthandSymbol}})</span><br>
                  <v-chip small label class="mt-5">Label</v-chip>
                </v-flex>
              </v-layout>
            </v-container>
          </v-sheet>

          <v-card-title primary-title>
            <div>
              <span>
                {{hit._source.address.street}} {{hit._source.address.streetNumber}}<br>
                {{hit._source.address.sublocality}}<br>
                {{hit._source.address.postalCode}} {{hit._source.address.city}}<br>
              </span>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-spacer></v-spacer>
            <case-actions :case-id="hit._id"></case-actions>
          </v-card-actions>
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
      hits: []
    }
  },
  computed: {
    ...mapGetters(['query']),
    flex () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return '12'
        case 'sm': return '6'
        case 'md': return '4'
        case 'lg': return '3'
        case 'xl': return '3'
      }
    }
  },
  methods: {
    /**
     * Suche wird ausgeführt.
     */
    search (val) {
      console.log(val)
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
        }
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
    console.log('created')
    this.search(this.query)
  } 
}
</script>
