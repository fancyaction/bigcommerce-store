import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { MobxRouter, RouterStore, startRouter } from 'mobx-router';
import { Provider } from 'mobx-react';
import 'antd/dist/antd.css';
import './index.css';
import SessionStore from './stores/SessionStore';
import views from './config/views';




const store = {
	SessionStore: new SessionStore(),
	router: new RouterStore()
};

startRouter(views, store);


const Root = (
    <Provider store={store}>
        <MobxRouter />
    </Provider>
)


ReactDOM.render(Root, document.getElementById('app'));
