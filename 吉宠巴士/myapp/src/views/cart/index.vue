<template>
    <div class="cartBox">
        <van-nav-bar title="购物车" left-text="返回" right-text="去购物" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
        <div class="cart">
            <van-address-list
              v-model="chosenAddressId"
              :list="list"
              default-tag-text="默认"
            />
            <van-swipe-cell v-for="(val,index) in thumb" :key="index">
            <van-card :price="val.price" :title="val.proName">
                <template #thumb>
                    <van-checkbox v-model="val.flag" @change=everyFlag(index)></van-checkbox>
                    <van-image
                      fit="contain"
                      :src="val.img[0]"
                      style="width: 0.60rem; margin-left:0.03rem"
                    />
                </template>
                <template #num>
                    <van-stepper v-model="val.num" theme="round" button-size="22" disable-input @change="onSetNum(index)" :num="val.num"/>
                </template>
            </van-card>
            <template #right>
                <van-button square text="删除" type="danger" class="delete-button" @click="del(index)"/>
            </template>
            </van-swipe-cell>
        </div>
        <van-submit-bar :price="allPrice" button-text="提交订单" @submit="onSubmit">
          <van-checkbox v-model="allChecked" @click="allFlag">全选</van-checkbox>
            <template #tip>
                当前选中了<span class="allNum">{{allNum}}</span>件商品
              </template>
        </van-submit-bar>
    </div>
</template>
<script>
    import Vue from 'vue';
    import {
        NavBar,
        Card,
        Button,
        Stepper,
        Toast,
        SwipeCell,Checkbox, CheckboxGroup,
        Image as VanImage ,
        SubmitBar,
        AddressList 
    } from 'vant';
    Vue.use(NavBar);
    Vue.use(Card);
    Vue.use(Button);
    Vue.use(Stepper);
    Vue.use(Toast);
    Vue.use(SwipeCell);
    Vue.use(Checkbox);
    Vue.use(CheckboxGroup);
    Vue.use(VanImage);
    Vue.use(SubmitBar);
    Vue.use(AddressList);
    import {
        getCookie
    } from '@/api/cookie.js'
    import {
        cartGet,numSet,delCart,flagSet,allFlagSet,addOrder
    } from '@/api/request.js'
    export default{
        data() {
            return {
                thumb:[], list: [
        {
          id: '1',
          name: '张三',
          tel: '13000000000',
          address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
          isDefault: true,
        }
      ],chosenAddressId: '1',
            }
        },
        beforeRouteEnter(to, from, next) {
            if (getCookie('isLogin') == 'ok') {
                next()
            } else {
                next('/login')
            }
        },
        methods: {
            onClickLeft() {
                this.$router.back()
            },
            onClickRight() {
                this.$router.push('/home')
            },
            onSetNum (index) {
                // console.log(this.thumb[index].num)
                numSet({proId:this.thumb[index].proId,userId:getCookie('userId'),num:this.thumb[index].num})
            },
            del(index){
                let that=this
              delCart({userId:getCookie('userId'),proId:this.thumb[index].proId}).then((data)=>{
                      that.thumb.splice(index,1)
              })
            },
            everyFlag (index) {
                flagSet({userId:getCookie('userId'),proId:this.thumb[index].proId,flag:this.thumb[index].flag})
            },
            allFlag () {
                allFlagSet({userId:getCookie('userId'),flag:this.allChecked})
            },
            onSubmit () {
                let that =this
             let arr = this.thumb.filter(val=>{
                   return val.flag ==1
               })
             if(arr==""){
                Toast("请选择购物商品")
             }else{
                addOrder({userId:getCookie('userId'),proData:JSON.stringify(arr)}).then((data)=>{
                    that.thumb=that.thumb.filter(val=>{
                        return val.flag ==0
                    })
                    that.$router.push('/order')
                }) 
             }
            }
        },
        mounted() {
            cartGet({
                userId: getCookie('userId')
            }).then((data) => {
                if(data.data.code==200){
                  this.thumb = data.data.msg.proData 
                  console.log(data.data) 
                }else{
                    // console.log(data.data.title)
                    Toast(data.data.title)
                }  
            })
        },
        computed: {
            allPrice () {
               return this.thumb.reduce((start,val) => {
                   if(val.flag == 1){
                    return start+val.num*val.price*100   
                   }else{
                       return start
                   }  
                },0)
            },
            allChecked :{
                get() {
                    return this.thumb.every(val=>{
                        return val.flag == 1
                    }) 
                },
                set (v) {
                    this.thumb.forEach(val=>{
                        val.flag= v
                    })
                }
            },
            allNum (){
                return this.thumb.reduce((start,val) => {
                    if(val.flag == 1){
                     return start+val.num   
                    }else{
                        return start
                    }  
                 },0)
            }
        }
    }
</script>
<style>
    .cartBox{
        display: flex;
        flex-direction: column;
    }
    .cart{
        flex: 1;
        overflow: auto;
    }
   .van-nav-bar{
       position: static;
   }
 .delete-button {
    height: 100%;
  }
  .van-card__thumb{
     display: flex;
      .van-checkbox{
          flex:1;
      }
      img{
          flex: 1;
          width: 0.44rem;
      }
  }
  .allNum{
      font-size: 0.26rem;
  }
  .van-address-list{
      padding:0.12rem 0.12rem 0;
  }
  .van-address-list__bottom{
      display: none;
      }
</style>
