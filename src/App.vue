<template>
  <div id="app">
    <PageHeader />
    <router-view />
    <BtnScrollTop />
  </div>
</template>

<script>
import PageHeader from './components/page-header.vue';
import BtnScrollTop from './components/btn-scroll-top.vue';

export default {
  components: {
    PageHeader,
    BtnScrollTop,
  },
};
</script>

<style lang="scss">
@import './scss/common';
</style>
