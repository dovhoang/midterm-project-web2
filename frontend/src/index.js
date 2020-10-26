import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux'
import { configureStore, createReducer } from '@reduxjs/toolkit'

const initState = {
  userId: 'undefined',
  renderBoard: false,
  tagEditId: '',
  boardId: '',
  tagAddType: '',
}

const rootReducer = createReducer(initState, {
  'SET_USER_ID': (state, action) => ({
    ...state,
    userId: action.userId
  }),
  'CLEAR_USER_ID': (state) => ({
    ...state,
    userId: 'undefined'
  }),

  'BOARD_CHANGE': (state) => ({
    ...state,
    renderBoard: !state.renderBoard,
    tagEditId: '',
    tagAddType: ''
  }),
  'CURRENT_BOARD': (state, action) => ({
    ...state,
    boardId: action.boardId
  }),
  'OPEN_INPUT_ADD': (state, aciton) => ({
    ...state,
    tagAddType: aciton.tagAddType
  }),
  'OPEN_INPUT_EDIT': (state, action) => ({
    ...state,
    tagEditId: action.tagEditId
  }),
})

const store = configureStore({
  reducer: rootReducer
})

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
