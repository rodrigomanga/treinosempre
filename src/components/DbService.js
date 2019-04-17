import helpers from '@/components/Helpers'
import moment from 'moment';

export default class DbService {
  constructor() {
    this.treinos = []
    let item = localStorage.getItem("treinosempre")
    if (item) {
      Object.assign(this.treinos, JSON.parse(item))
    }
  }

  getTreinos() {
    return this.treinos
  }

  getTreino (treinoId) {
    var i = this.treinos.findIndex(x => x.id === treinoId)
    if (i < 0) {
      return null
    }
    return this.treinos[i]
  }

  saveTreinos () {
    localStorage.setItem("treinosempre", JSON.stringify(this.treinos))
  }

  novoTreino (nome) {
    var id = helpers.generateUUID()
    this.treinos.push({
      id: id,
      nome: nome,
      data_criacao: moment().format("YYYY-MM-DD"),
      ultimo_treino: null,
      exercicios: [],
      log: []
    });
    this.saveTreinos()
    return id
  }

  novoExercicio (treino, dados) {
    var id = helpers.generateUUID()
    if (!treino.hasOwnProperty("exercicios")) treino.exercicios = []
    treino.exercicios.push({
      id: id,
      nome: dados.nome,
      carga: dados.carga,
      repeticao: dados.repeticao,
      series: dados.series,
      data_criacao: moment().format("YYYY-MM-DD"),
      ultimo_treino: null
    });
    this.saveTreinos()
    // console.log(treino, dados)
    return id
  }
  
  deleteTreino (id) {
    var obj = this.treinos.findIndex(x => x.id === id)
    this.treinos.splice(obj, 1)
    this.saveTreinos()
  }
  deleteExercicio (treino, id) {
    var obj = treino.exercicios.findIndex(x => x.id === id)
    treino.exercicios.splice(obj, 1)
    this.saveTreinos()
  }

  moveExercicio (treino, old_index,new_index) {
    if(
      old_index >= 0 && 
      old_index < treino.exercicios.length &&
      new_index >= 0 &&
      new_index < treino.exercicios.length 
      ) {
        treino.exercicios.splice(new_index, 0, treino.exercicios.splice(old_index, 1)[0])
        this.saveTreinos()
    }
  }

  novoLog(treino, dados) {
    treino.ultimo_treino = moment().format("YYYY-MM-DD HH:mm:ss")
    if(!treino.hasOwnProperty("log")) treino.log = []
    treino.log.push(dados)
    this.saveTreinos()
  }

  importaTreinos (treinos) {
    try {
      var dados = JSON.parse(treinos);
      for (var i = 0; i < dados.length; i++) {
        var exercicios = [];
        if (dados[i].hasOwnProperty("exercicios")) {
          for (var e = 0; e < dados[i].exercicios.length; e++) {
            exercicios.push({
              id: helpers.generateUUID(),
              nome: dados[i].exercicios[e].nome,
              carga: dados[i].exercicios[e].carga,
              repeticao: dados[i].exercicios[e].repeticao,
              series: dados[i].exercicios[e].series,
              data_criacao: dados[i].exercicios[e].data_criacao,
              ultimo_treino: dados[i].exercicios[e].ultimo_treino
            })
          }
        }
        this.treinos.push({
          id: this.generateUUID(),
          nome: dados[i].nome,
          data_criacao: dados[i].data_criacao,
          ultimo_treino: dados[i].ultimo_treino,
          exercicios: exercicios
        })
      }
      this.saveTreinos()
      return true
    } catch (error) {
      console.log("try catch", error)
      return false
    }
  }
}
