<template>
<div class="edit-user">
    <Navbar />
    <Errors />
    <main>
        <div class="row d-flex align-items-center justify-content-center">
            <div class="col-md-3">
                <img :src="`${$backendURL}/media/profiles/${getUser.profilePhoto}`" :alt="`${getUser.name} profile photo`">
            </div>
            <div class="col-md-8">
                <span>{{getUser.username}}</span>
            </div>
        </div>
        <form @submit.prevent="onSubmit" class="mt-3">
            <div class="form-group row">
                <label for="profilePhoto" class="col-md-3 col-form-label-sm">Foto do perfil</label>
                <div class="col-md-8">
                    <input id="profilePhoto" class="form-control-file" type="file" accept="image/*">
                </div>
            </div>
            <div class="form-group row">
                <label for="name" class="col-md-3 col-form-label-sm">Nome</label>
                <div class="col-md-8">
                    <input id="name" class="form-control" type="text" :value="getUser.name">
                    <span class="invalid-feedback" role="alert"><strong>Informe um nome</strong></span>
                </div>
            </div>
            <div class="form-group row">
                <label for="username" class="col-md-3 col-form-label-sm">Nome de usuário</label>
                <div class="col-md-8">
                    <input id="username" class="form-control" type="text" :value="getUser.username">
                    <span class="invalid-feedback" role="alert"><strong>Informe um nome de usuário válido</strong></span>
                </div>
            </div>
            <div class="form-group row">
                <label for="bio" class="col-md-3 col-form-label-sm">Biografia</label>
                <div class="col-md-8">
                    <textarea id="bio" class="form-control" rows="2" v-model="getUser.bio"></textarea>
                </div>
            </div>
            <div class="form-group row">
                <label for="phoneNumber" class="col-md-3 col-form-label-sm">Telefone</label>
                <div class="col-md-8">
                    <input id="phoneNumber" class="form-control" type="number" :value="getUser.phoneNumber">
                    <span class="invalid-feedback" role="alert"><strong>Informe um número de telefone válido</strong></span>
                </div>
            </div>
            <div class="form-group row">
                <label for="gender" class="col-md-3 col-form-label-sm">Gênero</label>
                <div class="col-md-8">
                    <select id="gender" class="form-control" :value="getUser.gender">
                        <option value=""></option>
                        <option value="masculino">Masculino</option>
                        <option value="feminino">Feminino</option>
                        <option value="outro">Outro</option>
                    </select>
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
import { mapActions, mapGetters } from 'vuex';

export default {
    name: 'EditUser',
    components: {
        Navbar, Errors
    },
    computed: mapGetters('auth', ['getUser']),
    methods: {
        ...mapActions('auth', ['updateUserDetails']),
        onSubmit(e) {
            const { profilePhoto, name, username, bio, phoneNumber, gender } = e.target.elements;
            let isValid = true;

            if (!name.value) {
                name.classList.add('is-invalid');
                isValid = false;
            } else name.classList.remove('is-invalid');

            if (!username.value.match(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/im)) {
                username.classList.add('is-invalid');
                isValid = false;
            } else username.classList.remove('is-invalid');
            
            if (phoneNumber.value && !phoneNumber.value.match(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im)) {
                phoneNumber.classList.add('is-invalid');
                isValid = false;
            } else phoneNumber.classList.remove('is-invalid');

            if (!isValid) return isValid;


            const formData = new FormData();

            if (profilePhoto.files[0] && profilePhoto.files[0].type.startsWith('image')) 
                formData.append('profilePhoto', profilePhoto.files[0]);

            formData.set('name', name.value);
            formData.set('username', username.value);
            formData.set('bio', bio.value);
            formData.set('phoneNumber', phoneNumber.value);
            formData.set('gender', gender.value);

            this.updateUserDetails(formData);
        }
    }
}
</script>

<style scoped>
.edit-user > main {
    width: 58vw;
    margin: 48px auto;
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
        margin-bottom: 16px;
    }
    main > div img {
        max-width: 96px;
        max-height: 96px;
    }
    main > div > :last-child {
        display: none;
    }

    main > form > div > label {
        text-align: left;
    }
}
</style>