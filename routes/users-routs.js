const express = require("express");
const { check } = require("express-validator");

const usersController = require("../controllers/users-controller");

const router = express.Router();

router.get("/", usersController.getUsers);

router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").not().isEmpty().isEmail().normalizeEmail(),
    check("password").isLength({ min: 6 }),
  ],
  usersController.signupUser
);

router.post("/login", usersController.logIn);

module.exports = router;
