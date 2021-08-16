<template>
  <div class="home">

    <v-container>
      <v-layout>
        <v-flex xs12 mt-5>
          <v-btn color="info" @click="login">Googleアカウントでログイン！</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
    

  </div>
</template>

<script>
  import {mapActions} from 'vuex'

  export default {
    name: 'Home',

    methods:{
      ...mapActions(['login']),

    }

  }
</script>
