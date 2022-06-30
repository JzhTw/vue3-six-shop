// import Vue from 'vue';
// import Vuex from 'vuex';
import { createStore } from 'vuex';

import app from './modules/app';
import getters from './getters';
import user from './modules/user';

const store = new createStore({
  modules: {
    app,
    user,
  },
  getters
});

export default store;
