const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./router/main_router");
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
app.use(router);

app.listen(PORT, () => {
  console.log("listen 5000");
});
