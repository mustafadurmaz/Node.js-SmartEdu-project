const express = require("express");
const mongoose = require("mongoose");
const pageRoute = require("./routes/pageRoute");

const app = express();

//Connect DB
mongoose.connect("mongodb://localhost/smartedu-db").then(() => {
  console.log("DB bağlantısı yapıldı");
});

//Template Engine
app.set("view engine", "ejs");

//Middlewares
app.use(express.static("public"));

//Routes

app.use("/", pageRoute);

const port = 3000;

app.listen(port, () => {
  console.log(`Sunucu ${port} nolu port'da başlatıldı`);
});
