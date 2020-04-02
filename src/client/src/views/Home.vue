<template>
<div class="home">
    <div class="notification">Um novo post foi adicionado <i class="icon arrows-1_refresh-68"></i></div>

    <Navbar />
    <Errors />
    <main v-if="getPosts.length > 0" class="posts-wrapper">
        <article v-for="post in getPosts" :key="post._id" class="mb-5">
            <header class="d-flex align-items-center">
                <router-link :to="`/users/${post.user.username}`">
                    <img class="profile-picture" :src="`${$backendURL}/media/profiles/${post.user.profilePhoto}`" alt="Profile Picture">
                </router-link>
                <h4 class="w-100">
                    <router-link :to="`/users/${post.user.username}`" class="user-link">
                        <strong>{{ post.user.username }}</strong>
                    </router-link>
                    <br>
                    {{ post.place }}
                </h4>
                <span v-if="getUser._id === post.user._id || getUser.role === 'admin'" @click="deletePost(post._id)" class="delete-post flex-shrink-1"><i class="icon ui-1_trash"></i></span>
            </header>

            <div class="post-picture-wrapper">
                <router-link :to="`/posts/${post._id}`">
                    <img class="post-picture" :src="`${$backendURL}/media/posts/${post.user._id}/${post.image}`" alt="Post">
                </router-link>
            </div>

            <div class="post-body">
                <!-- <strong>{{ post.likes }} curtidas</strong> -->
                <div class="post-description mb-3">
                    <strong>{{ post.user.username }}</strong>
                    {{ post.description }}<br>
                    <!-- <div class="d-inline" v-for="hashtag in post.hashtags" :key="hashtag">
                        #{{ hashtag }}
                    </div> -->
                    <strong class="d-block">{{ post.createdAt | moment("from") }}</strong>
                </div>

                <router-link v-if="post.commentsCount > 1" class="text-muted" :to="`/posts/${post._id}`">Ver todos os {{ post.commentsCount }} comentários</router-link>
                <div class="post-comments" v-for="comment in post.comments" :key="comment.id">
                    <span class="comment-body">
                        <router-link :to="`/users/${comment.user.username}`" class="user-link">
                            <strong>{{ comment.user.username }}</strong>
                        </router-link>
                        {{ comment.body }}
                    </span>
                    <span v-if="getUser._id === comment.user.id || getUser.role === 'admin'" @click="deletePostComment({comment: comment._id, post: post._id})" class="comment-options"><i class="icon ui-1_trash"></i></span>
                </div>

                <div class="post-add-comment">
                    <form @submit.prevent="onSubmit($event, post._id)">
                        <input type="text" placeholder="Adicione um comentário...">
                        <button type="submit" class="btn btn-link">Publicar</button>
                    </form>
                </div>
            </div>
        </article>
    </main>
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
        ...mapActions(['getAllPosts', 'deletePost', 'addCommentToPost', 'deletePostComment']),
        onSubmit(e, post) {
            if (e.target.elements[0] && e.target.elements[0].value !== '') this.addCommentToPost({ body: e.target.elements[0].value, post });
            e.target.elements[0].value = '';
        }
    },
    async created() {
        this.getAllPosts();
    },
    computed: {
        ...mapGetters(['getPosts']),
        ...mapGetters('auth', ['getUser'])
    },
    sockets: {
        postCreated() {
            document.querySelector('.notification').classList.add('notifyAnimation');
            setTimeout(() => document.querySelector('.notification').classList.remove('notifyAnimation'), 7000);
        }
    }
}
</script>

<style scoped>
.notification {
    position: fixed;
    top: 0; left: 10%;
    z-index: 5;
    width: 80%;

    font-size: 1em;
    font-weight: 700;
    background: rgba(190, 187, 187, .9);
    text-align: center;
    padding: 8px;
    border-radius: 5px;
    
    transform: translateY(-50px);
    opacity: 0;
    visibility: hidden;
}
.notifyAnimation { animation: notify 7s ease }
@keyframes notify {
    20%, 80% {
        transform: translateY(30px);
        opacity: 1;
        visibility: visible;
    }
}

.home .posts-wrapper {
    width: 55vw;
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
    max-width: 2.1rem;
    max-height: 2.1rem;
    border: 1px solid rgba(190, 187, 187, .5);
    border-radius: 50%;
}
article header > h4 {
    margin: 0;
    margin-left: 16px;
    font-size: 0.8em;
}
article header .delete-post {
    color: #DC3545;
    cursor: pointer;
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

article .post-body .post-comments { display: flex; }
article .post-body .post-comments .comment-body { flex: 10; }
article .post-body .post-comments .comment-options {
    text-align: right;
    flex: 1;
    color: #DC3545;
    cursor: pointer;
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

@media (max-width: 1199px){
    .home .posts-wrapper {
        width: 66vw;
    }
    article .post-picture-wrapper {
        max-height: 66vw;
    }
    article .post-picture-wrapper .post-picture {
        max-height: 66vw;
    }
}
@media (max-width: 991px){
    .home .posts-wrapper {
        width: 84vw;
    }
    article .post-picture-wrapper {
        max-height: 574px;
    }
    article .post-picture-wrapper .post-picture {
        max-height: 574px;
    }
}
@media (max-width: 575px){
    .home .posts-wrapper {
        width: 100%;
    }
}
</style>