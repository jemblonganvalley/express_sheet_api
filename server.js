const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./router/main_router");
const auth_middleware = require("./middleware/auth");

app.use(express.json());
app.use(cors());
app.use(auth_middleware);
app.use(router);

app.listen(5000, () => {
  console.log("listen 5000");
});
