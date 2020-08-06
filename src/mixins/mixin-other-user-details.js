export default {
    computed: {
        otherUserDetails(){
            if(this.$store.state.store.users[this.$route.params.otherUserID]){
                return this.$store.state.store.users[this.$route.params.otherUserID]
            }
            return {}
          }
    }
}