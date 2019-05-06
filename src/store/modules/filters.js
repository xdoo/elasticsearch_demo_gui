const state = {
    myCaseFilter: '_'
  }
  
  const getters = {
    getMyCaseFilter (state) {
      return state.myCaseFilter
    }
  }
  
  const mutations = {
    setMyCaseFilter (state, payload) {
      state.myCaseFilter = payload
    }
  }
  
  const actions = {
    setMyCaseFilter ({commit}, payload) {
      if(!payload || 0 === payload.length) {
        commit('setMyCaseFilter', '_')
      } else {
        commit('setMyCaseFilter', payload)
      }
    }
  }
  
  export default {
    state,
    getters,
    mutations,
    actions
  }