const Tag = require('../models/tags');

exports.tagById = (req, res, next, id) => {
    Tag.findById(id).exec((error, tag) => {
        if (error || !tag) {
            return res.status(400).json({ error: "Tag not found" });
        }
        req.tag = tag;
        next();
    })
}

exports.createTag = async (req, res) => {
    const { _id } = req.board;
    const { content, type } = req.body;

    const tag = await new Tag({ board: _id, content: content, type: type });
    tag.save((error, tag) => {
        if (error) {
            return res.status(400).json({ error });
        }
        res.json({ tag });
    })
}

exports.getTagsByBoardId = (req, res) => {
    Tag.find({ board: req.board, type: req.query.type })
        .populate('board')
        .exec((error, tags) => {
            if (error || !tags) {
                return res.status(400).json({
                    error: 'tag list not found!'
                })
            }
            res.json(tags);
        })
}

exports.deleteTag = (req, res) => {
    const tag = req.tag;
    Tag.findOneAndDelete({ _id: tag._id }, (error, tagDelete) => {
        if (error) {
            return res.status(400).json({
                error
            });
        }
        res.json({
            message: `Tag deleted successfully`
        });
    })
}

exports.editTag = (req, res) => {
    const content = req.body.content;
    const tag = req.tag;
    Tag.findOneAndUpdate({ _id: tag._id }, { content: content })
        .exec((error, tag) => {
            if (error) {
                return res.status(400).json({ error });
            }
            res.json({ Message: `Tag is updated!` })
        })
}
exports.moveTag = (req, res) => {
    const tag = req.tag;
    const type = req.body.type
    Tag.findByIdAndUpdate({ _id: tag._id }, { type: type })
        .exec((error, tag) => {
            if (error) {
                return res.status(400).json({ error });
            }
            res.json({ message: "tag is moved!" })
        })
}

