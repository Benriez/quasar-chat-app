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
          class="absolute-right q-pr-sm text-caption"
          icon="account_circle"
          no-caps
          flat
          dense
          label="Login" />
        <q-btn
          v-else
          @click="logoutUser"
          class="absolute-right q-pr-sm text-caption"
          icon="account_circle"
          no-caps
          flat
          dense>
          Loggout<br> {{userDetails.name}}
        </q-btn>

      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import mixinOtherUserDetails from 'src/mixins/mixin-other-user-details.js'
export default {
  mixins: [mixinOtherUserDetails],
  computed: {
    //userDetails object is now available within this component
    ...mapState('store', ['userDetails']),
    title() {
      // determin current path
      let currentPath = this.$route.fullPath
      if (currentPath == '/') return 'NextChat'
      else if (currentPath == '/auth') return 'Nextchat'
      else if (currentPath.includes ('/chat')) return this.otherUserDetails.name
      console.log(currentPath)
    }
  },
  methods: {
    ...mapActions ('store', ['logoutUser'])
  }
}
</script>

<style lang="stylus">
  .q-toolbar
    .q-btn
      line-height: 1.5
      font-size: 10px
    .q-icon
      margin-right: 5px
      font-size: 2em
</style>
