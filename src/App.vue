<template>
 <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawerUser"
      clipped
      absolute
      right
    > 
      <users-drawer :server="backend"></users-drawer>
    </v-navigation-drawer>
    <v-navigation-drawer
      v-model="drawerResubmission"
      clipped
      absolute
      right
    > 
      <resubmission></resubmission>
    </v-navigation-drawer>
    <v-navigation-drawer
      v-model="drawerBookmarks"
      clipped
      absolute
      right
    > 
      <bookmarks-drawer v-on:close="drawerBookmarks = !drawerBookmarks"></bookmarks-drawer>
    </v-navigation-drawer>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      fixed
      app
    >
      <v-list dense>
        <template v-for="item in items">
          <v-layout
            v-if="item.heading"
            :key="item.heading"
            row
            align-center
          >
            <v-flex xs6>
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-flex>
            <v-flex xs6 class="text-xs-center">
              <a href="#!" class="body-2 black--text">EDIT</a>
            </v-flex>
          </v-layout>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon=""
          >
            <v-list-tile slot="activator">
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
            <v-list-tile
              v-for="(child, i) in item.children"
              :key="i"
            >
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile v-else :key="item.text" :to="item.to">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      color="blue darken-3"
      dark
      app
      fixed
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">Search <span class="font-weight-light">Demo</span></span>
      </v-toolbar-title>
      <!-- 
        Instant Suche
      -->
      <v-text-field
        v-if="getQueryType === 'instant'"
        flat
        solo-inverted
        hide-details
        @keyup="searchnow"
        @click:clear="clear()"
        clearable
        v-model="query"
        prepend-inner-icon="search"
        label="Suche"
        class="hidden-sm-and-down"
      ></v-text-field>
      <!--
        Einfacher Suggester
      -->
      <v-autocomplete
        v-if="getQueryType === 'autocomplete'"
        flat
        solo-inverted
        hide-details
        :search-input.sync="autocompleteSearch"
        @keyup.enter="autocompleteSearchnow"
        :items="suggests"
        append-icon=""
        clearable
        v-model="query"
        prepend-inner-icon="search"
        label="Suche"
        no-filter
        class="hidden-sm-and-down"
      ></v-autocomplete>
      <!--
        Google like Suche
      -->
      <v-autocomplete
        v-if="getQueryType === 'google'"
        flat
        solo-inverted
        hide-details
        :search-input.sync="googleSearch"
        :items="suggests"
        append-icon=""
        clearable
        v-model="query"
        prepend-inner-icon="search"
        label="Suche"
        no-filter
        class="hidden-sm-and-down"
      >
        <template v-slot:no-data>
          <v-list-tile>
            <v-list-tile-title>
              Geben Sie ihre <strong>Suchanfrage</strong> hier ein.
            </v-list-tile-title>
          </v-list-tile>
        </template>
        <template v-slot:item="{ item }">
          <v-list-tile-content>
            <v-list-tile-title>
              <v-icon small v-if="item.type === 'bookmark'">mdi-bookmark</v-icon>
              <v-icon small v-if="item.type === 'search'">mdi-magnify</v-icon>
              <v-icon small v-if="item.type === 'wildcard'">mdi-cards-playing-outline</v-icon>
              <v-icon small v-if="item.type === 'timelapse'">mdi-clock-outline</v-icon>
              {{item.suggestion}}
            </v-list-tile-title>
          </v-list-tile-content>
          <v-list-tile-action>
            <v-chip v-if="item.type === 'bookmark'" label color="grey" text-color="white">
              <v-icon left>mdi-label</v-icon>öffnen
            </v-chip>
          </v-list-tile-action>
        </template>
      </v-autocomplete>
      <v-btn icon>
        <v-icon>mdi-settings</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-chat-alert</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-file-import</v-icon>
      </v-btn>
      <v-badge
        color="accent"
        left
        overlap
      >
        <span slot="badge">{{ parked }}</span>
        <v-btn
          @click.stop="drawerResubmission = !drawerResubmission" 
          icon
          class="ma-0"
        >
          <v-icon>mdi-calendar-clock</v-icon>
        </v-btn>
      </v-badge>
      <v-btn 
        icon
        @click.stop="drawerBookmarks = !drawerBookmarks">
        <v-icon>mdi-bookmark</v-icon>
      </v-btn>
      <v-btn 
        icon 
        large
        @click.stop="drawerUser = !drawerUser"  
      >
        <v-avatar
          size="36px"
        >
        <img
          src="@/assets/altmeier_face.jpg"
          alt="Avatar"
        >
        </v-avatar>
        <!--<v-icon large>mdi-account-circle</v-icon>-->
      </v-btn>
    </v-toolbar>
    <!--
      CONTENT START
     -->
    <v-content>
      <!-- <v-container fluid align-start fill-height class="pa-0"> -->
      <!-- <v-container fluid class="pa-0"> -->
        <router-view/>
      <!-- </v-container> -->
    </v-content>
    <!--
      CONTENT END
     -->
  </v-app>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  import Resubmission from '@/components/Resubmission'
  import BookmarksDrawer from '@/components/BookmarksDrawer'
  import UsersDrawer from '@/components/UsersDrawer'

  export default {
    components: {
      Resubmission,
      BookmarksDrawer,
      UsersDrawer
    },
    data: () => ({
      query: '',
      suggests: [],
      backend: false,
      search: null,
      autocompleteSearch: null,
      googleSearch: null,
      parked: 2,
      dialog: false,
      drawer: null,
      drawerResubmission: false,
      drawerBookmarks: false,
      drawerUser: false,
      items: [
        { icon: 'mdi-map-search', text: 'Geoanzeige', to: '/' },
        { icon: 'mdi-shield-search', text: 'Serversuche', to: '/serversearchview' },
        { icon: 'mdi-chart-donut-variant', text: 'Dashboard', to: '/dashboard' }
      ]
    }),
    props: {
      source: String
    },
    computed: {
      ...mapGetters(['getQueryType', 'getAdvisorId'])
    },
    watch: {
      autocompleteSearch (query) {
        // leere Suchstrings aussortieren
        if(query.length > 0) {
          this.$simpleSuggest(this.setSuggests, query)
        }
      },
      googleSearch (query) {
        // wenn der Nutzer in die Liste klickt, dann
        // kommt ein komplexes Obekt zurück
        if(typeof query === 'object') {
          console.log('googleSearch... ' + JSON.stringify(query))
          this.googleSearchnow (query)
        } else {
          // leere Suchstrings aussortieren
          if(query.length > 0) {
            this.$complexSuggest(this.setSuggests, query, this.getAdvisorId)
          }
        }
      }
    },
    methods: {
      ...mapActions(['pushquery']),
      googleSearchnow (query) {
        if(query !== null) {
          this.query = query.suggestion
          if(query.type === 'search' || query.type === 'wildcard' || query.type === 'timelapse') {
            this.pushquery(query)
          } else if (query.type === 'bookmark') {
            // TODO implement
            console.log('open bookmark with id ' + query.id)
          }
        }
      },
      autocompleteSearchnow () {
        let search = {'suggestion': this.query, 'type': 'search'}
        this.pushquery(search)
      },
      searchnow () {
        console.log('searchnow...' + JSON.stringify(this.query))
        this.pushquery(this.query)
      },
      setSuggests(suggests) {
        this.suggests = suggests
      },
      clear () {
        this.pushquery('')
      },
      open () {
        console.log('pressed open...')
      },
      closeR () {
        this.drawerR = !this.drawerR
        this.parked = 0
      },
      ping () {
        this.$http
        .get('/session/ping')
        .then(response => {
          if(response.data) {
            this.backend = true
          }
        })
      }
    },
    created () {
      // das ist um Heroku aufzuwecken und wach zu halten
      setInterval(this.ping(), 30000)
    }
  }
</script>
