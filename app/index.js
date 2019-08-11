import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { version, Button } from 'antd';
import 'antd/dist/antd.css';
import './index.css';




class App extends Component {
    render() {
        return (
            <div className="App">
                <h1>Welcome to the test store</h1>
                <div style={{ marginTop: '16px' }}>
                    <Button type="primary" onClick={ev => console.log(ev)}>Create New Item</Button>
                </div>
            </div>
        );
    }
}


ReactDOM.render(<App />, document.getElementById('app'));