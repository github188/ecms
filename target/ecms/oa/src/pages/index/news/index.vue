<template>
  <div>
    <v-header></v-header>
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin-top: 72px;
}
</style>

<script>
import header from '../header';
export default {
  components: {
    'v-header': header
  }
};
</script>
