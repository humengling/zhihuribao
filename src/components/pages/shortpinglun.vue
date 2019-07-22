<template>
  <div class="box">
    <div class="title">
      <i class="iconfont icon-fanhuizuojiantou" @click="liste()"></i>
      <h3 v-for="item in arr" :key="item.id">{{allnum}}&nbsp;条评论</h3>
      <a class="iconfont icon-bianji"></a>
    </div>

    <!-- 长评 -->
    <div class="chang">
      <div class="sec">
        <h3>{{longnum}}&nbsp;条长评</h3>
        <!-- <i class="iconfont icon-xiangshangjiantou"></i> -->
    </div>

    <!-- 获取新闻的图片、文字等数据 -->
    <ul>
      <li v-for="(item,index) in arr1" :key="index">
        <img :src="item.avatar" />
        <h2>{{item.author}}</h2>
        <i class="iconfont icon-zan">{{item.likes}}</i>
        <p>{{item.content}}</p>
        <h5>{{item.time}}</h5>
      </li>
    </ul>
  </div>


    <!-- 短评 -->
    <div class="short">
      <div class="sec">
        <h3>{{shortnum}}&nbsp;条短评</h3>
        <!-- <i class="iconfont icon-xiangshangjiantou"></i> -->
      </div>

      <!-- 获取新闻的图片、文字等数据 -->
      <ul>
        <li v-for="(item,index) in arr" :key="index">
          <img :src="item.avatar" />
          <h2>{{item.author}}</h2>
          <i class="iconfont icon-zan">{{item.likes}}</i>
          <p>{{item.content}}</p>
          <h5>{{item.time}}</h5>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import api from "../../public/API";

export default {
  components: {},
  props: {},
  data() {
    return {
      arr: [],
      arr1: [], //获取评论所有信息
      shortnum: "", //短评论总数
      longnum: "", //长评论总数
      allnum: "" //评论总数
    };
  },
  watch: {},
  computed: {},
  methods: {
    // 返回键
    liste() {
      // this.$router.push("/list");
      // 点击返回键,要返回list，必须要像评论一样加上id，否则点击返回，只有list，没有id，无数据
      var listId = this.$route.query.id;         
      this.$router.push("/list?id=" + listId);
    }
  },
  mounted() {
    var id = this.$route.query.id;      //要想获取额外新闻，必须先加上id  跳转在list/say()
    // console.log(id)

    this.$http({    
       url: api.shortSay + '/' + id + '/'+ 'short-comments'  //短评
    }).then(d => {
      // console.log(d);
      this.arr = d.data.comments;   //短评论所有的数据
    });



    this.$http({            
       url: api.longSay + '/' + id + '/'+ 'long-comments'    //长评        
    }).then(d => {
      this.arr1 = d.data.comments;  //长评论所有的数据
      // console.log(d)
    });



    this.$http({                    //额外新闻      
      url: api.allSay + "/" + id
    }).then(d => {
      console.log(d);
      this.shortnum = d.data.short_comments; //短评总数
      this.longnum = d.data.long_comments; //长评总数
      this.allnum = d.data.comments; //所有评论总数
    });
  }
};
</script>
<style lang="stylus" scoped>
@import '../../stylus/index.styl';

.box {
  .title {
    height: 1rem;
    width: 100vw;
    background: skyblue;
    color: #fff;

    i {
      display: inline-block;
      padding-left: 0.5rem;
      font-size: 0.6rem;
    }

    h3 {
      line-height: 1rem;
      display: inline-block;
      margin: 0 1rem;
      color: #fff;
      font-size: 0.4rem;
      padding-right: 1.4rem;
    }

    a {
      display: inline-block;
      position: absolute;
      left: 6.5rem;
      top: 0;
      font-size: 0.6rem;
    }
  }

  .sec {
    height: 0.7rem;
    border-bottom: 1px solid #ccc;

    h3 {
      display: inline-block;
      margin-left: 0.5rem;
      height: 0.6rem;
      font-size:0.2rem
      line-height: 0.6rem;
    }
  }

  ul {
    overflow: hidden;

    li {
      position: relative;
      float: left;
      padding-left: 0.2rem;
      padding-top: 0.2rem;
      width: 100vw;
      border-bottom: 1px solid #ccc;

      img {
        position: absolute;
        border-radius: 50%;
        width: 1rem;
        height: 1rem;
        display: inline-block;
      }

      h2 {
        display: inline-block;
        height: 0.8rem;
        line-height: 0.8rem;
        padding-left: 1.5rem;
        font-weight: bold;
      }

      i {
        display: inline-block;
        position: absolute;
        right: 0.5rem;
      }

      p {
        padding-left: 1.5rem;
        padding-right: 0.5rem;
      }

      h5 {
        height: 0.8rem;
        padding-left: 1.5rem;
        line-height: 0.8rem;
        color: #ccc;
      }
    }
  }
}
</style>
