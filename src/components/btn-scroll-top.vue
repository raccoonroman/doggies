<template>
  <button
    v-show="isButtonShown"
    class="btn-scroll-top"
    @click="scrollToTop"
  />
</template>

<script>
export default {
  data: () => ({
    isButtonShown: false,
  }),
  mounted() {
    window.addEventListener('scroll', this.onWindowScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onWindowScroll);
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    },
    onWindowScroll() {
      this.isButtonShown = document.body.scrollTop > 99 || document.documentElement.scrollTop > 99;
    },
  },
};
</script>

<style lang="scss">
.btn-scroll-top {
  position: fixed;
  z-index: 99;
  bottom: 32px;
  right: 32px;
  width: 55px;
  height: 55px;
  border-radius: 50%;
  border: 1px solid #fff;
  background-color: transparent;
  background-image: url('../assets/arrow-top.svg');
  background-position: center;
  background-repeat: no-repeat;
  transition: background-color 0.2s;

  &:hover,
  &:focus {
    background-color: rgba(#fff, 0.2);
  }
}
</style>
