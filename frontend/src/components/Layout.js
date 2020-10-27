import React, { useEffect } from 'react';
import { BrowserRouter as Router, Link, Redirect } from 'react-router-dom'
import { Layout as LayoutAnt, Menu, Breadcrumb } from 'antd';
import { isAuthenticate, signout } from '../domain/Auth/apiAuth'
import { connect } from 'react-redux'


const { Header, Content } = LayoutAnt;


function Layout({ clearUserId, history, children, setUserId }) {
  const signOut = () => {
    signout(() => {
      clearUserId();
      history.push('/signin')
    }).then(res => {
      console.log(res.data);
    })
  }

  const isActive = (history, path) => {
    console.log(history)
    if (history.location.pathname === path) {
      return { backgroundColor: "#1890ff" };
    } else {
      return { backgroundColor: "#001529" };
    }
  };
  useEffect(() => {
    if (isAuthenticate()) {
      setUserId(isAuthenticate().user._id);
    } else {
      setUserId('');
    }
  })

  return (
    <LayoutAnt className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" >
          {isAuthenticate() && <>
            <Menu.Item key="1" style={isActive(history, `/${isAuthenticate().user._id}/myboards`)}>
              <Link to={`/${isAuthenticate().user._id}/myboards`}
              >My board</Link>
            </Menu.Item>
            <Menu.Item key="2" style={isActive(history, `/${isAuthenticate().user._id}/profile`)}>
              <Link to={`/${isAuthenticate().user._id}/profile`}
              > Profile</Link>
            </Menu.Item>
            <Menu.Item key="3" onClick={signOut}>Sign out</Menu.Item>
          </>}
          {!isAuthenticate() && <>
            <Menu.Item key="2"
              style={isActive(history, "/signup")}>
              <Link to="/signup"
              >Sign up</Link>
            </Menu.Item>
            <Menu.Item key="3"
              style={isActive(history, "/signin")}>
              <Link to="/signin"
              >Sign in</Link>
            </Menu.Item>
          </>}
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px', backgroundColor: "white" }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
        </Breadcrumb>
        <div className="site-layout-content">
          {children}
        </div>
      </Content>
    </LayoutAnt>
  );
}

const mapStateToProps = (state) => ({
  userId: state.userId
})
const mapDispatchToProps = (dispatch) => ({
  clearUserId: () => dispatch({ type: 'CLEAR_USER_ID' }),
  setUserId: (id) => dispatch({ type: 'SET_USER_ID',userId: id })
})

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
