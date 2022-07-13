import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import morgan from "morgan";
import cors from "cors";

import { createUsersRoutes } from "./UsersRoutes"

async function exportApp() {
  const app = express();
  app.use(morgan("dev"));
  app.use(cors());
  app.use(express.json());
  app.use(createUsersRoutes());
  app.use(
    // eslint-disable-next-line no-unused-vars
    (err: Error, request: Request, response: Response, next: NextFunction) => {
      if (err instanceof Error) {
        return response.status(400).json({
          error: err.message,
        });
      }

      return response.status(500).json({
        status: "error",
        message: "Internal Server Error",
      });
    }
  );

  return app;
}

export { exportApp };
