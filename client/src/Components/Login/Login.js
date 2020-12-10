import React, { Component } from 'react'
import AuthenticationService from '../../services/Authentication'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {login} from '../../store/actions'
import './Login.css'

class Login extends Component {
    state = {
        email: "",
        password:"",
        error: "",
        redirect: null

    }

    handleSubmit = (e)=>{
        e.preventDefault()
        AuthenticationService.login(this.state)
        .then((res)=>{
            
            this.props.login(res.data)
            this.setState({
                email:"",
                password: "",
                error:"",
            })
        const {isAuthenticated} = this.props.state
        if(isAuthenticated){
            console.log("logged in")
            this.setState({
                redirect: "/"
            })
        }
        })
        .catch((err)=>{
            this.setState({
                error: err.response.data.error
            })
        })

    }

    render() {
        if(this.state.redirect){
            return <Redirect to={this.state.redirect} />
        }
        
        return (
            <div className=" container register-container">
                <h1 style={{textAlign: "center"}}>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="exampleInputEmail1">Email address</label>
                        <input value={this.state.email} onChange={(e)=>this.setState({email: e.target.value})}
                         type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                       
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleInputPassword1">Password</label>
                        <input value={this.state.password} onChange={(e)=>this.setState({password: e.target.value})}
                         type="password" className="form-control" id="exampleInputPassword1"/>
                          <small id="emailHelp" className="form-text text-muted">We'll never share your password with anyone else.</small>
                    </div>
                    <div className="form-group form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                        <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Login</button>
                    <p className="error" dangerouslySetInnerHTML={{__html:this.state.error}}/>
                </form> 
                

            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return{
        state: state
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
         login: (payload)=>dispatch(login(payload))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)


