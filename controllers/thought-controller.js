const { User, Thought } = require('../models');

const thoughtController = {
    getAllThought(req, res) {
        Thought.find({})
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err)); 
    }, 

    getThoughtById(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .select("-__v")
            .then((thought) => {
                if (!thought) {
                res.status(404).json({ message: '1-No thought found with this id!' });
                return;
                }
                res.json(thought);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    createThought(req, res) {
        Thought.create(req.body)
            .then(({ _id }) => {
            return User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thought: _id } },
                { new: true }
            );
            })
            .then((thought) => {
                if (!thought) {
                res.status(404).json({ message: '2-No thought found with this id!' });
                return;
            }
            res.json(thought);
            })
        .catch(err => res.json(err));
    }, 
    
    deleteThought(req, res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtId })
          .then(thought => {
            if (!thought) {
              return res.status(404).json({ message: '3-No thought with this id!' });
            }
            return User.findOneAndUpdate(
              { thoughts: req.params.thoughtId }, 
              { $pull: { thoughts: params.thoughtId } },
              { new: true }
            );
          })
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.json(err));
    }, 

    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, New: true }
        )
        .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.json(err));
    }
};

module.exports = thoughtController;