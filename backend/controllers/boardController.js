const Board = require('../models/boards');

exports.boardById = (req, res, next, id) => {
    Board.findById(id).exec((error, board) => {
        if (error || !board) {
            return res.status(400).json({ error: "Board not found" });
        }
        req.board = board;
        next();
    })
}

exports.getBoardById = (req, res) => {
    res.json(req.board);
}

exports.getBoardsByUserId = (req, res) => {

    Board.find({ user: req.user })
        .populate('user')
        .exec((error, boards) => {
            if (error || !boards) {
                return res.status(400).json({
                    error: 'boards not found!'
                })
            }
            res.json(boards)
        }
        )
}

exports.createBoard = async (req, res) => {
    const board = await new Board(req.body);
    board.save((error, board) => {
        if (error) {
            return res.status(400).json({ error });
        }
        res.json({ board });
    })
}

exports.deleteBoard = (req, res) => {
    const board = req.board;
    Board.findOneAndDelete({ _id: board._id }, (error, boardDelete) => {
        if (error) {
            return res.status(400).json(error);
        }
        res.json({
            message: `delete successfully`
        });
    })
}

exports.editNameBoard = (req, res) => {
    const boardName = req.body.name;
    const board = req.board;
    Board.findOneAndUpdate({ _id: board._id }, { name: boardName })
        .exec((error, board) => {
            if (error) {
                return res.status(400).json({ error });
            }
            res.json({ Message: `Board is updated!` })
        })
}

