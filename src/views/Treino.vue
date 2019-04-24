<template>
  <div class="treino-container">
    <div class="row p-2">
      <div class="col">
        <h3 class="d-inline-block">{{ treino.nome }}</h3>
        <!-- <b-button size="sm" variant="primary" @click="copy"><font-awesome-icon icon="copy" /></b-button> -->
        <!-- <b-button size="sm" variant="primary" v-b-modal.modal_paste><font-awesome-icon icon="upload" /></b-button> -->
      </div>
      <div class="col float-right">
        <b-button v-b-modal.modal_novo_exercicio size="sm" variant="outline-primary" class="float-right">Novo exercício</b-button>
        <b-button v-if="marcados.length >0" @click="finalizaTreino()" size="sm" variant="outline-danger" class="float-right mr-2">Finalizar treino</b-button>
      </div>
    </div>
    <div class="table-responsive" v-if="treino && treino.exercicios && treino.exercicios.length>0">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Nome</th>
            <th scope="col"><span class="d-inline-block float-left pr-2"><font-awesome-icon icon="dumbbell" /></span><span class="d-none d-lg-block">Carga</span></th>
            <th scope="col"><span class="d-inline-block float-left pr-2"><font-awesome-icon icon="redo" /></span><span class="d-none d-lg-block">Repetições</span></th>
            <th scope="col"><span class="d-inline-block float-left pr-2"><font-awesome-icon icon="list-ol" /></span><span class="d-none d-lg-block">Séries</span></th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(exercicio, index) in treino.exercicios" :key="index">
            <td>
              <span class="exercicio" :class="{ 'exercicio-marcado': marcados[index]}" @click="marcarExercicio(index)">
                {{ exercicio.nome }} 
              </span>
            </td>
            <td>{{ exercicio.carga }}</td>
            <td>{{ exercicio.repeticao }}</td>
            <td>{{ exercicio.series }}</td>
            <td>
              <b-dropdown variant="light" size="sm" no-caret>
                <template slot="button-content">
                  <font-awesome-icon icon="ellipsis-v" />
                </template>
                <b-dropdown-item @click="apaga(exercicio.id)"><span class="d-inline-block float-left pr-2"><font-awesome-icon icon="trash" /></span>Apagar</b-dropdown-item>
                <b-dropdown-item @click="move(index,index-1)"><span class="d-inline-block float-left pr-2"><font-awesome-icon icon="arrow-up" /></span>Sobe</b-dropdown-item>
                <b-dropdown-item @click="move(index,index+1)"><span class="d-inline-block float-left pr-2"><font-awesome-icon icon="arrow-down" /></span>Desce</b-dropdown-item>
              </b-dropdown>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <h4 v-show="!!!treino.exercicios || !!!treino.exercicios.length">Nenhum exercício disponível</h4>

    <!-- MODALS -->
      <b-modal
      id="modal_novo_exercicio"
      ref="modal_novo_exercicio"
      title="Novo exercício"
      >
      <b-form-group id="inputGroup" label="Nome:" label-for="Input">
        <b-form-input
          id="nome"
          type="text"
          v-model="form.nome"
          required
          placeholder="Digite o nome do novo exercício"
        />
      </b-form-group>
      <b-form-group id="inputGroup" label="Carga:" label-for="Input">
        <b-form-input
          id="carga"
          type="text"
          v-model="form.carga"
          required
          placeholder="Digite a carga ou peso do novo exercício"
        />
      </b-form-group>
      <b-form-group id="inputGroup" label="Repetições:" label-for="Input">
        <b-form-input
          id="repeticao"
          type="text"
          v-model="form.repeticao"
          required
          placeholder="Digite o número de repetições novo exercício"
        />
      </b-form-group>
      <b-form-group id="inputGroup" label="Series:" label-for="Input">
        <b-form-input
          id="series"
          type="text"
          v-model="form.series"
          required
          placeholder="Digite o número de séries novo exercício"
        />
      </b-form-group>
      <div slot="modal-footer" class="w-100">
        <b-button
          variant="primary"
          size="sm"
          class="float-right"
          @click="novo"
        >
          Criar
        </b-button>
      </div>
    </b-modal>
    <!-- FIM MODALS -->
    <Alert />
  </div>
</template>

<script>
import Alert from '@/components/Alert.vue'
import helpers from '@/components/Helpers'

export default {
  name: 'Treino',
  data () {
    return {
      id: null,
      form: {
        nome: '',
        carga: 10,
        repeticao: 10,
        series: 4
      },
      treino: [],
      marcados: [],
      horarios: []
    }
  },
  mounted () {
    this.id = this.$route.params.id
    this.treino = this.$dbService.getTreino(this.id)
  },
  components: {
    Alert
  },
  methods: {
    novo (){
      if (!this.form.nome) {
        this.$emit('showAlert', {
          mensagem: 'Por favor, digite o nome do exercício',
          tipo: 'danger'
        });
        return
      }
      
      this.$refs.modal_novo_exercicio.hide()

      this.$dbService.novoExercicio(this.treino, this.form)
 
      // reset form after submit
      this.form.nome = '';

      this.$emit('showAlert', {
        mensagem: 'Novo exercício adicionado',
        tipo: 'success',
        tempo: 2000
      });
    },
    apaga (exercicioId){
      this.$dbService.deleteExercicio(this.treino, exercicioId)
      this.$emit('showAlert', {
        mensagem: 'Exercício apagado',
        tipo: 'success',
        tempo: 2000
      });
    },
    move (old_index, new_index){
      helpers.moveItem(this.treino, old_index,new_index)
      if(this.marcados.length>0)
        helpers.moveItem(this.marcados, old_index,new_index)
      if(this.horarios.length>0)
        helpers.moveItem(this.horarios, old_index,new_index)
    },
    marcarExercicio (index) {
      this.$set(this.marcados, index, !this.marcados[index])
      if(this.marcados[index]) this.$set(this.horarios, index, this.$moment().format("YYYY-MM-DD HH:mm:ss"))
      else this.$set(this.horarios, index, null)
    },
    finalizaTreino(){
      let dados = []
      this.marcados.forEach( (marcado, index) => {
        if(marcado === true){
          dados.push({
            id: this.treino.exercicios[index].id,
            nome: this.treino.exercicios[index].nome,
            hora: this.horarios[index]
          })
        }
      })
      this.$dbService.novoLog(this.treino, dados)
      this.marcados = []
      this.horarios = []
      this.$emit('showAlert', {
        mensagem: 'Treino gravado com sucesso',
        tipo: 'success',
        tempo: 2000
      });
    }
  }
}
</script>

<style>
.exercicio {
  text-decoration: none;
  color: black;
}
.exercicio-marcado {
  text-decoration: line-through !important;
  color: grey !important;
}
</style>
