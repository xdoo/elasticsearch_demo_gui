<template>
<v-sheet
          class="d-flex"
          color="grey lighten-3"
          height="100%"
          width="100%"
        >
          <case-map></case-map>
        </v-sheet>
</template>

<script>
// @ is an alias to /src
import CaseMap from '@/components/CaseMap.vue'

export default {
  name: 'home',
  components: {
    CaseMap
  }
}
</script>
