import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../views/home/home.vue'
import comfooter from '@/components/comfooter.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    alias: '/home',
    components:{
      default:home,
      foot: comfooter
    } 
  },
  {
    path: '/market',
    name: 'market',
    components: 
    {
     default: () => import(/* webpackChunkName: "about" */ '@/views/market/market.vue'),
     foot: comfooter
    }
  },
  {
    path: '/care',
    name: 'care',
    components: {
      default:() => import(/* webpackChunkName: "about" */ '@/views/care/care.vue'),
      foot: comfooter
    }
  },
  {
    path: '/my',
    name: 'my',
    components: {
      default:() => import(/* webpackChunkName: "about" */ '@/views/my/my.vue'),
      foot: comfooter
    }
  },
  {
    path: '/detail',
    name: 'detail',
    component: () => import(/* webpackChunkName: "about" */ '@/views/detail/detail.vue')
  }
  ,
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '@/views/login/login.vue')
  }
  ,
  {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "about" */ '@/views/register/register.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import(/* webpackChunkName: "about" */ '@/views/cart/index.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import(/* webpackChunkName: "about" */ '@/views/search/search.vue')
  },
  {
    path: '/searchResult',
    name: 'searchResult',
    component: () => import(/* webpackChunkName: "about" */ '@/views/searchResult/searchResult.vue')
  },
  {
    path: '/city',
    name: 'city',
    component: () => import(/* webpackChunkName: "about" */ '@/views/city/city.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
