import axios from 'axios';

//Initial State
const initialState = {
    user: {},
    userCar: [{}]
}
//Action Type
const GET_USER = "GET_USER";
const GET_USER_CAR = "GET_USER_CAR";

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

export function getUserCar(){
    let userCar = axios.get('/usercar').then((response) => {
        console.log(response.data)
        return response.data
    })
    return {
        type: GET_USER_CAR,
        payload: userCar
    }
}

//Reducer Function
export default function reducer(state = initialState, action){
    switch(action.type){
        case GET_USER + '_FULFILLED':
            return Object.assign({}, state, {user: action.payload})
        case GET_USER_CAR + '_FULFILLED':
            console.log(action.payload)
            return Object.assign({}, state, {userCar: action.payload})
        default:
            return state
    }
}