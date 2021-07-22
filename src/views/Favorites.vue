<template>
  <div class="container favorites">
    <DogsGrid
      :items="favorites"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import DogsGrid from '../components/dogs-grid.vue';

export default {
  components: {
    DogsGrid,
  },
  computed: mapGetters({
    favorites: 'favorites/favorites',
  }),
};
</script>

<style lang="scss">
.favorites {
  padding-top: 100px;
}
</style>
