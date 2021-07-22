import Vue from 'vue';
import Vuex from 'vuex';
import randomImages from './random-images';
import allBreeds from './all-breeds';
import imagesByBreed from './images-by-breed';
import favorites from './favorites';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    randomImages,
    allBreeds,
    imagesByBreed,
    favorites,
  },
});
