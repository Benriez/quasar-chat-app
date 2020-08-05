import {firebaseAuth, firebaseDb} from 'boot/firebase'

//all the data of the app will go here
const state = {
    userDetails: {}
}
// methods wich will manipulate the data
// these methods cannot be asynch
const mutations = {
    setUserDetails(state, payload) {
        state.userDetails = payload
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
    handleAuthStateChanged({commit}){
        firebaseAuth.onAuthStateChanged(user => {
            if (user) {
              // User is logged in.
              let userID = firebaseAuth.currentUser.uid
              //getting userDetails from Firebase
              firebaseDb.ref('users/' + userID ).once('value', snapshot => {
                  let userDetails= snapshot.val()
                  //triggers mutation
                  commit('setUserDetails', {
                      name: userDetails.name,
                      email: userDetails.email,
                      userID: userID
                  })
              })
            } else {
              // User logged out

            }
          });
    }
}
// methods to grab data from the state and 
// make that data available for vue components
const getters = {

}

export default {
    namespaced:true,
    state,
    mutations,
    actions,
    getters
}