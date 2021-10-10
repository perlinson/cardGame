const express = require('express')
const mongoose = require('mongoose')
const bodyParser  = require('body-parser')
const authRouter = require('./routes/auth')
const app = express()

app.use(bodyParser.json());


app.use((req, res, next)=>{
   res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
})

console.log(process.env.NODE_ENV)
const uri  = `mongodb+srv://${process.env.MONGO_ALTA_USER}:${process.env.MONGO_ALTA_PWD}@cluster0.gysem.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
console.log(uri)
mongoose.connect( uri).then((result) =>{
  app.listen(process.env.PORT || 8080)
}).catch((err) => console.log(err));




app.use('/api/auth/',authRouter)