import { combineReducers } from '@reduxjs/toolkit'
import tagReducer from './tagReducer'
import authReducer from './authReducer'
import boardReducer from './boardReducer'


export default combineReducers({
    tag: tagReducer,
    auth: authReducer,
    board: boardReducer
})
