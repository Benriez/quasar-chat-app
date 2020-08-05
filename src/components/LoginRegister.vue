<template>
    <q-form>
      <q-input
        outlined
        v-model="formData.name"
        label="Name" /> 
    </q-form>
</template>

<script>
export default {
    props: ['tab'],
    data() {
        return{
            formData: {
                name: '',
                email: '',
                password: ''
            }
        }
    }
}
</script>

<style>

</style>