<template>
  <div>
    <v-toolbar
      flat
      color="transparent"
    >
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon color="primary">mdi-apps</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon color="primary">mdi-view-list</v-icon>
      </v-btn>
    </v-toolbar>
    <case-list></case-list>
    <add-case-button></add-case-button>
  </div>
</template>
<script>
import CaseList from '@/components/CaseList'
import AddCaseButton from '@/components/AddCaseButton'

export default {
  components: {
    CaseList,
    AddCaseButton
  },
  name: 'ListView',
  methods: {
    createNew () {
      console.log('create a new case')
    }
  }
}
</script>
