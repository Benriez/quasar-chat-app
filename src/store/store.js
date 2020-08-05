import Vue from 'vue'
import {firebaseAuth, firebaseDb} from 'boot/firebase'

//all the data of the app will go here
const state = {
    userDetails: {},
    users:{}
}
// methods wich will manipulate the data
// these methods cannot be asynch
const mutations = {
    setUserDetails(state, payload) {
        state.userDetails = payload
    },
    addUser(state, payload){
        Vue.set(state.users, payload.userID, payload.userDetails)
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
              //update users online status on firebase
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
    firebaseUpdateUser({}, payload){
        firebaseDb.ref('users/' + payload.userID).update(payload.updates)
    },
    firebaseGetUsers({commit}){
        firebaseDb.ref('users').on('child_added', snapshot => {
            let userDetails= snapshot.val()
            let userID= snapshot.key
            commit('addUser', {
                userID,
                userDetails
            })
        })
    },
    logoutUser(){
        firebaseAuth.signOut()
    }
}
// methods to grab data from the state and 
// make that data available for vue components
const getters = {
    users: state => {
        return state.users
    }
}

export default {
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}