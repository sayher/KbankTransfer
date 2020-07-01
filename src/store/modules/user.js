/* eslint-disable */


import request from '@/utils/request';

const initialState = () => ({
    users: {},
    token: null,
    UserInput: {}
})
// =============================================
const state = initialState()

// =============================================
const actions = {

    LOGIN({ commit }, USER) {
        return new Promise(function (resolve, reject) {
            commit('SET_USERID', USER)
            request.post('/Login', USER).then(response => {

                if (response.success == true) {
                    commit('SET_USERINFO', response)
                    //  commit('SET_TOKEN', response.token)
                    localStorage.setItem('Access-Token', response.token)
                    // console.log(response);
                }
                resolve(response);


            }).catch(err => {
                //console.log(err);

                reject(err)
            })
        });
    },


}
// ============================================
const getters = {
    GET_USERINFO: state => state.users
}
// ==============================================
const mutations = {
    SET_USERID(state, USER) {
        state.UserInput = USER
    },
    SET_TOKEN(state, data) {
        state.token = data
    },
    SET_USERINFO(state, data) {
        state.users = data
    },
    RESET_STATE(state) {
        const newState = initialState()
        Object.keys(newState).forEach(key => {
            state[key] = newState[key]
        })
    }

}
export default {
    state,
    mutations,
    actions,
    getters
}
