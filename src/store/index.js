import Vue from 'vue'
import Vuex from 'vuex'
import firebase from 'firebase'

//Vuexを使用するためにuseメソッドでVueの設計図に組み込んでいる！！
Vue.use(Vuex)

// VuexのStore機能をインスタン化して、それを外部に公開している！！
export default new Vuex.Store({

  state: {
    drawer:false, // 初期値false => 非表示！

    addresses:[ //連絡先を保存する配列！！
      {name:"友人１",tel:"090-0000-1111",email:"sample1@mail.com",address:"東京都渋谷区"},
      {name:"友人2",tel:"090-0000-2222",email:"sample2@mail.com",address:"東京都新宿区"},
    ],

    login_user:null,

  },

  // stateの値を変更する・更新するのがmutationsの役割！！
  mutations: {
    toggleSideMenu(state){ //satteの値を引数に持たせている！連携・リンクしている。
      state.drawer = !state.drawer;
      console.log('toggleSideMenu完了！！')
    },
    
    addAddress(state,{id,address}){ //連絡先をstateのaddressesに追加する！！

      address.id = id; // addressオブジェクトにidというkeyを追加して、そこに回覧されてきたid(DBが割り振ってくれた)をvalueとしてセットする！
      state.addresses.push(address);

      console.log(state.addresses);
      console.log('addAddress完了！');
    },

    setLoginUser(state,user){
      state.login_user = user;

      console.log(state.login_user); // setしたuser情報を確認！ => 認証ログインしたユーザー情報をアプリ内で使うためにデータ構造の確認が必須！！
      console.log('setLoginUser完了！');
    },

    deleteLoginUser(state){
      state.login_user = null;
      console.log('deleteLoginUser完了！');
    },

  },

  // 外部との通信はactionsの役割！！
  actions: {
    toggleSideMenu({commit}){ //actionsがmutationsに処理実行を支持するから、共通のメソッド名にしておくと判断しやすい！！

      console.log('toggleSideMenu起動！')
      commit("toggleSideMenu"); //mutationsを実行している！ => commitさせている・取り組ませている！！
    },


    addAddress({getters,commit},address){

      console.log('addAddress起動！');

      if(getters.uid){
        firebase.firestore().collection(`users/${getters.uid}/addresses`)

        .add(address) // ここでfirestore(DB)にデータを追加している！

        .then(DBdata => {

          console.log('非同期通信のレスデータの構造を確認する！');
          console.log(DBdata);

          commit('addAddress',{id:DBdata.id,address});
        })
        
      }
      
    },

    login(){
      const google_auth_provider = new firebase.auth.GoogleAuthProvider()

      firebase.auth().signInWithRedirect(google_auth_provider)
    },

    setLoginUser({commit},user){
      console.log('setLoginUser起動！')
      commit('setLoginUser',user);
    },

    logout(){
      firebase.auth().signOut()
    },

    deleteLoginUser({commit}){
      console.log('deleteLoginUser起動！');
      commit('deleteLoginUser');
    },

    // firestoreからのデータ取得を実装！！ => ログイン処理の時点でDBからそのユーザーの登録情報(DB保管情報)を引っ張ってくる！
    DatabaseAddresses({getters,commit}){

      console.log('DatabaseAddresses起動！DBであるFirestoreからログインユーザーの登録情報を持ってきます！！');

      firebase.firestore().collection(`users/${getters.uid}/addresses`)
      .get()
      .then(DBdata => {

        console.log('firestoreから保管してもらっていたデータを受け取りました！データ構造確認！！');
        console.log(DBdata);

        // 受け取ったDB保管データには識別子としてIDが割り振られているので、そのIDとaddress情報をそれぞれidとaddress(key)にvalueとしてセット！ => オブジェクト化して渡す！
        DBdata.forEach(DBstock => {commit('addAddress',{id:DBstock.id,address:DBstock.data})});

      })
    },

  },

  // stateの値から新しい値を計算する・算出する・加工して新しい値をゲットするのがgettersの役割！！
  getters: {

    // 「三項演算子」 => 「判定対象」(条件式) ? 「trueの場合の処理」:「falseの場合の処理」
    userName: (state) => {
      // userNameのvalueに無名アローが入っている。しかもそれは三項演算子である。

      console.log('userNameをゲットするgetters起動！！');

      return state.login_user ? state.login_user.displayName:'';
      // state.login_userの真偽判断 => trueなら「state.login_user.displayName」がuserNameのvalueとなる！ falseなら「''」(空文字)がvalueとなる！
    },


    photoURL: (state) => {
      console.log('photoURLをゲットするgetters起動！！');
      return state.login_user ? state.login_user.photoURL:'';
    },
    
    uid: (state) => {

      console.log('uidをゲットするgetters起動！！');
      
      return state.login_user ? state.login_user.uid:null;
    },

    getAddressById: (state) => {
      
      (id) => {

        state.addresses.find((address) => {
          return address.id === id;
        });
  
      }

    },


  }

})
