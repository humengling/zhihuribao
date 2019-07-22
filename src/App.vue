<template>
    <div class="box">
      <router-view></router-view>
    </div>
</template>

<script type="text/ecmascript-6">

import api from '../src/public/API'

export default {
    props:{},
    components:{
        api
    },
    data(){
        return{

        };
    },
    watch:{},
    computed:{},
    methods:{},
    mounted(){
        // this.$http({    //只是看最开始看数据是否获取成功的 注释掉
        //     url:api.newMessage     //newMessage:   API.js
        // }).then(d => {
        //     console.log(d)
        // })
    }   
}
</script>

<style lang="stylus" scoped>
@import './stylus/index.styl'
   

</style>
