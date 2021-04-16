<template>
  <div class="home">
    <van-search v-model="SearchVal" shape="round" placeholder="请输入搜索关键词" disabled
      @click="handleClickSearch" 
    />
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="#39a9ed">
      <van-swipe-item v-for="item in banner" :key="item.id">
          <img :src="item.image_url" alt="" width="100%" :style="{display:'block'}">
      </van-swipe-item>
    </van-swipe>

    <transition name="van-fade">
      <div class="popup-shadow" v-show="$store.state.isShowPopupShadow"></div>
    </transition>
    <transition name="van-slide-right">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import {GetHomeList} from "@/request/api"

export default {
  name: 'Home',
  data(){
    return {
       SearchVal: "",
       banner:[]
    }
  },
  created(){
    //  request.get("/index/index")
   GetHomeList()
    .then(res=>{
      this.banner = res.data.banner
    })
    .catch(err=>{
      console.log(err);
    })
  },
  methods: {
    handleClickSearch(){
      this.$router.push('/home/searchPopup');
      // 修改VUEX中的isShowPopupShadow的值为true
      this.$store.commit("changeIsShowPopupShadow", true);
    }
  }
}
</script>


<style lang="less">
.popup-shadow{
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgba(0,0,0,.5);
  z-index: 98;
}
// .slide-enter,.slide-leave-to{
//     // 过渡开始之前的样式写在这里
//     right: -100%;
// }
// .slide-enter-active, .slide-leave-active{
//     // 过渡属性写在这里
//     transition:right .3s;
// }
// .slide-enter-to,.slide-leave{
//     // 过渡结束之后的样式写在这里
//     right: 0;
// }
</style>