import express = require("express");
import { Request, Response } from "express-serve-static-core";
import { AppDataSource } from "./data-source";
import router from "./route";
import "dotenv/config";

AppDataSource.initialize()
  .then(async () => {
    const app = express();
    const port = 5000;

    let cors = require("cors");
    // console.log(req)

    app.use(cors());

    // const router = express.Router();

    app.use(express.json());
    app.use("/api/v1", router);
    app.use("/uploads", express.static("uploads"));

    app.get("/", (reg: Request, res: Response) => {
      res.send("hello world!");
    });

    app.listen(port, () => {
      console.log(`server running on http://localhost:${port}`);
    });
  })
  .catch((error) => console.log(error));
