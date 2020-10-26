import React, { useState } from 'react'
import { Button } from 'antd'
import TextareaAutosize from 'react-textarea-autosize';
import './InputTag.css'
import { connect } from 'react-redux'
import { createTag, updateTag } from './apiTag'

const InputTag = ({ item = 'undefined', type = 'undefined',
    createdTag, updatedTag, boardId }) => {
    const [content, setContent] = useState(item ? item.content : '');

    const handleChange = (e) => {
        setContent(e.target.value);
    }

    const handleClick = () => {
        console.log(boardId)
        if (item === 'undefined') {
            createTag(content, type, boardId).then(res => {
                createdTag();
            })
        } else {
            updateTag(item._id, content).then(res => {
                updatedTag();
            })
        }
    }

    return (
        <>
            <div className='input-tag d-flex justify-content-center'>
                <TextareaAutosize minRows={1} onChange={handleChange} autoFocus
                    value={content} />
                <Button className='done' onClick={handleClick}>Done</Button>
            </div>

        </>
    );

}

const mapStateToProps = (state) => {
    console.log(state)
    return { boardId: state.boardId }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createdTag: () => dispatch({ type: 'BOARD_CHANGE' }),
        updatedTag: () => dispatch({ type: 'BOARD_CHANGE' }),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(InputTag);