import {Component} from 'react';

import {userSession} from '../../../blockstack-config';

class AuthPage extends Component {
  componentDidMount() {
    const {user, history} = this.props;

    if (user) {
      history.push('/app');
      return;
    }

    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn()
        .then(userData => {
          const {signIn} = this.props;
          signIn(userData);
          history.push('/app');
        });
    }
  }

  render() {
    return null;
  }
}

export default AuthPage;
