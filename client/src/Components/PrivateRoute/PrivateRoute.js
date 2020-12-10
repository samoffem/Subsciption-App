import React, {useEffect}  from 'react'
import {connect} from 'react-redux'
import {Router, Redirect, Route} from 'react-router-dom'



const privateRoute = ({component: Component, state, ...rest})=>{
return <Route 
            {...rest}
            render = {props=>{
                if(state.isAuthenticated){
                    return <Component {...props} />;
                } else {
                    return <Redirect to='/login' />;
                }
            }}
        />
}
const mapStateToProps = (state)=>{
    console.log('mapstate', state)
    return{
        state
    }
}

export default connect(mapStateToProps)(privateRoute)