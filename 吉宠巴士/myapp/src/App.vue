<template>
  <div class="app">
    <router-view></router-view>
    <router-view name="foot"></router-view>
  </div>
</template>
<script>
// import comfooter from '@/components/comfooter.vue';
  export default {
    name: "App",
    props: [],
    components: {
    
    },
     data() {
      return {
        // is_show:true
      };
    },
    created() {
    //    this.$nextTick(() => {
    //   // 接受了detail发送的 footernav 以及参数 false参数  并且赋值给了is_show  ， 此时的is_show  为false，则隐藏
    //    this.eventBus.$on("comfooter", (flag) => {
    //     this.is_show = flag;
    //    })
    // });
    }
  };
</script>
<style lang="scss">
.app{
  padding-bottom: 0.4rem;
   overflow: hidden;
  //  border: 1px solid black;
}

</style>
