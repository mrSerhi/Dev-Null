const express = require("express");
const router = express.Router();

// @route full: /api/users/test
// @access: Public
// @desc:  Test Users route
router.get("/test", (req, res) => {
  res.json({ msg: "Users route is available" });
});

module.exports = router;
