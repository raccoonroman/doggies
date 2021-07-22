<template>
  <div class="dogs-grid">
    <ul v-if="items.length" class="dogs-grid__list">
      <li
        v-for="(url, i) in items"
        :key="`${i}${url}`"
        class="dogs-grid__item"
      >
        <article class="breed-card">
          <button class="breed-card__heart-btn" type="button">
            <span class="visually-hidden">Добавить в избранное</span>
          </button>
          <router-link :to="getBreedCardHref(url)" class="breed-card__link">
            <img :src="url" :alt="getBreedByUrl(url)">
            <h3 class="breed-card__title">{{ getBreedByUrl(url) }}</h3>
          </router-link>
        </article>
      </li>
    </ul>
    <p v-if="loadStatus === 'pending'" class="dogs-grid__stub">
      Загрузка...
    </p>
  </div>
</template>

<script>
import loadState from '../const';

export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
    loadStatus: {
      type: String,
      required: true,
      validator: (value) => [...Object.values(loadState)].includes(value),
    },
  },
  methods: {
    getBreedByUrl(url) {
      return url.match(/(?<=breeds\/).+(?=\/)/)[0].replace('-', ' ');
    },
    getBreedCardHref(url) {
      return this.getBreedByUrl(url).split(' ')[0];
    },
  },
};
</script>

<style lang="scss">
.dogs-grid {
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

    &:hover {
      filter: brightness(120%);
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
}
</style>
