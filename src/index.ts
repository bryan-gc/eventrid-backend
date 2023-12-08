import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as express from "express";
import * as swaggerUi from "swagger-ui-express";

import { ProjectEnv } from "../env";
import authRoutes from "./auth/routes/auth.route";
import { AppDataSource } from "./core/database/data-source";
import { errorHandlingMiddleware } from "./core/middlewares/error-handling.middleware";
import { swaggerSpec } from "./core/swagger.config";
import memesRoutes from "./memes/routes/memes.route";
import usersRoutes from "./users/routes/users.route";

AppDataSource.initialize()
  .then(async () => {
    const app = express();

    app.use(cors());
    app.use(bodyParser.json());

    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    app.get("/api-json", (req, res) => {
      res.setHeader("Content-Type", "application/json");
      res.send(swaggerSpec);
    });

    app.use("/api", authRoutes);
    app.use("/api", usersRoutes);
    app.use("/api", memesRoutes);

    app.use(errorHandlingMiddleware);

    app.listen(ProjectEnv.PORT);

    console.log(`Express server has started on port ${ProjectEnv.PORT}`);
  })
  .catch((error) => console.log(error));
