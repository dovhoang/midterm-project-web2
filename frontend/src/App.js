import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { UserRoute, Route } from './CustomRoute';
import BoardList from './domain/Board/BoardList';
import SignUp from './domain/Auth/SignUp';
import SignIn from './domain/Auth/SignIn';
import SingleBoard from './domain/Board/SingleBoard';
import Profile from './domain/User/Profile';
import NotFound from './components/NotFound';

function App() {
  return (
    <Router>
      <Switch>
        <UserRoute path='/:userId/myboards' exact component={BoardList} />
        <Route path='/signup' exact component={SignUp} />
        <Route path='/signin' exact component={SignIn} />
        <Route path='/board/:boardId' exact component={SingleBoard} />
        <UserRoute path='/:userId/profile' exact component={Profile} />
        <Route component={NotFound} />
      </Switch>
    </Router >
  );
}

export default App;
