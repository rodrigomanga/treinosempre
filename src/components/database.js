var moment = require('moment')
import libs from '@/components/libs'

export default class DbService {
  constructor() {
    this.treinos = []
    let item = localStorage.getItem("treinosempre");
    if (item) {
      Object.assign(this.treinos, JSON.parse(item));
    }
  }

  getTreinos() {
    return this.treinos;
  }

  getTreino (treinoId) {
    var i = this.treinos.findIndex(x => x.id === treinoId);
    if (i < 0) {
      return null;
    }
    return this.treinos[i];
  }

  saveTreinos () {
    localStorage.setItem("treinosempre", JSON.stringify(this.treinos));
  }

  novoTreino (nome) {
    var id = libs.generateUUID();
    this.treinos.push({
      id: id,
      nome: nome,
      data_criacao: moment().format("YYYY-MM-DD"),
      ultimo_treino: null,
      exercicios: []
    });
    this.saveTreinos();
    return id;
  }

  novoExercicio (treino, dados) {
    var id = this.generateUUID();
    if (!this.treino.hasOwnProperty("exercicios")) this.treino.exercicios = [];
    this.treino.exercicios.push({
      id: id,
      nome: dados.nome,
      carga: dados.carga,
      repeticao: dados.repeticao,
      series: dados.series,
      data_criacao: moment().format("YYYY-MM-DD"),
      ultimo_treino: null
    });
    this.saveTreinos();
    // console.log(treino, dados)
    return id;
  }
  
  deleteTreino (id) {
    var obj = this.treinos.findIndex(x => x.id === id);
    this.treinos.splice(obj, 1);
    this.saveTreinos();
  }
  deleteExercicio (treino, id) {
    var obj = treino.exercicios.findIndex(x => x.id === id);
    this.treino.exercicios.splice(obj, 1);
    this.saveTreinos();
  }

  importaTreinos (treinos) {
    try {
      var dados = JSON.parse(treinos);
      for (var i = 0; i < dados.length; i++) {
        var exercicios = [];
        if (dados[i].hasOwnProperty("exercicios")) {
          for (var e = 0; e < dados[i].exercicios.length; e++) {
            exercicios.push({
              id: libs.generateUUID(),
              nome: dados[i].exercicios[e].nome,
              carga: dados[i].exercicios[e].carga,
              repeticao: dados[i].exercicios[e].repeticao,
              series: dados[i].exercicios[e].series,
              data_criacao: dados[i].exercicios[e].data_criacao,
              ultimo_treino: dados[i].exercicios[e].ultimo_treino
            });
          }
        }
        this.treinos.push({
          id: this.generateUUID(),
          nome: dados[i].nome,
          data_criacao: dados[i].data_criacao,
          ultimo_treino: dados[i].ultimo_treino,
          exercicios: exercicios
        });
      }
      this.saveTreinos();
      return true;
    } catch (error) {
      console.log("try catch", error);
      return false;
    }
  }
}
