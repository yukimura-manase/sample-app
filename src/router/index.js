import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Oya from '../views/oya.vue'
import Addresses from '../views/Addresses.vue'
import AddressForm from '../views/AddressForm.vue'

Vue.use(VueRouter)

// 画面表示の制御対象を登録している！
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path:'/oya',
    name:'Oya',
    component: Oya
  },
  {
    path:'/addresses',
    name:'Addresses',
    component: Addresses
  },
  {
    //特定のデータを変更できるように、パラメータ（外部データ）を渡している。 => 「:」の後に続くデータが「パラメータ」
    path:'/addresses/:address_id?/edit', //「?」は、パラメータの後にパス(URL)が続く場合につける！！ => 今回は、パラメータの後に名前をつけているだけ！！
    name:'Address_edit',
    component: AddressForm
  }

]

const router = new VueRouter({ //「画面移動の制御」 => 「データ移動の経路を制御する！」
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// routerのデータを外部に公開している！！
export default router 


