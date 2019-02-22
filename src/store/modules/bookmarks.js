const state = {
  bookmarks: new Map([]),
  countBookmarks: 0 
}

const getters = {
  getBookmarkById: (state) => (id) => {
    return state.bookmarks.get(id)
  },
  getBookmarks: (state) => {
    return state.bookmarks
  },
  countedBookmarks: (state) => {
    return state.countBookmarks
  }
}

const mutations = {
  addBookmark (state, payload) {
    state.bookmarks.set(payload._id, payload)
    state.countBookmarks++
    console.log('bookmarks: ' + state.bookmarks.size)
  },
  removeBookmark (state, payload) {
    state.bookmarks.delete(payload._id)
    state.countBookmarks--
  }
}

const actions = {
  addBookmark ({commit}, payload) {
    commit('addBookmark', payload)
  },
  removeBookmark ({commit}, payload) {
    commit('removeBookmark', payload)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}