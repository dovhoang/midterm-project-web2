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

exports.getBoardsByUserId = (req, res) => {
    Board.find()
        .populate('user')
        .exec((error, boards) => {
            if (error || !boards) {
                return res.status(400).json({
                    error: 'user not found!'
                })
            }
            res.json({ boards })
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
    Board.findOneAndDelete({ board }, (error, boardDelete) => {
        if (error) {
            return res.status(400).json({
                error
            });
        }
        res.json({
            message: `${boardDelete.name} deleted successfully`
        });
    })
}

exports.editNameBoard = (req, res) => {
    const boardName = req.body.boardName;
    const board = req.board;
    Board.findOneAndUpdate({ board }, { name: boardName })
}

