import Vue from 'vue'
import Vuex from 'vuex'

import session from './modules/session'
import search from './modules/search'
import snackbar from './modules/snackbar'
import bookmarks from './modules/bookmarks'
import filters from './modules/filters'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    session,
    search,
    snackbar,
    bookmarks,
    filters
  }
})