<template>
  <div class="box">
    <div class="title">
        <div class="pic">
            <img
                src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1718395925,3485808025&fm=27&gp=0.jpg"
            />
            <h3>葡小萄</h3>
        </div>
        <div class="sec">
             <i class="iconfont icon-shoucang"></i>
                <a href="" @click="collection()">我的收藏</a>
                <i class="iconfont icon-download"></i>
                <a href="">离线下载</a>
        </div>
    </div>
    <div class="thr" @click='index()'>
        <i class="iconfont icon-shouye"></i>
        <a href="" >首页</a>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">

import api from "../../public/API";

export default {
  components: {},
  props: [],
  data() {
    return {};
  },
  watch: {},
  computed: {},
  methods: {
      index(){
          this.$router.push('/index')
      },
      collection(){
           this.$router.push('/collection')
      }
  },
  mounted() {}
};
</script>
<style lang="stylus" scoped>
@import '../../stylus/index.styl';

.box {
  .title {
      background skyblue 
    .pic {
        height 1rem
        padding:0.3rem
        img{
            width: 0.5rem;
            height: 0.5rem;
            border-radius: 50%;
            display: inline-block;
        }
        h3{
            display: inline-block;
            line-height:0.4rem
            font-size:0.4rem
            padding:0.6rem
            color:#fff
        }
        
    }
    .sec{
        height:1rem;
        // background:skyblue
        margin-top:0.3rem
        i{
            margin:0 0.3rem
            display:inline-block
            font-size:0.4rem;
            color:#fff
        }
        a{
            margin:0 0.4rem
            display:inline-block
            font-size:0.4rem;
            color:#fff
        }
    }
  }
  .thr{
      height:1rem;
      line-height:1rem
    i{
        font-size:0.5rem;
        color:skyblue;
        margin-left:0.4rem
    }
    a{
        margin-left:0.4rem
        color:skyblue
        font-size:0.3rem;
    }
  }
}
</style>
