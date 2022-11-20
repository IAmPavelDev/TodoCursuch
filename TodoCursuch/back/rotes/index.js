const { Router } = require('express');
const User = require('./User');
const Item = require('./Item');

const router = new Router();

router.use('/user', User)
router.use('/item', Item)
module.exports = router;