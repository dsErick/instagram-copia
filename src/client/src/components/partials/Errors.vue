<template>
<div class="alert alert-danger d-none fade show" role="alert" :class="{'d-block':getErrors.length !== 0}">
    <span class="invalid-feedback d-block" v-for="error in getErrors" :key="error">
        <strong>{{ error }}</strong>
        <!-- <strong v-for="msg in error.message" :key="msg">{{ msg }}</strong> -->
    </span>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'Errors',
    computed: mapGetters('errors', ['getErrors'])
}
</script>

<style>
.alert {
    overflow: auto;
    max-width: 45%;
    margin: auto;
}

@media (max-width: 1200px){
    .alert {
        max-width: 53%;
    }
}
@media (max-width: 992px){
    .alert {
        max-width: 66%;
    }
}
@media (max-width: 547px){
    .alert {
        max-width: 98%;
    }
}
</style>