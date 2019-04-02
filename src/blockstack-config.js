import {UserSession, AppConfig} from 'blockstack';

import {configure} from 'radiks';

import {RADIKS_ADDRESS} from './config';

const domain = window.location.origin;

export const userSession = new UserSession({
  appConfig: new AppConfig(['store_write', 'publish_data'], domain, '/auth', '/manifest.json')
});

configure({
  apiServer: RADIKS_ADDRESS,
  userSession
});