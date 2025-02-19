import express, {Request, Response} from "express";
import dotenv from "dotenv";
import OrdersRouter from "./services/orders/orders.routes";

// configures dotenv to work in your application
dotenv.config();
const app = express();

const PORT = process.env.PORT;

app.get("/", (request: Request, response: Response) => {
    response.status(200).send("Hello World");
});

app.use("/orders", OrdersRouter);

app.listen(PORT, () => {
    console.log("Server running at PORTE: ", PORT);
}).on("error", (error) => {
    // gracefully handle error
    throw new Error(error.message);
});