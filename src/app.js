import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
    credentials: true,
}))

app.use(express.json({
    limit: "16kb"
}))
app.use(express.urlencoded({
    extended: true, limit: "16kb"
}))
app.use(express.static("public"))
app.use(cookieParser())

// routes
import userRouter from './routes/user.routes.js'
import questionRouter from './routes/question.routes.js'

// routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/questions", questionRouter);


export { app }


