const express = require("express");
const router = express.Router();
const {
  getData,
  setData,
  editData,
  setComment,
  getComment,
} = require("../modal/ss");

//READ USER DATA
router.get("/api/userdata", (req, res) => {
  getData().then((data) => {
    res.json(data);
  });
});

//ADD DATA
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

//READ USER DATA
router.post("/api/comment", (req, res) => {
  getComment().then((data) => {
    res.json(data);
  });
});

module.exports = router;
