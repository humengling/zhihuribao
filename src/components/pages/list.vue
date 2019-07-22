<template>
  <div id="box">
    <!-- 详情页css样式在link引入 -->
    <link rel="stylesheet" href="http://news.at.zhihu.com/css/news_qa.auto.css?v=1edab" />
    <ul class="header">
      <li>
        <a class="iconfont icon-sdf" @click="shouye()"></a>
        <p>
          <i class="iconfont icon-fenxiang"></i>
          <i
            class="iconfont icon-shoucang"
            @click="collect()"
            :class="[isCollect? 'collect pink': 'collect']"
          ></i>
          <i class="iconfont icon-duanxin" @click="say()">&nbsp;&nbsp;{{listComments}}</i>
          <i class="iconfont icon-dianzan">&nbsp;&nbsp;{{listLikes}}</i>
        </p>
      </li>
    </ul>
    <div class="banner">
      <img :src="img.image" />
      <p>{{img.title}}</p>
    </div>
    <div v-html="body"></div>

    <!-- 分享 -->
    <!-- <div class="share">
      <h2>分享</h2>
      <ul>
        <li>
          <i class="iconfont icon-weibo"></i>
          <h3>新浪微博</h3>
        </li>
        <li>
          <i class="iconfont icon-weixin"></i>
          <h3>微博</h3>
        </li>
        <li>
          <i class="iconfont icon-pengyouquan"></i>
          <h3>微信朋友圈</h3>
        </li>
        <li>
          <i class="iconfont icon-daxiang"></i>
          <h3>印象笔记</h3>
        </li>
        <li>
          <i class="iconfont icon-bi"></i>
          <h3>有道云笔记</h3>
        </li>
        <li>
          <i class="iconfont icon-qq"></i>
          <h3>QQ</h3>
        </li>
        <li>
          <i class="iconfont icon-gengduo"></i>
          <h3>更多平台</h3>
        </li>
      </ul>
    </div> -->
  </div>
</template>

<script type="text/ecmascript-6">
import api from "../../public/API";

export default {
  components: {},
  props: [],
  data() {
    return {
      a1: [],
      body: "", //list
      img: [],
      isCollect: false, //收藏
      info: {}, //list要获取的数据
      d: "",
      listComments: "", //list获取到评论页的总评论数
      listLikes: "" //list获取到评论页的总点赞数
    };
  },
  watch: {},
  computed: {},
  methods: {
    shouye() {
      //首页
      this.$router.push("/index");
    },

    //分享
    // shares(){

    // },

    say() {
      //评论页
      var pinglunId = this.$route.query.id; //通过详情页的id，获取到评论页该条消息，要获取到他的id[api接口文档]
      this.$router.push("/shortpinglun?id=" + pinglunId);
    },

    collect() {
      //收藏
      this.isCollect = !this.isCollect; //true
      if (this.isCollect) {
        //为真
        var arr = localStorage.getItem("collect")
          ? JSON.parse(localStorage.getItem("collect"))
          : []; //为真收藏转数组，为假数组为空
        arr.push({
          id: this.d.id, //push进去所有数据的id[肯定存在的]
          title: this.d.title,
          img: this.d.image
        });
        localStorage.setItem("collect", JSON.stringify(arr));
      } else {
        //取消收藏
        var arr = localStorage.getItem("collect")
          ? JSON.parse(localStorage.getItem("collect"))
          : [];
        var num = -1;
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].id == this.info.id) {
            num = i;
            break;
          }
        }
        arr.splice(num, 1); //删除  从下标为num开始，删除1个
        localStorage.setItem("collect", JSON.stringify(arr));
      }
    }
  },

  mounted() {
    var id = this.$route.query.id;
    this.$http({
      url: api.listMessage + "/" + id
    }).then(d => {
      console.log(d);
      this.d = d.data; //所有数据
      this.body = d.data.body;
      this.img = d.data;
      // if(id == d.data.id){
      //   console.log(d)
      //   this.info={
      //     id:this.info.id,
      //     title:this.info.title,
      //     img:this.info.image
      //   }
      // }
    });

    //点赞 评论总数
    this.$http({
      url: api.allSay + "/" + id //额外新闻加上id[API接口文档]
    }).then(d => {
      // console.log(d);
      this.listComments = d.data.comments; //所有评论总数
      this.listLikes = d.data.popularity; //所有点赞总数
    });

    var arr = localStorage.getItem("collect")
      ? JSON.parse(localStorage.getItem("collect"))
      : [];

    this.isCollect = arr.some(item => item.id == id);
  }
};
</script>
<style lang="stylus" scoped>
@import '../../stylus/index.styl';

#box {
  position: relative;

  .header {
    height: 1.5rem;
    background: #1E90FF;
    overflow: hidden;

    li {
      width: 100%;
      height: 1rem;
      line-height: 1rem;
      float: left;

      a {
        display: inline-block;
        color: #fff;
        font-size: 0.4rem;
        padding-left: 0.2rem;
        font-size: 0.4rem;
      }

      p {
        display: inline-block;
        padding-left: 1rem;

        i {
          color: #fff;
          font-size: 0.4rem;
          padding-left: 0.3rem;
        }

        .pink {
          color: pink;
        }
      }
    }
  }

  .banner {
    position: relative;

    img {
      width: 100%;
      height: 4rem;
    }

    p {
      position: absolute;
      left: 0.2rem;
      bottom: 0.2rem;
      color: #fff;
      font-size: 0.3rem;
    }
  }

  >>> .headline { // 穿透  只有stylus有  可以解决所有css的样式问题
    display: none;
  }

  // .share {
  //   width: 85%;
  //   height: 6.5rem;
  //   background: pink;
  //   position: absolute;
  //   top: 4rem;
  //   left: 0.45rem;

  //   h2 {
  //     height: 1rem;
  //     line-height: 1rem;
  //     font-size: 0.3rem;
  //     padding-left: 0.5rem;
  //   }

  //   ul {
  //     overflow: hidden;

  //     li {
  //       float: left;
  //       margin:0 0.2rem
  //       i {
  //         width: 1.3rem;
  //         height: 1.3rem;
  //         line-height: 1.3rem;
  //         font-size: 0.5rem;
  //         display: inline-block;
  //         border: 1px solid red;
  //         border-radius: 50%;
  //         background: red;
  //         color: #fff;
  //         text-align: center;
  //       }
  //       h3{
  //        text-align:center
  //       }
  //     }
  //   }
  // }
}
</style>
