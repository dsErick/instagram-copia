<template>
<div>
    <Navbar />
    <Errors />
    
    <div class="create-post d-flex align-items-center justify-content-center">
        <div class="form">
            <h3 class="text-center mb-4 h1">Criar novo post</h3>
            <form @submit.prevent="onSubmit" enctype="multipart/form-data">
                <div class="form-group">
                    <label for="image">Image</label>
                    <input id="image" type="file" class="form-control-file" accept="image/*">
                    <span class="invalid-feedback" role="alert"><strong>Informe uma imagem válida</strong></span>
                </div>
                <!-- <label>Imagem</label>
                <div class="custom-file">
                    <label for="image" class="custom-file-label">Escolher imagem</label>
                    <input id="image" type="file" class="custom-file-input" accept="image/*" >
                </div> -->
                <div class="form-group mt-3">
                    <label for="description">Descrição</label>
                    <input id="description" type="text" class="form-control" placeholder="Informe a descrição">
                </div>
                <div class="form-group mb-0">
                    <label for="place">Localização</label>
                    <input id="place" type="text" class="form-control" placeholder="Informe a localização">
                </div>
                <button class="btn btn-primary w-100 mt-4">Publicar</button>
            </form>
        </div>
    </div>
</div>
</template>

<script>
import Errors from '@/components/partials/Errors';
import Navbar from '@/components/layout/Navbar';
import { mapActions } from 'vuex';

export default {
    name: 'CreatePost',
    components: {
        Errors, Navbar
    },
    methods: {
        ...mapActions(['createPost']),
        onSubmit() {
            const post = new FormData();
            const image = document.querySelector('#image');

            if (!image.files[0] || !image.files[0].type.startsWith('image')) return image.classList.add('is-invalid');
            else image.classList.remove('is-invalid');

            post.append('image', image.files[0]);
            post.set('description', document.getElementById('description').value);
            post.set('place', document.getElementById('place').value);

            this.createPost(post);
        }
    }
}
</script>

<style scoped>
.create-post {
    width: 100%;
    min-height: calc(100vh - 80px);
}
.form {
    width: 55vw;
    padding: 24px;
    border-radius: 5px;
    box-shadow: 0 0 16px rgba(190, 187, 187, 1);
}

@media (max-width: 1200px){
    .form {
        width: 66vw;
    }
}
@media (max-width: 992px){
    .form {
        width: 78vw;
    }
}
@media (max-width: 547px){
    .form {
        width: 100%;
    }
}
</style>