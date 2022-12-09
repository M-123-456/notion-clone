import Memo from '../models/memo.js';

const create = async (req, res) => {
    try {
        const memoCount = await Memo.find().count();
        // create a new memo
        const memo = await Memo.create({
            user: req.user._id,
            position: memoCount > 0 ? memoCount : 0,
        });
        res.status(201).json(memo);
    } catch (err) {
        res.status(500).json(err);
    }
};

const getAll = async (req, res) => {
    try {
        const memos = await Memo.find({ user: req.user._id }).sort('-position');
        res.status(200).json(memos);
    } catch (err) {
        res.status(500).json(err);
    }
};

const getOne = async (req, res) => {
    const memoId = req.params.memoId;
    try {
        const memo = await Memo.findOne({ user: req.user._id, _id: memoId });
        if (!memo) return res.status(404).json('Cannot find memo');
        res.status(200).json(memo);
    } catch (err) {
        res.status(500).json(err);
    }
};

const update = async (req, res) => {
    const memoId = req.params.memoId;
    const { title, description } = req.body;
    try {
        if (title === "") req.body.title = "No Title";
        if (description === "") req.body.description = "Input your memo..."

        const memo = await Memo.findOne({ user: req.user._id, _id: memoId });
        if (!memo) return res.status(404).json('Cannot find memo');

        const updatedMemo = await Memo.findByIdAndUpdate(memoId, {
            $set: req.body
        })
        res.status(200).json(updatedMemo);
    } catch (err) {
        res.status(500).json(err);
    }
};

const deleteOne = async (req, res) => {
    const memoId = req.params.memoId;
    console.log(memoId);
    try {
        const memo = await Memo.findOne({ user: req.user._id, _id: memoId });
        if (!memo) return res.status(404).json('Cannot find memo');

        const deletedMemo = await Memo.deleteOne({ "_id": memoId });

        const newMemos = await Memo.find({});
        res.status(200).json(newMemos);
    } catch (err) {
        res.status(500).json(err);
    }
};


export { create, getAll, getOne, update, deleteOne }; 