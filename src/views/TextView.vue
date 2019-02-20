<template>
  <div>
    <v-toolbar
      flat
      color="transparent"
    >
      <v-spacer></v-spacer>
      <v-btn 
        icon
        @click="showCards()"  
      >
        <v-icon color="primary">mdi-apps</v-icon>
      </v-btn>
      <v-btn 
        icon
        @click="showList()"
      >
        <v-icon color="primary">mdi-view-list</v-icon>
      </v-btn>
    </v-toolbar>
    <case-list
      v-if="view === 'list'"
    ></case-list>
    <case-cards
      v-if="view === 'cards'"
    ></case-cards>
    <add-case-button></add-case-button>
  </div>
</template>
<script>
import CaseList from '@/components/CaseList'
import CaseCards from '@/components/CaseCards'
import AddCaseButton from '@/components/AddCaseButton'

export default {
  components: {
    CaseList,
    AddCaseButton,
    CaseCards
  },
  data () {
    return {
      view: 'list'
    }
  },
  name: 'ListView',
  methods: {
    createNew () {
      console.log('create a new case')
    },
    showList () {
      this.view = 'list'
    },
    showCards () {
      this.view = 'cards'
    }
  }
}
</script>
