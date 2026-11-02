import express  from 'express';
const port = 5000;

const app = express();

app.listen(port,(req,res)=>{
    console.log("Server is listening on port 5000")
})

app.get("/",(req,res)=>{
    res.send(`server is run`)
})