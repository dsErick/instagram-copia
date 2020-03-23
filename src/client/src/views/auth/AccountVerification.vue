<template>
<div class="account-verification text-center d-flex align-items-center justify-content-center">
    <div>
        <h2>Confirmação de email</h2>

        <Errors />

        <p class="mb-4">Por motivos de segurança confirme o seu email abaixo</p>
        <form @submit.prevent="onSubmit">
            <div class="form-group text-left">
                <input id="email" class="form-control" type="text" placeholder="seuemail@gmail.com" v-model="email">
                <span class="invalid-feedback" role="alert"></span>
            </div>

            <button class="btn btn-primary w-100 mt-3" type="submit">Cadastrar</button>
        </form>
    </div>
</div>
</template>

<script>
import Errors from '@/components/partials/Errors';
import { mapActions } from 'vuex';

export default {
    name: 'AccountVerification',
    components: {
        Errors,
    },
    data() {
        return {
            email: ''
        }
    },
    methods: {
        ...mapActions('auth', ['verifyNewUser']),
        onSubmit() {
            if (!this.email.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
                let input = document.getElementById('email');
                input.classList.add('is-invalid');
                input.nextSibling.innerHTML = `<strong>Informe um email válido<strong>`;
            } else {
                this.verifyNewUser({ email: this.email, token: this.$route.params.token});
            }
        }
    }
}
</script>

<style>
.account-verification {
    background: linear-gradient(to left bottom, #A12CA7, #C73567, #F2B360);
    min-width: 100%;
    min-height: 100vh;
    padding: 48px 0;
}
.account-verification > div {
    background: #FAFAFA;
    min-width: 33%;
    padding: 48px 24px;
    border: 2px solid #bebcbc;
    border-radius: 5px;
}
</style>