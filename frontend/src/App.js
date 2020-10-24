import React from 'react';
import './App.css';
import BoardList from './domain/Board/BoardList'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;

function App() {
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">Home</Menu.Item>
          <Menu.Item key="2">Profile</Menu.Item>
          <Menu.Item key="3">Sign in</Menu.Item>
          <Menu.Item key="4">Sign up</Menu.Item>
          <Menu.Item key="5">Sign out</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Boards List</Breadcrumb.Item>
        </Breadcrumb>
        <div className="site-layout-content">
          {<Router>
            <Switch>
              <Route path='/' exact >
                <BoardList />
              </Route>
            </Switch>
          </Router>}
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>@Trello-2020</Footer>
    </Layout>
  );
}

export default App;
