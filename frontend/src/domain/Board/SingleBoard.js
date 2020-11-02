import React, { useState, useEffect } from 'react'
import TagList from '../Tag/TagList'
import { Input } from 'antd'
import { getTagsListByBoardId } from '../Tag/apiTag'
import { getBoardById, updateNameBoard } from './apiBoard'
import { isAuthenticate } from '../Auth/apiAuth'
import { connect } from 'react-redux'
import './SingleBoard.css'

const SingleBoard = ({ setBoardId, renderBoard, match }) => {
    const [board, setBoard] = useState('');
    const [editName, setEditName] = useState(false);
    const [nameInput, setNameInput] = useState('')
    const [error, setError] = useState('');

    const boardId = match.params.boardId;
    let token;

    const handleChange = (e) => {
        console.log(e.target.value)
        setNameInput(e.target.value);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            updateNameBoard(board._id, { name: nameInput }, token)
                .then(res => {
                    console.log(res.data)
                    setEditName(false);
                })
                .catch(error => {
                    setError(error.response.data.error);
                })
        }
    }


    useEffect(() => {
        setBoardId(boardId);
        getBoardById(boardId).then(res => {
            setBoard(res.data)
            setNameInput(res.data.name)
        });
        token = isAuthenticate().token
    }, [])
    return (
        <>
            {!editName && <div className='board-name' onDoubleClick={() => { setEditName(true) }}>
                {nameInput}</div>}
            {editName && <Input className='edit-name' value={nameInput} onChange={handleChange}
                onKeyDown={handleKeyDown} />}
            <div className="row">
                <TagList key={1} type={0} boardId={boardId} />
                <TagList key={2} type={1} boardId={boardId} />
                <TagList key={3} type={2} boardId={boardId} />
            </div>
        </>
    );
}

const mapStateToProps = (state) => {
    return { renderBoard: state.tag.renderBoard }
}
const mapDispatchToProps = (dispatch) => ({
    setBoardId: (id) => {
        return dispatch({ type: 'CURRENT_BOARD', boardId: id })
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleBoard);