<template>
<div class="email-sent text-center d-flex align-items-center justify-content-center">
    <div>
        <h2>Confirme seu Email</h2>

        <Errors />

        <div id="success" class="alert alert-success d-none fade show" role="alert"><strong>Email re-enviado com sucesso</strong></div>
        
        <p class="my-4">
            Email de confirmação enviado com sucesso para {{ email }}<br>
            O email irá se expirar em 30 minutos<br>
            Caso não o tenha recebido, clique no botão abaixo
        </p>
        <button @click.prevent="resendEmail" class="btn btn-outline-primary">Re-enviar email de confirmação</button>
    </div>
</div>
</template>

<script>
import { mapActions } from 'vuex';
import Errors from '@/components/partials/Errors';

export default {
    name: 'EmailSent',
    components: {
        Errors
    },
    computed: {
        email() { return this.$route.query.email }
    },
    methods: {
        ...mapActions('auth', ['resendVerificationEmail']),
        async resendEmail() {
            if (await this.resendVerificationEmail(this.email)) document.getElementById('success').classList.remove('d-none');
            else document.getElementById('success').classList.add('d-none');
        }

    }
}
</script>

<style scoped>
.email-sent {
    background: linear-gradient(to left bottom, #A12CA7, #C73567, #F2B360);
    min-width: 100%;
    min-height: 100vh;
    padding: 48px 0;
}
.email-sent > div {
    background: #FAFAFA;
    min-width: 33%;
    padding: 48px 24px;
    border: 2px solid #bebcbc;
    border-radius: 5px;
}
</style>