import React, { Component } from 'react';
import { Layout, Menu, Icon } from 'antd';




export default class MainMenu extends Component {
    state = {
        collapsed: false
    };


    onCollapse = collapsed => {
        this.setState({ collapsed });
    };


    render() {
        const { Sider } = Layout;

        return (
                <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
                    <div className="logo" />
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1">
                            <Icon type="book" />
                            <span>List</span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <Icon type="plus" />
                            <span>Create</span>
                        </Menu.Item>
                    </Menu>
                </Sider>
        );
    }
}