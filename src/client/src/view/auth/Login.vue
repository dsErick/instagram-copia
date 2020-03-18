<template>
<div class="login d-flex align-items-center justify-content-center">
    <div class="login-card">
        <h2 class="mb-4 text-center">Acesse sua conta</h2>

        <div class="alert alert-dismissible alert-danger d-none" :class="{'d-block':errors.length !== 0}">
            <button type="button" class="close" data-dismiss="alert">&times;</button>
            <span class="invalid-feedback d-block" role="alert" v-for="error in errors" :key="error">
                <strong>{{ error }}</strong>
            </span>
        </div>
        
        <form @submit.prevent="login">
            <div class="form-group">
                <label for="email">Email</label>
                <input id="email" type="email" name="email" class="form-control" placeholder="seuemail@gmail.com" v-model="user.email" autofocus>
            </div>
            <div class="form-group mb-1">
                <label for="password">Senha</label>
                <input id="password" type="password" name="password" class="form-control" placeholder="Informe sua senha" required minlength="8" v-model="user.password">
            </div>
            <p class="text-right my-0">
                <router-link to="/forgotpassword" class="card-link">Esqueceu a senha</router-link>
            </p>
            <button class="btn btn-primary w-100 mt-3" type="submit">Entrar</button>
        </form>


        <p class="text-center mt-4 mb-0">
            Não tem uma conta ainda?
            <router-link to="/register" class="card-link">Registrar</router-link>
        </p>
    </div>
</div>
</template>

<script>
import { login } from '../../AuthService';

export default {
    name: 'Login',
    data() {
        return {
            user: {
                email: '',
                password: '',
            },
            errors: []
        }
    },
    methods: {
        async login() {
            const res = await login(this.user);

            if (res.data.success) {
                this.$router.push({ name: 'Home' });
            }
            else this.errors = [...res.data.error.split(',')];
        }
    }
}
</script>

<style scoped>
.login {
    background: linear-gradient(to left bottom, #A12CA7, #C73567, #F2B360);
    width: 100%;
    min-height: 100vh;
}
.login-card {
    background: #FAFAFA;
    min-width: 33%;
    padding: 48px 24px;
    border: 2px solid #bebcbc;
    border-radius: 5px;
}
@media (max-width: 766px) {
    .login {
        background: #111;
    }
}
</style>