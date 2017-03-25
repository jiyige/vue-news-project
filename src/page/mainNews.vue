<template>
  <div>
    <mt-header fixed title="VueNews">
    <router-link to="/" slot="left">
      <mt-button icon="back">返回</mt-button>
    </router-link>
    </mt-header> 
    <h2 class="news_title" style="margin-top:50px;" v-text='obj.title'></h2>

    <div class="news_body" >
      <img v-bind:src="obj.text_image0" v-bind:class="{ display: isImg }" alt="">
      <img v-bind:src="obj.text_image1" v-bind:class="{ display: isImg }" alt="">
      <div v-html = 'obj.content'></div>
    </div>
  </div>
</template>
<script>
function GetRequest(name) { 
  var url = location.hash; //获取url中"?"符后的字串 
  var arry = url.split("?")[1].split("&");
  //console.log(arry)
  for(var i = 0 ;i < arry.length; i++){
    //console.log(arry[i])
    var tarr = arry[i].split("=")
    //console.log(tarr)
    if(name == tarr[0]){
        return tarr[1];
    } 
  }
} 

import {dateFormat} from 'vux'
export default {
  components: {
    dateFormat
  },
  data () {
    return {
      obj:{},
      isImg:true
    }
  },
  created () {
    // 组件创建完后获取数据，这里和1.0不一样，改成了这个样子
    this.get_data()
  },
  beforeRouteEnter (to,from,next) {
    next(vm => {
      // vm.$store.commit('showHead');
      // vm.get();
    })
  },
  beforeRouteLeave(to,feom,next){
    // this.$store.commit('hideHead');
    next()
  },
  methods: {
    get_data: function (params) {
      var v = this
      if (!params) params = {}
      var id = GetRequest("id");
      var tableNum = GetRequest("tableNum");
      //this.$http.get('http://wangyi.butterfly.mopaasapp.com/detail/api?simpleId=' + id)
      this.$http.jsonp('http://api.dagoogle.cn/news/single-news?tableNum=' + tableNum +'&news_id=' + id,
      {jsonp:'callback', jsonpCallback:'success_jsonpCallback'})
      .then(response => {
        //console.log(response.data.data)
        this.obj = response.data.data
        //console.log(this.obj.content)
        this.obj.content = this.obj.content.replace(/170x220/gi, "340x440")
        if(!response.data.data.content){
          this.isImg = false;
        }else{
          this.isImg = true;
        }
      }, response => {
        console.log(response)
        console.log(response.ok)
        // error callback
      });
    }
  }
}
</script>