const express       = require('express');
const mongoose      = require('mongoose');
const bodyParser    = require('body-parser');
const cors          = require('cors');
const passport      = require('passport');

require('dotenv').config();
require('./config/auth');

const app = express();

//connect to db
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>console.log('connected to db'))
.catch((err)=>console.log('error',err))

// fetch form data
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//cors
app.use(cors());

//initialize passport
app.use(passport.initialize());


//routes
app.use('/api/user',require('./routes/userRoute'));

const port = process.env.PORT || 3000;
app.listen(port,()=>console.log('server run at port'+port));

module.exports=app;