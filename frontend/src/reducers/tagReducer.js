import { createReducer } from '@reduxjs/toolkit'

const initState = {
    renderBoard: false,
    tagEditId: '',
    boardId: '',
    tagAddType: '',
}

const tagReducer = createReducer(initState, {
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

export default tagReducer;