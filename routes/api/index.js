const router = require('express').Router();
const userRoutes = require('./user-routes');
const thoughtsRoutes = require('./thought-routes');
const relateRoutes = require('./relate-routes');

router.use('/user', userRoutes);
router.use('/thoughts', thoughtsRoutes);
router.use('/relate', relateRoutes);

module.exports = router;
