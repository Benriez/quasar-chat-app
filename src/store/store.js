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