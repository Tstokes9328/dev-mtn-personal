import axios from 'axios';

//Initial State
const initialState = {
    user: {},
    userCar: [{}],
    userCarPics: [{}]
}

//Action Type
const GET_USER = "GET_USER";
const GET_USER_CAR = "GET_USER_CAR";
const GET_USER_CAR_PICS = "GET_USER_CAR_PICS";

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
        return response.data
    })
    return {
        type: GET_USER_CAR,
        payload: userCar
    }
}

export function getUserCarPics(){
    let userCarPics = axios.get('/usercarpics').then(response => {
        console.log(response.data)
        return response.data
    })
    return {
        type: GET_USER_CAR_PICS,
        payload: userCarPics
    }
}

//Reducer Function
export default function reducer(state = initialState, action){
    switch(action.type){
        case GET_USER + '_FULFILLED':
            return Object.assign({}, state, {user: action.payload})
        case GET_USER_CAR + '_FULFILLED':
            return Object.assign({}, state, {userCar: action.payload})
        case GET_USER_CAR_PICS + '_FULFILLED':
        console.log(action.payload)
            return Object.assign({}, state, {userCarPics: action.payload})
        default:
            return state
    }
}