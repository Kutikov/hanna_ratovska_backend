"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const services_1 = require("../services/services");
const router = (0, express_1.Router)();
// Route for getting all users
router.get('/', services_1.getAllUsers);
// Route for getting a user by id
router.get('/:id', services_1.getUser);
// Route for adding a new user
router.put('/', services_1.addUser);
// Route for updating a user by id (patching)
router.patch('/settings/:id', services_1.setUser);
// Route for deleting a user by id
router.delete('/:id', services_1.deleteUser);
exports.default = router;
