import Vue from 'vue'
import axios from 'axios'
import Router from 'vue-router'
import MainList from '@/pages/MainList'
import TopicList from '@/pages/TopicList'

Vue.use(Router)
Vue.prototype.$axios = axios;

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainList',
      component: MainList
    },
    {
      path: '/topic',
      name: 'TopicList',
      component: TopicList
    }
  ]
})
