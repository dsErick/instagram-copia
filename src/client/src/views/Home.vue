<template>
<div class="home">
    <div class="row">
        <div class="col-sm-8">
            <h1>Home</h1>
        </div>
        <div class="col-sm-4 text-right">
            <button @click="userLogout" class="btn btn-link">Sair</button>
        </div>
    </div>
    <Errors />
    {{ getPosts }}
</div>
</template>

<script>
import Errors from '@/components/partials/Errors';
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'Home',
    components: {
        Errors
    },
    methods: {
        ...mapActions(['ActionGetPosts']),
        ...mapActions('auth', ['userLogout'])
    },
    async created() {
        this.ActionGetPosts();
    },
    computed: mapGetters(['getPosts']),
}
</script>

<style>

</style>