<template>
<div class="alert alert-dismissible alert-danger d-none" :class="{'d-block':getErrors.length !== 0}">
    <button type="button" class="close" data-dismiss="alert">&times;</button>
    <span class="invalid-feedback d-block" role="alert" v-for="error in getErrors" :key="error">
        <strong>{{ error }}</strong>
    </span>
</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    name: 'Errors',
    computed: mapGetters(['getErrors'])
}
</script>

<style>

</style>