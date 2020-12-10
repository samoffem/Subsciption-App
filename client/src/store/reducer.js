const initState = {
    token: localStorage.getItem('token'),
    user: null,
    isAuthenticated: false

}

export default function(state=initState, action){
    switch(action.type){
        case "LOGGED_IN":
            localStorage.setItem('token', action.payload.token)
            return {
                ...state,
                user: action.payload.user,
                isAuthenticated: true
            }
        case "AUTH_ERROR":
        case "LOGGED_OUT":
        case "LOGIN_FAILED":
            localStorage.removeItem('token')
            return{
                ...state,
                token: "",
                user: null,
                isAuthenticated:false
            }
        case "USER_LOADED":
            console.log("user Loaded")
            return{
                ...state,
                isAuthenticated: true,
                user: action.payload
            }
        default:
            return state
    }

}