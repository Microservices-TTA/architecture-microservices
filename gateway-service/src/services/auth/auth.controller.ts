import {RequestHandler} from "express";

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL;

export const signUpController: RequestHandler = async (req, res) => {
    const {name} = req.body

    const result = await fetch(`${AUTH_SERVICE_URL}/signup`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: name
        })
    })

    if (result.status === 400) {
        res.status(400).send("Name is needed");
        return
    }

    res.json(await result.json())
}

export const signInController: RequestHandler = async (req, res) => {
    const {name} = req.body

    const result = await fetch(`${AUTH_SERVICE_URL}/signin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: name
        })
    })

    if (!result.ok) {
        res.status(500).send();
    }

    const json = await result.json()

    res.json({token: json.token})
}

export const signOutController: RequestHandler = async (req, res) => {
    const {name} = req.body

    const result = await fetch(`${AUTH_SERVICE_URL}/signout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: name
        })
    })

    if (!result.ok) {
        res.status(500).send();
    }

    res.send("User successfully logged out")
}

export const verifyController: RequestHandler = async (req, res) => {
    const result = await fetch(`${AUTH_SERVICE_URL}/verify`, {
        method: "POST",
        headers: {
            "Authorization": req.headers.authorization as string
        }
    })

    if (result.status === 401) {
        res.status(401).send("Unauthorized");
        return;
    }

    res.status(201).send("User is logged in")
}

export const meController: RequestHandler = async (req, res) => {
    const result = await fetch(`${AUTH_SERVICE_URL}/me`, {
        headers: {
            "Authorization": req.headers.authorization as string
        }
    })

    if (result.status === 401) {
        res.status(401).send("Unauthorized");
        return;
    }

    const json = await result.json()

    res.status(201).json(json.user)
}