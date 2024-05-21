const express = require("express");
const router = express.Router();
const env = require("dotenv").config().parsed;
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Bootcamp Batch 4",
      description: "Simple API Documentation for Bootcamp Batch 4",
      contact: {
        name: "Adam Alfiansyah",
      },
      servers: [`http://localhost:${env.PORT}`],
    },
  },
  apis: ["./src/router/*.js"],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
swaggerSpec.components = {
  securitySchemes: {
    bearerAuth: {
      type: "http",
      scheme: "bearer",
      bearerFormat: "JWT",
    },
  },
};

router.use("/", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = router;
