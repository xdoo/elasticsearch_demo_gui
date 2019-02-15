const state = {
    snack: '',
    color: ''
  }
  
  const getters = {
    getSnack (state) {
      return state.snack
    },
    getColor (state) {
      return state.color
    }
  }
  
  const mutations = {
    setSnack (state, payload) {
      state.snack = payload.text
      state.color = payload.color
    }
  }
  
  const actions = {
    setSnack ({commit}, payload) {
      commit('setSnack', payload)
    }
  }
  
  export default {
    state,
    getters,
    mutations,
    actions
  }