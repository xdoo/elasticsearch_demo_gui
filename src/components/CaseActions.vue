<template>
  <div>
      <v-btn 
        icon
        @click="openCase()"
      >
        <v-icon>mdi-folder-open</v-icon>
      </v-btn>
      <v-dialog v-model="bookmarkDialog" persistent max-width="600px">
        <v-btn 
          icon
          slot="activator"
        >
          <v-icon>mdi-bookmark-plus</v-icon>
        </v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">Fall merken</span>
          </v-card-title>
          <v-card-text>
            <v-textarea
              outline
              name="comment"
              label="Schreiben Sie kurz, warum Sie sich diesen Fall merken wollen."
              v-model="comment"
            ></v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat @click="bookmarkDialog = false">
              abbrechen
              <v-icon right dark>mdi-close</v-icon>
            </v-btn>
            <v-btn color="primary" flat @click="bookmarkCase()">
              merken
              <v-icon right dark>mdi-bookmark-plus</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="shareDialog" persistent max-width="600px">
        <v-btn 
          icon
          slot="activator"
        >
          <v-icon>mdi-share-variant</v-icon>
        </v-btn>
        <v-card>
          <v-card-title>
            <span class="headline">Fall weiter leiten</span>
          </v-card-title>
          <v-card-text>
            <v-autocomplete
              v-model="advisorId"
              :items="advisors"
              label="Sachbearbeitung"
            ></v-autocomplete>
            <v-textarea
              outline
              name="comment"
              label="Schreiben Sie kurz, warum Sie sich diesen Fall weiter leiten wollen."
              v-model="comment"
            ></v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat @click="shareDialog = false">
              abbrechen
              <v-icon right dark>mdi-close</v-icon>
            </v-btn>
            <v-btn color="primary" flat @click="shareCase()">
              Weiter leiten
              <v-icon right dark>mdi-share-variant</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-btn 
        icon
        @click="deleteCase()"
      >
       <v-icon>mdi-delete</v-icon>
      </v-btn>  
  </div>   
</template>
<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      comment: '',
      advisorId: '',
      bookmarkDialog: false,
      shareDialog: false,
      advisors: []
    }
  },
  props: {
    case: {
      type: Object
    }
  },
  created: function () {
    this.loadAdvisors()
  },
  methods: {
    ...mapActions(['addBookmark']),
    openCase () {
      console.log('open: ' + this.case._id)
    },
    bookmarkCase () {
      console.log('bookmark: ' + this.case._id)
      this.bookmarkDialog = false
      this.case.comment = this.comment
      this.comment=''
      this.addBookmark(this.case)
    },
    shareCase () {
      console.log('share: ' + this.case._id)
      this.shareDialog = false
      this.case.comment = this.comment
      this.case.advisorId = this.advisorId
      // an das Backend senden...
      console.log(this.case)
    },
    deleteCase () {
      console.log('delete: ' + this.case._id)
    },
    loadAdvisors () {
      this.$search.search({
        index: 'advisors',
        body: {
          query: {
            match_all: {}
          }
        }
      })
      .then(result => {
        result.hits.hits.forEach((hit) => {
          let advisor = {}
          advisor.value = hit._id
          advisor.text = hit._source.firstname + ' ' + hit._source.lastname + ' (' + hit._source.shorthandSymbol + ')'
          this.advisors.push(advisor)
        })
      })
    }
  }
}
</script>
