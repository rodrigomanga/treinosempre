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
              <!-- <span class="exercicio" :class="{ 'exercicio-marcado': exercicio.marcado}" @click="exercicio.marcado != exercicio.marcado">{{ index }}-  -->
                {{ exercicio.nome }} 
              <!-- </span> -->
            </td>
            <td>{{ exercicio.carga }}</td>
            <td>{{ exercicio.repeticao }}</td>
            <td>{{ exercicio.series }}</td>
            <td>
              <b-dropdown variant="light" size="sm" no-caret>
                <template slot="button-content">
                  <font-awesome-icon icon="ellipsis-v" />
                </template>
                <b-dropdown-item @click="deleteExercicio(exercicio.id)"><span class="d-inline-block float-left pr-2"><font-awesome-icon icon="trash" /></span>Apagar</b-dropdown-item>
                <b-dropdown-item @click="move_exercicio(index,index-1)"><span class="d-inline-block float-left pr-2"><font-awesome-icon icon="arrow-up" /></span>Sobe</b-dropdown-item>
                <b-dropdown-item @click="move_exercicio(index,index+1)"><span class="d-inline-block float-left pr-2"><font-awesome-icon icon="arrow-down" /></span>Desce</b-dropdown-item>
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
          @click="criarExercicio"
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
import { mapActions, mapGetters } from 'vuex'
import libs from '@/mixins/libs'
import Alert from '@/components/Alert.vue'

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
      treino: []
    }
  },
  mounted () {
    this.id = this.$route.params.id
    this.treino = this.getTreino(this.id)
  },
  mixins: [libs],
  components: {
    Alert
  },
  computed: {
    ...mapGetters([
      'getTreino'
    ])  },
  methods: {
    ...mapActions([
      'addExercicio',
      'delExercicio',
      'moveExercicio'
    ]),
    deleteExercicio (exercicioId){
      const payload = {
        id: exercicioId,
        treino_id: this.id
      }

      this.delExercicio(payload)
      this.$emit('showAlert', {
        mensagem: 'Exercício apagado',
        tipo: 'success',
        tempo: 2000
      });
    },
    move_exercicio (old_index, new_index){
      const payload = {
        old_index: old_index,
        new_index: new_index,
        treino_id: this.id
      }

      this.moveExercicio(payload)
    },
    criarExercicio (){
      if (!this.form.nome) {
        this.$emit('showAlert', {
          mensagem: 'Por favor, digite o nome do exercício',
          tipo: 'danger'
        });
        return
      }
      
      this.$refs.modal_novo_exercicio.hide()
  
      const payload = {
        id: this.generateUUID(),
        nome: this.form.nome,
        carga: this.form.carga,
        repeticao: this.form.repeticao,
        series: this.form.series,
        treino_id: this.id
      }

      this.addExercicio(payload)
      // reset form after submit
      this.form = {
        nome: '',
        carga: 10,
        repeticao: 10,
        series: 4
      }

      this.$emit('showAlert', {
        mensagem: 'Novo exercício adicionado',
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
  color: red !important;
}
</style>
