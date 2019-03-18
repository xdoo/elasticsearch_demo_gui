<template>
  <simple-case-list :hits="hits"></simple-case-list>
</template>
<script>
import SimpleCaseList from '@/components/SimpleCaseList'
import { mapGetters } from 'vuex'

export default {
  components: {
    SimpleCaseList
  },
  data () {
    return {
      bottom: false,
      page: 0,
      totalPages: 1,
      hits: []
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
      let query = this.query
      if(query.length > 1) {
        this.$http
          .get('http://localhost:8081/case/search/'+ query + '/' + this.page)
          .then(response => {
            if (this.page === 0 && !this.bottom){
              // initiale Suche
              this.hits = response.data.content
            } else {
              // infinite scroll
              response.data.content.forEach((hit) => {
                this.hits.push(hit)
              })
            }
            // Paging
            this.page = response.data.pageable.pageNumber + 1
            this.totalPages = response.data.totalPages 
          })
      } else {
        this.hits = []
      }
    },
    bottomVisible() {
        const scrollY = window.scrollY
        const visible = document.documentElement.clientHeight
        const pageHeight = document.documentElement.scrollHeight
        const bottomOfPage = visible + scrollY >= pageHeight
        return bottomOfPage || pageHeight < visible
      }
  }
}
</script>
