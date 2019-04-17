import Vue from 'vue'
import Router from 'vue-router'
import Inicio from '@/views/Inicio'
import Treinos from '@/views/Treinos'
//import Treino from '@/views/Treino'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Inicio',
      component: Inicio
    },
    {
      path: '/treinos',
      name: 'Treinos',
      component: Treinos
    }
    // ,
    // {
    //   path: '/Treino/:id',
    //   name: 'Treino',
    //   component: Treino
    // }
  ]
})
