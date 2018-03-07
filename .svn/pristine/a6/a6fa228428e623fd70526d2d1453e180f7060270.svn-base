<template>
  <div class="panel">
    <div v-if="hasTitle" class="panel-title">
      <span>{{title}}</span>
      <div class="panel-operate">
        <slot name="button"></slot>
      </div>
    </div>

    <div class="panel-content">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped>
.panel {
  margin-bottom: 24px;
  padding: 12px 24px;
  background: #ffffff;
  border: 0;
}

.panel-title {
  height: 40px;
  line-height: 40px;
  font-size: 16px;
}

.panel-title span {
  position: relative;
  padding-left: 10px;
}

.panel-title span:before {
  content: "";
  position: absolute;
  border-left: 2px solid #01cd78;
  left: 0;
  top: 4px;
  height: 16px;
}

.panel-content {
  margin-top: 20px;
}

.panel-operate {
  float: right;
}

.panel-operate button {
  margin-left: 15px;
}
</style>
<script>
/**
 * 基础面板
 */
export default {
  name: 'panel',
  data() {
    return {
      hasTitle: this.title ? true : false
    }
  },
  props: ['title']
}
</script>
