import React from 'react'
import { Card } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { deleteTag } from './apiTag'
import './TagItem.css'
import { connect } from 'react-redux'

const TagItem = ({ type, item, deletedTag, editedTag }) => {
    const bColor = () => {
        if (type === 0) {
            return '#fa8c16'
        } else if (type === 1) {
            return '#c41d7f'
        } else if (type === 2) {
            return '#389e0d'
        }
        return '#389e0d';
    }

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
        <Card className='tag' style={{ backgroundColor: bColor() }}>
            <div className="control">
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