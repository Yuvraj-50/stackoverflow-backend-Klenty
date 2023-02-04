const express = require("express");
const router = express.Router();
const { verifyUser } = require("../controllers/isVerifyController");

router.get("/", verifyUser);

module.exports = router;
