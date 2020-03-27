const state = {
    errors: []
};

const getters = {
    getErrors: state => state.errors
};

const actions = {
    setErrors: ({ commit }, errors) => {
        commit('setErrors', [...errors.split(',')]);
    },
    // setErrors: ({ commit }, errors) => {
    //     const err = {
    //         status: errors.status,
    //         message: [...errors.data.error.split(',')]
    //     }

    //     commit('setErrors', err);
    // }
};

const mutations = {
    setErrors: (state, errors) => state.errors = errors,
    // setErrors: (state, errors) => state.errors.unshift(errors),
    resetErrors: state => state.errors = []
};

export default {
    state,
    getters,
    actions,
    mutations,
    namespaced: true
}