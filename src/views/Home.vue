<template>
  <div class="container">
    <DogsFilter />

    <div class="breeds-grid">
      <ul class="breeds-grid__list">
        <li class="breeds-grid__item">
          <article class="breed-card">
            <button class="breed-card__heart-btn" type="button">
              <span class="visually-hidden">Добавить в избранное</span>
            </button>
            <a href="#" class="breed-card__link">
              <img src="../assets/dog.jpg" alt="">
              <h3 class="breed-card__title">Spaniel</h3>
            </a>
          </article>
        </li>
        <li class="breeds-grid__item">
          <article class="breed-card">
            <button class="breed-card__heart-btn" type="button">
              <span class="visually-hidden">Добавить в избранное</span>
            </button>
            <a href="#" class="breed-card__link">
              <img src="../assets/dog.jpg" alt="">
              <h3 class="breed-card__title">Spaniel</h3>
            </a>
          </article>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import DogsFilter from '../components/filter.vue';

export default {
  components: {
    DogsFilter,
  },
  async created() {
    const response = await this.$api.getRandomImages();
  },
};
</script>

<style lang="scss">
.breeds-grid {
  &__list {
    margin: 0;
    padding: 0 0 30px;
    list-style: none;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 30px;
  }

  &__item {
    min-height: 290px;

    &:nth-child(10n + 1) {
      grid-column: 1 / -1;
      min-height: 512px;
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
  }

  &__link:hover {
    // opacity: 0.8;
    filter: brightness(119%);
  }

  .breeds-grid__item:nth-child(10n + 1) &__title {
    font-size: 30px;
    bottom: 40px;
    right: 50px;
  }

  .breeds-grid__item:nth-child(10n + 1) &__heart-btn {
    top: 10px;
    left: 10px;
  }
}
</style>
