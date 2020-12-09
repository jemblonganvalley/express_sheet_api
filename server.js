const express = require("express");
const cors = require("cors");
const app = express();
const { getData, setData } = require("./ss");

app.use(express.json());
app.use(cors());

app.get("/api/userdata", (req, res) => {
  getData().then((data) => res.json(data));
});

app.post("/api/setuserdata", (req, res) => {
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

app.listen(3000, () => {
  console.log("listen 3000");
});
