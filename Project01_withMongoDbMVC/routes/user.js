const express = require("express");
const router = express.Router();
const {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser
} = require("../controllers/user");

//Routes

//hybrid request can use in various platforms like iot, browsers, mobiles etc
router
  .route("/")
  .get(handleGetAllUsers)
  .post(handleCreateNewUser);

router
  .route("/:id")
  .get(handleGetUserById)
  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);

module.exports = router;
