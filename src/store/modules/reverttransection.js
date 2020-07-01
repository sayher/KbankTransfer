/* eslint-disable */
import request from '@/utils/request';
const initialState = () => ({

})

const state = initialState()

const actions = {
    REVERT_TRANSACTION({ commit }, REVERT_DATA) {
        return new Promise(function (resolve, reject) {
            request.post('/revertTransaction', REVERT_DATA).then(response => {
                resolve(response)
            }).catch(err => {
                reject(err)
            })
        })
    },
    RESET_ALL_STATE({ commit }) {
        commit('RESET_STATE')
    }
}

const getters = {

}

const mutations = {
    RESET_STATE(state) {
        const newState = initialState()
        Object.keys(newState).forEach(key => {
            state[key] = newState[key]
        })
    }
}

export default {
    state,
    actions,
    getters,
    mutations
}