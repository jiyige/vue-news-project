<template>
   <div>
      <div class="row" v-for="name in musicTabName" >
        <div class="col-xs-6 col-md-3">
          <a href="#" class="thumbnail">
            {{name}}
            <img src="" alt="">
          </a>
        </div>
      </div>
  </div>
  
</template>
<script>
  export default {
    data () {
      return {
        value:'',
        result:[],
        //	type = 1-新歌榜,2-热歌榜,11-摇滚榜,12-爵士,16-流行,21-欧美金曲榜,22-经典老歌榜,23-情歌对唱榜,24-影视金曲榜,25-网络歌曲榜
        musicTab:[1,2,11,12,16,21,22,23,24,25],
        musicTabName:['新歌榜','热歌榜','摇滚榜','爵士榜','流行榜','欧美金曲榜','经典老歌榜','情歌对唱榜','影视金曲榜','网络歌曲榜']
      }
    },
     methods: {
        // get_data: function (params) {
        //   var v = this
        //   if (!params) params = {}
        //   var id = GetRequest("id");
        //   var tableNum = GetRequest("tableNum");
        //   this.$http.jsonp('http://tingapi.ting.baidu.com/v1/restserver/ting?format=json&from=webapp_music&method=',
        //   {jsonp:'callback', jsonpCallback:'success_jsonpCallback'})
        //   .then(response => {
        //     console.log(response.data)
            
        //   }, response => {
        //     console.log(response)
        //     console.log(response.ok)
        //     // error callback
        //   });
        // }
     }
  }
</script>