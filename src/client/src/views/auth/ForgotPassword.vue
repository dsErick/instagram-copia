<template>
<div class="forgot-password text-center d-flex align-items-center justify-content-center">
    <div>
        <h2>Redefinição de senha</h2>

        <Errors />

        <div id="success" class="alert alert-success d-none fade show" role="alert"></div>

        <form @submit.prevent="onSubmit">
            <div class="form-group text-left mt-4 mb-1">
                <label for="email">Informe seu email</label>
                <input id="email" class="form-control" type="text">
                <span class="invalid-feedback" role="alert"><strong>Informe um email válido</strong></span>
            </div>

            <button class="btn btn-primary w-100 mt-4" type="submit">Enviar</button>
            
            <p class="text-center mt-4 mb-0">
                Já possui uma conta?
                <router-link to="/login" class="card-link">Conectar-se</router-link>
            </p>
        </form>
    </div>
</div>
</template>

<script>
import Errors from '@/components/partials/Errors';
import { mapActions } from 'vuex';

export default {
    name: 'ForgotPassword',
    components: {
        Errors
    },
    methods: {
        ...mapActions('auth', ['sendForgotPasswordEmail']),
        async onSubmit() {
            let input = document.getElementById('email');
            if (!input.value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) input.classList.add('is-invalid');
            else {
                input.classList.remove('is-invalid');

                const email = await this.sendForgotPasswordEmail(input.value);
                if (email) {
                    document.getElementById('success').classList.remove('d-none');
                    document.getElementById('success').innerHTML = `Email enviado com sucesso para<br><strong class="text-center">${email}</strong>`;
                }
                else document.getElementById('success').classList.add('d-none');
            }
        }
    }
}
</script>

<style scoped>
.forgot-password {
    background: linear-gradient(to left bottom, #A12CA7, #C73567, #F2B360);
    min-width: 100%;
    min-height: 100vh;
    padding: 48px 0;
}
.forgot-password > div {
    background: #FAFAFA;
    min-width: 55%;
    padding: 48px 24px;
    border: 2px solid #bebcbc;
    border-radius: 5px;
}
@media (min-width: 1199px) {
    .forgot-password > div {
        min-width: 33%;
    }
}
</style>