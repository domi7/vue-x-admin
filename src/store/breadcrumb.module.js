import {SET_URLBREADCRUMB,SET_CURRBREADCRUMB} from "./state.type";

const state = {
    currBreadcrumb:[{title:'地图展示'}],
    urlBreadcrumb:{}
};

const getters = {
    currBreadcrumb(state){
      return state.currBreadcrumb;
    },
    urlBreadcrumb:(state)=>(url)=> {
        return state.urlBreadcrumb[url];
    }
};

const mutations = {

    [SET_URLBREADCRUMB](state, payload){
        state.urlBreadcrumb={...state.urlBreadcrumb,...payload}
    },
    [SET_CURRBREADCRUMB](state, payload){
        state.currBreadcrumb=payload
    }

};

const actions = {

    [SET_URLBREADCRUMB]({commit}, payload){
        commit(SET_URLBREADCRUMB,payload)
    },
    [SET_CURRBREADCRUMB]({commit}, payload){
        commit(SET_CURRBREADCRUMB,payload)
    }


}


export default {
    state,
    actions,
    mutations,
    getters
};
