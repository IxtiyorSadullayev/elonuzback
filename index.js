const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());


// db
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://localhost/testdbnew')
    .then(()=> console.log('bazaga boglandi'))
    .catch(err => console.log(`Bazaga boglanmadi sababi : ${err.message}`))


// routes


app.use('/user', require('./routers/user'));
app.use('/elon', require('./routers/elon'));
app.use((req,res,next) =>{

    const error = new Error('Bunday sahifa mavjud emas.');
    const natija = {
        message: 'Bunday sahifa mavjud emas.',
        error: "Noto'g'ri manzil ",
        status: 400
    }

    next(natija);
})

app.use((err,req,res,next) =>{
    res.status(err.status).json(err);
})


app.listen(process.env.PORT, ()=>{
    console.log(`Server started on port ${process.env.PORT}`)
})