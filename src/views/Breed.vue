<template>
  <div class="container">
    <BreedsFilter />

    <DogsGrid
      :items="randomImages"
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
  created() {
    this.loadRandomImages(this.breed);
  },
  mounted() {
    window.addEventListener('scroll', this.onWindowScroll);
  },
  beforeRouteUpdate(to, from, next) {
    // коли наприклад, переходимо з '/pitbull' на '/husky'
    this.loadRandomImages(to.params.breed);
    next();
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.onWindowScroll);
  },
  computed: {
    ...mapGetters({
      randomImages: 'imagesByBreed/randomImages',
      loadStatus: 'imagesByBreed/loadStatus',
    }),
    breed() {
      return this.$route.params.breed;
    },
  },
  methods: {
    loadRandomImages(breed) {
      this.$store.dispatch('imagesByBreed/loadRandomImages', { breed });
    },
    loadMoreRandomImages(breed) {
      // підгружаємо більше зображень при скролі
      this.$store.dispatch('imagesByBreed/loadMoreRandomImages', { breed });
    },
    onWindowScroll() {
      // якщо доскролили до низу сторінки
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        this.loadMoreRandomImages(this.breed);
      }
    },
  },
};
</script>
