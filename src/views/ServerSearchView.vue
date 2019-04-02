<template>
  <div>
    <v-toolbar
      flat
      color="transparent"
    >
      <v-spacer></v-spacer>
      <v-btn 
        icon
        @click="showCards()"  
      >
        <v-icon color="primary">mdi-apps</v-icon>
      </v-btn>
      <v-btn 
        icon
        @click="showList()"
      >
        <v-icon color="primary">mdi-view-list</v-icon>
      </v-btn>
    </v-toolbar>
    <simple-case-list
      v-if="view === 'list'" 
      :hits="hits"
    ></simple-case-list>
    <simple-card-list
      v-if="view === 'cards'" 
      :hits="hits"
    ></simple-card-list>
    <add-case-button></add-case-button>
  </div>
</template>
<script>
import SimpleCaseList from '@/components/SimpleCaseList'
import SimpleCardList from '@/components/SimpleCardList'
import AddCaseButton from '@/components/AddCaseButton'
import { mapGetters } from 'vuex'

export default {
  components: {
    SimpleCaseList,
    SimpleCardList,
    AddCaseButton
  },
  data () {
    return {
      bottom: false,
      page: 0,
      totalPages: 1,
      hits: [],
      view: 'list'
    }
  },
  computed: {
    ...mapGetters(['query']),
    options () {
      return {
        duration: 620,
        offset: 0,
        easing: 'easeInOutQuad'
      }
    }
  },
  watch: {
    query: function (val) {
      // reset infinite scroll
      this.bottom = false
      this.page = 0
      this.totalPages = 1
      // nach oben scrollen
      this.$vuetify.goTo(0, this.options)
      // suchen
      this.search()
    },
    bottom: function (val) {
      let x = val && this.page < this.totalPages
      if (val && this.page < this.totalPages) {
        this.search()
      }
    }
  },
  created: function () {
    // Vorbereitung für infinite scroll
    window.addEventListener('scroll', () => {
      this.bottom = this.bottomVisible()
    })
    // initiale Suche ausführen
    this.search()
  },
  methods: {
    search () {
      if(typeof this.query === 'object' && this.query !== null) {
        // Suche nach einem Completion Vorschlag
        console.log('search view -> google / autocomplete search')
        let query = this.query.suggestion
        this.$pageSuggestionSearch(this.setResult, query, this.page)
      } else if (this.query !== null) {
        console.log('search view -> normal search')
        let query = this.query
        if(query.length > 1) {
          this.$pageSearch(this.setResult, query, this.page)
        } else {
          this.hits = []
        }
      }
    },
    setResult(result) {
      if (this.page === 0 && !this.bottom){
        // initiale Suche
        this.hits = result.content
      } else {
        // infinite scroll
        result.content.forEach((hit) => {
          this.hits.push(hit)
        })
      }
      // Paging
      this.page = result.pageable.pageNumber + 1
      this.totalPages = result.totalPages
    },
    bottomVisible() {
        const scrollY = window.scrollY
        const visible = document.documentElement.clientHeight
        const pageHeight = document.documentElement.scrollHeight
        const bottomOfPage = visible + scrollY >= pageHeight
        return bottomOfPage || pageHeight < visible
    },
    showList () {
      this.view = 'list'
    },
    showCards () {
      this.view = 'cards'
    }
  }
}
</script>
