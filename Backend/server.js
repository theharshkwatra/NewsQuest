import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Mongo connected"));


app.get('/', (req, res) => {
  res.send('hello world')
})


const port = process.env.PORT || 5000;
app.listen(port, () => console.log("Backend running on", port));