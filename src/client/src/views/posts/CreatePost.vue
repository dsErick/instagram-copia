<template>
<div>
    <Navbar />
    <Errors />
    
    <main class="create-post">
        <div class="form">
            <h3 class="text-center mb-4 h1">Nova publicação</h3>
            <form @submit.prevent="onSubmit" enctype="multipart/form-data">
                <div id="image-preview-wrapper" class="form-group d-flex align-items-center justify-content-between">
                    <div>
                        <label for="image">Image</label>
                        <input id="image" type="file" class="form-control-file" accept="image/*" @change="previewImage">
                        <span class="invalid-feedback" role="alert"><strong>Informe uma imagem válida</strong></span>
                        <!-- <label>Imagem</label>
                        <div class="custom-file">
                            <label for="image" class="custom-file-label">Escolher imagem</label>
                            <input id="image" type="file" class="custom-file-input" accept="image/*" @change="previewImage" >
                        </div>
                        <span class="invalid-feedback" role="alert"><strong>Informe uma imagem válida</strong></span> -->
                    </div>
                </div>
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
    </main>
</div>
</template>

<script>
import Errors from '@/components/partials/Errors';
import Navbar from '@/components/layout/Navbar';
import { mapActions } from 'vuex';
import loadImage from 'blueimp-load-image';

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
        },
        previewImage(e) {
            let rotation = {
                1: 'rotate(0deg)', 3: 'rotate(180deg)',
                6: 'rotate(90deg)', 8: 'rotate(270deg)'
            };
            if (e.target.files[0] && e.target.files[0].type.startsWith('image')) {
                loadImage(e.target.files[0], (img, data) => {
                    if (data.exif) img.setAttribute('style', `transform: ${rotation[data.exif.get('Orientation')]}`);
                    img.setAttribute('id', 'image-preview');

                    if (document.querySelector('#image-preview')) document.querySelector('#image-preview').remove();
                    document.querySelector('#image-preview-wrapper').appendChild(img);
                }, { maxWidth: 150, maxHeight: 150, meta: true });   
            }
        }
    }
}
</script>

<style scoped>
.form {
    margin: 48px auto;
    width: 55vw;
    padding: 24px;
    border-radius: 5px;
    box-shadow: 0 0 16px rgba(190, 187, 187, 1);
}
@media (max-width: 1199px){
    .form {
        width: 66vw;
    }
}
@media (max-width: 991px){
    .form {
        width: 78vw;
    }
}
@media (max-width: 575px){
    .form {
        width: 100%;
    }
}
</style>