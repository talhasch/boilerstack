import React, {Component} from 'react';

import {Route} from 'react-router-dom';

import HomeContainer from './home';
import AuthContainer from './auth';
import AppContainer from './app';

import {userSession} from '../blockstack-config';

import {signIn} from '../store/user';


export default class App extends Component {
  constructor(props) {
    super(props);

    if (userSession.isUserSignedIn()) {
      const userData = userSession.loadUserData();
      const {store} = this.props;
      store.dispatch(signIn(userData));
    }
  }

  render() {
    return (
      <>
        <Route exact path="/" component={HomeContainer}/>
        <Route exact path="/auth" component={AuthContainer}/>
        <Route exact path="/app" component={AppContainer}/>
      </>
    );
  }
}