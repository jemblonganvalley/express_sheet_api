const express = require("express");
const router = express.Router();
const {
  getData,
  setData,
  editData,
  setComment,
  getComment,
  login,
} = require("../modal/ss");

//READ USER DATA
router.get("/api/userdata", (req, res) => {
  getData().then((data) => {
    res.json(data);
  });
});

//ADD DATA
router.post("/api/register", (req, res) => {
  const { name, email, password } = req.body;
  setData(name, email, password).then((data) => {
    if (data) {
      res.json({
        message: "success",
        data: {
          name: name,
          email: email,
        },
        next: true,
      });
      res.end();
    } else {
      res.status(404).json({
        message: "allready register.!",
        next: false,
      });
    }
  });
});

//EDIT DATA
router.post("/api/editdata", async (req, res) => {
  const { id, name, email, password } = await req.body;
  if (id) {
    editData(id, name, email, password);
    res.json({
      message: "success",
    });
  } else {
    res.json({
      message: "silakan isi ID",
    });
  }
});

//API SET COMMENT
router.post("/api/setcomment", async (req, res) => {
  const { comment_username, comment_body } = await req.body;
  if (comment_username) {
    setComment(comment_username, comment_body);
    res.json({
      message: "success",
      data: {
        comment_username: comment_username,
        comment_body: comment_body,
      },
    });
  } else {
    res.json({
      message: "silakan isi commentar",
    });
  }
});

//READ ALL COMMeNT
router.get("/api/comment", (req, res) => {
  getComment().then((data) => {
    res.json(data);
  });
});

//L O G I N
router.post("/api/login", async (req, res) => {
  const { email, password } = await req.body;
  login(email, password).then((data) => {
    if (data) {
      res.status(200).json({
        message: "success",
      });
    } else {
      res.status(404).json({
        message: "failed",
      });
    }
  });
});

module.exports = router;
