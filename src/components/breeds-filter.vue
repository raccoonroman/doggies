<template>
  <div class="breeds-filter">
    <button
      type="button"
      class="breeds-filter__select-btn"
      :class="{ active: isBreedsNamesShown }"
      @click="isBreedsNamesShown = !isBreedsNamesShown"
    >
      Породы
    </button>

    <router-link v-if="breed" to="/" class="breeds-filter__selected-name">
      {{ breed }}
    </router-link>

    <div v-show="isBreedsNamesShown" class="breeds-filter__names-list">
      <router-link :to="`/${breed}`" @click.native="isBreedsNamesShown = false"
        v-for="breed in breeds"
        :key="breed"
        class="breeds-filter__name-link"
      >
        {{ breed }}
      </router-link>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data: () => ({
    isBreedsNamesShown: false,
  }),
  created() {
    this.$store.dispatch('allBreeds/loadAllBreeds');
  },
  computed: {
    ...mapGetters({
      breeds: 'allBreeds/breeds',
    }),
    breed() {
      return this.$route.params.breed;
    },
  },
};
</script>

<style lang="scss">
.breeds-filter {
  padding: 50px 0;

  &__select-btn {
    position: relative;
    padding: 0;
    padding-right: 16px;
    background-color: transparent;
    border: 0;
    color: #fff;
    font-size: inherit;
    line-height: inherit;
    border-bottom: 1px dashed #fff;

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      width: 9px;
      height: 5px;
      background-image: url('../assets/select-arrow.svg');
      background-repeat: no-repeat;
      background-position: center;
      background-size: contain;
    }

    &.active::before {
      transform: translateY(-50%) rotate(180deg);
    }
  }

  &__selected-name {
    margin-left: 20px;
    position: relative;
    padding: 4px 12px 3px;
    padding-right: 26px;
    border: 1px solid #3C59F0;
    border-radius: 20px;
    color: #3C59F0;
    font-size: 12px;
    line-height: 16px;
    background-color: transparent;
    background-image: url('../assets/close.svg');
    background-repeat: no-repeat;
    background-position: right 12px center;
  }

  &__names-list {
    display: flex;
    flex-wrap: wrap;
    margin: 16px -8px 0;
  }

  &__name-link {
    display: block;
    cursor: pointer;
    margin: 8px;
    padding: 3px 12px;
    font-size: 12px;
    line-height: 16px;
    color: #fff;
    text-transform: capitalize;
    border: 1px solid #fff;
    border-radius: 20px;
    background-color: transparent;
    opacity: 0.4;
    transition: opacity 0.2s;

    &:hover,
    &:focus {
      opacity: 0.7;
    }

    // &.active {
    //   color: #3C59F0;
    //   border-color: #3C59F0;
    //   opacity: 1;
    // }
  }
}
</style>
