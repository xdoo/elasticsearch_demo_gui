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
    state.bookmarks.set(payload.id, payload)
    state.countBookmarks++
    console.log('bookmarks: ' + state.bookmarks.size)
  },
  removeBookmark (state, payload) {
    state.bookmarks.delete(payload.id)
    state.countBookmarks--
  },
  addBookmarks (state, payload) {
    payload.array.forEach(element => {
      state.bookmarks.set(element.id, element)
    });
  }
}

const actions = {
  addBookmark ({commit}, payload) {
    commit('addBookmark', payload)
  },
  removeBookmark ({commit}, payload) {
    commit('removeBookmark', payload)
  },
  loadBookmarks ({commit}, payload) {
    commit('addBookmarks', payload)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}