const express = require('express');
const router = express.Router();

const { createTag } = require('../controllers/tagController');
const { userById } = require('../controllers/userController');
const { boardById } = require('../controllers/boardController')
const { tagById, getTagsByBoardId, deleteTag, editTag, moveTag } = require('../controllers/tagController')

router.post('/board/:boardId/tag/create', createTag);
router.get('/board/:boardId', getTagsByBoardId);
router.delete('/tag/:tagId/delete', deleteTag);
router.put('/tag/:tagId/update', editTag);
router.put('/tag/:tagId/move', moveTag);

router.param("boardId", boardById);
router.param("tagId", tagById);
router.param("userId", userById);
module.exports = router;

