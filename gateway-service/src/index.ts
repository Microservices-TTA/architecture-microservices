import dotenv from "dotenv";
import express, { Request, Response } from "express";
import OrdersRouter from "./services/orders/orders.routes";
import bodyParser from "body-parser";
import {
  AMQPService,
  AMQPServiceAsync,
} from "./lib/message-broker/MessageBrokerService";
import amqp from "amqplib/callback_api.js";
import AuthRouter from "./services/auth/auth.routes";

// configures dotenv to work in your application
dotenv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT;

app.get("/", (request: Request, response: Response) => {
  response.status(200).send("Hello World!");
});

app.use("/orders", OrdersRouter);

app.use("/auth", AuthRouter);

const AMQPServicePromises = new AMQPServiceAsync();

app
  .listen(PORT, async () => {
    console.log("Server running at PORT: ", PORT);

    await AMQPServicePromises.connect();

    await AMQPServicePromises.consume("debug-all-orders");
  })
  .on("error", (error) => {
    throw new Error(error.message);
  })
  .on("close", async () => {});
