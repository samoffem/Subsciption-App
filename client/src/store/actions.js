import AuthenticationService from '../services/Authentication'
export const login = (payload)=>{
    return{
        type: "LOGGED_IN",
        payload
    }
}

export const logout = ()=>{
    return{
        type:"LOGGED_OUT"
    }
}

// export const loadUser = ()=> (dispatch)=>{
//     //user loading
//     //dispatch({type: USER_LOADING})

//     AuthenticationService.getUser()
//     .then(res=>{
//         dispatch({
//             type:"USER_LOADED",
//             payload: res.data
//         })
//     }).catch(err=>{
//         console.log("load")
//         dispatch({type:"AUTH_ERROR"})
//     })
// }

export const loadUser = (payload)=>{
    //user loading
    //dispatch({type: USER_LOADING})
    return{
            type:"USER_LOADED",
            payload
        }

}