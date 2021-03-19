// 导航栏
<template>
  <div class="comtop">
    <!-- <input type="text" placeholder="请输入搜索关键词"> -->
      <van-search v-model="value" placeholder="斗牛犬" disabled  @click="search"/>
  </div>
</template>
<script>
import Vue from "vue";
import { Search} from "vant";
// Vue.use(NavBar);
Vue.use(Search);
export default {
  name: "comtop",
  props: [],
  components: {},
  data() {
    return {
       value: '斗牛犬',
    };
  },
  //方法 函数写这里
  methods: {
     search () {
            // console.log(this.value)
            this.$router.push('/search?searchResult='+this.value)
        }
  }
};
</script>

<style lang="scss" scoped>
.comtop {
  position: fixed;
  top: 0;
  left: 0.5rem;
  z-index: 11;
  height: 0.3rem;
  width: 70%;
  opacity: .6;
  // background-color: palegoldenrod;
}
.van-search {
  background-color:none;
  border-radius: 0.18rem;
  height: 0.35rem;
  overflow: hidden;
  // opacity: 0.9;
}
</style>
