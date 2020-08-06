<template>
  <q-page
    ref="pageChat"
    class="page-chat flex column">
    <q-banner
      v-if="!otherUserDetails.online"
      class="bg-blue-grey-6 text-center fixed-top text-white">
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
        :bg-color="message.from == 'me' ? 'blue-grey-9' : 'blue-grey-10'"
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
            ref= "newMessage"
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
      this.$refs.newMessage.focus()
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

<style lang= "stylus">
  .page-chat
    background #0E1621
    &:after 
      content ''
      display block
      position fixed
      left 0
      right 0
      top 0
      bottom 0
      z-index 0
      opacity 0.1
      background linear-gradient(27deg, #151515 5px, transparent 5px) 0 5px, linear-gradient(207deg, #151515 5px, transparent 5px) 10px 0px, linear-gradient(27deg, #222 5px, transparent 5px) 0px 10px, linear-gradient(207deg, #222 5px, transparent 5px) 10px 5px, linear-gradient(90deg, #1b1b1b 10px, transparent 10px), linear-gradient(#1d1d1d 25%, #1a1a1a 25%, #1a1a1a 50%, transparent 50%, transparent 75%, #242424 75%, #242424);
      background-size 20px 20px
  .q-message
    z-index 1
  .q-banner
    top 50px
    opacity 0.8
    z-index 2
  .q-message-name
    color: #5ddaf7bf
    font-size: xx-small
  .q-icon
    color: #26c6da
  .q-message-text-content
    color: #fff
</style>
