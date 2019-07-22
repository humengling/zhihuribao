// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//完整引入ui移动端框架【mint-ui】
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

//无限滚动
import { InfiniteScroll } from 'mint-ui';
Vue.use(InfiniteScroll);



//api
// import api from './public/API'


//引入axios【调接口数据】
import axios from 'axios'
Vue.prototype.$http=axios;    

//引入重置样式等
import './assets/css/base.css'
import './assets/css/iconfont.css'
import './assets/js/rem'


//mint-ui因为是全局引入，故而在main.js无需再次引用


//引入公共组件




Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App},
  template: '<App/>'
})
