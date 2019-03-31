import React, {Component} from 'react';

import {Navbar, Button} from 'react-bootstrap';

import {userSession} from '../../../blockstack-config';

class HomePage extends Component {
  signIn = (e) => {
    e.preventDefault();

    if (userSession.isUserSignedIn()) {
      const {history} = this.props;
      history.push('/app');
      return;
    }

    userSession.redirectToSignIn();
  };


  render() {
    return (
      <>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>BoilerStack</Navbar.Brand>
        </Navbar>
        <div className="home-container">
          <Button onClick={this.signIn}>Sign in</Button>
        </div>
      </>
    )
  }
}

export default HomePage