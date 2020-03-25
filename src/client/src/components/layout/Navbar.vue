<template>
<nav class="navbar navbar-expand-md navbar-light bg-light mb-4">
    <router-link to="/" class="navbar-brand">FakeInsta</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Alterna navegação">
        <span class="navbar-toggler-icon"></span>
    </button>

    <div class="collapse navbar-collapse" id="navbar">
        <div class="mr-auto"></div>
        <form class="form-inline mx-auto">
            <input class="form-control" type="search" placeholder="Pesquisar" aria-label="Pesquisar">
        </form>

        <ul class="navbar-nav ml-auto">
            <li class="nav-item active">
                <router-link to="/" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item">
                <router-link to="/" class="nav-link">Perfil</router-link>
            </li>
            <li class="nav-item">
                <a @click.prevent="userLogout" class="nav-link" href="#">Sair</a>
            </li>
        </ul>
    </div>
</nav>
</template>

<script>
import { mapActions } from 'vuex'

export default {
    name: 'Navbar',
    methods: mapActions('auth', ['userLogout'])
}
</script>

<style>

</style>