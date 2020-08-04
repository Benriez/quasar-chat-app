<template>
  <q-page class="flex">
      <q-list bordered>
        <q-item v-for="user in users" :key="user.id" class="q-my-sm" clickable v-ripple>
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white">
              {{ user.letter }}
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ user.name }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-icon name="chat_bubble" color="green" />
          </q-item-section>
        </q-item>

      </q-list>
  </q-page>
</template>

<script>

export default {
  data () {
    return {
      users: [ {
        id: 1,
        name: 'Ruddy',
        letter: 'R'
      }, {
        id: 2,
        name: 'Mallorie',
        letter: 'M'
      }, {
        id: 3,
        name: 'Elisabetta',
        letter: 'E'
      }]
    }
  }
}
</script>

<style>

</style>
