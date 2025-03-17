"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const Order_1 = __importDefault(require("./db/Order"));
const app = (0, express_1.default)();
const port = 3000;
app.use(express_1.default.json());
const mongoURI = "mongodb://root:pass@localhost:27017/orders-db?authSource=admin"; // Update with your MongoDB URI
mongoose_1.default.connect(mongoURI);
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.get("/orders", async (req, res) => {
    try {
        const orders = await Order_1.default.find();
        res.status(201).json(orders);
    }
    catch (error) {
        res.status(500).json({ error: "Error getting orders" });
    }
});
app.post("/orders", async (req, res) => {
    try {
        const newOrder = new Order_1.default({
            commandNumber: Math.random().toString(36).substring(7),
        });
        await newOrder.save();
        res.status(201).json(newOrder);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
//# sourceMappingURL=app.js.map