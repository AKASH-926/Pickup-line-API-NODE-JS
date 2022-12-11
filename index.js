const express = require("express");
const mongoose = require("mongoose");
const bodyparser = require("body-parser");
const linesRouter = require("./routes/linesApi");
mongoose.connect(
  "mongodb+srv://AKASH:akashap@cluster0.hiv5i0f.mongodb.net/?retryWrites=true&w=majority",
  () => {
    console.log("connected to DB");
  }
);
const app = express();

app.use(bodyparser.json());
app.use("/pickuplines", linesRouter);

app.listen(3000, () => console.log("server up at 3000"));
