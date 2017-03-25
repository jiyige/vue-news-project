<template>
  <div>
    <mt-header fixed title="VueNews"></mt-header>
    <div  style="margin-top:91px">
      <!--<a v-bind:href="'tel:'+item.phone" class="call">sssss</a>-->
      <!--<el-input v-model="input" placeholder="请输入内容"></el-input>-->
      <mt-navbar v-model="selected" style="position:fixed;left:0px;top:40px;width:100%;">
        <mt-tab-item id="1"  v-on:click.native="get_data(1,1)">头条</mt-tab-item>
        <mt-tab-item id="2"  v-on:click.native="get_data(2,1)">娱乐</mt-tab-item>
        <mt-tab-item id="3"  v-on:click.native="get_data(3,1)">军事</mt-tab-item>
        <mt-tab-item id="4"  v-on:click.native="get_data(4,1)">汽车</mt-tab-item>
        <mt-tab-item id="5"  v-on:click.native="get_data(5,1)">财经</mt-tab-item>
        <mt-tab-item id="7"  v-on:click.native="get_data(7,1)">体育</mt-tab-item>
        <mt-tab-item id="8"  v-on:click.native="get_data(8,1)">科技</mt-tab-item>
      </mt-navbar>
      <!--<mt-navbar v-model="selected" style="position:fixed;left:0px;top:40px;width:100%;">
        <mt-tab-item id="1"  v-on:click.native="get_data('war',1)">军事</mt-tab-item>
        <mt-tab-item id="2"  v-on:click.native="get_data('sport',1)">体育</mt-tab-item>
        <mt-tab-item id="3"  v-on:click.native="get_data('tech',1)">科技</mt-tab-item>
        <mt-tab-item id="4"  v-on:click.native="get_data('edu',1)">教育</mt-tab-item>
        <mt-tab-item id="5"  v-on:click.native="get_data('ent',1)">娱乐</mt-tab-item>
        <mt-tab-item id="6"  v-on:click.native="get_data('money',1)">财经</mt-tab-item>
        <mt-tab-item id="7"  v-on:click.native="get_data('gupiao',1)">股票</mt-tab-item>
        <mt-tab-item id="8"  v-on:click.native="get_data('travel',1)">旅游</mt-tab-item>
        <mt-tab-item id="9"  v-on:click.native="get_data('nvren',1)">女人</mt-tab-item>
      </mt-navbar>-->

      
    </div>
    <ul class="media-list"  v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
      <li class='media' v-for="item in list" @click="getHeight">
        <a class="newsHerf" v-bind:href="'/#/mainNews?id='+ item.news_id + '&tableNum=' + item.tableNum">
          <div class='pull-left'>
            <img class='media-object simg' v-bind:src="item.top_image" alt="xxx">
          </div>
          <div class="media-body">
            <h2 class="media-heading" v-text="item.title"></h2>
            <p class="source">来源：{{item.source}}</p>
            <p class="source">时间：{{item.edit_time}}</p>
          </div>
        </a>     
      </li>
    </ul>
    <!--<ul class="media-list"  v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
      <li class='media' v-for="item in list" @click="getHeight">
        <a class="newsHerf" v-bind:href="item.docurl">
          <div class='pull-left'>
            <img class='media-object simg' v-bind:src="item.imgurl" alt="xxx">
          </div>
          <div class="media-body">
            <h2 class="media-heading" v-text="item.title"></h2>
            <p class="source">时间：{{item.time}}</p>
          </div>
        </a>     
      </li>
    </ul>-->
    <div style="width:100px;display:block;margin:0 auto;margin-top:10px;margin-bottom:70px;">
      <mt-spinner  type="double-bounce" color="#26a2ff" style="float: left"></mt-spinner>
      加载中...
    </div>
    
  </div>
</template>
<script>
import {dateFormat} from 'vux'

export default {
  components: {
    dateFormat,
  },
  data () {
    return {
      input:'',
      list:[],
      selected: '1',
      index: 0,
      selectNum:0,
      loading: false,
      page:0,
      item:{phone:'4008001234'}
    }
  },
  created () {
    // 组件创建完后获取数据
    localStorage.setItem('getHeight',0)
    this.get_data()
  },
  watch: {
    $route: function() {
        window.scrollTo(0,localStorage.getItem('getHeight'));
    }
  },
  methods: {
    get_data: function (index,page) {
      
      var v = this;
      if(!index){
        var index = 1;
        //var index = 'war';
      }
      this.index = index;
      //console.log(index)
      if(!page){
        var page = 1;
      }
      if(page == 1){
        v.list = [];
        //console.log(v.list)
        
      }
      //console.log(page)
      //v.$http.get('http://wangyi.butterfly.mopaasapp.com/news/api?type='  + index + '&page=' + page + '&limit=10')
      v.$http.jsonp('http://api.dagoogle.cn/news/get-news?tableNum='  + index + '&pagesize=10&page=' + page + '&justList=1&callback=callback')
      .then(response => {
           //console.log(response.data.list[0])
        for(var i = 0;i<response.data.data.length;i++){
          var time = response.data.data[i].edit_time * 1000;
          var d = new Date();
          d.setTime(time);
          response.data.data[i].edit_time = dateFormat(d,'YYYY年MM月DD日 HH:mm:ss')
          response.data.data[i].tableNum = index;
          
        }
        v.list =v.list.concat(response.body.data) ;
        page++;
        
        this.page = page;



        //  for(var i = 0;i<response.data.list.length;i++){
        //   response.data.list[i].tableNum = index;
        // }
        // v.list =v.list.concat(response.data.list) ;
        // page++;
        
        // this.page = page;
      }, response => {
        console.log(response)
        console.log(response.ok)
      });
    },
    getHeight() {
      localStorage.setItem('getHeight',$(window).scrollTop())
    },
    loadMore() {
      this.loading = true;
      setTimeout(() => {
        if(location.hash === "#/"){
          this.get_data(this.index,this.page)
        }
        this.loading = false;
      }, 2500);
    }
  },
  
}




</script>
