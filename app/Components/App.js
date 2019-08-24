import React, { Component } from 'react';
import { Button, Card } from 'antd';
import Layout from './Layout';




const tabList = [
    {
        key: 'tab1',
        tab: 'tab1'
    },
    {
        key: 'tab2',
        tab: 'tab2'
    }
];


const contentList = {
    tab1: <p>content1</p>,
    tab2: <p>content2</p>
};


const tabListNoTitle = [
    {
        key: 'article',
        tab: 'article'
    },
    {
        key: 'app',
        tab: 'app'
    },
    {
        key: 'project',
        tab: 'project'
    }
];


const contentListNoTitle = {
    article: <p>article content</p>,
    app: <p>app content</p>,
    project: <p>project content</p>
};


export default class App extends Component {
    state = {
        key: 'tab1',
        noTitleKey: 'app',
        records: []
    };


    onTabChange = (key, type) => {
        console.log(key, type);
        this.setState({ [type]: key });
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
            <Layout>
                <div className="App">
                    <h1>Welcome to the test store</h1>
                    <div style={{ marginTop: '16px' }}>
                        <Button type="primary" onClick={this.getRecords}>
                            Get Records
                        </Button>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridGap: '1rem' }}>
                            {records.map(item => {
                                return (
                                    <Card
                                        style={{ width: '300px' }}
                                        cover={<img alt="example" src="https://source.unsplash.com/1600x900/?clothes" />}
                                        title={item.name}
                                        extra={<a href="#">More</a>}
                                        tabList={tabList}
                                        activeTabKey={this.state.key}
                                        onTabChange={key => {
                                            this.onTabChange(key, 'key');
                                        }}
                                    >
                                        {contentList[this.state.key]}
                                    </Card>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </Layout>
        );
    }
}