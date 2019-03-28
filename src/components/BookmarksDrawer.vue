<template>
      <v-layout row wrap>
        <v-flex xs12>
          <div class="pt-5 mt-5 ml-3">
            <span class="display-1 font-weight-light">Bookmarks</span>
          </div>
        </v-flex>

        <v-flex xs12>
          <v-list dense three-line class="pt-2">
            <v-hover
              v-for="bookmark of bookmarks"
              v-bind:key="bookmark._id"
              @click="open(hit)"  
            >
              <v-list-tile
                slot-scope="{ hover }"
              >
                <v-list-tile-content
                  v-if="!hover"
                >
                  <v-list-tile-title>{{bookmark.owner.firstname}} {{bookmark.owner.lastname}} <span class="font-weight-light">({{bookmark.advisor.shorthandSymbol}})</span></v-list-tile-title>
                  <v-list-tile-sub-title>{{bookmark.address.street}} {{bookmark.address.streetNumber}}, {{bookmark.address.postalCode}} {{bookmark.address.city}} {{bookmark.address.sublocality}}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-expand-transition>
                  <v-toolbar
                    floating
                    flat
                    prominent
                    v-if="hover"
                    class="white"
                  >
                    <v-btn 
                      icon
                      @click="open(bookmark)"
                    >
                      <v-icon>mdi-folder-open</v-icon>
                    </v-btn>
                    <v-btn 
                      icon
                      @click="remove(bookmark)"
                    >
                      <v-icon>mdi-bookmark-minus</v-icon>
                    </v-btn>
                    
                  </v-toolbar>
                </v-expand-transition>
              </v-list-tile>
            </v-hover>
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
    ...mapGetters(['getBookmarks', 'countedBookmarks', 'getAdvisorId'])
  },
  watch: {
    countedBookmarks: function(val) {
      this.bookmarks = this.getBookmarks.values()
    }
  },
  methods: {
    ...mapActions(['addBookmarks', 'removeBookmark']),
    open (hit) {
      console.log('open ' + hit.id)
      this.$emit('close')
    },
    remove (hit) {
      console.log('delete ' + hit.id)
      this.$deleteBookmark(hit.id, this.getAdvisorId, this.removeBookmark)
      this.$emit('close')
    }
  },
  created () {
    // bookmarks laden
    this.bookmarks = this.$loadBookmarks(this.addBookmarks, this.getAdvisorId)
  } 
}
</script>
