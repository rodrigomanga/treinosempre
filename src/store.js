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
      const posicao = state.treinos.findIndex(objeto => objeto.id === payload.treino_id)
      if (posicao >= 0) {
        const exercicio = {
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
    delTreino: (state, payload) => {
      const posicaoTreino = state.treinos.findIndex(objeto => objeto.id === payload.id)
      if (posicaoTreino >= 0) {
        state.treinos.splice(posicaoTreino, 1)
        localStorage.setItem('treinosempre', JSON.stringify(state))
      }
    },
    delExercicio: (state, payload) => {
      const posicaoTreino = state.treinos.findIndex(objeto => objeto.id === payload.treino_id)
      if (posicaoTreino >= 0) {
        const posicaoExercicio = state.treinos[posicaoTreino].exercicios.findIndex(objeto => objeto.id === payload.id)
        if (posicaoExercicio >= 0) {
          state.treinos[posicaoTreino].exercicios.splice(posicaoExercicio, 1)
          localStorage.setItem('treinosempre', JSON.stringify(state))
        }
      }
    },
    moveExercicio: (state, payload) => {
      const posicaoTreino = state.treinos.findIndex(objeto => objeto.id === payload.treino_id)
      if (posicaoTreino >= 0) {
        if(
          payload.old_index >= 0 && 
          payload.old_index < state.treinos[posicaoTreino].exercicios.length &&
          payload.new_index >= 0 &&
          payload.new_index < state.treinos[posicaoTreino].exercicios.length 
          ) {
            state.treinos[posicaoTreino].exercicios.splice(payload.new_index, 0, state.treinos[posicaoTreino].exercicios.splice(payload.old_index, 1)[0]);
            localStorage.setItem('treinosempre', JSON.stringify(state))
          }
      }
    }
  },
  actions: {
    addTreino: ({ commit }, payload) => {
      commit("addTreino", payload)
    },
    addExercicio: ({ commit }, payload) => {
      commit("addExercicio", payload)
    },
    delTreino: ({ commit }, payload) => {
      commit("delTreino", payload)
    },
    delExercicio: ({ commit }, payload) => {
      commit("delExercicio", payload)
    },
    moveExercicio: ({ commit }, payload) => {
      commit("moveExercicio", payload)
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
