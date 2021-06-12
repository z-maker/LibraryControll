import * as swaggerUi from "swagger-ui-express";

import express, { Application } from "express";

import sequelize from "./database/database";

//Routes
import ApplicationRoutes from "./routes/Application/ApplicationRoutes";
import AccessTokenRoutes from "./routes/AccessToken/AccessTokenRoutes";

const app: Application = express();

const PORT = 3000;
const API_VERSION = "/api/v1";
const ADMIN = "/admin";

//Middleware
app.use(express.json());

const swaggerConfig = require("./doc/index.json");

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerConfig));

app.use("/api/v1/", ApplicationRoutes);

app.use("/api/v1/", AccessTokenRoutes);

app.listen(PORT, () => {
  console.log(`Application Running`);
  sequelize
    .sync({ force: false })
    .then(() => {
      console.log("Database connected");
    })
    .catch((error) => console.log(error));
});
