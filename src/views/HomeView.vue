<template lang="pug">
p aaa
</template>
  
<script lang="ts">
import { Options, Vue } from 'vue-class-component'
@Options({
  components: {
    // GameSetting
  }
})
export default class HomeView extends Vue {}
</script>
<style scoped>
.home{
  width: 100vw;
  height: 100vh;
}
</style>
  