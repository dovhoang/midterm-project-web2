import React from 'react'
import { Card, Button, message } from 'antd';
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom'
import { formatTime } from '../../services'
import { CopyOutlined, ClockCircleOutlined, DeleteOutlined } from '@ant-design/icons'
import { deleteBoard } from './apiBoard'
import { isAuthenticate } from '../Auth/apiAuth'
import { connect } from 'react-redux'
import { CopyToClipboard } from 'react-copy-to-clipboard';

const BoardItem = ({ board, deletedBoard }) => {
    const token = isAuthenticate();

    const handleDeleteBoard = () => {
        deleteBoard(board._id, token)
            .then(res => {
                console.log(res.data);
                deletedBoard();
            })
            .catch(error => {
                console.log(error.response.data)
            })
    }

    const key = 'updatable';
    const handleClickCopyURL = () => {
        message.loading({ content: 'Loading...', key });
        setTimeout(() => {
            message.success({ content: 'Board \'s URL is copied!', key, duration: 2 });
        }, 1000);
    };

    return (
        <div className="col-lg-3 col-md-4 col-sm-6 d-flex justify-content-center mt-3">
            <Card bordered={true} style={{ width: 250 }}>
                <Link to={`/board/${board._id}`}>
                    <h6>{board.name}</h6>
                </Link>
                <hr />
                <div className='d-flex justify-content-between'>
                    <div className='d-flex align-items-center'> <ClockCircleOutlined className='mr-1' />{formatTime(board.createdAt)}</div>
                    <div>2 card</div>
                </div>
                <hr />
                <div className="footer" style={{ marginBottom: '-15px' }}>
                    <CopyToClipboard text={`http://localhost:3000/board/${board._id}`}>
                        <Button type="dashed" icon={<CopyOutlined />}
                            onClick={handleClickCopyURL}>
                            URL
                    </Button>
                    </CopyToClipboard>
                    <Button type="dashed" icon={<DeleteOutlined />}
                        onClick={handleDeleteBoard}>
                        DELETE
                    </Button>
                </div>
            </Card>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => ({
    deletedBoard: () => dispatch({ type: 'DELETE_BOARD' })
})

export default connect(null, mapDispatchToProps)(BoardItem);