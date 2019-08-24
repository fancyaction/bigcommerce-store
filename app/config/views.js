import React from 'react';
import { Route } from 'mobx-router';
import App from '../Components/App';




const views = {
  list: new Route({
    path: '/',
    component: <App/>
  }),
  edit: new Route({
    path: '/item/:id',
    component: <App/>
  }),
  create: new Route({
    path: '/create',
    component: <App/>
  }),
};


export default views;