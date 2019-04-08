import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    treinos: [
      {
        id: 'ad01f833-61e7-4214-a986-f3f0b171a701',
        nome: 'Treino A',
        ultimo_treino: '2019-04-01'
      },
      {
        id: 'ad01f833-61e7-4214-a986-f3f0b171a702',
        nome: 'Treino B',
        ultimo_treino: '2019-04-02'
      }
    ]
  },
  mutations: {
    addTreino: (state, treino) => {
      state.treinos.push(treino)
    }
  },
  actions: {
    addTreino: ({ commit }, payload) => {
      commit('addTreino', payload)
    }
  },
  getters : {
    treinosCount: (state) => {
      return state.treinos.length
    }
  }
})
