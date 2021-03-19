<template>
    <div class="boxSearch">
        <van-nav-bar title="搜索结果页" left-text="返回" right-text="去首页" left-arrow @click-left="$router.back()" @click-right="$router.push('/home')" />
        <van-dropdown-menu>
          <van-dropdown-item v-model="value" :options="option" @change="onSort(value)"/>
          <van-dropdown-item title="筛选" ref="item">
            <van-cell center title="包邮">
              <template #right-icon>
                <van-switch v-model="switch1" size="24" active-color="#ee0a24" />
              </template>
            </van-cell>
            <van-cell center title="团购">
              <template #right-icon>
                <van-switch v-model="switch2" size="24" active-color="#ee0a24" />
              </template>
            </van-cell>
            <div style="padding: 5px 16px;">
              <van-button type="danger" block round @click="onConfirm">
                确认
              </van-button>
            </div>
          </van-dropdown-item>
        </van-dropdown-menu>
        <main class="SearchMain">
         <router-link v-for="(val,index) in proList" :to="'/detail?id='+val.proId" :key="index">
           <van-card
             :num="val.sales"
             :price="val.price"
             :desc="val.brand"
             :title="val.proName"
             :thumb="val.img[0]"
           />
           </router-link>
       </main>
    </div>
</template>
<script>
   import {searchResult,proSort} from '@/api/request.js'
   import Vue from 'vue'
   import { Button, Swipe, SwipeItem, Image as VanImage, Grid, GridItem ,Icon,Card,List,PullRefresh, Toast, Search ,NavBar,DropdownMenu, DropdownItem,Cell,Switch} from 'vant'
   Vue.use(Swipe)
   Vue.use(SwipeItem)
   Vue.use(VanImage)
   Vue.use(Grid)
   Vue.use(GridItem)
   Vue.use(Icon)
   Vue.use(Card)
   Vue.use(List)
   Vue.use(PullRefresh)
   Vue.use(NavBar)
   Vue.use(DropdownMenu);
   Vue.use(DropdownItem);
   Vue.use(Cell);
   Vue.use(Switch);
   Vue.use(Button);
    export default {
        data() {
            return {
                proList:[],
                searchList:[],
                 value: 0,
                      switch1: false,
                      switch2: false,
                      option: [
                        { text: '默认排序', value: 0 },
                        { text: '价格升序', value: 1 },
                        { text: '价格降序', value: 2 },
                      ]
            }
        },
        methods: {
            onSort (v) {
               switch (v) {
                   case 0:
                   this.proList=this.searchList
                   break
                   case 1:
                   let arr1=this.searchList
                   arr1.sort((a,b)=>{
                       return a.price-b.price
                   })
                   this.proList=arr1
                   break
                   case 2:
                   let arr2=this.searchList
                   arr2.sort((a,b)=>{
                       return b.price-a.price
                   })
                   this.proList=arr2
               }
            },
            onConfirm () {
                
            }
        },
        mounted (){
          searchResult({sKey:this.$route.query.Result}).then((data)=>{
              this.searchList=data.data.msg
              console.log(data.data.msg)
              this.proList=this.searchList
          })  
        }
    }
</script>
<style>
.boxSearch{
   display: flex;
   flex-direction: column;
}
.SearchMain{
    flex: 1;
    overflow: auto;
}
</style>
