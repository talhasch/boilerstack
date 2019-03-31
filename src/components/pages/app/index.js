import React, {Component} from 'react';

import {Button, Navbar, Nav} from 'react-bootstrap';

import Spinner from '../../elements/spinner';

class AppPage extends Component {
  componentDidMount() {
    const {user} = this.props;
    const {history} = this.props;

    if (!user) {
      history.push('/');
    }
  }

  signOut = (e) => {
    e.preventDefault();
    const {signOut, history} = this.props;
    signOut();
    history.push('/');
  };

  render() {
    return (
      <>
        <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
          <Navbar.Brand>BoilerStack</Navbar.Brand>
          <Navbar.Toggle/>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link onClick={this.signOut}>Sign Out</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <div className="app-container">

        </div>
      </>
    )
  }
}


export default AppPage;