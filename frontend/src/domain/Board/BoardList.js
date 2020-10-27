import React, { useState, useEffect } from 'react'
import BoardItem from './BoardItem'
import { API } from '../../config'
import axios from 'axios'
import { Button } from 'antd'
import { AppstoreAddOutlined } from '@ant-design/icons'
import { getBoardsListByUserId } from './apiBoard'
import { isAuthenticate } from '../Auth/apiAuth'
import Modal from '../../components/Modal'
import { connect } from 'react-redux'


const BoardList = ({ modalVisible, setModalVisible, renderBoardsList }) => {
    const [boardList, setBoardList] = useState([])
    const [error, setError] = useState('');
    const userId = isAuthenticate() ? isAuthenticate().user._id : undefined;

    const getBoardsList = () => {
        const jwt = isAuthenticate();
        console.log(jwt)
        if (jwt) {
            getBoardsListByUserId(jwt.user._id)
                .then(res => {
                    setBoardList(res.data);
                    setError('');
                })
                .catch(error => {
                    setError(error.response.data.error)
                })
        }

    }
    const handleClickCreate = () => {
        setModalVisible()
    }

    useEffect(() => {
        getBoardsList();
    }, [renderBoardsList])

    return (
        <div className="container">
            <div className="row d-flex justify-content-between m-3">
                <h4>MY BOARDS</h4>
                <Button type="primary" icon={<AppstoreAddOutlined />}
                    onClick={handleClickCreate}>
                    Add board
                </Button>
            </div>
            <div className='row'>
                {!error && boardList.map((board, i) => (
                    <BoardItem key={i} board={board} />
                ))}
            </div>
            <Modal userId={userId} />
        </div>

    );
}

const mapStateToProps = state => ({
    modalVisible: state.board.modalVisible,
    renderBoardsList: state.board.renderBoardsList
})

const mapDispatchToProps = dispatch => ({
    setModalVisible: () => dispatch({ type: 'MODAL_VISIBLE', status: true })
})


export default connect(mapStateToProps, mapDispatchToProps)(BoardList);