import Vue from 'vue'
import {firebaseAuth, firebaseDb} from 'boot/firebase'


let messagesRef

//all the data of the app will go here
const state = {
    userDetails: {},
    users: {},
    messages: {}
}
// methods wich will manipulate the data
// these methods cannot be asynch
const mutations = {
    setUserDetails(state, payload) {
        state.userDetails = payload
    },
    addUser(state, payload){
        Vue.set(state.users, payload.userID, payload.userDetails)
    },
    updateUser(state, payload) {
        Object.assign(state.users[payload.userID], payload.userDetails)
    },
    addMessage(state, payload){
        Vue.set(state.messages, payload.messageID, payload.messageDetails)
    },
    clearMessages(state){
        state.messages = {}
    }
}
// also methods but can be asynch
// can trigger mutations
const actions = {
    registerUser({}, payload){
        firebaseAuth.createUserWithEmailAndPassword(payload.email, payload.password)
            .then(response => {
                console.log(response)
                let userID = firebaseAuth.currentUser.uid
                firebaseDb.ref('users/' + userID).set({
                    name: payload.name,
                    email:payload.email,
                    online: true
                })
            })
            .catch(error => {
                console.log(error.message)
            })
    },
    loginUser({}, payload){
        firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
            .then(response => {
                console.log(response)
            })
            .catch(error => {
                console.log(error.message)
            })
    },
    logoutUser(){
        firebaseAuth.signOut()
    },
    //to trigger a mutation, use the commit method
    handleAuthStateChanged({commit, dispatch, state}){
        //firebase hook that listens for change
        firebaseAuth.onAuthStateChanged(user => {
            if (user) {
              // User is logged in.
              //get current user id from database
              let userID = firebaseAuth.currentUser.uid
              //getting user details from Firebase
              firebaseDb.ref('users/' + userID ).once('value', snapshot => {
                //snapshot wont show needed info
                //snapshot.val does  
                let userDetails= snapshot.val()
                  //triggers mutation
                  commit('setUserDetails', {
                      name: userDetails.name,
                      email: userDetails.email,
                      userID: userID
                  })
              })

              dispatch('firebaseUpdateUser', {
                userID: userID,
                updates: {
                    online: true
                }
              })
              dispatch('firebaseGetUsers')
              //routes user to the next site
              this.$router.push('/')
            } else {
              // User logged out
              dispatch('firebaseUpdateUser', {
                userID: state.userDetails.userID,
                updates: {
                    online: false
                }
              })
              //sets back user Details to an empty object
              commit('setUserDetails', {})
              this.$router.replace('/auth')
            }
          });
    },

    firebaseUpdateUser({}, payload) {
        if(payload.userID){
            firebaseDb.ref('users/' + payload.userID).update(payload.updates)
        }
    },

    firebaseGetUsers({commit}) {
        firebaseDb.ref('users').on('child_added', snapshot =>{
            let userDetails= snapshot.val()
            let userID= snapshot.key
            commit('addUser', {
                userID,
                userDetails
            })
        })
        firebaseDb.ref('users').on('child_changed', snapshot =>{
            let userDetails= snapshot.val()
            let userID= snapshot.key
            commit('updateUser', {
                userID,
                userDetails
            })
        })
    },
    firebaseGetMessages({commit, state}, otherUserID) {
        let userID = state.userDetails.userID
        messagesRef = firebaseDb.ref('chats/' + userID + '/' + otherUserID)
        messagesRef.on('child_added', snapshot => {
            let messageDetails = snapshot.val()
            let messageID = snapshot.key
            commit('addMessage', {
                messageID,
                messageDetails
            })
        }) 
    },
    firebaseStopGettingMessages({commit}){
       if (messagesRef){
          messagesRef.off('child_added')
          commit('clearMessages') 
       } 
    },
    firebaseSendMessage({}, payload) {
        //stores messages in firebase
        firebaseDb.ref('chats/' + state.userDetails.userID + '/'+ payload.otherUserID).push(payload.message)
        payload.message.from = 'them'
        firebaseDb.ref('chats/' + payload.otherUserID + '/'+ state.userDetails.userID).push(payload.message)
    }
}
// methods to grab data from the state and 
// make that data available for vue components
const getters = {
    users:state => {
        let usersFiltered ={}
        Object.keys(state.users).forEach(key => {
            if (key!== state.userDetails.userID){
                usersFiltered[key] = state.users[key]
            }
        })
        return usersFiltered
    }
}

export default {
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}