import React, {Component} from 'react';

import {Navbar, Button} from 'react-bootstrap';

import {Link} from 'react-router-dom';

import {userSession} from '../../../blockstack-config';

class HomePage extends Component {
  signIn = (e) => {
    e.preventDefault();

    userSession.redirectToSignIn();
  };

  render() {
    const {user} = this.props;

    return (
      <>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>BoilerStack</Navbar.Brand>
        </Navbar>
        <div className="home-container">
          <h1 className="title">Welcome</h1>

          <div className="sign-in">
            <Button onClick={this.signIn}>Sign in</Button>
            {user &&
            <>
              <div className="divider">or</div>
              <div className="continue">Continue as <Link to="/app">{user.username}</Link></div>
            </>
            }
          </div>
        </div>
      </>
    )
  }
}

export default HomePage