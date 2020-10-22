const express = require('express');
const router = express.Router();
const { createBoard, getBoardsByUserId, deleteBoard, boardById, editNameBoard } = require('../controllers/boardController')
const { userById } = require('../controllers/userController')
const { requireSignin } = require('../controllers/authController')


router.post('/create/board', createBoard);
router.delete('/delete/board/:boardId', deleteBoard);
router.get('/:userId/boards', getBoardsByUserId);
router.put('/update/boards/:boardId', editNameBoard);


router.param("userId", userById);
router.param("boardId", boardById);
module.exports = router;