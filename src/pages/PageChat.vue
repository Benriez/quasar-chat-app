<template>
  <q-page class="flex column">
    <div class="q-pa-md column col justify-end">
      <q-chat-message
        name="me"
        :text="['hey, how are you?']"
        sent
      />
      <q-chat-message
        name="Jane"
        :text="['doing fine, how r you?']"
        bg-color="light-blue-5"
      />
    </div>
    <q-footer elevated>
      <q-toolbar>
        <q-input
          v-model="newMessage"
          bg-color="white"
          class="full-width"
          outlined
          rounded
          label="Message"
          dense
          >
          <template v-slot:after>
            <q-btn
              round
              dense
              flat
              color="white"
              icon="send" />
          </template>
        </q-input>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
export default {
  data(){
    return {
      newMessage: ''
    }
  }
}
</script>

<style>

</style>
