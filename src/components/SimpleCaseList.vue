<template>
    <v-container grid-list-sm>
      <v-layout align-start justify-start row wrap>
        <v-flex 
          xs12 
          v-for="hit in hits"
          v-bind:key="hit.id" 
        >
          <v-card
            flat
          >
            <v-card-title primary-title>
              <v-layout>
                <v-flex xs9>
                  <div>
                    <div class="title">{{hit.owner.firstname}} {{hit.owner.lastname}} <span class="font-weight-light">(Sachbearbeiter: {{hit.advisor.shorthandSymbol}})</span></div>
                    <div>
                      {{hit.address.street}} {{hit.address.streetNumber}}, {{hit.address.postalCode}} {{hit.address.city}} {{hit.address.sublocality}}
                    </div>
                  </div>
                </v-flex>
                <v-flex xs3>
                  <v-spacer></v-spacer>
                  <case-actions :case="hit"></case-actions>
                </v-flex>
              </v-layout>
            </v-card-title>
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
  }
}
</script>
