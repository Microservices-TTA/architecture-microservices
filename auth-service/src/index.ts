import express from 'express'
import {createSession, generateSessionToken, invalidateAllSessions, validateSessionToken} from "./lucia-auth.js";
import {PrismaClient, User} from "@prisma/client";

const app = express()
const port = 3000

app.use(express.json());
const prisma = new PrismaClient();

app.post('/signup', async (req, res) => {

    if(!req.body.name) {
        res.status(400).send('Name is required')
        return;
    }

    const user : User = await prisma.user.create({
        data: {
            name: req.body.name,
        }
    });

    res.send(user);
})

app.post('/signin', async (req, res) => {
    if(!req.body.name) {
        res.status(400).send('Name is required')
        return;
    }

    const user : User | null = await prisma.user.findUnique({
        where: {
            name: req.body.name
        }
    });

    if(user === null) {
        res.status(404).send('User not found')
        return;
    }
    const token = generateSessionToken();
    const session = await createSession(token, user.id);
    if(session === null) {
        res.status(500).send('Session creation failed')
        return;
    }
    res.send(token);
})

app.post('/signout', async (req, res) => {
    if(!req.body.name) {
        res.status(400).send('Name is required')
        return;
    }

    const user : User | null = await prisma.user.findUnique({
        where: {
            name: req.body.name
        }
    });

    if(user === null) {
        res.status(404).send('User not found')
        return;
    }

    await invalidateAllSessions(user.id);

    res.send('Signout successful');
})

app.post('/verify', async (req, res) => {
    if(!req.headers.authorization) {
        res.status(401).send('Authorization header is required')
        return;
    }

    const token = req.headers.authorization.split(' ')[1];



    const result = await validateSessionToken(token);

    if(result.session === null) {
        res.status(401).send('Invalid token')
        return;
    }

    res.status(201).send('success');
})

app.get('/refresh', async (req, res) => {
    console.log('Request received')
    res.send('Refresh')
})

app.get('/me', async (req, res) => {
    if(!req.headers.authorization) {
        res.status(401).send('Authorization header is required')
        return;
    }

    const token = req.headers.authorization.split(' ')[1];


    const result = await validateSessionToken(token);
    if(result.session === null) {
        res.status(401).send('Invalid token')
        return;
    }

    res.send(result.user);
})



app.listen(port, () => {
    console.log(`auth-service listening on port ${port}`)
})

