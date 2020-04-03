<template>
<div class="login d-flex align-items-center justify-content-center">
    <div class="login-card">
        <h2 class="mb-4 text-center">Acesse sua conta</h2>

        <Errors />
        
        <form @submit.prevent="onSubmit">
            <div class="form-group">
                <label for="email">Email</label>
                <input id="email" type="text" name="email" class="form-control">
                <span class="invalid-feedback" role="alert"><strong>Informe um e-mail válido</strong></span>
            </div>
            <div class="form-group mb-1">
                <label for="password">Senha</label>
                <input id="password" type="password" name="password" class="form-control" autocomplete>
                <span class="invalid-feedback" role="alert"><strong>A senha precisa ter pelo menos 8 caracteres</strong></span>
            </div>
            <p class="text-right">
                <router-link to="/forgotpassword" class="card-link">Esqueceu a senha</router-link>
            </p>
            <button class="btn btn-primary w-100" type="submit">Entrar</button>
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
    methods: {
        ...mapActions('auth', ['userLogin']),
        onSubmit(e) {
            const { email, password } = e.target.elements;
            let isValid = true;

            if (!email.value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
                email.classList.add('is-invalid');
                isValid = false;
            } else email.classList.remove('is-invalid');

            if (password.value.length < 8) {
                password.classList.add('is-invalid');
                isValid = false;
            } else password.classList.remove('is-invalid');

            if (!isValid) return isValid;
            
            this.userLogin({ email: email.value, password: password.value });
        }
    }
}
</script>

<style scoped>
.login {
    background: linear-gradient(to left bottom, #A12CA7, #C73567, #F2B360);
    min-width: 100%;
    min-height: 100vh;
    padding: 48px 0;
}
.login-card {
    background: #FAFAFA;
    min-width: 55%;
    padding: 48px 24px;
    border: 2px solid #bebcbc;
    border-radius: 5px;
}
@media (min-width: 1199px) {
    .login-card {
        min-width: 33%;
    }
}
</style>