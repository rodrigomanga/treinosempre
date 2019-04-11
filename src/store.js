import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    treinos: []
  },
  mutations: {
    INIT_STORE: (state) => {
      let item = localStorage.getItem('treinosempre')
      if(item) {
				// Replace the state object with the stored item
				Object.assign(state, JSON.parse(item))
			}
    },
    ADD_TREINO: (state, treino) => {
      state.treinos.push(treino)
      localStorage.setItem('treinosempre', JSON.stringify(state))
    },
    ADD_EXERCICIO: (state, payload) => {
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
    DEL_TREINO: (state, payload) => {
      const posicaoTreino = state.treinos.findIndex(objeto => objeto.id === payload.id)
      if (posicaoTreino >= 0) {
        state.treinos.splice(posicaoTreino, 1)
        localStorage.setItem('treinosempre', JSON.stringify(state))
      }
    },
    DEL_EXERCICIO: (state, payload) => {
      const posicaoTreino = state.treinos.findIndex(objeto => objeto.id === payload.treino_id)
      if (posicaoTreino >= 0) {
        const posicaoExercicio = state.treinos[posicaoTreino].exercicios.findIndex(objeto => objeto.id === payload.id)
        if (posicaoExercicio >= 0) {
          state.treinos[posicaoTreino].exercicios.splice(posicaoExercicio, 1)
          localStorage.setItem('treinosempre', JSON.stringify(state))
        }
      }
    },
    // moveExercicio: (state, payload) => {
    //   const posicaoTreino = state.treinos.findIndex(objeto => objeto.id === payload.treino_id)
    //   if (posicaoTreino >= 0) {
    //     if(
    //       payload.old_index >= 0 && 
    //       payload.old_index < state.treinos[posicaoTreino].exercicios.length &&
    //       payload.new_index >= 0 &&
    //       payload.new_index < state.treinos[posicaoTreino].exercicios.length 
    //       ) {
    //         state.treinos[posicaoTreino].exercicios.splice(payload.new_index, 0, state.treinos[posicaoTreino].exercicios.splice(payload.old_index, 1)[0]);
    //         localStorage.setItem('treinosempre', JSON.stringify(state))
    //       }
    //   }
    // }
    SET_TREINOS: (state, payload) => {
      state.treinos = payload
    }
  },
  actions: {
    initStore: ({ commit }) => {
      commit("INIT_STORE")
    },
    addTreino: ({ commit }, payload) => {
      commit("ADD_TREINO", payload)
    },
    addExercicio: ({ commit }, payload) => {
      commit("ADD_EXERCICIO", payload)
    },
    delTreino: ({ commit }, payload) => {
      commit("DEL_TREINO", payload)
    },
    delExercicio: ({ commit }, payload) => {
      commit("DEL_EXERCICIO", payload)
    },
    // moveExercicio: ({ commit }, payload) => {
    //   commit("moveExercicio", payload)
    // }
    moveExercicio (context, payload) {
      let state = context.state;
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
      //context.commit("setTreinos", state.treinos)
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
