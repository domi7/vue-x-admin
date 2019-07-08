import {SET_THEME,SET_COLLAPSE} from "./state.type";

const menuThemeBlue={
    color: '#fff',
    background:'#204F80',
    active:'#ffd04b'
}

const menuThemeBlack={
    color: '#eee',
    background:'#06101A',
    active:'#67C23A'
}


const menuThemeWhite={
    color: '#CCC',
    background:'#1A1A1A',
    active:'#F56C6C'
}

const state = {
    isCollapse: true,
    theme:'theme-blue',
    menuTheme:menuThemeBlue
};

const getters = {
    theme(state) {
        return state.theme;
    },
    menuTheme(state){
        return state.menuTheme
    },
    isCollapse(state) {
        return state.isCollapse;
    }
};

const actions = {
    [SET_THEME]({commit}, payload) {
        commit(SET_THEME, payload)

    },
    [SET_COLLAPSE]({commit}){
        commit(SET_COLLAPSE)
    }

}

const mutations = {
    [SET_THEME](state, payload) {
        state.theme = payload.theme;
        console.log(payload.theme)
        if(payload.theme=='theme-blue'){
            state.menuTheme = menuThemeBlue
        }

        if(payload.theme=='theme-black'){
            state.menuTheme = menuThemeBlack
        }
        if(payload.theme=='theme-white'){
            state.menuTheme = menuThemeWhite
        }

    },
    [SET_COLLAPSE](state){
        state.isCollapse = !state.isCollapse;
    }
};

export default {
    state,
    actions,
    mutations,
    getters
};
