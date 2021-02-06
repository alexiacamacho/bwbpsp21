/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React from 'react';
import { GlobalContext } from '@components/ContextProvider';
import { getUser, getContacts } from '@utils/airtable/requests';

export default class LoadingScreen extends React.Component {
  static contextType = GlobalContext;

  async componentDidMount() {
    await this.loadUser();
    await this.loadPOC();
    await this.context.setNavigation(this.props.navigation);
    console.log(this.context)

    if (this.context.loggedIn) {
      this.navigateApp();
    } else {
      this.navigateLogin();
    }
  }

  async loadUser() {
    // We load our old user and update it with the new info on airtable.
    const savedUser = await getUser(null, true);
    if (savedUser) {
      const fetchedUser = await getUser(savedUser);
      await this.context.setUser(fetchedUser);
    }
  }

  async loadPOC() {
    const pocs = await getContacts();
    this.context.setPocs(pocs);
  }

  navigateApp = () => {
    console.log('Loading: Navigate to app');
    this.props.navigation.navigate('App');
  };

  navigateLogin = () => {
    console.log('Loading: Navigate to login');
    this.props.navigation.navigate('Login');
  };

  render() {
    return null;
  }
}
