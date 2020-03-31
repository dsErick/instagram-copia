<template>
<nav class="navbar navbar-expand-sm navbar-light bg-light mb-4">
    <router-link to="/" class="navbar-brand">FakeInsta</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Alterna navegação">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbar">
        <div class="mr-auto"></div>
        <div class="autocomplete mx-auto">
            <form class="form-inline">
                <input class="form-control text-center" type="search" placeholder="Pesquisar" aria-label="Pesquisar" @input="searchUser">
            </form>
            <div class="autocomplete-items"></div>
        </div>

        <ul class="navbar-nav ml-auto h3">
            <li class="nav-item active">
                <router-link to="/" class="nav-link"><i class="icon ui-1_home-minimal"></i></router-link>
            </li>
            <li class="nav-item">
                <router-link to="/posts/create" class="nav-link"><i class="icon ui-1_bold-add"></i></router-link>
            </li>
            <li class="nav-item">
                <router-link :to="`/${getUser.username}`" class="nav-link"><i class="icon users_single-01"></i></router-link>
            </li>
            <li class="nav-item">
                <a @click.prevent="userLogout" class="nav-link" href="#">Sair</a>
            </li>
        </ul>
    </div>
</nav>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
let typingTimer;

export default {
    name: 'Navbar',
    methods: {
        ...mapActions('auth', ['userLogout']),
        ...mapActions('users', ['searchForUser']),
        searchUser(e) {
            document.querySelector('.autocomplete-items').innerHTML = '';
            clearTimeout(typingTimer);
            if (e.target.value) {
                typingTimer = setTimeout(async () => {
                    const data = await this.searchForUser(e.target.value);

                    data.forEach(user => {
                        let div = document.createElement('a');
                        div.classList.add('autocomplete-link');
                        div.setAttribute('href', `#/${user.username}`);
                        div.innerHTML = `
                        <div>
                            <img src="${this.$backendURL}/media/profiles/${user.profilePhoto}" alt="${user.name} profile photo">
                        </div>
                        <div>
                            ${user.username}<br>
                            <span>${user.name}</span>
                        </div>`;
                        document.querySelector('.autocomplete-items').appendChild(div);
                    });
                }, 1000);
            } 
        }
    },
    computed: mapGetters('auth', ['getUser'])
}
</script>

<style>
nav {
    border-bottom: 1px solid rgba(190, 187, 187, 1);
}
.autocomplete {
    position: relative;
}
.autocomplete-items {
    max-height: 200px;
    overflow-y: auto;
    position: absolute;
    border: 1px solid rgba(190, 187, 187, 1);
    border-bottom: none;
    border-top: none;
    z-index: 99;
    top: 100%; left: 0; right: 0;
}
.autocomplete-items > .autocomplete-link {
    display: -ms-flexbox;
    display: flex;
    -ms-flex-align: center;
    align-items: center;
    text-decoration: none;
    color: #000;
    padding: 8px;
    cursor: pointer;
    background-color: #fff;
    border-bottom: 1px solid rgba(190, 187, 187, 1);
}
.autocomplete-items > .autocomplete-link:hover {
    background-color: #F8F9FA;
}
.autocomplete-items > .autocomplete-link img {
    max-width: 32px;
    max-height: 32px;
    border-radius: 50%;
    margin-right: 8px;
}
.autocomplete-items > .autocomplete-link :last-child {
    font-size: .9em;
    font-weight: 700;
}
.autocomplete-items > .autocomplete-link :last-child span {
    color: #BEBBBB;
}
</style>