<template>
<div class="following">
    <Navbar />
    <Errors />
    <main>
        <header>
            <div>
                <router-link :to="`/users/${$route.params.user}/followers`" class="btn btn-custom w-50">Seguidores</router-link>
                <router-link :to="`/users/${$route.params.user}/following`" class="btn btn-custom w-50">Seguindo</router-link>
            </div>
        </header>
        <div v-if="getSingleUser.length > 0">
            <div class="d-flex align-items-center" v-for="following in getSingleUser" :key="following._id">
                <router-link :to="`/users/${following.username}`" class="no-link">
                    <img :src="`${$backendURL}/media/profiles/${following.profilePhoto}`" :alt="`${following.username} profile photo`">
                    {{following.username}}
                </router-link>
                <button v-if="following._id !== getUser._id" class="btn btn-custom ml-auto" @click="btnFollow(following._id)">
                    {{ getUser.following.includes(following._id) ? 'Seguindo' : 'Seguir' }}
                </button>
            </div>
        </div>
        <div v-else class="text-center mt-3 h5">
            <strong>{{$route.params.user}}</strong> não segue ninguém
        </div>
    </main>
</div>
</template>

<script>
import Navbar from '@/components/layout/Navbar';
import Errors from '@/components/partials/Errors';
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'Followers',
    components: {
        Navbar, Errors
    },
    computed: {
        ...mapGetters('users', ['getSingleUser']),
        ...mapGetters('auth', ['getUser'])
    },
    methods: {
        ...mapActions('users', ['getUserFollowing', 'followUser', 'unfollowUser']),
        btnFollow(user) {
            if (this.getUser.following.includes(user))
                this.unfollowUser({followeeUser: user, followerUser: this.getUser._id});
            else this.followUser(user);
        }
    },
    created() { this.getUserFollowing(this.$route.params.user) }
}
</script>

<style scoped>
.btn-custom {
    border: 1px solid #6d6262;
    border-radius: 3px;
    font-size: .9rem;
    font-weight: 600;
    padding: .375rem 1.375rem;
}
.btn-custom:hover {
    background: #F8F9FA;
}

.no-link {
    color: #000;
    text-decoration: none;
}

.following > main {
    width: 58vw;
    max-height: calc(100vh - 152px);
    margin: auto;
    padding: 24px;
    border-radius: 5px;
    box-shadow: 0 0 16px rgba(190, 187, 187, 1);
    overflow-y: auto;
}

main > div > div {
    font-size: 1.2rem;
    font-weight: 500;
    padding: 8px;
    border-bottom: 1px solid rgba(190, 187, 187, 1);
    overflow-x: hidden;
}
main > div > div > :first-child {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
main > div > div img {
    max-width: 36px;
    max-height: 36px;
    border: 1px solid rgba(190, 187, 187, .5);
    border-radius: 50%;
    margin-right: 8px;
}

@media (max-width: 1199px){
    .following > main {
        width: 72vw;
    }
}
@media (max-width: 991px){
    .following > main {
        width: 88vw;
    }
}
@media (max-width: 767px){
    .following > main {
        width: 100%;
    }
}
@media (max-width: 575px){
    .following > main {
        max-height: calc(100vh - 44px);
    }
}
</style>