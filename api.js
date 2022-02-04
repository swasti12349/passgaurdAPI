const exp = require("express");
const mong = require("mongoose");
const body = require("body-parser");

const app = exp();

app.use(body.urlencoded({ extended: true }));


const users = mong.createConnection(
  "mongodb+srv://swasti12349:%40Swasti123456@cluster0.ydwaf.mongodb.net/apidb"
);
url = "mongodb+srv://swasti12349:%40Swasti123456@cluster0.ydwaf.mongodb.net/apidb";

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
app.post("/mad", (req, res) => {
  
  email = req.body.email;
  const m = {
    title: req.body.title,
    password: req.body.password
  };

  mong.connect(url, (err, db)=>{
      db.collection(email).insertOne(m, (err, result)=>{
        db.close();
      })
  });

  res.send("Data is saved");
  
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
  var email = req.body.email;
  var result = [];
  mong.connect(url, (err, db)=>{
   var cursor =  db.collection(email).find();
   cursor.forEach((doc, err)=>{
   result.push(doc);

   }, ()=>{
     db.close();
    res.render('index', {items: result});
    
   })
   
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
