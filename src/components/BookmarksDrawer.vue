<template>
      <v-layout row wrap>
        <v-flex xs12>
          <div class="pt-5 mt-5 ml-3">
            <span class="display-1 font-weight-light">Bookmarks</span>
          </div>
        </v-flex>

        <v-flex xs12>
          <v-list dense three-line class="pt-2">
            <v-list-tile 
              avatar
              v-for="hit of getBookmarks.values()"
              v-bind:key="hit._id"
              @click="open(hit)">
              <v-list-tile-content>
                <v-list-tile-title>{{hit._source.owner.firstname}} {{hit._source.owner.lastname}} <span class="font-weight-light">({{hit._source.advisor.shorthandSymbol}})</span></v-list-tile-title>
                <v-list-tile-sub-title><span class="font-italic font-weight-medium">{{hit.comment}} // </span> {{hit._source.address.street}} {{hit._source.address.streetNumber}}, {{hit._source.address.postalCode}} {{hit._source.address.city}} {{hit._source.address.sublocality}}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-flex>
      </v-layout>    
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters(['getBookmarks'])
  },
  watch: {
    getBookmarks: function(val) {
      console.log('new bookmark -> ' + val + ' -> ' + this.getBookmarks.size)
    }
  },
  methods: {
    open (hit) {
      console.log('open ' + hit._id)
      this.$emit('close')
    }
  } 
}
</script>
