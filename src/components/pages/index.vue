<template>
  <div class="box">
    <ul class="title">
      <li>
        <i class="iconfont icon-list_icon" @click="nav()"></i>
        <a href="#">{{title}}</a>
        <p>
          <i class="iconfont icon-lingdang"></i>
          <i class="iconfont icon-diandian"></i>
        </p>
      </li>
    </ul>
    <!-- 轮播图 -->
    <div class="pic">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="item in arr" :key="item.id">
          <img :src="item.image" />
          <p>{{item.title}}</p>
        </mt-swipe-item>
      </mt-swipe>
    </div>
    <!-- 新闻    遍历整个div才能让时间也获取-->
    <!-- <div class="news">
      <h3>今日新闻</h3>
      <ul class="item">
        <li>
          <p>阿杜的亚文化在研究</p>
          <img src="http://img1.imgtn.bdimg.com/it/u=3830656056,2293128389&fm=26&gp=0.jpg" alt="">
        </li>
      </ul>
    </div>-->

    <!-- 把arr1换成data -->
    <!-- @touchstart="start($event)"
      @touchmove="move($event)"
    @touchend="end($event)"-->
    <div class="news" v-for="(item,index) in data" :key="index">
      <!-- 最新消息 每个li也要遍历获取文字和图片数据-->
      <h3 class="day-title">{{item.title}}</h3>
      <ul class="item">
        <li v-for="i in item.d" :key="i.id" @click="btn(i.id)">
          <p class="changeTitle">{{i.title}}</p>
          <img :src="i.images" alt />
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import api from "../../public/API";

//声明周一到周日
Date.prototype.getWeek = function() {
  var arrs = [
    "星期日",
    "星期一",
    "星期二",
    "星期三",
    "星期四",
    "星期五",
    "星期六"
  ];
  return arrs[this.getDay()];
};

function getTime(n) {
  //n接收数据的

  //今天的毫秒数
  var nowTimes = new Date().getTime();

  var showTimes = new Date(nowTimes - n * 24 * 60 * 60 * 1000); //今天的毫秒数-第n天的毫秒数

  var showMonth =
    showTimes.getMonth() + 1 < 10
      ? "0" + (showTimes.getMonth() + 1)
      : showTimes.getMonth() + 1;
  var showDate =
    showTimes.getDate() < 10 ? "0" + showTimes.getDate() : showTimes.getDate();
  var showWeek = showTimes.getWeek();

  //show
  var show = `${showMonth}月${showDate}日${showWeek}`; //返回出去

  //请求数据时间
  var requestTimes = new Date(nowTimes - (n - 1) * 24 * 60 * 60 * 1000);

  var requestYear = requestTimes.getFullYear();
  var requesMonth =
    requestTimes.getMonth() + 1 < 10
      ? "0" + (requestTimes.getMonth() + 1)
      : requestTimes.getMonth() + 1;
  var requesDate =
    requestTimes.getDate() < 10
      ? "0" + requestTimes.getDate()
      : requestTimes.getDate();

  //request
  var request = `${requestYear}${requesMonth}${requesDate}`; //返回出去

  //返回数据
  return {
    show,
    request
  };
}

