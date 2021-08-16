<template>
  <v-container fluid fill-height>
      <v-btn color="pink" dark @click="toggleSideMenu">Toggle</v-btn>

      <v-navigation-drawer v-model="$store.state.drawer" absolute temporary>
        <v-list>

            <v-list-item>

                <v-list-item-avatar>
                    <img v-if="photoURL" :src="photoURL" />
                </v-list-item-avatar>

                <v-list-item-content>
                    <v-list-item-title>{{userName}}</v-list-item-title>
                </v-list-item-content>

            </v-list-item>

            

            
            <!-- <v-list-item v-for="(item,id) in items" :key="id" :to="item.link">
                <v-list-item-avatar>
                    <img src="../robotama.webp">
                </v-list-item-avatar>
                <v-list-item-content>
                    <v-list-item-title>ロボ・ロボ玉</v-list-item-title>
                </v-list-item-content>
            </v-list-item> -->

            <v-divider></v-divider>

            <!-- v-forで表示するitemに対してlinkを結びつけている！ -->
            <v-list-item v-for="(item,id) in items" :key="id" :to="item.link">

                <v-list-item-icon>
                    <v-icon>{{item.icon}}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                    <v-list-item-title>{{item.title}}</v-list-item-title>
                </v-list-item-content>

            </v-list-item>

        </v-list>
      </v-navigation-drawer>
  </v-container>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'

  export default {

    data(){
        return {
            items:[ // linkを設定している！
                    {id:1,title:'ホーム',icon:"mdi-home",link:'/'},
                    {id:2,title:'連絡先一覧',icon:"mdi-menu",link:{name:"Addresses"}},
            ]
        }
    },
    methods:{
        ...mapActions(['toggleSideMenu']),
    },
    computed:{
        ...mapGetters(['userName','photoURL']),
    }
  }
</script>



