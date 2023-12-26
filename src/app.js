import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';
import swagerDocument from '../docs/swagger.json' assert { type: 'json' };


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

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swagerDocument));

// routes
import userRouter from './routes/user.routes.js'
import questionRouter from './routes/question.routes.js'
import testRouter from './routes/test.routes.js'
import leaderboardRouter from './routes/leaderboard.routes.js'

// routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/questions", questionRouter);
app.use("/api/v1/tests", testRouter);
app.use("/api/v1/leaderboard", leaderboardRouter);


export { app }