// ****************************************************************
export default {
  components: {},
  props: {},
  data() {
    return {
      arr: [], //轮播
      // arr1: [],    //最新消息和过往新闻

      title: "首页",
      data: [], //title:"新日新闻", d:[{},{},{}]
      num: 0, //把num设为0，后面才能++，封装一个方法getBefore,用n接收
      isload: true //能否加载[当没滑到一歌日期，就要加载，但是会导致日期的紊乱，故而,可以加载的情况下，为true，在滚动事件时，一开始就是false，只有正确时间排序加载成功，才能加载出其他日期的数据]
    };
  },
  watch: {},
  computed: {},
  methods: {
    //li的点击事件
    btn(id) {
      this.$router.push("/list?id=" + id);
    },
    nav() {
      this.$router.push("/nav");
    },
    // start(e) {
    //   // console.log(e)
    //   this.startY = e.touches[0].clientY;
    //   this.endY = "0";
    // },
    // move(e) {
    //   this.endY = e.touches[0].clientY;
    // },
    // end(e) {
    //   if (this.endY == 0) {
    //     console.log("点击了");
    //     return;
    //   }
    // },

    // *********************************
    getBefore(n) {
      //getBefore封装的方法,用n来接收
      this.$http({
        url: api.oldMessage + "/" + getTime(n).request //  +/
      }).then(d => {
        this.isload = true; //可以加载的情况下
        this.data.push({
          title: getTime(n).show, //获取时间
          d: d.data.stories //数据
        });
      });
    }
  },

  mounted() {
    //要想轮播图的数据引进来，就要axios请求数据
    this.$http({
      url: api.newMessage //newMessage:   API.js
    }).then(d => {
      console.log(d);
      this.arr = d.data.top_stories; //轮播

      this.data.push({
        //获取时间
        title: "今日新闻",
        d: d.data.stories
      });

      this.num++; //106行
      this.getBefore(this.num);
    });

    //滚动
    window.onscroll = () => {
      var wh = document.documentElement.clientHeight; //window height
      var dh = document.documentElement.offsetHeight; //document height
      var ws = document.documentElement.scrollTop || document.body.scrollTop; //window scrollTop
      if (wh + ws + 200 >= dh && this.isload) {
        //高度越高越灵敏，太小会导致无法触发滚动事件
        this.isload = false; //p107
        this.num++;
        this.getBefore(this.num);
      }

      //改变顶部时间
      var dayTitles = document.querySelectorAll(".day-title");
      var oA = document.querySelector('.title');
      // console.log(oA.clientHeight)
      // console.log(dayTitles);
      var dayTitlesLen = [];

      for (var i = 0; i < dayTitles.length; i++) {
        dayTitlesLen.push(dayTitles[i].getBoundingClientRect().top); //getBoundingClientRect()固定写法
        console.log(dayTitlesLen)
      }

      for (var i = 0; i < dayTitlesLen.length; i++) {
        if (dayTitlesLen[i] <= oA.clientHeight) {
          this.title = dayTitles[i].innerHTML;
        }
        if (dayTitlesLen[0] > oA.clientHeight) {
          this.title = "首页";
        }
      }
    };
  }
};
</script>
<style lang="stylus" scoped>
@import '../../stylus/index.styl';

.box {
  .title {
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10;
    width: 100vw;
    height: 1rem;

    li {
      width: 100%;
      height: 1rem;
      background: #00B2EE;

      i {
        font-size: 0.5rem;
        color: #fff;
        line-height: 1rem;
        padding: 0 0.4rem;
      }

      a {
        font-size: 0.4rem;
        color: #fff;
        height: 1rem;
        line-height: 1rem;
        // display: inline-block;
      }

      p {
        position:fixed
        right:0.2rem;
        top:0.1rem
        display: inline-block;
        // padding-left: 0.1rem;
      }
    }
  }

  .pic {
    width: 100%;
    height: 4.5rem;
    overflow: hidden;
    position: relative; // 为了轮播上的title

    img {
      width: 100%;
      height: 100%;
    }

    >>> .mint-swipe-indicator { // 使用穿透获取激活按钮
      opacity: 1;
    }

    p {
      position: absolute;
      left: 0.3rem;
      top: 3rem;
      color: #fff;
      font-size: 0.4rem;
    }
  }

  .news {
    position: relative;

    h3 {
      left: 0;
      top: 4.5rem;
      height: 0.7rem;
      line-height: 0.7rem;
      width: 100%;
      padding-left: 0.3rem;
      font-size: 0.3rem;
      box-sizing: border-box;
    }

    .item {
      li {
        position: relative;
        height: 2rem; // 当li设置的高度太高，就会触发滚轮事件
        padding-left: 0.3rem;
        border: 1px solid #ccc;
        box-sizing: border-box;

        .changeTitle {
          padding-top: 0.3rem;
          display: inline-block;
          width: 5rem;
          font-size: 0.3rem;
        }

        img {
          position: absolute;
          right: 0;
          top: 0.2rem;
          width: 1.5rem;
          height: 1.5rem;
          vertical-align: middle;
        }
      }
    }
  }
}
</style>
