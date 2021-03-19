<template>
    <div class="box">
        <van-nav-bar title="订单管理" left-text="返回" right-text="去购物" left-arrow @click-left="$router.back()" @click-right="$router.push('/home')" />
        <van-tabs v-model="active">
            <van-tab title="待付款">
                <div v-for=" (value,index) in order">
                    <h3>订单号:{{value.time}}</h3>
                    <div class="orderPro">
                        <van-card v-for="val in value.proData" :num="val.num" :price="val.price" :title="val.proName"
                            :thumb="val.img" />
                    </div>
                    <van-submit-bar button-text="去支付" :price="orderPrice(index)"/>
                </div>
            </van-tab>
           <van-tab title="待发货">内容 2</van-tab>
            <van-tab title="待收货">内容 3</van-tab>
            <van-tab title="待评价">内容 4</van-tab>
            <van-tab title="订单已完成">内容 5</van-tab>
            <van-tab title="售后中">内容 6</van-tab>
        </van-tabs>
    </div>
</template>

<script>
    import Vue from 'vue';
    import {
        Card,
        List,
        Tab,
        Tabs,
        SubmitBar,
        NavBar
    } from 'vant';
    import {
        getOrder
    } from '@/api/request.js'
    import {
        getCookie
    } from '@/api/cookie.js'
    Vue.use(Card);
    Vue.use(List);
    Vue.use(Tab);
    Vue.use(Tabs);
    Vue.use(SubmitBar);
    Vue.use(NavBar);
    export default {
        data() {
            return {
                order: [],
                active: 0
            }
        },
        mounted() {
            let that = this
            getOrder({
                userId: getCookie('userId')
            }).then((data) => {
                that.order = data.data.msg
                // console.log(that.order)
            })
        },
        methods:{
            orderPrice (index) {
                let arr=this.order[index]
               return arr.proData.reduce((start,val)=>{
                    return start+val.num*val.price*100  
                },0)
            }
        }
    }
</script>

<style>
    h3 {
        font-weight: normal;
    }

    .orderPro {
        background-color: rgb(250, 250, 250);
    }
    .van-submit-bar{
        position: static;
    }
</style>
