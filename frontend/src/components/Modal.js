import React, { useState, useEffect } from 'react'
import { Modal as ModalAnt, Button, Input } from 'antd';
import { createBoard } from '../domain/Board/apiBoard'
import { isAuthenticate } from '../domain/Auth/apiAuth'
import { connect } from 'react-redux'

const Modal = ({ userId, visible, setInVisible, renderBoardsList }) => {
    const [boardName, setBoardName] = useState('');
    const [loading, setLoading] = useState(true)
    const token = isAuthenticate().token;
    const handleOk = e => {
        setLoading(true);
        createBoard({ user: userId, name: boardName }, token)
            .then(res => {
                console.log(res.data);
                setLoading(false);
                setInVisible()
                renderBoardsList()
            })


    };

    const handleCancel = e => {
        setInVisible()
    };
    const handleChange = (e) => {
        setBoardName(e.target.value);
    }

    return (
        <ModalAnt
            title="New board"
            visible={visible}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={[
                <Button key="back" onClick={handleCancel}>
                    Cancel
            </Button>,
                <Button key="submit" type="primary" onClick={handleOk}>
                    Create
            </Button>,
            ]}
        >
            <Input onChange={handleChange} />
        </ModalAnt>
    );
}

const mapStateToProps = (state) => ({
    visible: state.board.modalVisible,
})

const mapDispatchToProps = dispatch => ({
    setInVisible: () => dispatch({ type: 'MODAL_VISIBLE', status: false }),
    renderBoardsList: () => dispatch({ type: 'BOARD_LIST_CHANGE' })
})

export default connect(mapStateToProps, mapDispatchToProps)(Modal);

