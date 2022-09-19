const { User, Thought } = require('../models'); 

const userController = {
    //get all 
    getAllUser(req, res) {
        User.find({})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err); 
                res.status(400).json(err); 
            }); 
        }, 

    // get one by id
    getUserById(req, res) {
        User.findOne({ _id: req.params.userId })
            .populate("thoughts")
            .populate("friends")
            .select("-__v")
            .then((user) => {
            if (!user) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
            }
            res.json(user);
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    // create user
    createUser({ body }, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },

    // update user by id
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId }, 
            { $set: req.body }, 
            { runValidators: true, new: true })
        .then((user) => {
            if (!user) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
            }
            res.json(user);
        })
        .catch(err => res.status(400).json(err));
    },

    // delete a user
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params.userId })
        .then((user) =>
            !user
            ? res.status(404).json({ message: "No user found with this id!" })
            : Thought.deleteMany({ _id: { $in: user.thoughts } })
        )
        .then(() => res.json({ message: "User and Thought have been deleted!" }))
        .catch((err) => res.status(400).json(err));
    },

    //add a friend
    addFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { runValidators: true, new: true }
        )
        .then((user) =>
            !user
                ? res.status(404).json({ message: "No user found with this id!" })
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

  //delete a friend
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true }
        )
        .then(
            (user) =>
            !user
                ? res.status(404).json({ message: "No user found with this id!" })
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },
} 

module.exports = userController; 