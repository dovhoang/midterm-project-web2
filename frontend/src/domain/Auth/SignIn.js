import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Checkbox, Card } from 'antd';
import { Redirect } from 'react-router-dom'
import { signin, authenticate, signinWithGoogle, signinWithFacebook } from './apiAuth'
import { connect } from 'react-redux'
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import './Signin.css'


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
                    setUserId(res.data.user._id);
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

    const responseSuccessGoogle = (response) => {
        const { tokenId } = response;
        console.log(response.googleId)
        signinWithGoogle(tokenId).then(res => {
            console.log(res.data);
            authenticate(res.data, () => {
                setUserId(res.data.user._id);
                setCurrentUserId(res.data.user._id)
            });
        })
            .catch(error => {
                console.log(error);
            })
    }
    const responseErrorGoogle = () => {

    }
    const responseFacebook = (response) => {
        const { userID, name, email, accessToken } = response;
        console.log(response)
        signinWithFacebook(userID, name, email, accessToken)
            .then(res => {
                authenticate(res.data, () => {
                    setUserId(res.data.user._id);
                    setCurrentUserId(res.data.user._id)
                });
            })
            .catch(err => {
                console.log(err);
            })

    }

    const componentClicked = () => {
        console.log("button clicked!")
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
                        <div className="local-login">
                            <Button type="primary" htmlType="submit">
                                Sign in
                        </Button>
                        </div>
                    </Form.Item>
                    <Form.Item>
                        <div className="row ">
                            <div className="col-md-6 col-sm-12">
                                <GoogleLogin
                                    clientId="501610522296-9hulmt8l52p612p0s5th7k43jevlaqkr.apps.googleusercontent.com"
                                    buttonText="Google"
                                    onSuccess={responseSuccessGoogle}
                                    onFailure={responseErrorGoogle}
                                    className='google-login'
                                    cookiePolicy={'single_host_origin'}
                                />
                            </div>
                            <div className="col-md-6 col-sm-12">
                                <FacebookLogin
                                    appId="658011918241142"
                                    autoLoad={false}
                                    fields="id,name,email"
                                    onClick={componentClicked}
                                    callback={responseFacebook}
                                    cssClass='facebook-login'
                                    textButton="Facebook"
                                    icon="fa-facebook mr-3" />
                            </div>
                        </div>

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