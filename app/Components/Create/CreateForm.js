import React from 'react';
import { Form, Input, InputNumber, Tooltip, Icon, Select, Button } from 'antd';
import { observer, inject } from 'mobx-react';




const { Option } = Select;


const CategorySelect = ({ options, ...props}) => (
    <Select
        showSearch
        style={{ width: 200 }}
        placeholder="Select category"
        optionFilterProp="children"
        // onChange={onChange}
        // onFocus={onFocus}
        // onBlur={onBlur}
        // onSearch={onSearch}
        filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
    >
        {options.map(item => <Option value={item.id} key={item.value}>{item.name}</Option>)}
    </Select>
);


const ConditionSelect = () => (
    <Select
        style={{ width: 200 }}
        placeholder="Select condition"
    >
        <Option value="used">Used</Option>
        <Option value="new">New</Option>
    </Select>
);


@inject('store')
@observer
class CreateForm extends React.Component {
    state = {
        confirmDirty: false,
        categories: []
    };


    componentDidMount = () => {
        this.getCategories();
    };
    

    getCategories = async () => {
        await fetch('/xhr/categories')
            .then(response => {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    return;
                }

                response.json().then(data => {
                    this.setState({ categories: data });
                });
            })
            .catch(err => {
                console.log('Fetch Error :-S', err);
            });
    };


    submitForm = async (formData) => {
        console.log("TCL: CreateForm -> submitForm -> this.props", this.props)
        
        await fetch('/xhr/records', { method: 'POST', body: formData})
            .then(response => {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    return;
                }

                response.json().then(data => {
                    console.log("TCL: CreateForm -> submitForm -> data", data)
                });
            })
            .catch(err => {
                console.log('Fetch Error :-S', err);
            });
    };


    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.submitForm(values);

                console.log('Received values of form: ', values);
            }
        });
    };

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };


    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 }
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 }
            }
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0
                },
                sm: {
                    span: 16,
                    offset: 8
                }
            }
        };

        return (
            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item label="Name">
                    {getFieldDecorator('name', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input a name!'
                            }
                        ]
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="Type">
                    {getFieldDecorator('type', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input a type!'
                            }
                        ]
                    })(<Input />)}
                </Form.Item>
                <Form.Item label="Description">
                    {getFieldDecorator('description', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input a description!'
                            }
                        ]
                    })(<Input.TextArea />)}
                </Form.Item>
                <Form.Item label="Weight">
                    {getFieldDecorator('weight', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input a weight!'
                            }
                        ],
                        initialValue: 10
                    })(<InputNumber type="number" />)}
                </Form.Item>
                <Form.Item label="Width">
                    {getFieldDecorator('width', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input a width!'
                            }
                        ],
                        initialValue: 10
                    })(<InputNumber type="number" />)}
                </Form.Item>
                <Form.Item label="Price">
                    {getFieldDecorator('price', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input a price!'
                            }
                        ],
                        initialValue: 1000
                    })(<InputNumber 
                            type="number" 
                    />)}
                </Form.Item>
                {/* <Form.Item label="Category">
                    {getFieldDecorator('category', {
                        rules: [{ required: true, message: 'Please select your category!' }]
                    })(<CategorySelect options={this.state.categories} />)}
                </Form.Item>
                <Form.Item label="Condition">
                    {getFieldDecorator('condition', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input a condition!'
                            }
                        ]
                    })(<ConditionSelect />)}
                </Form.Item> */}
                <Form.Item {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit">
                        Create
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}


export default Form.create({ name: 'create-form' })(CreateForm);
