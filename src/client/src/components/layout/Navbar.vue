<template>
<div>
<nav id="webNav" class="navbar navbar-expand-sm navbar-light bg-light mb-5">
    <router-link to="/" class="navbar-brand">FakeInsta</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Alterna navegação">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbar">
        <div class="mr-auto"></div>
        <div class="autocomplete mx-auto">
            <form class="form-inline">
                <input id="inputWeb" class="form-control text-center" type="search" placeholder="Pesquisar" aria-label="Search" @input="searchUser">
            </form>
            <div id="autocomplete-items-web"></div>
        </div>

        <ul class="navbar-nav ml-auto h4">
            <li class="nav-item active">
                <router-link to="/" class="nav-link"><i class="icon ui-1_home-minimal"></i></router-link>
            </li>
            <li class="nav-item">
                <router-link to="/posts/create" class="nav-link"><i class="icon ui-1_bold-add"></i></router-link>
            </li>
            <li class="nav-item">
                <router-link :to="`/users/${getUser.username}`" class="nav-link"><i class="icon users_single-01"></i></router-link>
            </li>
            <li class="nav-item">
                <a @click.prevent="userLogout" class="nav-link" href="#"><i class="icon arrows-2_log-out"></i></a>
            </li>
        </ul>
    </div>
</nav>

<nav id="mobileNav" class="navbar navbar-expand navbar-light bg-light fixed-bottom">
    <div class="collapse navbar-collapse">
        <ul class="navbar-nav d-flex justify-content-around w-100 h4">
            <li class="nav-item active">
                <router-link to="/" class="nav-link"><i class="icon ui-1_home-minimal"></i></router-link>
            </li>
            <li class="nav-item">
                <button type="button" class="nav-link" data-toggle="modal" data-target="#searchBarModal" data-backdrop="true">
                    <i class="icon ui-1_zoom-split"></i>
                </button>
            </li>
            <li class="nav-item">
                <router-link to="/posts/create" class="nav-link"><i class="icon ui-1_bold-add"></i></router-link>
            </li>
            <li class="nav-item">
                <router-link :to="`/users/${getUser.username}`" class="nav-link"><i class="icon users_single-01"></i></router-link>
            </li>
            <li class="nav-item">
                <a @click.prevent="userLogout" class="nav-link" href="#"><i class="icon arrows-2_log-out"></i></a>
            </li>
        </ul>
    </div>
</nav>


<div class="modal fade" id="searchBarModal" tabindex="-1" role="dialog" aria-labelledby="searchBarModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-full" role="document">
        <div class="modal-content">
            <div class="modal-header d-flex align-items-center">
                <form class="inline-form w-100">
                    <input id="inputMobile" class="form-control" type="search" placeholder="Pesquisar" aria-label="Search" @input="searchUser">
                </form>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div id="autocomplete-items-mobile" class="modal-body"></div>
        </div>
    </div>
</div>
</div>
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
            let dom;
            if (e.target.id === 'inputWeb') dom = document.querySelector('#autocomplete-items-web');
            else if (e.target.id === 'inputMobile') dom = document.querySelector('#autocomplete-items-mobile');

            dom.innerHTML = '';
            clearTimeout(typingTimer);
            if (e.target.value) {
                typingTimer = setTimeout(async () => {
                    const data = await this.searchForUser(e.target.value);

                    data.forEach(user => {
                        let div = document.createElement('a');
                        div.classList.add('autocomplete-link');
                        div.setAttribute('href', `#/users/${user.username}`);
                        div.setAttribute('onclick', `$('#searchBarModal').modal('hide')`);
                        div.innerHTML = `
                        <div>
                            <img src="${this.$backendURL}/media/profiles/${user.profilePhoto}" alt="${user.name} profile photo">
                        </div>
                        <div>
                            ${user.username}<br>
                            <span>${user.name}</span>
                        </div>`;
                        dom.appendChild(div);
                    });
                }, 1000);
            }
        }
    },
    computed: mapGetters('auth', ['getUser'])
}
</script>

<style>
nav#webNav {
    border-bottom: 1px solid rgba(190, 187, 187, 1);
}
.autocomplete {
    position: relative;
}
#autocomplete-items-web {
    max-height: 200px;
    overflow-y: auto;
    position: absolute;
    border: 1px solid rgba(190, 187, 187, 1);
    border-bottom: none;
    border-top: none;
    z-index: 99;
    top: 100%; left: 0; right: 0;
}
#autocomplete-items-mobile > .autocomplete-link,
#autocomplete-items-web > .autocomplete-link {
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
#autocomplete-items-mobile > .autocomplete-link:hover,
#autocomplete-items-web > .autocomplete-link:hover {
    background-color: #F8F9FA;
}
#autocomplete-items-mobile > .autocomplete-link img,
#autocomplete-items-web > .autocomplete-link img {
    max-width: 32px;
    max-height: 32px;
    border-radius: 50%;
    margin-right: 8px;
}
#autocomplete-items-mobile > .autocomplete-link :last-child,
#autocomplete-items-web > .autocomplete-link :last-child {
    font-size: .9em;
    font-weight: 700;
    overflow-x: hidden;
}
#autocomplete-items-mobile > .autocomplete-link :last-child span,
#autocomplete-items-web > .autocomplete-link :last-child span {
    color: #BEBBBB;
}

nav#mobileNav {
    display: none;
    padding: 0 !important;
    border-top: 1px solid rgba(190, 187, 187, 1);
}
button.nav-link {
    background: none;
	border: none;
}

.modal-full {
    height: 50vh;
}
.modal-content {
    height: 100%;
}
#autocomplete-items-mobile {
    overflow-y: auto;
    padding-top: 0;
}
@media (max-width: 575px) {
    nav#webNav {
        display: none !important;
    }
    nav#mobileNav {
        display: flex !important;
    }
}
</style>