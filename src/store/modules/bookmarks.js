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
  },
  removeBookmark (state, payload) {
    state.bookmarks.delete(payload)
    state.countBookmarks--
  },
  addBookmarks (state, payload) {
    payload.forEach(element => {
      state.bookmarks.set(element.id, element)
      state.countBookmarks++
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
  addBookmarks ({commit}, payload) {
    commit('addBookmarks', payload)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}