<template>
      <v-container grid-list-sm>
        <v-layout align-start justify-start row wrap>
          <v-flex xs12>
            <v-card dark color="primary">
              <v-card-text>one</v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs12>
            <v-card dark color="primary">
              <v-card-text>one</v-card-text>
            </v-card>
          </v-flex>
          <v-flex xs12>
            <v-card dark color="primary">
              <v-card-text>one</v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
</template>
<script>
export default {
  name: 'ListView',
  computed: {
      binding () {
        const binding = {}

        if (this.$vuetify.breakpoint.mdAndUp) binding.column = true

        return binding
      }
    } 
}
</script>
