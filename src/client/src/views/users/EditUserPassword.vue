<template>
<div class="edit-user">
    <Navbar />
    <main>
        <div class="row align-items-center">
            <div class="col-md-3 col-auto">
                <img :src="`${$backendURL}/media/profiles/${getUser.profilePhoto}`" :alt="`${getUser.name} profile photo`">
            </div>
            <div class="col-md-8 col">
                <span>{{getUser.username}}</span><br>
                <router-link to="/users/accounts/edit" class="mr-2">Alterar dados</router-link>
                <router-link to="/users/accounts/email">Alterar email</router-link>
            </div>
        </div>
        <Errors />
        <form @submit.prevent="onSubmit" class="mt-3">
            <div class="form-group row">
                <label for="currentPassword" class="col-md-3 col-form-label-sm">Senha atual</label>
                <div class="col-md-8">
                    <input id="currentPassword" class="form-control" type="password" autocomplete>
                    <span class="invalid-feedback" role="alert"><strong>A senha precisa ter pelo menos 8 caracteres</strong></span>
                </div>
            </div>
            <div class="form-group row">
                <label for="newPassword" class="col-md-3 col-form-label-sm">Senha nova</label>
                <div class="col-md-8">
                    <input id="newPassword" class="form-control" type="password" autocomplete>
                    <span class="invalid-feedback" role="alert"><strong>A senha precisa ter pelo menos 8 caracteres com ao menos 1 caractere maiúsculo e 1 caractere numérico</strong></span>
                </div>
            </div>
            <div class="form-group row mb-1">
                <label for="confirmPassword" class="col-md-3 col-form-label-sm">Confirme a senha</label>
                <div class="col-md-8">
                    <input id="confirmPassword" class="form-control" type="password" autocomplete>
                    <span class="invalid-feedback" role="alert"><strong>As senhas não coincidem</strong></span>
                </div>
            </div>
            <p class="text-right">
                <router-link to="/forgotpassword" class="card-link">Esqueceu a senha</router-link>
            </p>
            <div class="col-md-5 col-8 mx-auto">
                <button type="submit" class="btn btn-primary w-100">Alterar senha</button>
            </div>
        </form>
    </main>
</div>
</template>

<script>
import Navbar from '@/components/layout/Navbar';
import Errors from '@/components/partials/Errors';
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'EditUser',
    components: {
        Navbar, Errors
    },
    computed: mapGetters('auth', ['getUser']),
    methods: {
        ...mapActions('auth', ['updateUserPassword']),
        onSubmit(e) {
            const { currentPassword, newPassword, confirmPassword } = e.target.elements;
            let isValid = true;

            if (currentPassword.value.length < 8) {
                currentPassword.classList.add('is-invalid');
                isValid = false;
            } else currentPassword.classList.remove('is-invalid');

            if (!newPassword.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)) {
                newPassword.classList.add('is-invalid');
                isValid = false;
            } else newPassword.classList.remove('is-invalid');
            
            if (newPassword.value !== confirmPassword.value) {
                confirmPassword.classList.add('is-invalid');
                isValid = false;
            } else confirmPassword.classList.remove('is-invalid');

            if (!isValid) return isValid;

            this.updateUserPassword({ currentPassword: currentPassword.value, newPassword: newPassword.value });
        },
    }
}
</script>

<style scoped>
.edit-user > main {
    width: 58vw;
    margin: auto;
    padding: 24px;
    border-radius: 5px;
    box-shadow: 0 0 16px rgba(190, 187, 187, 1);
}
main > div :first-child {
    text-align: right;
}
main > div img {
    max-width: 48px;
    max-height: 48px;
    border-radius: 50%;
}
main > div :last-child span {
    font-size: 1.4em;
    font-weight: 300;
}

main > form > div > label {
    font-size: 1.1em !important;
    font-weight: 300;
    text-align: right;
}

@media (max-width: 1199px){
    .edit-user > main {
        width: 72vw;
    }
}
@media (max-width: 991px){
    .edit-user > main {
        width: 88vw;
    }
}
@media (max-width: 767px){
    .edit-user > main {
        width: 100%;
    }
    
    main > div :first-child {
        text-align: center;
    }
    main > div > :last-child {
        padding-left: 0;
    }

    main > form > div > label {
        text-align: left;
    }
}
</style>