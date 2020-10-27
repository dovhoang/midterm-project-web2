import React, { useState } from 'react'
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import TagItem from './TagItem'
import InputTag from './InputTag'

import { connect } from 'react-redux'

const TagList = ({ type, list, tagEditId, openInput, tagAddType }) => {



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

    return (
        <div className="col-lg-4 col-md-6 col-sm-12 mt-3">
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
        tagAddType: state.tag.tagAddType
    }
}

const mapDispatchToProps = (dispatch) => ({
    openInput: (type) => dispatch({ type: 'OPEN_INPUT_ADD', tagAddType: type })
})


export default connect(mapStateToProps, mapDispatchToProps)(TagList);
