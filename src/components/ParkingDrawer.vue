<template>
      <v-layout row wrap>
        <v-flex xs12>
          <div class="pt-5 mt-5 ml-3">
            <span class="display-1 font-weight-light">Fälle in Bearbeitung</span>
          </div>
        </v-flex>
        <v-flex xs12>
          <v-list dense two-line class="pt-2">
            <v-list-tile 
              avatar
              @click="open()">
              <v-list-tile-content>
                <v-list-tile-title>Michael Hickman (DMU)</v-list-tile-title>
                <v-list-tile-sub-title>Werdenfelsstraße 57, 81377 München (Sendling-Westpark)</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>

            <v-list-tile avatar @click="open()">
              <v-list-tile-content>
                <v-list-tile-title>Jeremy Franklin (PME)</v-list-tile-title>
                <v-list-tile-sub-title>Urbanstraße 22, 81371 München (Sendling)</v-list-tile-sub-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-flex>
      </v-layout>
</template>
<script>
export default {}
</script>

