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
              v-for="bookmark of getBookmarks"
              v-bind:key="bookmark.id"
              @click="open(hit)">
              <v-list-tile-content>
                <v-list-tile-title>{{bookmark.owner.firstname}} {{bookmark.owner.lastname}} <span class="font-weight-light">({{bookmark.advisor.shorthandSymbol}})</span></v-list-tile-title>
                <v-list-tile-sub-title>{{bookmark.address.street}} {{bookmark.address.streetNumber}}, {{bookmark.address.postalCode}} {{bookmark.address.city}} {{bookmark.address.sublocality}}</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-flex>
      </v-layout>    
</template>
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data() {
    return {
      bookmarks: null
    }
  },
  computed: {
    ...mapGetters(['getBookmarks', 'countedBookmarks'])
  },
  watch: {
    countedBookmarks: function(val) {
      this.bookmarks = this.getBookmarks.values()
    }
  },
  methods: {
    ...mapActions(['loadBookmarks']),
    open (hit) {
      console.log('open ' + hit._id)
      this.$emit('close')
    }
  },
  created () {
    // bookmarks laden
    this.$loadBookmarks()
  } 
}
</script>
