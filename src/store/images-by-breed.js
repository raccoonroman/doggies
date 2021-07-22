import loadState from '../const';
import api from '../api';

const { PENDING, RESOLVE, REJECT } = loadState;

export default {
  namespaced: true,
  state: {
    randomImages: [],
    loadStatus: '',
  },
  mutations: {
    loadRandomImages(state, { status, images }) {
      state.loadStatus = status;
      if (status === loadState.RESOLVE) {
        state.randomImages = images;
      }
    },
    loadMoreRandomImages(state, { status, images }) {
      state.loadStatus = status;
      if (status === loadState.RESOLVE) {
        state.randomImages = [...state.randomImages, ...images];
      }
    },
  },
  actions: {
    async loadRandomImages({ commit }, { breed, amount }) {
      try {
        commit('loadRandomImages', { status: PENDING });
        const images = await api.getImagesByBreed(breed, amount);
        commit('loadRandomImages', { status: RESOLVE, images });
      } catch (error) {
        commit('loadRandomImages', { status: REJECT });
      }
    },
    async loadMoreRandomImages({ commit }, { breed, amount }) {
      try {
        commit('loadMoreRandomImages', { status: PENDING });
        const images = await api.getImagesByBreed(breed, amount);
        commit('loadMoreRandomImages', { status: RESOLVE, images });
      } catch (error) {
        commit('loadMoreRandomImages', { status: REJECT });
      }
    },
  },
  getters: {
    randomImages: ({ randomImages }) => randomImages,
    loadStatus: ({ loadStatus }) => loadStatus,
  },
};
