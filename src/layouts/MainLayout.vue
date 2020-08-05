<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          v-if="$route.fullPath.includes('/chat')"
          v-go-back.single
          icon="arrow_back_ios"
          flat
          dense
          label="Back" />
        <q-toolbar-title class="absolute-center">
          {{title}}
        </q-toolbar-title>

        <q-btn
          v-if="!userDetails.userID"
          to="/auth"
          class="absolute-right q-pr-sm"
          icon="account_circle"
          no-caps
          flat
          dense
          label="Login" />
        <q-btn
          v-else
          class="absolute-right q-pr-sm"
          icon="account_circle"
          no-caps
          flat
          dense
          label="Logout" />

      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import {mapState} from 'vuex'

export default {
  computed: {
    //userDetails object is now available within this component
    ...mapState('store', ['userDetails']),
    title() {
      // determin current path
      let currentPath = this.$route.fullPath
      if (currentPath == '/') return 'Quasar-Chat-App'
      else if (currentPath == '/auth') return 'Login'
      else if (currentPath == '/chat') return 'Chat'
      console.log(currentPath)
    }
  }
}
</script>
