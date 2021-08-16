<template>

  <v-app>

    <!-- メニューバー -->
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="toggleSideMenu"></v-app-bar-nav-icon>
      <v-toolbar-title>ロボ玉のアドレス帳アプリ</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-toolbar-items v-if="$store.state.login_user">
        <v-btn text @click="logout">ログアウト</v-btn>
      </v-toolbar-items>

    </v-app-bar>

    <!-- サイドナビゲーション -->
    <SideNav />
    
    <v-content>
      <v-container fluid fill-height align-start>

        <!-- 画面に表示するものとして「router-viewタグ」を使って、ローカル登録されているコンポーネントたちを呼び出している！！ -->
        <router-view />

      </v-container>
    </v-content>
    
  </v-app>

</template>

<script>
import SideNav from "./components/SideNav.vue"

//vuexの中から、mapActionsだけを貰ってきている！ => 「分割代入」 
import {mapActions}from "vuex"

import firebase from 'firebase'

export default {
  name: 'App',
  //子コンポーネントをローカル登録！
  components:{
    SideNav
  },

  created(){ // 画面生成時にユーザー情報があるならば、ログインユーザーの情報をセット！ なければログインユーザーの情報を削除！
    firebase.auth().onAuthStateChanged(user => {
      
      if(user){

        console.log('ログイン認証完了、ユーザー情報があるためユーザー情報をセットする！');
        this.setLoginUser(user);

        // コンソールで確認
        console.log("ログインしているユーザーは")

        // コンポーネント側から、Storeにアクセスするための方法の1つ！ => 「this.$store」を利用する！
        console.log(this.$store.state.login_user)
        
        this.DatabaseAddresses();

        // 画面生成時にユーザー情報があって、さらにHome画面の場合は、アドレス帳一覧画面に画面遷移する！
        if(this.$router.currentRoute.name === 'Home'){
          this.$router.push('/addresses',() => {console.log('現在、Home画面であるためアドレス帳一覧に移動する！')}) // 第二引数に成功したときの処理を書いている！！
        }

      } else {

        console.log('ユーザー情報なし！！');
        this.deleteLoginUser()

        this.$router.push({name:'Home'},() => {console.log('Home画面でログインするように仕向けるぜぇぇぇぇぇ！！')})
      }
    })
  },

  data: () => ({
    //
  }),
  methods:{
    // 「スプレッド構文」+ 「mapActionsメソッド」(中には連携させるactionsのメソッド名を持たせる！！)
    ...mapActions(['toggleSideMenu','setLoginUser','deleteLoginUser','logout','DatabaseAddresses'])
  }


};
</script>
