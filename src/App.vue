<template>
  <div id="app">
    <PageHeader />
    <router-view />
  </div>
</template>

<script>
import PageHeader from './components/page-header.vue';

export default {
  components: {
    PageHeader,
  },
};
</script>

<style lang="scss">
@import './scss/common';
</style>
