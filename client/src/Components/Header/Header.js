import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {logout} from '../../store/actions'


class Header extends Component {


    handleClick = ()=>{
        this.props.logout()
        

    }
    
    render(){
        console.log(this.props)
        const {authenticated, user} = this.props

        const authLinks = (
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                <li className="navbar-text mr-3">
                    <span><strong>{user? `Welcome ${user.email}`:""}</strong></span>
                </li>
                <li className="nav-item">
                <button onClick ={this.handleClick} className="nav-link btn btn-info btn-sm text-light">Logout</button>
                </li>
                
            </ul>
        )
        const guestLinks = (
            <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
                <li className="nav-item">
                    <Link to="/register" className="nav-link">Register</Link>
                </li>
                <li className="nav-item">
                    <Link to="/login" className="nav-link">Login</Link>
                </li>
            </ul>
        )
        return(
            
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                <div className="container">
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <a className="navbar-brand" href="#">Lead Manager</a>
                    </div>
                    {authenticated? authLinks : guestLinks}
                </div>
                
            </nav>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        authenticated: state.isAuthenticated,
        user: state.user
    }
}
export default connect(mapStateToProps, {logout})(Header)