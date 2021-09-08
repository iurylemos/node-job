import "dotenv/config";
import express from "express";
import { ExpressAdapter } from "@bull-board/express";
import { createBullBoard } from "@bull-board/api";
const { BullAdapter } = require("@bull-board/api/bullAdapter");
import UserController from "./app/controllers/UserController";
import QueueLib from "./app/lib/Queue";

const serverAdapter = new ExpressAdapter();

const app = express();

createBullBoard({
  queues: QueueLib.queues.map((queue) => new BullAdapter(queue.bull)),
  serverAdapter: serverAdapter,
});

serverAdapter.setBasePath("/admin/queues");

app.use(express.json());

app.post("/users", UserController.store);

app.use("/admin/queues", serverAdapter.getRouter());

app.listen(3333, () => {
  console.log("Server running on localhost:3333");
});
