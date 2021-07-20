import api from '../api';

export default {
  namespaced: true,
  state: {
    breeds: [],
  },
  mutations: {
    setBreeds(state, breeds) {
      state.breeds = breeds;
    },
  },
  actions: {
    async loadAllBreeds({ commit }) {
      try {
        const breeds = await api.getAllBreeds();
        commit('setBreeds', breeds);
      } catch (error) {
        console.error(error);
      }
    },
  },
  getters: {
    breeds: ({ breeds }) => breeds,
  },
};
