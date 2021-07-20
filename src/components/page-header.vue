<template>
  <header class="header">
    <div class="container">
      <nav>
        <router-link to="/">
        <img src="../assets/logo.svg" alt="Пёсель">
        </router-link>
        <ul class="header__list">
          <li class="header__item header__item--favorites">
            <router-link to="/favourites">Избранные пёсели</router-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<style lang="scss">
.header {
  padding: 32px 0;
  background-color: #151419;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.55);

  nav {
    display: flex;
    align-items: center;
  }

  &__list {
    margin: 0;
    padding: 0;
    list-style: none;
    flex-grow: 1;
    display: flex;
    align-items: center;
  }

  &__item {
    &--favorites {
      margin-left: auto;
    }

    a {
      color: #fff;
      opacity: 0.4;
      transition: opacity 0.2s;
    }

    a:hover,
    a:focus {
      opacity: 0.8;
    }

    a.router-link-active {
      opacity: 1;
    }
  }

  &__item--favorites {
    a {
      position: relative;
      padding-right: 26px;
    }

    a::after {
      content: '';
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      width: 16px;
      height: 14px;
      background-image: url('../assets/heart-empty.svg');
      background-size: contain;
      background-position: center;
    }
  }
}
</style>
