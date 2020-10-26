import React, { useState, useEffect } from 'react'
import BoardItem from './BoardItem'
import { API } from '../../config'
import axios from 'axios'
import { Button } from 'antd'
import { AppstoreAddOutlined } from '@ant-design/icons'
import { getBoardsListById } from './apiBoard'
import { isAuthenticate } from '../Auth/apiAuth'


const BoardList = () => {
    const [boardList, setBoardList] = useState([])
    const [error, setError] = useState('')

    const getBoardsList = () => {
        const jwt = isAuthenticate();
        console.log(jwt)
        if (jwt) {
            getBoardsListById(jwt.user._id)
                .then(res => {
                    setBoardList(res.data);
                    setError('');
                })
                .catch(error => {
                    setError(error.response.data.error)
                })
        }

    }

    useEffect(() => {
        getBoardsList();
    }, [])

    return (
        <div className="container">
            <div className="row d-flex justify-content-between m-3">
                <h4>MY BOARDS</h4>
                <Button type="primary" icon={<AppstoreAddOutlined />}>
                    Add board
                </Button>
            </div>
            <div className='row'>
                {!error && boardList.map((board, i) => (
                    <BoardItem key={i} board={board} />
                ))}
            </div>
        </div>

    );
}

export default BoardList;