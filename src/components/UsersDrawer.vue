<template>
      <v-layout row wrap>
        <v-flex xs12>
          <img
            src="@/assets/paltmeier.jpg"
          >
          </img>
        </v-flex>
        <v-flex xs12 align-end flexbox class="ma-3">
          <span class="headline">Peter Altmeier</span><br>
          <span class="title font-weight-light">Sondersachbearbeiter (T4)</span>
        </v-flex>

        <v-flex xs12 class="ma-3">
          <p class="subheading font-weight-light">Sucheinstellungen</p>
          <v-radio-group v-model="searchType">
            <v-radio
              label="Instant Suche"
              value="instant"
            ></v-radio>
            <v-radio
              label="Autocomplete Suche"
              value="autocomplete"
            ></v-radio>
            <v-radio
              label="Google like Suche"
              value="google"
            ></v-radio>
          </v-radio-group>
        </v-flex>

        <v-flex xs12 class="ma-3">
          <p class="subheading font-weight-light">Umgebung</p>
          <p><v-icon v-if="!server" color="red" small>mdi-server-network-off</v-icon><v-icon v-if="server" color="green" small>mdi-server-network</v-icon> Backend Status</p>
        </v-flex>
      </v-layout>    
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      foo: ''
    }
  },
  props: {
    server: false
  },
  computed: {
    ...mapGetters(['getQueryType']),
    searchType: {
      // getter
      get: function () {
        return this.getQueryType 
      },
      // setter
      set: function (val) {
        if(val === 'instant') {
          this.instantQuery()
        }
        if(val === 'autocomplete') {
          this.autocompleteQuery()
        }
        if(val == 'google') {
          this.googleQuery()
        }
      }
    }
  },
  methods: {
    ...mapActions(['instantQuery', 'autocompleteQuery', 'googleQuery']),
    open (hit) {
      console.log('open ' + hit._id)
      this.$emit('close')
    }
  } 
}
</script>
