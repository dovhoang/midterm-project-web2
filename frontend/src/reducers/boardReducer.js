import { createReducer } from '@reduxjs/toolkit'

const initState = {
    renderBoardsList: false,
    modalVisible: false,
}

const boardReducer = createReducer(initState, {

    'BOARD_LIST_CHANGE': (state) => ({
        ...state,
        renderBoardsList: !state.renderBoardsList
    }),
    'DELETE_BOARD': (state) => ({
        ...state,
        renderBoardsList: !state.renderBoardsList
    }),
    'CREATE_BOARD': (state) => ({
        ...state,
        renderBoardsList: !state.renderBoardsList
    }),
    'MODAL_VISIBLE': (state, action) => ({
        ...state,
        modalVisible: action.status
    })
})

export default boardReducer;