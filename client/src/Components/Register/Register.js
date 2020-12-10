import React, { Component } from 'react'
import AuthenticationService from '../../services/Authentication'
import {Link} from 'react-router-dom'
import './Register.css'
import axios from 'axios'

class Register extends Component {
    state = {
        email: "",
        password:"",
        error: "",
        success: false
    }

    register = (e)=>{
        e.preventDefault()
        AuthenticationService.register({
            email: this.state.email,
            password: this.state.password
        })
        .then((res)=>{
            console.log(res.data)
            this.setState({
                email:"",
                password: "",
                success: true
            })
        })
        .catch((err)=>{
            console.log(this.state)
            this.setState({
                error: err.response.data.error,
                success: false
            })
        })

    }

    render() {
        return (
            <div className=" container register-container">
                <h1 style={{textAlign: "center"}}>Register</h1>
                <form onSubmit={this.register}>
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
                    <button type="submit" className="btn btn-primary btn-block">Submit</button>
                    <p className="error" dangerouslySetInnerHTML={{__html:this.state.error}}/>
                    {this.state.success && <p>You have been successfully registered <Link to="/Login">Login</Link></p>}
                </form> 
                

            </div>
        )
    }
}

export default Register


