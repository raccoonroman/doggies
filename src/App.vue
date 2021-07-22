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
  beforeCreate() {
    if (!localStorage.getItem('favorites')) {
      localStorage.setItem('favorites', JSON.stringify([]));
    }
    this.$store.commit('favorites/initialise');
  },
};
</script>

<style lang="scss">
@import './scss/common';
</style>
