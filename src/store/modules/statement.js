/* eslint-disable */
import request from '@/utils/request';
const initialState = () => ({
    statementInfo: {}
})

const state = initialState()

const actions = {
    STATEMENT({ commit }, DATA) {
  
        return new Promise(function (resolve, reject) {
            request.get("/getTransaction?TRN_DATE="+DATA.TRN_DATE+"&BRANCH_CODE="+DATA.BRANCH_CODE+"&transferStatus="+DATA.transferStatus+"&trn_ref_no="+DATA.trn_ref_no).then(response => {
               // commit('SET_STATEMENT', response)
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
    GET_STATEMENT: state => state.statementInfo
}

const mutations = {
    SET_STATEMENT(state, data) {
        state.statementInfo = data
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
    actions,
    getters,
    mutations
}