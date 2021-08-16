<template>
    <v-container text-xs-center justify-center>

        <v-flex xs12 mt-5 mr-5 text-right>

            <!-- router-linkタグ内は、、、 AddressFormコンポーネントとリンクしている！！ -->
            <router-link :to="{name:'Address_edit'}">
                <v-btn color="info">
                    連絡先追加
                </v-btn>
            </router-link>

        </v-flex>
        
        <v-layout row wrap>
            
            <v-flex xs12>
                <h1>アドレス帳</h1>
            </v-flex>

            <v-flex xs12 mt-5 justify-center>
                <v-data-table :headers="headers" :items="addresses">
                    <template v-slot:items="props">
                        <td class="text-xs-left">{{props.item.name}}</td>
                        <td class="text-xs-left">{{props.item.tel}}</td>
                        <td class="text-xs-left">{{props.item.email}}</td>
                        <td class="text-xs-left">{{props.item.address}}</td>
                    </template>
                </v-data-table>
            </v-flex>

        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data(){
            return {
                headers:[
                    {text:"名前",value:"name"},
                    {text:"電話番号",value:"tel"},
                    {text:"メールアドレス",value:"email"},
                    {text:"住所",value:"address"},
                ],
                addresses:[]
            }
        },
        // 画面生成時に、Store内にあるstateのaddressesをdataのaddresses配列に代入する！！
        created(){
            console.log('アドレス帳画面を生成！ store内のデータを持ってきます！！');
            this.addresses = this.$store.state.addresses;
            console.log(this.addresses);
        }
    }
</script>

<style scoped lang="scss">

</style>
