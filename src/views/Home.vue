<template>
  <div class="container">
    <BreedsFilter />

    <div class="sorting">
      <input
        id="sorting"
        v-model="isSortedAlphabetically"
        type="checkbox"
        class="visually-hidden"
      >
      <label for="sorting">Сортировка по алфавиту</label>
    </div>

    <DogsGrid
      :items="sortedImages"
      :load-status="loadStatus"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import BreedsFilter from '../components/breeds-filter.vue';
import DogsGrid from '../components/dogs-grid.vue';

export default {
  components: {
    BreedsFilter,
    DogsGrid,
  },
  data: () => ({
    isSortedAlphabetically: false,
  }),
  created() {
    this.loadRandomImages();
  },
  mounted() {
    window.addEventListener('scroll', this.onWindowScroll);
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onWindowScroll);
  },
  computed: {
    ...mapGetters({
      randomImages: 'randomImages/randomImages',
      loadStatus: 'randomImages/loadStatus',
    }),
    sortedImages() {
      const { isSortedAlphabetically, randomImages } = this;
      return isSortedAlphabetically ? randomImages.slice().sort() : randomImages;
    },
  },
  methods: {
    loadRandomImages() {
      this.$store.dispatch('randomImages/loadRandomImages');
    },
    onWindowScroll() {
      // is scrolled to page bottom
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        this.loadRandomImages();
      }
    },
  },
};
</script>

<style lang="scss">
.sorting {
  position: absolute;
  top: 50px;
  right: 20px;

  label {
    position: relative;
    padding: 5px 45px 5px 0;
    color: #fff;
    opacity: 0.4;
    cursor: pointer;
    transition: opacity 0.2s;

    &:hover,
    &:focus {
      opacity: 0.7;
    }

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      width: 30px;
      height: 15px;
      border-radius: 15px;
      border: 1px solid #fff;
    }

    &::after {
      content: '';
      position: absolute;
      top: 50%;
      right: 18px;
      transform: translateY(-50%);
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: #fff;
      transition: transform 0.2s;
    }
  }

  input:checked + label {
    opacity: 1;

    &::after {
      transform: translate(16px, -50%)
    }
  }
}
</style>
