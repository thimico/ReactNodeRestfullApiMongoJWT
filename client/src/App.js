import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode'
import setAuthToken from './utils/setAuthToken'
import { setCurrentUser, logoutUser } from './actions/authActions'


import { Provider } from 'react-redux';
import store from './store'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Landing from './components/layout/Landing'
import Register from './components/auth/Register'
import Login from './components/auth/Login'

import './App.css';
import Dashboard from './components/dashboard/Dashboard';
import Profiles from './components/profiles/Profiles';
import CreateProfile from './components/create-profile/CreateProfile';
import PrivateRoute from './components/common/PrivateRoute';
import EditProfile from "./components/edit-profile/EditProfile";
import AddExperience from './components/add-experience/AddExperience';
import AddEducation from './components/add-education/AddEducation';
import Profile from './components/profile/Profile';
import Alert from './components/common/Alert';
import Posts from './components/posts/Posts';

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken)
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken)
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded))
  // Check for expired token
  const currentTime = Date.now() / 1000;
  if(decoded.exp < currentTime) {
      // Logout user
      store.dispatch(logoutUser())
      // TODO: Clear current Profile
      // Redirect to login
      window.location.href = '/login'
  }

}

class App extends Component {
  render() {
    return (
      <Provider store={ store }>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={ Landing } />
            <div className="container">
              <Alert/>
              <Route exact path="/register" component={ Register } />
              <Route exact path="/login" component={ Login } />
              <Route exact path="/dashboard" component={ Dashboard } />
              <Route exact path="/profiles" component={ Profiles } />
              <Route exact path="/profile/:handle" component={Profile} />
              <Switch>
                <PrivateRoute exact path="/create-profile" component={CreateProfile}/>
              </Switch>
                <Switch>
                    <PrivateRoute
                        exact
                        path="/edit-profile"
                        component={EditProfile}
                    />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/add-experience"
                    component={AddExperience}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute
                    exact
                    path="/add-education"
                    component={AddEducation}
                  />
                </Switch>
                <Switch>
                  <PrivateRoute exact path='/posts' component={Posts} />
                </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
