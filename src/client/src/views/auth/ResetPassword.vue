<template>
<div class="reset-password text-center d-flex align-items-center justify-content-center">
    <div>
        <h2>Redefinição de senha</h2>

        <Errors />
        <div id="success" class="alert alert-success d-none fade show" role="alert"></div>

        <form @submit.prevent="onSubmit">
            <div class="form-group text-left mt-4">
                <label for="email">Informe seu email</label>
                <input id="email" class="form-control" type="text" placeholder="seuemail@gmail.com" v-model="user.email">
                <span class="invalid-feedback" role="alert"></span>
            </div>
            <div class="form-group text-left">
                <label for="password">Informe a senha nova</label>
                <input id="password" class="form-control" type="password" placeholder="" autocomplete v-model="user.password">
                <span class="invalid-feedback" role="alert"></span>
            </div>
            <div class="form-group text-left">
                <label for="confirmPassword">Confirme a senha</label>
                <input id="confirmPassword" class="form-control" type="password" placeholder="" autocomplete v-model="user.confirmPassword">
                <span class="invalid-feedback" role="alert"></span>
            </div>

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
    data() {
        return {
            user: {
                email: '',
                password: '',
                confirmPassword: ''
            }
        }
    },
    methods: {
        ...mapActions('auth', ['resetUserPassword']),
        async onSubmit(e) {
            let isValid = true;
            e.target.elements.forEach(input => {
                if (input.id === 'email' && !input.value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
                    this.formValidation(input, 'Informe um email válido');
                    isValid = false;

                } else if (input.id === 'password' && !input.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)) {
                    this.formValidation(input, 'A senha precisa ter pelo menos 8 caracteres com ao menos 1 caractere maiúsculo e 1 caractere numérico');
                    isValid = false;

                }else if (input.id === 'confirmPassword' && this.user.password !== this.user.confirmPassword) {
                    this.formValidation(input, 'As senhas não coincidem');
                    isValid = false;

                } else {
                    input.classList.remove('is-invalid');
                }
            });

            if (isValid) this.resetUserPassword({
                email: this.user.email,
                password: this.user.password,
                token: this.$route.params.token
            });
        },
        formValidation(input, msg) {
            input.classList.add('is-invalid');
            input.nextSibling.innerHTML = `<strong>${msg}</strong>`;
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
</style>