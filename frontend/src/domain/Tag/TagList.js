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

    return (
        <div className="col-lg-4 col-md-6 col-sm-12">
            <Button style={{ width: '100%' }} onClick={handleButtonClick}>
                <PlusOutlined />
            </Button>
            <div>
                {list.map((tag) => {
                    if (tagEditId !== tag._id) {
                        return <TagItem type={type} item={tag} key={tag._id} />
                    } else {
                        return <InputTag item={tag} key={tag._id} />
                    }
                })}
            </div>
            {tagAddType === type && <InputTag type={type} />}
        </div>
    );
}
const mapStateToProps = (state) => {
    return {
        tagEditId: state.tagEditId,
        tagAddType: state.tagAddType
    }
}

const mapDispatchToProps = (dispatch) => ({
    openInput: (type) => dispatch({ type: 'OPEN_INPUT_ADD', tagAddType: type })
})


export default connect(mapStateToProps, mapDispatchToProps)(TagList);
