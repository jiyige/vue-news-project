// 引用模板
import index from '../page/index.vue'
import music from '../page/music.vue'

import mainNews from '../page/mainNews.vue'

import user from '../page/user.vue'
// 配置路由
export default [
  {
    path: '/',
    component: index,
    meta:{
      keepAlive:true
    }
  },
  {
    path: '/music',
    component: music,
    meta:{
      keepAlive:false
    }
  },
  {
    path: '/mainNews',
    component: mainNews,
    meta:{
      keepAlive:false
    }
  },
  {
    path:'/user',
    component: user
  }
]