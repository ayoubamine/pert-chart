import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Pert from '@/components/Pert'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/pert',
      name: 'pert',
      component: Pert,
      props: true
    }
  ]
})
