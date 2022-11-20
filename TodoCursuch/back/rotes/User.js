const { Router } = require('express');
const auth = require('../middleware/authMiddleware');
const role = require('../middleware/roleMiddleware');
const { registration,
    login,
    getAll,
    changeAdminRoles,
    checkIsAuth } = require("./../controllers/UserController");

const router = new Router();

router.post('/registration', registration);
router.post('/login', login);
router.get('/getAll', auth, role, getAll);
router.post('/changeAdminRoles', auth, role, changeAdminRoles);
router.get("/checkIsAuth", auth, checkIsAuth);

module.exports = router;