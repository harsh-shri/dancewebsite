const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyparser= require("body-parser")
mongoose.connect('mongodb://localhost/contactDance', { useNewUrlParser: true, useUnifiedTopology: true });
const app = express();
const port = 8000;


//Define Mongoose schema
const conatctSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

const contact = mongoose.model('contactform', conatctSchema);

//EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'));// for serving static files 
app.use(express.urlencoded());


//PUG SPECIFIC STUFF
app.set('view engine', 'pug'); //setting templet engine as pug
app.set('views', path.join(__dirname, 'views')); //set the views directory

//END POINTS
app.get('/', (req, res) => {
    const param = {};
    res.status(200).render('home.pug', param);

})
app.get('/contact', (req, res) => {
    const param = {};
    res.status(200).render('contact.pug', param);
})
app.post('/contact', (req, res) => {
    var mydata = new contact(req.body)
    mydata.save().then(()=>{
        res.send("Your response is submitted")
    }).catch(()=>{
        res.status(400).send("Your response is not submitted")})
    // res.status(200).render('contact.pug');

});

//START THE SERVER 
app.listen(port, () => {
    console.log(`The application started successfully ${port}`);
});