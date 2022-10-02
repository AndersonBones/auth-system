import express,{Request, Response} from 'express'
import dotenv from 'dotenv'
import path from 'path';
import {connectDB} from './db/connectDB'
import Api from './routes/api'
import cookieParser from 'cookie-parser'


dotenv.config();
const app = express();

app.use(express.static(path.join(__dirname,'../public')))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

connectDB();
app.use(cookieParser())

app.use(Api)

app.use((req:Request, res:Response)=>{
    res.status(404).json({error:"Página não encontrada"})
})

app.listen(process.env.PORT)
