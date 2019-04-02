import React, {Component} from 'react';

import {bindActionCreators} from 'redux';

import connect from 'react-redux/es/connect/connect';

import AppPage from '../../components/pages/app'

import {signOut} from '../../store/user';

import {setTitle, setFilter, addItem, fetchItems, toggleItem, deleteItem} from '../../store/todo';

class AppContainer extends Component {
  render() {
    return <AppPage {...this.props} />
  }
}

const mapStateToProps = ({user, todo}) => ({
  user,
  todo
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      signOut,
      setTitle,
      setFilter,
      addItem,
      fetchItems,
      toggleItem,
      deleteItem
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer)