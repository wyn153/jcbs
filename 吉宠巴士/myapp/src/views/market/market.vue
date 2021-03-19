<template>
  <div class="box">
    <van-search
      v-model="value"
      shape="round"
      style="width: 100%"
      :show-action="true"
    >
      <template #left>
        <van-icon
          name="arrow-left"
          @click="$router.back()"
          style="margin-right: "
        />
      </template>
      <template #action>
        <van-button type="danger" size="small" @click="search">搜索</van-button>
      </template>
    </van-search>
    <van-tree-select :items="items" :main-active-index.sync="active">
      <template #content>
        <van-grid
          :border="false"
          :column-num="4"
          v-for="(val, idx) in items"
          :key="idx"
          :v-if="active == idx"
        >
          <van-grid-item
            v-for="value in kindImg[idx]"
            @click="$router.push('/detail?id=' + value.proId)"
            :key="value.proId"
          >
            <van-image :src="value.img[0]" />
            <div>
              <span>{{ value.kind }}</span>
            </div>
          </van-grid-item>
        </van-grid>
        <!-- <van-image v-for="(val,index) in kindImg" v-if="active === index" :src="val.img" /> -->
      </template>
    </van-tree-select>
  </div>
</template>
<script>
import Vue from "vue";
import { Search, Button, Tag, TreeSelect, Image, Grid, GridItem } from "vant";
Vue.use(Search);
Vue.use(Button);
Vue.use(Tag);
Vue.use(TreeSelect);
Vue.use(Image);
Vue.use(Grid);
Vue.use(GridItem);
import { getKind, allProData } from "@/api/request.js";
export default {
  data() {
    return {
      active: 0,
      items: [],
      value: "斗牛犬",
      kindImg: [],
    };
  },
  mounted() {
    let that = this;
    getKind().then((data) => {
      // console.log(data.data.msg)
      let arr = [];
      data.data.msg.forEach((val) => {
        arr.push({
          text: val,
        });
      });
      that.items = arr;
    }),
      allProData().then((data) => {
        // console.log(data.data.msg)
        that.kindImg1 = data.data.msg.filter((val) => {
          return val.kind == "中型犬";
        });
        that.kindImg2 = data.data.msg.filter((val) => {
          return val.kind == "大型犬";
        });
        that.kindImg3 = data.data.msg.filter((val) => {
          return val.kind == "宠物猫";
        });
        that.kindImg4 = data.data.msg.filter((val) => {
          return val.kind == "小型犬";
        });
        that.kindImg = [
          that.kindImg1,
          that.kindImg2,
          that.kindImg3,
          that.kindImg4,
        ];
        // console.log(that.kindImg)
      });
  },
  methods: {
    search() {
      this.$router.push("/searchResult?Result=" + this.value);
    },
  },
};
</script>
<style>
.box {
  display: flex;
  flex-direction: column;
}
.van-tree-select {
  flex: 1;
  overflow: auto;
}
.van-tree-select {
    height: 5.5rem !important;
}
</style>
