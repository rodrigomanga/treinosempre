<template>
  <div class="treinos">
    <div class="row p-2">
      <div class="col">
        <h3 class="d-inline-block">Meus treinos</h3>
        <!-- <b-button size="sm" variant="primary" @click="copy"><font-awesome-icon icon="copy" /></b-button> -->
        <!-- <b-button size="sm" variant="primary" v-b-modal.modal_paste><font-awesome-icon icon="upload" /></b-button> -->
      </div>
      <div class="col float-right">
        <b-button v-b-modal.modal_novo_treino size="sm" variant="outline-primary" class="float-right">Novo treino</b-button>
      </div>
    </div>
    <div class="table-responsive">
      <table class="table">
        <thead>
          <tr v-show="treinos.length>0">
            <th scope="col">Nome</th>
            <th scope="col">Último treino</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="treino in treinos" :key="treino.index">
            <td><router-link :to="{ name: 'Treino', params: { id: treino.id }}">{{ treino.nome }}</router-link></td>
            <td><span v-if="treino.ultimo_treino">{{ treino.ultimo_treino | moment('DD/MM/YYYY') }} ({{ treino.ultimo_treino | moment("from", "now") }})</span></td>
            <td>
              <b-dropdown variant="light" size="sm" no-caret>
                <template slot="button-content">
                  <font-awesome-icon icon="ellipsis-v" />
                </template>
                <b-dropdown-item :to="{ name: 'Treino', params: { id: treino.id }}"><span class="d-inline-block float-left pr-2"><font-awesome-icon icon="edit" /></span>Editar</b-dropdown-item>
                <b-dropdown-item @click="deleteTreino(treino.id)"><span class="d-inline-block float-left pr-2"><font-awesome-icon icon="trash" /></span>Apagar</b-dropdown-item>
              </b-dropdown>
            </td>
          </tr>
          <tr>
            <td colspan="4" v-show="!!!treinos.length"><h4>Nenhum treino disponível</h4></td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- MODALS -->
    <b-modal
      id="modal_novo_treino"
      ref="modal_novo_treino"
      title="Novo treino"
      >
      <b-form-group id="inputGroup" label="Nome:" label-for="Input">
        <b-form-input
          id="nome"
          type="text"
          v-model="form.nome"
          required
          placeholder="Digite o nome do novo treino" />
      </b-form-group>      
      <div slot="modal-footer" class="w-100">
        <b-button
          variant="primary"
          size="sm"
          class="float-right"
          @click="criarTreino"
        >
          Criar
        </b-button>
      </div>
    </b-modal>
    <!-- FIM MODALS -->
    <Alert/>
  </div>
</template>

<script>
import Alert from '@/components/Alert.vue'

export default {
  name: 'Treinos',
  data () {
    return {
      form: {
        nome: ''
      },
      treinos:[]
    }
  },
  components: {
    Alert
  },
  mounted () {
    this.treinos = this.$dbService.getTreinos()
  },
  methods: {
    deleteTreino (treinoId){
      this.$dbService.deleteTreino(treinoId)
      this.$emit('showAlert', {
        mensagem: 'Treino apagado',
        tipo: 'success',
        tempo: 2000
      });
    },
    criarTreino (){
      if (!this.form.nome) {
        this.$emit('showAlert', {
          mensagem: 'Por favor, digite o nome do treino',
          tipo: 'danger'
        });
        return
      }
      
      this.$refs.modal_novo_treino.hide()

      this.$dbService.novoTreino(this.form.nome)
 
      // reset form after submit
      this.form = {
        nome: ''
      }

      this.$emit('showAlert', {
        mensagem: 'Novo treino adicionado',
        tipo: 'success',
        tempo: 2000
      });
    }
  }
}
</script>
