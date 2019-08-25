import React from 'react';
import { Route } from 'mobx-router';
import App from '../Components/App';
import Create from '../Components/Create';




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
    component: <Create/>
  }),
};


export default views;