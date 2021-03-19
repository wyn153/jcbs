// 底边栏
<template>
  <div class="comfoot">
    <van-tabbar v-model="active">
      <van-tabbar-item icon="home-o" @click="$router.push('/home')">首页</van-tabbar-item>
      <van-tabbar-item icon="logistics" @click="$router.push('/market')">分类</van-tabbar-item>
      <van-tabbar-item icon="like-o" @click="$router.push('/care')">关爱</van-tabbar-item>
      <van-tabbar-item icon="contact" @click="$router.push('/my')">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>
<script>
import Vue from "vue";
import { Tabbar, TabbarItem } from "vant";
Vue.use(Tabbar);
Vue.use(TabbarItem);
// Vue.use(Icon)
export default {
  name: "comfooter",
  props: [],
  components: {},
  data() {
    return {
      active: 0,
    };
  }
};
</script>

<style lang="scss" scoped>
.comfoot{
  margin-top: 0.1rem;
}
</style>
