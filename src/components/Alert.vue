<template>
    <div id="alert-container">
        <b-modal v-model="show" hide-footer hide-header body-class="p-0">
            <b-alert
            dismissible
            :variant="tipo"
            v-model="show"
            class="mb-0"
            >
            {{ mensagem }}
            </b-alert>
        </b-modal>
    </div>
</template>

<script>
import { setTimeout } from 'timers';
export default {
    data() {
        return {
            mensagem: '',
            tipo: 'danger',
            show: false,
            tempo: 3000
        }
    },
    methods: {
        showAlert: function(params) {
            this.mensagem = params.mensagem
            if ( params.hasOwnProperty('tipo') ) {
                this.tipo = params.tipo
            }
            if ( params.hasOwnProperty('tempo') ) {
                this.tempo = params.tempo
            }
            this.show = true
            setTimeout(() => this.show=false, this.tempo);
        }
    },
    created: function() {
        this.$parent.$on('showAlert', this.showAlert);
    }
}
</script>
