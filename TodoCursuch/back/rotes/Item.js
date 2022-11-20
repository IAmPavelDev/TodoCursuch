const Router = require('express');
const { create, edit, deleteItem, get } = require('./../controllers/ItemController');
const router = new Router();
const auth = require("./../middleware/authMiddleware");
const role = require("./../middleware/roleMiddleware");

router.post('/create', auth, role, create);
router.post('/edit', auth, role, edit);
router.post('/delete', auth, role, deleteItem);
router.get('/', auth, get);

module.exports = router;