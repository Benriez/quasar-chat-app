<template>
  <q-page class="flex q-pa-md" >
    <q-card class="full-width"> 
      <q-tabs
        v-model="tab"
        dense
        bg-color="blue"
        class="text-grey"
        active-color="white"
        indicator-color="white"
        align="justify"
        narrow-indicator
      >
        <q-tab name="login" label="Login" />
        <q-tab name="register" label="Register" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="login">
          <login-register :tab="tab" />
        </q-tab-panel>

        <q-tab-panel name="register">
          <login-register :tab="tab" />
        </q-tab-panel>

      </q-tab-panels>
    </q-card>
  </q-page>
</template>

<script>
export default {
  data () {
    return {
      // tab by default
      tab: 'login'
    }
  },
  components: {
    //import component
    'login-register': require('components/LoginRegister.vue').default
  }
}
</script>

<style lang= "stylus">
  .q-card
    background: #1a2b35
  .q-tab-panels
    background: #1a2b35
  .q-page
    background: #0e1621
  
</style>
