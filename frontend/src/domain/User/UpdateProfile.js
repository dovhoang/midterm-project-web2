import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Card } from 'antd';
import { updateProfile } from './apiUser'
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
const UpdateProfile = ({ user, handleClose }) => {
    const [updated, setUpdated] = useState(false);
    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log('Success:', values);
        updateProfile(user._id, values).then(res => {
            console.log(res.data);
            handleClose();
        })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        form.setFieldsValue({
            name: user.name,
            email: user.email,
            team: user.team
        });
    }, []);
    return (
        <Card title='Update profile'>
            <Form
                {...layout}
                name="basic"
                initialValues={{
                    remember: true,
                }}
                form={form}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
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
                    label="Email"
                    name="email"
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Team"
                    name="team"
                >
                    <Input />
                </Form.Item>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit" className="mr-1">
                        Update
                </Button>
                    <Button type="default" onClick={handleClose} className="ml-1">
                        Cancel
                </Button>
                </Form.Item>
            </Form>
        </Card>
    );
}

export default UpdateProfile;
