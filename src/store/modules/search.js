const state = {
    query: '',
    type: 'instant'
  }
  
  const getters = {
    query (state) {
      return state.query
    },
    getQueryType (state) {
      return state.type
    }
  }
  
  const mutations = {
    setQuery (state, payload) {
      state.query = payload
    },
    setQueryType (state, payload) {
      state.type = payload
    }
  }
  
  const actions = {
    pushquery ({ commit }, payload) {
      commit('setQuery', payload)
    },
    instantQuery({commit}) {
      commit('setQueryType', 'instant')
    },
    autocompleteQuery({commit}) {
      commit('setQueryType', 'autocomplete')
    }
  }
  
  export default {
    state,
    getters,
    mutations,
    actions
  }