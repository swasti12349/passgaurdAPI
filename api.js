const exp = require("express");
const mong = require("mongoose");
const body = require("body-parser");

const app = exp();

app.use(body.urlencoded({ extended: true }));

// mong.connect("mongodb+srv://swasti12349:%40Swasti123456@cluster0.ydwaf.mongodb.net/apidb", {useNewUrlParser:true});
// mongo
const users = mong.createConnection(
  "mongodb+srv://swasti12349:%40Swasti123456@cluster0.ydwaf.mongodb.net/apidb"
);
// const data = mong.createConnection('mongodb+srv://swasti12349:%40Swasti123456@cluster0.ydwaf.mongodb.net/dataDB');

const datamdel = null;

const schema = {
  name: String,
  email: String,
  password: String,
};

const dataschema = {
  title: String,
  password: String,
};

const mdel = users.model("User", schema);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/users", (req, res) => {
  mdel.find((err, found) => {
    if (err) {
      console.log(err);
    } else {
      res.send(found);
    }
  });
});

app.get("/data", (req, res) => {
  datamdel.find((err, found) => {
    if (err) {
      console.log(err);
    } else {
      res.send(found);
    }
  });
});

app.post("/users", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;

  const m = new mdel({
    name: name,
    email: email,
    password: password,
  });
  m.save();
  res.send("Registered");
  datamdel = users.model("A" +  email, dataschema);
});

app.post("/data", (req, res) => {
  const title = req.body.title;
  const password = req.body.password;
  const email = req.body.email;

  datamdel = users.model(email, dataschema);
  const m = new datamdel({
    title: title,
    password: password,
  });
  m.save();
  console.log(m);
  res.send("Data is saved successfully");
});


app.listen(process.env.PORT || 3000, () => {
  console.log("Server started");
});
