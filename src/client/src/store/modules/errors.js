const state = {
    errors: []
};

const getters = {
    getErrors: state => state.errors
};

const actions = {};

const mutations = {
    setError: (state, errors) => state.errors = [...errors.split(',')],
    resetErrors: state => state.errors = []
};

export default {
    state,
    getters,
    actions,
    mutations
}