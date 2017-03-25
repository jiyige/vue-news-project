// 引用 vue 
import Vue from 'vue'
// 引用路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)


//引入mint-ui插件
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(Mint)

//ajax
import VueResource from 'vue-resource'
Vue.use(VueResource)

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
Vue.use(ElementUI)
// 入口文件为 src/App.vue 文件 
import App from './App.vue'
// 引用路由配置文件
import routes from './config/routes'



//添加Fastclick移除移动端点击延迟
const FastClick = require('fastclick')
FastClick.attach(document.body)


// 使用配置文件规则
const router = new VueRouter({
  routes
})
/* eslint-disable no-new */
var vm = new Vue({
  router,
  el: '#app',
  render: h => h(App)
})
