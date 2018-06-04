//Initial State
const initialState = {
    title: '',
    location: '',
    date: '',
    event_picture: '',
    host: '',
    host_pic: '',
    event_info: ''
}

//Action Types
const UPDATE_TITLE = "UPDATE_TITLE";
const UPDATE_LOCATION = "UPDATE_LOCATION";
const UPDATE_DATE = "UPDATE_DATE";
const UPDATE_PICTURE = "UPDATE_PICTURE";
const RESET_STATE = "RESET_STATE";
const UPDATE_HOST = "UPDATE_HOST";
const UPDATE_HOST_PIC = "UPDATE_HOST_PIC";
const UPDATE_EVENT_INFO = "UPDATE_EVENT_INFO";

//Action Creators
export function updateTitle(title){
    return {
        type: UPDATE_TITLE,
        payload: title
    }
}

export function updateLocation(location){
    return {
        type: UPDATE_LOCATION,
        payload: location
    }
}

export function updateDate(date){
    return {
        type: UPDATE_DATE,
        payload: date
    }
}

export function updatePicture(event_picture){
    return{
        type: UPDATE_PICTURE,
        payload: event_picture
    }
}

export function updateHost(host){
    return {
        type: UPDATE_HOST,
        payload: host
    }
}

export function updateHostPic(host_pic){
    return {
        type: UPDATE_HOST_PIC,
        payload: host_pic
    }
}

export function updateEventInfo(info){
    return {
        type: UPDATE_EVENT_INFO,
        payload: info
    }
}

/*--- Reset State ---*/
export function resetState(){
    return {
        type: RESET_STATE,
        payload: initialState
    }
}

//Reducer function
export default function events(state = initialState, action){
        switch(action.type){
            case UPDATE_TITLE:
                return Object.assign({}, state, {title: action.payload});
            case UPDATE_LOCATION:
                return Object.assign({}, state, {location: action.payload});
            case UPDATE_DATE:
                return Object.assign({}, state, {date: action.payload});
            case UPDATE_PICTURE:
                return Object.assign({}, state, {event_picture: action.payload});
            case RESET_STATE:
                return Object.assign({}, state, action.payload);
            case UPDATE_HOST:
                return Object.assign({}, state, {host: action.payload});
            case UPDATE_HOST_PIC:
                return Object.assign({}, state, {host_pic: action.payload});
            case UPDATE_EVENT_INFO:
                return Object.assign({}, state, {event_info: action.payload});
            default:
                return state;
        }
}