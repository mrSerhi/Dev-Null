const express = require("express");
const router = express.Router();

// @route full: /api/profile/test
// @access: Public
// @desc:  Test Profile route
router.get("/test", (req, res) => {
  res.json({ msg: "Profile route is available" });
});

module.exports = router;
