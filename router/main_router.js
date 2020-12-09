const express = require("express");
const router = express.Router();
const { getData, setData } = require("../modal/ss");

router.get("/api/userdata", (req, res) => {
  getData().then((data) => {
    res.json(data);
  });
});

router.post("/api/setuserdata", (req, res) => {
  const { name, email, password } = req.body;
  setData(name, email, password);
  res.json({
    message: "success",
    data: {
      name: name,
      email: email,
    },
  });
});

module.exports = router;
