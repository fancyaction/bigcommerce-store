import React, { Component } from 'react';
import { Card } from 'antd';




const tabList = [
    {
        key: 'tab1',
        tab: 'description'
    },
    {
        key: 'tab2',
        tab: 'details'
    }
];

const contentList = record => ({
    tab1: <div dangerouslySetInnerHTML={{ __html: record.description }} />,
    tab2: <ul>
        <li>Availability: {record.availability}</li>
        <li>Price: ${record.price}</li>
    </ul>
});


export default class ItemCard extends Component {
    state = {
        key: 'tab1',
    };

    onTabChange = (key, type) => {
        console.log(key, type);
        this.setState({ [type]: key });
    };


    render() {
        const { record } = this.props;

        return (
            <Card
                style={{ width: '300px' }}
                cover={<img alt="example" src="https://source.unsplash.com/1600x900/?clothes" />}
                title={record.name}
                extra={<a href="#">More</a>}
                tabList={tabList}
                activeTabKey={this.state.key}
                onTabChange={key => {
                    this.onTabChange(key, 'key');
                }}
            >
                {contentList(record)[this.state.key]}
            </Card>
        );
    }
}
