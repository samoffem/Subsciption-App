import React from 'react'
import {useSelector} from 'react-redux'

const AuthIsLoaded = ({children}) => {
    const user = useSelector(state=> state.user)
    if(user) return children
    
}

export default AuthIsLoaded
