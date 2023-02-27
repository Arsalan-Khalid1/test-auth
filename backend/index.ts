import express, { Express } from 'express';
const {connectDB} = require('./config/db')
const cookieParser = require('cookie-parser')
import cors from "cors";

const app: Express = express();
const port: Number = 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
connectDB()

app.use('/auth', require('./routes/authRoutes'))
app.use("*", (req, res) => {
    return res.json({success: false,
    errors: [{
        message: "This route does not exist"
    }]}).status(404)
})

app.listen(port, () => {
    console.log('app is listening at port ' + port)
})