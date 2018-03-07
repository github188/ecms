<template>
  <div>
    <c-header></c-header>
    <router-view></router-view>
  </div>
</template>
<script>
import header from '../header';
export default {
  name: 'write',
  components: {
    'c-header': header
  }
};
</script>
