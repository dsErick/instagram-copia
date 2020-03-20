const state = {
    errors: []
};

const getters = {
    getErrors: state => state.errors
};

const actions = {
    setErrors: ({ commit }, errors) => {
        commit('setErrors', [...errors.split(',')]);
    }
};

const mutations = {
    setErrors: (state, errors) => state.errors = errors,
    resetErrors: state => state.errors = []
};

export default {
    state,
    getters,
    actions,
    mutations,
    namespaced: true
}