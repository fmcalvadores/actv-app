const express = require('express');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');

const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, '/public')));
app.set('view engine','ejs');

app.set('views',path.join(__dirname,'/views'));

const methodOverride = require('method-override');

const {v4: uuidv4} = require('uuid');
const { default: mongoose } = require('mongoose');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));


const {Post,User} = require('./models/Schemas');
const { Session } = require('inspector');
mongoose.connect('mongodb://localhost:27017/actvDB')
    .then(() => {
        console.log("Connection Open");
    })
    .catch(err => {
        console.log("Error");
        console.log(err);
    })

app.locals.appTitle = 'Actv';

let actvReviews = [
    {
        id: uuidv4,
        reviewedBy: 'fmdc',
        createdDate: '10/09/2022 13:02:42',
        updatedDate: '10/09/2022 13:02:42',
        reviewRate: 4.5,
        comment: 'Ang Ganda'
    }
];

const oneDay = 1000 * 60 * 3;
app.use(sessions(
    {
        secret: "actvsecret10111213",
        saveUninitialized:true,
        cookie: { maxAge: oneDay },
        resave: false 
    }
));

app.get('/actv/new',(req,res)=> {
    res.render('actv/new');
})

app.get('/actv/:id', async (req,res) => {
    const {id} = req.params;
    let list = await Post.findById(id);
    res.render('actv/show',{list});
})

app.put('/actv/:id', async (req,res)=> {
    const {id} = req.params;
    const post = await Post.findByIdAndUpdate(id,req.body, {runValidators: true, new :true})
    res.redirect(`/actv/${post._id}`);
})

app.get('/actv/:id/edit', async (req,res) => {
    const {id} = req.params;
    const post = await Post.findById(id);
    res.render('actv/edit', {post});
})

app.get('/actv', async (req,res)=> {
    const actvList = await Post.find({});
    res.render('actv/index',{actvList});
})

app.delete('/actv/:id', async (req, res) => {
    const {id} = req.params;
    const deletePost = await Post.findByIdAndDelete(id);
    res.redirect("/actv");
})

app.post('/actv', async (req,res)=> {

    const newPost = new Post(req.body);
    newPost.dateposted = new Date();
    newPost.editDate = new Date();
    await newPost.save();
    res.redirect(`actv/${newPost._id}`);
       
})

app.listen(3000, () => {
    console.log("On port 3000!!!");
})
