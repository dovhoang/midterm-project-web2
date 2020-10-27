import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card } from 'antd';
import { changePassword } from './apiUser'
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};
const ChangePassword = ({ id, handleClose }) => {

    const [error, setError] = useState('')
    const onFinish = (values) => {
        console.log('Success:', values);
        const { oldPassword, newPassword, repeatNewPassword } = values;
        if (repeatNewPassword !== newPassword) {
            setError('Repeat password is not match ')
        } else {
            changePassword(id, oldPassword, newPassword)
                .then(res => {
                    console.log(res.data);
                    handleClose();
                })
                .catch(error => {
                    setError(error.response.data.error)
                })
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };


    const showError = () => {
        return <div className="alert alert-danger"
            style={{ display: error ? "" : "none" }}> {error}</div >
    }

    return (
        <Card title='Change Password'>
            <Form
                {...layout}
                name="basic"
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item
                    label="Current Password"
                    name="oldPassword"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your current password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item
                    label="New Password"
                    name="newPassword"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your new password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label="Repeat new password"
                    name="repeatNewPassword"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your new repeat password!',
                        },
                    ]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" className="mr-1">
                        Update
                    </Button>
                    <Button type="primary" className="ml-1" onClick={handleClose}>
                        Cancel
                    </Button>
                </Form.Item>
                {showError()}
            </Form>
        </Card>
    );
}

export default ChangePassword;
