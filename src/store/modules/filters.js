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
    addMyCaseFilter ({commit}, payload) {
      if(!payload || 0 === payload.length) {
        commit('setMyCaseFilter', '_')
      } else {
        commit('setMyCaseFilter', payload)
      }
    },
    removeMyCaseFilter ({commit}, payload) {
      commit('setMyCaseFilter', '_')
    }
  }
  
  export default {
    state,
    getters,
    mutations,
    actions
  }