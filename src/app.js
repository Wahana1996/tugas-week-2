const express = require("express");
// const bodyParser = require("body-parser");
// const globalMiddleware = require("./middlewares/globalMiddleware");
const app = express();
const port = 9000;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// sanity check
// app.use(globalMiddleware());

const router = require("./router/router");
app.use("/", router);

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
