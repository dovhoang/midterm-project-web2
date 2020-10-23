const express = require('express');
const router = express.Router();
const { createBoard, getBoardsByUserId, deleteBoard, boardById, editNameBoard } = require('../controllers/boardController')
const { userById } = require('../controllers/userController')
const { requireSignin } = require('../controllers/authController')

router.get('/:userId/boards', getBoardsByUserId);
router.post('/create/board', createBoard);
router.delete('boards/delete/:boardId', deleteBoard);
router.put('/update/board/:boardId', editNameBoard);


router.param("userId", userById);
router.param("boardId", boardById);
module.exports = router;