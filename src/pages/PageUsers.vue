<template>
  <q-page class="flex q-pa-md">
      <q-list
        class="full-width"
        separator 
        >
        <!-- key contains user id -->
        <q-item
          v-for="(user, key) in users"
          :key="key"
          :to="'/chat/' + key"
          clickable
          v-ripple>
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white">
              {{ user.name.charAt(0) }}
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ user.name }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-badge 
              :color="user.online ? 'cyan' : 'blue-grey-7'">
              <!-- if condition ?=then  :=else -->
              {{user.online ? 'online' : 'offline'}}
            </q-badge>
          </q-item-section>
        </q-item>

      </q-list>
  </q-page>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters('store', ['users'])
  }
}
</script>

<style lang= "stylus">
  .q-page
    background #0E1621
  .q-item__label
    color: #fff
  .q-list--separator > .q-item-type + .q-item-type
    border-top: 1px solid #ffffff1f
  .q-icon
    color: #26c6da
</style>
