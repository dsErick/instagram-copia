<template>
<div class="register d-flex align-items-center justify-content-center">
    <div class="register-card">
        <h2 class="mb-4 text-center">Faça seu cadastro</h2>

        <Errors />
        
        <form @submit.prevent="onSubmit">
            <div class="form-group">
                <label for="name">Nome <span class="text-danger">*</span></label>
                <input id="name" type="text" name="name" class="form-control" placeholder="Informe seu nome" v-model="user.name">
                <span class="invalid-feedback" role="alert"></span>
            </div>
            <div class="form-group">
                <label for="username">Nome de usuário <span class="text-danger">*</span></label>
                <input id="username" type="text" name="username" class="form-control" placeholder="Informe seu nome de usuário" v-model="user.username">
                <span class="invalid-feedback" role="alert"></span>
            </div>
            <div class="form-group">
                <label for="email">Email <span class="text-danger">*</span></label>
                <input id="email" type="text" name="email" class="form-control" placeholder="seuemail@gmail.com" v-model="user.email">
                <span class="invalid-feedback" role="alert"></span>
            </div>
            <div class="form-group">
                <label for="password">Senha <span class="text-danger">*</span></label>
                <input id="password" type="password" name="password" class="form-control" v-model="user.password" autocomplete>
                <span class="invalid-feedback" role="alert"></span>
            </div>
            <div class="form-group">
                <label for="confirmPassword">Confirmar Senha <span class="text-danger">*</span></label>
                <input id="confirmPassword" type="password" name="confirmPassword" class="form-control" v-model="user.confirmPassword" autocomplete>
                <span class="invalid-feedback" role="alert"></span>
            </div>

            <button value="1" class="btn btn-primary w-100 mt-3" type="submit">Cadastrar</button>
        </form>

        <p class="text-center mt-4 mb-0">
            Já possui uma conta?
            <router-link to="/login" class="card-link">Conectar-se</router-link>
        </p>
    </div>
</div>
</template>

<script>
import Errors from '@/components/partials/Errors';
import { mapActions } from 'vuex';

export default {
    name: 'Register',
    components: {
        Errors
    },
    data() {
        return {
            user: {
                name: '',
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            }
        }
    },
    methods: {
        ...mapActions('auth', ['registerUser']),
        async onSubmit(e) {
            let isValid = true;
            e.target.elements.forEach(input => {
                if (input.value === '') {
                    this.formValidation(input, 'Campo Obrigatório');
                    isValid = false;
                } else if (input.id === 'username' && !input.value.match(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/im)) {
                    this.formValidation(input, 'Informe um nome de usuário válido');
                    isValid = false;

                } else if (input.id === 'email' && !input.value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
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
                    input.parentElement.classList.remove('mb-1');
                }
            });

            if (isValid) this.registerUser(this.user);
        },
        formValidation(input, msg) {
            input.classList.add('is-invalid');
            input.parentElement.classList.add('mb-1');
            input.nextSibling.innerHTML = `<strong>${msg}</strong>`;
        }
    }
}
</script>

<style scoped>
.register {
    background: linear-gradient(to left bottom, #A12CA7, #C73567, #F2B360);
    min-width: 100%;
    min-height: 100vh;
    padding: 48px 0;
}
.register-card {
    background: #FAFAFA;
    min-width: 66%;
    padding: 48px 24px;
    border: 2px solid #bebcbc;
    border-radius: 5px;
}
p.text-center {
    min-width: 283.73px;
}
.invalid-feedback {
    max-width: 393.83px;
}
</style>