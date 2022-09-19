const router = require('express').Router();

const {
    getAllThought,
    getThoughtById, 
    createThought, 
    updateThought, 
    deleteThought, 
    createReaction,
    deleteReaction
} = require('../../controllers/thought-controller'); 

// GET all and POST at /api/thoughts
router
  .route('/')
  .get(getAllThought)
  .post(createThought);

// GET one, PUT, and DELETE at /api/thoughts/:thoughtid
router
  .route('/:thoughtId')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

// POST and DELETE at /api/thoughts/:thoughtID/reactions
router
  .route('/:thoughtId/reactions')
  .post(createReaction)
  .delete(deleteReaction); 

module.exports = router;