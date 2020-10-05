const mongoose = require("mongoose");
const express = require("express");
const app = express();

app.use(express.json());

mongoose
  .connect("mongodb://localhost/covid", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected !");
  })
  .catch((err) => console.log("could not connect"));

const Db = mongoose.model(
  "covid19",
  new mongoose.Schema({
    State: String,
    Confirmed: Number,
    Recovered: Number,
    Deaths: Number,
    Active: Number
  })
);

app.get("/api/allcases/", async (req, res) => {
  const found = await Db.find();
  res.send(found);
  console.log('found');
});

app.get("/api/allcases/:name", async (req, res) => {
    const state = req.params.name;
    const data = await Db.find({ State: { $eq: state } });
    res.send(data);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
