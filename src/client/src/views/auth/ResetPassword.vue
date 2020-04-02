<template>
<div class="reset-password text-center d-flex align-items-center justify-content-center">
    <div>
        <h2>Redefinição de senha</h2>

        <Errors />
        <div id="success" class="alert alert-success d-none fade show" role="alert"></div>

        <form @submit.prevent="onSubmit">
            <div class="form-group mt-4">
                <label for="email">Informe seu email</label>
                <input id="email" class="form-control" type="text">
                <span class="invalid-feedback" role="alert"><strong>Informe um email válido</strong></span>
            </div>
            <div class="form-group">
                <label for="password">Informe a senha nova</label>
                <input id="password" class="form-control" type="password" autocomplete>
                <span class="invalid-feedback" role="alert"><strong>A senha precisa ter pelo menos 8 caracteres com ao menos 1 caractere maiúsculo e 1 caractere numérico</strong></span>
            </div>
            <div class="form-group mb-0">
                <label for="confirmPassword">Confirme a senha</label>
                <input id="confirmPassword" class="form-control" type="password" autocomplete>
                <span class="invalid-feedback" role="alert"><strong>As senhas não coincidem</strong></span>
            </div>
            <p class="text-right my-0">
                <router-link to="/forgotpassword" class="card-link">Re-enviar email</router-link>
            </p>

            <button class="btn btn-primary w-100 mt-4" type="submit">Confirmar</button>
        </form>
    </div>
</div>
</template>

<script>
import Errors from '@/components/partials/Errors';
import { mapActions } from 'vuex';

export default {
    name: 'ResetPassword',
    components: {
        Errors
    },
    methods: {
        ...mapActions('auth', ['resetUserPassword']),
        async onSubmit(e) {
            const { email, password, confirmPassword } = e.target.elements;
            let isValid = true;
            
            if (!email.value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
                email.classList.add('is-invalid');
                isValid = false;
            } else email.classList.remove('is-invalid');

            if (!password.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)) {
                password.classList.add('is-invalid');
                isValid = false;
            } else password.classList.remove('is-invalid');
            
            if (password.value !== confirmPassword.value) {
                confirmPassword.classList.add('is-invalid');
                isValid = false;
            } else confirmPassword.classList.remove('is-invalid');

            if (!isValid) return isValid;

            this.resetUserPassword({
                email: email.value,
                password: password.value,
                token: this.$route.params.token
            });
        }
    }
}
</script>

<style scoped>
.reset-password {
    background: linear-gradient(to left bottom, #A12CA7, #C73567, #F2B360);
    min-width: 100%;
    min-height: 100vh;
    padding: 48px 0;
}
.reset-password > div {
    background: #FAFAFA;
    min-width: 66%;
    padding: 48px 24px;
    border: 2px solid #bebcbc;
    border-radius: 5px;
}
form > div.form-group {
    text-align: left;
}
</style>