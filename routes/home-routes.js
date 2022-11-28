const router = require('express').Router();
const path = require('path');
const { resourceLimits } = require('worker_threads');

//need to update
router.get('/', (reg,res) => res.send(`Express routes working.`))

module.exports = router;