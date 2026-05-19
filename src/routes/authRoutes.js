const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/jwt", (req, res) => {
  const { uid, email, name, photoURL } = req.body;

  if (!uid || !email) {
    return res.status(400).json({ message: "UID and email are required." });
  }

  const token = jwt.sign(
    { uid, email, name: name || "", photoURL: photoURL || "" },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return res.json({ token });
});

module.exports = router;
