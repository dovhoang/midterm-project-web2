import React from 'react';
import './App.css';
import BoardList from './domain/Board/BoardList'
import { BrowserRouter as Router, Switch, Link, Route, Redirect } from 'react-router-dom'
import { Layout, Menu, Breadcrumb } from 'antd';
import SignUp from './domain/Auth/SignUp';
import SignIn from './domain/Auth/SignIn';
import { isAuthenticate, signout } from './domain/Auth/apiAuth'
import UserRoute from './domain/User/UserRoute'
import SingleBoard from './domain/Board/SingleBoard'
import Profile from './domain/User/Profile'
import { connect } from 'react-redux'
import NotFound from './components/NotFound'
const { Header, Content, Footer } = Layout;

function App({ userId, clearUserId }) {

  const signOut = () => {
    signout(() => {
      clearUserId();
      return <Redirect to='/signin' />
    }).then(res => {
      console.log(res.data);
    })
  }

  return (
    <Router>
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
            {isAuthenticate() && <>
              <Menu.Item key="1">
                <Link to={`/${isAuthenticate().user._id}/myboards`}>My board</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to={`/${isAuthenticate().user._id}/profile`} > Profile</Link>
              </Menu.Item>
              <Menu.Item key="3" onClick={signOut}>Sign out</Menu.Item>
            </>}
            {!isAuthenticate() && <>
              <Menu.Item key="2">
                <Link to="/signup">Sign up</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/signin">Sign in</Link>
              </Menu.Item>
            </>}


          </Menu>
        </Header>
        <Content style={{ padding: '0 50px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
          </Breadcrumb>
          <div className="site-layout-content">
            {
              <Switch>
                <UserRoute path='/:userId/myboards' exact component={BoardList} />
                <Route path='/signup' exact component={SignUp} />
                <Route path='/signin' exact component={SignIn} />
                <Route path='/board/:boardId' exact component={SingleBoard} />
                <UserRoute path='/:userId/profile' exact component={Profile} />
                <Route component={NotFound} />
              </Switch>
            }
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>@Trello-2020</Footer>
      </Layout>
    </Router >
  );
}

const mapStateToProps = (state) => ({
  userId: state.userId
})
const mapDispatchToProps = (dispatch) => ({
  clearUserId: () => dispatch({ type: 'CLEAR_USER_ID' })
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
