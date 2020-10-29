import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Checkbox, Card } from 'antd';
import axios from 'axios'
import { signup } from './apiAuth'



const SignUp = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const onFinish = (values) => {
        setSuccess(false);
        const { username, name, password, repeatpassword } = values
        if (checkRepeatPasswrod(password, repeatpassword)) {
            signup({ username, name, password })
                .then(res => {
                    console.log(res.data);
                    setSuccess(true);
                    setError('');
                })
                .catch(error => {
                    setError(error.response.data.error);
                })
        } else {
            setError('Repeat password is not match');
        }

    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const checkRepeatPasswrod = (password, repeat) => {
        return password === repeat;
    }

    const showError = () => {
        return <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
            {error}
        </div>
    };
    const showSuccess = () => {
        return <div className="alert alert-success" style={{ display: success ? "" : "none" }}>
            Sign up successfully!
        </div>
    };

    return (
        <div className='d-flex justify-content-center'>
            <Card style={{ width: '400px' }}>
                <Form
                    layout="vertical"
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your name!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        label="Repeat Password"
                        name="repeatpassword"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your repeat password!',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item  >
                        <div className="d-flex justify-content-center">
                            <Button type="primary" htmlType="submit">
                                Sign up
                        </Button>
                        </div>
                    </Form.Item>
                    {showError()}
                    {showSuccess()}
                </Form>
            </Card>
        </div>
    );
}
export default SignUp;