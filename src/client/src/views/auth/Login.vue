<template>
<div class="login d-flex align-items-center justify-content-center">
    <div class="login-card">
        <h2 class="mb-4 text-center">Acesse sua conta</h2>

        <Errors />
        
        <form @submit="onSubmit">
            <div class="form-group">
                <label for="email">Email</label>
                <input id="email" type="email" name="email" class="form-control" placeholder="seuemail@gmail.com" v-model="user.email">
            </div>
            <div class="form-group mb-1">
                <label for="password">Senha</label>
                <input id="password" type="password" name="password" class="form-control" placeholder="Informe sua senha" required minlength="8" v-model="user.password" autocomplete>
            </div>
            <p class="text-right my-0">
                <router-link to="/forgotpassword" class="card-link">Esqueceu a senha</router-link>
            </p>
            <button class="btn btn-primary w-100 mt-3" type="submit">Entrar</button>
        </form>

        <p class="text-center mt-4 mb-0">
            Não tem uma conta ainda?
            <router-link to="/register" class="card-link">Cadastre-se</router-link>
        </p>
    </div>
</div>
</template>

<script>
import { mapActions } from 'vuex';
import Errors from '@/components/partials/Errors';

export default {
    name: 'Login',
    components: {
        Errors
    },
    data() {
        return {
            user: {
                email: '',
                password: '',
            }
        }
    },
    methods: {
        ...mapActions('auth', ['userLogin']),
        onSubmit(e) {
            e.preventDefault();
            this.userLogin(this.user);
        }
        // async onSubmit(e) {
        //     e.preventDefault();
        //     if (await this.userLogin(this.user)) this.$router.push({ name: 'Home' });
        // }
    }
}
</script>

<style scoped>
.login {
    background: linear-gradient(to left bottom, #A12CA7, #C73567, #F2B360);
    min-width: 100%;
    min-height: 100vh;
}
.login-card {
    background: #FAFAFA;
    min-width: 33%;
    padding: 48px 24px;
    border: 2px solid #bebcbc;
    border-radius: 5px;
}
</style>