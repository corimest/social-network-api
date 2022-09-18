const router = require('express').Router();
const { addThought, removeThought } = require('../../controllers/thought-controller');

const thoughtRoutes = require('./thought-routes');
const userRoutes = require('./user-routes');


router.route('/:userId').post(addThought);
router.route('/:userId/:thoughtId').delete(removeThought);

router.use('/thoughts', thoughtRoutes);
router.use('/users', userRoutes);


module.exports = router;