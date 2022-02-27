const { Thought } = require('../models');

const thoughtController = {
    
    // Get all thoughts
    getAllThoughts(req, res) {
    Thought.find({})
        .populate({ path: 'reactions', select: '-__v' })
        .select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // Get one thought by id
    getThoughtbyId(req, res) {
    Thought.findOne({ _id: req.params.id })
        .populate({ path: 'reactions', select: '-__v' })
        .select('-__v')
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // Create thought
    createThought(req, res) {
    Thought.create(req.body)
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // update thought by id
    updateThought(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { new: true, runValidators: true }
    )
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // Delete a thought by ID
    deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.id })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    
    // Add reaction
    addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $addToSet: { reactions: body } },
        { new: true, runValidators: true })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    },

    // Delete reaction
    deleteReaction({ params, body}, res) {
    Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $pull: { reactions: { reactionId: body.reactionId }}},
        { new: true, runValidators: true })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    }
};


module.exports = thoughtController; 