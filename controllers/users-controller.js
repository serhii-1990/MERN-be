const HttpError = require("../model/http-error");
const { v4: uuidv4 } = require("uuid");
const { validationResult } = require("express-validator");

let DUMMY_USERS = [
  {
    id: "u1",
    name: "John",
    email: "johndoe@mail.com",
    password: "userPass",
  },
  {
    id: "u2",
    name: "Jack",
    email: "jackdoe@mail.com",
    password: "userPass",
  },
  {
    id: "u3",
    name: "Jane",
    email: "janedoe@mail.com",
    password: "userPass",
  },
];

const getUsers = (req, res, next) => {
  res.status(200).json(DUMMY_USERS);
};

const signupUser = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new HttpError("Invalid inputs passed pleace check your data.", 422);
  }

  const { name, email, password } = req.body;

  const hasUser = DUMMY_USERS.find((u) => u.email === email);

  if (hasUser) {
    throw new HttpError("Could not create user, email already exists.", 422);
  }

  const createdUser = {
    id: uuidv4(),
    name: name,
    email: email,
    password: password,
  };

  DUMMY_USERS.push(createdUser);

  res.status(201).json({ user: createdUser });
};

const logIn = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find(
    (u) => u.email === email && u.password === password
  );

  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError(
      "Could not identified user, credentials seem to be wrong",
      401
    );
  }

  res.json({ message: "Logged in." });
};

exports.getUsers = getUsers;
exports.signupUser = signupUser;
exports.logIn = logIn;
