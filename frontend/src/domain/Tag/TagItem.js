import React from 'react'
import { Card } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { deleteTag } from './apiTag'
import './TagItem.css'
import { connect } from 'react-redux'

const TagItem = ({ color, item, deletedTag, editedTag }) => {


    const handleDelete = () => {
        deleteTag(item._id)
            .then(res => {
                deletedTag();
            })
    }

    const handleEdit = () => {
        editedTag(item._id)
    }

    return (
        <Card className='tag' style={{ backgroundColor: color }}>
            <div className="tag-control">
                <span><EditOutlined onClick={handleEdit} /></span>
                <span><DeleteOutlined onClick={handleDelete} /></span>
            </div>
            <div className='content'>
                {item.content}
            </div>
        </Card>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        deletedTag: () => dispatch({ type: 'BOARD_CHANGE' }),
        editedTag: (id) => dispatch({ type: 'OPEN_INPUT_EDIT', tagEditId: id })
    }
}

export default connect(null, mapDispatchToProps)(TagItem);