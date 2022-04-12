const connectToMongo = require("./db.js");
const express = require('express');
const cors = require('cors');
const Notes = require("./models/Notes.js");


connectToMongo();


const app = express()
const port = 5000

app.use(express.json());
app.use(cors());

app.use('/api/auth',require("./routes/auth"));
app.use('/api/notes',require("./routes/notes"));


app.get('/test',(req,res)=>{
  res.send("Successful");
})


app.listen(port, () => {
  console.log(`Cloud Notes(Backend) listening on port ${port}`)
})


