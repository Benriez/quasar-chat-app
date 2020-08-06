<template>
    <q-form @submit="submitForm">
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
              type="submit"
              color="primary"
              :label="tab" />
        </div>


    </q-form>
</template>

<script>
import {mapActions} from 'vuex'

export default {
    props: ['tab'],
    data() {
        return{
            formData: {
                name: '',
                email: 'wablabadubdub@squnash.com',
                password: '123456'
            }
        }
    },
    methods: {
        //vuex
        ...mapActions('store', ['registerUser', 'loginUser']),
        submitForm(){
            if (this.tab == 'login') {
                this.loginUser(this.formData)
            } else {
                this.registerUser(this.formData)
            }    
        }
    }
}
</script>

<style>

</style>