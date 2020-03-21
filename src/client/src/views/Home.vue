<template>
<div class="home">
    <h1>Home</h1>
    
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
        ...mapActions(['ActionGetPosts'])
    },
    async created() {
        this.ActionGetPosts();
    },
    computed: mapGetters(['getPosts']),
}
</script>

<style>

</style>