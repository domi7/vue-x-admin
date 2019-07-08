import ApiService from "@/common/js/api.service";
import TokenService from "@/common/js/token.service";
import {
    LOGIN,
    LOGOUT,
    CHECK_AUTH,
    SET_AUTH,
    SET_ERROR,
    PURGE_AUTH
} from "./state.type";

const state = {
    errors: null,
    user: {},
    isAuthenticated: !!TokenService.getToken()
};

const getters = {
    currentUser(state) {
        return state.user;
    },
    isAuthenticated(state) {
        return state.isAuthenticated;
    }
};

const actions = {
    [LOGIN](context, credentials) {
        return new Promise((resolve, reject) => {
            ApiService.post("/user/login", credentials)
                .then(response => {
                    if (response.succ) {
                        context.commit(SET_AUTH, {username: credentials.username, token: response.data.token});
                        resolve(response);
                    } else {
                        context.commit(SET_ERROR, response);
                        reject(state.errors)
                    }


                })
                .catch((response) => {
                    context.commit(SET_ERROR, response);
                });
        });
    },
    [LOGOUT](context) {
        context.commit(PURGE_AUTH);
    },
    [CHECK_AUTH](context) {
        if (TokenService.getToken()) {
            ApiService.setHeader();
            ApiService.get("/user/getInfo")
                .then(({data}) => {
                    context.commit(SET_AUTH, data.user);
                })
                .catch(({response}) => {
                    context.commit(SET_ERROR, response.data.errors);
                });
        } else {
            context.commit(PURGE_AUTH);
        }
    }
};

const mutations = {
    [SET_ERROR](state, error) {
        state.errors = error;
    },
    [SET_AUTH](state, user) {
        state.isAuthenticated = true;
        state.user = user;
        state.errors = {};
        TokenService.saveToken(state.user.token);
    },
    [PURGE_AUTH](state) {
        state.isAuthenticated = false;
        state.user = {};
        state.errors = {};
        TokenService.destroyToken();
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};
