const express = require('express');
const router = express.Router();
const { createBoard, getBoardsByUserId, deleteBoard, boardById, editNameBoard,
getBoardById} = require('../controllers/boardController')
const { userById } = require('../controllers/userController')
const { requireSignin } = require('../controllers/authController')

router.get('/:userId/boards', getBoardsByUserId);
router.post('/board/create', createBoard);
router.get('/board/:boardId', getBoardById)
router.delete('/board/:boardId/delete', deleteBoard);
router.put('/board/:boardId/update', editNameBoard);


router.param("userId", userById);
router.param("boardId", boardById);
module.exports = router;