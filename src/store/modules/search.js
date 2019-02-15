const state = {
    query: ''
  }
  
  const getters = {
    query (state) {
      return state.query
    }
  }
  
  const mutations = {
    setQuery (state, payload) {
      state.query = payload
    }
  }
  
  const actions = {
    pushquery ({ commit }, payload) {
      commit('setQuery', payload)
    }
  }
  
  export default {
    state,
    getters,
    mutations,
    actions
  }