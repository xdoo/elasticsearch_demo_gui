<template>
      <v-layout row wrap>
        <v-flex xs12>
          <div class="pt-5 mt-5 ml-3">
            <span class="display-1 font-weight-light">Such Filter</span>
            <span class="title font-weight-light">Hier können Sie die Datenbasis für die Suche einschränken.</span>
          </div>
        </v-flex>

        <v-flex xs12 class="ma-3">
          foo
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
