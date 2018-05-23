import axios from 'axios';

//Initial State
const initialState = {
    user: {}
}
//Action Type
const GET_USER = "GET_USER";

//Action Creator
export function getUser(){
    let userData = axios.get('/auth/user').then((response) => {
        return response.data
    })
    return {
        type: GET_USER,
        payload: userData
    }
}

//Reducer Function
export default function reducer(state = initialState, action){
    switch(action.type){
        case GET_USER + '_FULFILLED':
            return Object.assign({}, state, {user: action.payload})
        default:
            return state
    }
}