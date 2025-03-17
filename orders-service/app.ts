import express, {Request, Response} from "express";
import mongoose, {Schema, Document} from "mongoose";
import OrderModel from "./db/Order";
import dotenv from "dotenv";

const app = express();
const port: number = 3000;

dotenv.config();
app.use(express.json());


app.get("/", (req: Request, res: Response) => {
    res.send("Hello World!");
});

app.get("/orders", async (req: Request, res: Response) => {
    try {
        const orders = await OrderModel.find();
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({error: "Error getting orders"});
    }
});

app.post("/orders", async (req: Request, res: Response) => {
    try {
        const newOrder = new OrderModel({
            commandNumber: Math.random().toString(36).substring(7),
        });

        await newOrder.save();
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
});

const server = app.listen(port, async () => {
    const mongoURI = process.env.MONGO_URI; // Update with your MongoDB URI
    console.log(mongoURI);
    try {
        await mongoose.connect(mongoURI);
    } catch (err) {
        console.error(err);
    }
    console.log(`Listening on port ${port}`);
});