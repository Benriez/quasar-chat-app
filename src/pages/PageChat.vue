<template>
  <q-page
    ref="pageChat"
    class="flex column">
    <q-banner
      v-if="!otherUserDetails.online"
      class="bg-grey-4 text-center">
      {{otherUserDetails.name}} offline
    </q-banner>
    <!-- invisible when showMessages is false -->
    <div 
      :class = "{'invisible' : !showMessages}"
      class="q-pa-md column col justify-end">
      <q-chat-message
        v-for="(message, key) in messages"
        :key="key"
        :name="message.from == 'me' ? userDetails.name : otherUserDetails.name"
        :text="[message.text]"
        :sent="message.from == 'me' ? true : false"
      />

    </div>
    <q-footer elevated>
      <q-toolbar>
        <q-form
          class="full-width"
          @submit="sendMessage">
         <div class="row">
          <q-input
            v-model="newMessage"
            bg-color="white"
            outlined
            rounded
            label="Message"
            class="col-11"
            dense>
          </q-input>
          <q-btn
            type="submit"
            icon="send"
            color="white"
            round
            dense
            flat
            class="col-1" />
         </div>
       </q-form>
      </q-toolbar>
    </q-footer>
  </q-page>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import mixinOtherUserDetails from 'src/mixins/mixin-other-user-details.js'
export default {
  mixins: [mixinOtherUserDetails],
  data(){
    return {
      newMessage: '',
      showMessages: false
    }
  },
  computed: {
    ...mapState('store', ['messages', 'userDetails']),
  },
  methods: {
    ...mapActions('store', ['firebaseGetMessages', 'firebaseStopGettingMessages', 'firebaseSendMessage']), 
    sendMessage() {
      this.firebaseSendMessage({
        message: {
          text: this.newMessage,
          from: 'me'
        },
        otherUserID: this.$route.params.otherUserID

      })
      this.clearMessage()
    },
    clearMessage() {
      this.newMessage = ''
    },
    scrollToBottom() {
      let pageChat = this.$refs.pageChat.$el
      setTimeout(() => {
        window.scrollTo(0, pageChat.scrollHeight)
      }, 20)
    }
  },
  watch: {
    messages: function(val){
      if (Object.keys(val).length){
        this.scrollToBottom()
        setTimeout(() =>{
          this.showMessages = true
        }, 50)
      }
    }
  },
  mounted(){
    this.firebaseGetMessages(this.$route.params.otherUserID)
  },
  //this hook will be triggered when the user is leaving the current page
  destroyed(){
    this.firebaseStopGettingMessages()
  }
}
</script>

<style>

</style>
