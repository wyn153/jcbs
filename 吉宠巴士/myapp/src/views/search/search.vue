<template>
    <div id="boxSearch">
        <van-search v-model="value" shape="round" style="width: 100%;" :show-action="true">
            <template #left>
                <van-icon name="arrow-left" @click="$router.back()" style="margin-right: ;"/>
            </template>
            <template #action>
                <van-button type="danger" size="small" @click="search">搜索</van-button>
            </template>
        </van-search>
        <div id="historySearch">
            <h2>最近搜索</h2>
            <van-tag  size="large" type="primary" plain v-for="val in historySearch" @close="close(val)" v-if="show" closeable style="margin-right: 0.04rem;" :key="val">{{val}}</van-tag>
        </div>
        <div id="hotSearch">
            <h2>热门搜索</h2>
            <van-tag  size="large" type="primary" plain v-for="val in hotSearch" style="margin-right: 0.05rem;" :key="val">
              {{val}}
            </van-tag>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue';
    import {getHistorySearch,addHistorySearch,delHistorySearch} from'@/api/request.js'
    import {getCookie} from '@/api/cookie.js'
    import {
        Search,
        Button,
        Tag
    } from 'vant';
    Vue.use(Search);
    Vue.use(Button);
    Vue.use(Tag);
    export default {
        data() {
            return {
                value: this.$route.query.searchResult,
                hotSearch:['大麦町犬','西藏狮子犬','博美犬','柯基犬'],
                historySearch:[],
                show:true
            }
        },
        methods: {
            search() {
               addHistorySearch({userId:getCookie('userId'),wd:this.value})
               this.$router.push('/searchResult?Result='+this.value)
            },
            close (val) {
               this.show=!this.show 
               delHistorySearch({userId:getCookie('userId'),wd:val})
            }
        },
        mounted () {
            if(getCookie('token')){
            getHistorySearch({userId:getCookie('userId')}).then((data)=>{
                // console.log(data.data)
                this.historySearch=data.data.msg
            })
             }else{
                this.historySearch=[]
            }   
        }
    }
</script>
<style>
h2{
    font-weight: normal;
    font-size: 0.16rem;
    margin-bottom:0.05rem ;
 }
</style>
