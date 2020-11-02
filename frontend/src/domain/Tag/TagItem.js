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
                console.log(res.data)
                deletedTag(res.data);
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
        deletedTag: (tag) => dispatch({ type: 'DELETE_TAG', deletedTag: tag }),
        editedTag: (id) => dispatch({ type: 'OPEN_EDIT_TAG', tagEditId: id })
    }
}

export default connect(null, mapDispatchToProps)(TagItem);