import React, { Component } from 'react';
import { Link } from 'mobx-router';
import { Layout, Menu, Icon } from 'antd';
import { observer, inject } from 'mobx-react';
import views from '../../config/views';




@inject('store')
@observer
export default class MainMenu extends Component {
    state = {
        collapsed: false
    };

    onCollapse = collapsed => {
        this.setState({ collapsed });
    };

    renderNavLinks = () => {
        const { store } = this.props;

        return [
            <Menu.Item key={0}>
                <Link view={views.list} store={store}>
                    List
                </Link>
            </Menu.Item>,
            <Menu.Item key={1}>
                <Link view={views.edit} store={store}>
                    Edit
                </Link>
            </Menu.Item>,
            <Menu.Item key={2}>
                <Link view={views.create} store={store}>
                    Create
                </Link>
            </Menu.Item>,
        ];
    };

    render() {
        const { Sider } = Layout;

        return (
            <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                <div className="logo" />
                <Menu theme="dark">{this.renderNavLinks()}</Menu>
            </Sider>
        );
    }
}
