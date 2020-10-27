import React, { useState } from 'react'
import { Button } from 'antd'
import TextareaAutosize from 'react-textarea-autosize';
import './InputTag.css'
import { connect } from 'react-redux'
import { createTag, updateTag } from './apiTag'

const InputTag = ({ item = undefined, type = undefined, color,
    createdTag, updatedTag, boardId }) => {
    const [content, setContent] = useState(item ? item.content : '');
    const [error, setError] = useState('')

    const handleChange = (e) => {
        setContent(e.target.value);
        if (e.target.value === '') {
            setError('Content is required!')
        } else {
            setError('')
        }
    }

    const handleClick = () => {
        console.log(content)
        if (content === '') {
            setError('Content is required!')
        } else if (item) {
            updateTag(item._id, content).then(res => {
                updatedTag();
            })
        } else {
            createTag(content, type, boardId).then(res => {
                createdTag();
            })
        }
    }



    return (
        <>
            <div className='input-tag d-flex justify-content-center'
                style={{ backgroundColor: color }}>
                <TextareaAutosize minRows={1} onChange={handleChange} autoFocus
                    value={content} />
                <Button className='done' onClick={handleClick}
                    style={{ backgroundColor: color }}>Done</Button>
                <div className='error'>{error}</div>
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