<template>
  <div class="container">
    <DogsFilter />

    {{ breeds }}

    <div class="breeds-grid">
      <ul v-if="randomImages.length" class="breeds-grid__list">
        <li
          v-for="(url, i) in randomImages"
          :key="`${i}${url}`"
          class="breeds-grid__item"
        >
          <article class="breed-card">
            <button class="breed-card__heart-btn" type="button">
              <span class="visually-hidden">Добавить в избранное</span>
            </button>
            <a href="#" class="breed-card__link">
              <img :src="url" :alt="getBreedByUrl(url)">
              <h3 class="breed-card__title">{{ getBreedByUrl(url) }}</h3>
            </a>
          </article>
        </li>
      </ul>
      <p class="breeds-grid__stub" v-if="loadStatus === 'pending'">
        Загрузка...
      </p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import DogsFilter from '../components/filter.vue';

export default {
  components: {
    DogsFilter,
  },
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
      breeds: 'randomImages/breeds',
    }),
  },
  methods: {
    loadRandomImages() {
      this.$store.dispatch('randomImages/loadRandomImages');
    },
    getBreedByUrl(url) {
      return url.match(/(?<=breeds\/).+(?=\/)/)[0].replace('-', ' ');
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
.breeds-grid {
  text-align: center;

  &__stub {
    opacity: 0.5;
  }

  &__list {
    margin: 0;
    padding: 0 0 30px;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
  }

  &__item {
    height: 290px;

    &:nth-child(10n + 1) {
      grid-column: 1 / 3;
    }

    &:nth-child(10n + 7) {
      grid-column: 2 / 4;
    }
  }

  &__load-more-btn {
    font-size: inherit;
    border: 0;
    color: #fff;
    background-color: transparent;
    opacity: 0.4;
    transition: opacity 0.2s;

    &:hover,
    &:focus {
      opacity: 0.7;
    }
  }
}

.breed-card {
  height: 100%;
  position: relative;
  border-radius: 8px;
  overflow: hidden;

  &__heart-btn {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: 79px;
    height: 76px;
    padding: 0;
    border: 0;
    background-color: transparent;
    background-image: url('../assets/heart-empty.svg');
    background-size: 29px 26px;
    background-position: center;
    background-repeat: no-repeat;
    transition: transform 0.2s;

    &:hover,
    &:focus {
      transform: scale(1.2);
    }

    &.active {
      background-image: url('../assets/heart.svg');
    }
  }

  &__link {
    display: block;
    position: relative;
    height: 100%;
    color: inherit;
    transition: filter 0.2s;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(1.26deg, #000000 -5.53%, transparent 54.45%);
    }
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__title {
    position: absolute;
    bottom: 20px;
    right: 25px;
    margin: 0;
    font-weight: 600;
    font-size: 25px;
    letter-spacing: 0.01em;
    text-transform: capitalize;
  }

  &__link:hover {
    filter: brightness(120%);
  }
}
</style>
