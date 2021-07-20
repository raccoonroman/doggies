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
        state.randomImages = [...state.randomImages, ...images];
      }
    },
  },
  actions: {
    async loadRandomImages({ commit }, amount) {
      try {
        commit('loadRandomImages', { status: PENDING });
        const images = await api.getRandomImages(amount);
        commit('loadRandomImages', { status: RESOLVE, images });
      } catch (error) {
        commit('loadRandomImages', { status: REJECT });
      }
    },
  },
  getters: {
    randomImages: ({ randomImages }) => randomImages,
    loadStatus: ({ loadStatus }) => loadStatus,
  },
};
