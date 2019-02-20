<template>
    <v-container
      fluid
      fill-height
      class="pa-0"
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
    </v-container>   
</template>

<script>
import CaseMap from '@/components/CaseMap.vue'

export default {
  name: 'mapView',
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
