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
          to="/auth"
          class="absolute-right q-pr-sm"
          icon="account_circle"
          no-caps
          flat
          dense
          label="Login" />

      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  computed: {
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
