import React, { Component } from 'react';
import { Layout } from 'antd';
import MainMenu from './MainMenu';




export default class CustomLayout extends Component {
    state = {
        collapsed: false
    };


    onCollapse = collapsed => {
        this.setState({ collapsed });
    };


    render() {
        const { Header, Content, Footer } = Layout;

        return (
            <Layout style={{ minHeight: '100vh' }}>
                <MainMenu />
                <Layout>
                    <Header style={{ background: '#fff', padding: 0 }}><h3 style={{ marginLeft: '1rem' }}>Welcome to the Store!</h3></Header>
                    <Content style={{ margin: '0 16px' }}>
                        {this.props.children}
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>Built by Allistair</Footer>
                </Layout>
            </Layout>
        );
    }
}