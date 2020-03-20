<template>
<div class="register d-flex align-items-center justify-content-center">
    <div class="register-card">
        <h2 class="mb-4 text-center">Faça seu cadastro</h2>

        <Errors />
        
        <form @submit.prevent="">
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="name">Nome</label>
                        <input id="name" type="text" name="name" required class="form-control" placeholder="Informe seu nome" v-model="user.name">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="username">Nome de usuário</label>
                        <input id="username" type="text" name="username" required class="form-control" placeholder="Informe seu nome de usuário" v-model="user.username">
                    </div>
                </div>
                <div class="col-12">
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input id="email" type="email" name="email" required class="form-control" placeholder="seuemail@gmail.com" v-model="user.email">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="password">Senha</label>
                        <input id="password" type="password" name="password" class="form-control" placeholder="********" required v-model="user.password" autocomplete>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label for="confirmPassword">Confirmar Senha</label>
                        <input id="confirmPassword" type="password" name="confirmPassword" class="form-control" placeholder="********" required v-model="user.confirmPassword" autocomplete>
                    </div>
                </div>
                <!-- <p class="text-right my-0">
                    <router-link to="/forgotpassword" class="card-link">Esqueceu a senha</router-link>
                </p> -->
                <button class="btn btn-primary w-100 mt-3" type="submit">Entrar</button>
            </div>
        </form>

        <p class="text-center mt-4 mb-0">
            Já possui uma conta?
            <router-link to="/login" class="card-link">Login</router-link>
        </p>
    </div>
</div>
</template>

<script>
import Errors from '@/components/partials/Errors';

export default {
    name: 'Register',
    components: {
        Errors
    },
    data() {
        return {
            user: {
                email: '',
                password: '',
                confirmPassword: ''
            }
        }
    }
}
</script>

<style scoped>
.register {
    background: linear-gradient(to left bottom, #A12CA7, #C73567, #F2B360);
    min-width: 100%;
    min-height: 100vh;
}
.register-card {
    background: #FAFAFA;
    max-width: 66%;
    padding: 48px 24px;
    border: 2px solid #bebcbc;
    border-radius: 5px;
}
</style>