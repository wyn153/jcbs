<template>
    <div>
        <van-nav-bar title="登陆" left-text="返回" right-text="去注册" left-arrow @click-left="onClickLeft" @click-right="onClickRight"/>
        <van-tabs v-model="active">
          <van-tab title="手机号登陆" >
              <van-form @submit="onSubmit">
                  <van-field v-model="usertel" name="tel" label="手机号" placeholder="手机号" :right-icon="telIcon"/>
                  <van-field v-model="password1" type="password" name="password" label="密码" placeholder="密码" :right-icon="pwIcon"/>
                  <div style="margin: 16px;">
                      <van-button round block type="info" native-type="submit" :disabled="alltest1">登陆</van-button>
                  </div>
              </van-form>
          </van-tab>
          <van-tab title="用户名登陆">
            <van-form @submit="onSubmit">
            <van-field v-model="username" name="username" label="用户名" placeholder="用户名" :right-icon="userIcon"/>
            <van-field v-model="password2" type="password" name="password" label="密码" placeholder="密码" :right-icon="pwIcon"/>
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit" :disabled="alltest2">登陆</van-button>
            </div>
        </van-form>
        </van-tab>
        </van-tabs>
    </div>
</template>
<script>
    import {login} from '@/api/request.js'
    import {setCookie} from '@/api/cookie.js'
    import Vue from 'vue';
    import {
        Form,
        field,
        button,
        NavBar,
        Toast,Tab, Tabs
    } from 'vant';
    Vue.use(Form);
    Vue.use(field);
    Vue.use(button);
    Vue.use(NavBar);
    Vue.use(Toast);
    Vue.use(Tab);
    Vue.use(Tabs);
    export default {
        data() {
            return {username:'',usertel:'',password1:'',password2:'',active:0}
        },
        methods:{
          onClickLeft () {
              this.$router.back()
          },
          onClickRight () {
              this.$router.push('/register')
          },
          onSubmit (v){
              let that=this
           login(v).then((data)=>{
               if(data.data.code ==200){
                   setCookie('token',data.data.token)
                   setCookie('isLogin','ok')
                   setCookie('userId',data.data.msg)
                 Toast({message:"登陆成功",onClose:()=>{
                     that.$router.push("/home")
                     }
                 })
                }else {
                   Toast({message:data.data.title,onClose:()=>{
                       that.$router.go(0)
                   }}) 
                }
          })
         }
        },computed:{
           alltest1 () {
               return this.username == "" && this.usertel== "" || this.password1==""
           },alltest2 () {
               return this.username == "" && this.usertel== "" || this.password2==""
           },
           userIcon () {
               if(/^.{2,3}$/.test(this.username)){
                   return 'success'
               }else{
                   return ''
               }
           },
           telIcon () {
               if (/^1[3-9][0-9]{9}$/.test(this.usertel)) {
                   return 'success'
               }else {
                   return ''
               }
           },
           pwIcon () {
             if(/^.{1,5}$/.test(this.password)) {
                return 'success'    
             }else {
                 return ''
             } 
           }
        }
    }
</script>
<style>
</style>
