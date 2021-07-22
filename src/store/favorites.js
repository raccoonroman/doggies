export default {
  namespaced: true,
  state: {
    favorites: [],
  },
  mutations: {
    updateFavorites(state, { url }) {
      const newFavorites = state.favorites.includes(url)
        ? state.favorites.filter((i) => i !== url)
        : [...state.favorites, url];

      state.favorites = newFavorites;
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    },
    initialise(state) {
      state.favorites = JSON.parse(localStorage.getItem('favorites'));
    },
  },
  getters: {
    favorites: ({ favorites }) => favorites,
  },
};
