import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import './index.css';
import Layout from './Components/Layout';

class App extends Component {
    getRecords = async () => {
        const URL = `${process.env.API_PATH}catalog/products`;

        const request = new Request(URL, {
            method: 'GET',
            mode: 'cors',
            redirect: 'follow',
            headers: new Headers({
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'X-Auth-Token': process.env.ACCESS_TOKEN,
                'X-Auth-Client': process.env.CLIENT_ID
            })
        });

        await fetch(request)
            .then(response => {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    return;
                }

                response.json().then(data => {
                    console.log(data);
                });
            })
            .catch(err => {
                console.log('Fetch Error :-S', err);
            });
    };


    render() {
        return (
            <Layout>
                <div className="App">
                    <h1>Welcome to the test store</h1>
                    <div style={{ marginTop: '16px' }}>
                        <Button type="primary" onClick={this.getRecords}>
                            Get Records
                        </Button>
                    </div>
                </div>
            </Layout>
        );
    }
}


ReactDOM.render(<App />, document.getElementById('app'));