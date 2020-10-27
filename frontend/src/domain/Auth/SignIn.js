import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Checkbox, Card } from 'antd';
import { Redirect } from 'react-router-dom'
import { signin, authenticate } from './apiAuth'
import { connect } from 'react-redux'


const SignIn = ({ setUserId }) => {
    const [currentUserId, setCurrentUserId] = useState('');
    const [error, setError] = useState('');

    const onFinish = (values) => {
        const { username, password } = values

        signin({ username, password })
            .then(res => {
                console.log(res.data);
                setError('');
                authenticate(res.data, () => {
                    //setUserId(res.data.user._id)
                    setCurrentUserId(res.data.user._id)
                });
            })
            .catch(error => {
                setError(error.response.data.error);
            })


    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    const showError = () => {
        return <div className="alert alert-danger" style={{ display: error ? "" : "none" }}>
            {error}
        </div>
    };

    const rediectToHome = () => {
        if (currentUserId) {
            return <Redirect to={`/${currentUserId}/myboards`} exact />
        }
    }

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
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                    >
                        <Input.Password visibilityToggle={false} />
                    </Form.Item>
                    <Form.Item  >
                        <Button type="primary" htmlType="submit">
                            Sign in
                        </Button>
                    </Form.Item>
                    {showError()}
                    {rediectToHome()}
                </Form>
            </Card>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({
    setUserId: (id) => dispatch({ type: 'SET_USER_ID', userId: id }),
})

export default connect(null, mapDispatchToProps)(SignIn);