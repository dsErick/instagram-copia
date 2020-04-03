<template>
<div class="edit-user">
    <Navbar />
    <Errors />
    <main>
        <div class="row align-items-center">
            <div class="col-md-3 col-auto">
                <img :src="`${$backendURL}/media/profiles/${getUser.profilePhoto}`" :alt="`${getUser.name} profile photo`">
            </div>
            <div class="col-md-8 col">
                <span>{{getUser.username}}</span><br>
                <router-link to="/users/accounts/password" class="mr-2">Alterar senha</router-link>
                <router-link to="/users/accounts/edit">Alterar dados</router-link>
            </div>
        </div>
        <form @submit.prevent="onSubmit" class="mt-3">
            <div class="form-group row">
                <label for="email" class="col-md-3 col-form-label-sm">Email atual</label>
                <div class="col-md-8">
                    <input id="email" class="form-control" type="text">
                    <span class="invalid-feedback" role="alert"><strong>Informe um email válido</strong></span>
                </div>
            </div>
            <div class="form-group row">
                <label for="newEmail" class="col-md-3 col-form-label-sm">Email novo</label>
                <div class="col-md-8">
                    <input id="newEmail" class="form-control" type="text">
                    <span class="invalid-feedback" role="alert"><strong>Informe um email válido</strong></span>
                </div>
            </div>
            <div class="form-group row">
                <label for="confirmEmail" class="col-md-3 col-form-label-sm">Confirme o email</label>
                <div class="col-md-8">
                    <input id="confirmEmail" class="form-control" type="text">
                    <span class="invalid-feedback" role="alert"><strong>Informe um email válido</strong></span>
                </div>
            </div>
            <div class="col-md-5 col-8 mx-auto">
                <button type="submit" class="btn btn-primary w-100">Editar</button>
            </div>
        </form>
    </main>
</div>
</template>

<script>
import Navbar from '@/components/layout/Navbar';
import Errors from '@/components/partials/Errors';
import { mapGetters } from 'vuex';

export default {
    name: 'EditUser',
    components: {
        Navbar, Errors
    },
    computed: mapGetters('auth', ['getUser']),
    methods: {
        onSubmit(e) {
            const { email, newEmail, confirmEmail  } = e.target.elements;
            let isValid = true;

            if (!email.value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
                email.classList.add('is-invalid');
                isValid = false;
            } else email.classList.remove('is-invalid');

            if (!newEmail.value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
                newEmail.classList.add('is-invalid');
                isValid = false;
            } else newEmail.classList.remove('is-invalid');

            if (confirmEmail.value !== newEmail.value) {
                confirmEmail.classList.add('is-invalid');
                isValid = false;
            } else confirmEmail.classList.remove('is-invalid');


            if (!isValid) return isValid;
        }
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