const express = require("express");
const env = require("dotenv").config().parsed;
const swagger = require("./router/swagger");
// const swaggerJsdoc = require("swagger-jsdoc");
// const swaggerUi = require("swagger-ui-express");
// const bodyParser = require("body-parser");
// const globalMiddleware = require("./middlewares/globalMiddleware");
const app = express();
// const port = 9000;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
// app.use(bodyParser.json());

if (env.NODE_ENV === "development") {
  app.use("/tugas-wahana", swagger);
}

// sanity check
// app.use(globalMiddleware());

// const swaggerOptions = {
//   definition: {
//     openapi: "3.0.0",
//     info: {
//       title: "Bootcamp Batch 4",
//       description: "Simple API Documentation for Bootcamp Batch 4",
//       contact: {
//         name: "Adam Alfiansyah",
//       },
//       servers: [`http://localhost:${port}`],
//     },
//   },
//   apis: ["src/router/*.js"],
// };

// const swaggerSpec = swaggerJsdoc(swaggerOptions);
// swaggerSpec.components = {
//   securitySchemes: {
//     bearerAuth: {
//       type: "http",
//       scheme: "bearer",
//       bearerFormat: "JWT",
//     },
//   },
// };

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const router = require("./router/router");
app.use("/", router);

app.listen(env.PORT, () => {
  console.log(`App listening at http://localhost:${env.PORT}`);
});
