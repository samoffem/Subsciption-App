import React, {Component, Fragment, useEffect} from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Register from './Components/Register/Register'
import Login from './Components/Login/Login'
import Dashboard from './Components/Dashboard/Dashboard'
import Header from './Components/Header/Header'
import PrivateRoute from './Components/PrivateRoute/PrivateRoute'
import store from './store'
import {loadUser} from './store/actions'
import AuthenticationService from './services/Authentication'
import AuthIsLoaded from './Components/AuthIsLoaded/AuthIsLoaded'
import "./App.css"


class App extends Component {
  state = {
    isAuthenticated: false
  }
  componentDidMount() {
    AuthenticationService.getUser()
    .then(res=>{
      store.dispatch(loadUser(res.data))
      this.setState({isAuthenticated:true})
    }).catch(err=>store.dispatch({type:"AUTH_ERROR"}))
    
  }
  render() {
    return(
      <Fragment>
      <BrowserRouter>
      <Header />
      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        {(this.state.isAuthenticated !==false)?<PrivateRoute
         exact path="/" component={Dashboard} /> : null}
        
        
      </Switch>
        
      </BrowserRouter>
    </Fragment> 
    )
    
  }
}
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>   
 ,
  document.getElementById('root')
);

