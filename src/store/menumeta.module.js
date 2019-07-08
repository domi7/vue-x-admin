import {SET_IDMETAS,SET_URLMETAS,SET_MENUCURRINDEX,SAVE_MENUS} from './state.type'
const state = {
    menus:[],
    idMetas: {
    },
    urlMetas:{

    },
    selectedIndex:'menu_01'
}

const getters = {

    selectedIndex(state){
      return state.selectedIndex
    },

    idMetas(state){
        return state.idMetas;
    },
    urlMetas(state){
        return state.urlMetas;
    },
    metaById:(state)=>id=>{
        return state.idMetas[id]
    },
    metaByUrl:(state)=>url=>{
        return state.urlMetas[url]
    },
    menus(state){
        return state.menus;
    }
}

const mutations = {
    [SET_IDMETAS](state,payload){
        state.idMetas=payload
    },
    [SET_URLMETAS](state,payload){
        state.urlMetas=payload
    },
    [SET_MENUCURRINDEX](state,payload){
        state.selectedIndex=payload
    },
    [SAVE_MENUS](state,payload){
        state.menus= payload
    }
}

const actions = {
    [SET_IDMETAS]({commit},payload){
        commit(SET_IDMETAS,payload)
    },
    [SET_URLMETAS]({commit},payload){
        commit(SET_URLMETAS,payload)
    },
    [SET_MENUCURRINDEX]({commit},payload){
        commit(SET_MENUCURRINDEX,payload)
    },
    [SAVE_MENUS]({commit},payload){
        commit(SAVE_MENUS,payload)
    }

}


export default {
    state,
    actions,
    mutations,
    getters
}
