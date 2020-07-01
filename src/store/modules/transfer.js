/* eslint-disable */
import request from '@/utils/request';
const initialState = () => ({
    bankList: {},
    accountType: {},
    purposeList: {},
    validateInfo: {},
    feeAmount: 0,
    bankName: null,
    accountTypeName: null
})
// =============================================
const state = initialState()
const getters = {
    GET_BANKLIST: state => state.bankList,
    GET_ACC_TYPE: state => state.accountType,
    GET_PURPOSELIST: state => state.purposeList
}
const actions = {

    VALIDATE_TRANSFER({ commit }, VALIDATETRANSFER) {
        commit('SET_VALIDATE_INFO', VALIDATETRANSFER)
        return new Promise(function (resolve, reject) {
            request.post('/validateTransfer', VALIDATETRANSFER).then(response => {
                if (response.success == true) {
                    commit('SET_FEE_AMOUNT', response.feeAmount)
                }
                //   console.log(response);
                resolve(response)
            }).catch(err => {
                reject(err)
            })
        })
    },

    CONFIRM_TRANSFER({ commit }, TRANSFER_INFO) {
        return new Promise(function (resolve, reject) {
            request.post('/confirmTransfer', TRANSFER_INFO).then(response => {
                // console.log(response);
                resolve(response)
            }).catch(err => {
                reject(err)
            })
        })
    },

    BANKLIST({ commit }) {
        return new Promise(function (resolve, reject) {
            request.get('/getBankList ').then(response => {
                // console.log(response.data);
                commit('SET_BANKLIST', response.data)
                resolve(response.data)
            }).catch(err => {
                // commit(RESET_STATE)
                reject(err)
            })
        });
    },
    ACC_TYPE({ commit }) {
        return new Promise(function (resolve, reject) {
            request.get('/getReceiveAccountTypeList').then(response => {
                //  console.log(response.data);
                commit('SET_ACCTYPE', response.data)
                resolve(response.data)
            }).catch(err => {
                // commit('RESET_STATE')
                reject(err)
            })
        })
    },

    PURPOSE_LIST({ commit }) {
        return new Promise(function (resolve, reject) {
            request.get('/getPurposeList').then(response => {
                // console.log(response.data);

                commit('SET_PURPOSELIST', response.data)
                resolve(response.data)
            }).catch(err => {
                //  commit('RESET_STATE')
                reject(err)
            })
        })

    },
    RESET_ALL_STATE({ commit }) {
        commit('RESET_STATE')
        return true
    },
    RESET_SOMESTATES({ commit }) {
        commit('RESET_SOMESTATE')
        return true
    },

    SET_BANKLIST_VALUE({ commit }, value) {
        commit('SET_BANKNAME', value)
    },
    SET_ACCTYPENAME_VALUE({ commit }, value) {
        commit('SET_ACCTYPENAME', value)
    }

}

const mutations = {
    SET_VALIDATE_INFO(state, data) {
        state.validateInfo = data
    },
    SET_FEE_AMOUNT(state, payload) {
        state.feeAmount = payload
    },
    SET_BANKLIST(state, data) {
        state.bankList = data
    },
    SET_ACCTYPE(state, data) {
        state.accountType = data
    },
    SET_PURPOSELIST(state, data) {
        state.purposeList = data
    },
    SET_BANKNAME(state, bankname) {
        state.bankName = bankname
    },
    SET_ACCTYPENAME(state, accType) {
        state.accountTypeName = accType
    },
    RESET_SOMESTATE(state) {
        state.validateInfo = {}
        state.feeAmount = 0
        state.bankName = null
        state.accountTypeName = null
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

