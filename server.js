const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');
const passport = require("passport");
const users = require("./controller/users");
const ListRouter = require('./routes/list-routes');

const app = express();
var whitelist = ['https://www.rememberthemilk.com/services/auth/','https://api.rememberthemilk.com/services/rest/',]
var corsOptions = {
  origin: function (origin,callback){
    if(whitelist.indexOf(origin)!==2 || !origin){
      callback(null,true)
    }
    else{
      callback(new Error('Not Allowed by Cors'))
    }
  }
}
app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS,REQUEST')
  next();
})
// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(cors(corsOptions));
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);

// Routes

app.use("/api/users", users);
 
app.use('/api', ListRouter);
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server up and running on port ${port} !`));
