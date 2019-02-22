<template>
 <v-app id="inspire">
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
      <v-text-field
        flat
        solo-inverted
        hide-details
        @keyup="keymonitor"
        @click:clear="clear()"
        clearable
        v-model="query"
        prepend-inner-icon="search"
        label="Search"
        class="hidden-sm-and-down"
      ></v-text-field>
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
      <v-btn icon large>
        <v-icon large>mdi-account-circle</v-icon>
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
  import { mapActions } from 'vuex'
  import Resubmission from '@/components/Resubmission'
  import BookmarksDrawer from '@/components/BookmarksDrawer'

  export default {
    components: {
      Resubmission,
      BookmarksDrawer
    },
    data: () => ({
      query: '',
      parked: 2,
      dialog: false,
      drawer: null,
      drawerResubmission: false,
      drawerBookmarks: false,
      items: [
        { icon: 'mdi-map-search', text: 'Geoanzeige', to: '/' },
        { icon: 'mdi-table-search', text: 'Textanzeige', to: '/listview' },
        { icon: 'mdi-chart-donut-variant', text: 'Dashboard', to: '/dashboard' }
      ]
    }),
    props: {
      source: String
    },
    methods: {
      ...mapActions(['pushquery']),
      keymonitor () {
        this.pushquery(this.query)
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
      }
    }
  }
</script>
