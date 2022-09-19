const router = require('express').Router();
const {
    getAllUser,
    getUserById, 
    createUser, 
    updateUser, 
    deleteUser, 
    addFriend, 
    deleteFriend
} = require('../../controllers/user-controller'); 

// Set up GET all and POST at /api/users
router
  .route('/')
  .get(getAllUser)
  .post(createUser);

// Set up GET one, PUT, and DELETE at /api/users/:id
router
  .route('/:userId')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

// Set up POST friend
router
  .route('/:userId/friends/:friendId')
  .post(addFriend)

//DELETE friend
router
  .route('/:userId/friends/:friendId')
  .delete(deleteFriend); 

module.exports = router;