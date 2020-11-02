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
                updatedTag(res.data);
            })
        } else {
            createTag(content, type, boardId).then(res => {
                createdTag(res.data);
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

const mapStateToProps = (state) => ({
    boardId: state.tag.boardId
})

const mapDispatchToProps = (dispatch) => {
    return {
        createdTag: (tag) => dispatch({ type: 'CLOSE_CREATE_TAG', createdTag: tag }),
        updatedTag: (tag) => dispatch({ type: 'CLOSE_EDIT_TAG', updatedTag: tag }),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(InputTag);