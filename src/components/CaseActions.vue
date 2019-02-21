<template>
  <div>
      <v-btn 
        icon
        @click="openCase()"
      >
        <v-icon>mdi-folder-open</v-icon>
      </v-btn>
      <v-dialog v-model="dialog" persistent max-width="600px">
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
            <v-btn flat @click="dialog = false">
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
      dialog: false
    }
  },
  props: {
    case: {
      type: Object
    }
  },
  methods: {
    ...mapActions(['addBookmark']),
    openCase () {
      console.log('open: ' + this.case._id)
    },
    bookmarkCase () {
      console.log('bookmark: ' + this.case._id)
      this.dialog = false
      this.case.comment = this.comment
      this.comment=''
      this.addBookmark(this.case)
    },
    deleteCase () {
      console.log('delete: ' + this.case._id)
    }
  }
}
</script>
