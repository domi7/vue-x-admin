import Vue from "vue";
import Vuex from "vuex";

import auth from "./auth.module";
import theme from "./theme.module";
import breadcrumb from "./breadcrumb.module";
import menumeta from "./menumeta.module";
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    theme,
    breadcrumb,
    menumeta

  }
});
