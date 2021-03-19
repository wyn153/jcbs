// 关爱页面
<template>
  <div>
        <van-nav-bar
          title="商家"
          right-text="上海"
          left-arrow
          @click-left="onClickLeft"
          @click-right="onClickRight"
        />
    <div class="careBox-wrap">
        <div class="careBox" v-for="(value, index) in dataList" :key="index" @click="getData(value.proId)">
            <div class="business">
                <div class="Merchant">
                    <img :src="value.img[0]">
                    <div class="information">
                        <h3>{{value.proName}}</h3>
                        <p class="address">{{value.kind}}</p>
                        <div class="tip"><p class="firsTip">成交率:88%</p><p>好评率:100%</p><p>在售:99</p></div>
                    </div>
                </div>
            </div>
            <div class="sjphotos">
                <van-card
                  price="666.00"
                  :thumb="value.img[0]"
                />
                <van-card
                  price="888.00"
                  :thumb="value.img[1]"
                />
                <van-card
                  price="999.00"
                  :thumb="value.img[2]"
                />
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import { allProData } from '@/api/request.js'
import Vue from 'vue'
import { NavBar, Card } from 'vant'
Vue.use(NavBar)
Vue.use(Card)
export default {
  data () {
    return {
      dataList: []
    }
  },
  // 方法 函数写这里
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    onClickRight(){
      this.$router.push('/city')
    },
    getData (proId) {
      this.$router.push({ name: 'detail', query: { id: proId } })
    }
  },
  mounted () {
    allProData().then((data) => {
      this.dataList = data.data.msg
      console.log(data.data.msg)
    })
  },
  // 过滤器
  filters: {}
}
</script>

<style lang="scss" scoped>
.careBox-wrap{
    background: #efefefef;
    .careBox{background: #ffff;margin-top: 0.13rem;}
}
.business{
    width: 100vw;
    .Merchant{
        display: flex;
        width: 100vw;
        height: 0.6rem;
        margin-right: 0.2rem;
        img{
            display: block;
            width: 0.6rem;
            height: 0.6rem;
            border-radius: 50%;
            margin-left: 0.2rem;
        }
        .information{
            margin-left: 0.2rem;
            margin-top: 0.1rem;
            overflow: hidden;
            h3{
                font-size: 0.14rem;
            }
            .address{
                margin-top: 0.01rem;
                font-size: 0.03rem;
            }
            .tip{
                display: flex;
                justify-content: space-around;
                p{
                    margin-top: 0.01rem;
                    font-size: 0.01rem;
                    background: #efefef;
                    margin-left: 0.06rem;
                    padding: 0 0.08rem;
                    border-radius: 0.06rem;
                }
                .firsTip{
                    margin-left: 0;
                }
            }
        }
    }
}
.sjphotos{
    display: flex;
    justify-content: space-between;
    .van-card:not(:first-child){margin-top: 0;}
    .van-card__header{
        display: flex;
        flex-direction: column;
        width: 30%;
        height: 1rem;
        .van-card__content{
            height: 0.2rem;
            min-height: 0;
        }
    }
}
</style>
