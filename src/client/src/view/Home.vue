<template>
<div class="home">
    <h1>Home</h1>
    
    <div class="alert alert-dismissible alert-danger d-none" :class="{'d-block':errors.length !== 0}">
        <button type="button" class="close" data-dismiss="alert">&times;</button>
        <span class="invalid-feedback d-block" role="alert" v-for="error in errors" :key="error">
            <strong>{{ error }}</strong>
        </span>
    </div>

    <div v-for="post in posts" :key="post._id">
        {{ post }}
    </div>
</div>
</template>

<script>
// import { getPosts } from '../PostsService';

export default {
    name: 'Home',
    data() {
        return {
            posts: [],
            errors: []
        }
    },
    async created() {
        // if (!token) this.$router.push({ name: 'Login' });

        // const res = await getPosts(token);

        // if (res.status === 200) this.posts = [...res.data.data];
        // else this.errors = [...res.data.error.split(',')];
    }
}
</script>

<style>

</style>