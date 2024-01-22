import { createApp } from "vue";
import { createStore } from "vuex";
import App from "./App.vue";

const store = createStore({
  state() {
    return {
      programActive: "invisible",

      firstCountryCurrency: null,
      secondCountryCurrency: null,
      convertAmount: null,
      converted: null,
      convesationRate: null,
    };
  },
  mutations: {
    startApp(state) {
      state.programActive = "visible";
    },

    setFirstCountryCurrency(state, currency) {
      state.firstCountryCurrency = currency;
      //   console.log(state.firstCountryCurrency);
    },
    setSecondCountryCurrency(state, currency) {
      state.secondCountryCurrency = currency;
      //   console.log(state.secondCountryCurrency);
    },
    setConvertAmount(state, value) {
      state.convertAmount = value;
      //   console.log(state.convertAmount);
    },
  },
  actions: {
    updateFirstCountryCur(context, value) {
      context.commit("setFirstCountryCurrency", value);
    },
    updateSecondCountryCur(context, value) {
      context.commit("setSecondCountryCurrency", value);
    },
    updateConvertAmount(context, value) {
      context.commit("setConvertAmount", value);
    },
  },
  getters: {
    appIsStarted(state) {
      return state.programActive;
    },

    firstCountryCurrency(state) {
      return state.firstCountryCurrency;
    },
    secondCountryCurrency(state) {
      return state.secondCountryCurrency;
    },
  },
});
const app = createApp(App);
app.use(store);
app.mount("#app");
