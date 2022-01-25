const exp = require("express");
const mong = require("mongoose");
const body = require("body-parser");

const app = exp();

app.use(body.urlencoded({ extended: true }));

mong.connect("mongodb+srv://swasti12349:%40Swasti123456@cluster0.ydwaf.mongodb.net/apidb" || "mongodb://localhost:27017/apidb", {useNewUrlParser:true});

const schema = {
  name: String,
  email: String,
  password: String,
};

const mdel = mong.model("User", schema);

app.get("/users", (req, res) => {
  mdel.find((err, found) => {
    if (err) {
      console.log(err);
    } else {
      res.send(found);
    }
  });
});

app.post("/users",  (req, res)=>{
    
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    const m = new mdel({
        name: name,
        email: email,
        password: password
    })
    m.save();
    res.send("Registered");
})



app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.listen(3000, () => {
  console.log("Server started");
});