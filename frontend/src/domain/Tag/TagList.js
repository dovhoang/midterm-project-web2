import React, { useState, useEffect } from 'react'
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import TagItem from './TagItem'
import InputTag from './InputTag'
import { getTagsListByBoardId } from './apiTag'
import { connect } from 'react-redux'

const TagList = ({ type, boardId, tagEditId, openInput, tagAddType, createdTag, updatedTag, deletedTag, resetUpdateData }) => {
    const [list, setList] = useState([])

    const handleButtonClick = () => {
        openInput(type);
    }
    const listTagName = () => {
        if (type === 0) return 'WENT WELL';
        else if (type === 1) return "TO IMPROVE";
        return 'ACTION ITEMS';
    }

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

    const getList = () => {
        getTagsListByBoardId(boardId, type).then(res => {
            setList(res.data)
        })
    }

    useEffect(() => {
        getList();
    }, [])


    useEffect(() => {
        console.log(updatedTag)
        if (createdTag) {
            if (createdTag.type === type)
                setList([...list, createdTag]);
        }

        if (updatedTag) {
            setList(list.map(item => {
                if (item._id === updatedTag._id) {
                    return updatedTag;
                }
                return item;
            }));
        }
        if (deletedTag) {
            console.log("delete")
            setList(list.filter(item => item._id !== deletedTag._id));
        }

    }, [createdTag, updatedTag, deletedTag])

    useEffect(() => {
        resetUpdateData()
    }, [list])

    return (

        <div className="col-lg-4 col-md-6 col-sm-12 mt-3">
            {console.log(list)}
            <h5 style={{ color: bColor(), fontWeight: 'bold' }}>{listTagName()}</h5>
            <Button style={{ width: '100%' }} onClick={handleButtonClick}>
                <PlusOutlined />
            </Button>
            <div>
                {list.map((tag) => {
                    if (tagEditId !== tag._id) {
                        return <TagItem color={bColor()} item={tag} key={tag._id} />
                    } else {
                        return <InputTag color={bColor()} item={tag} key={tag._id} />
                    }
                })}
            </div>
            {tagAddType === type && <InputTag color={bColor()} type={type} />}
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        tagEditId: state.tag.tagEditId,
        tagAddType: state.tag.tagAddType,
        createdTag: state.tag.createdTag,
        updatedTag: state.tag.updatedTag,
        deletedTag: state.tag.deletedTag,
    }
}

const mapDispatchToProps = (dispatch) => ({
    openInput: (type) => dispatch({ type: 'OPEN_CREATE_TAG', tagAddType: type }),
    resetUpdateData: () => dispatch({ type: 'RESET_UPDATE_DATA' })
})


export default connect(mapStateToProps, mapDispatchToProps)(TagList);
