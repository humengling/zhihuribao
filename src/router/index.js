import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)


import index from '../components/pages/index'
import list from '../components/pages/list'
import collection from '../components/pages/collection'
import nav from '../components/pages/nav'
import shortpinglun from '../components/pages/shortpinglun'


export default new Router({
  mode:'history',
  routes: [
    {
      path:'/index',
      component: index
    },
    {
      path:'/list',
      component: list
    },
    {
      path:'/collection',
      component: collection
    },
    {
      path:'/nav',
      component: nav
    },
    {
      path:'/shortpinglun',
      component: shortpinglun
    },
    {
      path:"*",
      redirect:'/index'
    }
  ]
})
