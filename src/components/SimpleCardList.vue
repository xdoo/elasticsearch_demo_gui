<template>
<v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex 
        v-bind="{ [`xs${flex}`]: true }" 
        v-for="hit in hits" 
        v-bind:key="hit.id"
      >
        <v-card>
          <v-sheet color="grey" height="150px">
            <v-container
              fill-height
              fluid
              pa-3
            >
              <v-layout fill-height>
                <v-flex xs12 align-end flexbox>
                  <span class="title white--text">{{hit.owner.firstname}} {{hit.owner.lastname}}</span><br>
                  <span class="font-weight-light white--text">(Sachbearbeiter: {{hit.advisor.shorthandSymbol}})</span><br>
                  <v-chip small label class="mt-5">Label</v-chip>
                </v-flex>
              </v-layout>
            </v-container>
          </v-sheet>

          <v-card-title primary-title>
            <div>
              <span>
                {{hit.address.street}} {{hit.address.streetNumber}}<br>
                {{hit.address.sublocality}}<br>
                {{hit.address.postalCode}} {{hit.address.city}}<br>
              </span>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-spacer></v-spacer>
            <case-actions :case="hit"></case-actions>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex
        v-if="hits.length < 1"
      >
        <div class="title font-weight-light text-md-center">Keine Treffer zu Ihrer Suchanfrage.</div>
      </v-flex>
    </v-layout>
  </v-container> 
</template>

<script>
import CaseActions from '@/components/CaseActions'

export default {
  components: {
    CaseActions
  },
  props: {
    hits: {
      type: Array,
      default: []
    }
  },
  computed: {
    flex () {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs': return '12'
        case 'sm': return '6'
        case 'md': return '4'
        case 'lg': return '3'
        case 'xl': return '3'
      }
    }
  },
}
</script>
