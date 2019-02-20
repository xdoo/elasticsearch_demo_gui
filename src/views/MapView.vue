<template>
    <v-container
      fluid
      fill-height
      class="pa-0"
    >
      <case-map></case-map>
      <add-case-button></add-case-button>
    </v-container>   
</template>

<script>
import CaseMap from '@/components/CaseMap.vue'
import AddCaseButton from '@/components/AddCaseButton'

export default {
  name: 'mapView',
  components: {
    CaseMap,
    AddCaseButton
  },
  methods: {
    createNew () {
      console.log('create a new case')
    }
  }
}
</script>
