import React from 'react';
import { Form, Input, InputNumber, Button } from 'antd';
import { observer, inject } from 'mobx-react';
import { CategorySelect, ConditionSelect, TypeSelect } from './formHelpers';




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
        await fetch('/xhr/records', { method: 'POST', body: JSON.stringify(formData), headers: {"Content-Type": "application/json"} })
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


    handleSelectChange = (fieldName, value) => {
        this.props.form.setFieldsValue({
          [fieldName]: value,
        });
      };


    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 6 }
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
                    offset: 0
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
                    })(<TypeSelect handleSelectChange={(val) => this.handleSelectChange('type', val)} />)}
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
                    })(<InputNumber type="number" />)}
                </Form.Item>
                <Form.Item label="Categories">
                    {getFieldDecorator('categories', {
                        rules: [{ type: 'array', required: true, message: 'Please select your categories!' }]
                    })(<CategorySelect options={this.state.categories} handleSelectChange={(val) => this.handleSelectChange('categories', val)} />)}
                </Form.Item>
                <Form.Item label="Condition">
                    {getFieldDecorator('condition', {
                        rules: [
                            {
                                required: true,
                                message: 'Please input a condition!'
                            }
                        ]
                    })(<ConditionSelect handleSelectChange={(val) => this.handleSelectChange('condition', val)} />)}
                </Form.Item>
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
