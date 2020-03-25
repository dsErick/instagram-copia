<template>
<div class="home">
    <Navbar />
    <Errors />
    <div class="posts-wrapper">
        <article v-for="post in getPosts" :key="post._id" class="my-5">
            <!-- {{ post }} -->
            <header class="d-flex align-items-center">
                <router-link :to="`/${post.user.username}`">
                    <img class="profile-picture" :src="`http://192.168.88.146:5000/media/profiles/${post.user.profilePhoto}`" alt="Profile Picture">
                </router-link>
                <h4>
                    <router-link :to="`/${post.user.username}`" class="user-link">
                        <strong>{{ post.author }}</strong>
                    </router-link>
                    <br>
                    {{ post.place }}
                </h4>
                
            </header>

            <div class="post-picture-wrapper">
                <router-link :to="`/${post._id}`">
                    <img class="post-picture" :src="`http://192.168.88.146:5000/media/posts/${post.image}`" alt="Post">
                </router-link>
            </div>

            <div class="post-body">
                <strong>{{ post.likes }} curtidas</strong>
                <div class="post-description mb-3">
                    <strong>{{ post.author }}</strong>
                    {{ post.description }}<br>
                    <div class="d-inline" v-for="hashtag in post.hashtags" :key="hashtag">
                        #{{ hashtag }}
                    </div>
                    <strong class="d-block">{{ post.createdAt | moment("from") }}</strong>
                </div>

                <router-link v-if="post.comments.length != 0" class="text-muted" :to="`/${post._id}`">Ver todos os comentários</router-link>
                <div class="post-comments" v-for="comment in post.comments" :key="comment.id">
                    <router-link :to="`/${comment.user.username}`" class="user-link">
                        <strong>{{ comment.user.username }}</strong>
                    </router-link>
                    {{ comment.body }}
                </div>

                <div class="post-add-comment">
                    <form>
                        <input type="text" placeholder="Adicione um comentário...">
                        <button type="submit" class="btn btn-link">Publicar</button>
                    </form>
                </div>
            </div>
        </article>
    </div>
</div>
</template>

<script>
import Errors from '@/components/partials/Errors';
import Navbar from '@/components/layout/Navbar';
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'Home',
    components: {
        Errors, Navbar
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

<style scoped>
.home div.posts-wrapper {
    width: 45vw;
    margin: auto;
}
article {
    border-radius: 5px;
    box-shadow: 0 0 16px rgba(190, 187, 187, 1);
}

.user-link {
    text-decoration: none;
    color: #000;
    cursor: pointer;
}

article header {
    padding: 8px 16px;
    line-height: 2.1rem;
}
article header img.profile-picture {
    width: 2.1rem;
    height: 2.1rem;
    border: 1px solid rgba(190, 187, 187, .2);
    border-radius: 50%;
}
article header > h4 {
    margin: 0;
    margin-left: 16px;
    font-size: 0.8em;
}

article .post-picture-wrapper {
    background: rgba(190, 187, 187, .5);
    width: 100%;
    max-height: 45vw;
    text-align: center;
}
article .post-picture-wrapper .post-picture {
    max-width: 100%;
    max-height: 45vw;
}

article .post-body {
    padding: 8px 16px;
}
article .post-body .post-description {
    font-size: 0.9em;
}

article .post-body .post-add-comment form {
    display: flex;
    margin-top: 4px;
    border-top: 1px solid rgba(190, 187, 187, .5);
}
article .post-body .post-add-comment form input {
    flex: 10;
    border: none;
    padding: 0 4px;
}
article .post-body .post-add-comment form button {
    flex: 1;
}

@media (max-width: 1200px){
    .home div.posts-wrapper {
        width: 53vw;
    }
    article .post-picture-wrapper {
        max-height: 53vw;
    }
    article .post-picture-wrapper .post-picture {
        max-height: 53vw;
    }
}
@media (max-width: 992px){
    .home div.posts-wrapper {
        width: 66vw;
    }
    article .post-picture-wrapper {
        max-height: 654px;
    }
    article .post-picture-wrapper .post-picture {
        max-height: 654px;
    }
}
@media (max-width: 547px){
    .home div.posts-wrapper {
        width: 92%;
    }
}
</style>