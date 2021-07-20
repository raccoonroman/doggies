<template>
  <div class="container">
    <div class="filter">
      <div class="filter__row">
        <button
          type="button"
          class="filter__breeds-btn"
          :class="{ active: isBreedsNamesShown }"
          @click="isBreedsNamesShown = !isBreedsNamesShown"
        >
          Породы
        </button>
        <div class="filter__sorting">
          <input
            id="sorting"
            v-model="isSortedAlphabetically"
            type="checkbox"
            class="visually-hidden"
          >
          <label for="sorting">Сортировка по алфавиту</label>
        </div>
      </div>

      <div
        v-show="isBreedsNamesShown && randomImages.length"
        class="filter__breed-names"
      >
        <template v-for="breed in breeds">
          <input
            :id="breed"
            :key="`${breed}input`"
            v-model="selectedBreeds"
            class="visually-hidden"
            type="checkbox"
            :value="breed"
          >
          <label :key="`${breed}label`" :for="breed">
            {{ breed }}
          </label>
        </template>
      </div>
    </div>

    <DogsGrid
      :items="filteredImages"
      :load-status="loadStatus"
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
  data: () => ({
    isBreedsNamesShown: false,
    isSortedAlphabetically: false,
    selectedBreeds: [],
  }),
  created() {
    this.loadRandomImages();
    this.loadAllBreeds();
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
      breeds: 'allBreeds/breeds',
    }),
    sortedImages() {
      const { isSortedAlphabetically, randomImages } = this;
      return isSortedAlphabetically ? randomImages.slice().sort() : randomImages;
    },
    filteredImages() {
      if (!this.selectedBreeds.length) {
        return this.sortedImages;
      }

      return this.sortedImages.filter((url) => (
        this.selectedBreeds.some((breed) => url.includes(breed))
      ));
    },
  },
  methods: {
    loadRandomImages() {
      this.$store.dispatch('randomImages/loadRandomImages');
    },
    loadAllBreeds() {
      this.$store.dispatch('allBreeds/loadAllBreeds');
    },
    onWindowScroll() {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        this.loadRandomImages();
      }
    },
  },
};
</script>

<style lang="scss">
.filter {
  padding: 50px 0;

  &__row {
    display: flex;
    align-items: center;
  }

  &__breeds-btn {
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

  &__sorting {
    margin-left: auto;
  }

  &__sorting label {
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

  &__sorting input:checked + label {
    opacity: 1;

    &::after {
      transform: translate(16px, -50%)
    }
  }

  &__breed-names {
    display: flex;
    flex-wrap: wrap;
    margin: 16px -8px 0;
  }

  &__breed-names label {
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
  }

  &__breed-names input:checked + label {
    color: #3C59F0;
    border-color: #3C59F0;
    opacity: 1;
  }
}
</style>
