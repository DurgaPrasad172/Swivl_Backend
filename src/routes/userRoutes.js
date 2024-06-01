const express = require('express');
const { createUser, getUsers, getUserPdf, deleteUser, updateUser } = require('../controllers/userController');
const validateUser = require('../middleware/validationMiddleware');

const router = express.Router();

router.post('/', validateUser, createUser);
router.get('/', getUsers);
router.get('/:id/pdf', getUserPdf);
router.delete('/:id', deleteUser);
router.put('/:id', validateUser, updateUser);

module.exports = router;
