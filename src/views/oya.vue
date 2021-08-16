
<template>
  <div class="oya">
    <KoComponent /> 
  </div>
</template>

<script>
// @ is an alias to /src
import KoComponent from '@/components/ko.vue' //importする。

//template内で、importしたものを実際に呼び出して、表示している！！

export default { //exportする。
  name: 'oya',
  components: {
    KoComponent
  }
}
</script>
