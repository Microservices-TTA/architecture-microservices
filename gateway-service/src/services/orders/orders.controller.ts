import {Request, RequestHandler, Response} from "express";

const ORDERS_SERVICE_URL = process.env.ORDERS_SERVICE_URL;

export const getAllOrders: RequestHandler = async (req, res) => {
    const result = await fetch(`${ORDERS_SERVICE_URL}/orders`)

    if (!result.ok) {
        res.status(500).send();
    }

    res.send("All orders")
}

export const getOrderById: RequestHandler = async (req, res) => {
    if(!ORDERS_SERVICE_URL) res.status(500).send("Unable to connect to Orders Service");

    const result = await fetch(`${ORDERS_SERVICE_URL}/orders/${req.params.id}`)

    switch (result.status) {
        case 200:
            res.json(await result.json()).send("Request with id");
            break
        case 404:
            res.status(404).send(`Order not found`);
            break;
        default:
            res.status(500).send("Unexpected server error");
            break;
    }
}