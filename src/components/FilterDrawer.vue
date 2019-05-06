<template>
      <v-layout row wrap>
        <v-flex xs12>
          <div class="pt-5 mt-5 ml-3">
            <span class="display-1 font-weight-light">Such Filter</span>
            <p class="subheading font-weight-light">Hier können Sie die Datenbasis für die Suche einschränken.</p>
          </div>
        </v-flex>

        <v-flex xs12 class="ma-3">
          <v-switch
            v-model="myCaseFilter"
            label="nur eigene Fälle"
          ></v-switch>
        </v-flex>
      </v-layout>    
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      myCaseFilter: false
    }
  },
  computed: {
    ...mapGetters(['getAdvisorId', 'getMyCaseFilter'])
  },
  watch: {
    myCaseFilter: function(val) {
      if (val) {
        this.addMyCaseFilter(this.getAdvisorId)
      } else {
        this.removeMyCaseFilter()
      }
    }
  },
  methods: {
    ...mapActions(['addMyCaseFilter', 'removeMyCaseFilter'])
  },
  created () {
    // bookmarks laden
    let mcf = this.getMyCaseFilter
    if(mcf === '_') {
      this.myCaseFilter = false
    } else {
      this.myCaseFilter = true
    }
    
  } 
}
</script>
