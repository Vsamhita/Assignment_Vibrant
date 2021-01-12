const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/api.js');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const app = express();

const requireAuth = (req, res, next) => {
    try {
        console.log(req.cookies)
        const token = req.cookies.jwt
        // check json web token exists & is verified
        if (token) {
            jwt.verify(token, 'secret code', (err, decodedToken) => {
            if (err) {
                console.log(err.message);
                res.status(400).json({"err":"please login"}); 
            } else {
                console.log(decodedToken);
                next();
            }
            });
        } else {
            res.status(400).json({"err":"please login"}); 
        }
    } catch(err) {
        console.log(err)
        res.status(400).json({"err":"please login"}); 
    }
  };


mongoose.connect('mongodb+srv://samhita:samhita@cluster0.prki0.mongodb.net/mydb',{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true });
mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(cookieParser());
app.use('/api',requireAuth,route);
app.use(authRoutes);



app.use(function(err, req, res, next){
    console.log(err); // to see properties of message in our console
    res.status(422).send({error: err.message});
});


app.listen(process.env.port || 4000,function(){
    console.log("now listening for requests");
});