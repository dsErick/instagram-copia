<template>
<div class="show-user">
    <Navbar />
    <Errors />

    <main v-if="getSingleUser.username === $route.params.user || getSingleUser._id === $route.params.user">
        <header class="row">
            <div class="col-sm-4 profile-photo row d-flex align-items-center">
                <div class="col-sm-12 col-5">
                    <img :src="`${$backendURL}/media/profiles/${getSingleUser.profilePhoto}`" :alt="`${getSingleUser.name} profile photo`">
                </div>
                <div class="d-sm-none col-7">
                    <strong>{{ getSingleUser.posts.length }}</strong> publicações
                </div>
            </div>
            <section class="col-sm-8 user-details">
                <div>
                    <h4>
                        {{ getSingleUser.username }}
                        <router-link v-if="getSingleUser._id === getUser._id" to="/users/accounts/edit" class="btn btn-light">
                            Editar perfil <i class="icon ui-1_settings-gear-63"></i>
                        </router-link>
                    </h4>
                </div>
                <div>
                    <strong>{{ getSingleUser.posts.length }}</strong> publicações
                </div>
                <div>
                    <h5>{{ getSingleUser.name }}</h5>
                    <p v-if="getSingleUser.bio" v-html="getSingleUser.bio.replace(/(?:\r\n|\r|\n)/g, '<br>')"></p>
                </div>
            </section>
        </header>
        <div class="posts row">
            <div class="col-4 post-image" v-for="post in getSingleUser.posts" :key="post._id">
                <router-link :to="`/posts/${post._id}`">
                    <img :src="`${$backendURL}/media/posts/${getSingleUser._id}/${post.image}`" alt="Post">
                </router-link>
            </div>
        </div>
    </main>
</div>
</template>

<script>
import Navbar from '@/components/layout/Navbar';
import Errors from '@/components/partials/Errors';
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'ShowUser',
    components: {
        Navbar, Errors
    },
    methods: {
        ...mapActions('users', ['getUserByUsername'])
    },
    created() {
        this.getUserByUsername(this.$route.params.user);
    },
    computed: {
        ...mapGetters('users', ['getSingleUser']),
        ...mapGetters('auth', ['getUser'])
    }
}
</script>

<style scoped>
.show-user > main {
    width: 70%;
    margin: 32px auto;
}

main header {
    margin: 0;
    padding-bottom: 32px;
    border-bottom: 1px solid rgba(190, 187, 187, 1);
}
main header > .profile-photo {
    text-align: center;
}
main header > .profile-photo img {
    max-width: 150px;
    max-height: 150px;
    border: 1px solid rgba(190, 187, 187, .5);
    border-radius: 50%;
}

main header > .user-details :nth-child(1) h4 {
    font-size: 2em;
    margin-bottom: 16px;
}
main header > .user-details :nth-child(2) {
    font-size: 1.1em;
    margin-bottom: 16px;
}
main header > .user-details :last-child h5 {
    font-weight: 500;
    margin-bottom: 0;
}

main .posts {
    margin: 32px 0;
}
main .posts .post-image {
    padding: 0 1px;
}
main .posts .post-image img {
    width: 100%;
    height: calc(70vw / 3);
    object-fit: cover;
}

@media (max-width: 991px) {
    .show-user > main {
        width: 100%;
    }
    main .posts .post-image img {
        height: calc(100vw / 3 - 2px);
    }
}
@media (max-width: 575px) {
    main header {
        margin: 0 8px;
    }
    main header .profile-photo img {
        max-width: 120px;
        max-height: 120px;
    }
    main header .user-details :nth-child(1) h4,
    main header .user-details :nth-child(2) {
        display: none;
    }
    main header .user-details :nth-child(3) {
        margin-top: 16px;
    }
    main .posts {
        margin-top: 4px;
    }
}
</style>