<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>

        <q-toolbar-title class="absolute-center">
          {{title}}
        </q-toolbar-title>

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
      else if (currentPath == '/auth') return 'Auth'
      else if (currentPath == '/chat') return 'chat'
      console.log(currentPath)
    }
  }
}
</script>
