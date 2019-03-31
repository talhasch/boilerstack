import React, {Component} from 'react';

import {bindActionCreators} from 'redux';

import connect from 'react-redux/es/connect/connect';

import AppPage from '../../components/pages/app'

import {
  signOut
} from '../../store/user';


class AppContainer extends Component {
  render() {
    return <AppPage {...this.props} />
  }
}


const mapStateToProps = ({user}) => ({
  user,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      signOut,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer)