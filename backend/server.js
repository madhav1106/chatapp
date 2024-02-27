import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from './routes/auth.route.js';
import messagesRoutes from './routes/message.route.js';
import usersRoutes from './routes/user.route.js';

import connectDb from "./db/connect.js";
import {app, server} from './socket/socket.js';

const port = process.env.PORT || 5000;

dotenv.config({});

app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/users', usersRoutes);

server.listen(port, () => {
    connectDb();
    console.log(`server running on port ${port}`)
});