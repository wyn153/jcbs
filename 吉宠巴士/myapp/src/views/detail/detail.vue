<template>
  <div class="box detailbox">
    <van-nav-bar
      left-arrow
      @click-left="onClickLeft"
      class="nav1"
      style="position: fixed; width: 100vw"
    >
      <template #right>
        <van-popover
          v-model="showPopover"
          trigger="click"
          :actions="actions"
          placement="bottom-end"
        >
          <template #reference>
            <van-icon name="ellipsis" size="18" />
          </template>
        </van-popover>
      </template>
    </van-nav-bar>
    <main>
      <van-swipe ref="mysiwpe">
        <van-swipe-item
          v-for="(image, index) in img"
          :key="index"
          @click="imagePreview(index)"
        >
          <img :src="image" style="height: 100vw; width: 100vw" />
        </van-swipe-item>
      </van-swipe>
      <div>
        <h1>{{ pro.proName }}</h1>
        <h4>
          <h2>￥:{{ pro.price }}</h2>
        </h4>
        <!-- <h2>折扣:{{ pro.discount }}</h2> -->
        <span>定金：{{ (pro.price * pro.discount) / 20 }}</span>
        <span>销量：{{ pro.sales }}</span>
        <!-- <p style="height: 10rem"></p> -->
      </div>
    </main>
    <!--  -->
    <div class="hint">
      <p>温馨提示：宠物集市的全部商品不支持担保交易</p>
      <p>假货零容忍：店铺销售假货一经查实一律永封查店</p>
    </div>
    <div class="is-link">
      <van-cell title="举报当前商品" is-link />
    </div>
    <!--  -->
    <div>
      <van-tabs v-model="active">
        <van-tab title="详情介绍">
          <p>性别：公</p>
          <p>疫苗：2针</p>
          <p>年龄：3个月</p>
          <p style="margin-bottom: 0.1rem">品种：{{ pro.proName }}</p>
          <div style="width: 100%">
            <img :src="pro.img" alt="" style="width: 100%" />
          </div>
        </van-tab>
        <van-tab title="注意事项">
          <h4>1.宠物集市的商品支持担保交易吗？</h4>
          <p>不支持，只有丹巴商城的商品支持担保交易</p>
          <br />
          <h4>2.在集市买到病狗怎么办？</h4>
          <p>可以举报商家，平台讲对病狗投诉过多的商家进行永久封店处理</p>
          <br />
          <h4>3.商家不按时发货怎么办？</h4>
          <p>卖家不发货，可以投诉商家,平台讲对投诉过多的商家进行永久封店处理</p>
          <br />
          <h4>4.买到假货怎么办？</h4>
          <p>平台对假货零容忍,可以投诉商家,一经查实将对商家进行永久封店处理</p>
          <br />
        </van-tab>
      </van-tabs>
    </div>

    <div style="margin-top: 0.5rem">
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" />
        <van-goods-action-icon icon="shop-o" text="店铺" />
        <van-goods-action-icon
          icon="share-o"
          text="分享"
          @click="showShare = true"
        />
               <van-share-sheet
  v-model="showShare"
  title="立即分享给好友"
  :options="options"
  @select="onSelect"
/>
        <van-goods-action-button
          type="warning"
          text="加入购物车"
          @click="cartAdd"
        
        />
 
        <van-goods-action-button
          type="danger"
          text="立即购买"
          @click="buyRight"
        />
      </van-goods-action>
    </div>
  </div>
</template>
<script>
import { getData, cartAdd } from "@/api/request.js";
import { getCookie } from "@/api/cookie.js";
import Vue from "vue";
import {
  Toast,
  NavBar,
  Swipe,
  SwipeItem,
  Popover,
  ImagePreview,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Cell,
  CellGroup,
  Tab,
  Tabs,
  ShareSheet,
} from "vant";
Vue.use(NavBar);
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Popover);
Vue.use(ImagePreview);
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
Vue.use(Cell);
Vue.use(CellGroup);
Vue.use(Tab);
Vue.use(Tabs);
Vue.use(ShareSheet);
export default {
  data() {
    return {
      showShare: false,
      options: [
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' },
      ],
      active: 2,
      id: "",
      img: [],
      pro: {},
      showPopover: false,
      actions: [
        {
          text: "客服",
        },
        {
          text: "分类",
        },
        {
          text: "购物车",
        },
        {
          text: "搜索",
        },
        {
          text: "我的",
        },
      ],
    };
  },
  mounted() {
    getData(this.$route.query.id).then((data) => {
      // console.log(data.data.msg);
      this.img = data.data.msg.img;
      this.pro = data.data.msg;
    }).catch((data)=>{
      console.log(data.data)
    });
  },
  methods: {
     onSelect(option) {
      Toast(option.name);
      this.showShare = false;
    },
 
    imagePreview(index) {
      const that = this;
      ImagePreview({
        images: this.img,
        startPosition: index,
        onChange(i) {
          that.$refs.mysiwpe.swipeTo(i);
        },
      });
    },
    onClickLeft() {
      this.$router.back();
    },
    cartAdd() {
      let that = this;
      // console.log(getCookie('token') )
      cartAdd({
        proId: this.$route.query.id,
        userId: getCookie("userId"),
        token: getCookie("token"),
        num: 1,
      })
        .then((data) => {
          if (data.data.code == 400) {
            Toast({
              message: data.data.title,
              onClose() {
                that.$router.push("/login");
              },
            });
          } else {
            Toast(data.data.title);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    buyRight() {
      let that = this;
      cartAdd({
        proId: this.$route.query.id,
        userId: getCookie("userId"),
        token: getCookie("token"),
        num: 1,
      })
        .then((data) => {
          if (data.data.code == 400) {
            Toast({
              message: data.data.title,
              onClose() {
                that.$router.push("/login");
              },
            });
          } else {
            Toast({
              message: data.data.title,
              onClose() {
                that.$router.push("/cart");
              },
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style leng="scss">
.detailbox {
  overflow: auto;
  display: flex;
  flex-direction: column;
}

.is-link {
  border-top: 1px solid #b9b9aa;
  border-bottom: 1px solid #b9b9aa;
  margin-top: 0.1rem;
}
h2 {
  color: red;
}
span {
  margin-right: 0.2rem;
}
.hint {
  /* height: 0.3rem; */
  border-top: 1px solid rgb(185, 185, 170);
  /* border-bottom: 1px solid rgb(185, 185, 170); */
  margin-top: 0.1rem;
  padding: 0.08rem;
}
h4 {
  color: rgb(206, 203, 14);
  margin-top: 0.05rem;
  margin-bottom: 0.06rem;
}
.van-tab--active{
  background:  rgb(206, 203, 14);
}
.van-tabs__line{
  background-color: rgb(243, 243, 225);
}
</style>
