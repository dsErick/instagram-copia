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
    text-align: center;
    max-width: 98%;
    margin: 4px auto;
}
</style>