import React, { useState, useEffect } from 'react'
import TagList from '../Tag/TagList'
import { getTagsListByBoardId } from '../Tag/apiTag'
import { connect } from 'react-redux'

const SingleBoard = (props) => {
    const [wentWell, setWentWell] = useState([]);
    const [toImprove, setToImprove] = useState([]);
    const [actionItems, setActionItems] = useState([]);
    const [error, setError] = useState('');

    const id = props.match.params.boardId;


    const getWentWellTagsList = () => {
        getTagsListByBoardId(id, 0)
            .then(res => {
                setWentWell(res.data);
            })
            .catch(error => {
                setError(error.response.data.error);
            })
    }

    const getToImpoveTagsList = () => {
        getTagsListByBoardId(id, 1)
            .then(res => {
                setToImprove(res.data);
            })
            .catch(error => {
                setError(error.response.data.error);
            })
    }

    const getActionItemsTagsList = () => {
        getTagsListByBoardId(id, 2)
            .then(res => {
                setActionItems(res.data);
            })
            .catch(error => {
                setError(error.response.data.error);
            })
    }

    useEffect(() => {
        props.setBoardId(id);
        getWentWellTagsList();
        getToImpoveTagsList();
        getActionItemsTagsList();
    }, [props.renderBoard])
    return (
        <div className="row">

            <TagList key={1} type={0} list={wentWell} />
            <TagList key={2} type={1} list={toImprove} />
            <TagList key={3} type={2} list={actionItems} />

        </div>
    );
}

const mapStateToProps = (state) => {
    return { renderBoard: state.renderBoard }
}
const mapDispatchToProps = (dispatch) => ({
    setBoardId: (id) => {
        return dispatch({ type: 'CURRENT_BOARD', boardId: id })
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleBoard);