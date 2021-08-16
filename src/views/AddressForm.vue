<template>
    <v-container text-xs-center>
        <v-layout row wrap justify-center>

            <v-flex xs12 class="text-center">
                <h1>連絡先編集</h1>
            </v-flex>

            <v-flex xs5 mt-5>
                <v-card>
                    <v-card-text>
                        <v-form>

                            <v-text-field v-model="address.name" label="名前"></v-text-field>
                            <v-text-field v-model="address.tel" label="電話番号"></v-text-field>
                            <v-text-field v-model="address.email" label="メールアドレス"></v-text-field>
                            <v-text-field v-model="address.address" label="住所"></v-text-field>

                            <div class="text-center">
                                <v-btn @click="$router.push({name:'Addresses'})">キャンセル</v-btn>
                                
                                <!-- 保存ボタンにイベント設定する！ -->
                                <v-btn color="info" class="ml-2" @click="submit()">保存</v-btn>
                            </div>

                        </v-form>
                    </v-card-text>
                </v-card>
            </v-flex>

        </v-layout>
    </v-container>
</template>

<script>
    // vuexからmapActionsを読み込んでいる！
    import { mapActions } from 'vuex';

    export default {
        data(){
            return {
                address:{} // v-modelで連携しているので、そのデータが入ってくる！
            }
        },
        methods:{ // methodsオプション

            // importしたmapActions機能を使って、StoreのactionsにあるメソッドaddAddressを呼び出している！！！ => 呼び出すときは、「引数」 + 「配列形」
            ...mapActions(["addAddress"]),

            submit(){
                // methods内で呼び出しているaddAddressメソッドにデータを持たせている！

                console.log('保存ボタンが押されたぞぉぉぉ！！');
                console.log(this.address);
                this.addAddress(this.address);
                // コンソールを確認すると、ここのStoreとの処理が完了してから、次の処理に移行していることがわかる！！

                //動的なルーティング => メソッド実行時にAddressesに画面移動するリンクを張っている！！
                this.$router.push({name:"Addresses"});

                console.log('アドレス一覧画面に戻る！')

                this.address = {}; //addressを初期化している。
            },
            
            
        }
    }

</script>




