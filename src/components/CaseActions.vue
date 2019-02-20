<template>
  <div>
      <v-btn 
        icon
        @click="openCase()"
      >
        <v-icon>mdi-folder-open</v-icon>
      </v-btn>
      <v-btn 
        icon
        @click="parkCase()"
      >
        <v-icon>mdi-timelapse</v-icon>
      </v-btn>
      <v-btn 
        icon
        @click="deleteCase()"
      >
       <v-icon>mdi-delete</v-icon>
      </v-btn>  
  </div>   
</template>
<script>
export default {
  props: {
    caseId: {
      type: String
    }
  },
  methods: {
    openCase () {
      console.log('open' + this.caseId)
    },
    parkCase () {
      console.log('park' + this.caseId)
    },
    deleteCase () {
      console.log('delete' + this.caseId)
    }
  }
}
</script>
