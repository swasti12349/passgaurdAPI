const exp = require("express");
const mong = require("mongoose");
const body = require("body-parser");

const app = exp();

app.use(body.urlencoded({ extended: true }));

mong.connect("mongodb://localhost:27017/kop", {
  useNewUrlParser: true,
});

const users = mong.createConnection(
  "mongodb+srv://swasti12349:%40Swasti123456@cluster0.ydwaf.mongodb.net/apidb"
);


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

// upload a users data
app.post("/colls", (req, res) => {
  
  var ms = {
     title: req.body.title,
     password: req.body.password,
     email: req.body.email
  };

  users.collection(email).insertOne(ms, (err, result)=>{
    res.send("Data is saved successfully");
  });

  console.log(m);
  
});


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// get all users
app.get("/users", (req, res) => {
  mdel.find((err, found) => {
    if (err) {
      console.log(err);
    } else {
      res.send(found);
    }
  });
});

// get data of a user
app.get("/userdata", (req, res) => {
  const email = req.body.email;
  const emailstr = "A" + email + "s";
  const mdels = users.model(emailstr, dataschema);
  mdels.find((err, found) => {
    if (err) {
      console.log(err);
      res.send(err);
    } else {
      res.send(found);
    }
  });

});



// register a user
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
  
});


app.listen(process.env.PORT || 3000, () => {
  console.log("Server started");
});
