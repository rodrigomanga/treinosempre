import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    treinos: []
  },
  mutations: {
    initStore: (state) => {
      let item = localStorage.getItem('treinosempre')
      if(item) {
				// Replace the state object with the stored item
				Object.assign(state, JSON.parse(item))
			}
    },
    addTreino: (state, treino) => {
      state.treinos.push(treino)
      localStorage.setItem('treinosempre', JSON.stringify(state))
    },
    addExercicio: (state, payload) => {
      console.log('payload',payload)
      const posicao = state.treinos.findIndex(objeto => objeto.id === payload.treino_id)
      if (posicao >= 0) {
        let exercicio = {
          id: payload.id,
          nome: payload.nome,
          carga: payload.carga,
          repeticao: payload.repeticao,
          series: payload.series
        }
        state.treinos[posicao].exercicios.push(exercicio)
        localStorage.setItem('treinosempre', JSON.stringify(state))
      }
    },
    
  },
  actions: {
    addTreino: ({ commit }, payload) => {
      commit("addTreino", payload)
    },
    addExercicio: ({ commit }, treinoId, payload) => {
      commit("addExercicio", treinoId, payload)
    }
  },
  getters: {
    treinosCount: state => {
      return state.treinos.length
    },
    getTreino: (state) => (treinoId) => {
      const posicao = state.treinos.findIndex(objeto => objeto.id === treinoId)
      if (posicao < 0) {
        return null
      }
      return state.treinos[posicao]
    }
  }
});
