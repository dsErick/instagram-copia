<template>
<div>
    <Navbar />
    <Errors />

    <main class="post d-flex align-items-center justify-content-center mb-5">
        <article v-if="getPosts._id === $route.params.id">
            <header class="d-flex align-items-center">
                <router-link :to="`/users/${getPosts.user.username}`">
                    <img class="profile-picture" :src="`${$backendURL}/media/profiles/${getPosts.user.profilePhoto}`" alt="Profile Picture">
                </router-link>
                <h4 class="w-100">
                    <router-link :to="`/users/${getPosts.user.username}`" class="user-link">
                        <strong>{{ getPosts.user.username }}</strong>
                    </router-link>
                    <br>
                    {{ getPosts.place }}
                </h4>
                <span v-if="getUser._id === getPosts.user._id" @click="deletePost(getPosts._id)" class="delete-post flex-shrink-1"><i class="icon ui-1_trash"></i></span>
            </header>

            <div class="post-picture-wrapper">
                <img class="post-picture" :src="`${$backendURL}/media/posts/${getPosts.user._id}/${getPosts.image}`" alt="Post">
            </div>
            
            <div class="post-body">
                <strong>{{ getPosts.likes }} curtidas</strong>
                <div class="post-description mb-3">
                    <strong>{{ getPosts.user.username }}</strong>
                    {{ getPosts.description }}<br>
                    <strong class="d-block">{{ getPosts.createdAt | moment("from") }}</strong>
                </div>

                <span v-if="getPosts.commentsCount > 1" class="text-muted">{{ getPosts.commentsCount }} comentários</span>
                <div class="post-comments" v-for="comment in getPosts.comments" :key="comment._id">
                    <span class="comment-body">
                        <router-link :to="`/users/${comment.user.username}`" class="user-link">
                            <strong>{{ comment.user.username }}</strong>
                        </router-link>
                        {{ comment.body }}
                    </span>
                    <span v-if="getUser._id === comment.user._id" @click="deletePostComment({comment: comment._id, post: getPosts._id})" class="comment-options"><i class="icon ui-1_trash"></i></span>
                </div>

                <div class="post-add-comment">
                    <form @submit.prevent="onSubmit($event, getPosts._id)">
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
    name: 'ShowPost',
    components: {
        Errors, Navbar
    },
    methods: {
        ...mapActions(['getSinglePost', 'deletePost', 'addCommentToPost', 'deletePostComment']),
        onSubmit(e, post) {
            if (e.target.elements[0] && e.target.elements[0].value !== '') this.addCommentToPost({ body: e.target.elements[0].value, post });
            e.target.elements[0].value = '';
        }
    },
    async created() {
        this.getSinglePost(this.$route.params.id);
    },
    computed: {
        ...mapGetters(['getPosts']),
        ...mapGetters('auth', ['getUser'])
    },
    sockets: {
        commentCreated(data) {
            if (data.comment.post === this.$route.params.id) {
                data.comment.user = data.user;
                this.getPosts.commentsCount++;
                this.getPosts.comments.unshift(data.comment);
            }
        },
        commentDeleted(comment) {
            this.getPosts.commentsCount--;
            this.getPosts.comments = this.getPosts.comments.filter(el => el._id !== comment._id);
        }
    }
}
</script>

<style scoped>
.post {
    width: 45vw;
    margin: auto;
}
.user-link {
    text-decoration: none;
    color: #000;
    cursor: pointer;
}

article {
    width: 100%;
    border-radius: 5px;
    box-shadow: 0 0 16px rgba(190, 187, 187, 1);
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


@media (max-width: 1200px){
    .post {
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
    .post {
        width: 66vw;
    }
    article .post-picture-wrapper {
        max-height: 654px;
    }
    article .post-picture-wrapper .post-picture {
        max-height: 654px;
    }
}
@media (max-width: 767px){
    .post {
        width: 78vw;
    }
    article .post-picture-wrapper {
        max-height: 598px;
    }
    article .post-picture-wrapper .post-picture {
        max-height: 598px;
    }
}
@media (max-width: 547px){
    .post {
        width: 100%;
    }
}
</style>
