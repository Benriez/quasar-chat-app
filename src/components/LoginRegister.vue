<template>
    <q-form>
        <q-input
          v-if="tab == 'register'"
          outlined
          v-model="formData.name"
          class="q-mb-md"
          label="Name" /> 
        <q-input
          outlined
          v-model="formData.email"
          class="q-mb-md"
          type="email"
          label="Email" /> 
        <q-input
          outlined
          v-model="formData.password"
          class="q-mb-md"
          type="password"
          label="Password" />
        <div class="row">
            <!-- q-space pushes q-btn to the right -->
            <q-space />
            <q-btn
              color="light-blue-4"
              :label="tab" />
        </div>


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