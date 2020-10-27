import { createReducer } from '@reduxjs/toolkit'

const initState = {
    userId: undefined,
}

const authReducer = createReducer(initState, {
    'SET_USER_ID': (state, action) => ({
        ...state,
        userId: action.userId
    }),
    'CLEAR_USER_ID': (state) => ({
        ...state,
        userId: undefined
    }),
})

export default authReducer;