import {firebaseAuth, firebaseDb} from 'boot/firebase'

//all the data of the app will go here
const state = {

}
// methods wich will manipulate the data
// these methods cannot be asynch
const mutations = {

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