import dotenv from "dotenv";
import express, {Request, Response} from "express";
import OrdersRouter from "./services/orders/orders.routes";
import bodyParser from "body-parser";
import {AMQPService, AMQPServiceAsync} from "./lib/message-broker/MessageBrokerService";
import amqp from "amqplib/callback_api.js";

// configures dotenv to work in your application
dotenv.config();
const app = express();
app.use(bodyParser.json({limit: '50mb'}))


const PORT = process.env.PORT;

app.get("/", (request: Request, response: Response) => {
    response.status(200).send("Hello World");
});

app.use("/orders", OrdersRouter);

const AMQPServicePromises = new AMQPServiceAsync();

app.listen(PORT, async () => {
    console.log("Server running at PORT: ", PORT);

    await AMQPServicePromises.connect()

    await AMQPServicePromises.consume('debug-all-orders')
}).on("error", (error) => {
    throw new Error(error.message);
}).on("close", async () => {
});