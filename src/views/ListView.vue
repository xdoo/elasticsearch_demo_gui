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
  </div>
</template>
<script>
import CaseList from '@/components/CaseList'

export default {
  components: {
    CaseList
  },
  name: 'ListView'
}
</script>
