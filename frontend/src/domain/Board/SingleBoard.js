import React, { useState, useEffect } from 'react'
import TagList from '../Tag/TagList'
import { Input } from 'antd'
import { getTagsListByBoardId } from '../Tag/apiTag'
import { getBoardById, updateNameBoard } from './apiBoard'
import { isAuthenticate } from '../Auth/apiAuth'
import { connect } from 'react-redux'
import './SingleBoard.css'

const SingleBoard = ({ setBoardId, renderBoard, match }) => {
    const [wentWell, setWentWell] = useState([]);
    const [toImprove, setToImprove] = useState([]);
    const [actionItems, setActionItems] = useState([]);
    const [board, setBoard] = useState('');
    const [editName, setEditName] = useState(false);
    const [nameInput, setNameInput] = useState('')
    const [error, setError] = useState('');

    const id = match.params.boardId;
    let token;
    const getWentWellTagsList = () => {
        getTagsListByBoardId(id, 0)
            .then(res => {
                setWentWell(res.data);
            })
            .catch(error => {
                console.log(error);
                setError(error.response.data.error);
            })

    }

    const getToImpoveTagsList = () => {
        getTagsListByBoardId(id, 1)
            .then(res => {
                setToImprove(res.data);
            })
            .catch(error => {
                setError(error.response.data.error);
            })
    }

    const getActionItemsTagsList = () => {
        getTagsListByBoardId(id, 2)
            .then(res => {
                setActionItems(res.data);
            })
            .catch(error => {
                setError(error.response.data.error);
            })
    }

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
        getWentWellTagsList();
        getToImpoveTagsList();
        getActionItemsTagsList();
    }, [renderBoard])

    useEffect(() => {
        setBoardId(id);
        getBoardById(id).then(res => {
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
                <TagList key={1} type={0} list={wentWell} />
                <TagList key={2} type={1} list={toImprove} />
                <TagList key={3} type={2} list={actionItems} />
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