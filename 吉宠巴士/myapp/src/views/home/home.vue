// 首页
<template>
  <div class="box">
    <!-- 头部的导航栏组件 -->
    <comtop></comtop>
    <!-- 轮播图 -->
    <div class="swipe">
      <van-swipe
        class="my-swipe"
        :autoplay="3000"
        indicator-color="white"
        style="height: 2rem"
      >
        <van-swipe-item v-for="val in bannerList" :key="val.bannerId">
          <van-image height="2rem" fit="contain" :src="val.src" />
        </van-swipe-item>
      </van-swipe>
    </div>

    <main ref="main" @scroll="onScroll">
      <!-- 格子导航 -->
      <div class="nav-grid nav-grid1">
        <van-grid :column-num="5">
          <van-grid-item
          style="hight:2.5rem"
            v-for="value in kindList"
            :key="value.id"
            :icon="value.icon"
            :text="value.title"
          />
        </van-grid>
      </div>
      <!-- 推荐商家 -->
      <div class="recommend">
        <p>推 / 荐 / 商 / 家</p>
      </div>
      <!-- 格子导航 -->
      <div class="nav-grid">
        <van-grid :column-num="5">
          <van-grid-item
            v-for="value in navList"
            :key="value.id"
            :icon="value.icon"
            :text="value.title"
          />
        </van-grid>
      </div>
      <!-- 精品推荐 -->
      <div class="recommend">
        <p>精 / 品 / 推 / 荐</p>
      </div>
      <!-- 商品列表 -->
      <div class="commin">
        <ul>
          <li
            class="commin-box"
            v-for="(value, index) in proList"
            :key="index"
            @click="godetail(value.proId)"
          >
            <!-- <img :src="item.img" /> -->
            <img :src="value.img[0]" alt="" />
            <p class="proName">{{ value.proName }}</p>
            <p class="price">￥ {{ value.price }}</p>
          </li>
        </ul>
      </div>
    </main>
    <!-- 回到顶部 -->
    <van-icon
      name="back-top"
      class="my-back-top"
      @click="goToTop"
      ref="toTop"
    />
  </div>
</template>
<script>
import comtop from "@/components/comtop.vue";
import { getBanner, getKind, allProData } from "@/api/request.js";
import Vue from "vue";
import {
  Swipe,
  SwipeItem,
  Grid,
  GridItem,
  Icon,
  Image as VanImage,
} from "vant";

Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Grid);
Vue.use(GridItem);
Vue.use(Icon);
Vue.use(VanImage);
export default {
  name: "home",
  props: [],
  components: {
    comtop,
  },
  data() {
    return {
      bannerList: [],
      kindList: [],
      proList: [],
      iconList: [
        "https://ftp.bmp.ovh/imgs/2021/03/2ff69c05df85412b.jpg",
        "https://ftp.bmp.ovh/imgs/2021/03/e160badcff754289.jpg",
        "https://s3.ax1x.com/2021/03/18/6RedKJ.png",
        "https://s3.ax1x.com/2021/03/18/6RmSI0.png",
        "https://s3.ax1x.com/2021/03/18/6RmizF.png",
      ],
      navList: [
        {
          id: 0,
          icon:
            "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2135711820,1954554582&fm=26&gp=0.jpg",
          title: "诚信犬业",
        },
        {
          id: 1,
          icon:
            "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1073945947,1676403343&fm=26&gp=0.jpg",
          title: "叮当猫舍",
        },
        {
          id: 2,
          icon:
            "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3264259993,3755018339&fm=26&gp=0.jpg",
          title: "点点萌宠",
        },
        {
          id: 3,
          icon:
            "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2627456295,3168654421&fm=26&gp=0.jpg",
          title: "鸿运宠物",
        },
        {
          id: 4,
          icon:
            "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3255986955,1622536005&fm=26&gp=0.jpg",
          title: "鑫心宠屋",
        },
        {
          id: 5,
          icon:
            "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1751881929,1641491557&fm=26&gp=0.jpg",
          title: "叮当宠物",
        },
        {
          id: 6,
          icon:
            "https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=4284967037,698482033&fm=15&gp=0.jpg",
          title: "夏之光",
        },
        {
          id: 7,
          icon:
            "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2864741223,4098529186&fm=26&gp=0.jpg",
          title: "大圣宠物",
        },
        {
          id: 8,
          icon:
            "https://dss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1576028024,2351896536&fm=26&gp=0.jpg",
          title: "实木宠物",
        },
        {
          id: 9,
          icon: "apps-o",
          title: "更多",
        },
      ],
    };
  },
  //方法 函数写这里
  methods: {
    onScroll() {
      // top 页面的滚动条值
      let top = this.$refs.main.scrollTop;
      console.log(top);
      if (top > 10) {
        // top大于 500 再显示，否则 隐藏
        this.$refs.toTop.style.display = "block";
      } else {
        this.$refs.toTop.style.display = "none";
      }
    },
    // 点击回到顶部
    goToTop() {
      // 点击后,滚动条距离为0
      this.$refs.main.scrollTop = 0;
    },
    godetail(proId) {
      console.log(proId);
      this.$router.push({ name: "detail", query: { id: proId } });
    },
  },
  //计算属性
  computed: {},
  //侦听器
  watch: {},
  //页面渲染之后
  mounted() {
    getBanner().then((data) => {
      this.bannerList = data.data.msg;
    });
    getKind().then((data) => {
      // this.kindList = data.data.msg;
      data.data.msg.forEach((val, idx) => {
        this.kindList.push({
          title: val,
          icon: this.iconList[idx],
          id: idx,
        });
      });
    }),
      allProData().then((data) => {
        // console.log(data.data.msg);
        this.proList = data.data.msg;
      });
  },
};
</script>

<style lang="scss" scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 2rem;
  text-align: center;
  // background-color: #39a9ed;
}
.nav-grid {
  width: 95vw;
  margin: 0 auto;
  // border: 1px solid black;
  border-radius: 0.15rem;
  background-color: #fff;
  overflow: hidden;
}
.recommend {
  width: 70%;
  margin: 0 auto;
  height: 0.4rem;
  line-height: 0.4rem;
  // border: 1px solid black;
  text-align: center;
  background-image: url(https://ftp.bmp.ovh/imgs/2021/03/f92938c99f872442.jpg);
  opacity: 0.6;
}
.recommend p {
  color: rgb(230, 5, 5);
  font-size: 0.17rem;
}
// 详情页
.commin-box {
  width: 46%;
  height: 2.1rem;
  //   border: 1px solid black;
  float: left;
  margin-left: 0.1rem;
  border-radius: 0.15rem;
  overflow: hidden;
  margin-bottom: 0.06rem;
}
.commin-box img {
  width: 100%;
  height: 67%;
}
.proName {
  overflow: hidden;
  height: 0.32rem;
  line-height: 0.32rem;
  font-size: 0.14rem;
  width: 98%;
  margin-left: 0.02rem;
}
.price {
  font-size: 0.14rem;
  margin-left: 0.05rem;
  color: red;
  line-height: 0.14rem;
}
.commin {
  width: 100%;
  overflow: hidden;
}
// 点击回到顶部
.my-back-top {
  position: fixed;
  bottom: 1rem;
  right: 0.2rem;
  background: #afafaf;
  color: #fefefe;
  padding: 0.1rem;
  border-radius: 0.06rem;
  font-size: 0.3rem;
  display: none;
}

.van-swipe-item img{
  width: 100%;
  height: 100%;
}
.swipe {
  height: 2.3rem;
}
.van-grid-item{
  // border: 1px solid black;
  padding: 1px 1px;
}
.van-icon__image {
    width: 1.5em !important;
    height: 2.3em !important;
    object-fit: contain;
}
</style>
