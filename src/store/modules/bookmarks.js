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
    this.$http
    .put('/case/bookmark/'+payload.id+'/7RWOAUUMIHYYTZGLFRJSMRGRYAX9QAYBJDF')
    .then(response => {
      commit('addBookmark', payload)
    })
  },
  removeBookmark ({commit}, payload) {
    this.$http
    .delete('/case/bookmark/'+payload.id+'/7RWOAUUMIHYYTZGLFRJSMRGRYAX9QAYBJDF')
    .then(response => {
      commit('removeBookmark', payload)
    })
  },
  loadBookmarks ({commit}) {
    this.$http
    .get('/case/bookmark/7RWOAUUMIHYYTZGLFRJSMRGRYAX9QAYBJDF/0')
    .then(response => {
      commit('addBookmarks', response.data.content)
    })
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}