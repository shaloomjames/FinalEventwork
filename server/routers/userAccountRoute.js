const express = require("express");
const router = express.Router();
// const upload = require("../config/multer");
const {createUserAccount, deleteUserAccount, getUserAccount, getSingleUserAccount, updateUserAccount} = require("../controller/userAccountController")
// Route to get all user accounts and create a new user account
router.route("/").get(getUserAccount).post(createUserAccount);                         

// Route to get, update, and delete a single user account by ID
// router.route("/:id").get().put().delete();
router.route("/:id").get(getSingleUserAccount).put(updateUserAccount).delete(deleteUserAccount);

module.exports = router;


