import React, { Component } from 'react';
import { Button } from 'antd';
import ItemCard from './ItemCard';




export default class List extends Component {
    state = {
        records: []
    };


    componentDidMount = () => {
        this.getRecords();
    };
    

    getRecords = async () => {
        await fetch('/xhr/records')
            .then(response => {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    return;
                }

                response.json().then(data => {
                    this.setState({ records: data });
                });
            })
            .catch(err => {
                console.log('Fetch Error :-S', err);
            });
    };
    


    render() {
        const { records } = this.state;

        return (
            <div className="App">
                <h3 style={{ color: 'blue', margin: '1rem 0'}}>Featured Items</h3>
                <div style={{ marginTop: '16px' }}>
                    {/* <Button type="primary" style={{ margin: '1rem 0' }} onClick={this.getRecords}>
                        Refresh
                    </Button> */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridGap: '1rem' }}>
                        {records.map((record, i) => <ItemCard key={`item-[${i}]`} record={record} />) }
                    </div>
                </div>
            </div>
        );
    }
}