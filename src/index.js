import express from 'express';
import route from './routes/route.js';

const app = express();
app.use(express.json());


app.use('/',route);

const port = process.env.PORT ||  3000;

app.listen(port,()=>{
    console.log(`Server is running on port : ${port}`)
});