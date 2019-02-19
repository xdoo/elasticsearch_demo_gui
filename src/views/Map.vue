<template>
    <v-sheet
      class="d-flex"
      color="grey lighten-3"
      height="100%"
      width="100%"
    >
      <case-map></case-map>
      <v-btn
        fab
        bottom
        right
        color="pink"
        dark
        fixed
        @click="createNew()"
      >
        <v-icon>add</v-icon>
      </v-btn>
    </v-sheet>   
</template>

<script>
import CaseMap from '@/components/CaseMap.vue'

export default {
  name: 'home',
  components: {
    CaseMap
  },
  methods: {
    createNew () {
      console.log('create a new case')
    }
  }
}
</script>
