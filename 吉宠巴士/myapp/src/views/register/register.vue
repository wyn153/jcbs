<template>
    <div>
        <van-nav-bar title="注册" left-text="返回" right-text="去登陆" left-arrow @click-left="onClickLeft" @click-right="onClickRight"/>
        <van-form @submit="onSubmit">
            <van-field v-model="username" name="username" label="用户名" placeholder="用户名" :right-icon="userIcon"/>
            <van-field v-model="usertel" name="tel" label="手机号" placeholder="手机号" :right-icon="telIcon"/>
            <van-field v-model="usersms" name="code" label="验证码" placeholder="验证码">
                <template #button>
                    <van-button size="small" type="primary" @click.prevent="smsSend">{{sms}}</van-button>
                </template>
            </van-field>
            <van-field v-model="password" type="password" name="password" label="密码" placeholder="密码" :right-icon="pwIcon"/>
            <div style="margin: 16px;">
                <van-button round block type="info" native-type="submit" :disabled="alltest">注册</van-button>
            </div>
        </van-form>
    </div>
</template>

<script>
    import {sendSms,register} from '@/api/request.js'
    import Vue from 'vue';
    import {
        Form,
        field,
        button,
        NavBar,
        Toast
    } from 'vant';
    Vue.use(Form);
    Vue.use(field);
    Vue.use(button);
    Vue.use(NavBar);
    Vue.use(Toast);
    export default {
        data() {
            return {username:'',usertel:'',usersms:'',password:'',usersms:'',sms:'发送验证码'}
        },
        methods:{
          onClickLeft () {
              this.$router.back()
          },
          onClickRight () {
              this.$router.push('/login')
          },
          smsSend () {
              let that=this
             if(/^1[3-9][0-9]{9}$/.test(this.usertel)) {
                 sendSms(this.usertel)
                 let time=60
                 clearInterval(t)
                 let t=setInterval(function(){
                    that.sms=time+"秒后重新发送"
                     time--
                     if(time<1){
                      clearInterval(t) 
                        that.sms="发送验证码"
                     }
                 },1000)
                 
             }else{
                  Toast("手机号不正确")
             }
          },
          onSubmit (v){
              let that=this
           register(v).then((data)=>{
               // console.log(data.data.title)
               if(data.data.code == 200){
                 Toast({message:"注册成功",onClose:()=>{
                     that.$router.push("/login")
                     }
                 })
                }else {
                   Toast({message:data.data.title,onClose:()=>{
                       // that.$router.go(0)
                   }}) 
                }
          })
         }
        },computed:{
           alltest () {
               return this.username == "" || this.usertel== "" || this.usersms=="" || this.password==""
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
