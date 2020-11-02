import { createReducer } from '@reduxjs/toolkit'

const initState = {
    renderBoard: false,
    tagEditId: '',
    boardId: '',
    tagAddType: '',
    createdTag: '',
    updatedTag: '',
    deletedTag: ''
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
    'OPEN_CREATE_TAG': (state, aciton) => ({
        ...state,
        tagAddType: aciton.tagAddType
    }),
    'CLOSE_CREATE_TAG': (state, action) => ({
        ...state,
        tagAddType: '',
        createdTag: action.createdTag
    }),
    'OPEN_EDIT_TAG': (state, action) => ({
        ...state,
        tagEditId: action.tagEditId
    }),
    'CLOSE_EDIT_TAG': (state, action) => ({
        ...state,
        tagEditId: '',
        updatedTag: action.updatedTag
    }),
    'RESET_UPDATE_DATA': state => ({
        ...state,
        createdTag: '',
        deletedTag: '',
        updatedTag: ''
    }),
    'DELETE_TAG': (state, action) => ({
        ...state,
        deletedTag: action.deletedTag
    })
})

export default tagReducer;