<template>
  <div>
    <mt-tabbar v-model='select' fixed>
      <mt-tab-item id="news" href='/'>
        <span slot="icon" style="font-size:20px" class='glyphicon glyphicon-list-alt' ></span>
        新闻
      </mt-tab-item>
      <mt-tab-item id="music" href='/#/music'>
        <span slot="icon" style="font-size:20px" class='glyphicon glyphicon-th' ></span>
        音乐
      </mt-tab-item>
      <mt-tab-item id="user" href='/#/user'>
        <span slot="icon" style="font-size:20px" class='glyphicon glyphicon-user' ></span>
        user
      </mt-tab-item>
    </mt-tabbar>
    
    <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>
<script>
import { Group, Cell } from 'vux'
export default {
  components: {
    Group,
    Cell
  },
  data (){
    return{
      select:'news',
    }
  },
  created () {
    // 组件创建完后获取数据
    this.getselect()
  },
  methods: {  
    getselect: function(){
      var url = location.hash;
      //console.log(url)
      if(url == '#/user'){
        this.select = 'user'
      }else if(url == '#/music'){
        this.select = 'music'
      }else{
        this.select = 'news'
      }
    },
  }
}
</script>

<style lang="scss">
  @import "./style/style";
  
</style>

