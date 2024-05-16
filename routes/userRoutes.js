const express = require("express");
const router = express.Router();
const { validateToken } = require("../middleware/validateTokenHandler");
const {
  registerUser,
  loginUser,
  currentUser,
} = require("../controllers/userControllers");


router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current",validateToken, currentUser);

module.exports = router;
