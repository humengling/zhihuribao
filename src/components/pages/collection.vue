<template>
  <div class="box">
    <div class="title">
      <i class="iconfont icon-list_icon" @touchstart="returns()"></i>
      <a>2条收藏</a>
    </div>
    <ul class="item">
      <li v-for='i in arr' :key='i.id' @touchstart="toList(i.id)">
        <p>{{i.title}}</p>
        <img :src="i.img" alt />
      </li>
    </ul>
    
  
  </div>
</template>

<script type="text/ecmascript-6">

import api from "../../public/API";


export default {
  components: {
    
  },
  props: {},
  data() {
    return {
       arr:[]
       
    };
  },
  watch: {},
  computed: {},
  methods: {
    returns(){
      this.$router.push('/nav')
    },
    toList(id){
      this.$router.push('/list?id='+id)
    }
  },
  mounted() {
    var arr3=localStorage.getItem("collect")  //
    // console.log(JSON.parse(arr3))
    console.log(arr3)
    this.arr = JSON.parse(arr3)
    console.log(this.arr)
    
    
  }
};
</script>
<style lang="stylus" scoped>

@import '../../stylus/index.styl';

.box {
  .title {
    width: 100vw;
    height: 1rem;
    background:skyblue
    i {
      font-size: 0.5rem;
      color: #fff;
      line-height: 1rem;
      padding: 0 0.4rem;
    }
    a {
      font-size: 0.5rem;
      color: #fff;
      height: 1rem;
      line-height: 1rem;
      display: inline-block;
    }
  }

  .item {
    width: 100%;

    li {
      position:relative
      height:1.2rem
      padding-left: 0.3rem;
      border-bottom:1px solid #ccc;
      box-sizing:border-box
      p {
        display: inline-block;
        width: 5.2rem;
        font-size:0.3rem
      }

      img {
        position:absolute
        right:0.2rem;
        top:0.1rem
        padding: 0.1rem;
        display: inline-block;
        width: 0.8rem;
        height: 0.8rem;
        margin-left: 0.7rem;
        vertical-align: middle;
      }
    }
  }
}
</style>
